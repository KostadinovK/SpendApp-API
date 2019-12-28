const db = require('../models/index');
const jwt = require('../modules/jwt');

const userController = function(){
    const registerUser = function(username, password, budget, currency){
        if(username === null || password === null || password.length < 3 || budget < 0){
            return;
        }

        return db.User.findOrCreate({where: {Username: username}, defaults: { Password: password, BudgetAmount: budget, CurrencyId: currency, RegisterTimestamp: Date.now()}});
    };

    const loginUser = function(user){
        return jwt.create({id: user.Id});
    }

    const getAllUsers = function(){
        return db.User.findAll();
    };

    const getUserById = function(id){
        return db.User.findOne({ where: {Id: id}});
    };

    const getUserByUsername = function(username){
        return db.User.findOne({ where: {Username: username}});
    }

    const editUser = function(id, username, password, budget, currency, isAdmin = false){
        if(username === null || password === null || password.length < 3 || budget < 0){
            return;
        }
        
        return db.User.update(
            { 
                Username: username,
                Password: password,
                BudgetAmount: budget,
                CurrencyId: currency,
                IsAdmin: isAdmin 
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
        loginUser,
        getAllUsers,
        getUserById,
        getUserByUsername,
        editUser,
        deleteUser
    };
}();

module.exports = userController;