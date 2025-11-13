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
    await page.locator('button[id="my-dashboard"]').click();
});
       
// Then I should see the Create Account dialog
Then('I should see the Create Account dialog', async function () {
    expect(await page.locator('legend[id="registration-title"]').isVisible()).toBeTruthy();
});

Then('the First Name input field should be visible', async function () {
    expect(await page.locator('input[id="first-name"]').isVisible()).toBeTruthy();
});
      
Then('the Last Name input field should be visible', async function () {
    expect(await page.locator('input[id="last-name"]').isVisible()).toBeTruthy();
// Write code here that turns the phrase above into concrete actions
});
       
// And the Email input field should be visible
Then('the Email input field should be visible', async function () {
    expect(await page.locator('input[type="email"]').isVisible()).toBeTruthy();
});
       
// And the Password input field should be visible
Then('the Password input field should be visible', async function () {
    expect(await page.locator('input[type="password"]').isVisible()).toBeTruthy();
});
       
Then('the Major input field should be visible', async function () {
    expect(await page.locator('select[id="major-input"]').isVisible()).toBeTruthy();
});

Given('I am a returning user on the landing page', async function () {
    await page.goto(process.env.BASE_URL);
});
       
When('I click on the My Dashboard button as a returning user', async function () {
    await page.locator('button[id="my-dashboard"]').click();
});
       
Then('I should see the Already have an account?', async function () {
    expect(await page.locator('text="Already have an account?"').isVisible()).toBeTruthy();
});

Then('the Log in text should be visible', async function () {
    expect(await page.locator('text="Log in"').isVisible()).toBeTruthy();
});

Then('when I click the Log in text, the input fields change', async function () {
    await page.locator('text="Log in"').click();
    expect(await page.locator('text=["Create Account"]').isVisible()).toBeFalsy();
    expect(await page.locator('select[id="major-input"]').isVisible()).toBeFalsy();
});

After(async function () {
    await browser.close();
})
