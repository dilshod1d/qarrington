import mongoose from 'mongoose';

const CryptoSchema = new mongoose.Schema({
  cryptoUrl: { type: String },
  cryptoName: { type: String },
  cryptoTicker: { type: String }
});

export default mongoose.models.Crypto || mongoose.model('Crypto', CryptoSchema);
