const router = require('express').Router();
const db = require('../models/index');
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send("Users");
});

//Register user
router.post('/', async (req, res) => {
    
    const {username, password, budget, currency} = req.body;

    let resArr = await userController.registerUser(username, password, budget, currency);
    let user = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "User already registered!"});
    }else{
        res.status(201).send(user);
    }

});


module.exports = router;