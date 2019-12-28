const db = require('../models/index');

const paymentCategoryController = function(){

    const getAllCategories = function(){
        return db.PaymentCategory.findAll();
    }

    const addCategory = function(name, iconClass){
        if(name === null || iconClass === null){
            return;
        }

        return db.PaymentCategory.findOrCreate({where: {Name: name}, defaults: { IconClass: iconClass}});
    }

    const getCategoryById = function(id){
        return db.PaymentCategory.findOne({ where: {Id: id}});
    }

    const editCategory = function(id, name, iconClass){
        if(name === null || iconClass === null){
            return;
        }

        return db.PaymentCategory.update(
            { 
                Name: name,
                IconClass: iconClass
            },
            { where: { Id: id } }
        );
    }

    const deleteCategory = function(id){
        return db.PaymentCategory.destroy({
            where: {
                Id: id
            }});
    }

    return {
        getAllCategories,
        addCategory,
        getCategoryById,
        editCategory,
        deleteCategory
    };
}();

module.exports = paymentCategoryController;