import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        userSlug: { type: String },
        userDetails: {
            userFirstName: { type: String },
            userLastName: { type: String },
            userCurrentTitle: { type: String },
            userAvatarUrl: { type: String },
            userIsActive: { type: String }
        },
        userAccount: {
            userAccessKey: { type: String },
            userSecretKey: { type: String }
        },
        userContacts: {
            userEmailAddress: { type: String },
            userPhoneNumber: { type: String },
            userSocialLink: { type: String },
            userHomeAddress: { type: String }
        },
        userReferral: {
            userReferralLink: { type: String },
            userReferralEarnings: { type: String },
            userReferralTotal: { type: String },
            userReferral: { type: String }
        },
        userStory: {
            userStoryTitle: { type: String },
            userStoryContent: { type: String },
            userStoryIsApproved: { type: String },
            userStoryIsApprovedAt: { type: Date },
            userStoryIsUpdatedAt: { type: Date }
        },
        userIsAdmin: { type: String },
        userStripeId: { type: String },
        userCreatedAt: { type: Date },
        userUpdatedAt: { type: Date }
    }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);