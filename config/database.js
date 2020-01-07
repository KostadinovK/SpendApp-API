const Sequelize = require('sequelize');

module.exports = new Sequelize('SpendAppDb', 'postgres', 'kwe32nm', {
    host: 'localhost',
    dialect: 'postgres'
});