import './mapSelector.html';
import '/imports/ui/components/searchdown/searchdown.js';

Template.mapSelector.onCreated(function(){
  this.map = new ReactiveDict({});
  this.key = new ReactiveVar(false);
})
Template.mapSelector.helpers({
  mapRows(){
    return _.map(Template.instance().map.all(), function(value, key){return {key, value};});
  },
  mapHeaders(){
    return [{key: 'key', label: 'Key'},{key: 'value', label: 'Value'}];
  },
  wrappedCalcSuggestions(){
    return Template.instance().data.calcSuggestions;
  },
  chooseFn(){
    const instance = Template.instance();
    return function(id){
      instance.key.set(id);
    }
  },
  key(){
    return Template.instance().key.get();
  },
})

Template.mapSelector.events({
  'click .map-selector>button'(e, instance){
    e.preventDefault();
    instance.map.set(instance.key.curValue, instance.$('input[name="mapValue"]').val());
    instance.data.onChange(instance.data.mapName, instance.map.all());
  },
})
