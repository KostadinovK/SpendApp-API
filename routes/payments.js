const router = require('express').Router();
const auth = require('../modules/auth');

const paymentController = require('../controllers/paymentController');

//Get All
router.get('/', auth(true), async (req, res) => {
    var payments = await paymentController.getAllPayments();
    res.send(payments);
});

//Get All by categoryId
router.get('/category/:id', auth(true), async (req, res) => {
    let categoryId = +req.params.id;

    var payments = await paymentController.getPaymentsByCategoryId(categoryId);
    res.send(payments);
});

//Get All by userId
router.get('/user/:id', auth(), async (req, res) => {
    let userId = +req.params.id;
    
    var payments = await paymentController.getPaymentsByUserId(userId);
    res.send(payments);
});

//Get All with IsInFuture=true and by userId
router.get('/user/:id/future', auth(), async (req, res) => {
    let userId = +req.params.id;
    
    var payments = await paymentController.getAllPaymentsInFuture(userId);
    res.send(payments);
});

//Get All by userId and categoryId
router.get('/user/:userId/category/:categoryId', auth(), async (req, res) => {
    let userId = +req.params.userId;
    let categoryId = +req.params.categoryId;
    
    var payments = await paymentController.getPaymentsByUserIdAndCategoryId(userId, categoryId);
    res.send(payments);
});

//Create
router.post('/', auth(), async (req, res) => {
    let {amount, date, name, notes, categoryId, userId} = req.body;

    amount = +amount;
    categoryId = +categoryId;
    userId = +userId;

    let resArr = await paymentController.createPayment(amount, date, name, notes, categoryId, userId);
    let payment = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "Payment already created!"});
    }else{
        res.status(201).send(payment);
    }
});

//Get
router.get('/:id', auth(), async (req, res) => {
    let paymentId = +req.params.id;

    let payment = await paymentController.getPaymentById(paymentId);

    if(payment === null){
        res.send({error: "Invalid payment Id!"});
    }else{
        res.send(payment);
    }
});

//Edit
router.put('/:id', auth(), async (req, res) => {
    const paymentId = +req.params.id;
    let {amount, date, name, notes, categoryId, isInFuture, userId} = req.body;

    amount = +amount;
    categoryId = +categoryId;
    userId = +userId;

    let resArr = paymentController.editPayment(paymentId, amount, date, name, notes, categoryId, isInFuture, userId);
    
    if(resArr[0] === 0){
        res.send({error: "Invalid payment Id!"});
    }else{
        let payment = await paymentController.getPaymentById(paymentId);
        res.send(payment);
    }
});

//Delete
router.delete('/:id', auth(), async (req, res) => {
    let paymentId = +req.params.id;

    let rowDeleted = await paymentController.deletePayment(paymentId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send({error: "Error deleting payment!"});
    }
});


module.exports = router;