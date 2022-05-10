import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupStudentEmail } from './signupstudentemail.page';
import { signupCompanyEmail } from './signupcompanyemail.page';
import { studentProfilePage } from './studentprofile.page';
import { viewCompanyMatchesPage } from './viewcompanymatches.page';
import { viewCompanyProfilePage } from './viewcompanyprofile.page';
import { companyProfilePage } from './companyprofile.page';
import { viewStudentMatchesPage } from './viewstudentmatches.page';
import { jobPostingsPage } from './jobpostings.page';
import { adminHomePage } from './adminhome.page';
import { signupStudent } from './signupstudent.page';
import { companySignup } from './signupcompany.page';
import { editStudentPage } from './editstudent.page';
import { editCompanyPage } from './editcompany.page';
import { viewStudentProfilePage } from './viewstudentprofile.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'facebook@fb.com', password: 'facebook' };
const credentials3 = { username: 'admin@foo.com', password: 'changeme' };
const newStudent = `user-${new Date().getTime()}student@foo.com`;
const newStudent1 = `user-${new Date().getTime()}xstudent@foo.com`;
const newCompany = `user-${new Date().getTime()}company@foo.com`;
const newCompany1 = `user-${new Date().getTime()}xcompany@foo.com`;
const personalData = { firstName: 'Cam', lastName: 'Ara', address: '321 Ala Moana Blvd',
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bg-easter-eggs.jpg/1024px-Bg-easter-eggs.jpg', phoneNum: '8088888888', about: 'I was born a baby' };
const projectData = { projectName: 'job matchuh', projectDescription: 'A job Matchuh\'' };
const experienceData = { title: 'Manager', companyName: 'UH Manoa', role: 'employee', jobDescription: 'Cleaned the library' };
const educationData = { nameOfSchool: 'UH Manoa', fieldOfStudy: 'Computer Science' };
const companyData = { companyName: 'fedex', website: 'fedex.com', address: 'fedex@fedex', state: 'HI', phoneNum: '1234567', established: '1922' };

fixture('job-match-uh availability tests')
  .page('http://localhost:3000');

/**
 * The following code tests that all pages are explorable from landing page and that all pages render accordingly.
 */

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

test('Test signup student displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.signupStudent(testController, newStudent, credentials.password);
  await signupStudent.isDisplayed(testController);
});

test('Test signup company displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.signupUser(testController, newCompany, credentials.password);
  await companySignup.isDisplayed(testController);
});

test('Test viewcompanymatches page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewCompanyMatches(testController);
  await viewCompanyMatchesPage.isDisplayed(testController);
});

test('Test viewcompanyprofile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoViewCompanyMatches(testController);
  await viewCompanyMatchesPage.selectMultifieldData(testController);
  await viewCompanyMatchesPage.gotoViewCompanyProfile(testController);
  await viewCompanyProfilePage.isDisplayed(testController);
});

test('Test student profile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
});

test('Test student edit page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.gotoEditStudent(testController);
  await editStudentPage.isDisplayed(testController);
});

test('Test viewstudentmatches page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoViewStudentMatches(testController);
  await viewStudentMatchesPage.isDisplayed(testController);
});

test('Test viewstudentprofile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoViewStudentMatches(testController);
  await viewStudentMatchesPage.selectMultifieldData(testController);
  await viewStudentMatchesPage.gotoViewStudentProfile(testController);
  await viewStudentProfilePage.isDisplayed(testController);
});

test('Test company profile page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoCompanyProfile(testController);
  await companyProfilePage.isDisplayed(testController);
});

test('Test company edit page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoCompanyProfile(testController);
  await companyProfilePage.gotoEditCompany(testController);
  await editCompanyPage.isDisplayed(testController);
});

test('Test job listing page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.isLoggedIn(testController, credentials2.username);
  await navBar.gotoJobPostings(testController);
  await jobPostingsPage.isDisplayed(testController);
});

test('Test admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signinAdmin(testController, credentials3.username, credentials3.password);
  await navBar.isLoggedIn(testController, credentials3.username);
  await navBar.gotoAdminHome(testController);
  await adminHomePage.isDisplayed(testController);
});

/**
 * These tests test form validation.
 */

// Input student data to be tested for display
test('Test signup student forms work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpStudent(testController);
  await signupStudentEmail.signupStudent(testController, newStudent1, credentials.password);
  await signupStudent.inputPersonalInfo(testController, personalData.firstName, personalData.lastName, personalData.address, personalData.url, personalData.phoneNum, personalData.about);
  await signupStudent.clickProjectsTab(testController);
  await signupStudent.inputProject(testController, projectData.projectName, projectData.projectDescription);
  await signupStudent.clickSweetAlert(testController);
  await signupStudent.clickExperiencesTab(testController);
  await signupStudent.inputExperience(testController, experienceData.companyName, experienceData.jobDescription, experienceData.role, experienceData.title);
  await signupStudent.clickSweetAlert(testController);
  await signupStudent.clickEducationTab(testController);
  await signupStudent.inputEducation(testController, educationData.nameOfSchool, educationData.fieldOfStudy);
  await signupStudent.clickSweetAlert(testController);
  await signupStudent.clickInterests(testController);
  await signupStudent.inputInterests(testController);
  await signupStudent.clickSweetAlert(testController);
  await signupStudent.submitSignUp(testController);
});

// Test if above input displays.
test('Test signup student forms display on profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, newStudent1, credentials.password);
  await navBar.isLoggedIn(testController, newStudent1);
  await navBar.gotoStudentProfile(testController);
  await studentProfilePage.isDisplayed(testController);
  await studentProfilePage.hasInputData(testController);
});

test.only('Test signup company forms work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.gotoSignUpCompany(testController);
  await signupCompanyEmail.signupUser(testController, newCompany1, credentials.password);
  await companySignup.inputCompanyData(testController, companyData.companyName, companyData.website, companyData.address, companyData.state, companyData.phoneNum, companyData.established);
  await companySignup.inputInterestsCompany(testController);
  await signupStudent.clickSweetAlert(testController);
  await companySignup.submitCompanyInput(testController);
});
