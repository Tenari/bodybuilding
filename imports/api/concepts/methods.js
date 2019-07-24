import { Meteor } from 'meteor/meteor';
import { Concepts } from './concepts.js';

Meteor.methods({
  'concepts.add'(data){
    const parentObj = Concepts.findOne(data.parentId);
    const id = Concepts.insert({
      name: data.name,
      text: data.text,
    });
    Concepts.update(parentObj._id, {$push: {childIds: id}});
    return id;
  }
})
