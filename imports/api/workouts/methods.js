import { Meteor } from 'meteor/meteor';
import { Workouts } from './workouts.js';
import { oneRM } from '/imports/configs/general.js';

Meteor.methods({
  'workouts.add'(obj){
    console.log(arguments);
    throw 'not implemented';
    const id = Workouts.insert({
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
