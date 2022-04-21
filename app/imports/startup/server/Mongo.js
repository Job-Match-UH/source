import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/student/Student';

// Initialize the database with a default data document.
function addStudent(data) {
  // eslint-disable-next-line no-console
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Students.collection.insert(data);
}

// Initialize the StudentCollection if empty.
if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudentData) {
    // eslint-disable-next-line no-console
    console.log('Adding Student data.');
    Meteor.settings.defaultStudentData.map(data => addStudent(data));
  }
}
