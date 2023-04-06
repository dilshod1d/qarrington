import Brief from '../../models/brief/Brief';
import connectDb from './dbConnect';

export async function createBrief(briefData, token, res) {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    await connectDb();
    const brief = new Brief(briefData);
    await brief.save();
    res.status(200).json({ success: true, data: brief });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

export async function getAllBriefs(limit) {
  await connectDb();

  const briefs = await Brief.find({}).sort({ briefPostedAt: -1 }).limit(limit).exec();
  return briefs;
}

export async function getAllBriefsByTopic(topicSlug, limit) {
  await connectDb();

  const briefs = await Brief.find({ briefTopic: topicSlug }).sort({ briefPostedAt: -1 }).limit(limit).exec();
  return briefs;
}

export async function getBriefById(briefId) {
  await connectDb();

  const brief = await Brief.findById(briefId).exec();
  return brief;
}

export async function getBriefBySlug(topicSlug, briefSlug) {
  await connectDb();

  const brief = await Brief.findOne({ briefTopic: topicSlug, briefSlug }).exec();
  return brief;
}

export async function updateBrief(briefId, briefData) {
  await connectDb();

  const updatedBrief = await Brief.findByIdAndUpdate(briefId, briefData, { new: true }).exec();
  return updatedBrief;
}

export async function deleteBrief(briefId) {
  await connectDb();

  await Brief.findByIdAndDelete(briefId).exec();
}

export async function duplicateBrief(briefId) {
  await connectDb();

  const briefToDuplicate = await Brief.findById(briefId).exec();
  const duplicatedBrief = new Brief({ ...briefToDuplicate.toObject(), _id: undefined });
  await duplicatedBrief.save();
  return duplicatedBrief;
}

export async function searchBriefs(searchQuery) {
  await connectDb();

  const briefs = await Brief.find({ $text: { $search: searchQuery } }).exec();
  return briefs;
}

export async function searchBriefsByTopic(topicSlug, searchQuery) {
  await connectDb();

  const briefs = await Brief.find({
    briefTopic: topicSlug,
    $text: { $search: searchQuery }
  }).exec();
  return briefs;
}
