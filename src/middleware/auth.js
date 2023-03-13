import Account from '../../models/account/Account';
import { getAuthAccount } from '../lib/auth';

const auth = () => {
    return async (req, res, next) => {
        if (req.headers.authorization) {
            const account = await getAuthAccount(req)
            if (!account)
                res.status(401).json({ success: false, data: null, error: "User not authenticated" })
            next()
        }
        else {
            res.status(401).json({ success: false, data: null, error: "User not authenticated" })
        }
    }
}

export default auth