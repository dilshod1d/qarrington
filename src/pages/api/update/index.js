import dbConnect from '@lib/dbConnect';
import Company from '@models/company/Company';
import Match from '@models/match/Match';

const prevDictionaryrange = {
  N: 11,
  T: 59,
  H: 23,
  D: 6,
  W: 3,
  M: 2,
  Q: 3,
  Y: Number.POSITIVE_INFINITY
};

const dictionaryRange = {
  N: 0,
  T: 11,
  H: 59,
  D: 23,
  W: 6,
  M: 3,
  Q: 2,
  Y: 3
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

const checkIfCompanyIsInIsoDate = (company, companySubscribersUnits) => {
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
    companyBids: [],
    companyAsks: [],
    companyPointChange: 0,
    companyVariant: 'primary',
    companyIsRecordedAt: Date.now(),
    companyPercentChange: 0,
    companyActiveCustomers: activeCustomers
  };

  // Every 5 seconds
  if (range === 'N') {
    kpi.updateCount = kpi.updateCount === prevDictionaryrange[range] ? 0 : kpi.updateCount + 1;
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
      newData.companyPointChange = currentKpiData.companyPrice - newData.companyPrice;

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

    // Company bids is added when a user submits a pull request, if this happends this will change between updates
    newData.companyBids = kpi.data[0].companyBids;

    // Company asks is added when a user submits a push request, if this happends this will change between updates
    newData.companyAsks = kpi.data[0].companyAsks;

    kpi.data = [newData, ...kpi.data.slice(0, 60)];
    return;
  }

  const prevSlice = prevRangeKpi.data.slice(0, dictionaryRange[range]);

  newData.companyPrice = prevSlice.reduce((acc, curr) => acc + curr.companyPrice, 0);
  newData.companyVolume = prevSlice.reduce((acc, curr) => acc + curr.companyVolume, 0);

  newData.companyCapitalization = prevSlice.reduce((acc, curr) => acc + curr.companyCapitalization, 0);
  newData.companyBids = prevSlice.companyBids;
  newData.companyAsks = prevSlice.companyAsks;

  if (kpi.data[1]) {
    newData.companyPercentChange = Number(((newData.companyPrice / kpi.data[1]?.companyPrice) * 100 - 100).toFixed(2));
    newData.companyPointChange = kpi.data[0].companyPrice - kpi.data[1].companyPrice;
  } else {
    newData.companyPercentChange = 0;
    newData.companyPointChange = 0;
  }

  newData.companyVariant = newData.companyPointChange >= 0 ? 'primary' : 'error';

  if (prevRangeKpi.updateCount === dictionaryRange[range]) {
    kpi.updateCount = kpi.updateCount === prevDictionaryrange[range] ? 0 : kpi.updateCount + 1;
    kpi.data = [newData, ...kpi.data.slice(0, 60)];
  } else {
    kpi.data[0] = newData;
  }
};

const updateCompanyKpi = async (company, isOnIsoDate) => {
  const suscriberUnits = company.companyIso.companyIsoSubscribers.reduce((acc, curr) => {
    if (curr.companySubscriberUnits) {
      acc = acc + curr.companySubscriberUnits;
    }
    return acc;
  }, 0);

  if (company.companyStatus.companyIsLaunched) {
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
  if (req.query.secret !== process.env.UPDATE_SECRET_TOKEN) return res.status(401).json({ message: 'Not authorized' });

  try {
    await dbConnect();
    const companies = await Company.find();
    const comaniesPromises = companies.map(async (company) => {
      const companySubscribersUnits = company.companyUser.find(({ companyUserType }) => companyUserType === 'Total Subscribers')?.companyUserTotal;
      const isOnIsoDate = checkIfCompanyIsInIsoDate(company, companySubscribersUnits);
      await updateCompanyKpi(company, isOnIsoDate);
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
