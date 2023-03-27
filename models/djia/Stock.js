import mongoose from 'mongoose';

const DjiaSchema = new mongoose.Schema({
  stockRoute: { type: String },
  stockTicker: { type: String }
});

export default mongoose.models.Djia || mongoose.model('Djia', DjiaSchema);
