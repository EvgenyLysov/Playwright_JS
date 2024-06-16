const { expect } = require('@playwright/test');
const {BasePage} = require("./BasePage");

exports.PublisherPage = class PublisherPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.createNewButton = '[data-testid="action-new"]';
        this.nameInput = 'input#name';
        this.emailInput = 'input#email';
        this.saveButton = '[data-testid="button-save"]';
        this.deleteBtn = '[data-testid="action-bulkDelete"]';
        this.rowSelector = (publisher) => `//tr[.//section[text()="${publisher.name}"]][.//section[text()="${publisher.email}"]]`
        this.publisherSelector = (publisher) => `//tr[.//section[text()="${publisher.name}"]][.//section[text()="${publisher.email}"]]//span[contains(@class, "adminjs_Checkbox")]`;
    }

    async createPublisher(publisher) {
        await this.page.fill(this.nameInput, publisher.name);
        await this.page.fill(this.emailInput, publisher.email);
        await this.page.click(this.saveButton);
    }

    async removePublisher(publisher) {
        const publisherSelector = this.publisherSelector(publisher);
        await this.page.click(publisherSelector);
        await this.page.click(this.deleteBtn)
    }

    async isPublisherInTable(publisher) {
        const rowSelector = this.rowSelector(publisher);
        await this.page.waitForSelector(rowSelector);
        return await this.page.isVisible(rowSelector);
    }
}
