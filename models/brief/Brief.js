import mongoose from 'mongoose';

const BriefSchema = new mongoose.Schema({
  briefUrl: { type: String },
  briefTags: [
    {
      briefTagName: { type: String }
    }
  ],
  briefTitle: { type: String },
  briefDetail: { type: String },
  briefSummary: { type: String },
  briefPostedAt: { type: String }
});

export default mongoose.models.Brief || mongoose.model('Brief', BriefSchema);
