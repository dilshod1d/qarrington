import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  matchPrice: { type: String },
  matchUnits: { type: String },
  matchAmount: { type: String },
  matchCompany: {
    matchCompanyLogo: { type: String },
    matchCompanyName: { type: String },
    matchCompanyTicker: { type: String },
  },
  matchEntry: { type: String },
  matchIsAddedAt: { type: String }
});

export default mongoose.models.Match || mongoose.model('Match', MatchSchema);
