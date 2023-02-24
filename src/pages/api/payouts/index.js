import dbConnect from '../../../lib/dbConnect';
import Payout from '../../../../models/payout/Payout';

async function handler(req, res) {
  const { method } = req;
  const { _id } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (_id) {
      try {
        const readItems = await Payout.findOne({ _id: _id });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Payout.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Payout.create(req.body);
      res.status(201).json(createItem);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false
  }
};
