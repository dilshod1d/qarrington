import dbConnect from '../../../lib/dbConnect';
import Topic from '../../../../models/topic/Topic';
import { getAllBriefs, searchBriefs } from '@lib/briefs';
import { protectRoute } from '@lib/protectRoute';

async function handler(req, res) {
  await protectRoute(req, res);
  const { method } = req;
  const { topicSlug } = req.query;

  await dbConnect();

  // read items

  if (method === 'GET') {
    const searchQuery = req.query.search;
    if (searchQuery) {
      const matchedBriefs = await searchBriefs(searchQuery);
      res.status(200).json(matchedBriefs);
    } else {
      const briefs = await getAllBriefs(3); // Get the latest 3 briefs
      res.status(200).json(briefs);
    }
    if (topicSlug) {
      try {
        const readItems = await Topic.findOne({ topicSlug: topicSlug });
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
