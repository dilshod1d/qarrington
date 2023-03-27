import mongoose from 'mongoose';

const PushSchema = new mongoose.Schema(
    {
        pushTicker: { type: String }, // seller selects the company's subscription ticker they want to sell
        pushUnits: { type: Number }, // this must be a multiple of 5 ... 5 being the minimum
        pushPrice: { type: Number }, // this must be a normal number without fraction
        pushAmount: { type: Number }, //  we show the pushCompanyPrice * pushUnits
        pushCompany: { // we show the below company details in the pushed tab of the seller dashboard
            pushCompanyId: { type: String }, // the _id of the selected company
            pushCompanyName: { type: String }, // the name of the selected company
            pushCompanyLogo: { type: String }, // the logo of the selected company
        },
        pushAccountId: { type: String }, // the _id of the seller account
        pushStatus: {
            pushIsMatched: { type: Boolean }, // we match pushTicker and pushUnits with pullTicker and pullUnits
            pushIsMatchedWith: { type: String }, // the _id of the pull request that matched the push request
            pushIsMatchedAt: { type: Date }, // the date the push request is matched with the pull request
            pushIsTransferred: { type: Boolean }, // we transfer the pullAmount/pushAmount from the admin stripe account to the seller's accountStripeId
            pushIsTransferredAt: { type: Date }, // the date the transfer is made
            pushIsSubmittedAt: { type: Date, default: Date.now }, // the date the push request is submitted
            pushIsCanceled: { type: Boolean }, // this will be TRUE if no match in 90 days, otherwise FALSE
            pushIsCanceledAt: { type: Date } // the date the push request is canceled
        }
    },
);

export default mongoose.models.Push || mongoose.model('Push', PushSchema);