import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  sectionUrl: { type: String },
  sectionIcon: { type: String },
  sectionTitle: { type: String },
  sectionDetail: { type: String },
});

export default mongoose.models.Section || mongoose.model('Section', SectionSchema);
