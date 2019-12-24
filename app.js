const express = require('express');
const db = require('./models/index');

const app = express();

app.get('/', (req, res) => {
    
    db.Currency.create({
        Name: 'Bulgarian Lev',
        Code: 'BGN'
    }).then(function (models) {
        res.send("<h1>Hello World</h1>");
    });

    db.User.create({
        Username: 'TestTestov',
        Password: 'test123',
        BudgetAmount: 100,
        CurrencyId: 1,
        RegisterTimestamp: Date.now()
        
    }).then(function (models) {
        res.send("<h1>Hello World</h1>");
    });
    

    /*
    Get Users
    
    let userDtos = [];

    db.Users.findAll()
        .then(users => {
            for (const user of users) {
                let userDto = {
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    email: user.dataValues.email
                };
                console.log(userDto);
                userDtos.push(userDto);
            }

            res.send(JSON.stringify(userDtos));
        })
        .catch(err => console.log(err));
    */
});

const PORT = 5000;

db.sequelize.sync().then(() => app.listen(PORT, console.log(`Server started on port ${PORT}`)));