const db = require('../models/index');

const userController = function(){
    const registerUser = function(username, password, budget, currency){
        return db.User.findOrCreate({where: {Username: username}, defaults: { Password: password, BudgetAmount: budget, CurrencyId: currency, RegisterTimestamp: Date.now()}});
    };

    const getAllUsers = function(){
        return db.User.findAll();
    };

    const getUser = function(id){
        return db.User.findOne({ where: {Id: id}});
    };

    const editUser = function(id, username, password, budget, currency){
        return db.User.update(
            { 
                Username: username,
                Password: password,
                BudgetAmount: budget,
                CurrencyId: currency 
            },
            { where: { Id: id } }
        );
    };

    const deleteUser = function(id){
        return db.User.destroy({
                    where: {
                        Id: id
                    }});
    };

    return {
        registerUser,
        getAllUsers,
        getUser,
        editUser,
        deleteUser
    };
}();

module.exports = userController;