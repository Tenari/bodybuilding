import { _ } from 'meteor/underscore';
import './tools.html';

import '/imports/ui/components/ffmi/ffmi.js';
import '/imports/ui/components/bodylog/bodylog.js';
import '/imports/ui/pages/nutrition/nutrition.js';

Template.tools.onCreated(function(){
  this.tool = new ReactiveVar(FlowRouter.getQueryParam('tool'));
});

Template.tools.helpers({
  list(){
    return _.map({
      bodylog: 'Body metrics logger',
      nutrition: 'Nutrition',
      training: 'Training',
      ffmi_calc: 'FFMI calculator',
      '1rm_calc': '1 Rep Max calculator',
    }, function(label, key){ return {label, key};});
  },
  selectedTool() {
    return Template.instance().tool.get();
  }
})

Template.tools.events({
  'click ul.tools>li>a'(e, instance){
    const key = $(e.currentTarget).attr('data-key');
    instance.tool.set(key);
  }
})
