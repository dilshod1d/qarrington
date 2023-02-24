import dbConnect from '../../../lib/dbConnect';
import Request from '../../../../models/request/Request';

async function handler(req, res) {
  const { method } = req;
  const { route } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (route) {
      try {
        const readItems = await Request.findOne({ route: route });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Request.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Request.create(req.body);
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
