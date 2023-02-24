import dbConnect from '../../../lib/dbConnect';
import Pull from '../../../../models/pull/Pull';

async function handler(req, res) {
  const { method } = req;
  const { pullSlug } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (pullSlug) {
      try {
        const readItems = await Pull.findOne({ pullSlug: pullSlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Pull.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Pull.create(req.body);
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
