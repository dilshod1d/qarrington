import mongoose from 'mongoose';

const PullSchema = new mongoose.Schema(
    {
        pullTicker: { type: String }, // buyer selects the company's subscription ticker they want to buy
        pullUnits: { type: String }, // this must be a multiple of 5 ... 5 being the minimum
        pullPrice: { type: String }, // this must be a normal number without fraction
        pullAmount: { type: String }, //  we show and charge pullCompanyPrice * pullUnits via Stripe
        pullCompany: { // we show the below company details in the pulled tab of the buyer dashboard
            pullCompanyId: { type: String }, // the _id of the selected company
            pullCompanyName: { type: String }, // the name of the selected company
            pullCompanyLogo: { type: String }, // the logo of the selected company
            pullCompanyUnits: { type: String }, // the pullUnits of the selected company
            pullCompanyPortfolio: { type: String }, // pullUnits * current pullCompanyPrice
            pullCompanyPrice: { type: String }, // the current companyPrice from companyAnalytics
            pullCompanyCost: { type: String } // the price at which the buyer bought the subscription
        },
        pullAccount: {
            pullAccountId: { type: String }, // the _id of the buyer account
            pullAccountPortfolio: { type: String } // the pullUnits of all the buyer's subscriptions * their companyPrices 
        },
        pullStatus: {
            pullIsMatched: { type: String }, // we match pullTicker and pullUnits with pushTicker and pushUnits
            pullIsMatchedWith: { type: String }, // the _id of the push request that matched the pull request
            pullIsMatchedAt: { type: Date, default: Date.now }, // the date the pull request is matched with the push request
            pullIsTransferred: { type: String }, // we transfer the pullUnits/pushUnits from the seller to the buyer's portfolio
            pullIsTransferredAt: { type: Date, default: Date.now }, // the date the transfer is made
            pullIsSubmittedAt: { type: Date, default: Date.now }, // the date the pull request is submitted
            pullIsCanceled: { type: String }, // this will be TRUE if no match in 90 days, otherwise FALSE
            pullIsCanceledAt: { type: Date, default: Date.now } // the date the pull request is canceled and refunded
        }
    },
);

export default mongoose.models.Pull || mongoose.model('Pull', PullSchema);