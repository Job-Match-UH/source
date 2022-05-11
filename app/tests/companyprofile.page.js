import { Selector } from 'testcafe';

class CompanyProfilePage {
  constructor() {
    this.pageId = '#company-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasInputData(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  }

  async gotoEditCompany(testController) {
    await testController.click('#goto-edit-company');
  }
}
export const companyProfilePage = new CompanyProfilePage();
