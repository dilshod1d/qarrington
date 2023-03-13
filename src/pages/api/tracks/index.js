import dbConnect from '../../../lib/dbConnect';
import Track from '../../../../models/track/Track';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // read items

  if (method === "GET") {
    try {
      const readItems = await Track.find();
      res.status(200).json(readItems);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Track.create(req.body);
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
