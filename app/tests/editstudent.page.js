import { Selector } from 'testcafe';

class EditStudentPage {
  constructor() {
    this.pageId = '#edit-student-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const editStudentPage = new EditStudentPage();
