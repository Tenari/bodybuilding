import './searchdown.html';

Template.searchdown.onCreated(function(){
  this.suggestions = new ReactiveVar(null);
  this.chosenSearch = new ReactiveVar(null);
  this.chosenId = new ReactiveVar(null);
})
Template.searchdown.helpers({
  suggestions(){
    return Template.instance().suggestions.get();
  },
  prop(key, obj){
    return obj[key];
  },
  chosenSearch(){
    return Template.instance().chosenSearch.get();
  },
  chosenId(){
    return Template.instance().chosenId.get();
  }
})
Template.searchdown.events({
  'click .searchdown>ul>li'(e, instance){
    const id = $(e.currentTarget).attr('data-id');
    const text = $(e.currentTarget).text();
    instance.chosenSearch.set(text);
    instance.chosenId.set(id);
    instance.suggestions.set(null);
    instance.data.choose(id);
  },
  'click .searchdown>span.remove-choice'(e, instance) {
    instance.chosenSearch.set(null);
    instance.chosenId.set(null);
    instance.data.choose(null);
  },
  'keyup .searchdown>input[type="text"]'(e, instance){
    console.log(instance.data.calcSuggestions($(e.currentTarget).val()));
    instance.suggestions.set(
      instance.data.calcSuggestions($(e.currentTarget).val())
    );
  },
})
