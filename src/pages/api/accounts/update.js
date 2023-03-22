import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import handler, { check, put, initValidation } from "@middleware/handler"
import { getHeaderAuth, getAuthAccount } from "@lib/auth"
import { authenticate } from "@middleware/auth"
import { createCustomAccount, createPerson, listPersons, uploadVef } from '@lib/stripe';
import multer from "multer"
const upload = multer()
import { createImage } from '@lib/cloudinary';

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
                // if(keyValue == "accountAccessKey" && req.body[keyValue].length > 13 )
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

const getAccountCompletionRate = (account) => {
    const accountContact = account.accountContact
    const accountBank = account.accountBank
    // console.log("account_get_rate", accountContact)

    const accountBusiness = account.accountBusiness
    const accountPersonal = account.accountPersonal

    let sum = 0;
    sum += Object.entries(accountContact).filter(e => e[1] != undefined).length
    sum += Object.entries(accountBank).filter(e => e[1] != undefined).length

    sum += Object.entries(accountBusiness).filter(e => e[1] != undefined).length
    sum += Object.entries(accountPersonal).filter(e => e[1] != undefined).length

    // const sum = Number(Object.keys(accountContact).length) + Number(Object.keys(accountBank).length) + Number(Object.keys(accountBusiness).length) + Number(Object.keys(accountPersonal).length)
    // console.log("sum", sum)
    let accountCompletionRate = sum * 4
    return accountCompletionRate
}

const deleteUnmuttable = (req) => {
    if (req.body.accountKeys) {
        delete (req.body.accountKeys.accountSecretKey)
        delete (req.body.accountKeys.accountToken)
    }
    delete (req.body.accountStatus)
    return req;
}

const createStripeAccount = async (req, account, res) => {
    const name = account.accountBusiness.accountBusinessName ?? account.accountPersonal.accountFirstName + ' ' + account.accountPersonal.accountLastName
    const email = account.accountBusiness.accountBusinessEmail ?? account.accountPersonal.accountEmailAddress
    const country = account.accountBusiness.accountBusinessCountry ?? account.accountPersonal.accountHomeCountry
    let address = account.accountBusiness.accountBusinessAddress ?? account.accountPersonal.accountHomeAddress

    const neededForStripeId = [
        country,
        email,
        address,
        name,
    ]
    if (neededForStripeId.filter(e => e == null || e == undefined)[0]) {
        // account.save();
        // res.status("200").json({sucess:true, data:{account, neededForStripeId}, message:"Account has been updated successfully", errors:["Stripe Account not created"]})
        return
    }
    const stripeAccount = await createCustomAccount({
        type: 'custom',
        country,
        email,
        business_type: "individual",
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
        company: {
            name,
            address: {
                line1: address[0],
                city: req.body.accountCityName ?? '',
                // postal_code:req.body.accountZipCode

            },
        },
        default_currency: req.body.accountCountryCurrency,
        tos_acceptance: {
            service_agreement: 'full'
        }

    })
    return stripeAccount

}

const uploadStripeAccountId = async (file, id) => {
    const upload = await uploadVef(file, id)
    console.log("uploadCreateStripeAcc", upload)
}

export default handler.use(authenticate, upload.single('accountAvatar'), upload.single('accountGovernmentId'), put(validator))
    .put(async (req, res) => {
        // return req.headers
        try {
            await dbConnect();
            const { id } = req

            const formdata = formatReqObject(req)
            
            const account = await Account.findByIdAndUpdate(id, [{ $set: formdata }], {
                new: true
            });

            const completionRate = getAccountCompletionRate(account)

            account.accountStatus.accountCompletionRate = completionRate

            if (completionRate > 80 && (account.accountStripeId == null || account.accountStripeId == undefined)) {
                let acc = await createStripeAccount(req, account, res)
                account.accountStripeId = acc.id
            }

            let accountAvatar = req.files?.filter(e => e.fieldname == "accountAvatar")[0]
            let accountGovId = req.files?.filter(e => e.fieldname == "accountGovernmentId")[0]
            let accountGovIdUrl = ''

            // console.log(accountGovId, req.files)
            if (accountGovId && !account.accountPersonal.accountGovernmentId) {
                let accountGovID = await createImage(accountGovId)
                accountGovIdUrl = accountGovID.url
                let person = await listPersons(account.accountStripeId)
                person = person.data[0]
                // console.log("person", person)

                if (person == null || person == undefined)
                    person = await createPerson(account.accountStripeId, {
                        first_name: account.accountPersonal.accountFirstName,
                        last_name: account.accountPersonal.accountLastName,
                        id_number: account.accountPersonal.accountIdNumber,
                        email: account.accountPersonal.accountEmailAddress
                    })

                const upload = uploadStripeAccountId(accountGovId, account.accountStripeId, person.id)
                console.log("upload", upload)
            }
            if (accountAvatar) {
                accountAvatar = await createImage(accountAvatar)
                account.accountProfile.accountAvatarUrl = accountAvatar.url
            }
            await account.save();

            res.status(201).json({ success: true, data: { account }, message: "Account update successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false,
    }
};
