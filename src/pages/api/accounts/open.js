import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';
import handler, { initValidation, post, check } from "../../../middleware/handler"
import { login } from "../../../lib/auth"

const validator = initValidation(
    [
        check('accessKey').notEmpty().withMessage('Access Key is empty'),
        // all other validation 
    ]
)

// define my middleware here and use it only for POST requests
export default handler.use(validator)
    .post(async (req, res) => {
        await dbConnect();
        try {
            const account = await Account.findOne({'accountKeys.accountAccessKey':req.body.accessKey})
            .select("accountContact accountBank accountBusiness accountPersonal accountProfile accountStatus");
            if(!account) {
                res.status(404).json({ success:false, data:[], message:"Account not Found"})
            }
            console.log("cons", account);
            const token = login(account)
            res.status(201).json({ token, account });
        } catch (err) {
            res.status(500).json(err);
        }
    })


export const config = {
    api: {
        responseLimit: false
    }
};
