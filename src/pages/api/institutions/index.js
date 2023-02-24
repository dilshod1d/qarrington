import dbConnect from '../../../lib/dbConnect';
import Institution from '../../../../models/institution/Institution';

async function handler(req, res) {
  const { method } = req;
  const { institutionSlug } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (institutionSlug) {
      try {
        const readItems = await Institution.findOne({ institutionSlug: institutionSlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Institution.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Institution.create(req.body);
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
