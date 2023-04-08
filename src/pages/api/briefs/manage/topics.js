import Topic from '../../../../../models/topic/Topic';

export default async function handler(req, res) {
  try {
    const data = await Topic.find({}).exec();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { handler };
