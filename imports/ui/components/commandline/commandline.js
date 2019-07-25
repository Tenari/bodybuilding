import './commandline.html';

Template.commandline.onCreated(function(){
  this.history = new ReactiveVar([]);
  this.historyLocation = new ReactiveVar(1);
})

Template.commandline.helpers({})

Template.commandline.events({
  'keyup .commandline>input'(e, instance){
    if (e.keyCode == 13) { // Enter
      const command = $(e.currentTarget).val();
      var history = instance.history.curValue;
      history.push(command);
      instance.history.set(history);
      instance.historyLocation.set(1);

      instance.data.interpreter(command); // actually do things based on the command

      $(e.currentTarget).val('');
    } else if (e.keyCode == 38) { // ArrowUp
      const index = instance.history.curValue.length - instance.historyLocation.curValue;
      if(index < 0) return null;
      $(e.currentTarget).val(instance.history.curValue[index]);
      instance.historyLocation.set(instance.historyLocation.curValue + 1);
    } else if (e.keyCode == 40) { // ArrowDown
      const index = instance.history.curValue.length - instance.historyLocation.curValue + 2;
      if(index > instance.history.curValue.length) return null;
      $(e.currentTarget).val(instance.history.curValue[index]);
      instance.historyLocation.set(instance.historyLocation.curValue - 1);
    }
  }
})
