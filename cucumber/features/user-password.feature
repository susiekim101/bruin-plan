@userPassword
Feature: User registration validating password
    As a potential new user,
    I want to sign up with a secure password,
    so my account cannot be hacked.

    Scenario: The user should not be able to create an account if password is weak.
    Given I am a user who is creating a new account 
    When I enter a weak password, such as Password123
    Then there should be an error message

    Scenario: The user can create an account if password is strong.
    Given I am a user who is creating a new account 
    When I enter a weak password, such as Password123!!!
    Then there should be no error message