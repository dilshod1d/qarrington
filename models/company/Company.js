import mongoose from 'mongoose';

const companyKpiData = {
  companyCapitalization: { type: Number },
  companyVolume: { type: Number },
  companyPrice: { type: Number },
  companyPercentChange: { type: Number },
  companyPointChange: { type: Number },
  companyVariant: { type: String },
  companyActiveCustomers: { type: Number },
  companyIsRecordedAt: { type: Date }
};

const CompanySchema = new mongoose.Schema({
  companySlug: { type: String },
  companyListing: {
    companyTicker: { type: String },
    companyName: { type: String },
    companyLogo: { type: String },
    companyHeadline: { type: String },
    companyProduct: { type: String },
    companyProductId: { type: String }, // stripe product id
    companyDescription: { type: String },
    companyIndustry: { type: String },
    companyWebsite: { type: String },
    companyEmail: { type: String },
    companyMarket: { type: String },
    companySize: { type: Number },
    companyKey: { type: String } // a unique 12 characters
  },
  companyUser: [
    {
      companyUserType: { type: String }, // companyTotalSubscribers, companyTotalCustomers, companyActiveCustomers, and companyInActiveCustomers
      companyUserTotal: { type: Number } // total subscribers during iso, subscribers during & after iso, customers created thru companyKey, and customers not created yet
    }
  ],
  companyIso: {
    companyIsoUnits: { type: Number }, // the inital total subscription
    companyIsoPrice: { type: Number }, // the initial price per subscription
    companyIsoDate: { type: Date }, // iso will end 7 days after this date
    companyIsoTime: { type: String }, // the time the iso will start on the date
    companyIsoSubscribers: [
      // the list of the whitelisted subscribers for the iso
      {
        companySubscriberUnits: { type: Number }, // the subscription units during the iso
        companySubscriberPaidAt: { type: Date }, // the subscriber's cheeckout date
        companySubscriberPortfolio: { type: Number }, // companySubscriberUnits * companyIsoPrice
        companySubscriberAccountId: { type: String }, // the account id of the subscriber
        companySubscriberAddedAt: { type: Date } // the whitelisted date
      }
    ],
    companyIsoAmount: { type: Number }, // companyIsoUnits * companyIsoPrice
    companyIsoRaised: { type: Number }, // total companySubscriberUnits * companyIsoPrice
    companyIsoProceed: {
      // how companyIsoAmountRaised will be transfered
      companyIsoProceedIsMade: { type: Boolean, default: false }, // default is FALSE
      companyIsoProceedIsMadeTo: { type: String }, // we will send to the accountId's accountStripeId
      companyIsoProceedIsMadeAt: { type: Date } //  we will send 90% of companyIsoAmountRaised 7 days after the iso
    }
  },
  companyCustomers: [
    // all iso subscribers will become customers after iso
    {
      companyCustomerAccountId: { type: String }, // the account id of the customer
      companyCustomerIsCreated: { type: Boolean }, // the company must use its companyKey to create customer thru REST API after iso
      companyCustomerIsCreatedAt: { type: Date, default: Date.now } //  the date the customer is created thru REST API
    }
  ],
  companyKpi: {
    companyCurrency: { type: String, defualt: 'USD' },
    companyBids: {
      companyBidPrice: { type: Number },
      companyBidUnits: { type: Number },
    },
    companyAsks: {
      companyAskPrice: { type: Number },
      companyAskUnits: { type: Number },
    },
    companyNow: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyToday: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyHour: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyDay: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyWeek: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyMonth: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyQuarter: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    },
    companyYear: {
      updateCount: { type: Number, default: 0 },
      data: [companyKpiData]
    }
  },
  companyAccountId: { type: String }, //  the account id that listed the company
  companyStatus: {
    companyIsSubmitted: { type: Boolean, default: true }, // is the company submitted?
    companyIsSubmittedAt: { type: Date, default: Date.now }, // the day the company is created
    companyIsListed: { type: Boolean, default: false }, // is the company listed?
    companyIsListedAt: { type: Date }, // the day the company iso starts
    companyIsLaunched: { type: Boolean, default: false }, // is the company launched?
    companyIsLaunchedAt: { type: Date } // the day the company iso ends
  }
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
