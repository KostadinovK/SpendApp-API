const db = require('../models/index');

const incomeCategoryController = function(){

    const getAllCategories = function(){
        return db.IncomeCategory.findAll();
    }

    const addCategory = function(name, iconClass){
        if(name === null || iconClass === null){
            return;
        }

        return db.IncomeCategory.findOrCreate({where: {Name: name}, defaults: { IconClass: iconClass}});
    }

    const getCategoryById = function(id){
        return db.IncomeCategory.findOne({ where: {Id: id}});
    }

    const editCategory = function(id, name, iconClass){
        if(name === null || iconClass === null){
            return;
        }

        return db.IncomeCategory.update(
            { 
                Name: name,
                IconClass: iconClass
            },
            { where: { Id: id } }
        );
    }

    const deleteCategory = function(id){
        return db.IncomeCategory.destroy({
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

module.exports = incomeCategoryController;