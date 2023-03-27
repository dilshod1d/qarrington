import dbConnect from '../../../lib/dbConnect';
import Stock from '../../../../models/nc/Stock';

async function handler(req, res) {
  const { method } = req;
  const { stockRoute } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (stockRoute) {
      try {
        const readItems = await Stock.findOne({ stockRoute: stockRoute });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Stock.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Stock.create(req.body);
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
