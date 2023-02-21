import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema(
    {
        set: { type: String },
        info: {
            set: { type: String },
            name: { type: String },
            units: { type: String },
            ticker: { type: String },
            picture: { type: String }
        },
        route: { type: String },
        status: { type: String },
        datedAt: { type: String }
    },
);

export default mongoose.models.Record || mongoose.model('Record', RecordSchema);