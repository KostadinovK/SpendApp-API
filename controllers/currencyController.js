const db = require('../models/index');

const currencyController = function(){

    const getAllCurrencies = function(){
        return db.Currency.findAll();
    }

    return {
        getAllCurrencies
    };
}();

module.exports = currencyController;