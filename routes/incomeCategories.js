const router = require('express').Router();
const auth = require('../modules/auth');
const categoryController = require('../controllers/incomeCategoryController');

//Get All
router.get('/', auth(), async (req, res) => {
    var categories = await categoryController.getAllCategories();
    res.send(categories);
});

//Add
router.post('/', auth(true), async (req, res) => {

    const {name, iconClass} = req.body;

    let resArr = await categoryController.addCategory(name, iconClass);
    let category = resArr[0];
    let isCreatedNow = resArr[1];

    if(!isCreatedNow){
        res.send({error: "Payment Category already added!"});
    }else{
        res.status(201).send(category);
    }
});

//Get By Id
router.get('/:id', auth(true), async (req, res) => {
    let categoryId = +req.params.id;

    let category = await categoryController.getCategoryById(categoryId);

    if(category === null){
        res.send("Invalid category id");
    }else{
        res.send(category);
    }
})

//Edit
router.put('/:id', auth(true), async (req, res) => {
    const categoryId = +req.params.id;
    const {name, iconClass} = req.body;

    let resArr = await categoryController.editCategory(categoryId, name, iconClass);
    
    if(resArr[0] === 0){
        res.send("Invalid category id");
    }else{
        let category = await categoryController.getCategoryById(categoryId);
        res.send(category);
    }
});

//Delete
router.delete('/:id', auth(true), async (req, res) => {
    let categoryId = +req.params.id;

    let rowDeleted = await categoryController.deleteCategory(categoryId);

    if(rowDeleted === 1){
        res.send({deleted: rowDeleted});
    }else{
        res.send("Error");
    }
})

module.exports = router;