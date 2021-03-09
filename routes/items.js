const  router  = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req,res)=>{
    Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' +err));
});

//get data with id
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const type = req.body.type;
    const remarks = req.body.remarks;
    const instock = req.body.instock;
    const infield = req.body.infield;
    const condition = req.body.condition;
    const vendor = req.body.vendor;
    const damaged = req.body.damaged;
    // const instock = Number(req.body.instock);
    // const infield = Number(req.body.infield);


const newItem = new Item({
    name,
    description,
    category,
    type,
    remarks,
    instock,
    infield,
    condition,
    vendor,
    damaged,
});

newItem.save()
.then(() => res.json('Item added!'))
.catch(err=> res.status(400).json('Error: '+ err));
});

// update items
router.route('/update/:id').post((req,res)=>{
    Item.findById(req.params.id)
    .then(item =>{
        // item.name = req.body.name;
        // item.description = req.body.description;
        // item.category = req.body.category;
        item.instock = req.body.instock;
        item.infield = req.body.infield;
        item.damaged = req.body.damaged;
        item.save()
        .then(() => res.json('Item Updated'))
        .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error' + err));
});

//searching for majors
router.route('/category/major').get((req, res) => {
    Item.find()
    .where('category').equals('Major')
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err))
});

//searching for minors
router.route('/category/minor').get((req, res) => {
    Item.find()
    .where('category').equals('Minor')
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router;