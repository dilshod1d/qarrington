import mongoose from 'mongoose';

const CurrencySchema = new mongoose.Schema({

  currencyCode: { type: String }

});

export default mongoose.models.Currency || mongoose.model('Currency', CurrencySchema);
