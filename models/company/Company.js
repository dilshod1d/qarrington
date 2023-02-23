import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  companyTicker: { type: String },
  companyListing: {
    listingName: { type: String },
    listingLogo: { type: String },
    listingProduct: { type: String },
    listingHeadline: { type: String },
    listingDescription: { type: String },
    listingIndustry: { type: String },
    listingWebsite: { type: String },
    listingEmail: { type: String },
    listingMarket: { type: String },
    listingIsSubmitted: {
      isSubmitted: { type: String },
      isSubmittedAt: { type: String }
    },
    listingIsListed: {
      isListed: { type: String },
      isListedAt: { type: String }
    },
    listingIsLaunched: {
      isLaunched: { type: String },
      isLaunchedAt: { type: String }
    }
  },
  companyIso: {
    isoUnits: { type: String },
    isoPrice: { type: String },
    isoStart: {
      startMonth: { type: String },
      startDay: { type: String },
      startYear: { type: String }
    },
    isoTotalSubscribers: { type: String },
    isoSubscribers: [
      {
        subscriberId: { type: String },
        subscriberUnits: { type: String },
        subscriberPaidAt: { type: String },
        subscriberAsset: { type: String },
        subscriberAddedAt: { type: String }
      }
    ],
    isoAmount: { type: String },
    isoAmountWiredAt: { type: String }
  },
  companySubscription: {
    subscriptionMarketCap: { type: String },
    subscriptionVolume: { type: String },
    subscriptionPrice: { type: String },
    subscriptionKey: { type: String },
    subscriptionUpdatedAt: { type: String }
  },
  companyUnderwriter: {
    underwriterAccount: {
      accountId: { type: String },
      accountStripeId: { type: String }
    }
  },
  companyFounder: {
    founderAccount: {
      accountId: { type: String },
      accountStripeId: { type: String }
    }
  },
  companySubscribers: [
    {
      subscriberId: { type: String },
      subscriberHasAccess: { type: String },
      subscriberUnits: { type: String },
      subscriberPrice: { type: String },
      subscriberNewCount: { type: String }
    }
  ]
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
