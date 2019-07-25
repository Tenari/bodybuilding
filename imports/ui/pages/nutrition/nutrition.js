import { _ } from 'meteor/underscore';
import { Ingredients } from '/imports/api/ingredients/ingredients.js';
import { Meals } from '/imports/api/meals/meals.js';

import './nutrition.html';
import '/imports/ui/components/commandline/commandline.js';
import '/imports/ui/components/table/table.js';
import '/imports/ui/components/form/form.js';

Template.nutrition.onCreated(function(){
  this.show = new ReactiveVar(null);
  this.add = new ReactiveVar(null);
  this.addResult = new ReactiveVar(null);
});

Template.nutrition.helpers({
  interpreter(){
    var instance = Template.instance();
    return function(command) {
      const args = command.split(' ');
      if (args[0] == 'show') {
        instance.show.set(args[1]);
        instance.subscribe(args[1]+'.mine');
      } else if (args[0] === 'add') {
        instance.add.set(args[1]);
      } else if (args[0] === 'clear') {
        instance.show.set(null);
        instance.add.set(null);
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
    if (add == 'ingredient') {
      return {
        fields: Ingredients.formFields,
        header: 'Add ingredient',
        handleSubmit: function(arr){ Meteor.call('ingredients.add', arr, function(error, result){
          instance.addResult.set(error || result);
          if(!error) {
            instance.add.set(null);
          }
        }) }
      };
    }
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
