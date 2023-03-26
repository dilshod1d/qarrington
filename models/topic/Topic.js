import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  topicUrl: { type: String },
  topicTags: [
    {
      topicTagName: { type: String }
    }
  ],
  topicTitle: { type: String },
  topicDetail: { type: String },
  topicSummary: { type: String },
  topicPostedAt: { type: String },
  topicBriefId: { type: String }
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
