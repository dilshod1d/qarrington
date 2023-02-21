import dbConnect from '../../../lib/dbConnect';
import Expense from '../../../../models/expense/Expense';

async function handler(req, res) {
  const { method } = req;
  const { expenseUrl } = req.query;

  dbConnect();

  // read items

  if (method === "GET") {
    if (expenseUrl) {
      try {
        const readItems = await Expense.findOne({ expenseUrl: expenseUrl });
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const readItems = await Expense.find();
        res.status(200).json(readItems);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  // create item

  if (method === 'POST') {
    try {
      const createItem = await Expense.create(req.body);
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
