@userVerification
Feature: User registration flow from landing page
    As a potential new user,
    I want to start the sign up process from the landing page,
    so I can create a new account.
    
    Scenario: The user should be able to enter their credentials into the dialog.
    Given I am a user with an account on the landing page
    When I click on the My Dashboard button as a returning user
    Then I should be able to enter my email
    And I should be able to enter my password