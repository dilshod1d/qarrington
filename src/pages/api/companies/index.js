// companyTicker, companyName, companyLogo, companyProduct, companyHeadline, companyDescription, companyIndustry, companyWebsite, 
// companyEmail, companyMarket, companySize, companyIsoUnits, companyIsoPrice, companyIsoDate, and companyIsoTime.
import dbConnect from '@lib/dbConnect';
import Company from '@models/company/Company';
import handler, { initValidation, check } from "@middleware/handler"
import { authenticate } from "@middleware/auth"
import { createProduct } from "@lib/stripe"
import { generateToken } from "@lib/auth"

const postVal = initValidation([
	check('companyTicker').notEmpty().withMessage('Company Ticker is invalid'),
	check('companyName').notEmpty().withMessage('Company Name is invalid'),
	check('companyLogo').notEmpty().withMessage('Company Logo is invalid'),
	check('companyProduct').notEmpty().withMessage('Company Product Key is invalid'),
	check('companyHeadline').notEmpty().withMessage('Company Headline is invalid'),
	check('companyDescription').notEmpty().withMessage('Invalid Company Description'),
	check('companyIndustry').notEmpty().withMessage('Invalid companyIndustry'),
	check('companyWebsite').notEmpty().withMessage('Invalid copmapny website'),
	check('companyEmail').notEmpty().withMessage('Invalid company email'),
	check('companyMarket').notEmpty().withMessage('Invalid company market'),
	check('companySize').notEmpty().withMessage('Invalid Company Size'),
	check('companyIsoUnits').notEmpty().withMessage('Invalid Company Iso Units'),
	check('companyIsoPrice').notEmpty().withMessage('Invalid Company Iso Price'),
	check('companyIsoDate').notEmpty().withMessage('Invalid Company Iso Date'),
	check('companyIsoTime').notEmpty().withMessage('Invalid Company Iso Time'),
])

const formatReqObject = (req) => {
	const details = {
		companyListing: {
			companyTicker: req.body.companyTicker,
			companyName: req.body.companyName,
			companyLogo: req.body.companyLogo,
			companyHeadline: req.body.companyHeadline,
			companyProduct: req.body.companyProduct,
			companyProductId: req.body.company, // stripe product id
			companyDescription: req.body.companyDescription,
			companyIndustry: req.body.companyIndustry,
			companyWebsite: req.body.companyWebsite,
			companyEmail: req.body.companyEmail,
			companyMarket: req.body.companyMarket,
			companySize: req.body.companySize,
		},
		companyIso: {
			companyIsoUnits: Number(req.body.companyIsoUnits), // the inital total subscription
			companyIsoPrice: Number(req.body.companyIsoPrice), // the initial price per subscription
			companyIsoDate: req.body.companyIsoDate, // iso will end 7 days after this date
			companyIsoTime: req.body.companyIsoTime,
		}
	}
	return details
}

export default handler
	.post(authenticate, async (req, res) => {
		await dbConnect();
		try {
			const companyDetail = formatReqObject(req)

			const company = await new Company(companyDetail)

			const product = await createProduct({
				name: req.body.companyTicker,
				description:req.body.companyDescription,
				images: [req.body.companyLogo],
				default_price_data:{
					unit_amount_decimal: req.body.companyIsoPrice,
					currency: "usd"
				}
			})
			
			company.companyListing.companyKey = generateToken(12)
			company.companyListing.companyProductId = product.id
			company.companyLogo = req.body.companyLogo
			company.companyAccountId = req.id
			await company.save()
			
			res.status(201).json({ success: true, data: { company }, message: "Company listed successfully", })
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.get(async (req, res) => {
		await dbConnect()

		const { companyId } = req.query
		if(companyId) {
			try {
				const company = await Company.findById(companyId)
				if(!company) return res.status(400).json({ success: false, message: "Company not found" })
				return res.status(201).json({ success: true, data: company, message: "Secret Key exists" })

			} catch (err) {
				return res.status(500).json(err)
			}
		}

		try {
			res.status(201).json({ success: true, message: "Secret Key exists" })
		} catch (err) {
			res.status(500).json(err)
		}
		
	})



export const config = {
	api: {
		responseLimit: false
	}
};