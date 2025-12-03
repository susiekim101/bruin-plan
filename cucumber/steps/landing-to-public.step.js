import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({ tags: "@landingToPublic"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

Given('I am on the landing page as a new user', async function () {
    await page.goto(process.env.BASE_URL)
});


When('I click on the Public page button', async function () {
  await page.getByText('Public Plans', { exact: true }).click();
});

Then('I should be led to the Public page', async function () {
  await expect(page).toHaveURL(`${process.env.BASE_URL}/public`);
});
                
Then('the title Browse Plans should be visible', async function () {
  const browsePlansText = page.getByText('Browse Plans', { exact: true });
  await expect(browsePlansText).toBeVisible();
});

Given('I am on the public page', async function () {
  await page.goto(`${process.env.BASE_URL}/public`)
});
       
When('I click on the dropdown button that says major', async function () {
  await page.locator('select[name="filter-major"]').click();

});

Then('I should be able to select a specific Major from the list', async function () {
  await page.selectOption('#filter-major', 'Computer Science');
  await expect(page.locator('#filter-major')).toHaveValue('Computer Science');
});

After({ tags: "@landingToPublic"}, async function () {
    await browser.close();
})