import mongoose from 'mongoose';

const CryptoSchema = new mongoose.Schema({
  cryptoName: { type: String },
  cryptoRoute: { type: String },
  cryptoTicker: { type: String }
});

export default mongoose.models.Crypto || mongoose.model('Crypto', CryptoSchema);
