import dbConnect from '@lib/dbConnect'
import Account from '@models/account/Account'
import handler, { check, put, initValidation } from "@middleware/handler"
import { authenticate } from "@middleware/auth"
import { createCustomAccount, createStripeImage } from '@lib/stripe'
import { getAccountCompletionRate } from '@helpers/accounts-helpers'

const validator = initValidation(
    [
        check("accountAccessKey").optional().isLength({ min: 12, max: 12 }).withMessage("Invalid access key, it has to be at least 12 chars long"),
        check("accountIdNumber").optional().isNumeric().withMessage("Account Id is not a number"),
        check("accountIbanNumber").optional().isNumeric().withMessage("accountIbanNumber is not a number"),
        check("accountNumber").optional().isNumeric().withMessage("accountNumber is not a number"),
        check("accountRoutingNumber").optional().isNumeric().withMessage("accountRoutingNumber is not a number"),
        check("accountHomeCountry").optional().isLength({ min: 2, max: 2 }).withMessage("Account home country is not valid"),
        check("accountBusinessCountry").optional().isLength({ min: 2, max: 2 }).withMessage("accountBusinessCountry is not valid"),
        check("accountEmailAddress").optional().isEmail().withMessage("accountEmailAddress is not a proper email address"),
        check("accountBusinessEmail").optional().isEmail().withMessage("accountBusinessEmail is not a proper email address"),
    ]
)
const formatReqObject = (req, account) => {
    const schema = {
        accountPersonal: ["accountFirstName", "accountLastName", "accountIdNumber", "accountBirthDate", "accountHomeCountry"],
        accountBusiness: ["accountBusinessName", "accountBusinessType", "accountBusinessIndustry", "accountBusinessWebsite", "accountBusinessAddress", "accountBusinessCountry", "accountBusinessEmail"],
        accountBank: ["accountBankCountry", "accountBankCurrency", "accountIbanNumber", "accountNumber", "accountRoutingNumber", "accountSortCode"],
        accountContact: ["accountEmailAddress", "accountPhoneNumber", "accountHomeAddress", "accountZipCode", "accountCityName", "accountStateName"],
        accountProfile: ["accountAvatarUrl", "accountCurrentTitle"],
        accountKeys: ["accountAccessKey"],
    }
    const data = {}


    Object.keys(schema).forEach((key) => {
        if (typeof (schema[key]) == 'object' && schema[key][0]) {
            data[key] = {}
            schema[key].forEach((keyValue) => {
                if (req.body[keyValue] && req.body[keyValue] != null) {
                    data[key][keyValue] = req.body[keyValue]
                }
            })
            if (Object.entries(data[key]) < 1) {
                delete (data[key])
            }
        }
        else {
            if (req.body[key])
                data[key] = req.body[key]
        }
    })

    // accountGovernmentId, accountIdNumber, accountBusinessName, accountBusinessWebsite, accountBusinessAddress, accountBusinessCountry, accountHomeAddress, accountZipCode, accountCityName, and accountStateName. However, we will only allow the user to enter/view their accountFirstName, accountLastName, accountHomeCountry, accountBirthDate, accountBusinessEmail, accountBankCountry, accountBankCurrency, accountIbanNumber, accountNumber, accountRoutingNumber, accountSortCode, accountEmailAddress, and accountPhoneNumber.
    return data
}

const createStripeAccount = async (req, account, front) => {
    const email = account.accountBusiness.accountBusinessEmail || account.accountContact.accountEmailAddress
    const country = account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry
    const dob = {
        day: account.accountPersonal.accountBirthDate.split('-')[1],
        month: account.accountPersonal.accountBirthDate.split('-')[0],
        year: account.accountPersonal.accountBirthDate.split('-')[2]
    }

    const individualAddres = {
        line1: account.accountContact.accountHomeAddress,
        postal_code: account.accountContact.accountZipCode,
        city: account.accountContact.accountCityName,
        state: account.accountContact.accountStateName
    }

    const companyAddress = {
        line1: account.accountBusiness.accountBusinessAddress || account.accountContact.accountHomeAddress,
        country: account.accountBusiness.accountBusinessCountry || account.accountPersonal.accountHomeCountry,
    }
    
    const data = {
        type: 'custom',
        country,
        business_type: "individual",
        business_profile: {
            url: account.accountBusiness.accountBusinessWebsite,
            mcc: "5734"
        },
        company: {
            address: companyAddress,
            name: account.accountBusiness.accountBusinessName || (account.accountPersonal.accountFirstName + " " + account.accountPersonal.accountLastName)
        },
        individual: {
            first_name: account.accountPersonal?.accountFirstName,
            last_name: account.accountPersonal?.accountLastName,
            dob,
            address: individualAddres,
            email,
            phone: account.accountContact?.accountPhoneNumber,
            id_number: account.accountPersonal?.accountIdNumber,
            verification: {
                document: {
                    front: front.id,
                }
            }
        },
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
        tos_acceptance: {
            ip: req.connection.remoteAddress,
            date: Math.floor(Date.now() / 1000)
        },
        external_account: {
            object: "bank_account",
            country: account.accountBank.accountBankCountry,
            currency: account.accountBank.accountBankCurrency,
            routing_number: account.accountBank.accountRoutingNumber,
            account_number: account.accountBank.accountNumber
        },
        default_currency: account.accountBank?.accountBankCurrency
    }

    const stripeAccount = await createCustomAccount(data)
    return stripeAccount

}

export default handler.use(authenticate, put(validator))
    .put(async (req, res) => {
        try {
            await dbConnect();
            const { id } = req

            const formdata = formatReqObject(req)
            const account = await Account.findByIdAndUpdate(id, [{ $set: formdata }], { new: true })
            
            const completionRate = getAccountCompletionRate(account)
            account.accountStatus.accountCompletionRate = completionRate

            if (completionRate > 80 && !account.accountStripeId) {
                const front = await createStripeImage(req.body.accountGovernmentId)
                if (front?.error) return res.status(400).json({ success: false, message: "Failed to load account government ID image", error: front.error });

                const acc = await createStripeAccount(req, account, front)
                if (acc?.error) return res.status(400).json({ success: false, message: "Failed to create Stripe account", error: acc.error  });

                account.accountStripeId = acc.id
                await account.save()
                return res.status(201).json({ success: true, data: { account }, message: "Stripe account created successfully" });
            }

            await account.save()
            res.status(201).json({ success: true, data: { account }, message: "Account updated successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false,
    }
};
