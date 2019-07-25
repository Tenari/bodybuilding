import { Meteor } from 'meteor/meteor';
import { Logs } from './logs.js';

Meteor.publish('logs.mine', function () {
  if (!this.userId) return this.ready();
  return Logs.find({userId: this.userId});
})
