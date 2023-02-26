import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountDetails: {
            accountFirstName: { type: String },
            accountLastName: { type: String },
            accountAvatarUrl: { type: String },
            accountCurrentTitle: { type: String },
            accountIsActive: { type: String },
            accountIsAdmin: { type: String },
            accountStripeId: { type: String }
        },
        accountKeys: {
            accountAccessKey: { type: String },
            accountSecretKey: { type: String }
        },
        accountContacts: {
            accountEmailAddress: { type: String },
            accountPhoneNumber: { type: String },
            accountSocialLink: { type: String },
            accountHomeAddress: { type: String }
        },
        accountIsCreatedAt: { type: Date, default: Date.now },
        accountIsUpdatedAt: { type: Date, default: Date.now }
    }
);

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);