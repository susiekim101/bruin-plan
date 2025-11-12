import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from 'chai';

// Given I am on the landing page
Given('I am on the landing page', async function () {
    await this.page.goto('/'); // Go to landing page

    const title = await this.page.textContent('h1');
    expect(title).to.equal('Bruin Plan');
});
       
// When I click on the "My Dashboard" button
When('I click on the My Dashboard button', async function () {
    const button = this.page.locator('text="My Dashboard"');
    await button.click();
});
       
// Then I should see the "Create Account" dialog
Then('I should see the Create Account dialog', async function () {
    const dialog = this.page.getByRole('dialog');
    const isVisible = await dialog.isVisible();
    expect(isVisible).to.equal(true);
});
       
// Email input field should be visible
Then('the Email input field should be visible', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       
// And the Password input field should be visible
Then('the Password input field should be visible', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       
// And the Major input field should be visible
Then('the Major input field should be visible', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
       

