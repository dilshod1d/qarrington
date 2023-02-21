import mongoose from 'mongoose';

const PushSchema = new mongoose.Schema(
    {
        pushSlug: { type: String },
        pushPrice: { type: String },
        pushRequests: {
            requestPairId: { type: String },
            requestUnits: { type: String },
            requestPrice: { type: String },
            requestAmount: { type: String },
            requestIsMatched: { type: String },
            requestSubmittedAt: { type: String },
            requestMatchedAt: { type: String }
        },
        pushSubscription: {
            subscriptionId: { type: String },
            subscriptionName: { type: String },
            subscriptionLogo: { type: String },
            subscriptionTicker: { type: String },
            subscriptionUnits: { type: String },
            subscriptionBalance: { type: String }
        },
        pushAccount: {
            accountId: { type: String },
            accountBalance: { type: String }
        },
        pushUpdatedAt: { type: String }
    },
);

export default mongoose.models.Push || mongoose.model('Push', PushSchema);