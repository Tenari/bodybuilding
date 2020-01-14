import './form.html';
import '/imports/ui/components/formField/formField.js';
import '/imports/ui/components/dropdown/dropdown.js';
import '/imports/ui/components/mapSelector/mapSelector.js';
import '/imports/ui/components/list/list.js';

Template.form.onCreated(function(){
  this.state = new ReactiveDict();
})

Template.form.helpers({
  isType(type, compare){
    return type == compare;
  },
  doCalc(field) {
    const instance = Template.instance();
    const map = instance.state.get(field.calcKey);
    const mappedCollection = _.indexBy(field.collection.find({}).fetch(), '_id');
    const calc = field.calc(mappedCollection, map);
    instance.state.set(field.key, calc);
    return calc;
  },
  onChangeFn(){
    const instance = Template.instance();
    return function(key, newVal){
      instance.state.set(key, newVal);
    }
  }
})

Template.form.events({
  'click form>button.submit'(e, instance){
    e.preventDefault();
    instance.data.handleSubmit(instance.state.all());
  },
  'keyup/change input.normal-field'(e, instance) {
    if ($(e.currentTarget).attr('type') == 'checkbox') {
      instance.state.set($(e.currentTarget).attr('name'), $(e.currentTarget).prop('checked'));
    } else {
      instance.state.set($(e.currentTarget).attr('name'), e.target.value);
    }
  },
})
