const { expect } = require('@playwright/test');
const { DropdownHandler } = require('../forms/DropdownHandler');
const { DeleteForm } = require('../forms/DeleteForm');
const { BaseNavForm } = require('../forms/BaseNavForm');


exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
        this.deleteForm = new DeleteForm(this.page);
        this.baseNavForm = new BaseNavForm(this.page);
        this.dropdownHandler = new DropdownHandler(this.page,
            '[data-css="sidebar-resources"] a',
            "//section[@data-css=\"sidebar-resources\"]//ul[./li[./a[@href]]]",
            (option) => `//li//div[text()='${option}']`);
        this.popUp = (text) => `//div[contains(@class, "adminjs_Text")][contains(text(), "${text}")]`
    }

    async openItem(option){
        await this.dropdownHandler.selectOptionByText(option);
    }

    async isPopupPresent(text){
        const rowSelector = this.popUp(text);
        await this.page.waitForSelector(rowSelector);
        return await this.page.isVisible(rowSelector);
    }

}

