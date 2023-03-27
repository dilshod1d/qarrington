import mongoose from 'mongoose';

const NcSchema = new mongoose.Schema({
  stockRoute: { type: String },
  stockTicker: { type: String }
});

export default mongoose.models.Nc || mongoose.model('Nc', NcSchema);
