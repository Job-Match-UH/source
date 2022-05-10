import { Selector } from 'testcafe';

class ViewCompanyMatchesPage {
  constructor() {
    this.pageId = '#view-company-matches-page';
    this.multifieldSelector = Selector('#multifield-select');
    this.option1 = Selector('#multifield-select div').child('span').withText('Food Service');
    this.card1 = Selector('#company-card-matches div').withText('Pear Inc');
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Select data from a field of data. */
  async selectMultifieldData(testController) {
    await testController.click(this.multifieldSelector).click(this.option1).click(this.multifieldSelector).click('#submit-interest-filter');
  }

  async gotoViewCompanyProfile(testController) {
    await testController.click(this.card1);
  }

}

export const viewCompanyMatchesPage = new ViewCompanyMatchesPage();
