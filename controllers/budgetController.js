const db = require('../models/index');

const budgetController = function(){

    const getAllBudgets = function(){
        return db.BudgetByTime.findAll();
    }

    const addBudget = function(userId, year, month, budgetAmount){
        if(userId < 0 || year < 0 || month < 0 || budgetAmount < 0){
            return;
        }

        return db.BudgetByTime.findOrCreate({where: {UserId: userId, Year: year, Month: month}, defaults: { BudgetAmount: budgetAmount}});
    }

    const getBudgetsByUserId = function(userId){
        return db.BudgetByTime.findAll({ where: {UserId: userId}});
    }

    const getBudgetsByUserIdAndYear = function(userId, year){
        return db.BudgetByTime.findAll({ where: {UserId: userId, Year: year}});
    }

    const getBudgetsByUserIdAndMonth = function(userId, month){
        return db.BudgetByTime.findAll({ where: {UserId: userId, Month: month}});
    }

    const getBudgetById = function(userId, year, month){
        return db.BudgetByTime.findOne({ where: {UserId: userId, Year: year, Month: month}});
    }

    const editBudget = function(userId, year, month, budgetAmount){
        if(userId < 0 || year < 0 || month < 0 || budgetAmount < 0){
            return;
        }

        return db.BudgetByTime.update(
            { 
                UserId: userId,
                Year: year,
                Month: month,
                BudgetAmount: budgetAmount
            },
            { where: { UserId: userId, Year: year, Month: month } }
        );
    }

    const deleteBudget = function(userId, year, month){
        return db.BudgetByTime.destroy({
            where: {
                UserId: userId,
                Year: year,
                Month: month
            }});
    }

    return {
        getAllBudgets,
        getBudgetsByUserId,
        getBudgetsByUserIdAndYear,
        getBudgetsByUserIdAndMonth,
        getBudgetById,
        addBudget,
        editBudget,
        deleteBudget
    };
}();

module.exports = budgetController;