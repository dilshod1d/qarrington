import dbConnect from '../../../lib/dbConnect';
import Subscription from '../../../../models/subscription/Subscription';

async function handler(req, res) {
  const { method } = req;
  const { subscriptionSlug } = req.query;

  dbConnect();

  // read items

  if (method === "GET") {
    if (subscriptionSlug) {
      try {
        const readItems = await Subscription.findOne({ subscriptionSlug: subscriptionSlug });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Subscription.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Subscription.create(req.body);
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
