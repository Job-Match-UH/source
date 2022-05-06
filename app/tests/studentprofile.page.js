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

  async gotoEditStudent(testController) {
    await testController.click('#goto-edit-student');
  }
}

export const studentProfilePage = new StudentProfilePage();
