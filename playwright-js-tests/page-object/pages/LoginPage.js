const { expect } = require('@playwright/test');
const {BasePage} = require("./BasePage");

exports.LoginPage = class LoginPage extends BasePage {

  constructor(page) {
    super(page);
    this.page = page;
    this.emailTextField = page.locator(`input[name = 'email']`);
    this.passwordTextField = page.locator(`input[name = 'password']`);
    this.loginBtn = page.locator(`.adminjs_Button`);
  }

  async logIn(user) {
    await this.emailTextField.fill(user.email);
    await this.passwordTextField.fill(user.password);
    await this.loginBtn.click();
  }


}
