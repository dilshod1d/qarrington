import dbConnect from '../../../lib/dbConnect';
import Push from '../../../../models/push/Push';
import { getCurrentUserId } from '@lib/auth';
import Account from '@models/account/Account';
import { protectRoute } from '@lib/protectRoute';

async function handler(req, res) {
  await protectRoute(req, res);
  const { method } = req;
  const { pushTicker } = req.query;

  await dbConnect();

  // read items

  if (method === "GET") {
    if (pushTicker) {
      try {
        const readItems = await Push.findOne({ pushTicker: pushTicker });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Push.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Push.create(req.body);
      res.status(201).json(createItem);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if(method === "DELETE") {
    await dbConnect()
    
    console.log("here")
    const id = await getCurrentUserId(req)
    if(!id) return res.status(401).json({ success: false, message: 'Token missing or invalid' })

    const { pushId } = req.query
    if(!pushId) return res.status(400).json({ success: false, message: 'Id not provided' })

    const foundPush = await Push.findById(pushId)
    if(!foundPush) return res.status(400).json({ success: false, message: 'Missing push' })

    const userIsPropietary = foundPush.pushAccountId === id
    if(!userIsPropietary) return res.status(401).json({ success: false, message: 'Invalid access' })

    
    // remove alerts
    const account = await Account.findById(id)
    console.log(account)
    account.accountAlerts = account.accountAlerts.filter((alert) => alert.accountAlertAssociatedId !== foundPush._id.toString())

    console.log(account)
    
    await foundPush.remove()
    await account.save()
    
    return res.status(204).json({ success: true, message: 'Push removed correctly' })
  }
}

export default handler;

export const config = {
  api: {
    responseLimit: false
  }
};
