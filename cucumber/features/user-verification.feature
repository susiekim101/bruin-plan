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
    
    Scenario: The user should not be able to create an account if password is weak.
    Given I am a user who is creating a new account 
    When I enter a weak password, such as Password123
    Then I should not be able to create an account
    And there should be an error message