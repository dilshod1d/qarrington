import { getSession } from 'next-auth/react';
import { createBrief, getAllBriefs, searchBriefs } from '@lib/briefs';
import { protectRoute } from '@lib/protectRoute';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  await protectRoute(req, res, () => {});
  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
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
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    await createBrief(
      {
        briefTitle,
        briefDetail,
        briefSummary,
        briefTopic,
        briefPostedAt: new Date()
      },
      token,
      res
    );
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
