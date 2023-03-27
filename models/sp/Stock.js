import mongoose from 'mongoose';

const SpSchema = new mongoose.Schema({
  stockRoute: { type: String },
  stockTicker: { type: String }
});

export default mongoose.models.Sp || mongoose.model('Sp', SpSchema);
