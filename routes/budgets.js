const router = require('express').Router();
const auth = require('../modules/auth');
const budgetController = require('../controllers/budgetController');

//Get All
router.get('/', auth(true), async (req, res) => {
    var budgets = await budgetController.getAllBudgets();
    res.send(budgets);
});

//Add
router.post('/', auth(true), async (req, res) => {

    let {userId, year, month, budgetAmount} = req.body;
    userId = +userId;
    year = +year;
    month = +month;
    budgetAmount = +budgetAmount;

    let resArr = await budgetController.addBudget(userId, year, month, budgetAmount);
    let budget = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "Budget already added!"});
    }else{
        res.status(201).send(budget);
    }
});

//Get By UserId
router.get('/:userId', auth(), async (req, res) => {
    let userId = +req.params.userId;

    let budgets = await budgetController.getBudgetsByUserId(userId);

    if(budgets === null){
        res.send({error: "No budgets with this user Id"});
    }else{
        res.send(budgets);
    }
});

//Get By UserId and Year(UserId/Year)
router.get('/:userId/:year', auth(), async (req, res) => {
    let userId = +req.params.userId;

    let budgets = await budgetController.getBudgetsByUserId(userId);

    if(budgets === null){
        res.send({error: "No budgets with this user Id and year"});
    }else{
        res.send(budgets);
    }
});

//Get by userId and year
router.get('/:userId/year/:year', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let year = +req.params.year;

    let budgets = await budgetController.getBudgetsByUserIdAndYear(userId, year);

    if(budgets === null){
        res.send({error: "No budgets in this year"});
    }else{
        res.send(budgets);
    }
});

//Get By month
router.get('/:userId/month/:month', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let month = +req.params.month;

    let budgets = await budgetController.getBudgetsByUserIdAndMonth(userId, month);

    if(budgets === null){
        res.send({error: "No budgets in this month"});
    }else{
        res.send(budgets);
    }
});

//Get By Id(UserId/Year/Month)
router.get('/:userId/:year/:month', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let year = +req.params.year;
    let month = +req.params.month;

    let budget = await budgetController.getBudgetById(userId, year, month);

    if(budget === null){
        res.send({error: "Invalid budget id"});
    }else{
        res.send(budget);
    }
});

//Edit
router.put('/:userId/:year/:month', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let year = +req.params.year;
    let month = +req.params.month;
    const { budgetAmount } = req.body;

    let resArr = await budgetController.editBudget(userId, year, month, budgetAmount);
    
    if(resArr[0] === 0){
        res.send({error: "Invalid budget id"});
    }else{
        let budget = await budgetController.getBudgetById(userId, year, month);
        res.send(budget);
    }
});

//Delete
router.delete('/:userId/:year/:month', auth(true), async (req, res) => {
    let userId = +req.params.userId;
    let year = +req.params.year;
    let month = +req.params.month;

    let rowDeleted = await budgetController.deleteBudget(userId, year, month);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send({error: "Error deleting budget"});
    }
})

module.exports = router;