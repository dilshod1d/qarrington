import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';

async function handler(req, res) {
  const { method } = req;
  const { accountSlug } = req.query;

  await dbConnect();

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

  if (method === 'POST') {
    try {
      const createItem = await Account.create(req.body);
      res.status(201).json(createItem);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false
  }
};