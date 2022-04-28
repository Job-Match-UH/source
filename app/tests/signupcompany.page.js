import { Selector } from 'testcafe';

const companyData = { companyName: 'fedex', website: 'fedex.com', address: 'fedex@fedex', state: 'HI', phoneNum: '1234567', established: '1922' };

class CompanySignupPage {
  constructor() {
    this.pageId = '#company-signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async inputCompanyData(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#company-name', companyData.companyName);
    await testController.typeText('#company-website', companyData.website);
    await testController.typeText('#company-address', companyData.address);
    await testController.typeText('#company-state', companyData.state);
    await testController.typeText('#company-phone-num', companyData.phoneNum);
    await testController.typeText('#year-established', companyData.established);
    await testController.click('#submit-company');
  }
}

export const companySignup = new CompanySignupPage();
