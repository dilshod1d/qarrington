import mongoose from 'mongoose';

const InstitutionSchema = new mongoose.Schema({
  institutionSlug: { type: String },
  institutionProfile: {
    profileName: { type: String },
    profileMarket: { type: String },
    profileSize: { type: String },
    profileLogo: { type: String },
    profileWebsite: { type: String },
    profileHeadline: { type: String },
    profileDescription: { type: String }
  },
  institutionUnderwriters: [
    {
      underwriterFirstName: { type: String },
      underwriterTitle: { type: String },
      underwriterAvatar: { type: String },
      underwriterStory: {
        storyContent: { type: String },
        storyIsApproved: { type: String },
        storyIsApprovedAt: { type: String },
        storySubmittedAt: { type: String }
      },
      underwriterIsActive: { type: String },
      underwriterAccountId: { type: String }
    }
  ],
  institutionCompanies: [
    {
      companyId: { type: String },
      companyName: { type: String },
      companyTicker: { type: String },
      companyLogo: { type: String },
      companyIsListed: { type: String },
      companyStartedAt: { type: String }
    }
  ],
  institutionSlides: [
    {
      slideName: { type: String },
      slideCount: { type: String },
      slideButton: { type: String },
      slideRoute: { type: String },
      slideDetail: { type: String },
      slideTooltip: { type: String }
    }
  ],
  institutionAccountId: { type: String },
  institutionIsApproved: { type: String },
  institutionIsApprovedAt: { type: String },
  institutionSubmittedAt: { type: String },
  institutionUpdatedAt: { type: String }
});

export default mongoose.models.Institution || mongoose.model('Institution', InstitutionSchema);
