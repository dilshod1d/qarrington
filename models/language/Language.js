import mongoose from 'mongoose';

const LanguageSchema = new mongoose.Schema({
  code: { type: String },
  title: { type: String, index: true }
});

export default mongoose.models.Language || mongoose.model('Language', LanguageSchema);
