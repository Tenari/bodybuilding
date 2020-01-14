import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';
import { MUSCLES } from '/imports/configs/muscles.js';
import { Lifts } from '/imports/api/lifts/lifts.js';

export const Workouts = new Mongo.Collection('workouts');
/*
  {
    userId: id
    name: string
    lifts: [
      {
        _id: idstring
        sets: number
        repMode: enum absolute|previous|best|rir
        reps: number
        weightMode: enum absolute|1rm|previous|best
        weight: number
        rest: number
      }
    ]
  }
*/
function labelKey(label, key){return {label, key}};

Workouts.formFields = [
  {key: 'name', type: 'text', label: 'Name'},
  {key: 'lifts', type: 'list', label: 'Lifts', listFields: [
    {key: '_id', type: 'searchdown', label: 'Lift', searchDisplay: 'name', calcSuggestions: function(){
      return function(search){
        return Lifts.find({name: { $regex: search, $options: 'i' }}).fetch();
      }
    }, chooseFn: function(){}},
    {key: 'sets', type: 'number', label: 'Sets'},
    {key: 'repMode', type: 'enum', label: 'Reps mode', options: _.map({
      absolute: 'Exact count', previous: 'Relative to previous workout', best: 'Relative to best lift', rir: 'Reps in reserve'
    },labelKey)},
    {key: 'reps', type: 'number', label: 'Reps'},
    {key: 'weightMode', type: 'enum', label: 'Weight mode', options: _.map({
      absolute: 'Exact poundage', max: '% of 1RM', previous: 'Pounds relative to previous workout',
      best: 'Pounds relative to best workout'
    }, labelKey)},
    {key: 'weight', type: 'number', label: 'Weight'},
    {key: 'rest', type: 'number', label: 'Minutes rest between sets'},
  ]},
];

Workouts.displayHeaders = _.map({
  name: 'Name',
  musclesWorked: 'Muscles worked',
}, labelKey);

Workouts.helpers({
  musclesWorked(){
    return {'Chest': 5, 'Triceps': 2.5};
  },
})

