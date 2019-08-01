import './dropdown.html';

Template.dropdown.events({
  'change select'(e,instance) {
    instance.data.onChange(instance.data.key, e.target.value);
  }
})
