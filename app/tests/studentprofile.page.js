import { Selector } from 'testcafe';

class StudentProfilePage {
  constructor() {
    this.pageId = '#student-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page displays the inputted card data from signupstudent.page.js */
  async hasInputData(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(3);
  }

  async gotoEditStudent(testController) {
    await testController.click('#goto-edit-student');
  }
}

export const studentProfilePage = new StudentProfilePage();
