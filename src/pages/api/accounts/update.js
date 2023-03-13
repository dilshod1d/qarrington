import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';
import handler from "../../../middleware/handler"
import { getHeaderAuth, getAuthAccount } from "../../../lib/auth"
import auth from "../../../middleware/auth"

// const validator = initValidation(
//     [
//         // all other validation 
//     ]
// )
const formatReqObject = (req) => {
    const details = { 
        accountPersonal: {
            accountFirstName: req.body.accountFirstName,
            accountLastName: req.body.accountLastName,
            accountGovernmentId: req.body.accountGovernmentId,
            accountIdNumber: req.body.accountIdNumber,
            accountBirthDate: req.body.accountBirthDate,
            accountHomeCountry: req.body.accountHomeCountry
        },
        accountBusiness: {
            accountBusinessName: req.body.accountBusinessName,
            accountBusinessType: req.body.accountBusinessType,
            accountBusinessIndustry: req.body.accountBusinessIndustry,
            accountBusinessWebsite: req.body.accountBusinessWebsite,
            accountBusinessAddress: req.body.accountBusinessAddress,
            accountBusinessCountry: req.body.accountBusinessCountry,
            accountBusinessEmail: req.body.accountBusinessEmail
        },
        accountBank: {
            accountBankCountry: req.body.accountBankCountry,
            accountBankCurrency: req.body.accountBankCurrency,
            accountIbanNumber: req.body.accountIbanNumber,
            accountNumber: req.body.accountNumber,
            accountRoutingNumber: req.body.accountRoutingNumber,
            accountSortCode: req.body.accountSortCode
        },
        accountContact: {
            accountEmailAddress: req.body.accountEmailAddress,
            accountPhoneNumber: req.body.accountPhoneNumber,
            accountHomeAddress: req.body.accountHomeAddress,
            accountZipCode: req.body.accountZipCode,
            accountCityName: req.body.accountCityName,
            accountStateName: req.body.accountStateName
        },
        accountProfile: {
            accountAvatarUrl: req.body.accountAvatarUrl,
            accountCurrentTitle: req.body.accountCurrentTitle
        },
        accountKeys: {
            accountAccessKey: req.body.accountCurrentTitle,
        },
    }
    // accountGovernmentId, accountIdNumber, accountBusinessName, accountBusinessWebsite, accountBusinessAddress, accountBusinessCountry, accountHomeAddress, accountZipCode, accountCityName, and accountStateName. However, we will only allow the user to enter/view their accountFirstName, accountLastName, accountHomeCountry, accountBirthDate, accountBusinessEmail, accountBankCountry, accountBankCurrency, accountIbanNumber, accountNumber, accountRoutingNumber, accountSortCode, accountEmailAddress, and accountPhoneNumber.
    return details
}
const getAccountCompletionRate = (account) => {
    const accountContact = account.accountContact
    const accountBank = account.accountBank ?? {}

    const accountBusiness = account.accountBusiness ?? {}
    const accountPersonal = account.accountPersonal 
    
    let sum = 0;
    sum += Object.entries(accountContact).filter(e => e[1] != undefined).length
    sum += Object.entries(accountBank).filter(e => e[1] != undefined).length

    sum += Object.entries(accountBusiness).filter(e => e[1] != undefined).length
    sum += Object.entries(accountPersonal).filter(e => e[1] != undefined).length

    // const sum = Number(Object.keys(accountContact).length) + Number(Object.keys(accountBank).length) + Number(Object.keys(accountBusiness).length) + Number(Object.keys(accountPersonal).length)
    console.log(sum)
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

export default handler.use(auth())
    .put(async (req, res) => {
        // return req.headers
        try {
            await dbConnect();
            const formdata = formatReqObject(req)
            const token = await getHeaderAuth(req)

            await Account.updateOne({ "accountKeys.accountToken": token }, [{ $set: formdata }]);
            const account = await getAuthAccount(req, { "accountKeys.accountToken": 0 })
            account.accountStatus.accountCompletionRate = getAccountCompletionRate(account,{"accountKeys":0})
            account.save();

            res.status(201).json({ success: true, data: { account }, message: "Account update successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false
    }
};
