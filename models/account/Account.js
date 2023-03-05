import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountProfile: {
            accountFirstName: { type: String },
            accountLastName: { type: String },
            accountEmailAddress: { type: String },
            accountHomeAddress: { type: String },
            accountPhoneNumber: { type: String },
            accountIdNumber: { type: String },
            accountCountryCode: { type: String },
            accountZipCode: { type: String },
            accountBirthDate: { type: String },
            accountGovernmentId: { type: String },
            accountAvatarUrl: { type: String },
            accountCurrentTitle: { type: String }
        },
        accountBank: {
            accountCountryCurrency: { type: String },
            accountIbanNumber: { type: String },
            accountNumber: { type: String },
            accountRoutingNumber: { type: String }
        },
        accountBusiness: {
            accountBusinessName: { type: String },
            accountBusinessType: { type: String },
            accountBusinessIndustry: { type: String },
            accountBusinessWebsite: { type: String }
        },
        accountKeys: {
            accountAccessKey: { type: String },
            accountSecretKey: { type: String }
        },
        accountStatus: {
            accountIsActive: { type: String },
            accountIsAdmin: { type: String },
            accountIsMaker: { type: String },
            accountIsVerified: { type: String },
            accountIsVerifiedAt: { type: String }
        },
        accountAlerts: [
            {
                accountAlertLogo: { type: String },
                accountAlertUnits: { type: String },
                accountAlertTicker: { type: String },
                accountAlertPrice: { type: String },
                accountAlertType: { type: String },
                accountAlertStatus: { type: String },
                accountAlertIsDated: { type: String }
            }
        ],
        accountStripeId: { type: String },
        accountIsCreatedAt: { type: Date },
        accountIsUpdatedAt: { type: Date }
    }
);

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);