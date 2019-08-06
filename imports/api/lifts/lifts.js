import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { MUSCLES } from '/imports/configs/muscles.js';

export const Lifts = new Mongo.Collection('lifts');
/*
  {
    userId: id
    name: string
    max: number
    primary: string
    secondary: string
    repMin: number
    repMax: number
    compound: boolean
  }
*/
function labelKey(label, key){return {label, key}};

Lifts.formFields = [
  {key: 'name', type: 'text', label: 'Name'},
  {key: 'primary', type: 'enum', label: 'Primary muscle', options: _.values(MUSCLES)},
  {key: 'secondary', type: 'enum', label: 'Secondary muscle', options: _.union([{key: 'none', label: 'None'}], _.values(MUSCLES))},
  {key: 'weightScheme', type: 'weightreps', label: 'Known weight'},
  {key: 'repRange', type: 'range', label: 'Rep range', minKey: 'repMin', maxKey: 'repMax'},
  {key: 'compound', type: 'checkbox', label: 'Compound'},
];

Lifts.displayHeaders = _.map({
  name: 'Name',
  max: '1RM',
  primary: 'Primary Muscle',
  secondary: 'Secondary Muscle',
  displayRepRange: 'Rep range',
  compound: 'Is compound?'
}, labelKey);

Lifts.helpers({
  displayRepRange(){
    return this.repMin + ' - ' + this.repMax;
  }
})
