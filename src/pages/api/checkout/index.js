import { getCurrentUserId } from '@lib/auth';
import dbConnect from '@lib/dbConnect';
import { buyPicks, buyPull, buyPush } from '@lib/stripe';
import { validate, check } from '@lib/validations';
import Account from '@models/account/Account';
import Company from '@models/company/Company';
import Pick from '@models/pick/Pick';
import Pull from '@models/pull/Pull';
import Push from '@models/push/Push';

const validations = [
  check('cardNumber').notEmpty().withMessage('Company Ticker is invalid'),
  check('cardName').notEmpty().withMessage('Company Name is invalid'),
  check('cardCvc').notEmpty().withMessage('Company Logo is invalid'),
  check('cardCountry').notEmpty().withMessage('Company Product Key is invalid'),
  check('expireMonth').notEmpty().withMessage('Company Headline is invalid'),
  check('expireYear').notEmpty().withMessage('Invalid Company Description'),
  check('type').notEmpty().withMessage('Transaction not clear')
];

const managePickPost = async (req, res, id) => {
  const { pickTicker, pickUnits } = req.body;
  if (!pickTicker || !pickUnits) return res.status(400).json({ success: false, message: 'Missing ticker or units to pick' });

  const company = await Company.findOne({ companySlug: pickTicker });
  if (!company) return res.status(400).json({ success: false, message: 'Unnable to found selected company' });

  const response = await buyPicks();
  if (response) {
    const foundPick = await Pick.findOne({ pickTicker: pickTicker, pickAccountId: id });
    if (foundPick) {
      // The user already has buyed picks for this company
      foundPick.pickAmount = foundPick.pickPrice * (foundPick.pickUnits + Number(pickUnits));
      foundPick.pickUnits = foundPick.pickUnits + Number(pickUnits);
      await foundPick.save();

      const account = await Account.findById(id)
      account.accountPortfolio = account.accountPortfolio + foundPick.pickPrice * Number(pickUnits)
      await account.save()

      return res.status(200).json({ success: true, data: foundPick, message: 'Units added to already existing pick' });
    }

    const { _id: pickCompanyId, companyListing, companyIso } = company;
    const { companyName: pickCompanyName, companyLogo: pickCompanyLogo } = companyListing;
    const { companyIsoPrice: pickPrice } = companyIso;
    
    if (response) {
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
          pickIsTransferred: false
        }
      });

      const newPick = await pick.save();
      if(newPick) {
        const account = await Account.findById(id)
        account.accountPortfolio = account.accountPortfolio + newPick.pickAmount
        await account.save()
      }

      if (newPick) return res.status(201).json({ success: true, data: newPick, message: 'Pick created successfully' });
      return res.status(400).json({ success: false, message: 'Something went wrong saving new pick' });
    }
  }
}

const createBidOnPull = async (company) => {
  const foundPulls = await Pull.find({ pullTicker: company.companySlug.toLowerCase() });
  if(!foundPulls) return
  const pullsInfo = foundPulls.map((pull) => {
    return {
      companyBidPrice: pull.pullPrice,
      companyBidUnits: pull.pullUnits
    }
  })

  const higherPullPrice = pullsInfo.slice(1).reduce((acc, curr) => {
    // Choose the lowest pric
    if(curr.companyBidPrice > acc.companyBidPrice) { 
      acc.companyBidPrice = curr.companyBidPrice
      acc.companyBidUnits = curr.companyBidUnits
    }
    
    // If there is other pull with same price add the units
    if(curr.companyBidPrice === acc.companyBidPrice) {
      acc.companyBidUnits = acc.companyBidUnits + curr.companyBidUnits
    }
    
    return acc
  }, pullsInfo[0])

  company.companyKpi.companyBids = higherPullPrice
  await company.save()
}

const managePullPost = async (req, res, id) => {
  const { pullTicker, pullUnits, pullPrice } = req.body;
  if (!pullTicker || !pullUnits || !pullPrice) return res.status(400).json({ success: false, message: 'Missing ticker, units or price to pull' });
  
  const company = await Company.findOne({ companySlug: pullTicker });
  if (!company) return res.status(400).json({ success: false, message: 'Unnable to found selected company' });
  

  const response = await buyPull();
  if (response) {
    const foundPulls = await Pull.find({ pullTicker, pullAccountId: id });

    const { _id, companyListing } = company;
    const { companyName: pullCompanyName, companyLogo: pullCompanyLogo } = companyListing;

    const pullCompanyUnits = Math.floor(foundPulls.length > 0 ? (foundPulls.reduce((acc, curr) => acc + curr.pullUnits , 0) + Number(pullUnits)) : Number(pullUnits))
    const pullCompanyPrice = Math.floor(company.companyKpi.companyNow.data[0].companyPrice)
    const pullCompanyPortfolio = Math.floor(pullCompanyPrice * pullCompanyUnits)

    for (const pull of foundPulls) {
      pull.pullCompany.pullCompanyPrice = pullCompanyPrice
      pull.pullCompany.pullCompanyUnits = pullCompanyUnits
      pull.pullCompany.pullCompanyPortfolio = pullCompanyPortfolio
      await pull.save()
    }

    if (response) {
      const pull = new Pull({
        pullTicker,
        pullUnits: Number(pullUnits),
        pullPrice: Number(pullPrice),
        pullAmount: Number(pullPrice) * Number(pullUnits),
        pullCompany: {
          pullCompanyId: _id.toString(),
          pullCompanyName,
          pullCompanyLogo,
          pullCompanyPrice,
          pullCompanyUnits,
          pullCompanyPortfolio,
          pullCompanyCost: Number(pullPrice), // hacer
        },
        pullAccountId: id,
        pullStatus: {
          pullIsMatched: false,
          pullIsTransferred: false,
          pullIsCanceled: false
        }
      });
      
      const newPull = await pull.save()
      if(newPull) {
        const account = await Account.findById(id)
        account.accountPortfolio = account.accountPortfolio + (Number(pullPrice) * Number(pullUnits))
        account.accountAlerts = [...account.accountAlerts, {
          accountAlertLogo: pullCompanyLogo,
          accountAlertUnits: Number(pullUnits),
          accountAlertTicker: pullTicker,
          accountAlertPrice: Number(pullPrice),
          accountAlertType: "Pull",
          accountAlertStatus: "Submitted",
          accountAlertIsDated: Date.now(),
          accountAlertAssociatedId: newPull._id.toString()
        }]

        await account.save()
        await createBidOnPull(company)
      }

      if (newPull) return res.status(201).json({ success: true, data: newPull, message: 'Pull created successfully' });
      return res.status(400).json({ success: false, message: 'Something went wrong saving new pull' });
    }
  }
}

const createAskOnPush = async (company) => {
  const foundPushes = await Push.find({ pushTicker: company.companySlug.toLowerCase() });
  if(!foundPushes) return
  const pushesInfo = foundPushes.map((push) => {
    return {
      companyAskPrice: push.pushPrice,
      companyAskUnits: push.pushUnits
    }
  })

  const lowestPushPrice = pushesInfo.slice(1).reduce((acc, curr) => {
    // Choose the lowest pric
    if(curr.companyAskPrice < acc.companyAskPrice) { 
      acc.companyAskPrice = curr.companyAskPrice
      acc.companyAskUnits = curr.companyAskUnits
    }
    
    // If there is other push with samae priceadd the units
    if(curr.companyAskPrice === acc.companyAskPrice) {
      acc.companyAskUnits = acc.companyAskUnits + curr.companyAskUnits
    }
    
    return acc
  }, pushesInfo[0])

  company.companyKpi.companyAsks = lowestPushPrice
  await company.save()
}

const managePushPost = async (req, res, id) => {
  const { pushTicker, pushUnits, pushPrice } = req.body;
  if (!pushTicker || !pushUnits || !pushPrice) return res.status(400).json({ success: false, message: 'Missing ticker, units or price to push' });

  const company = await Company.findOne({ companySlug: pushTicker });
  if (!company) return res.status(400).json({ success: false, message: 'Unnable to found selected company' });
  
  const response = await buyPush();
  if (response) {
    const { _id, companyListing } = company;
    const { companyName: pushCompanyName, companyLogo: pushCompanyLogo } = companyListing;

    if (response) {
    
      const push = new Push({
        pushTicker: pushTicker,
        pushUnits: Number(pushUnits),
        pushPrice: Number(pushPrice),
        pushAmount: Number(pushPrice) * Number(pushUnits),
        pushCompany: {
          pushCompanyId: _id.toString(),
          pushCompanyName,
          pushCompanyLogo,
        },
        pushAccountId: id,
        pushStatus: {
          pushIsMatched: false,
          pushIsTransferred: false,
          pushIsCanceled: false
        }
      });
   
      

      const newPush = await push.save()

      if(newPush) {

        const account = await Account.findById(id)
        if(!account) return

        account.accountAlerts = [...account.accountAlerts, {
          accountAlertLogo: pushCompanyLogo,
          accountAlertUnits: Number(pushUnits),
          accountAlertTicker: pushTicker,
          accountAlertPrice: Number(pushPrice),
          accountAlertType: "Push",
          accountAlertStatus: "Submitted",
          accountAlertIsDated: Date.now(),
          accountAlertAssociatedId: newPush._id.toString()
        }]

        await account.save()

        await createAskOnPush(company)
      }

      if (newPush) return res.status(201).json({ success: true, data: newPush, message: 'Push created successfully' });
      return res.status(400).json({ success: false, message: 'Something went wrong saving new push' });
    }
  }
}

const formatReqObject = (body) => {
  const { cardNumber, cardName, cardCvc, cardCountry, expireMonth, expireYear } = body;
  return { cardNumber, cardName, cardCvc, cardCountry, expireMonth, expireYear };
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {

      const id = await getCurrentUserId(req);
      if (!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' });

      const { type } = req.body;

      await validate(validations, req, res);

      const data = formatReqObject(req.body);

      if (type === 'pick') await managePickPost(req, res, id)
      else if (type === "pull") await managePullPost(req, res, id)
      else if (type === "push") await managePushPost(req, res, id)
      else return res.status(201).json({ success: true, data, message: 'Checkout made successfully' });
      
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
