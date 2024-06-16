exports.DropdownHandler = class DropdownHandler {
    constructor(page, triggerLocator, dropdownLocator, optionLocator) {
        this.page = page;
        this.triggerLocator = triggerLocator;
        this.dropdownLocator = dropdownLocator;
        this.optionLocator = optionLocator;
    }

    async openDropdown() {
        await this.page.click(this.triggerLocator);
        await this.page.waitForSelector(this.dropdownLocator, { state: 'visible' });
    }

    async selectOptionByText(text) {
        await this.openDropdown();
        await this.page.click(this.optionLocator(text));

    }
}

