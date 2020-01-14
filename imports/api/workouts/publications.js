import { Meteor } from 'meteor/meteor';
import { Workouts } from './workouts.js';

Meteor.publish('workouts.mine', function () {
  if (!this.userId) return this.ready();
  return Workouts.find({userId: this.userId});
})
