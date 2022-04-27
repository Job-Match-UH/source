import { Selector } from 'testcafe';

const experienceInput = { title: 'Manager', name: 'Fedex', role: 'manager' };

class AddExperiencePage {
  constructor() {
    this.pageId = '#add-experience-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills in project form. */
  async inputExperience(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#experience-title', experienceInput.title);
    await testController.typeText('#experience-name', experienceInput.name);
    await testController.typeText('#experience-role', experienceInput.role);
  }

}

export const addExperiencePage = new AddExperiencePage();
