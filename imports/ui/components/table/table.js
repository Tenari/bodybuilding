import './table.html';

Template.table.helpers({
  pick(row, key) {
    return row[key];
  }
})
