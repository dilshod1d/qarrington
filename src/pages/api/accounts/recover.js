import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';
import handler, { initValidation, post, check, get } from "../../../middleware/handler"
import { login } from "../../../lib/auth"

const postVal = initValidation([
    check('accessKey').isLength({ min: 13 }).withMessage('Access Key is invalid'),
    check('secretKey').isLength({ min: 13 }).withMessage('Invalid Secret Key'),
])
const getVal = initValidation([
    check('secretKey').isLength({ min: 13 }).withMessage('Secret Key is invalid'),
])

// define my middleware here and use it only for POST requests
export default handler
    .use(post(postVal), get(getVal))
    .post(async (req, res) => {
        await dbConnect();
        try {
            const secretKey = req.body.secretKey ?? ''
            const accessKey = req.body.accessKey ?? ''
            // console.log(secretKey)
            
            const account = await Account.findOneAndUpdate({ 'accountKeys.accountSecretKey': secretKey },[{ $set: { 'accountKeys.accountAccessKey': accessKey } }])
            if (!account) {
                res.status(400).json({ success: false, message: "Invalid Secret Key" })
                return
            }
            const token = login(account)
            account.accountKeys.accountAccessKey = accessKey
            account.save()
            res.status(201).json({ success: true,  data:{ token, account }, message: "Access Key update successfully",});
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .get(async (req, res) => {
        await dbConnect();
        try {
            const secretKey = req.query.secretKey ?? ''
            // console.log(secretKey)
            if (secretKey.length < 13)
                res.status(400).json({ success: false, message: "SecretKey not Valid" })

            const account = await Account.findOne({ 'accountKeys.accountSecretKey': secretKey })
            if (!account) {
                res.status(400).json({ success: false, data: {}, message: "Invalid Secret Key" })
                return
            }
            // console.log("cons", account);
            res.status(201).json({ success: true, message: "Secret Key exists" });
        } catch (err) {
            res.status(500).json(err);
        }
    })



export const config = {
    api: {
        responseLimit: false
    }
};
