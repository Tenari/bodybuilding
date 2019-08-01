import './table.html';

Template.table.helpers({
  pick(row, key) {
    if (typeof row[key] === 'function') {
      return row[key]();
    } else {
      return row[key];
    }
  },
  isObject(val){
    return _.isObject(val);
  },
  list(obj){
    return _.map(obj, function(value, key){return {key, value}});
  },
})
