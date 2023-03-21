import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import handler from "@middleware/handler"
import { authenticate } from '@middleware/auth'
import { generateToken } from "@lib/auth"

// define my middleware here and use it only for POST requests
export default handler
	.post(async (req, res) => {
		await dbConnect();
		const accountAccessKey = req.body.accessKey
		const accountSecretKey = generateToken(13)

		if (accountAccessKey) {
			try {
				let account = await Account.findOne({ $or: [{ 'accountKeys.accountAccessKey': accountAccessKey }, { 'accountKeys.accountSecretKey': accountSecretKey }] })
				if (account) {
					console.log("invalid")
					res.status(400).json({ success: false, message: "Access Key Invalid" })
					return;
				}
				account = new Account({ accountKeys: { accountAccessKey, accountSecretKey } })
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
	.use(authenticate)
	.get(async (req, res) => {
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