import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

export const Logs = new Mongo.Collection('logs');
/*
  {
    userId: id
    date: datestring
    value: number
    unit: enum (in cm lbs kg)
    type: enum (Meal weight 'right arm' etc)
  }
*/
function labelKey(label, key){return {label, key}};

Logs.formFields = [
  {key: 'date', type: 'date', label: 'Date'},
  {key: 'value', type: 'number', label: 'Value'},
  {key: 'unit', type: 'enum', label: 'unit', options: _.map({
    inches: "Inches", cm: "Centimeters", lbs: "Pounds", kg: "Kilograms"
  }, labelKey)},
  {key: 'type', type: 'enum', label: 'Type', options: _.map({
    meal: "meal", weight: "weight", right_arm: "Right arm", left_arm: "Left arm", lift: "lift"
  }, labelKey)},
];

Logs.displayHeaders = _.map({
  date: 'Date',
  type: 'Type',
  value: 'Value',
  unit: 'unit',
}, labelKey);

Logs.helpers({})
