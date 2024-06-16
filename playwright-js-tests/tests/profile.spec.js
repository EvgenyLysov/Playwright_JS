const {test, expect} = require('@playwright/test');
const {LoginPage} = require("../page-object/pages/LoginPage");
const {query} = require("../utils/data-base");
const {Data} = require("../config/config");
const {ProfilePage} = require("../page-object/pages/ProfilePage");
const SQL_QUERIES = require("../queries/queries");
const NavigationItems = require("../page-object/constants/navigation");



let loginPage;
let profilePage;
let publisherID;
const data = new Data();

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    await query(SQL_QUERIES.CREATE_PUBLISHERS(data.testPublisher));
    publisherID = await query(SQL_QUERIES.GET_PUBLISHER_ID(data.testPublisher));
    await page.goto(data.baseUrl);
    await loginPage.logIn(data.testUser)
    await profilePage.openItem(NavigationItems.PROFILE);
});

test.afterEach(async () => {
    await query(SQL_QUERIES.DELETE_PROFILE);
    await query(SQL_QUERIES.DELETE_PUBLISHER);
});

test('Create Profile', async ({page}) => {
    await profilePage.baseNavForm.clickCreateNew();
    await profilePage.createProfile(data.testProfile);
    await expect(await profilePage.isProfileInTable(data.testProfile)).toBeTruthy();
    await expect(await profilePage.isPopupPresent("Successfully created a new record")).toBeTruthy();

});

test('Delete Profile', async ({page}) => {
    await query(SQL_QUERIES.CREATE_PROFILE(data.testProfile, publisherID[0].id));
    await page.reload();
    await profilePage.removeProfile(data.testProfile);
    await profilePage.deleteForm.confirmDelete();
    await expect(await profilePage.isPopupPresent("Successfully removed 1 record")).toBeTruthy();
});