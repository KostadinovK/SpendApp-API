module.exports = function () {
    const fs = require('fs');
    const path = require('path');

    function seedData(db){

        seedCurrencies(db);
        //seedCategories(db);

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

    function hasCategoriesInDb (db) {
        return db.Category.count()
          .then(count => {
                if (count == 0) {
                    return false;
                }
                return true;
        });
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
        hasCategoriesInDb(db).then(hasCategories => {
            if (!hasCategories) {
                const filePath = path.join(__dirname, 'categories.json');

                fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
                    if (!err) {
                        let categories = JSON.parse(data);
                        for (const category of categories) {
                    
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

    return {
        seedData
    };
}();