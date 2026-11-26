const { default: mongoose, Collection } = require("mongoose");

let mealPlanModel = mongoose.Schema({
    day: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    description: String,
},
{
    Collection:"mealPlans"
})

module.exports=mongoose.model('meals', mealPlanModel)