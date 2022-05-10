import { Selector } from 'testcafe';

class ViewStudentMatchesPage {
  constructor() {
    this.pageId = '#view-student-matches-page';
    this.multifieldSelector = Selector('#multifield-select');
    this.option1 = Selector('#multifield-select div').child('span').withText('Graphical Arts');
    this.card1 = Selector('#student-card-matches div').withText('John');
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Select data from a field of data. */
  async selectMultifieldData(testController) {
    await testController.click(this.multifieldSelector).click(this.option1).click(this.multifieldSelector).click('#submit-interest-student-filter');
  }

  async gotoViewStudentProfile(testController) {
    await testController.click(this.card1);
  }

}

export const viewStudentMatchesPage = new ViewStudentMatchesPage();
