const { page } = require('@playwright/test');

exports.DeleteForm = class DeleteForm {

    constructor(page) {
        this.page = page;
        this.deteteBtn = '#drawerPortal button';
    }

    async confirmDelete() {
        await this.page.click(this.deteteBtn);
    }
}