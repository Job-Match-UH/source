import { Selector } from 'testcafe';

const experienceInput = { school: 'Manoa', fieldofStudy: 'CS' };

class AddEducationPage {
  constructor() {
    this.pageId = '#add-education-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills in project form. */
  async inputEducation(testController) {
    await testController.typeText('#education-title', experienceInput.school);
    await testController.typeText('#education-name', experienceInput.fieldofStudy);
  }

}

export const addEducationPage = new AddEducationPage();
