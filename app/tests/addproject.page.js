import { Selector } from 'testcafe';

class AddProjectPage {
  constructor() {
    this.pageId = '#add-project-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills in project form. */
  async inputProject(testController, name, description) {
    await this.isDisplayed(testController);
    await testController.typeText('#projects-name', name);
    await testController.typeText('#projects-description', description);
  }

}

export const addProjectPage = new AddProjectPage();
