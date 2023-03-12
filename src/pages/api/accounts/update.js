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
const getAccountCompletionRate = (account) => {
    const accountContact = account.accountContact
    const accountBank = account.accountBank ?? {}

    const accountBusiness = account.accountBusiness ?? {}
    const accountPersonal = account.accountPersonal 
    
    let sum = 0;
    sum += Object.entries(accountContact).filter(e => e[1] != undefined).length)
    sum += Object.entries(accountContact).filter(e => e[1] != undefined).length)

    sum += Object.entries(accountBusiness).filter(e => e[1] != undefined).length)
    sum += Object.entries(accountPersonal).filter(e => e[1] != undefined).length)

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
            req = deleteUnmuttable(req)
            const token = await getHeaderAuth(req)

            await Account.updateOne({ "accountKeys.accountToken": token }, [{ $set: { ...req.body } }]);
            const account = await getAuthAccount(req, { "accountKeys.accountToken": 0 })
            account.accountStatus.accountCompletionRate = getAccountCompletionRate(account,{"accountKeys":0})
            account.save();

            res.status(201).json({ success: true, message: "Account update successfully", account });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false
    }
};
