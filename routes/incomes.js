const router = require('express').Router();
const auth = require('../modules/auth');

const incomeController = require('../controllers/incomeController');

//Get All
router.get('/', auth(true), async (req, res) => {
    var incomes = await incomeController.getAllIncomes();
    res.send(incomes);
});

//Get All by categoryId
router.get('/category/:id', auth(true), async (req, res) => {
    let categoryId = +req.params.id;

    var incomes = await incomeController.getIncomesByCategoryId(categoryId);
    res.send(incomes);
});

//Get All by userId
router.get('/user/:id', auth(), async (req, res) => {
    let userId = +req.params.id;
    
    var incomes = await incomeController.getIncomesByUserId(userId);
    res.send(incomes);
});

//Get All by userId and categoryId
router.get('/user/:userId/category/:categoryId', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let categoryId = +req.params.categoryId;
    
    var incomes = await incomeController.getIncomesByUserIdAndCategoryId(userId, categoryId);
    res.send(incomes);
});

//Create
router.post('/', auth(), async (req, res) => {
    let {amount, date, name, notes, categoryId, userId} = req.body;

    amount = +amount;
    categoryId = +categoryId;
    userId = +userId;

    let resArr = await incomeController.createIncome(amount, date, name, notes, categoryId, userId);
    let income = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "Income already created!"});
    }else{
        res.status(201).send(income);
    }
});

//Get
router.get('/:id', auth(), async (req, res) => {
    let incomeId = +req.params.id;

    let income = await incomeController.getIncomeById(incomeId);

    if(income === null){
        res.send({error: "Invalid income id!"});
    }else{
        res.send(income);
    }
});

//Edit
router.put('/:id', auth(), async (req, res) => {
    const incomeId = +req.params.id;
    let {amount, date, name, notes, categoryId, userId} = req.body;

    amount = +amount;
    categoryId = +categoryId;
    userId = +userId;

    let resArr = incomeController.editIncome(incomeId, amount, date, name, notes, categoryId, userId);
    
    if(resArr[0] === 0){
        res.send({error: "Invalid income id!"});
    }else{
        let income = await incomeController.getIncomeById(incomeId);
        res.send(income);
    }
});

//Delete
router.delete('/:id', auth(), async (req, res) => {
    let incomeId = +req.params.id;

    let rowDeleted = await incomeController.deleteIncome(incomeId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send({error: "Error deleting income"});
    }
});


module.exports = router;