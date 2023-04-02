import { getSession } from 'next-auth/client';
import { getBriefById, updateBrief, deleteBrief, duplicateBrief } from '../../../../lib/briefs';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || !session.isAdmin) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const briefId = req.query.id;

  if (req.method === 'GET') {
    const brief = await getBriefById(briefId);
    res.status(200).json(brief);
  } else if (req.method === 'PUT') {
    const { briefTitle, briefDetail, briefSummary, briefTopic } = req.body;
    const updatedBrief = await updateBrief(briefId, {
      briefTitle,
      briefDetail,
      briefSummary,
      briefTopic
    });
    res.status(200).json(updatedBrief);
  } else if (req.method === 'DELETE') {
    await deleteBrief(briefId);
    res.status(204).end();
  } else if (req.method === 'POST' && req.body.action === 'duplicate') {
    const duplicatedBrief = await duplicateBrief(briefId);
    res.status(201).json(duplicatedBrief);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
