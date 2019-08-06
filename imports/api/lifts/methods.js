import { Meteor } from 'meteor/meteor';
import { Lifts } from './lifts.js';
import { oneRM } from '/imports/configs/general.js';

Meteor.methods({
  'lifts.add'(obj){
    console.log(arguments);
    const id = Lifts.insert({
      userId: Meteor.userId(),
      name: obj.name,
      max: oneRM(obj['weightScheme-weight'], obj['weightScheme-reps']),
      primary: obj.primary,
      secondary: obj.secondary == 'none' ? null : obj.secondary,
      repMin: parseFloat(obj.repMin),
      repMax: parseFloat(obj.repMax),
      compound: obj.compound
    })
    return "lift added id: "+id;
  },
})
