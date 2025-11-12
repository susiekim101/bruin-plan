import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import "dotenv/config";

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

let browser;

// 1. Launch the browser once for ALL scenarios
BeforeAll(async function () {
    browser = await chromium.launch({
        headless: true // Set to false to see the browser
    });
});

// 2. Close the browser after ALL scenarios
AfterAll(async function () {
    await browser.close();
});

// 3. Create a new context/page for EACH scenario
Before(async function () {
    // The "context" manages a session (like cookies/storage)
    const context = await browser.newContext({baseURL: BASE_URL}); 
    // The "page" is the actual tab
    this.page = await context.newPage(); 
});

// 4. Close the page and context after EACH scenario
After(async function () {
    await this.page.close();
    await this.page.context().close();
});