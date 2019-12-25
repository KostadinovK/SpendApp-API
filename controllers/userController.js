const db = require('../models/index');

const userController = function(){
    const registerUser = function(username, password, budget, currency){
        
        return db.User.findOrCreate({where: {Username: username}, defaults: { Password: password, BudgetAmount: budget, CurrencyId: currency, RegisterTimestamp: Date.now()}});
    }

    return {
        registerUser
    };
}();

module.exports = userController;