const strapiClient = require('../utils/strapiClient');

exports.createExpense = async (expenseData) => {
  const response = await strapiClient.post('/expenses', { data: expenseData });
  return response.data;
};

exports.getExpense = async (id) => {
  const response = await strapiClient.get(`/expenses/${id}`);
  return response.data;
};

exports.getAllExpenses = async () => {
  const response = await strapiClient.get('/expenses');
  return response.data;
};

exports.updateExpense = async (id, expenseData) => {
  const response = await strapiClient.put(`/expenses/${id}`, {
    data: expenseData
  });
  return response.data;
};

exports.deleteExpense = async (id) => {
  const response = await strapiClient.delete(`/expenses/${id}`);
  return response.data;
};

exports.updateRecurringExpenses = async () => {
  const { data: expenses } = await strapiClient.get('/expenses');
  const currentDate = new Date();

  for (const expense of expenses) {
    if (expense.frequency !== 'One-Time') {
      let shouldUpdate = false;

      switch (expense.frequency) {
        case 'Daily':
          shouldUpdate = true;
          break;
        case 'Weekly':
          shouldUpdate =
            currentDate.getDay() === new Date(expense.date).getDay();
          break;
        case 'Monthly':
          shouldUpdate =
            currentDate.getDate() === new Date(expense.date).getDate();
          break;
        case 'Quarterly':
          shouldUpdate =
            currentDate.getMonth() % 3 ===
              new Date(expense.date).getMonth() % 3 &&
            currentDate.getDate() === new Date(expense.date).getDate();
          break;
        case 'Yearly':
          shouldUpdate =
            currentDate.getMonth() === new Date(expense.date).getMonth() &&
            currentDate.getDate() === new Date(expense.date).getDate();
          break;
      }

      if (shouldUpdate) {
        expense.amount += expense.base;
        await strapiClient.put(`/expenses/${expense.id}`, { data: expense });
      }
    }
  }
};
