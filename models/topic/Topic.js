import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  topicUrl: { type: String },
  topicName: { type: String },
  topicTitle: { type: String },
  topicDetail: { type: String },
  topicSummary: { type: String },
  topicPostedAt: { type: String }
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
