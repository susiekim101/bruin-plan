import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@sidebar" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I log in as a returning user', async function () {
    await page.goto(process.env.BASE_URL);
    await page.locator('button[id="my-dashboard"]').click();
    await page.fill('input[name="email"]', 'testuser@ucla.edu');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
});

When('I am on the dashboard,', async function () {
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

After({ tags: "@sidebar"}, async function () {
    await browser.close();
});