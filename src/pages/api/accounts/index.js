import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';
import handler, { initValidation, post, check } from "../../../middleware/handler"
import { generateToken, getHeaderAuth } from "../../../lib/auth"

const validator = initValidation(
	[
		check('accessKey').isLength({ min: 13 }).withMessage('Access Key is less than required length'),
	]
)

// define my middleware here and use it only for POST requests
export default handler
	.use(validator)
	.post(async (req, res) => {
		await dbConnect();
		const accountAccessKey = req.body.accessKey;
		const accountSecretKey = generateToken(13)
		// res.status(200).json(req.body);

		if (accountAccessKey) {
			try {
				let account = await Account.find({ $or: [{ 'accountKeys.accountAccessKey': accountAccessKey }, { 'accountKeys.accountSecretKey': accountSecretKey }] })
				console.log(account)
				if (account[0]) {
					console.log("invalid")
					res.status(400).json({ success: false, message: "Access Key Invalid" });
					return;
				}
				account = new Account({ accountKeys: { accountAccessKey, accountSecretKey } });
				account.save()

				res.status(200).json({success:true, message:"Account has been created successfully"});
			}
			catch (err) {
				res.status(500).json("err");
			}
		} else {
			res.status(400).json({ success: false, error: "Access Key is required" })
		}

	})
	.get(async (req, res) => {
		await dbConnect();
		try {
			const token = getHeaderAuth(req)
			if (!token) {
				res.status(401).json({ success: false, message: "User not authenticated" });
				// return;
			}
			// res.status(200).json(token)
			const account = await Account.findOne({ "accountKeys.accountToken": token },{ "accountKeys.accountToken":0})
			if(!account)
				res.status(400).json({ success: false, message:"Account Not Found" })
			res.status(200).json({ success: true, data: { account } })

			// const createItem = await Account.create(req.body);
			// res.status(201).json(createItem);
		} catch (err) {
			res.status(500).json(err);
		}
	})

export const config = {
	api: {
		responseLimit: false
	}
};
