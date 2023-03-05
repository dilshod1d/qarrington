import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({

  countryCode: { type: String }

});

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);
