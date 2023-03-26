import dbConnect from '../../../lib/dbConnect';
import Topic from '../../../../models/topic/Topic';

async function handler(req, res) {
  const { method } = req;
  const { topicUrl } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (topicUrl) {
      try {
        const readItems = await Topic.findOne({ topicUrl: topicUrl });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Topic.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Topic.create(req.body);
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
