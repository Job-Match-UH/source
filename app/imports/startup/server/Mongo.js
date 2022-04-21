import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags/Tags';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addTags(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Tags.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Tags.collection.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tags.');
    Meteor.settings.defaultTags.map(data => addTags(data));
  }
}
