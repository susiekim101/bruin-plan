Feature: User registration flow from landing page
    As a potential new user,
    I want to start the sign up process from the landing page,
    so I can create a new account.

    Scenario: Clicking on the My Dashboard button opens a new dialog
    Given I am on the landing page
    When I click on the My Dashboard button
    Then I should see the Create Account dialog
    And the First Name input field should be visible
    And the Last Name input field should be visible
    And the Email input field should be visible
    And the Password input field should be visible
    And the Major input field should be visible

    Scenario: Clicking on the My Dashboard button opens a new dialog, where I have the option to sign up or log in.
    Given I am a returning user on the landing page
    When I click on the My Dashboard button as a returning user
    Then I should see the Already have an account? 
    And the Log in text should be visible
    And when I click the Log in text, the input fields change
    