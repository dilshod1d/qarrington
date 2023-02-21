import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema(
    {
        subscriptionSlug: { type: String },
        subscriptionListing: {
            listingName: { type: String },
            listingTicker: { type: String },
            listingWebsite: { type: String },
            listingDetail: { type: String },
            listingLogo: { type: String },
            listingUnits: { type: String }
        },
        subscriptionPrice: {
            launchPrice: { type: String },
            currentPrice: { type: String }
        },
        subscriptionTrack: {
            trackCurrentPrice: { type: String },
            trackPointInterval: { type: String },
            trackPercentInterval: { type: String },
            trackVariation: { type: String }
        },
        subscriptionStripeId: { type: String },
        subscriptionAccountId: { type: String },
        subscriptionIsApproved: { type: String },
        subscriptionAccounts: [{
            accountWhitelistTotal: { type: String },
            accountId: { type: String },
            accountIsCustomer: { type: String },
            accountIsCreated: { type: String },
            accountPulledUnits: { type: String },
            accountPulledPrice: { type: String },
            accountPulledAmount: { type: String },
            accountWhitelistedAt: { type: String },
        }],
        subscriptionPayout: {
            payoutAmount: { type: String },
            payoutIsMade: { type: String },
        },
        subscriptionKey: { type: String },
        subscriptionSubmittedAt: { type: String }
    }
);

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);