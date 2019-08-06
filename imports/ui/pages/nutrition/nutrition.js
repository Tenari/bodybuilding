import { _ } from 'meteor/underscore';
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meals } from '/imports/api/meals/meals.js';
import { Lifts } from '/imports/api/lifts/lifts.js';

import './nutrition.html';
import '/imports/ui/components/commandline/commandline.js';
import '/imports/ui/components/table/table.js';
import '/imports/ui/components/form/form.js';

Template.nutrition.onCreated(function(){
  this.show = new ReactiveVar(null);
  this.add = new ReactiveVar(null);
  this.addResult = new ReactiveVar(null);
  this.autocompleteOptions = [
    'show','add','log','clear',
    'show ingredients','show meals', 'show lifts',
    'add ingredient', 'add meal', 'add lift',
    'log meal',"log meal 'scrambled eggs'"
  ];
  this.subscribe('ingredients.mine');
  this.subscribe('meals.mine');
  this.subscribe('lifts.mine');
});

Template.nutrition.helpers({
  autocompleteOptions(){
    return Template.instance().autocompleteOptions;
  },
  interpreter(){
    var instance = Template.instance();
    return function(command) {
      const args = command.split(' ');
      if (args[0] == 'show') {
        instance.show.set(args[1].trim());
      } else if (args[0] === 'add') {
        instance.add.set(args[1].trim());
      } else if (args[0] === 'clear') {
        instance.show.set(null);
        instance.add.set(null);
      } else if (args[0] === 'log') {
      }
    }
  },
  addResult() {
    return Template.instance().addResult.get();
  },
  add() {
    return Template.instance().add.get();
  },
  addData(){
    const instance = Template.instance();
    const add = instance.add.get();
    console.log(add);
    const mapping = {
      ingredient: {collection: Ingredients, add: 'ingredients.add'},
      meal: {collection: Meals, add: 'meals.add'},
      lift: {collection: Lifts, add: 'lifts.add'},
    }
    return {
      fields: mapping[add].collection.formFields,
      header: 'Add '+add,
      handleSubmit: function(arr){ Meteor.call(mapping[add].add, arr, function(error, result){
        instance.addResult.set(error || result);
        if(!error) {
          instance.add.set(null);
        }
      }) }
    };
  },
  show() {
    return Template.instance().show.get();
  },
  showData(){
    const show = Template.instance().show.get();
    let collection = {};
    if (show == 'ingredients') {
      collection = Ingredients;
    } else if (show === 'meals') {
      collection = Meals;
    } else if (show === 'lifts') {
      collection = Lifts;
    }
    var headers = collection.displayHeaders;
    var rows = collection.find({}).fetch();
    return {
      headers: headers,
      rows: rows,
    };
  },
});

Template.nutrition.events({});
