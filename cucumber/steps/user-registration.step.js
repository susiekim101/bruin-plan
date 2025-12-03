import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@userRegistration"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I am on the landing page', async function () {
    await page.goto(process.env.BASE_URL)
});
            
When('I click on the My Dashboard button', async function () {
    await page.locator('button[id="my-dashboard"]').click();
});
       
Then('I should see the Log In dialog', async function () {
    const registrationTitle = page.locator('legend[id="registration-title"]')
    await expect(registrationTitle).toHaveText('Log In', { visible: true });
});

Then('the Email input field should be visible', async function () {
    expect(await page.locator('input[name="email"]').isVisible()).toBeTruthy();
});
       
Then('the Password input field should be visible', async function () {
    expect(await page.locator('input[name="password"]').isVisible()).toBeTruthy();
});

Given('I am a returning user on the landing page', async function () {
    await page.goto(process.env.BASE_URL);
});
       
When('I click on the My Dashboard button as a new user', async function () {
    await page.locator('button[id="my-dashboard"]').click();
});
       
Then('I should see the Don\'t have an account? button', async function () {
    expect(await page.locator('text="Don\'t have an account?"').isVisible()).toBeTruthy();
});

Then('the Sign up text should be visible', async function () {
    expect(await page.locator('text="Sign up"').isVisible()).toBeTruthy();
});

Then('when I click the Sign up text, the input fields change.', async function () {
    await page.locator('text="Sign up"').click();
    expect(await page.locator('text=["Sign up"]').isVisible()).toBeFalsy();
    expect(await page.locator('select[id="major-input"]').isVisible()).toBeTruthy();
});

After({ tags: "@userRegistration"}, async function () {
    await browser.close();
})