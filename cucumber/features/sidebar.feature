@sidebar
Feature: Sidebar
    As a user of the Bruin Plan,
    I want to see all aspects of the Sidebar, including my major, select a different major, search bar, and list of courses for my major
    so that I have tools to search for specific courses and explore courses in different majors.
    
    Background: User is logged in
    Given I log in as a returning user

    Scenario: User should see all components of the Sidebar.
    When I am on the dashboard,
    Then the Sidebar should be visible
    And my major should be visible
    And the Select-a-major component should be visible
    And the search bar should be visible
    And the list of course cards should be visible.