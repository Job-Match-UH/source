import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupStudentEmail } from './signupstudentemail.page';
import { signupCompanyEmail } from './signupcompanyemail.page';
import { studentProfilePage } from './studentprofile.page';
import { viewCompanyMatchesPage } from './viewcompanymatches.page';
import { companyProfilePage } from './companyprofile.page';
import { viewStudentMatchesPage } from './viewstudentmatches.page';
import { jobPostingsPage } from './jobpostings.page';
import { adminHomePage } from './adminhome.page';
import { signupStudent } from './signupstudent.page';
import { companySignup } from './signupcompany.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'facebook@fb.com', password: 'facebook' };
const credentials3 = { username: 'admin@foo.com', password: 'changeme' };

fixture('job-match-uh availability tests')
  .page('http://localhost:3000');

test('Test that landing displays', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test signin page displays', async (testController) => {
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

test('Test signout page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.isDisplayed(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.ensureLogout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test register student works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.signupStudent(testController, credentials.password);
  await signupStudent.isDisplayed(testController);
});

test('Test register company works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.signupUser(testController, credentials.password);
  await companySignup.isDisplayed(testController);
});

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

test('Test admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController, credentials3.username, credentials3.password);
  await navBar.isLoggedIn(testController, credentials3.username);
  await adminHomePage.isDisplayed(testController);
});
