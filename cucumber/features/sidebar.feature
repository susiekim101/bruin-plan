Feature: Sidebar display
    As a user of the Bruin Plan,
    I want to see the list of courses I need to take for my engineering major
    so that I can plan out my classes for each quarter of my 4 years at UCLA
    
    Background:
    Given I navigate to the login page
    And I enter "testuser@ucla.edu" as email
    And I enter "Password123!" as password
    When I click the login button
    Then I should be logged in successfully

    Scenario: User should see all components of the Sidebar.
    Given I am a logged-in user,
    When I am on the dashboard,
    Then the Sidebar should be displayed on the right
    And my major should be visible
    And the Select-a-major component should be visible
    And the search bar should be visible
    And the list of course cards should be visible.