import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/Companies';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addCompanies(data) {
  console.log(`  Adding: ${data.companyName} (${data.owner})`);
  Companies.collection.insert(data);
}

// Initialize the CompaniesCollection if empty.
if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompanies) {
    console.log('Creating default company data.');
    Meteor.settings.defaultCompanies.map(data => addCompanies(data));
  }
}
