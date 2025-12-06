import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@unitTracker"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

// SCENARIO 1: Unit tracker updates correctly when courses are added or removed
// Given I am on my dashboard page
Given('I am on my dashboard page', async function () {
    await page.goto(process.env.BASE_URL);
    await page.click('text="My Dashboard"');
    await page.fill('input[name="email"]', "testuser@ucla.edu");
    await page.fill('input[name="password"]',"Password123!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

// Then the plan's total units in the top left corner of the dashboard should be 30
Then('the plan\'s total units in the top left corner of the dashboard should be 30', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 30 / 30");
});

// And the units for the first quarter should be 0 
Then('the units for the first quarter should be 0', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 0");
});

// When I add a 4-unit course to the first quarter
When('I add a 4-unit course to the first quarter', async function () {
    await page.waitForLoadState('networkidle');
    const course = page.locator('text=COM SCI 31').first();
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 87,
                course_number: "COM SCI 31",
                course_name: "Introduction to Computer Science I",
                course_units: 4
            }),
            sourceYearIndex: null,
            sourceQuarterName: null
        };

        const dataTransfer = new DataTransfer();
        dataTransfer.setData("application/json", JSON.stringify(fakePayload));

        const fire = (type, elem) => {
            const event = new DragEvent(type, {
                bubbles: true,
                cancelable: true,
                dataTransfer
            });
            elem.dispatchEvent(event);
        };

        fire("dragstart", source);
        fire("dragenter", target);
        fire("dragover", target);
        fire("drop", target);
        fire("dragend", source);
    }, { source: courseEl, target: quarterEl });
});

// Then the unit total in the top left corner of the dashboard should be 34
Then('the unit total in the top left corner of the dashboard should be 34', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 34 / 30");
});

// And the unit total at bottom of the quarter container should be 4
Then('the unit total at bottom of the quarter container should be 4', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 4");
});

// When I add a 5-unit course from another quarter to the first quarter
When('I add a 5-unit course from another quarter to the first quarter', async function () {
    await page.waitForLoadState('networkidle');
    const course = page.locator('text=COM SCI 33').first();
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 89,
                course_number: "COM SCI 33",
                course_name: "Introduction to Computer Organization",
                course_units: 5
            }),
            sourceYearIndex: 1,
            sourceQuarterName: "Winter"
        };

        const dataTransfer = new DataTransfer();
        dataTransfer.setData("  application/json", JSON.stringify(fakePayload));

        const fire = (type, elem) => {
            const event = new DragEvent(type, {
                bubbles: true,
                cancelable: true,
                dataTransfer
            });
            elem.dispatchEvent(event);
        };

        fire("dragstart", source);
        fire("dragenter", target);
        fire("dragover", target);
        fire("drop", target);
        fire("dragend", source);
    }, { source: courseEl, target: quarterEl });
});

// Then the unit total in the top left corner of the dashboard should remain 34
Then('the unit total in the top left corner of the dashboard should remain 34', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 34 / 30");
});

// And the unit total at the bottom of the quarter container should be 9
Then('the unit total at the bottom of the quarter container should be 9', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 9");
});

// SCENARIO 2: The total units and quarter total should decrease accordingly when a course is removed
// Given I am on my dashboard page
// Then the plan's total units in the top left corner of the dashboard should be 34
Then('the plan\'s total units in the top left corner of the dashboard should be 34', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 34 / 30");
});

// And the units for the first quarter should be 9
Then('the units for the first quarter should be 9', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 9");
});

// When I remove a 4-unit course from the first quarter
When('I remove a 4-unit course from the first quarter', async function () {
    await page.waitForLoadState('networkidle');
    const course = page.locator('text=COM SCI 31').first();
    const sidebar = page.locator('#course-list');

    await expect(course).toBeVisible();
    await expect(sidebar).toBeVisible();

    const courseEl = await course.elementHandle();
    const sidebarEl = await sidebar.elementHandle();

    if (!courseEl || !sidebarEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 87,
                course_number: "COM SCI 31",
                course_name: "Introduction to Computer Science I",
                course_units: 4
            }),
            sourceYearIndex: 1,
            sourceQuarterName: "Fall"
        };

        const dataTransfer = new DataTransfer();
        dataTransfer.setData("application/json", JSON.stringify(fakePayload));

        const fire = (type, elem) => {
            const event = new DragEvent(type, {
                bubbles: true,
                cancelable: true,
                dataTransfer
            });
            elem.dispatchEvent(event);
        };

        fire("dragstart", source);
        fire("dragenter", target);
        fire("dragover", target);
        fire("drop", target);
        fire("dragend", source);
    }, { source: courseEl, target: sidebarEl });
});

// Then the unit total in the top left corner of the dashboard should be 30
Then('the unit total in the top left corner of the dashboard should be 30', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 30 / 30");
});

// And the unit total at the bottom of the quarter container should be 5
Then('the unit total at the bottom of the quarter container should be 5', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 5");
});

// When I move a 5-unit course into another quarter
When('I move a 5-unit course into another quarter', async function () {
    await page.waitForLoadState('networkidle');
    const course = page.locator('text=COM SCI 33').first();
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 89,
                course_number: "COM SCI 33",
                course_name: "Introduction to Computer Organization",
                course_units: 5
            }),
            sourceYearIndex: 1,
            sourceQuarterName: "Fall"
        };

        const dataTransfer = new DataTransfer();
        dataTransfer.setData("application/json", JSON.stringify(fakePayload));

        const fire = (type, elem) => {
            const event = new DragEvent(type, {
                bubbles: true,
                cancelable: true,
                dataTransfer
            });
            elem.dispatchEvent(event);
        };

        fire("dragstart", source);
        fire("dragenter", target);
        fire("dragover", target);
        fire("drop", target);
        fire("dragend", source);
    }, { source: courseEl, target: quarterEl });
});
// Then the unit total in the top left corner of the dashboard should remain 30
Then('the unit total in the top left corner of the dashboard should remain 30', async function () {
    await page.waitForLoadState('networkidle');
    const totalUnitsLocator = page.locator('#total-units');
    await expect(totalUnitsLocator).toHaveText("Units: 30 / 30");
});

// And the unit total at the bottom of the quarter container should be 0
Then('the unit total at the bottom of the quarter container should be 0', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Fall"]').first();
    const unitTracker = quarter.locator('#unit-tracker');
    await expect(unitTracker).toHaveText("Units: 0");
});

After({tags: "@unitTracker"}, async function () {
    if (browser) {
        await browser.close();
        browser = undefined;
        page = undefined;
    }
})