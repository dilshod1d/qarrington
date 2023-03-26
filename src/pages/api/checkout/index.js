import { getCurrentUserId } from '@lib/auth';
import dbConnect from '@lib/dbConnect';
import { buyPicks } from '@lib/stripe';
import { validate, check } from '@lib/validations'
import Company from '@models/company/Company';
import Pick from '@models/pick/Pick';

const validations = [
	check('cardNumber').notEmpty().withMessage('Company Ticker is invalid'),
	check('cardName').notEmpty().withMessage('Company Name is invalid'),
	check('cardCvc').notEmpty().withMessage('Company Logo is invalid'),
	check('cardCountry').notEmpty().withMessage('Company Product Key is invalid'),
	check('expireMonth').notEmpty().withMessage('Company Headline is invalid'),
	check('expireYear').notEmpty().withMessage('Invalid Company Description'),
	check('type').notEmpty().withMessage('Transaction not clear')
]

const formatReqObject = (body) => {
  const { cardNumber, cardName, cardCvc, cardCountry, expireMonth, expireYear } = body
  return { cardNumber, cardName, cardCvc, cardCountry, expireMonth, expireYear }
}

export default async function handler(req, res) {
	await dbConnect()

	if(req.method === 'POST') {
		try {
			const id = await getCurrentUserId(req)
			if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })
			
			const { type } = req.body
			
			await validate(validations, req, res)
			
			
			const data = formatReqObject(req.body)
			
			if(type === "pick") {
				const { pickTicker, pickUnits } = req.body
				if(!pickTicker || !pickUnits) return res.status(400).json({ success: false, message: "Missing ticker or units to pick" })
				
				const company = await Company.findOne({ companySlug: pickTicker })
				if(!company) return res.status(400).json({ success: false, message: "Unnable to found selected company" })
				
				const { _id: pickCompanyId, companyListing, companyIso } = company
				const { companyName: pickCompanyName, companyLogo: pickCompanyLogo } = companyListing
				const { companyIsoPrice: pickPrice } = companyIso
				
				const response = await buyPicks(data)
				console.log("here")
				if(response) {
					const pick = new Pick({
						pickTicker,
						pickUnits,
						pickPrice,
						pickAmount: pickPrice * pickUnits,
						pickCompany: {
							pickCompanyId,
							pickCompanyName,
							pickCompanyLogo
						},
						pickAccountId: id,
						pickStatus: {
							pickIsTransferred: false,
						}
					})

					const newPick = await pick.save()
					if(newPick) return res.status(201).json(({ success: true, data: newPick, message: "Pick created successfully" }))

				}
			}


			return  res.status(201).json({ success: true, data, message: "Checkout made successfully" })	
		} catch (error) {
			return res.status(500).json(error)
		}
  }
}