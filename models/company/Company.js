import mongoose from 'mongoose';

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
    companySize: { type: String },
    companyKey: { type: String } // a unique 12 characters
  },
  companyUser: [
    {
      companyUserType: { type: String }, // companyTotalSubscribers, companyTotalCustomers, companyActiveCustomers, and companyInActiveCustomers
      companyUserTotal: { type: String } // total subscribers during iso, subscribers during & after iso, customers created thru companyKey, and customers not created yet 
    }
  ],
  companyIso: {
    companyIsoUnits: { type: String }, // the inital total subscription
    companyIsoPrice: { type: String }, // the initial price per subscription
    companyIsoDate: { type: String }, // iso will end 7 days after this date
    companyIsoTime: { type: String }, // the time the iso will start on the date
    companyIsoSubscribers: [ // the list of the whitelisted subscribers for the iso
      {
        companySubscriberUnits: { type: String }, // the subscription units during the iso
        companySubscriberPaidAt: { type: String }, // the subscriber's cheeckout date
        companySubscriberPortfolio: { type: String }, // companySubscriberUnits * companyIsoPrice
        companySubscriberAccountId: { type: String }, // the account id of the subscriber
        companySubscriberAddedAt: { type: String } // the whitelisted date
      }
    ],
    companyIsoAmount: { type: String }, // companyIsoUnits * companyIsoPrice
    companyIsoRaised: { type: String }, // total companySubscriberUnits * companyIsoPrice
    companyIsoProceed: { // how companyIsoAmountRaised will be transfered
      companyIsoProceedIsMade: { type: String }, // default is FALSE
      companyIsoProceedIsMadeTo: { type: String }, // we will send to the accountId's accountStripeId
      companyIsoProceedIsMadeAt: { type: String } //  we will send 90% of companyIsoAmountRaised 7 days after the iso
    }
  },
  companyCustomers: [ // all iso subscribers will become customers after iso
    {
      companyCustomerAccountId: { type: String }, // the account id of the customer
      companyCustomerIsCreated: { type: String }, // the company must use its companyKey to create customer thru REST API after iso
      companyCustomerIsCreatedAt: { type: Date, default: Date.now } //  the date the customer is created thru REST API
    }
  ],
  companyKpi: [
    {
      companyNow: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyToday: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyHour: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyDay: {
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      },
      companyWeek: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyMonth: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyQuarter: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }],
      companyYear: [{
        companyCapitalization: { type: String },
        companyVolume: { type: String },
        companyBids: [
          {
            companyBidPrice: { type: String },
            companyBidUnits: { type: String }
          }
        ],
        companyAsks: [
          {
            companyAskPrice: { type: String },
            companyAskUnits: { type: String }
          }
        ],
        companyPrice: { type: String },
        companyPercentChange: { type: String },
        companyPointChange: { type: String },
        companyVariant: { type: String },
        companyActiveCustomers: { type: String },
        companyIsRecordedAt: { type: String }
      }]
    }
  ],
  companyAccountId: { type: String }, //  the account id that listed the company
  companyStatus: {
    companyIsSubmitted: { type: String }, // is the company submitted?
    companyIsSubmittedAt: { type: Date, default: Date.now }, // the day the company is created
    companyIsListed: { type: String }, // is the company listed?
    companyIsListedAt: { type: Date, default: Date.now }, // the day the company iso starts
    companyIsLaunched: { type: String }, // is the company launched?
    companyIsLaunchedAt: { type: Date, default: Date.now } // the day the company iso ends
  }
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
