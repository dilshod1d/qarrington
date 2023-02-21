import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
    {
        info: {
            account: {
                _id: { type: String }, // each account will have 1 request document
                name: { type: String } // this is the account first name
            },
        },
        pulls: [ // each account can have many pull requests
            {
                info: {
                    url: { type: String }, // this is the url of the draft ticker
                    cost: { type: String }, // this is the current price per draft unit
                    units: { type: String } // this is the default units or the total push request units
                },
                draft: {
                    _id: { type: String }, // this is the draft id
                    name: { type: String }, // this is the company or draft name
                    image: { type: String }, // this is the company or draft logo
                    ticker: { type: String } // this is the company or draft ticker
                },
                amount: { type: String }, // this is the amount of draft the user wants to pull or buy
                balance: { // this is the balance for one draft
                    cost: {
                        pulled: { type: String }, // this is how much the user paid for 1 draft unit
                        current: { type: String } // this is the current price per draft unit
                    },
                    units: { type: String }, // this is the number of units pulled by the user
                    amount: { type: String }, // this is the current amount of the draft
                    tooltip: { type: String }, // this is just a descriptive text
                },
                isFilled: { type: String }, // this will be blank if pull is transacted or dot if not
                createdAt: { type: String } // this is the date the request is made
            },
        ],
        pushes: [
            {
                info: {
                    url: { type: String }, // this is the url of the draft ticker
                    cost: { type: String }, // this is the current price per draft unit
                    units: { type: String } // this is the number of draft units the user currently has
                },
                draft: {
                    _id: { type: String }, // this is the draft id
                    name: { type: String }, // this is the company or draft name
                    image: { type: String }, // this is the company or draft logo
                    ticker: { type: String } // this is the company or draft ticker
                },
                amount: { type: String }, // this is the amount of draft the user wants to push or buy
                tooltip: { type: String }, // this is just a descriptive text
                isFilled: { type: String }, // this will be blank if push is transacted or dot if not
                createdAt: { type: String } // this is the date the request is made
            },
        ],
        balance: [
            {
                set: { type: String }, // this is the balance, Pulled or Pushed
                name: { type: String }, // this is the balance name (Pulled Drafts or Pushed Drafts)
                units: { type: String }, // this is the total units of all the user's drafts
                amount: { type: String }, // this is the total amount of all the user's drafts
                tooltip: { type: String }, // this is just a descriptive text
                postedAt: { type: String } // this is the date the balance is recorded
            }
        ]
    },
);

export default mongoose.models.Request || mongoose.model('Request', RequestSchema);