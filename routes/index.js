var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/addmeal', function(req, res, next) {
  res.render('addMeal', { title: 'Add Meals' });
});

module.exports = router;
