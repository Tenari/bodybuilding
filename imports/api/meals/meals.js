import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { Ingredients } from '/imports/api/ingredients/ingredients.js';

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
  {key: 'ingredients', type: 'map', label: 'Ingredients', mapKey: '_id', mapValue: 'number', searchDisplay: 'name', mapName: 'ingredients', calcSuggestions: function(){
    return function(search){return Ingredients.find({name: { $regex: search, $options: 'i' }}).fetch()};
  }},
  {key: 'calories', type: 'calc', label: 'Calories', calcKey: 'ingredients', collection: Ingredients, calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].calories * count;}),function(memo, cals){ return memo + cals;}, 0);
  }},
  {key: 'protein', type: 'calc', label: 'Protein (g)', calcKey: 'ingredients', collection: Ingredients, calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].protein * count;}),function(memo, cals){ return memo + cals;}, 0);
  }},
  {key: 'fat', type: 'calc', label: 'Fat (g)', calcKey: 'ingredients', collection: Ingredients, calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].fat * count;}),function(memo, fat){ return memo + fat;}, 0);
  }},
  {key: 'carbs', type: 'calc', label: 'Carbs (g)', calcKey: 'ingredients', collection: Ingredients, calc: function(ingredients, map){
    return _.reduce(_.map(map, function(count, id){return ingredients[id].carbs * count;}),function(memo, carbs){ return memo + carbs;}, 0);
  }},
];

Meals.displayHeaders = _.map({
  name: 'Meal',
  calories: 'Cal',
  protein: 'Protein (g)',
  fat: 'Fat (g)',
  carbs: 'Carbs (g)',
  recipie: 'Recipie',
}, function(label, key){return {label, key}});

Meals.helpers({
  // maps the ingredients {id: number} object into a more human readable recipie
  recipie() {
    let result = {};
    _.each(this.ingredients, function(qty, id){
      const ingredient = Ingredients.findOne(id);
      result[ingredient.name] = (qty*ingredient.amount) + ' '+ ingredient.amountType;
    })
    return result;
  }
})
