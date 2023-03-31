import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema(
    {
        guideForUnderwriter: [
            {
                guideForUnderwriterIcon: { type: String },
                guideForUnderwriterTitle: { type: String },
                guideForUnderwriterContent: { type: String },
                guideForUnderwriterTooltip: { type: String }
            }
        ],
        guideForFounder: [
            {
                guideForFounderIcon: { type: String },
                guideForFounderTitle: { type: String },
                guideForFounderContent: { type: String },
                guideForFounderTooltip: { type: String }
            }
        ],
        guideForSubscriber: [
            {
                guideForSubscriberIcon: { type: String },
                guideForSubscriberTitle: { type: String },
                guideForSubscriberContent: { type: String },
                guideForSubscriberTooltip: { type: String }
            }
        ],
        guideForPublisher: [
            {
                guideForPublisherIcon: { type: String },
                guideForPublisherTitle: { type: String },
                guideForPublisherContent: { type: String },
                guideForPublisherTooltip: { type: String }
            }
        ],
        guideForInvestor: [
            {
                guideForInvestorIcon: { type: String },
                guideForInvestorTitle: { type: String },
                guideForInvestorContent: { type: String },
                guideForInvestorTooltip: { type: String }
            }
        ]
    }
);

export default mongoose.models.Guide || mongoose.model('Guide', GuideSchema);