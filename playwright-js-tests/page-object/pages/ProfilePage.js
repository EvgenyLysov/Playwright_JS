const { expect } = require('@playwright/test');
const {BasePage} = require("./BasePage");

exports.ProfilePage = class ProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.bioTextBox = '#bio';
        this.publisherTextBox = '[data-testid="property-edit-publisher"] input';
        this.saveButton = '[data-testid="button-save"]';
        this.deleteBtn = '[data-testid="action-bulkDelete"]';
        this.rowSelector = (profile) => `//tr[.//section[text()="${profile.bio}"]][.//a[text()="${profile.publisher.email}"]]`
        this.rawCheckbox = (profile) => `${this.rowSelector(profile)}//span[contains(@class, "adminjs_Checkbox")]`
    }
//span[contains(@class, "adminjs_Checkbox")]

    async createProfile(profile) {
        await this.page.fill(this.bioTextBox, profile.bio);
        await this.page.fill(this.publisherTextBox, profile.publisher.email);
        await this.page.press(this.publisherTextBox, "Enter");
        await this.page.click(this.saveButton);
    }

    async removeProfile(profile) {
        const publisherSelector = this.rawCheckbox(profile);
        await this.page.click(publisherSelector);
        await this.page.click(this.deleteBtn)
    }

    async isProfileInTable(profile) {
        const rowSelector = this.rowSelector(profile);
        await this.page.waitForSelector(rowSelector);
        return await this.page.isVisible(rowSelector);
    }
}
