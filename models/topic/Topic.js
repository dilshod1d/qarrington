import mongoose from 'mongoose';


const TopicSchema = new mongoose.Schema({
  topicSlug: { type: String },
  topicTitle: { type: String },
  topicDetail: { type: String },
  
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
