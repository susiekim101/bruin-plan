import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@userPassword"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I am a user who is creating a new account', async function () {
    await page.goto(process.env.BASE_URL);
    await page.locator('button[id="my-dashboard"]').click();
    await page.locator('text="Sign up"').click();
});

When('I enter a weak password, such as Password123', async function () {
    await page.fill('input[name="first_name"]', "Test");
    await page.fill('input[name="last_name"]',"User");
    await page.fill('input[name="email"]',"testuser@gmail.com");
    await page.fill('input[name="password"]',"Password123");
    await page.keyboard.press('Enter');
});

Then('there should be an error message', async function () {
    const errorMessage = page.locator('text="Must be more than 8 characters, including"');
    await expect(errorMessage).toBeVisible();
});

When('I enter a weak password, such as Password123!!!', async function () {
    await page.fill('input[name="first_name"]', "Test");
    await page.fill('input[name="last_name"]',"User");
    await page.fill('input[name="email"]',"testuser@gmail.com");
    await page.fill('input[name="password"]',"Password123!!!");
    await page.keyboard.press('Enter');
});

       
Then('there should be no error message', async function () {
    expect(await page.locator('text="Must be more than 8 characters, including"').isVisible()).toBeFalsy(); 
});

After({ tags: "@userPassword"}, async function () {
    await browser.close();
})