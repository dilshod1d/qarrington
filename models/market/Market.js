import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema(
    {
        time: { type: String }, // users can select seconds, hours, days, weeks, months, or years
        price: { type: String }, // this is the price per draft at the selected time
        volume: { type: String }, // this is the number of drafts pulled and pushed at the time
        draftId: {
            id: { type: String }, //  this is the draft id
            url: { type: String }, //  this is the draft website
            name: { type: String }, //  this is the company or draft name
            price: { type: String }, // this is the current price of the draft
            ticker: { type: String } // this is th draft ticker
        },
        cappedAt: { type: String }, // this current price * volume at the time
        movements: { // this is the fluctuation of the draft
            low: {
                icon: { type: String }, // if current price is less than the previous price
                color: { type: String }, // if current price is less than the previous price
                points: { type: String }, // the point difference
                percent: { type: String } // the percent difference
            },
            high: {
                icon: { type: String }, // if current price is more than the previous price
                color: { type: String }, // if current price is more than the previous price
                points: { type: String }, // the point difference
                percent: { type: String } // the percent difference
            },
            range: [
                {
                    key: { type: String }, // S for seconds, H for hours, D for days, W for weeks, M for months, or Y for years
                    name: { type: String }, // this will be the selected time option
                    items: [
                        {
                            one: { type: String }, // i.e. 1D if day is selected
                            two: { type: String }, // i.e. 2D if day is selected
                            three: { type: String }, // i.e. 3D if day is selected
                            four: { type: String }, // i.e. 4D if day is selected
                            five: { type: String }, // i.e. 5D if day is selected
                            six: { type: String }, // i.e. 6D if day is selected
                            seven: { type: String } // i.e. 7D if day is selected
                        }
                    ]
                }
            ]
        },
        recordedAt: { type: String },
    }
);

export default mongoose.models.Market || mongoose.model('Market', MarketSchema);