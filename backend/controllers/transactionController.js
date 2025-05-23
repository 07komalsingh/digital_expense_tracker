
import { pool } from '../db/db.js';

export const getTransactions = async (req, res) => {
  try {
    const [transactions] = await pool.query(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = ? 
       ORDER BY t.date DESC, t.id DESC`,
      [req.user.id]
    );
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createTransaction = async (req, res) => {
  const { amount, note, category_id, date } = req.body;

  if (!amount || !category_id) {
    return res.status(400).json({ msg: 'Amount and category are required' });
  }

  if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return res.status(400).json({ msg: 'Amount must be a positive number' });
  }

  try {
    // Verify category belongs to user
    const [category] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ?',
      [category_id, req.user.id]
    );

    if (category.length === 0) {
      return res.status(400).json({ msg: 'Invalid category' });
    }

    // Create transaction
    const [result] = await pool.query(
      'INSERT INTO transactions (user_id, category_id, amount, note, date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, category_id, parseFloat(amount), note || null, date || new Date().toISOString().split('T')[0]]
    );

    // Get the created transaction with category name
    const [newTransaction] = await pool.query(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.id = ?`,
      [result.insertId]
    );

    res.json(newTransaction[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;

  try {
    // Check if transaction belongs to the user
    const [transaction] = await pool.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, req.user.id]
    );

    if (transaction.length === 0) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    // Delete transaction
    await pool.query('DELETE FROM transactions WHERE id = ?', [transactionId]);

    res.json({ msg: 'Transaction deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
