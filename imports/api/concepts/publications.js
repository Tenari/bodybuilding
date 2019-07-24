import { Meteor } from 'meteor/meteor';
import { Concepts } from './concepts.js';

Meteor.publish('concepts.all', function () {
  //if (!this.userId) return this.ready();
  return Concepts.find({});
})
