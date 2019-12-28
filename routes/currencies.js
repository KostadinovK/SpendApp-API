const router = require('express').Router();
const auth = require('../modules/auth');
const currencyController = require('../controllers/currencyController');

router.get('/', auth(true), async (req, res, next) => {
    var currencies = await currencyController.getAllCurrencies();
    res.send(currencies);
});

module.exports = router;