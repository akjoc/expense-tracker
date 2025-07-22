const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Expense = require('./models/Expense');

const app = express();
app.use(bodyParser.json());

// Test API route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is working!');
});

// CREATE (Add Expense)
app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const expense = await Expense.create({ description, amount, category, date });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (Get all Expenses)
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (Update Expense)
app.put('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    expense.description = description;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (Delete Expense)
app.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    await expense.destroy();
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
