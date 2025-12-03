@userRegistration
Feature: User registration flow from landing page
    As a potential new user,
    I want to start the sign up process from the landing page,
    so I can create a new account.

    Scenario: Clicking on the My Dashboard button opens a new dialog
    Given I am on the landing page
    When I click on the My Dashboard button
    Then I should see the Log In dialog
    And the Email input field should be visible
    And the Password input field should be visible

    Scenario: Clicking on the MyDashboard button as a new user opens a new dialog, where I have the option to log in or sign up.
    Given I am a returning user on the landing page
    When I click on the My Dashboard button as a new user
    Then I should see the Don't have an account? button
    And the Sign up text should be visible
    And when I click the Sign up text, the input fields change.