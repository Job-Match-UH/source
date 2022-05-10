import { Meteor } from 'meteor/meteor';
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

  if (Students.collection.find().count() === 0) {
    studentData.students.map(student => addStudent(student));
  }

  if (Companies.collection.find().count() === 0) {
    companyData.companies.map(company => addCompanies(company));
  }

  if (CompanyTags.collection.find().count() === 0) {
    companyTagData.companyTags.map(tags => addCompanyTags(tags));
  }

  if (StudentTags.collection.find().count() === 0) {
    studentTagData.studentTags.map(tags => addStudentTags(tags));
  }

  if (Experiences.collection.find().count() === 0) {
    experienceData.experiences.map(experiences => addExperience(experiences));
  }

  if (Education.collection.find().count() === 0) {
    educationData.education.map(education => addEducation(education));
  }

  if (Projects.collection.find().count() === 0) {
    projectData.projects.map(projects => addProject(projects));
  }

  if (Jobs.collection.find().count() === 0) {
    jobData.jobs.map(jobs => addJob(jobs));
  }
}
