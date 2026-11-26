var express = require('express');
var router = express.Router();
let MealPlan = require('../models/Meal')

/* GET home page, along with weekly meal plans */
router.get('/', async function(req, res, next) {
  try {
    const mealPlans = await MealPlan.find();
    res.render('index', { 
      title: 'Weekly Meal Plan',
      mealPlans: mealPlans
     });
  } catch (err) {
    console.error(err);
    res.render('index', {
      title: 'Weekly Meal Plan',
      mealPlans: []
    });
  }
});

/*GET Add Meal page*/
router.get('/addmeal', function(req, res, next) {
  res.render('addMeal', { title: 'Add Meals' });
});

/*POST Add Meal submission*/
router.post('/addMeal', async function(req, res, next){
  try {
    let newMealPlan = new MealPlan({
      day: req.body.day,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
      description: req.body.description
    });
    /*Wait for meal plan to be saved, then redirects back to home page*/
    await newMealPlan.save();
    res.redirect('/')
  } catch (err) {
    console.error(err);
    res.render('addMeal', {
      title: 'Add Meal Plan',
      error: 'Error saving meal plan to database'
    })
  }
})

module.exports = router;
