import dbConnect from '../../../lib/dbConnect';
import Brief from '../../../../models/brief/Brief';

async function handler(req, res) {
  const { method } = req;
  const { briefSlug } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (briefSlug) {
      try {
        const readItems = await Brief.findOne({ briefSlug: briefSlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Brief.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Brief.create(req.body);
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
