import { Given, When, Then, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import 'dotenv/config';

setDefaultTimeout(60 * 1000);
let page, browser;

Before({tags: "@endToEnd"}, async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

// SCENARIO 1: Full end-to-end test of user registration, drag-and-drop, sidebar searching, marking status, and logging out
// Given I navigate to the Bruin Plan landing page
Given('I navigate to the Bruin Plan landing page', async function () {
    await page.goto(process.env.BASE_URL);
});
// When I click on the my dashboard button
When('I click on the my dashboard button', async function () {
    await page.locator('button[id="my-dashboard"]').click();
});

// Then I should see the Don't have an account? Sign up button
Then('I should see the Don\'t have an account? Sign up button', async function () {
    await page.waitForTimeout(600);
    expect(await page.locator('text="Don\'t have an account?"').isVisible()).toBeTruthy();
    expect(await page.locator('text="Sign up"').isVisible()).toBeTruthy();
});

// When I click on the Sign up text
When('I click on the Sign up text', async function () {
    await page.click('text="Sign up"');
});

// Then I should be able to create an account
Then ('I should be able to create an account', async function () {
    await page.fill('input[name="first_name"]', "New");
    await page.fill('input[name="last_name"]', "User");
    await page.fill('input[name="email"]', "newuser@example.com");
    await page.fill('input[name="password"]',"userPassword15!");
    await page.selectOption('#major-input', 'Computer Science');
    await page.click('button[type="submit"]');
});

// And be navigated to my dashboard page
Then ('be navigated to my dashboard page', async function () {
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
});

// And drag and drop COM SCI M51A to my plan
Then ('drag and drop COM SCI M51A to my plan', async function () {
    await page.waitForLoadState('networkidle');
    const course = page.locator('text=COM SCI M51A');
    const quarter = page.locator('[data-year="1"][data-quarter="Spring"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 200,
                course_number: "COM SCI M51A",
                course_name: "Logical Design of Digital Systems",
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

    await page.waitForTimeout(500);
});

// And navigate to the next year
Then ('navigate to the next year', async function () {
    await page.locator('#right-navigation').click();
    await page.waitForTimeout(500);
});

// And search for MATH 32A in the sidebar
Then ('search for MATH 32A in the sidebar', async function () {
    await page.fill('input[placeholder="Search"]', 'MATH 32A');
    await page.waitForTimeout(500);
});

// And add MATH 32A into my plan
Then ('add MATH 32A into my plan', async function () {
    const course = page.locator('text=MATH 32A').first();
    const quarter = page.locator('[data-year="2"][data-quarter="Fall"]').first();

    await expect(course).toBeVisible();
    await expect(quarter).toBeVisible();

    const courseEl = await course.elementHandle();
    const quarterEl = await quarter.elementHandle();

    if (!courseEl || !quarterEl) throw new Error("Elements not found");

    await page.evaluate(({ source, target }) => {
        const fakePayload = {
            courseJson: JSON.stringify({
                course_id: 150,
                course_number: "MATH 32A",
                course_name: "Calculus of Several Variables",
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

    await page.waitForTimeout(1000);
});

// And set the status of fall quarter to In Progress
Then ('set the status of fall quarter to In Progress', async function () {
    await page.waitForTimeout(1000);
    const quarterSelector = '[data-year="2"][data-quarter="Fall"]';
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

// And go back to the first year
Then ('go back to the first year', async function () {
    await page.locator('#left-navigation').click();
    await page.waitForTimeout(500);
});

// And set the status of spring quarter to Completed
Then ('set the status of spring quarter to Completed', async function () {
    const quarterSelector = '[data-year="1"][data-quarter="Spring"]';
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

// And log out
Then ('log out', async function () {
    await page.locator('#logout-button').click();
    await page.locator('text=Yes').click();
    await page.waitForURL(`${process.env.BASE_URL}/`);
});

// SCENARIO 2: Full end-to-end test of user login, drag-and-drop, sharing plan, viewing public page, and logging out
// Given I navigate to the Bruin Plan landing page
// When I click on the my dashboard button
// Then I should see the login dialog
Then ('I should see the login dialog', async function () {
    await page.waitForTimeout(600);
    expect(await page.locator('text="Email"').isVisible()).toBeTruthy();
    expect(await page.locator('text="Password"').isVisible()).toBeTruthy();
});

// Then I should be able to log in with my credentials
Then ('I should be able to log in with my credentials', async function () {
    await page.fill('input[name="email"]', "testuser@ucla.edu");
    await page.fill('input[name="password"]',"Password123!");
    await page.click('button[type="submit"]');
});

// And be navigated to my dashboard page
// And drag and drop COM SCI M51A to my plan
// And share my plan
Then ('share my plan', async function () {
    await page.locator('text="Share"').click();
    await page.waitForTimeout(500);
    expect(await page.locator('text="Your plan has been successfully published!"').isVisible()).toBeTruthy();
    await page.locator('button:text("Ok")').click();
});

// And visit the public page
Then ('visit the public page', async function () {
    await page.locator('text="View All"').click();
    await page.waitForTimeout(500);
    await page.waitForURL(`${process.env.BASE_URL}/public`);
    await page.waitForTimeout(500);
    expect(await page.locator('text="Browse Plans"').isVisible()).toBeTruthy();
});

// And navigate back to the dashboard
Then ('navigate back to the dashboard', async function () {
    await page.locator('text="My Dashboard"').click();
    await page.waitForURL(`${process.env.BASE_URL}/dashboard`);
    await page.waitForTimeout(500);
});

// And log out

After({tags: "@endToEnd"}, async function () {
    await browser.close();
});