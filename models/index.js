const Sequelize = require('sequelize');
const db = require('../config/database');
const seeder = require('../config/seeder');

const models = {

  Currency: db.import('./currency'),
  User: db.import('./user'),
  PaymentCategory: db.import('./paymentCategory'),
  IncomeCategory: db.import('./incomeCategory'),
  Payment: db.import('./payment'),
  Income: db.import('./income'),
  BudgetByTime: db.import('./budgetByTime')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;

