const cron = require('node-cron');
const expenseService = require('../services/expenseService');

// Schedule the cron job to run daily
cron.schedule('0 0 * * *', async () => {
  try {
    await expenseService.updateRecurringExpenses();
    console.log('Recurring expenses updated successfully');
  } catch (error) {
    console.error('Error updating recurring expenses:', error);
  }
});
