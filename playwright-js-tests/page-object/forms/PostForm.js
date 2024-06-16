const { expect } = require('@playwright/test');

//todo
exports.PostForm = class PostForm {

  constructor(page) {
    this.page = page;
    this.titleTextField = page.locator('#title');
    this.contentTextField = page.locator('#content');
    this.statusDropDown = page.locator('[data-testid="property-edit-status"] [id="react-select-11-placeholder"]');
    this.publisherDropdown = page.locator('#react-select-12-input');
    this.publishedCheckBox = page.locator('[data-testid="property-edit-published"] input');
    this.addNewItemBtn = page.locator('[data-testid="someJson-add"]');
    this.saveBtn = page.locator('[data-testid="button-save"]');


  }

  async logIn(user) {
    await this.emailTextField.fill(user.email);
    await this.passwordTextField.fill(user.password);
    await this.loginBtn.click();
  }
}
