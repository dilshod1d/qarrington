import mongoose from 'mongoose';

const DraftSchema = new mongoose.Schema(
    {
        slug: { type: String }, // this is the url of the company or draft name
        index: {
            mode: { type: String }, // this is will be primary if current price is higher than the previous price, otherwise, error
            price: { type: String }, // this is the current price of the draft
            points: { type: String }, // this is the point difference
            percent: { type: String }, // this is the percent difference
            cappedAt: { type: String } // this is current price * current volume
        },
        basics: {
            run: {
                from: { type: String }, // the draft will start on this date
                until: { type: String } // the draft will end on this date
            },
            info: {
                cost: { type: String }, // this is the price for 1 draft unit
                units: { type: String }, // this is the total draft units
                ticker: { type: String }, // this is the draft ticker
                company: { type: String } // this is the company name
            },
            image: { type: String }, // this is the company or draft logo
            detail: { type: String }, // this is the draft description
            website: { type: String }, // this is the company or draft website
            minimums: { type: String }, // this is the minimum units a user can buy or pull at a time
            customers: [{
                cost: { type: String }, // this is the price paid for 1 draft unit by a customer
                units: { type: String }, // this is the total units bought or pulled by the customer
                amount: { type: String }, // this is the total amount paid by the customer
                account: {
                    name: { type: String }, // this is the customer first name
                    title: { type: String }, // this is the customer occupation
                    avatar: { type: String } // this is the customer image
                },
                isAccess: { type: String }, // this will be TRUE if the company has created this customer thru their API
                createdAt: { type: String } // this is the date the customer bought or pulled the drafts
            }],
            benchmarks: [
                {
                    type: { type: String }, // this will be Pushed Drafts (the total amount of initial drafts sold) or Capped Drafts (the total amount of the trading drafts sold).
                    title: { type: String }, // this will be Pushed or Capped
                    amount: { type: String }, // this is the total amount of the benchmarck type
                    tooltip: { type: String }, // this is just an explainer
                    isFilled: { type: String } // this will be TRUE when payout of all draft sold is paid thru stripe, otherwise FALSE
                }
            ],
            subscribers: [
                {
                    name: { type: String }, // this is the first name of the whitelisted subscriber
                    title: { type: String }, // this is the occupation of the subscriber
                    avatar: { type: String }, //  this is the image of the subscriber
                    datedAt: { type: String } // this is the whitelisted date
                }
            ]
        },
        apiKeys: {
            create: { type: String }, // this key will let the company create a customer on their platform
            access: { type: String } // this key will let the company update a customer on their platform
        },
        stripeId: { type: String }, //  this is the stripeId of the company
        accountId: { type: String }, // this is the accountId of the user
        isApproved: { type: String }, // this will be TRUE if admin approves or FALSE
        submittedAt: { type: String } // this is the date the draft is submitted
    }
);

export default mongoose.models.Draft || mongoose.model('Draft', DraftSchema);