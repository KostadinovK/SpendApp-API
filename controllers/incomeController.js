const db = require('../models/index');
const sequelize = require('sequelize');

const incomeController = function(){

    const getAllIncomes = function(){
        return db.Income.findAll();
    }

    const createIncome = function(amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }

        return db.Income.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes}});
    }

    const getIncomeById = function(id){
        return db.Income.findOne({ where: {Id: id}});
    }

    const getIncomesByUserId = function(userId){
        return db.Income.findAll({ where: {UserId: userId}, include: [db.IncomeCategory]});
    }

    const getIncomesByCategoryId = function(categoryId){
        return db.Income.findAll({ where: {CategoryId: categoryId}});
    }

    const getIncomesByUserIdAndCategoryId = function(userId, categoryId){
        return db.Income.findAll({ where: {UserId: userId, CategoryId: categoryId}});
    }

    const editIncome = function(id, amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }

        return db.Income.update(
            { 
                Name: name,
                Amount: amount,
                Date: date,
                Notes: notes,
                CategoryId: categoryId,
                UserId: userId
            },
            { where: { Id: id } }
        );
    }

    const deleteIncome = function(id){
        return db.Income.destroy({
            where: {
                Id: id
            }});
    }

    return {
        getAllIncomes,
        createIncome,
        getIncomeById,
        getIncomesByUserId,
        getIncomesByCategoryId,
        getIncomesByUserIdAndCategoryId,
        editIncome,
        deleteIncome
    };
}();

module.exports = incomeController;