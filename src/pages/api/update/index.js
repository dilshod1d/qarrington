import dbConnect from "@lib/dbConnect";
import Company from "@models/company/Company";

const calculatePrice = (currPrice) => {
  return Number(((Math.random() * 0.2 + 0.9) * currPrice).toFixed(2)) < 1 ? 60 :Number(((Math.random() * 0.2 + 0.9) * currPrice).toFixed(2))
}

const updateCompanyKpi = (kpi) => {
  kpi.updateCount += 1

  const newData = {
    companyCapitalization: 500,
    companyVolume: 500,
    companyPrice: calculatePrice(kpi.data[0]?.companyPrice ? kpi.data[0]?.companyPrice : 50),
    companyBids: [],
    companyAsks: [],
    companyPointChange: 0,
    companyVariant: 400,
    companyIsRecordedAt: Date.now(),
    companyPercentChange: 0,
    companyActiveCustomers: 5050
  }

  if (kpi.data[0]) {
    newData.companyPercentChange = Number((((newData.companyPrice / kpi.data[0].companyPrice) * 100) - 100).toFixed(2))

    let companyVariant
    if(newData.companyPercentChange >= 5) {
      companyVariant = 800
    } else if(newData.companyPercentChange > 0 && newData.companyPercentChange < 5 ) {
      companyVariant = 600
    } else if(newData.companyPercentChange > -5 && newData.companyPercentChange < 0 ) {
      companyVariant = 400
    } else if(newData.companyPercentChange <= -5) {
      companyVariant = 200
    }

    newData.companyVariant =  companyVariant
  } 

  kpi.data = kpi.data.length > 59 ? [newData, ...kpi.data.slice(0,60)] : [newData, ...kpi.data]
}

const updateCompanyKpiIfNecessary = (company) => {
  if(company.companyKpi.companyNow.data.length > 0) {
    const seconds = 5
    const { companyKpi } = company

    updateCompanyKpi(companyKpi.companyNow)
    if(companyKpi.companyNow.updateCount === (60/seconds)) {
      companyKpi.companyNow.updateCount = 0
      updateCompanyKpi(companyKpi.companyToday)
      if(companyKpi.companyToday.updateCount === (60)) {
        companyKpi.companyToday.updateCount = 0
        updateCompanyKpi(companyKpi.companyHour)
        if(companyKpi.companyHour.updateCount === (24)) {
          companyKpi.companyHour.updateCount = 0
          updateCompanyKpi(companyKpi.companyDay)
          if(companyKpi.companyDay.updateCount === (7)) {
            companyKpi.companyDay.updateCount = 0
            updateCompanyKpi(companyKpi.companyWeek)
            if(companyKpi.companyWeek.updateCount === (4)) {
              companyKpi.companyWeek.updateCount = 0
              updateCompanyKpi(companyKpi.companyMonth)
              if(companyKpi.companyMonth.updateCount === (3)) {
                companyKpi.companyMonth.updateCount = 0
                updateCompanyKpi(companyKpi.companyQuarter)
                if(companyKpi.companyQuarter.updateCount === (4)) {
                  companyKpi.companyQuarter.updateCount = 0
                  updateCompanyKpi(companyKpi.companyYear)
                }
              }
            }
          }
        }
      } 
    }
  }
}

const updateIsoIfNecessary = (company) => {
  const parseCompany = JSON.parse(JSON.stringify(company))
  const hour = parseCompany.companyIso.companyIsoTime
  const isoTime = new Date(parseCompany.companyIso.companyIsoDate.split('T')[0] + "T" + (hour.split(':')[0].length === 1 ? ('0' + hour) : hour) + ":00.000+00:00")
  const now = new Date(Date.now())
  const endIsoTime = new Date(isoTime.getTime() + (1000*60*60*24*7))

  if(now > endIsoTime && company.companyStatus.companyIsListed) {
    company.companyStatus.companyIsListed = false
  } else if(now > isoTime) {
    if(company.companyStatus.companyIsLaunched) {
      company.companyStatus.companyIsListed = true
      company.companyStatus.companyIsListedAt = Date.now()
    } else {
      company.companyIso.companyIsoDate = JSON.parse(JSON.stringify(new Date(Date.now() + (1000*60*60*24*7)))).split('T')[0]
    }
  }
}

export default async function handler(req, res) {
  
  if(req.query.secret !== process.env.UPDATE_SECRET_TOKEN) return res.status(401).json({ message: "Not authorized" })
  
  try {
    await dbConnect()
    const companies = await Company.find()
    const comaniesPromises = companies.map(async (company) => {
      
      updateCompanyKpiIfNecessary(company)
      updateIsoIfNecessary(company)

      return await company.save()
    })
  
    const responses = await Promise.allSettled(comaniesPromises)
    return res.status(200).json({ status: 'success', message: 'All updated' })
  } catch (error) {
    return res.status(500).json(error)
  }
}