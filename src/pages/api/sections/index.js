import dbConnect from '../../../lib/dbConnect';
import Section from '../../../../models/section/Section';

async function handler(req, res) {
  const { method } = req;
  const { sectionUrl } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (sectionUrl) {
      try {
        const readItems = await Section.findOne({ sectionUrl: sectionUrl });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Section.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Section.create(req.body);
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
