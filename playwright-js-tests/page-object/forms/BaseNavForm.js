const { page } = require('@playwright/test');

exports.BaseNavForm = class BaseNavForm {
    constructor(page) {
        this.page = page;
        this.createNewButton = '[data-testid="action-new"]';
    }

    async clickCreateNew() {
        await this.page.click(this.createNewButton);
    }

}
