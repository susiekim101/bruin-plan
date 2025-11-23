import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I am on the dashboard page,', async function () {
    await page.goto(`${process.env.BASE_URL}dashboard`);
});

When('I don\'t enter anything in the search bar,', async function () {
    await expect(page.locator('input[id="search-bar"]')).toHaveValue('');
});

Then('I should see all course cards for my major displayed on the sidebar.', async function () {
    // Write code here that turns the phrase above into concrete actions
    await expect(page.getByTestId('course-card-root')).toHaveCount(37);
});
