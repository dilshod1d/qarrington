import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionUrl: { type: String },
  questionTags: [
    {
      questionTagName: { type: String }
    }
  ],
  questionTitle: { type: String },
  questionDetail: { type: String },
  questionTopicId: { type: String },
  questionPostedAt: { type: String }
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
