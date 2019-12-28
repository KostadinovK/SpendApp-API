const db = require('../models/index');

const paymentController = function(){

    const getAllPayments = function(){
        return db.Payment.findAll();
    }

    const createPayment = function(amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }

        return db.Payment.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes}});
    }

    const getPaymentById = function(id){
        return db.Payment.findOne({ where: {Id: id}});
    }

    const getPaymentsByUserId = function(userId){
        return db.Payment.findAll({ where: {UserId: userId}});
    }

    const getPaymentsByCategoryId = function(categoryId){
        return db.Payment.findAll({ where: {CategoryId: categoryId}});
    }

    const getPaymentsByUserIdAndCategoryId = function(userId, categoryId){
        return db.Payment.findAll({ where: {UserId: userId, CategoryId: categoryId}});
    }

    const editPayment = function(id, amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }

        return db.Payment.update(
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

    const deletePayment = function(id){
        return db.Payment.destroy({
            where: {
                Id: id
            }});
    }

    return {
        getAllPayments,
        createPayment,
        getPaymentById,
        getPaymentsByUserId,
        getPaymentsByCategoryId,
        getPaymentsByUserIdAndCategoryId,
        editPayment,
        deletePayment
    };
}();

module.exports = paymentController;