import dbConnect from '../../../lib/dbConnect';
import Question from '../../../../models/stock/Stock';

async function handler(req, res) {
  const { method } = req;
  const { stockUrl } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (stockUrl) {
      try {
        const readItems = await Question.findOne({ stockUrl: stockUrl });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Question.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Question.create(req.body);
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
