import './form.html';
import '/imports/ui/components/dropdown/dropdown.js';
import '/imports/ui/components/mapSelector/mapSelector.js';

Template.form.helpers({
  isType(type, compare){
    return type == compare;
  },
  doCalc(field) {
//    console.log(Template.instance().$('input[name="'+field.calcKey+'"]'));
    return 'asdf';//field.calc();
  },
})

Template.form.events({
  'click form>button.submit'(e, instance){
    e.preventDefault();
    instance.data.handleSubmit($(e.currentTarget).closest('form').serializeArray());
  }
})
