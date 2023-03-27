import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema(
    {
        accountPersonal: {
            accountFirstName: { type: String },
            accountLastName: { type: String },
            accountGovernmentId: { type: String },
            accountIdNumber: { type: String },
            accountBirthDate: { type: String },
            accountHomeCountry: { type: String }
        },
        accountBusiness: {
            accountBusinessName: { type: String },
            accountBusinessType: { type: String, default:'individual' },
            accountBusinessIndustry: { type: String, default:'SaaS' },
            accountBusinessWebsite: { type: String },
            accountBusinessAddress: { type: String },
            accountBusinessCountry: { type: String },
            accountBusinessEmail: { type: String }
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
            accountAccessKey: { type: String, unique: true, minlength: 12, maxlength: 12 },
            accountSecretKey: { type: String, unique: true, minlength: 12, maxlength: 12, immutable: true }
        },
        accountStatus: {
            accountIsActive: { type: Boolean, default: false },
            accountIsAdmin: { type: Boolean, default: false },
            accountIsMaker: { type: Boolean },
            accountIsVerified: { type: Boolean, default: false },
            accountIsVerifiedAt: { type: Date },
            accountCompletionRate: { type: Number }
        },
        accountAlerts: [
            {
                accountAlertLogo: { type: String },
                accountAlertUnits: { type: Number },
                accountAlertTicker: { type: String },
                accountAlertPrice: { type: Number },
                accountAlertType: { type: String },
                accountAlertStatus: { type: String },
                accountAlertIsDated: { type: Date, defualt: Date.now },
                accountAlertAssociatedId: { type: String }
            }
        ],
        accountStripeId: { type: String },
        accountIsCreatedAt: { type: Date, immutable: true, default: Date.now },
        accountIsUpdatedAt: { type: Date, default: Date.now },
        accountPortfolio: { type: Number } //
    }
)


export default mongoose.models.Account || mongoose.model('Account', AccountSchema);