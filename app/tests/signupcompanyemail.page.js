import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignUpCompanyEmailPage {
  constructor() {
    this.pageId = '#signup-company-page';
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
  async signupUser(testController, newCompany, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', newCompany);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, newCompany);
  }
}

export const signupCompanyEmail = new SignUpCompanyEmailPage();
