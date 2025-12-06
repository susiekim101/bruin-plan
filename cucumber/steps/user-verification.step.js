import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@userVerification"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I am a user with an account on the landing page', async function () {
    await page.goto(process.env.BASE_URL);
});

When('I click on the My Dashboard button as a returning user', async function () {
    await page.locator('button[id="my-dashboard"]').click();
});

Then('I should be able to enter my email', async function () {
    await page.locator('input[name="email"]').fill('susiekim101@ucla.edu');
});

Then('I should be able to enter my password', async function () {
    await page.locator('input[name="password"]').fill('Hello6!!');
});

Given('I am a user who is creating a new account', async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.locator('button[id="my-dashboard"]').click();
    await page.locator('text="Sign up"').click();
});

When('I enter a weak password, such as Password123', async function (string) {
    await page.fill('input[name="first-name"]', "Test");
    await page.fill('input[name="last-name"]',"User");
    await page.fill('input[name="email"]',"testuser@gmail.com");
    await page.fill('input[name="password"]',"Password123");
    await page.selectOption('#major-input', 'Computer Science');
});

Then('I should not be able to create an account', async function () {
    const registrationButton = await page.locator('#registration-title').click();
    expect (registrationButton).toBeDisabled();

});

Then('there should be an error message', async function () {
    expect(await page.locator('text=["At least one special character from ?!*._"]').isVisible()).toBeFalsy();
});

After({ tags: "@userVerification"}, async function () {
    await browser.close();
})