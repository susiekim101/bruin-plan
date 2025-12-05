import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

// SCENARIO 1: Clicking on the right arrow icon prompts a transition to the next year
//  Given I am a user with an account who navigates to the landing page
Given('I am a user with an account who navigates to the landing page', async function () {
    await page.goto(process.env.BASE_URL);
});

// Then I should be able to log in with my credientials when I click the "My Dashboard" button
Then('I should be able to log in with my credentials when I click the "My Dashboard" button', async function () {
    await page.click('text="My Dashboard"');
    await page.fill('input[name="email"]', "testuser@ucla.edu");
    await page.fill('input[name="password"]',"Password123!");
    await page.click('button[type="submit"]');
});

Then('I should be directed to the dashboard page', async function () {
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});
       
// Then the screen should change when I click on the right arrow icon
Then('the screen should change when I click on the right arrow icon', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    await page.locator('#right-navigation').click();
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before === during) {
        throw new Error('Transition did not occur');
    }
});
    
// Then the year number should increment
Then('the year number should increment', async function () {
    expect(await page.locator('text="Year 2"').isVisible()).toBeTruthy();
});

// And the left arrow icon should be visible
Then('the left arrow icon should be visible', async function () {
    expect(await page.locator('#left-navigation').isVisible()).toBeTruthy();
});

// SCENARIO 2: Disabled right arrow at Year 4
// Given I return to the dashboard page
Given('I return to the dashboard page', async function () {
    await page.goto(process.env.BASE_URL);
    await page.click('text="My Dashboard"');
    await page.fill('input[name="email"]', "testuser@ucla.edu");
    await page.fill('input[name="password"]',"Password123!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

// Then the fourth click on the right arrow shouldn't change the screen
Then('the fourth click on the right arrow shouldn\'t change the screen', async function () {
    await page.locator('#right-navigation').click();
    await page.locator('#right-navigation').click();
    await page.locator('#right-navigation').click();

    const container = page.locator("#plan-container");

    await page.waitForTimeout(500);
    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#right-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1400);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }
});
       
// And the year number should increment to 4
Then('the year number should increment to 4', async function () {
    expect(await page.locator('text="Year 4"').isVisible()).toBeTruthy();
});
       
// And the right arrow icon should not be visible
Then('the right arrow icon should not be visible', async function () {
    expect(await page.locator('#right-navigation').isVisible()).toBeFalsy();
});

// SCENARIO 3: Disabled left arrow at Year 1
// Given I return to the dashboard page

// Then the left arrow icon should not be visible
Then('the left arrow icon should not be visible', async function () {
    expect(await page.locator('#left-navigation').isVisible()).toBeFalsy();
});
       
// And the screen should remain the same
Then('the screen should remain the same when I click where the icon would be', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#left-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }
});
       
// And the year number should remain the same
Then('the year number should remain the same', async function () {
    expect(await page.locator('text="Year 1"').isVisible()).toBeTruthy();
});

// SCENARIO 4: Clicking above and below the arrows doesn't prompt transition
// Given I return to the dashboard page

// Then the screen and year number don't change when I click above the right arrow icon
Then('the screen and year number don\'t change when I click above the right arrow icon', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#right-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y - 10);
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }

    expect(await page.locator('text="Year 1"').isVisible()).toBeTruthy();
});
       
// Then the screen and year number don't change when I click below the right arrow icon
Then('the screen and year number don\'t change when I click below the right arrow icon', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#right-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height + 10);
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }

    expect(await page.locator('text="Year 1"').isVisible()).toBeTruthy();
});
       
// Then the screen and year number don't change when I click above the left arrow icon
Then('the screen and year number don\'t change when I click above the left arrow icon', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#left-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y - 10);
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }

    expect(await page.locator('text="Year 1"').isVisible()).toBeTruthy();
});
       
// Then the screen and year number don't change when I click below the left arrow icon
Then('the screen and year number don\'t change when I click below the left arrow icon', async function () {
    const container = page.locator("#plan-container");

    const before = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    const box = await page.locator('#left-navigation').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height + 10);
    await page.waitForTimeout(200);

    const during = await container.evaluate(
        el => getComputedStyle(el).transform
    );

    if (before !== during) {
        throw new Error('Transition occurred');
    }

    expect(await page.locator('text="Year 1"').isVisible()).toBeTruthy();
});
    
After(async function () {
    await browser.close();
})