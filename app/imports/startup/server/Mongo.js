import { Meteor } from 'meteor/meteor';
import { Class } from '../../api/class/Class';
import { Students } from '../../api/student/Student';
import { Companies } from '../../api/company/Companies';
import { CompanyTags } from '../../api/tags/CompanyTags';
import { StudentTags } from '../../api/tags/StudentTags';
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

function addCompanyTags(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  CompanyTags.collection.insert(data);
}

function addStudentTags(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  StudentTags.collection.insert(data);
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
if (CompanyTags.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompanyTags) {
    console.log('Creating default company tags.');
    Meteor.settings.defaultCompanyTags.map(data => addCompanyTags(data));
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

if (Meteor.settings.loadAssetsFile) {
  const studentFile = 'students.json';
  const companyFile = 'companies.json';
  const companyTagFile = 'companyTags.json';
  const studentTagFile = 'studentTags.json';
  const experienceFile = 'experiences.json';
  const educationFile = 'educations.json';
  const projectFile = 'projects.json';
  const jobsFile = 'jobs.json';

  const studentData = JSON.parse(Assets.getText(studentFile));
  const companyData = JSON.parse(Assets.getText(companyFile));
  const companyTagData = JSON.parse(Assets.getText(companyTagFile));
  const studentTagData = JSON.parse(Assets.getText(studentTagFile));
  const experienceData = JSON.parse(Assets.getText(experienceFile));
  const educationData = JSON.parse(Assets.getText(educationFile));
  const projectData = JSON.parse(Assets.getText(projectFile));
  const jobData = JSON.parse(Assets.getText(jobsFile));

  studentData.students.map(student => addStudent(student));
  companyData.companies.map(company => addCompanies(company));
  companyTagData.companyTags.map(tags => addCompanyTags(tags));
  studentTagData.studentTags.map(tags => addStudentTags(tags));
  experienceData.experiences.map(experiences => addExperience(experiences));
  educationData.education.map(education => addEducation(education));
  projectData.projects.map(projects => addProject(projects));
  jobData.jobs.map(jobs => addJob(jobs));
}
