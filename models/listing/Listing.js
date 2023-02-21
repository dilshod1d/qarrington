import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema(
  {
    info: {
      url: { type: String },
      name: { type: String }
    },
    image: { type: String },
    ticker: { type: String },
    changes: {
      mode: { type: String },
      price: { type: String },
      points: { type: String }
    },
    division: { type: String },
    createdAt: { type: String }
  }
);

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);