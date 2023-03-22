import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  stockUrl: { type: String },
  stockName: { type: String },
  stockTicker: { type: String }
});

export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);
