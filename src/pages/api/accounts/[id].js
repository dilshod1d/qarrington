import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';

async function handler(req, res) {

    const { method } = req;
    const { _id } = req.query;

    await dbConnect();

    // read item

    if (method === "GET") {
        try {
            // const readItem = await Account.findBy_id(_id);
            res.status(200).json(readItem);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // update item

    if (method === "PUT") {
        try {
            const updateItem = await Account.findBy_idAndUpdate(_id, { $set: req.body }, { new: true });
            return res.status(200).json(updateItem);
        } catch (err) {
            res.status(400).json(err);
        }
    }

    // delete item

    if (method === "DELETE") {
        try {
            const deleteItem = await Account.findBy_idAndDelete(_id);
            res.status(200).json(deleteItem);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

export default handler;

export const config = {
    api: {
        responseLimit: false,
    },
}