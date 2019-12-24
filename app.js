const express = require('express');
const db = require('./models/index');
const seeder = require('./config/seeder');

const app = express();

app.get('/', (req, res) => {

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

db.sequelize.sync().then(() => {
    seeder.seedData(db);
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
});