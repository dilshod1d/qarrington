import { getCurrentUserId } from '@lib/auth';
import dbConnect from '@lib/dbConnect';
import Account from '@models/account/Account';
import Pull from '@models/pull/Pull';
import { protectRoute } from '@lib/protectRoute';

async function handler(req, res) {
  await protectRoute(req, res);
  const { method } = req;
  const { pullTicker } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (pullTicker) {
      try {
        const readItems = await Pull.findOne({ pullTicker: pullTicker });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Pull.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Pull.create(req.body);
      res.status(201).json(createItem);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if(method === "DELETE") {
    await dbConnect()

    const id = await getCurrentUserId(req)
    if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })

    const { pullId } = req.query
    if(!pullId) return res.status(400).json({ success: false, message: 'Id not provided' })

    const foundPull = await Pull.findById(pullId)
    if(!foundPull) return res.status(400).json({ success: false, message: 'Missing pull' })

    if(foundPull.pullStatus.pullIsTransferred) return res.status(400).json({ success: false, message: "Can't cancell a pull that it's yours and it's not a pull request" })

    const userIsPropietary = foundPull.pullAccountId === id
    if(!userIsPropietary) return res.status(401).json({ success: false, message: 'Invalid access' })

    const removed = await foundPull.remove()

    // remove alerts
    const account = await Account.findById(id)
    account.accountPortfolio = account.accountPortfolio - removed.pullAmount // update portfolio
    account.accountAlerts = account.accountAlerts.filter(({ accountAlertAssociatedId }) => accountAlertAssociatedId !== foundPull._id )
    await account.save()

    return res.status(204).json({ success: true, message: 'Pull removed correctly' })
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false
  }
};
