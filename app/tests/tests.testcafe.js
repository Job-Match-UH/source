import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupStudentEmail } from './signupstudentemail.page';
import { signupCompanyEmail } from './signupcompanyemail.page';
import { studentHomePage } from './studenthome.page';
import { studentProfilePage } from './studentprofile.page';
import { viewCompanyMatchesPage } from './viewcompanymatches.page';
import { companyProfilePage } from './companyprofile.page';
import { companyHomePage } from './companyhome.page';
import { viewStudentMatchesPage } from './viewstudentmatches.page';
import { jobPostingsPage } from './jobpostings.page';
import { adminHomePage } from './adminhome.page';
import { signupStudent } from './signupstudent.page';
import { addProjectPage } from './addproject.page';
import { addExperiencePage } from './addexperience.page';
import { addEducationPage } from './addeducation.page';
import { companySignup } from './signupcompany.page';
import { viewCompanyProfile } from './viewcompanyprofile.page';
import { viewStudentProfile } from './viewstudentprofile.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'facebook@fb.com', password: 'facebook' };
const credentials3 = { username: 'admin@foo.com', password: 'changeme' };
const credentials4 = { username: 'john2@foo.com', password: 'changeme' };
const credentials5 = { username: 'john3@foo.com', password: 'changeme' };
const personalInfo = { firstName: 'John', lastName: 'foo', address: 'zxc', phoneNum: '1234567', about: 'about' };
const projectInput = { name: 'Banana farm', description: 'farm bananas' };

fixture('job-match-uh availability tests')
  .page('http://localhost:3000');

test('Test that landing displays', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test signin page displays', async (testController) => {
  await landingPage.isDisplayed(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.isDisplayed(testController);
});

test('Test that signup student email page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.isDisplayed(testController);
  await signupStudentEmail.returnToSignin(testController);
});

test('Test that signup company email page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.isDisplayed(testController);
  await signupCompanyEmail.returnToSignin(testController);
});
/*
test('Test register student works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.isDisplayed(testController);
  await signupStudentEmail.returnToSignin(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.signupStudent(testController, credentials4.username, credentials4.password);
  await signupStudent.isDisplayed(testController);
  await signupStudent.inputPersonalInfo(testController, personalInfo.firstName, personalInfo.lastName, personalInfo.address, personalInfo.phoneNum, personalInfo.about);
  await addProjectPage.inputProjectData(testController, projectInput.name, projectInput.description);
  await signupStudent.clickExperiencesTab(testController);
  await addExperiencePage.inputExperienceData(testController);
  await signupStudent.gotoEducationTab(testController);
  await addEducationPage.inputEducation(testController);
});

test('Test register company works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.isDisplayed(testController);
  await signupCompanyEmail.returnToSignin(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.signupUser(testController, credentials5.username, credentials5.password);
  await companySignup.inputCompanyData(testController);
}); */

test('Test viewcompanymatches page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.isDisplayed(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await viewCompanyMatchesPage.isDisplayed(testController);
});

test('Test student profile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
});

test('Test viewstudentmatches page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.isDisplayed(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await viewStudentMatchesPage.isDisplayed(testController);
});

test('Test company profile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoCompanyProfile(testController);
  await companyProfilePage.isDisplayed(testController);
});

test('Test job listing page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoJobPostings(testController);
  await jobPostingsPage.isDisplayed(testController);
});

test.only('Test admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController, credentials3.username, credentials3.password);
  await navBar.isLoggedIn(testController, credentials3.username);
  await adminHomePage.isDisplayed(testController);
});
