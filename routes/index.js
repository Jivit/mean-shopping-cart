var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teas.json', function (req, res, next) {
  db.Teas.find().then(function (results) {
    res.json(results);
  })
})

module.exports = router;
