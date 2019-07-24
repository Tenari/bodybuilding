import './conceptTree.html';

Template.conceptTree.helpers({
  showList(){
    const instance = Template.instance();
    return instance.data.open[instance.data.concept._id] && instance.data.concept.childIds;
  }
});
