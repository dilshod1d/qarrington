import { getBriefBySlug } from '../../../../lib/briefs';
import { protectRoute } from '@lib/protectRoute';

export default async function handler(req, res) {
  await protectRoute(req, res);
  const { topicSlug, briefSlug } = req.query;

  if (req.method === 'GET') {
    const brief = await getBriefBySlug(topicSlug, briefSlug);
    res.status(200).json(brief);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
