import { getSession } from 'next-auth/client';
import { createBrief, getAllBriefs, searchBriefs } from '../../../../lib/briefs';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || !session.isAdmin) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    const searchQuery = req.query.search;
    if (searchQuery) {
      const matchedBriefs = await searchBriefs(searchQuery);
      res.status(200).json(matchedBriefs);
    } else {
      const briefs = await getAllBriefs(3); // Get the latest 3 briefs
      res.status(200).json(briefs);
    }
  } else if (req.method === 'POST') {
    const { briefTitle, briefDetail, briefSummary, briefTopic } = req.body;
    const brief = await createBrief({
      briefTitle,
      briefDetail,
      briefSummary,
      briefTopic,
      briefPostedAt: new Date()
    });
    res.status(201).json(brief);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
