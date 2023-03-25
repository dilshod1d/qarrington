import mongoose from 'mongoose';

const ShareSchema = new mongoose.Schema({
  shareRoute: { type: String },
  shareTicker: { type: String }
});

export default mongoose.models.Share || mongoose.model('Share', ShareSchema);
