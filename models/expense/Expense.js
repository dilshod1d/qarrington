import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  expenseUrl: { type: String },
  expenseName: { type: String },
  expenseImage: { type: String }
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
