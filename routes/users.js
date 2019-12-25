const router = require('express').Router();
const db = require('../models/index');

router.get('/', (req, res) => {
    res.send("Users");
});

//Register user
router.post('/', async (req, res) => {
    const {username, password, budget, currency} = req.body;

    let arr = await db.User.findOrCreate({where: {Username: username}, defaults: { Password: password, BudgetAmount: budget, CurrencyId: currency, RegisterTimestamp: Date.now()}});
    let isCreatedNow = arr[1];

    if(!isCreatedNow){
        res.send("Such user already exists!");
    }else{
        res.send(`User with username ${username} successfully registered`);
    }
});


module.exports = router;