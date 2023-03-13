import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';
import handler, { initValidation, post, check } from "../../../middleware/handler"
import { getAuthAccount, login } from "../../../lib/auth"

const validator = initValidation(
    [
        check('accessKey').notEmpty().withMessage('Access Key is empty'),
        // all other validation 
    ]
)

// define my middleware here and use it only for POST requests
export default handler
    .get(async (req, res) => {
        await dbConnect();
        try {
            const account = await getAuthAccount(req)
            if(!account) {
                res.status(404).json({ success:false, data:[], message:"Account not Found"})
            }
            account.accountKeys.accountToken = undefined
            account.save()
            
            res.status(201).json({ success:true, data: { token, account }, message:"User login Successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false
    }
};
