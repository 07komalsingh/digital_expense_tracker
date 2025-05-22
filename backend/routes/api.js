// routes/api.js
import express from 'express';
import * as controllers from '../controllers/index.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Auth
router.post('/auth/register', controllers.register);
router.post('/auth/login', controllers.login);

// Categories
router.get('/categories', authenticate, controllers.getCategories);
router.post('/categories', authenticate, controllers.createCategory);
router.delete('/categories/:id', authenticate, controllers.deleteCategory);

// Transactions
router.get('/transactions', authenticate, controllers.getTransactions);
router.get('/transactions/analysis', authenticate, controllers.getTransactionsByDateRange);
router.post('/transactions', authenticate, controllers.createTransaction);
router.delete('/transactions/:id', authenticate, controllers.deleteTransaction);

export default router;