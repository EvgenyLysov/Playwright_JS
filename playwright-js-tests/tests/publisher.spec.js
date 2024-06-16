const {test, expect} = require('@playwright/test');
const {LoginPage} = require("../page-object/pages/LoginPage");
const {PublisherPage} = require("../page-object/pages/PublisherPage");
const {query} = require("../utils/data-base");
const {Data} = require("../config/config");
const SQL_QUERIES = require("../queries/queries");
const NavigationItems = require("../page-object/constants/navigation");



let loginPage;
let publisherPage;
const data = new Data();


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    publisherPage = new PublisherPage(page);
    await page.goto(data.baseUrl);
    await loginPage.logIn(data.testUser)
    await publisherPage.openItem(NavigationItems.PUBLISHER);
});

test.afterEach(async () => {
    await query(SQL_QUERIES.DELETE_PUBLISHER);
});

test('Create Publisher', async ({page}) => {
    await publisherPage.baseNavForm.clickCreateNew();
    await publisherPage.createPublisher(data.testPublisher);
    await expect(await publisherPage.isPublisherInTable(data.testPublisher)).toBeTruthy();
    await expect(await publisherPage.isPopupPresent("Successfully created a new record")).toBeTruthy();
});

test('Delete Publisher', async ({page}) => {
    await query(SQL_QUERIES.CREATE_PUBLISHERS(data.testPublisher));
    await page.reload();
    await publisherPage.removePublisher(data.testPublisher);
    await publisherPage.deleteForm.confirmDelete();
    await expect(await publisherPage.isPopupPresent("Successfully removed 1 record")).toBeTruthy();
});