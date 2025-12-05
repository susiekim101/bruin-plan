import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@searchBar" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});


Given('I log in', async function () {
    await page.goto(process.env.BASE_URL);
    await page.locator('button[id="my-dashboard"]').click();
    await page.fill('input[name="email"]', 'testuser@ucla.edu');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
});

Given('I land on the dashboard page', async function () {
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

When('I don\'t enter a course code into the search bar', async function () {
    await expect(page.locator('#search-bar')).toHaveValue("");
});

Then('I should see the courses for my major', async function () {
    const cardsLocator = page.locator('#sidebar #course-card-root');
    
    // make sure first card loads
    await cardsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    const allCardsLocator = await cardsLocator.all();
    expect(allCardsLocator.length).toBeGreaterThan(0);
});

When('I enter COM SCI', async function () {
    await page.locator('#search-bar').fill("COM SCI");
});

Then('I should see all courses with COM SCI in their course code', async function () {
    const cardsLocator = page.locator('#sidebar #course-card-root');
    
    // make sure first card loads
    await cardsLocator.first().waitFor({ state: 'visible', timeout: 5000 });

    const allCardsLocator = await cardsLocator.all();
    expect(allCardsLocator.length).toBeGreaterThan(0);
    
    for (const cardLocator of allCardsLocator) {
        const courseCodeLocator = cardLocator.getByTestId('course-code');
        const courseCode = await courseCodeLocator.textContent();

        expect(courseCode.trim().includes("COM SCI"));
    }
});

When('I enter TEST CODE', async function () {
    await page.locator('#search-bar').fill("TEST CODE");
});

Then('I should see no course cards displayed', async function () {
    const cardsLocator = await page.locator('#sidebar #course-card-root');
    await expect(cardsLocator).toHaveCount(0);
});

After({ tags: "@searchBar"}, async function () {
    await browser.close();
});