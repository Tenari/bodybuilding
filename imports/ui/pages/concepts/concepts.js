import { Concepts } from '/imports/api/concepts/concepts.js';

import './concepts.html';

import '/imports/ui/components/concept/concept.js';
import '/imports/ui/components/conceptTree/conceptTree.js';

Template.Concepts_index.onCreated(function(){
  this.conceptId = new ReactiveVar(null);
  this.opened = new ReactiveVar({});
  this.subscribe('concepts.all');
});

Template.Concepts_index.helpers({
  topConcepts(){
    console.log(Concepts.find().fetch());
    return Concepts.find({topLevel: true});
  },
  selectedConcept(){
    const instance = Template.instance();
    if (instance.conceptId.get()){
      return Concepts.findOne(instance.conceptId.get());
    } else {
      return null;
    }
  },
  opened(){
    const instance = Template.instance();
    return instance.opened.get();
  },
})

Template.Concepts_index.events({
  'click a.concept'(e, instance){
    const id = $(e.currentTarget).attr('data-id');
    instance.conceptId.set(id);
    let o = instance.opened.get();
    o[id] = !o[id]
    instance.opened.set(o);
  },
});
