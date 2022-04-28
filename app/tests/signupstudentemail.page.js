import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignUpStudentEmailPage {
  constructor() {
    this.pageId = '#signup-student-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Returns to sign in page. */
  async returnToSignin(testController) {
    await testController.click('#view-signin-page');
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupStudent(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupStudentEmail = new SignUpStudentEmailPage();
