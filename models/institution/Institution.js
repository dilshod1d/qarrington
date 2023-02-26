import mongoose from 'mongoose';

const InstitutionSchema = new mongoose.Schema({
  institutionSlug: { type: String },
  institutionDetails: {
    institutionName: { type: String },
    institutionLogo: { type: String },
    institutionMarket: { type: String },
    institutionWebsite: { type: String },
    institutionHeadline: { type: String },
    institutionDescription: { type: String },
    institutionSize: { type: String }
  },
  institutionUnderwriters: [
    {
      institutionUnderwriterFirstName: { type: String },
      institutionUnderwriterCurrentTitle: { type: String },
      institutionUnderwriterAvatarUrl: { type: String },
      institutionUnderwriterIsOnline: { type: String },
      institutionUnderwriterUserId: { type: String },
      institutionUnderwriterIsCreatedAt: { type: Date },
      institutionUnderwriterIsRemovedAt: { type: Date },
      institutionUnderwriterIsUpdatedAt: { type: Date }
    }
  ],
  institutionCompanies: [
    {
      institutionCompanyLogo: { type: String },
      institutionCompanyName: { type: String },
      institutionCompanyTicker: { type: String }
    }
  ],
  institutionSlides: [
    {
      institutionSlideName: { type: String },
      institutionSlideCount: { type: String },
      institutionSlideButton: { type: String },
      institutionSlideRoute: { type: String },
      institutionSlideDetail: { type: String },
      institutionSlideTooltip: { type: String }
    }
  ],
  institutionUserId: { type: String },
  institutionIsSubmitted: { type: String },
  institutionIsSubmittedAt: { type: Date },
  institutionIsApproved: { type: String },
  institutionIsApprovedAt: { type: Date },
  institutionUpdatedAt: { type: Date }
});

export default mongoose.models.Institution || mongoose.model('Institution', InstitutionSchema);
