import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import { generateToken, getCurrentUserId } from "@lib/auth"
import { removeSpaces } from '@helpers/helpers';
import { getAccountCompletionRate } from '@helpers/accounts-helpers';

export default async function handler(req, res) {
	await dbConnect()
	
	if(req.method === 'GET') {
		const id = await getCurrentUserId(req)
		if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })

		try {
			const account = await Account.findById(id)
			if(!account) return res.status(400).json({ success: false, message: 'Not user found' })
	
			return res.status(200).json({ success: true, data: account })
		} catch (error) {
			return res.status(500).json(error)
		}

	} else if(req.method === 'POST') {
		const id = await getCurrentUserId(req)
		if(id) return res.status(401).json({ success: false, message: 'User logged in, unable to create account' })

		const accountAccessKey = removeSpaces(req.body.accessKey) 
		if(accountAccessKey?.length !== 12) return res.status(400).json({ success: false, message: "Invalid access key" })

		const accountSecretKey = generateToken(12)

		if (accountAccessKey) {
			try {
				let account = await Account.findOne({ $or: [{ 'accountKeys.accountAccessKey': accountAccessKey }, { 'accountKeys.accountSecretKey': accountSecretKey }] })
				if (account) return res.status(400).json({ success: false, message: "Access Key invalid, user already exist" })

				account = new Account({ accountKeys: { accountAccessKey, accountSecretKey } })
				const completionRate = getAccountCompletionRate(account)
				account.accountStatus.accountCompletionRate = completionRate
				await account.save()

				return res.status(201).json({ success: true, data: {id: account._id.toString()}, message:"Account has been created successfully"})
			}
			catch (err) {
				return res.status(500).json(err)
			}
		} else {
			return res.status(400).json({ success: true, error: "Access Key is required" })
		}
	}
}