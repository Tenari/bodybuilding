import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Concepts = new Mongo.Collection('concepts');
/*
  {
    name: string
    text: markdown-styled string
    childIds: [_id]
    topLevel: bool
  }
*/

Concepts.helpers({
  children(){
    return Concepts.find({_id: {$in: this.childIds}});
  }
})
