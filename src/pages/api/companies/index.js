import dbConnect from '@lib/dbConnect';
import Company from '@models/company/Company';
import { validate, check } from '@lib/validations'
import { createProduct } from "@lib/stripe"
import { generateToken, getCurrentUserId } from "@lib/auth"

const validations = [
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
]

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


export default async function handler(req, res) {
	await dbConnect()
	
	if(req.method === 'GET') {
		const id = await getCurrentUserId(req)
		if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })

		const { sortBy, limit } = req.query

		try {
			const { companyId } = req.query
			if(companyId) {
				const company = await Company.findById(companyId)
				if(!company) return res.status(400).json({ success: false, message: "Company not found" })

				return res.status(201).json({ success: true, data: company })
			}

			let companies = await Company.find()
			if(sortBy === "companyCapitalization") {
				companies = companies.filter(({ companyKpi }) => {
					if(companyKpi) {
						const { companyNow } = companyKpi
						if(companyNow.data[0]) {
							const { companyCapitalization } = companyNow.data[0]
							if(companyCapitalization) return true
						}
					}
					return false
				}).sort((a, b) => b.companyKpi.companyNow.data[0].companyCapitalization - a.companyKpi.companyNow.data[0].companyCapitalization)
			}

			return res.status(201).json({ success: true, data: limit ? companies.slice(0, limit) : companies })
		} catch (error) {
			return res.status(500).json(error)
		}
	} else if (req.method === 'POST') {
		await validate(validations, req, res)

		const id = await getCurrentUserId(req)
		if(!id) return res.status(401).json({ success: false, message: 'User not logged in, unable to create company' })

		try {
			const companyDetail = formatReqObject(req)

			const company = await new Company(companyDetail)

			const product = await createProduct({
				name: req.body.companyTicker,
				description: req.body.companyDescription,
				images: [req.body.companyLogo],
				default_price_data: {
					unit_amount_decimal: Number(req.body.companyIsoPrice)*100,
					currency: "usd"
				}
			})
			

			const basicData = {
				companyCapitalization: company.companyIso.companyIsoPrice * company.companyIso.companyIsoUnits,
				companyVolume: 0,
				companyBids: [],
				companyAsks: [],
				companyPrice: company.companyIso.companyIsoPrice,
				companyPercentChange: 0,
				companyPointChange: 0,
				companyVariant: "primary",
				companyActiveCustomers: 0,
				companyIsRecordedAt: Date.now()
			}

			company.companyKpi.companyNow.data = [basicData]
			company.companyKpi.companyToday.data = [basicData]
			company.companyKpi.companyHour.data = [basicData]
			company.companyKpi.companyDay.data = [basicData]
			company.companyKpi.companyWeek.data = [basicData]
			company.companyKpi.companyMonth.data = [basicData]
			company.companyKpi.companyQuarter.data = [basicData]
			company.companyKpi.companyYear.data = [basicData]

			company.companySlug = req.body.companyTicker.toLowerCase()
			company.companyListing.companyKey = generateToken(12)
			company.companyListing.companyProductId = product.id

			if(product.id) {
				company.companyStatus.companyIsListed = true
				company.companyStatus.companyIsListedAt = Date.now()
			}

			company.companyLogo = req.body.companyLogo
			company.companyAccountId = id

			company.companyUser = [{
					companyUserType: "Total Subscribers",
					companyUserTotal: 0
				},
				{
					companyUserType: "Total Customers",
					companyUserTotal: 0
				},
				{
					companyUserType: "Active Customers",
					companyUserTotal: 0
				},
				{
					companyUserType: "Passive Customers",
					companyUserTotal: 0
				}
			]

			await company.save()
			
			return res.status(201).json({ success: true, data: company, message: "Company listed successfully", })
		} catch (error) {
			return res.status(500).json(error)
		}
	} else if (req.method === "PUT") {
			const { companySlug } = req.body
			if(!companySlug) return res.status(400).json({ success: false, message: "Invalid company name" })

			try {
				const id = await getCurrentUserId(req) || req.body.companySubscriberAccountId
				if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })
				
				const company = await Company.findOne({ companySlug: companySlug })

				
				const { companySubscriberAccountId } = req.body
				if(companySubscriberAccountId) {
					if(company.companyIso.companyIsoSubscribers.find(({ companySubscriberAccountId }) => companySubscriberAccountId === id)) {
						return res.status(200).json({ success: true, message: "Subscriber already added" })
					}

					company.companyIso.companyIsoSubscribers = [...company.companyIso.companyIsoSubscribers, {
						companySubscriberAccountId,
						companySubscriberAddedAt: Date.now()
					}]
					
					company.companyUser = company.companyUser.map((x) => {
						if (x.companyUserType === "Total Subscribers") {
							if (company.companyIso.companyIsoSubscribers.length > 1000) {
								company.companyStatus.companyIsLaunched = true,
								company.companyStatus.companyIsLaunchedAt = Date.now()
							}
							
							return {
								...x,
								companyUserTotal: company.companyIso.companyIsoSubscribers.length
							}
						}
						
						return x
					})

					
					await company.save()
					return res.status(200).json({ success: true, company, message: "Subscriber added successfully" })
				}

				await company.save()
				return res.status(200).json({ success: true, company, message: "Company updated successfully" })
		} catch (err) {
				return res.status(500).json(err)
		}
	}
}

// const validations = [
//     check("accountAccessKey").optional().isLength({ min: 12, max: 12 }).withMessage("Invalid access key, it has to be at least 12 chars long"),
//     check("accountIdNumber").optional().isNumeric().withMessage("Account Id is not a number"),
//     check("accountIbanNumber").optional().isNumeric().withMessage("accountIbanNumber is not a number"),
//     check("accountNumber").optional().isNumeric().withMessage("accountNumber is not a number"),
//     check("accountRoutingNumber").optional().isNumeric().withMessage("accountRoutingNumber is not a number"),
//     check("accountHomeCountry").optional().isLength({ min: 2, max: 2 }).withMessage("Account home country is not valid"),
//     check("accountBusinessCountry").optional().isLength({ min: 2, max: 2 }).withMessage("accountBusinessCountry is not valid"),
//     check("accountEmailAddress").optional().isEmail().withMessage("accountEmailAddress is not a proper email address"),
//     check("accountBusinessEmail").optional().isEmail().withMessage("accountBusinessEmail is not a proper email address"),
// ]

// const formatReqObject = (req) => {
//     const schema = {
//         accountPersonal: ["accountFirstName", "accountLastName", "accountIdNumber", "accountBirthDate", "accountHomeCountry"],
//         accountBusiness: ["accountBusinessName", "accountBusinessType", "accountBusinessIndustry", "accountBusinessWebsite", "accountBusinessAddress", "accountBusinessCountry", "accountBusinessEmail"],
//         accountBank: ["accountBankCountry", "accountBankCurrency", "accountIbanNumber", "accountNumber", "accountRoutingNumber", "accountSortCode"],
//         accountContact: ["accountEmailAddress", "accountPhoneNumber", "accountHomeAddress", "accountZipCode", "accountCityName", "accountStateName"],
//         accountProfile: ["accountAvatarUrl", "accountCurrentTitle"],
//         accountKeys: ["accountAccessKey"],
//     }
//     const data = {}


//     Object.keys(schema).forEach((key) => {
//         if (typeof (schema[key]) == 'object' && schema[key][0]) {
//             data[key] = {}
//             schema[key].forEach((keyValue) => {
//                 if (req.body[keyValue] && req.body[keyValue] != null) {
//                     data[key][keyValue] = req.body[keyValue]
//                 }
//             })
//             if (Object.entries(data[key]) < 1) {
//                 delete (data[key])
//             }
//         }
//         else {
//             if (req.body[key])
//                 data[key] = req.body[key]
//         }
//     })

//     return data
// }

