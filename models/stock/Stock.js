import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  stockRoute: { type: String },
  stockTicker: { type: String }
});

export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);
