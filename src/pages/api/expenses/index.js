import dbConnect from '../../../lib/dbConnect';
import Expense from '../../../../models/expense/Expense';

async function handler(req, res) {
  const { method } = req;
  const { expenseUrl } = req.query;
  const { query } = req.query;

  await dbConnect();

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
        if (query === 'expense-count') {
          const count = await Destination.count();
          return res.status(200).json({ count });
        }  else if (query === 'expense-sitemap') {
          const { offset } = req.query;
          const expenses =  await Expense.find()
          .select({ expenseUrl: 1 })
          .limit(1)
          .skip(offset);
          return res.status(200).json({ expenses });
        } else {
          const readItems = await Expense.find();
          return res.status(200).json(readItems);
        }
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
