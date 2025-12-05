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

// SCENARIO 1: Dragging course from sidebar and dropping into quarter adds it to container and plan
// Given I navigate to my dashboard
Given('I navigate to my dashboard', async function () {
    await page.goto(process.env.BASE_URL);
    await page.click('text="My Dashboard"');
    await page.fill('input[name="email"]', "testuser@gmail.com");
    await page.fill('input[name="password"]',"testPassword7!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

// When I drag a course from the sidebar and drop it into a quarter
When('I drag a course from the sidebar and drop it into a quarter', async function () {
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
                course_id: 1,
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

// Then it should appear in the quarter I dropped it in
Then('it should appear in the quarter I dropped it in', async function () {
    await page.waitForTimeout(1000);
    const courseInQuarter = page.locator('div[data-year="1"][data-quarter="Fall"] >> text="COM SCI 31"').first();
    expect(await courseInQuarter.isVisible({ timeout: 10000 })).toBeTruthy();
});

// And the course should be removed from the sidebar
Then('the course should be removed from the sidebar', async function () {
    await page.waitForTimeout(1000);
    const courseInSidebar = page.locator('#course-list >> text="COM SCI 31"');
    expect(await courseInSidebar.isVisible({ timeout: 10000 })).toBeFalsy();
});

// And the course should remain in the quarter after I reload the page
Then('the course should remain in the quarter after I reload the page', async function () {
    await page.reload();
    await page.waitForTimeout(1000);
    const courseInQuarter = page.locator('div[data-year="1"][data-quarter="Fall"] >> text="COM SCI 31"').first();
    expect(await courseInQuarter.isVisible({ timeout: 10000 })).toBeTruthy();
});

// SCENARIO 2: Dragging course from one quarter to another adds course to quarter it was dropped in
// Given I navigate to my dashboard
// When I drag an existing course in a quarter and drop it in another quarter
When('I drag an existing course in a quarter and drop it in another quarter', async function () {
    const course = page.locator('text=COM SCI 31').first();
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 1,
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

    }, { source: courseEl, target: quarterEl });
});
    
// Then the course should appear in the new quarter I dropped it in
Then('the course should appear in the new quarter I dropped it in', async function () {
    await page.waitForTimeout(1000);
    const courseInQuarter = page.locator('div[data-year="1"][data-quarter="Winter"] >> text="COM SCI 31"').first();
    expect(await courseInQuarter.isVisible({ timeout: 10000 })).toBeTruthy();
});

// And the course should be removed from the old quarter
Then('the course should be removed from the old quarter', async function () {
    await page.waitForTimeout(1000);
    const courseInOldQuarter = page.locator('div[data-year="1"][data-quarter="Fall"] >> text="COM SCI 31"').first();
    expect(await courseInOldQuarter.isVisible({ timeout: 10000 })).toBeFalsy();
});
    
// And the course should remain in the new quarter after I reload the page
Then('the course should remain in the new quarter after I reload the page', async function () {
    await page.reload();
    await page.waitForTimeout(1000);
    const courseInQuarter = page.locator('div[data-year="1"][data-quarter="Winter"] >> text="COM SCI 31"').first();
    expect(await courseInQuarter.isVisible({ timeout: 10000 })).toBeTruthy();
});

// SCENARIO 3: Dragging course from quarter to sidebar removes it from container and plan
// Given I navigate to my dashboard
// When I drag an existing course in a quarter and drop it in the sidebar
When('I drag an existing course in a quarter and drop it in the sidebar', async function () {
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
                course_id: 1,
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
       
// Then the course should be removed from the quarter container
Then('the course should be removed from the quarter container', async function () {
    await page.waitForTimeout(1000);
    const courseInOldQuarter = page.locator('div[data-year="1"][data-quarter="Winter"] >> text="COM SCI 31"').first();
    expect(await courseInOldQuarter.isVisible({ timeout: 10000 })).toBeFalsy();
});
       
// And the course should appear in the sidebar   
Then('the course should appear in the sidebar', async function () {
    await page.waitForTimeout(1000);
    const courseInSidebar = page.locator('#course-list >> text="COM SCI 31"');
    expect(await courseInSidebar.isVisible({ timeout: 10000 })).toBeTruthy();
});
       
// And the course should not be in the old quarter after I reload the page 
Then('the course should not be in the old quarter after I reload the page', async function () {
    await page.reload();
    await page.waitForTimeout(1000);
    const courseInQuarter = page.locator('div[data-year="1"][data-quarter="Winter"] >> text="COM SCI 31"').first();
    expect(await courseInQuarter.isVisible({ timeout: 10000 })).toBeFalsy();
});

After(async function () {
    await browser.close();
})