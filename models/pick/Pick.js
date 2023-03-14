import mongoose from 'mongoose';

const PickSchema = new mongoose.Schema(
    {
        pickTicker: { type: String },
        pickUnits: { type: String },
        pickPrice: { type: String },
        pickAmount: { type: String },
        pickCompany: {
            pickCompanyId: { type: String },
            pickCompanyName: { type: String },
            pickCompanyLogo: { type: String }
        },
        pickAccountId: { type: String },
        pickStatus: {
            pickIsTransferred: { type: String },
            pickIsTransferredAt: { type: String }
        }
    },
);

export default mongoose.models.Pick || mongoose.model('Pick', PickSchema);