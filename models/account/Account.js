import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountSlug: { type: String },
        accountReferrals: {
            referralId: { type: String },
            referralTotal: { type: String },
            referralEarnings: { type: String }
        },
        accountKeys: {
            accessKey: { type: String },
            secretKey: { type: String }
        },
        accountProfile: {
            profileFirstName: { type: String },
            profileLastName: { type: String },
            profileTitle: { type: String },
            profileAvatar: { type: String },
            profileIsActive: { type: String }
        },
        accountContacts: {
            contactEmail: { type: String },
            contactPhone: { type: String },
            contactLink: { type: String },
            contactAddress: { type: String }
        },
        accountStories: {
            storyTitle: { type: String },
            storyContent: { type: String },
            storyIsApproved: { type: String },
            storyIsApprovedAt: { type: String },
            storySubmittedAt: { type: String }
        },
        accountCompany: {
            companyId: { type: String },
            companyName: { type: String },
            companyEmail: { type: String },
            companyWebsite: { type: String },
            companyTicker: { type: String },
            companyRoute: { type: String }
        },
        accountIsAdmin: { type: String },
        accountStripeId: { type: String },
        accountCreatedAt: { type: String }
    }
);

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);