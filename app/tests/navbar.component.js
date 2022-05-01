import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown-sign-in');
  }

  async gotoViewCompanyMatches(testController) {
    await testController.click('#view-company-matches');
    await testController.click('#view-company-profile');
  }

  async gotoStudentHome(testController) {
    await testController.click('#view-student-home');
  }

  async gotoStudentProfile(testController) {
    await testController.click('#view-student-profile');
  }

  async gotoAdminHome(testController) {
    await testController.click('#view-admin-home');
  }

  async gotoCompanyProfile(testController) {
    await testController.click('#view-company-profile');
  }

  async gotoCompanyHome(testController) {
    await testController.click('#view-company-home');
  }

  async gotoViewStudentMatches(testController) {
    await testController.click('#view-student-matches');
    await testController.click('#view-student-profile');
  }

  async gotoJobPostings(testController) {
    await testController.click('#job-postings');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }
}

export const navBar = new NavBar();
