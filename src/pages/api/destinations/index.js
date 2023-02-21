import Destination from '../../../../models/destination/Destination';
import dbConnect from '../../../lib/dbConnect';

async function handler(req, res) {
  const { method } = req;
  const { destinationToUrl } = req.query;
  const { destinationFromUrl } = req.query;

  dbConnect();

  // read items

  if (method === 'GET') {
    if (destinationToUrl && destinationFromUrl) {
      try {
        const readdestinationToUrlItems = await Destination.findOne({ destinationToUrl: destinationToUrl });
        const readdestinationFromUrlItems = await Destination.findOne({ destinationFromUrl: destinationFromUrl });
        res.status(200).json({ readItems: { readdestinationToUrlItems, readdestinationFromUrlItems } });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Destination.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Destination.create(req.body);
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
