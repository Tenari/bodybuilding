// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Concepts } from '../../api/concepts/concepts.js';

Meteor.startup(() => {
  const data = JSON.parse(Assets.getText('concepts.json'));
  if (Concepts.find().count() !== data.length) {
    data.forEach(concept => {
      Concepts.upsert(concept._id, concept)
    });
  }
});
