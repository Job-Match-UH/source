import { Selector } from 'testcafe';

class CompanySignupPage {
  constructor() {
    this.pageId = '#company-signup-page';
    this.pageSelector = Selector(this.pageId);
    this.multifieldSelector = Selector('#multifield-select');
    this.selectInterests = Selector('#multifield-select div').child('span').withText('Computer');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async inputCompanyData(testController, companyName, website, url, address, state, phoneNum, established) {
    await this.isDisplayed(testController);
    await testController.typeText('#company-name', companyName);
    await testController.typeText('#company-website', website);
    await testController.typeText('#company-url', url);
    await testController.typeText('#company-address', address);
    await testController.typeText('#company-state', state);
    await testController.typeText('#company-phone-num', phoneNum);
    await testController.typeText('#year-established', established);
  }

  async inputInterestsCompany(testController) {
    await testController.click(this.multifieldSelector).click(this.selectInterests).click(this.multifieldSelector).click('#add-new-interest');
  }

  async submitCompanyInput(testController) {
    await testController.click('#submit-company');
  }
}

export const companySignup = new CompanySignupPage();
