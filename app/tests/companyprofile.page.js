import { Selector } from 'testcafe';

class CompanyProfilePage {
  constructor() {
    this.pageId = '#company-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditCompany(testController) {
    await testController.click('#goto-edit-company');
  }
}
export const companyProfilePage = new CompanyProfilePage();
