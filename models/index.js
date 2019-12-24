const Sequelize = require('sequelize');
const db = require('../config/database');

const models = {
  Users: db.import('./user')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;
