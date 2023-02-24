import Destination from '../../../../models/destination/Destination';
import dbConnect from '../../../lib/dbConnect';

async function handler(req, res) {
  const { method } = req;
  const { query } = req.query;
  const { destinationToUrl } = req.query;
  const { destinationFromUrl } = req.query;

  await dbConnect();

  // read items

  if (method === 'GET') {
    if (destinationToUrl && destinationFromUrl) {
      try {
        const readdestinationToUrlItems = await Destination.findOne({
          destinationToUrl: destinationToUrl
        });
        const readdestinationFromUrlItems = await Destination.findOne({
          destinationFromUrl: destinationFromUrl
        });
        res.status(200).json({
          readItems: {
            readdestinationToUrlItems,
            readdestinationFromUrlItems
          }
        });
      } catch (err) {
        console.log('Error occured : ', err);
        res.status(500).json({});
      }
    } else {
      try {
        if (query === 'destination-count') {
          const count = await Destination.count();
          return res.status(200).json({ count });
        } else if (query === 'destination-distinct') {
          const destinations = await Destination.distinct('destinationToUrl');
          return res.status(200).json({ destinations });
        } else if (query === 'destination-sitemap') {
          const { iterations, offset } = req.query;
          const destinations = await Destination.find()
            .select('destinationFromUrl')
            .limit(iterations)
            .skip(offset);
          return res.status(200).json({ destinations });
        } else {
          console.log('default');
          const readItems = await Destination.find();
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
      const createItem = await Destination.create(req.body);
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
