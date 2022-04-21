import { Meteor } from 'meteor/meteor';
import { Class } from '../../api/class/Class';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addClass(data) {
  console.log(`  Adding: ${data.className} (${data.courseNumber})`);
  Class.collection.insert(data);
}

if (Class.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default class data.');
    Meteor.settings.defaultData.map(data => addClass(data));
  }
}
