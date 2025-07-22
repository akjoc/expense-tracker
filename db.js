const { Sequelize } = require('sequelize');

// Replace 'YOUR_PASSWORD' with your actual MySQL password!
const sequelize = new Sequelize('expense_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
