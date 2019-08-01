import { Meteor } from 'meteor/meteor';
import { Ingredients } from './ingredients.js';

Meteor.methods({
  'ingredients.add'(formData){
    let obj = {};
    _.each(formData, function(val, key){
      const details = _.find(Ingredients.formFields, function(f){return f.key == key});
      if (!details) return false;
      obj[key] = details.type == 'number' ? parseFloat(val) : val;
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
