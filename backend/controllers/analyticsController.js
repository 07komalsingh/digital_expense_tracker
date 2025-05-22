// controllers/analytics.controller.js
import { pool } from '../db/db.js';

export const getTransactionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ msg: 'Start date and end date are required' });
  }

  try {
    // Get transactions in date range
    const [transactions] = await pool.query(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = ? AND t.date >= ? AND t.date <= ?
       ORDER BY t.date DESC`,
      [req.user.id, startDate, endDate]
    );

    // Calculate category totals and percentages
    const categoryTotals = {};
    let grandTotal = 0;

    transactions.forEach(transaction => {
      const categoryId = transaction.category_id;
      const categoryName = transaction.category_name;
      const amount = parseFloat(transaction.amount);

      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = {
          categoryId,
          categoryName,
          total: 0
        };
      }

      categoryTotals[categoryId].total += amount;
      grandTotal += amount;
    });

    // Convert to array and add percentages
    const categories = Object.values(categoryTotals).map(category => ({
      ...category,
      percentage: grandTotal > 0 ? (category.total / grandTotal) * 100 : 0
    }));

    res.json({
      transactions,
      categories,
      total: grandTotal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};