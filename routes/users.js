const router = require('express').Router();
const userController = require('../controllers/userController');

//Get All Users
router.get('/', async (req, res, next) => {
    var users = await userController.getAllUsers();
    res.send(users);
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

//Get User
router.get('/:id', async (req, res) => {
    let userId = +req.params.id;

    let user = await userController.getUser(userId);

    if(user === null){
        res.send("Invalid user id");
    }else{
        res.send(user);
    }
});

//Edit User
router.put('/:id', async (req, res) => {
    const userId = +req.params.id;
    const {username, password, budget, currency} = req.body;

    let resArr = await userController.editUser(userId, username, password, budget, currency);

    if(resArr[0] === 0){
        res.send("Invalid user id");
    }else{
        let user = await userController.getUser(userId);
        res.send(user);
    }
});

//Delete User
router.delete('/:id', async (req, res) => {
    let userId = +req.params.id;

    let rowDeleted = await userController.deleteUser(userId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send("Error");
    }
});


module.exports = router;