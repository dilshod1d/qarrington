import mongoose from 'mongoose';

const BriefSchema = new mongoose.Schema({
  briefSlug: { type: String },
  briefTitle: { type: String },
  briefDetail: { type: String },
  briefSummary: { type: String },
  briefTopic: { type: String },
  briefPostedAt: { type: String }
});

export default mongoose.models.Brief || mongoose.model('Brief', BriefSchema);
