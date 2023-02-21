import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountSlug: { type: String },
        accountKey: { type: String },
        accountProfile: {
            profileName: { type: String },
            profileTitle: { type: String },
            profileAvatar: { type: String },
            profileIsActive: { type: String },
            profileCreatedAt: { type: String },
        },
        accountContact: {
            contactEmail: { type: String },
            contactNumber: { type: String },
            contactAddress: { type: String },
        },
        accountConnections: { type: String },
        accountReview: {
            reviewContent: { type: String },
            reviewIsApproved: { type: String },
            reviewPostedAt: { type: String },
        },
        accountBank: {
            bankName: { type: String },
            bankCountry: { type: String },
            bankCurrency: { type: String },
            bankAccountName: { type: String },
            bankAccountNumber: { type: String },
            bankRoutingNumber: { type: String },
        },
        accountIsAdmin: { type: String },
    }
);

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);