var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//index
router.get('/teas', function (req, res, next) {
  db.Teas.find().then(function (results) {
    res.json(results);
  })
})

router.get('/teas/:id', function (req, res, next) {
  db.Teas.findById(req.params.id).then(function (tea) {
    res.json(tea);
  })
})


//show
router.get('/carts/:id', function (req, res, next) {
  db.Carts.findById(req.params.id).then(function (cart) {
    res.json(cart);
  })
})

//create
router.post('/carts', function (req, res, next) {
  db.Carts.create({
    user_id: req.body.user_id || null,
    items: [req.body.item]
  }).then(function (cart) {
    res.json(cart);
  })
})

//Update
router.post('/carts/:id', function (req, res, next) {
  db.Carts.findByIdAndUpdate(req.params.id, {
    user_id: req.body.cart.user_id,
    items: req.body.cart.items
  }).then(function (cart) {
    res.json(cart);
  })
})

router.get('/')
module.exports = router;
