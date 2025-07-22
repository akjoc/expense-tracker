const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Expense = sequelize.define('Expense', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Expense;
