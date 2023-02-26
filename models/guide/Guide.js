import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema(
    {
        guideForFounder: [
            {
                guideForFounderIcon: { type: String },
                guideForFounderTitle: { type: String },
                guideForFounderContent: { type: String },
                guideForFounderTooltip: { type: String }
            }
        ],
        guideForCustomer: [
            {
                guideForCustomerIcon: { type: String },
                guideForCustomerTitle: { type: String },
                guideForCustomerContent: { type: String },
                guideForCustomerTooltip: { type: String }
            }
        ]
    }
);

export default mongoose.models.Guide || mongoose.model('Guide', GuideSchema);