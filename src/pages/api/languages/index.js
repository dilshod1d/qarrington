import dbConnect from '../../../lib/dbConnect';
import Language from '../../../../models/language/Language';

async function handler(req, res) {
  const { method } = req;

  dbConnect();

  // read items

  if (method === "GET") {
    try {
      const readItems = await Language.find();
      res.status(200).json(readItems);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Language.create(req.body);
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
