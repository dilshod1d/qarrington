import Location from '../../../../models/location/Location';
import dbConnect from '../../../lib/dbConnect';

async function handler(req, res) {
  const { method } = req;
  const { locationUrl } = req.query;

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
        const readItems = await Location.find();
        res.status(200).json(readItems);
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
