const express = require('express');
const expenseRoutes = require('./routes/expenseRoutes');
require('./cron/expenseScheduler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/expenses', expenseRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
