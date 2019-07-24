import { Concepts } from '/imports/api/concepts/concepts.js';

import './admin.html';

Template.admin.onCreated(function(){
  this.subscribe('concepts.all');
  this.search = new ReactiveVar(null);
  this.parentId = new ReactiveVar(null);
  this.result = new ReactiveVar(null);
})

Template.admin.helpers({
  matches(){
    const instance = Template.instance();
    return instance.search.get() && Concepts.find({name: { $regex: instance.search.get(), $options: 'i' }});
  },
  result() {
    return Template.instance().result.get();
  },
  parentId() {
    return Template.instance().parentId.get();
  },
})

Template.admin.events({
  'keyup input[name="search"]'(e,instance){
    instance.search.set($(e.currentTarget).val());
  },
  'click li.parent-choice'(e,instance){
    instance.parentId.set($(e.currentTarget).attr('data-id'));
  },
  'click form>button'(e,instance){
    e.preventDefault();
    let data = {parentId: instance.parentId.get()};
    $('form').serializeArray().forEach(function(obj){
      if (obj.name == 'search') return false;

      data[obj.name] = obj.value;
    })
    Meteor.call('concepts.add', data, function(error, result){
      instance.result.set(error || result);
    });
  },
  'click button.dump'(e, instance) {
    alert('not implemented');
    //Concepts.find({}).fetch()
  },
})
