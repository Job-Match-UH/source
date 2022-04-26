import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupStudent } from './signupstudent.page';
import { signupCompany } from './signupcompany.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'lisa@foo.com', password: 'changeme' };

fixture('job-match-uh availability tests')
  .page('http://localhost:3000');

test.only('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test signin student, signin company and signout pages work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signinCompany(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
});

test('Test register student works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudent.isDisplayed(testController);
  await signupStudent.returnToSignin(testController);
  await signinPage.isDisplayed(testController);
});

test('Test register company works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompany.isDisplayed(testController);
  await signupCompany.returnToSignin(testController);
  await signinPage.isDisplayed(testController);
});
