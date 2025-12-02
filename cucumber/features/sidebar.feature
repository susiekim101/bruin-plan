Feature: Sidebar display

    Scenario: User should see all components of the Sidebar.
    Given I am a logged-in user,
    When I am on the dashboard,
    Then the Sidebar should be displayed on the right
    And my major should be visible
    And the Select-a-major component should be visible
    And the search bar should be visible
    And the list of course cards should be visible.