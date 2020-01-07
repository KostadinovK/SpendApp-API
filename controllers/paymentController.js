const db = require('../models/index');
const { Op } = require('sequelize');

const paymentController = function(){

    const getAllPayments = function(){
        return db.Payment.findAll();
    }

    const createPayment = function(amount, date, name, notes, categoryId, userId){
        if(amount < 0 || date === null || name === null || categoryId < 0 || userId < 0){
            return;
        }

        let year = Number(date.split('/')[0]);
        let month = Number(date.split('/')[1]) - 1;
        let day = Number(date.split('/')[2]);
       
        let paymentDate = new Date(year, month, day);

        let currentDate = new Date();

        if(paymentDate.getTime() > currentDate.getTime()){
            return db.Payment.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes, IsInFuture: true}});
        }

        return db.Payment.findOrCreate({where: {Name: name, UserId: userId, Date: date, CategoryId: categoryId}, defaults: { Amount: amount, Notes: notes, IsInFuture: false}});
    }

    const getPaymentById = function(id){
        return db.Payment.findOne({ where: {Id: id}, include: [db.PaymentCategory]});
    }

    const getPaymentsByUserId = function(userId){
        return db.Payment.findAll({ where: {UserId: userId}, include: [db.PaymentCategory]});
    }

    // Get all payments where IsInFuture = true and date is before todays date
    const getAllPaymentsInFuture = function(userId){
        let date = new Date();

        return db.Payment.findAll({  where: {
            UserId: userId,
            Date: {
              [Op.lte]: date
            },
            IsInFuture: true
          }, include: [db.PaymentCategory]});
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
        deletePayment,
        getAllPaymentsInFuture
    };
}();

module.exports = paymentController;