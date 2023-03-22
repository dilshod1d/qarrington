import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import handler, { check, initValidation } from "@middleware/handler"
import { authenticate } from '@middleware/auth'
import { generateToken } from "@lib/auth"
import { removeSpaces } from '@helpers/helpers';
import { getAccountCompletionRate } from '@helpers/accounts-helpers';

const validator = initValidation(
	[
		check('accessKey').isLength({ min: 12, max: 12 }).withMessage('Access Key is less than required length (12)'),
	]
)


// define my middleware here and use it only for POST requests
export default handler
	.post(validator, async (req, res) => {
		await dbConnect();
		const accountAccessKey = removeSpaces(req.body.accessKey) 
		if(accountAccessKey.length < 12 || accountAccessKey.length > 12) return res.status(400).json({ success: false, message: "Invalid access key" })
		const accountSecretKey = generateToken(12)

		if (accountAccessKey) {
			try {
				let account = await Account.findOne({ $or: [{ 'accountKeys.accountAccessKey': accountAccessKey }, { 'accountKeys.accountSecretKey': accountSecretKey }] })
				if (account) {
					console.log("invalid")
					res.status(400).json({ success: false, message: "Access Key Invalid" })
					return;
				}
				account = new Account({ accountKeys: { accountAccessKey, accountSecretKey } })
				const completionRate = getAccountCompletionRate(account)
				account.accountStatus.accountCompletionRate = completionRate
				account.save()

				res.status(200).json({success:true, message:"Account has been created successfully"})
			}
			catch (err) {
				res.status(500).json(err)
			}
		} else {
			res.status(400).json({ success: false, error: "Access Key is required" })
		}

	})
	.get(authenticate, async (req, res) => {
		await dbConnect()
		try {
			const { id } = req

			const account = await Account.findById(id)
			if(!account)
				res.status(400).json({ success: false, message:"Account Not Found" })
			res.status(200).json({ success: true, data: { account } })
		} catch (err) {
			res.status(500).json(err)
		}
	})

export const config = {
	api: {
		responseLimit: false
	}
};