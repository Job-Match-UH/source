import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupStudentEmail } from './signupstudentemail.page';
import { signupCompanyEmail } from './signupcompanyemail.page';
import { studentHomePage } from './studenthome.page';
import { studentProfilePage } from './studentprofile.page';
import { viewCompanyPage } from './viewcompany.page';
import { companyProfilePage } from './companyprofile.page';
import { companyHomePage } from './companyhome.page';
import { viewStudentPage } from './viewstudent.page';
import { jobPostingsPage } from './jobpostings.page';
import { adminHomePage } from './adminhome.page';
import { signupStudent } from './signupstudent.page';
import { addProjectPage } from './addproject.page';
import { addExperiencePage } from './addexperience.page';
import { addEducationPage } from './addeducation.page';
import { companySignup } from './signupcompany.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'lisa@foo.com', password: 'changeme' };
const credentials3 = { username: 'admin@foo.com', password: 'changeme' };
const credentials4 = { username: 'john2@foo.com', password: 'changeme' };
const credentials5 = { username: 'john3@foo.com', password: 'changeme' };
const personalInfo = { firstName: 'John', lastName: 'foo', address: 'zxc', phoneNum: '1234567', about: 'about' };
const projectInput = { name: 'Banana farm', description: 'farm bananas' };

fixture('job-match-uh availability tests')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test signin student, admin home, signin company and signout pages work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController, credentials3.username, credentials3.password);
  await navBar.isLoggedIn(testController, credentials3.username);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
});

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
});

test('Test studenthome, studentprofile & viewcompanymatches works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoStudentHome(testController);
  await studentHomePage.isDisplayed(testController);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
  await navBar.gotoViewCompanyMatches(testController);
  await viewCompanyPage.isDisplayed(testController);
});

test('Test companyhome, companyprofile & viewstudentmatches works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoCompanyProfile(testController);
  await companyProfilePage.isDisplayed(testController);
  await navBar.gotoCompanyHome(testController);
  await companyHomePage.isDisplayed(testController);
  await navBar.gotoViewStudentMatches(testController);
  await viewStudentPage.isDisplayed(testController);
  await navBar.gotoJobPostings(testController);
  await jobPostingsPage.isDisplayed(testController);
});
