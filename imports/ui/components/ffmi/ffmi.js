import './ffmi.html';

Template.ffmi_calc.onCreated(function(){
  this.ffmi = new ReactiveVar(null);
})
Template.ffmi_calc.helpers({
  ffmi(){ return Template.instance().ffmi.get(); },
})
Template.ffmi_calc.events({
  'click button'(e, instance){
    const weightKg = parseFloat($('input.weight').val()) * 0.4535924;
    const bodyFat = parseFloat($('input.bf').val()) / 100;
    const inches = parseFloat($('input.height').val());
    const lean = weightKg * (1.0 - bodyFat);
    const ffmi = (lean / 2.2) / Math.pow((inches * 0.0254), 2) * 2.20462;
    instance.ffmi.set(ffmi.toFixed(2));
  }
})
