import mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema(
    {
        type: { type: String },
        title: { type: String },
        amount: { type: String },
        pending: [
            {
                type: { type: String },
                title: { type: String },
                amount: { type: String },
                tooltip: { type: String }
            }
        ],
        approved: { type: String },
        createdAt: { type: String }
    },
);

export default mongoose.models.Payout || mongoose.model('Payout', PayoutSchema);