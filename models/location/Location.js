import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  locationUrl: { type: String },
  locationName: { type: String }
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);
