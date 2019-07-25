import { Meteor } from 'meteor/meteor';
import { Ingredients } from './ingredients.js';

Meteor.methods({
  'ingredients.add'(arr){
    let obj = {};
    _.each(arr, function(field){
      const details = _.find(Ingredients.formFields, function(f){return f.key == field.name});
      if (!details) return false;
      obj[field.name] = details.type == 'number' ? parseFloat(field.value) : field.value;
    })
    const id = Ingredients.insert({
      userId: Meteor.userId(),
      name: obj.name,
      amount: obj.amount,
      amountType: obj.amountType,
      calories: (4*obj.protein)+(9*obj.fat)+(4*obj.carbs),
      protein: obj.protein,
      fat: obj.fat,
      carbs: obj.carbs,
    })
    return "ingredient added id: "+id;
  },
})
