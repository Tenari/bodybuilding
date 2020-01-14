import './list.html';
import '/imports/ui/components/formField/formField.js';

Template.list.onCreated(function(){
})

Template.list.helpers({
  list(){
    return [{number: 1}];
  }
})
