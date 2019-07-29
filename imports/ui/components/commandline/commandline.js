import { _ } from 'meteor/underscore';
import './commandline.html';

Template.commandline.onCreated(function(){
  this.command = new ReactiveVar('');
  this.history = new ReactiveVar([]);
  this.historyLocation = new ReactiveVar(1);
  this.matches = new ReactiveVar([]);
})

Template.commandline.helpers({
  firstSuggestion(){
    const instance = Template.instance();
    const command = instance.command.get();
    return command.length > 0 && instance.matches.get()[0];
  },
  matches(){
    const m = Template.instance().matches.get();
    if (m.length > 1) {
      return m;
    }
    return false;
  }
})

Template.commandline.events({
  'keydown .commandline>input'(e, instance){
    if (e.keyCode == 9) {
      e.preventDefault();
    }
  },
  'keyup .commandline>input'(e, instance){
    e.preventDefault();
    console.log(e.keyCode, e);
    if (e.keyCode == 13) { // Enter
      const command = $(e.currentTarget).val();
      var history = instance.history.curValue;
      history.push(command);
      instance.history.set(history);
      instance.historyLocation.set(1);

      instance.data.interpreter(command); // actually do things based on the command

      $(e.currentTarget).val('');
      instance.command.set('');
      instance.matches.set([]);
    } else if (e.keyCode == 38 && !e.shiftKey) { // ArrowUp
      const index = instance.history.curValue.length - instance.historyLocation.curValue;
      if(index < 0) return null;
      updateCommand(e, instance.history.curValue[index], instance);
      instance.historyLocation.set(instance.historyLocation.curValue + 1);
    } else if (e.keyCode == 40 && !e.shiftKey) { // ArrowDown
      const index = instance.history.curValue.length - instance.historyLocation.curValue + 2;
      if(index > instance.history.curValue.length) return null;
      updateCommand(e, instance.history.curValue[index], instance);
      instance.historyLocation.set(instance.historyLocation.curValue - 1);
    } else if (e.keyCode == 9) { // TAB
      updateCommand(e, instance.matches.curValue[0]+' ', instance);
    } else {
      const command = $(e.currentTarget).val();
      instance.command.set(command);
      instance.matches.set(filterMatches(instance, command));
    }
  }
})

function updateCommand(e, command, instance){
  instance.command.set(command);
  instance.matches.set(filterMatches(instance, command));
  $(e.currentTarget).val(command);
}
function filterMatches(instance, command) {
  return _.select(instance.data.autocomplete, function(suggestion){ return suggestion.match(command)});
}
