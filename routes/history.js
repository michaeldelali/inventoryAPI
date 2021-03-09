const  router  = require('express').Router();
const { find } = require('../models/history.model');
let History = require('../models/history.model');

router.route('/').get((req,res)=>{
    History.find()
    .then(histories => res.json(histories))
    .catch(err => res.status(400).json('Error: ' +err));
});

//get data with id
router.route('/:id').get((req, res) => {
    History.findById(req.params.id)
      .then(histories => res.json(histories))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//get data with id of item
// router.route('/item/:id').get((req, res) => {
//     History.findOne({'itemId':req.params.id})
//       .then(histories => res.json(histories))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

router.route('/item/:id').get((req, res) => {
    History.find()
    .sort({createdAt: -1})
    .where('itemId').equals(req.params.id)
    .limit(14)
    .then(histories => res.json(histories))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res)=>{
    const user = req.body.user;
    const activity = req.body.activity;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    const instock = req.body.instock;
    const infield = req.body.infield;
    const damaged = req.body.damaged;
    // const instock = Number(req.body.instock);
    // const infield = Number(req.body.infield);


const newHistory = new History({
    user,
    activity,
    itemId,
    quantity,
    instock,
    infield,
    damaged,
});

newHistory.save()
.then(() => res.json('History added!'))
.catch(err=> res.status(400).json('Error: '+ err));
});

// // update history
// router.route('/update/:id').post((req,res)=>{
//     History.findById(req.params.id)
//     .then(item =>{
//         // item.name = req.body.name;
//         // item.activity = req.body.activity;
//         // item.itemId = req.body.itemId;
//         item.instock = req.body.instock;
//         item.infield = req.body.infield;
//         item.save()
//         .then(() => res.json('History Updated'))
//         .catch(err => res.status(400).json('Error: ' +err));
//     })
//     .catch(err => res.status(400).json('Error' + err));
// });


module.exports = router;