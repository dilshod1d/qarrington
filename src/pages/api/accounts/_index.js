import dbConnect from '../../../lib/dbConnect';
import Account from '../../../../models/account/Account';

async function handler(req, res) {
  const { method } = req;
  const { accountSlug } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (accountSlug) {
      try {
        const readItems = await Account.findOne({ accountSlug: accountSlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Account.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Account.create(req.body);
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
