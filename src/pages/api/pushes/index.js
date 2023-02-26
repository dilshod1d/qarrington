import dbConnect from '../../../lib/dbConnect';
import Push from '../../../../models/push/Push';

async function handler(req, res) {
  const { method } = req;
  const { pushTicker } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (pushTicker) {
      try {
        const readItems = await Push.findOne({ pushTicker: pushTicker });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Push.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Push.create(req.body);
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
