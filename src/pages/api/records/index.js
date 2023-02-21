import dbConnect from '../../../lib/dbConnect';
import Record from '../../../../models/record/Record';

async function handler(req, res) {
  const { method } = req;
  const { _id } = req.query;

  dbConnect();

  // read items

  if (method === "GET") {
    if (_id) {
      try {
        const readItems = await Record.findOne({ _id: _id });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Record.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Record.create(req.body);
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
