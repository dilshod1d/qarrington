import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountPersonal: {
            accountFirstName: { type: String },
            accountLastName: { type: String },
            accountGovernmentId: { type: String },
            accountIdNumber: { type: String },
            accountBirthDate: { type: String },
            accountHomeCountry: { type: String },
        },
        accountBusiness: {
            accountBusinessName: { type: String },
            accountBusinessType: { type: String },
            accountBusinessIndustry: { type: String },
            accountBusinessWebsite: { type: String }
        },
        accountBank: {
            accountBankCountry: { type: String },
            accountBankCurrency: { type: String },
            accountIbanNumber: { type: String },
            accountNumber: { type: String },
            accountRoutingNumber: { type: String },
            accountSortCode: { type: String }
        },
        accountContact: {
            accountEmailAddress: { type: String },
            accountPhoneNumber: { type: String },
            accountHomeAddress: { type: String },
            accountZipCode: { type: String },
            accountCityName: { type: String },
            accountStateName: { type: String }
        },
        accountProfile: {
            accountAvatarUrl: { type: String },
            accountCurrentTitle: { type: String }
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