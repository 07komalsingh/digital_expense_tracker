
import { pool } from '../db/db.js';

export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT * FROM categories WHERE user_id = ? ORDER BY name',
      [req.user.id]
    );
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ msg: 'Category name is required' });
  }

  try {
    // Check if category already exists for this user
    const [existingCategory] = await pool.query(
      'SELECT * FROM categories WHERE user_id = ? AND name = ?',
      [req.user.id, name.trim()]
    );

    if (existingCategory.length > 0) {
      return res.status(400).json({ msg: 'Category already exists' });
    }

    // Check if user has reached the limit of 15 categories
    const [categoryCount] = await pool.query(
      'SELECT COUNT(*) as count FROM categories WHERE user_id = ?',
      [req.user.id]
    );

    if (categoryCount[0].count >= 15) {
      return res.status(400).json({ msg: 'Maximum 15 categories allowed' });
    }

    // Create new category
    const [result] = await pool.query(
      'INSERT INTO categories (user_id, name) VALUES (?, ?)',
      [req.user.id, name.trim()]
    );

    // Return the created category
    const [newCategory] = await pool.query(
      'SELECT * FROM categories WHERE id = ?',
      [result.insertId]
    );

    res.json(newCategory[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Check if category belongs to the user
    const [category] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ?',
      [categoryId, req.user.id]
    );

    if (category.length === 0) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    // Check if category has transactions
    const [transactions] = await pool.query(
      'SELECT COUNT(*) as count FROM transactions WHERE category_id = ?',
      [categoryId]
    );

    if (transactions[0].count > 0) {
      return res.status(400).json({ msg: 'Cannot delete category with existing transactions' });
    }

    // Delete category
    await pool.query('DELETE FROM categories WHERE id = ?', [categoryId]);

    res.json({ msg: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
