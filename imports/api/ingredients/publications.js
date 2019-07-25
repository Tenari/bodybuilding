import { Meteor } from 'meteor/meteor';
import { Ingredients } from './ingredients.js';

Meteor.publish('ingredients.mine', function () {
  if (!this.userId) return this.ready();
  return Ingredients.find({userId: this.userId});
})
