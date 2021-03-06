const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth = require('../modules/auth');

const userController = require('../controllers/userController');

//Get All Users
router.get('/', auth(true), async (req, res, next) => {
    var users = await userController.getAllUsers();
    res.send(users);
});

//Register user
router.post('/', async (req, res) => {
    
    let {username, password, budget, currency} = req.body;

    budget = +budget;

    let resArr = await userController.registerUser(username, password, budget, currency);
    let user = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "User already registered!"});
    }else{
        res.status(201).send(user);
    }

});

//Login
router.post('/login', async (req, res) => {

    const {username, password} = req.body;

    let user = await userController.getUserByUsername(username);
    
    if(user === null){
        res.send({error: "User doesnt exist!"});
    }else{
        bcrypt.compare(password, user.Password).then(async function(result) {
            if(result === true){
                let token = await userController.loginUser(user);
                res.cookie('auth_cookie', token, {expires: new Date(Date.now() + 900000 * 100), httpOnly: true});
                res.send(user);
            }else{
                res.send({error: "Invalid Username or Password!"});
            }
        }).catch(err => res.send(err));
    }
});

//Logout
router.get('/logout', auth(), async (req, res) => {
    res.clearCookie("auth_cookie");
    res.send({result: "Successfully logged out!"});
});

//Get User
router.get('/:id', auth(), async (req, res) => {
    let userId = +req.params.id;

    let user = await userController.getUserById(userId);

    if(user === null){
        res.send({error: "Invalid User Id!"});
    }else{
        res.send(user);
    }
});

//Edit User
router.put('/:id', auth(true), async (req, res) => {
    const userId = +req.params.id;
    const {username, password, currency, isAdmin} = req.body;

    let resArr;
    if(isAdmin === null || isAdmin === undefined){
        resArr = await userController.editUser(userId, username, password, currency);
    }else{
        resArr = await userController.editUser(userId, username, password, currency, isAdmin);
    }
    
    if(resArr[0] === 0){
        res.send({error: "Invalid User Id!"});
    }else{
        let user = await userController.getUserById(userId);
        res.send(user);
    }
});

//Delete User
router.delete('/:id', auth(true), async (req, res) => {
    let userId = +req.params.id;

    let rowDeleted = await userController.deleteUser(userId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send({error: "Error on user delete"});
    }
});


module.exports = router;