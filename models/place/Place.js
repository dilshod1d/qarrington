import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({

  toName: { type: String },
  toPlace: { type: String },
  fromName: { type: String },
  fromPlace: { type: String }

});

export default mongoose.models.Place || mongoose.model('Place', PlaceSchema);
