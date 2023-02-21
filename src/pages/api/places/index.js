import Place from '../../../../models/place/Place';
import dbConnect from '../../../lib/dbConnect';

async function handler(req, res) {
  const { method } = req;
  const { toName } = req.query;
  const { fromName } = req.query;

  dbConnect();

  // read items

  if (method === 'GET') {
    if (toName && fromName) {
      try {
        const readToNameItems = await Place.findOne({ toName: toName });
        const readFromNameItems = await Place.findOne({ fromName: fromName });
        res.status(200).json({ readItems: { readToNameItems, readFromNameItems } });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Place.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Place.create(req.body);
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
