import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema(
    {
        storyByUnderwriter: [
            {
                storyByUnderwriterName: { type: String },
                storyByUnderwriterTitle: { type: String },
                storyByUnderwriterAvatar: { type: String },
                storyByUnderwriterContent: { type: String },
                storyByUnderwriterIsActive: { type: String }
            }
        ],
        storyByFounder: [
            {
                storyByFounderName: { type: String },
                storyByFounderTitle: { type: String },
                storyByFounderAvatar: { type: String },
                storyByFounderContent: { type: String },
                storyByFounderIsActive: { type: String }
            }
        ],
        storyBySubscriber: [
            {
                storyBySubscriberName: { type: String },
                storyBySubscriberTitle: { type: String },
                storyBySubscriberAvatar: { type: String },
                storyBySubscriberContent: { type: String },
                storyBySubscriberIsActive: { type: String }
            }
        ],
        storyByPublisher: [
            {
                storyByPublisherName: { type: String },
                storyByPublisherTitle: { type: String },
                storyByPublisherAvatar: { type: String },
                storyByPublisherContent: { type: String },
                storyByPublisherIsActive: { type: String }
            }
        ],
        storyByTrader: [
            {
                storyByTraderName: { type: String },
                storyByTraderTitle: { type: String },
                storyByTraderAvatar: { type: String },
                storyByTraderContent: { type: String },
                storyByTraderIsActive: { type: String }
            }
        ],
        storyByHodler: [
            {
                storyByHodlerName: { type: String },
                storyByHodlerTitle: { type: String },
                storyByHodlerAvatar: { type: String },
                storyByHodlerContent: { type: String },
                storyByHodlerIsActive: { type: String }
            }
        ],
        storyByInvestor: [
            {
                storyByInvestorName: { type: String },
                storyByInvestorTitle: { type: String },
                storyByInvestorAvatar: { type: String },
                storyByInvestorContent: { type: String },
                storyByInvestorIsActive: { type: String }
            }
        ]
    }
);

export default mongoose.models.Story || mongoose.model('Story', StorySchema);