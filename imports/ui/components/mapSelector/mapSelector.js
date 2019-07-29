import './mapSelector.html';
import '/imports/ui/components/searchdown/searchdown.js';

Template.mapSelector.onCreated(function(){
  this.map = new ReactiveVar({});
  this.key = new ReactiveVar(false);
})
Template.mapSelector.helpers({
  mapRows(){
    return _.map(Template.instance().map.get(), function(value, key){return {key, value};});
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
    let m = instance.map.curValue;
    m[instance.key.curValue] = instance.$('input[name="mapValue"]').val();
    instance.map.set(m);
  },
})
