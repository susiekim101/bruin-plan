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


Then('the Sidebar should be visible', async function () {
    await expect(page.locator('#sidebar')).toBeVisible();
});

Then('my major should be visible', async function () {
    await expect(page.locator('#major-display')).toBeVisible();
});

Then('the Select-a-major component should be visible', async function () {
    await expect(page.getByRole("combobox", { name: "Select a major" })).toBeVisible();
});

Then('the search bar should be visible', async function () {
    await expect(page.locator('input[id="search-bar"]')).toBeVisible();
});

Then('the list of course cards should be visible.', async function () {
    await expect(page.locator('#course-list')).toBeVisible();

    const cardsLocator = page.locator('#sidebar #course-card-root');
        
    // make sure first card loads
    await cardsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    const allCardsLocator = await cardsLocator.all();
    expect(allCardsLocator.length).toBeGreaterThan(0);
});

After({ tags: "@sidebar"}, async function () {
    await browser.close();
});