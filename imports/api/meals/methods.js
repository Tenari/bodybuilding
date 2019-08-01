import { Meteor } from 'meteor/meteor';
import { Meals } from './meals.js';

Meteor.methods({
  'meals.add'(meal){
    const id = Meals.insert({
      userId: Meteor.userId(),
      name: meal.name,
      ingredients: meal.ingredients,
      calories: meal.calories,
      protein: meal.protein,
      fat: meal.fat,
      carbs: meal.carbs,
    })
    return "meal added id: "+id;
  },
})
