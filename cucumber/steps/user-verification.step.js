import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
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

After({ tags: "@userVerification"}, async function () {
    await browser.close();
})