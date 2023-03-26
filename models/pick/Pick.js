import mongoose from 'mongoose';

const PickSchema = new mongoose.Schema(
    {
        pickTicker: { type: String },
        pickUnits: { type: Number },
        pickPrice: { type: Number },
        pickAmount: { type: Number },
        pickCompany: {
            pickCompanyId: { type: String },
            pickCompanyName: { type: String },
            pickCompanyLogo: { type: String }
        },
        pickAccountId: { type: String },
        pickStatus: {
            pickIsTransferred: { type: Boolean },
            pickIsTransferredAt: { type: String }
        }
    },
);

export default mongoose.models.Pick || mongoose.model('Pick', PickSchema);