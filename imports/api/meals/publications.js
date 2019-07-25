import { Meteor } from 'meteor/meteor';
import { Meals } from './meals.js';

Meteor.publish('meals.mine', function () {
  if (!this.userId) return this.ready();
  return Meals.find({userId: this.userId});
})
