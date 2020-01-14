import './formField.html';
import '/imports/ui/components/dropdown/dropdown.js';
import '/imports/ui/components/searchdown/searchdown.js';
import '/imports/ui/components/mapSelector/mapSelector.js';

Template.formField.helpers({
  isType(type, compare){
    return type == compare;
  },
});
