import { Selector } from 'testcafe';

class JobPostingsPage {
  constructor() {
    this.pageId = '#job-postings-page';
    this.pageSelector = Selector(this.pageId);
    this.jobType = Selector('#job-type option').withText('Full-time');
    this.payType = Selector('#pay-type option').withText('hourly');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async inputJobPosting(testController, title, id, pay, location, description, qualifications) {
    await testController.typeText('#job-title', title);
    await testController.typeText('#job-id', id);
    await testController.click('#job-type').click(this.jobType);
    await testController.typeText('#job-pay', pay);
    await testController.click('#pay-type').click(this.payType);
    await testController.typeText('#job-location', location);
    await testController.typeText('#job-description', description);
    await testController.typeText('#job-qualifications', qualifications);
  }

  async submitJobPosting(testController) {
    await testController.click('#jsubmit-job-posting');
  }
}
export const jobPostingsPage = new JobPostingsPage();
