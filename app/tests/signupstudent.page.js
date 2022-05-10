import { Selector } from 'testcafe';

class SignUpStudentPage {
  constructor() {
    this.pageId = '#sign-up-student-page';
    this.pageSelector = Selector(this.pageId);
    this.selectProjects = Selector('#goto-projects-tab .item').withText('Projects');
    this.selectExperiences = Selector('#goto-projects-tab .item').withText('Experience');
    this.selectEducation = Selector('#goto-projects-tab .item').withText('Education');
    this.selectPersonalInfo = Selector('#goto-projects-tab .item').withText('Personal Info');
    this.selectInterestsTab = Selector('#goto-projects-tab .item').withText('Interests');
    this.multifieldSelector = Selector('#multifield-select');
    this.clickSwtAlert = Selector('button').withText('OK');
    this.selectInterests = Selector('#multifield-select div').child('span').withText('Computer');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar, then fills out personal info form. */
  async inputPersonalInfo(testController, firstName, lastName, address, url, phoneNum, about) {
    await testController.typeText('#personal-info-first-name', firstName);
    await testController.typeText('#personal-info-last-name', lastName);
    await testController.typeText('#personal-info-address', address);
    await testController.typeText('#personal-info-image', url);
    await testController.typeText('#personal-info-phone-num', phoneNum);
    await testController.typeText('#personal-info-about', about);
  }

  async inputProject(testController, projectName, projectDescriton) {
    await testController.typeText('#projects-name', projectName);
    await testController.typeText('#projects-description', projectDescriton);
    await testController.click('#submit-new-project');
  }

  async inputExperience(testController, companyName, jobDescription, role, title) {
    await testController.typeText('#experience-company-name', companyName);
    await testController.typeText('#experience-job-description', jobDescription);
    await testController.typeText('#experience-role', role);
    await testController.typeText('#experience-title', title);
    await testController.click('#submit-new-experience');
  }

  async inputEducation(testController, school, fieldOfStudy) {
    await testController.typeText('#education-school-name', school);
    await testController.typeText('#education-fied-of-study', fieldOfStudy);
    await testController.click('#submit-new-education');
  }

  async inputInterests(testController) {
    await testController.click(this.multifieldSelector).click(this.selectInterests).click(this.multifieldSelector).click('#add-new-student-interest');
  }

  async clickSweetAlert(testController) {
    await testController.click(this.clickSwtAlert);
  }

  async clickExperiencesTab(testController) {
    await testController.click(this.selectExperiences);
  }

  async clickProjectsTab(testController) {
    await testController.click(this.selectProjects);
  }

  async clickEducationTab(testController) {
    await testController.click(this.selectEducation);
  }

  async clickPersonalInfo(testController) {
    await testController.click(this.selectPersonalInfo);
  }

  async clickInterests(testController) {
    await testController.click(this.selectInterestsTab);
  }

  async submitSignUp(testController) {
    await testController.click('#finish-sign-up');
  }
}

export const signupStudent = new SignUpStudentPage();
