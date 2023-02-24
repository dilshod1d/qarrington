import dbConnect from '../../../lib/dbConnect';
import Company from '../../../../models/company/Company';

async function handler(req, res) {
  const { method } = req;
  const { companyTicker } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (companyTicker) {
      try {
        const readItems = await Company.findOne({ companyTicker: companyTicker });
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
