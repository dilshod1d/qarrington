import { checkIfCompanyHasPastIsoDate } from '@helpers/companies-helpers';
import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import Company from '@models/company/Company';
import Match from '@models/match/Match';
import Pick from '@models/pick/Pick';
import Pull from '@models/pull/Pull';
import { protectRoute } from '@lib/protectRoute';

const prevDictionaryrange = {
  N: 12,
  T: 60,
  H: 24,
  D: 7,
  W: 4,
  M: 3,
  Q: 4,
  Y: Number.POSITIVE_INFINITY
};

const dictionaryRange = {
  N: 0,
  T: 12,
  H: 60,
  D: 24,
  W: 7,
  M: 4,
  Q: 3,
  Y: 4
};

const dictionary = [
  {
    key: 'N',
    curr: 'companyNow',
    prev: null
  },
  {
    key: 'T',
    curr: 'companyToday',
    prev: 'companyNow'
  },

  {
    key: 'H',
    curr: 'companyHour',
    prev: 'companyToday'
  },
  {
    key: 'D',
    curr: 'companyDay',
    prev: 'companyHour'
  },
  {
    key: 'W',
    curr: 'companyWeek',
    prev: 'companyDay'
  },
  {
    key: 'M',
    curr: 'companyMonth',
    prev: 'companyWeek'
  },
  {
    key: 'Q',
    curr: 'companyQuarter',
    prev: 'companyMonth'
  },
  {
    key: 'Y',
    curr: 'companyYear',
    prev: 'companyQuarter'
  }
];

const updateAccountPortfolio = async () => {
  const accounts = await Account.find()
  for (const account of accounts) {
    const picks = await Pick.find({ pickAccountId: account._id.toString() })
    const pulls = await Pull.find({ pullAccountId: account._id.toString() })

    let accountPortfolio = picks.reduce((acc, curr) => acc + (curr.pickPrice * curr.pickUnits), 0)
    accountPortfolio = accountPortfolio + pulls.reduce((acc, curr) => acc + (curr.pullPrice * curr.pullUnits), 0)

    account.accountPortfolio = accountPortfolio
    await account.save()
  }
}

const setPicksToPulls = async (company) => {
  const picks = await Pick.find({ pickTicker: company.companySlug })
  for (const pick of picks) {
    console.log(pick)
    const newPull = new Pull({
        pullTicker: pick.pickTicker,
        pullUnits: pick.pickUnits,
        pullPrice: pick.pickPrice,
        pullAmount: pick.pickAmount,
        pullCompany: {
          pullCompanyId: pick.pickCompany.pickCompanyId,
          pullCompanyName: pick.pickCompany.pickCompanyName,
          pullCompanyLogo: pick.pickCompany.pickCompanyLogo,
          pullCompanyPrice: company.companyKpi.companyNow.data[0].companyPrice,
          pullCompanyCost: company.companyIso.companyIsoPrice,
          pullCompanyPortfolio: company.companyKpi.companyNow.data[0].companyPrice * pick.pickUnits,
          pullCompanyUnits: pick.pickUnits
        },
        pullAccountId: pick.pickAccountId,
        pullStatus: {
          pullIsMatched: false,
          pullIsTransferred: true,
          pullIsCanceled: false
        }
    })
    await newPull.save()
    await Pick.findByIdAndDelete(pick._id)
  }
}

const checkIfCompanyIsInIsoDate = async (company, companySubscribersUnits) => {
  // The company doesn't have a product listed on stripe
  if (!company.companyStatus.companyIsListed) return false;

  const parseCompany = JSON.parse(JSON.stringify(company));
  const hour = parseCompany.companyIso.companyIsoTime;
  const isoTime = new Date(
    parseCompany.companyIso.companyIsoDate.split('T')[0] + 'T' + (hour.split(':')[0].length === 1 ? '0' + hour : hour) + ':00.000+00:00'
  );
  const now = new Date(Date.now());
  const endIsoTime = new Date(isoTime.getTime() + 1000 * 60 * 60 * 24 * 7);


  // Company is not launched, check if has to be launched
  if (!company.companyStatus.companyIsLaunched) {
    // If is the iso time and the company has reach the 1000 subs the company is launched
    if (companySubscribersUnits > 1000 && now > isoTime && now < endIsoTime) {
      company.companyStatus.companyIsLaunched = true;
      company.companyStatus.companyIsLaunchedAt = Date.now();
      return true;
    }

    // If is iso time but the company hasn't reach the 1000 subscribers then add 7 days to start iso date
    if (companySubscribersUnits < 1000 && now > isoTime && now < endIsoTime) {
      company.companyIso.companyIsoDate = JSON.parse(JSON.stringify(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))).split('T')[0];
    }

    return false;
  }

  // Company is launched, check if it is on iso time
  if (company.companyStatus.companyIsLaunched) {
    // Iso time has ended
    if (now > endIsoTime) {
      company.companyStatus.companyIsLaunched = false;
      // End of iso Date
      await setPicksToPulls(company)

      return false;
    }

    // Company is on iso time
    if (endIsoTime > now && now > isoTime) return true;
  }

  return false;
};

const updateKpi = async (range, kpi, prevRangeKpi, companySubscribersUnits, activeCustomers, isOnIsoDate, companyIsoPrice, companySlug) => {
  const newData = {
    companyCapitalization: 0,
    companyVolume: 0,
    companyPrice: 0,
    companyPointChange: 0,
    companyVariant: 'primary',
    companyIsRecordedAt: Date.now(),
    companyPercentChange: 0,
    companyActiveCustomers: activeCustomers
  };

  // Every 5 seconds
  if (range === 'N') {
    kpi.updateCount = kpi.updateCount + 1;
    const currentKpiData = kpi.data[0];
    const matches = await Match.find();
    const matchesFiveSeconds =
      matches?.filter(({ matchIsAddedAt, matchCompany }) => {
        return (
          Math.abs(Date.now() - new Date(matchIsAddedAt).getTime()) <= 5000 &&
          matchCompany.matchCompanyTicker.toLowerCase() === companySlug.toLowerCase()
        );
      }) || [];

    if (currentKpiData) {
      // Company price is calculated in base of the last match
      newData.companyPrice =
        matchesFiveSeconds.length > 0
          ? matchesFiveSeconds.sort((a, b) => a.matchIsAddedAt - b.matchIsAddedAt)[0].matchPrice
          : kpi.data[0].companyPrice;
      // Company point change
      newData.companyPointChange = newData.companyPrice - currentKpiData.companyPrice;
      
      // Company percentage change
      newData.companyPercentChange = Number(((newData.companyPrice / currentKpiData.companyPrice) * 100 - 100).toFixed(2));
      
      // Company variant
      newData.companyVariant = newData.companyPointChange >= 0 ? 'primary' : 'error';
    }
    
    // Company Capitalization
    if (companySubscribersUnits) {
      newData.companyCapitalization = isOnIsoDate ? companySubscribersUnits * companyIsoPrice : companySubscribersUnits * newData.companyPrice;
    }
    // Company volume is calculated in base of the amount of units matched in a range of 5 seconds
    const units = matchesFiveSeconds.reduce((acc, { matchUnits }) => acc + matchUnits, 0);
    newData.companyVolume = units;
    
    kpi.data = [newData, ...kpi.data.slice(0, 60)];

    return;
  }

  const prevSlice = prevRangeKpi.data.slice(0, dictionaryRange[range]);

  newData.companyPrice = prevSlice[0].companyPrice;
  newData.companyCapitalization = prevSlice[0].companyCapitalization

  newData.companyVolume = prevSlice.reduce((acc, curr) => acc + curr.companyVolume, 0);

  if (kpi.data[1]) {
    newData.companyPercentChange = Number(((newData.companyPrice / kpi.data[1]?.companyPrice) * 100 - 100).toFixed(2));
    newData.companyPointChange = kpi.data[0].companyPrice - kpi.data[1].companyPrice;
  } else {
    newData.companyPercentChange = 0;
    newData.companyPointChange = 0;
  }

  newData.companyVariant = newData.companyPointChange >= 0 ? 'primary' : 'error';

  if ((dictionaryRange[range] + 1) === prevRangeKpi.updateCount) {
    kpi.updateCount = kpi.updateCount + 1;
    prevRangeKpi.updateCount = 0

    kpi.data = [newData, ...kpi.data.slice(0, 59)];
  } else {
    kpi.data[0] = newData;
  }
};

const updateCompanyKpi = async (company, isOnIsoDate) => {
  const suscriberUnits = company.companyIso.companyIsoUnits
  if (company.companyStatus.companyIsLaunched || checkIfCompanyHasPastIsoDate(company)) {
    const { companyKpi, companySlug } = company;
    const companyIsoPrice = company.companyIso.companyIsoPrice;
    const activeCustomers = company.companyUser.find(({ companyUserType }) => companyUserType === 'Active Customers')?.companyUserTotal;
    for (const range of dictionary) {
      const prevKpi = companyKpi[range.prev] || null;
      await updateKpi(range.key, companyKpi[range.curr], prevKpi, suscriberUnits, activeCustomers, isOnIsoDate, companyIsoPrice, companySlug);
    }
  }
};

export default async function handler(req, res) {
  await protectRoute(req, res);
  if (req.query.secret !== process.env.UPDATE_SECRET_TOKEN) return res.status(401).json({ message: 'Not authorized' });

  try {
    await dbConnect();
    const companies = await Company.find();
    const comaniesPromises = companies.map(async (company) => {
      const companySubscribersUnits = company.companyUser.find(({ companyUserType }) => companyUserType === 'Total Subscribers')?.companyUserTotal;
      const isOnIsoDate = await checkIfCompanyIsInIsoDate(company, companySubscribersUnits);
      await updateCompanyKpi(company, isOnIsoDate);
      await updateAccountPortfolio(company)
      try {
        await company.save();
      } catch (error) {
        console.log(error);
      }
      return;
    });

    const responses = await Promise.allSettled(comaniesPromises);
    return res.status(200).json({ status: 'success', message: 'All updated' });
  } catch (error) {
    return res.status(500).json(error);
  }
}
