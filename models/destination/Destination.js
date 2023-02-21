import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({

  destinationToUrl: { type: String },
  destinationToName: { type: String },
  destinationFromUrl: { type: String },
  destinationFromName: { type: String }

});

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
