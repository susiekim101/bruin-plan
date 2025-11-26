import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@planCard"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('a user is on the public page', async function () {
    await page.goto(`${process.env.BASE_URL}/public`);
});

When('they have Select a major selected,', async function () {
    await page.locator('select[name="filter-major"]').click();
    await page.selectOption('#filter-major', 'Select a major');
});
         
Then('they should see all the course cards', async function () {
    expect(await page.locator('PlanCard[text="Computer Science"]'))
    expect(await page.locator('PlanCard[text="Computer Science and Engineering"]'))

});

When('they have {string} selected', async function (major) {
    await page.locator('select[name="filter-major"]').click();
    await page.selectOption('#filter-major', `${major}`);
});

Then('they should only course cards for {string}', async function (major) {
    expect(await page.locator(`PlanCard[text=${major}]`));
    expect(await page.locator(`PlanCard[text="${major == "Computer Science" ? "Bioengineering": "Computer Science"}"]`));
});

After({ tags: "@planCard"}, async function () {
    await browser.close();
})