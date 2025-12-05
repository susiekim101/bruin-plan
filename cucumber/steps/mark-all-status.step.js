import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@markAllStatus" }, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});


// SCENARIO 1: Selecting "In Progress" in the Mark All as Dropdown should set all the courses' status to "In Progress"
// Given I log into my account and am directed to the dashboard page
Given('I log into my account and am directed to the dashboard page', async function () {
    await page.goto(process.env.BASE_URL);
    await page.click('text="My Dashboard"');
    await page.fill('input[name="email"]', "testuser@ucla.edu");
    await page.fill('input[name="password"]',"Password123!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

// When I add multiple courses to a quarter
When('I add multiple courses to a quarter', async function () {
    await page.waitForLoadState('networkidle');

    const coursesToAdd = ['COM SCI 32', 'COM SCI 31'];
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();

    for (const courseName of coursesToAdd) {
        const sidebar = page.locator('#course-list');

        const course = sidebar.locator(`text=${courseName}`);
        await expect(course).toBeVisible();

        const courseEl = await course.elementHandle();
        const quarterEl = await quarter.elementHandle();
        if (!courseEl || !quarterEl) throw new Error("Elements not found");
        
        await page.evaluate(({ source, target, courseName }) => {
            const fakePayload = {
                courseJson: JSON.stringify({
                    course_id: courseName === 'COM SCI 32' ? 88 : 87,
                    course_number: courseName,
                    course_name: courseName === 'COM SCI 32' ? "Introduction to Computer Science II" : "Introduction to Computer Science I",
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

            fire('dragstart', source);
            fire('dragenter', target);
            fire('dragover', target);
            fire('drop', target);
            fire('dragend', source);
        }, { source: courseEl, target: quarterEl });
    }
});

// Then the status of all the courses in the quarter should be "Planned"
Then('the status of all the courses in the quarter should be "Planned"', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'Planned') {
            throw new Error(`Expected course status to be "Planned", but got "${statusText}"`);
        }
    }
});

// When I select "In Progress" under the Mark All as dropdown
When('I select "In Progress" under the Mark All as dropdown', async function () {
    const quarterSelector = '[data-year="1"][data-quarter="Winter"]';
    const dropdownSelector = `${quarterSelector} #mark-all-as-dropdown`;

    await page.evaluate((dropdownSelector) => {
        const selectRoot = document.querySelector(dropdownSelector);

        if (!selectRoot) {
        throw new Error('Could not find React-Select container: ' + dropdownSelector);
        }

        const reactKey = Object.keys(selectRoot).find(k =>
        k.startsWith('__reactFiber$') || k.startsWith('__reactProps$')
        );

        if (!reactKey) {
        throw new Error('Could not find React key on React-Select');
        }

        let fiber = selectRoot[reactKey];
        let onChange = null;

        while (fiber && !onChange) {
        const props = fiber.pendingProps || fiber.memoizedProps;
        if (props && typeof props.onChange === 'function') {
            onChange = props.onChange;
            break;
        }
        fiber = fiber.return;
        }

        if (!onChange) {
            throw new Error('Could not find onChange handler for React-Select');
        }
        onChange({ value: 'In Progress', label: 'In Progress' });
    }, dropdownSelector);

    await page.waitForTimeout(200);
});

// Then the status of all the courses in the quarter should be "In Progress"
Then('the status of all the courses in the quarter should be "In Progress"', async function () {
    await page.waitForLoadState('networkidle');
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'In Progress') {
            throw new Error(`Expected course status to be "In Progress", but got "${statusText}"`);
        }
    }
});

// And when the page is reloaded, the courses' status should remain "In Progress"
Then('when the page is reloaded, the courses\' status should remain "In Progress"', async function () {
    await page.reload();
    await page.waitForLoadState('networkidle');

    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'In Progress') {
            throw new Error(`Expected course status to be "In Progress" after reload, but got "${statusText}"`);
        }
    }
});

// SCENARIO 2: Selecting "Completed" in the Mark All as Dropdown should set all the courses' status to "Completed"
// Given I log into my account and am directed to the dashboard page
// And the current status of all the courses in a quarter is "In Progress"
Given('the current status of all the courses in a quarter is "In Progress"', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'In Progress') {
            throw new Error(`Expected course status to be "In Progress", but got "${statusText}"`);
        }
    }
});

// When I select "Completed" under the Mark All as dropdown
When('I select "Completed" under the Mark All as dropdown', async function () {
    const quarterSelector = '[data-year="1"][data-quarter="Winter"]';
    const dropdownSelector = `${quarterSelector} #mark-all-as-dropdown`;

    await page.evaluate((dropdownSelector) => {
        const selectRoot = document.querySelector(dropdownSelector);

        if (!selectRoot) {
        throw new Error('Could not find React-Select container: ' + dropdownSelector);
        }

        const reactKey = Object.keys(selectRoot).find(k =>
        k.startsWith('__reactFiber$') || k.startsWith('__reactProps$')
        );

        if (!reactKey) {
        throw new Error('Could not find React key on React-Select');
        }

        let fiber = selectRoot[reactKey];
        let onChange = null;

        while (fiber && !onChange) {
        const props = fiber.pendingProps || fiber.memoizedProps;
        if (props && typeof props.onChange === 'function') {
            onChange = props.onChange;
            break;
        }
        fiber = fiber.return;
        }

        if (!onChange) {
            throw new Error('Could not find onChange handler for React-Select');
        }
        onChange({ value: 'Completed', label: 'Completed' });
    }, dropdownSelector);

    await page.waitForTimeout(200);
});

// Then the status of all the courses in the quarter should be "Completed"
Then('the status of all the courses in the quarter should be "Completed"', async function () {
    await page.waitForLoadState('networkidle');
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'Completed') {
            throw new Error(`Expected course status to be "Completed", but got "${statusText}"`);
        }
    }
});

// And when the page is reloaded, the courses' status should remain "Completed"
Then('when the page is reloaded, the courses\' status should remain "Completed"', async function () {
    await page.reload();
    await page.waitForLoadState('networkidle');

    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'Completed') {
            throw new Error(`Expected course status to be "Completed" after reload, but got "${statusText}"`);
        }
    }
});

// SCENARIO 3: Selecting "Planned" in the Mark All as Dropdown should set all the courses' status to "Planned"
// Given I log into my account and am directed to the dashboard page
// And the current status of all the courses in a quarter is "Completed"
Given('the current status of all the courses in a quarter is "Completed"', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'Completed') {
            throw new Error(`Expected course status to be "Completed", but got "${statusText}"`);
        }
    }
});

// When I select "Planned" under the Mark All as dropdown
When('I select "Planned" under the Mark All as dropdown', async function () {
    const quarterSelector = '[data-year="1"][data-quarter="Winter"]';
    const dropdownSelector = `${quarterSelector} #mark-all-as-dropdown`;

    await page.evaluate((dropdownSelector) => {
        const selectRoot = document.querySelector(dropdownSelector);

        if (!selectRoot) {
        throw new Error('Could not find React-Select container: ' + dropdownSelector);
        }

        const reactKey = Object.keys(selectRoot).find(k =>
        k.startsWith('__reactFiber$') || k.startsWith('__reactProps$')
        );

        if (!reactKey) {
        throw new Error('Could not find React key on React-Select');
        }

        let fiber = selectRoot[reactKey];
        let onChange = null;

        while (fiber && !onChange) {
        const props = fiber.pendingProps || fiber.memoizedProps;
        if (props && typeof props.onChange === 'function') {
            onChange = props.onChange;
            break;
        }
        fiber = fiber.return;
        }

        if (!onChange) {
            throw new Error('Could not find onChange handler for React-Select');
        }
        onChange({ value: 'Planned', label: 'Planned' });
    }, dropdownSelector);

    await page.waitForTimeout(200);
});

// And when the page is reloaded, the courses' status should remain "Planned"
Then('when the page is reloaded, the courses\' status should remain "Planned"', async function () {
    await page.reload();
    await page.waitForLoadState('networkidle');

    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();
    const courseStatuses = quarter.locator('#course-status');

    for (let i = 0; i < 3; i++) {
        const statusText = await courseStatuses.nth(i).innerText();
        if (statusText !== 'Planned') {
            throw new Error(`Expected course status to be "Planned" after reload, but got "${statusText}"`);
        }
    }
});

// Then remove added courses from user's plan
Then('remove added courses from user\'s plan', async function () {
    const quarter = page.locator('[data-year="1"][data-quarter="Winter"]').first();
    await expect(quarter).toBeVisible();

    const coursesToRemove = ['COM SCI 32', 'COM SCI 31'];
    const sidebar = page.locator('#course-list');

    for (const courseName of coursesToRemove) {
        await page.evaluate((courseName) => {
            const quarter = document.querySelector('[data-year="1"][data-quarter="Winter"]');
            const sidebar = document.querySelector('#course-list');
            if (!quarter || !sidebar) throw new Error("Elements not found");

            const courseEl = Array.from(quarter.querySelectorAll('*'))
                .find(el => el.textContent?.trim() === courseName);

            if (!courseEl) throw new Error(`Course ${courseName} not found`);

            const fakePayload = {
                courseJson: JSON.stringify({
                    course_id: courseName === 'COM SCI 32' ? 88 : 87,
                    course_number: courseName,
                    course_name: courseName === 'COM SCI 32' ? "Introduction to Computer Science II" : "Introduction to Computer Science I",
                    course_units: 4
                }),
                sourceYearIndex: 1,
                sourceQuarterName: 'Winter'
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

            fire('dragstart', courseEl);
            fire('dragenter', sidebar);
            fire('dragover', sidebar);
            fire('drop', sidebar);
            fire('dragend', courseEl);

        }, courseName);
    }
});

After({tags: "@markAllStatus" }, async function () {
    await browser.close();
});