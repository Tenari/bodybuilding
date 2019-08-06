import { Meteor } from 'meteor/meteor';
import { Lifts } from './lifts.js';

Meteor.publish('lifts.mine', function () {
  if (!this.userId) return this.ready();
  return Lifts.find({userId: this.userId});
})
