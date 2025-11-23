@landingToPublic
Feature: Navigation from Landing page to Public page
    As a potential new user,
    I want to browse public plans on the Public page,
    So I can explore public plans without having an account and decide if I want to create a new account.

    Scenario: Clicking on the Public page button leads to the Public page from the Landing page
    Given I am on the landing page as a new user
    When I click on the Public page button
    Then I should be led to the Public page
    And the title Browse Plans should be visible

    Scenario: The Public page should have a dropdown to filter by major
    Given I am on the public page
    When I click on the dropdown button that says major
    Then I should be able to select a specific Major from the list