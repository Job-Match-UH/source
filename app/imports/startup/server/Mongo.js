import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/Companies';

// Initialize the database with a default data document.
function addCompanies(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Companies.collection.insert(data);
}

// Initialize the CompaniesCollection if empty.
if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default company data.');
    Meteor.settings.defaultCompanies.map(data => addCompanies(data));
  }
}
