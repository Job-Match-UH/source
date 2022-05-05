import { Meteor } from 'meteor/meteor';
import { Class } from '../../api/class/Class';
import { Students } from '../../api/student/Student';
import { Companies } from '../../api/company/Companies';
import { Tags } from '../../api/tags/Tags';
import { Experiences } from '../../api/experience/Experience';
import { Education } from '../../api/education/Education';
import { Projects } from '../../api/projects/Projects';
import { Jobs } from '../../api/job/Jobs';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addClass(data) {
  console.log(`  Adding: ${data.className} (${data.courseNumber})`);
  Class.collection.insert(data);
}

function addStudent(data) {
  // eslint-disable-next-line no-console
  console.log(`  Adding: ${data.firstName} (${data.lastName})`);
  Students.collection.insert(data);
}

function addTags(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Tags.collection.insert(data);
}

function addCompanies(data) {
  console.log(`  Adding: ${data.companyName} (${data.owner})`);
  Companies.collection.insert(data);
}

function addExperience(data) {
  console.log('  Adding Experience');
  Experiences.collection.insert(data);
}

function addEducation(data) {
  console.log('  Adding Education');
  Education.collection.insert(data);
}

function addProject(data) {
  console.log('  Adding Projects');
  Projects.collection.insert(data);
}

function addJob(data) {
  console.log('  Adding Jobs');
  Jobs.collection.insert(data);
}

// Initialize the StudentCollection if empty.
if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudentData) {
    // eslint-disable-next-line no-console
    console.log('Adding Student data.');
    Meteor.settings.defaultStudentData.map(data => addStudent(data));
  }
}

// Initialize the CompaniesCollection if empty.
if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompanies) {
    console.log('Creating default company data.');
    Meteor.settings.defaultCompanies.map(data => addCompanies(data));
  }
}

// Initialize the TagsCollection if empty.
if (Tags.collection.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tags.');
    Meteor.settings.defaultTags.map(data => addTags(data));
  }
}

// Initialize the ClassCollection if empty.
if (Class.collection.find().count() === 0) {
  if (Meteor.settings.defaultClasses) {
    console.log('Creating default class data.');
    Meteor.settings.defaultClasses.map(data => addClass(data));
  }
}

// Initialize the ExperienceCollection if empty.
if (Experiences.collection.find().count() === 0) {
  if (Meteor.settings.defaultExperiences) {
    console.log('Creating default experience data.');
    Meteor.settings.defaultExperiences.map(data => addExperience(data));
  }
}

// Initialize the ExperienceCollection if empty.
if (Education.collection.find().count() === 0) {
  if (Meteor.settings.defaultEducation) {
    console.log('Creating default education data.');
    Meteor.settings.defaultEducation.map(data => addEducation(data));
  }
}

// Initialize the ProjectCollection if empty.
if (Projects.collection.find().count() === 0) {
  if (Meteor.settings.defaultProjects) {
    console.log('Creating default project data.');
    Meteor.settings.defaultProjects.map(data => addProject(data));
  }
}

// Initialize the ProjectCollection if empty.
if (Jobs.collection.find().count() === 0) {
  if (Meteor.settings.defaultJobs) {
    console.log('Creating default job data.');
    Meteor.settings.defaultJobs.map(data => addJob(data));
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */

if (Meteor.users.find().count() < 15) {
  if (Meteor.settings.loadAssetsFile) {
    const assetsFileName = 'data.json';
    console.log(`Creating Student/Company from ${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.students.map(student => addStudent(student));
    jsonData.companies.map(company => addCompanies(company));
    jsonData.tags.map(tags => addTags(tags));
    jsonData.experiences.map(experiences => addExperience(experiences));
    jsonData.education.map(education => addEducation(education));
    jsonData.projects.map(projects => addProject(projects));
    jsonData.jobs.map(jobs => addJob(jobs));
  }
}
