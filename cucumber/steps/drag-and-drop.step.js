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

// When I drag a coursee from the sidebar and drop it into a quarter container
When('I drag a course from the sidebar and drop it into a quarter container', async function () {
    const course = page.locator('text="CS 31 - Introduction to Computer Science I"').first();
    const quarterContainer = page.locator('#0-Fall'); // Assuming dropping into Year 0 Fall quarter

    const courseBox = await course.boundingBox();
    const containerBox = await quarterContainer.boundingBox();

    if (courseBox && containerBox) {
        await page.mouse.move(courseBox.x + courseBox.width / 2, courseBox.y + courseBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(containerBox.x + containerBox.width / 2, containerBox.y + containerBox.height / 2);
        await page.mouse.up();
    } else {
        throw new Error('Could not find bounding boxes for drag-and-drop operation');
    }
});