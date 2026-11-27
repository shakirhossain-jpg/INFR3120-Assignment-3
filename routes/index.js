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

/* CREATE: GET Add Meal page*/
router.get('/addmeal', function(req, res, next) {
  res.render('addMeal', { title: 'Add Meals' });
});

/* CREATE: POST Add Meal submission*/
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

/* UPDATE: Get edit meal page*/
router.get('/editMeal', async function (req, res, next) {
  res.render('editMeal', { title: 'Edit Meal Plan'});
});

/*UPDATE: Post Edit meal submission - replace data for selected day*/
router.post('/editMeal/:id', async function(req, res, next) {
  try {
    const updatedMeal = await MealPlan.findOneAndUpdate(
      { day: req.body.day },
      {
        day: req.body.day,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner,
        description: req.body.description
      },
      {new: true, runValidators: true}
    );

    if(!updatedMeal) {
      return res.render('editMeal', {
        title: 'Edit Meal Plan',
        error: 'No meal plan found for ${req.body.day}. Add one for it, or pick another day'
      });
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('editMeal', {
      title: 'Edit Meal Plan',
      error: 'Error updating meal plan in database'
    });
  }
});

/*DELETE: POST/DELETE Meal Plan by ID*/
router.post('/deleteMeal/:id', async function(req, res, next) {
  try {
    await MealPlan.findByIdandDelete(req.param.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
