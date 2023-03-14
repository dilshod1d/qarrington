// companyTicker, companyName, companyLogo, companyProduct, companyHeadline, companyDescription, companyIndustry, companyWebsite, 
// companyEmail, companyMarket, companySize, companyIsoUnits, companyIsoPrice, companyIsoDate, and companyIsoTime.
import dbConnect from '../../../lib/dbConnect';
import Company from '../../../../models/company/Company';
import handler, { initValidation, post, get, check } from "../../../middleware/handler"
import { createCustomer, createProduct } from "../../../lib/stripe"
import { generateToken, getHeaderAuth } from "../../../lib/auth"
import { createImage } from "../../../lib/cloudinary.js"
import multer from 'multer';

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
const getVal = initValidation([
	check('secretKey').isLength({ min: 13 }).withMessage('Secret Key is invalid'),
])

const formatReqObject = (req) => {
	const details = {
		companyListing: {
			companyTicker: req.body.companyTicker,
			companyName: req.body.companyName,
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
			companyIsoUnits: req.body.companyIsoUnits, // the inital total subscription
			companyIsoPrice: req.body.companyIsoPrice, // the initial price per subscription
			companyIsoDate: req.body.companyIsoDate, // iso will end 7 days after this date
			companyIsoTime: req.body.companyIsoTime,
		}
	}
	return details
}
// define my middleware here and use it only for POST requests
export default handler
	.use(multer().any('companyLogo'))
	.post(async (req, res) => {
		await dbConnect();
		try {
			const image = req.files[0];
			const companyDetail = formatReqObject(req)

			const createdImage = await createImage(image);
			const imageUrl = createdImage.url;

			const company = new Company(companyDetail)
			const product = await createProduct({
				name:req.body.companyTicker,
				description:req.body.companyDescription,
				images:[imageUrl],
				default_price_data:{
					unit_amount_decimal:req.body.companyIsoPrice,
					currency:"USD"
				}

			})
			console.log("product", product)

			company.companyListing.companyKey = generateToken(13)
			company.companyListing.companyProductId = product.id
			company.companyLogo = imageUrl
			company.save();
			
			res.status(201).json({ success: true, data: { company }, message: "Company listed successfully", });
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.get(async (req, res) => {
		await dbConnect();
		try {
			res.status(201).json({ success: true, message: "Secret Key exists" });
		} catch (err) {
			res.status(500).json(err);
		}
	})



export const config = {
	api: {
		responseLimit: false,
		bodyParser: false
	}
};