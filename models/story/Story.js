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
        storyByCustomer: [
            {
                storyByCustomerName: { type: String },
                storyByCustomerTitle: { type: String },
                storyByCustomerAvatar: { type: String },
                storyByCustomerContent: { type: String },
                storyByCustomerIsActive: { type: String }
            }
        ]
    }
);

export default mongoose.models.Story || mongoose.model('Story', StorySchema);