const db = require('../models/index');

const userController = function(){
    const registerUser = function(username, password, budget, currency){
        return db.User.findOrCreate({where: {Username: username}, defaults: { Password: password, BudgetAmount: budget, CurrencyId: currency, RegisterTimestamp: Date.now()}});
    }

    const getAllUsers = function(){
        return db.User.findAll();
    }

    return {
        registerUser,
        getAllUsers
    };
}();

module.exports = userController;