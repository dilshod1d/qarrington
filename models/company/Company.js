import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  companyTicker: { type: String }, // a unique three-letter symbol, also the stripe product name
  companyListing: {
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
    companyIsoUnits: { type: String }, // the inital total subscriptions
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
  companyKpi: [ // the current and historical data of a company
    {
      companyCurrency: { type: String }, // the default currency of the is the USD
      companyCapitalization: { type: String }, // total companySubscriberUnits * companyPrice or companyIsoPrice
      companyVolume: { type: String }, // total pullUnits
      companyBids: [
        {
          companyBidPrice: { type: String }, // the pull price input by the buyer
          companyBidUnits: { type: String } // the pull units input by the buyer
        }
      ],
      companyAsks: [
        {
          companyAskPrice: { type: String }, // the push price input by the seller
          companyAskUnits: { type: String } // the push units input by the seller
        }
      ],
      companyPrice: { type: String }, // is when the highest companyBidPrice equals the lowest companyAskPrice
      companyPriceVariant: { type: String }, // the value will be 'primary' if companyPrice is up, otherwise 'error'
      companyPricePercentChange: { type: String }, // the percentage difference btw current and previous companyPrice i.e. from 8.54 to 7.92 is +7.25%
      companyPricePointChange: { type: String }, // the point difference btw current and previous companyPrice i.e. from 8.54 to 7.92 is +0.62
      companyActiveCustomers: { type: String }, // total pullAccountIds of pullCompanyId
      companyIsRecordedAt: { type: String } // update and save every 5 seconds
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
