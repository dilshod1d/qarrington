import mongoose from 'mongoose';

const PullSchema = new mongoose.Schema(
    {
        pullSlug: { type: String },
        pullPrice: { type: String },
        pullRequests: {
            requestPairId: { type: String },
            requestUnits: { type: String },
            requestPrice: { type: String },
            requestAmount: { type: String },
            requestIsMatched: { type: String },
            requestSubmittedAt: { type: String },
            requestMatchedAt: { type: String }
        },
        pullSubscription: {
            subscriptionId: { type: String },
            subscriptionName: { type: String },
            subscriptionLogo: { type: String },
            subscriptionTicker: { type: String },
            subscriptionUnits: { type: String },
            subscriptionBalance: { type: String }
        },
        pullAccount: {
            accountId: { type: String },
            accountBalance: { type: String }
        },
        pullUpdatedAt: { type: String }
    },
);

export default mongoose.models.Pull || mongoose.model('Pull', PullSchema);