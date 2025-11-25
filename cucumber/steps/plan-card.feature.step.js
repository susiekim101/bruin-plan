import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@planCard"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('a user is on the public page', async function () {
    await page.goto(`${process.env.BASE_URL}/public`);
});

When('they have Select a major selected,', async function () {
    await page.locator('select[name="filter-major"]').click();
    await page.selectOption('#filter-major', 'Select a major');
});
         
Then('they should see all the course cards', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       Then('all the Plan cards will have their major', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
       
         Then('all the plan cards will have an icon representing its major', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });


After({ tags: "@planCard"}, async function () {
    await browser.close();
})