import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({

  countryName: { type: String },
  countryCode: { type: String },
  countryCurrency: { type: String },
  countryCurrencyName: { type: String },
  countryStatus: { type: String }

});

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);
