import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

export const Meals = new Mongo.Collection('meals');
/*
  {
    userId: id
    name: string
    ingredients: {id: quantity}
    calories: number
    protein: number
    fat: number
    carbs: number
  }
*/

Meals.formFields = [
  {key: 'name', type: 'string', label: 'Meal'},
  {key: 'ingredients', type: 'map', label: 'Ingredients', mapKey: '_id', mapValue: 'number', mapCollection: 'Ingredients'},
  {key: 'calories', type: 'calc', label: 'Calories', calcKey: 'ingredients', calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].calories * count;}),function(memo, cals){ return memo + cals;}, 0);
  }},
  {key: 'protein', type: 'calc', label: 'Protein (g)', calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].protein * count;}),function(memo, cals){ return memo + cals;}, 0);
  }},
  {key: 'fat', type: 'calc', label: 'Fat (g)', calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].fat * count;}),function(memo, fat){ return memo + fat;}, 0);
  }},
  {key: 'carbs', type: 'calc', label: 'Carbs (g)', calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].carbs * count;}),function(memo, carbs){ return memo + carbs;}, 0);
  }},
];

Meals.displayHeaders = _.map({
  name: 'Meal',
  calories: 'Cal',
  protein: 'Protein (g)',
  fat: 'Fat (g)',
  carbs: 'Carbs (g)',
  ingredients: 'Recipie',
}, function(label, key){return {label, key}});

Meals.helpers({})
