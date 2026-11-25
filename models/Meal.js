const { default: mongoose, Collection } = require("mongoose");

let mealPlanModel = mongoose.Schema({
    day: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    snack: String, 
    description: String,
},
{
    Collection:"books"
})
module.exports=mongoose.model('meals', mealPlanModel)