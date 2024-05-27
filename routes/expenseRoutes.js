const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpense);
router.get('/', expenseController.getAllExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
