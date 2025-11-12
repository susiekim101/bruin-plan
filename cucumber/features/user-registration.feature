Feature: User registration flow from landing page
    As a potential new user,
    I want to start the sign up process from the landing page,
    so I can create a new account.

    Scenario: Clicking on the My Dashboard button opens a new dialog
    Given I am on the landing page
    When I click on the My Dashboard button
    Then I should see the Create Account dialog
    And the Email input field should be visible
    And the Password input field should be visible
    And the Major input field should be visible