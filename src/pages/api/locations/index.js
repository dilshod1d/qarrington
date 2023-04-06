import Location from '../../../../models/location/Location';
import dbConnect from '../../../lib/dbConnect';
import { protectRoute } from '@lib/protectRoute';

async function handler(req, res) {
  await protectRoute(req, res);
  const { method } = req;
  const { locationUrl } = req.query;
  const { query } = req.query;

  await dbConnect();

  // read items

  if (method === 'GET') {
    if (locationUrl) {
      try {
        const readItems = await Location.findOne({ locationUrl: locationUrl });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        if (query === 'location-count') {
          const count = await Location.count();
          return res.status(200).json({ count });
        } else if (query === 'location-sitemap') {
          const { offset, limit } = req.query;
          const locations = await Location.find()
            .select({ locationUrl: 1 })
            .limit(limit)
            .skip(offset || 0);
          return res.status(200).json({ locations });
        } else {
          const readItems = await Location.find();
          return res.status(200).json(readItems);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Location.create(req.body);
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
