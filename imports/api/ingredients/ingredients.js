import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

export const Ingredients = new Mongo.Collection('ingredients');
/*
  {
    userId: id
    name: string
    amount: number
    amountType: string <enum oz,cups,count,tbsp>
    calories: number
    protein: number
    fat: number
    carbs: number
  }
*/

Ingredients.formFields = [
  {key: 'name', type: 'string', label: 'Item'},
  {key: 'amount', type: 'number', label: 'Quantity'},
  {key: 'amountType', type: 'enum', label: 'unit', options: _.map({oz: "oz (weight)", cups: "cups", count: "count", tbsp: "tablespoon (tbsp)"}, function(label, key){return {label, key}})},
  {key: 'calories', type: 'number', label: 'Calories'},
  {key: 'protein', type: 'number', label: 'Protein (g)'},
  {key: 'fat', type: 'number', label: 'Fat (g)'},
  {key: 'carbs', type: 'number', label: 'Carbs (g)'},
];

Ingredients.displayHeaders = _.map({
  name: 'Item',
  amount: 'Quantity',
  amountType: 'unit',
  calories: 'Cal',
  protein: 'Protein (g)',
  fat: 'Fat (g)',
  carbs: 'Carbs (g)',
}, function(label, key){return {label, key}});

Ingredients.helpers({})
