const mongoose = require('mongoose');

let mealPlanModel = mongoose.Schema({
    day: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    description: String,
},
{
    collection:'mealPlans'
})

module.exports=mongoose.model('meals', mealPlanModel)