const db = require('../models/index');
const { Op } = require('sequelize');

const incomeController = function(){

    const getAllIncomes = function(){
        return db.Income.findAll();
    }

    const createIncome = function(amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }
        
        let year = Number(date.split('-')[0]);
        let month = Number(date.split('-')[1]) - 1;
        let day = Number(date.split('-')[2]);
       
        let incomeDate = new Date(year, month, day);

        let currentDate = new Date();

        if(incomeDate.getTime() > currentDate.getTime()){
            return db.Income.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes, IsInFuture: true}});
        }

        return db.Income.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes, IsInFuture: false}});
    }

    const getIncomeById = function(id){
        return db.Income.findOne({ where: {Id: id}, include: [db.IncomeCategory]});
    }

    const getIncomesByUserId = function(userId){
        return db.Income.findAll({ where: {UserId: userId}, include: [db.IncomeCategory]});
    }

    const getIncomesByCategoryId = function(categoryId){
        return db.Income.findAll({ where: {CategoryId: categoryId}});
    }

    const getAllIncomesInFuture = function(userId){
        let date = new Date();

        return db.Income.findAll({  where: {
            UserId: userId,
            Date: {
              [Op.lte]: date
            },
            IsInFuture: true
          }, include: [db.IncomeCategory]});
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
        deleteIncome,
        getAllIncomesInFuture
    };
}();

module.exports = incomeController;