import dbConnect from '../../../lib/dbConnect';
import Company from '../../../../models/company/Company';

async function handler(req, res) {
  const { method } = req;
  const { companySlug } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (companySlug) {
      try {
        const readItems = await Company.findOne({ companySlug: companySlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Company.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Company.create(req.body);
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
