import { Selector } from 'testcafe';

class SignUpStudentPage {
  constructor() {
    this.pageId = '#sign-up-student-page';
    this.pageSelector = Selector(this.pageId);
    this.selectProjects = Selector('#goto-projects-tab .item').withText('Projects');
    this.selectExperiences = Selector('#goto-projects-tab .item').withText('Experience');
    this.selectEducation = Selector('#goto-projects-tab .item').withText('Education');
    this.selectPersonalInfo = Selector('#goto-projects-tab .item').withText('Personal Info');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar, then fills out personal info form. */
  async inputPersonalInfo(testController, firstName, lastName, address, phoneNum, about) {
    await this.isDisplayed(testController);
    await testController.typeText('#personal-info-first-name', firstName);
    await testController.typeText('#personal-info-last-name', lastName);
    await testController.typeText('#personal-info-address', address);
    await testController.typeText('#personal-info-phone-num', phoneNum);
    await testController.typeText('#personal-info-about', about);
    await testController.click(this.selectProjects);
  }

  async clickExperiencesTab(testController) {
    await testController.click(this.selectExperiences);
  }

  async gotoEducationTab(testController) {
    await testController.click(this.selectEducation);
  }

  async gotoPersonalInfo(testController) {
    await testController.click(this.selectPersonalInfo);
  }
}

export const signupStudent = new SignUpStudentPage();
