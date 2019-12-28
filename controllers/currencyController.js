const db = require('../models/index');

const currencyController = function(){

    const getAllCurrencies = function(){
        return db.Currency.findAll();
    }

    const addCurrency = function(name, symbol, code){
        if(name === null || code === null){
            return;
        }

        return db.Currency.findOrCreate({where: {Name: name}, defaults: { Symbol: symbol, Code: code}});
    }

    const getCurrencyById = function(id){
        return db.Currency.findOne({ where: {Id: id}});
    }

    const editCurrency = function(id, name, symbol, code){
        if(name === null || code === null){
            return;
        }

        return db.Currency.update(
            { 
                Name: name,
                Symbol: symbol,
                Code: code
            },
            { where: { Id: id } }
        );
    }

    const deleteCurrency = function(id){
        return db.Currency.destroy({
            where: {
                Id: id
            }});
    }

    return {
        getAllCurrencies,
        addCurrency,
        getCurrencyById,
        editCurrency,
        deleteCurrency
    };
}();

module.exports = currencyController;