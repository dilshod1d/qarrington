import mongoose from 'mongoose';

const WireSchema = new mongoose.Schema(

    {
        bank: {
            name: { type: String }, // each can search for their bank name in our db using search-as-you-type
        },
        owner: {
            name: {
                last: { type: String }, // each user must provide their last name as it is in their bank account
                first: { type: String } // each user must provide their first name as it is in their account
            },
            since: { type: String }, // this is the number of days the user has been active on our app
            number: { type: String }, // each user must provide their bank account number
            routing: { type: String }, // each user must provide their bank routing number
        },
        method: { type: String }, // this will always be Bank Transfer
        country: { type: String }, // this will always be United States
        currency: { type: String }, // this will always be USD
        accountId: { type: String } // this is the accountId of the user
    },
);

export default mongoose.models.Wire || mongoose.model('Wire', WireSchema);