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

// Given I am on the landing page
Given('I am on the landing page', async function () {
    await page.goto(process.env.BASE_URL)
});
       
// When I click on the My Dashboard button
When('I click on the My Dashboard button', async function () {
    // Write code here that turns the phrase above into concrete actions
    await page.locator('text="My Dashboard"').click();
});
       
// Then I should see the Create Account dialog
Then('I should see the Create Account dialog', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       
// And the Email input field should be visible
Then('the Email input field should be visible', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       
// And the Password input field should be visible
Then('the Password input field should be visible', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       
// And the Major input field should be visible

Then('the Major input field should be visible', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


After(async function () {
    await browser.close();

})