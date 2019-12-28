const router = require('express').Router();
const auth = require('../modules/auth');
const currencyController = require('../controllers/currencyController');

//Get All
router.get('/', auth(true), async (req, res) => {
    var currencies = await currencyController.getAllCurrencies();
    res.send(currencies);
});

//Add
router.post('/', auth(true), async (req, res) => {

    const {name, symbol, code} = req.body;

    let resArr = await currencyController.addCurrency(name, symbol, code);
    let currency = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "Currency already added!"});
    }else{
        res.status(201).send(currency);
    }
});

//Get By Id
router.get('/:id', auth(true), async (req, res) => {
    let currencyId = +req.params.id;

    let currency = await currencyController.getCurrencyById(currencyId);

    if(currency === null){
        res.send("Invalid currency id");
    }else{
        res.send(currency);
    }
})

//Edit
router.put('/:id', auth(true), async (req, res) => {
    const currencyId = +req.params.id;
    const {name, symbol, code} = req.body;

    let resArr = await currencyController.editCurrency(currencyId, name, symbol, code);
    
    if(resArr[0] === 0){
        res.send("Invalid currency id");
    }else{
        let currency = await currencyController.getCurrencyById(currencyId);
        res.send(currency);
    }
});

//Delete
router.delete('/:id', auth(true), async (req, res) => {
    let currencyId = +req.params.id;

    let rowDeleted = await currencyController.deleteCurrency(currencyId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send("Error");
    }
})

module.exports = router;