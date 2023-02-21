import dbConnect from '../../../lib/dbConnect';
import Listing from '../../../../models/listing/Listing';

async function handler(req, res) {
  const { method } = req;
  const { url } = req.query;

  dbConnect();

  // read items

  if (method === "GET") {
    if (url) {
      try {
        const readItems = await Listing.findOne({ url: url });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Listing.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Listing.create(req.body);
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
