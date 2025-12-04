import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@filter" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I log in as a returning user with a Computer Science major', async function () {
    await page.goto(process.env.BASE_URL);
    await page.locator('button[id="my-dashboard"]').click();
    await page.fill('input[name="email"]', 'testuser@ucla.edu');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#major-display')).toContainText('Computer Science');
});


Given('I am on the dashboard', async function () {
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

When('I click on the Filter component', async function () {
    await page.getByRole("combobox", { name: "Select a major" }).click();
});

Then('I should only see the Computer Engineering and Computer Science and Engineering options', async function () {
    const options = page.getByRole("option");

    const observedOptions = await options.allTextContents();

    const expectedOptions = [
        "Computer Engineering",
        "Computer Science and Engineering",
    ];

    await expect(observedOptions).toEqual(expectedOptions);
});

When('I do not select an option in the Filter component', async function () {
    await expect(page.getByRole("combobox", { name: "Select a major" })).toHaveValue("");
});

Then('I should see course cards for the Computer Science major', async function () {
    const cardsLocator = page.locator('#sidebar #course-card-root');

    // make sure first card loads
    await cardsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    const allCardsLocator = await cardsLocator.all();
    expect(allCardsLocator.length).toBeGreaterThan(0);
});

When('I select the Computer Engineering option', async function () {
    await page.getByRole("combobox", { name: "Select a major" }).click();
    await page.getByRole("option", { name: "Computer Engineering"}).click();
});

Then('I should see course cards for the Computer Engineering major', async function () {
    const cardsLocator = page.locator('#sidebar #course-card-root');

    // make sure first card loads
    await cardsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    const allCardsLocator = await cardsLocator.all();
    expect(allCardsLocator.length).toBeGreaterThan(0);
});

After({ tags: "@filter"}, async function () {
    await browser.close();
});
