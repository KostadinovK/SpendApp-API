module.exports = function () {
    const fs = require('fs');
    const path = require('path');

    function seedData(db){

        seedCurrencies(db);
        seedCategories(db);

    }

    function hasCurrenciesInDb (db) {
        return db.Currency.count()
          .then(count => {
                if (count == 0) {
                    return false;
                }
                return true;
        });
    }

    function hasCategoriesInDb (db, categoryType) {
        if(categoryType == "payment"){
            return db.PaymentCategory.count()
                .then(count => {
                    if (count == 0) {
                        return false;
                    }
                    return true;
                });
        }else if(categoryType == "income"){
            return db.IncomeCategory.count()
                .then(count => {
                    if (count == 0) {
                        return false;
                    }
                    return true;
                });
        }
        
        return null;
    }

    function seedCurrencies(db) {
        hasCurrenciesInDb(db).then(hasCurrencies => {
            if (!hasCurrencies) {
                const filePath = path.join(__dirname, 'currencies.json');

                fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
                    if (!err) {
                        let currencies = JSON.parse(data);
                        for (const currency of currencies) {
                    
                            db.Currency.create({
                                Name: currency.Name,
                                Symbol: currency.Symbol,
                                Code: currency.Code
                            });
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
        });
    }

    function seedCategories(db){       
        const filePath = path.join(__dirname, 'categories.json');

        fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                let paymentCategories = JSON.parse(data).PaymentCategories;
                hasCategoriesInDb(db, "payment").then(hasCurrencies => {
                    if (!hasCurrencies) {
                        for (const category of paymentCategories) {
                            
                            db.PaymentCategory.create({
                                Name: category.Name,
                                IconClass: category.IconClass
                            });
                        }
                    }
                });

                let incomeCategories = JSON.parse(data).IncomeCategories;
                hasCategoriesInDb(db, "income").then(hasCurrencies => {
                    if (!hasCurrencies) {
                        for (const category of incomeCategories) {
                        
                            db.IncomeCategory.create({
                                Name: category.Name,
                                IconClass: category.IconClass
                            });
                        }
                    }
                })
            } else {
                console.log(err);
            }
        });
    }

    return {
        seedData
    };
}();