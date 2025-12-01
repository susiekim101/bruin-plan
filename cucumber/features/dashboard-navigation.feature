Feature: Navigated dashboard and viewing four-year plan
    As a user,
    I want to click through the years on the dashboard, 
    so that I can view all four years of my plan on the dashboard

    Scenario: Clicking on the right arrow icon prompts a transition to the next year
    Given I am on the dashboard page
    Then the screen should change when I click on the right arrow icon
    Then the year number should increment
    And the left arrow icon should be visible

    Scenario: Disabled right arrow at Year 4
    Given I return to the dashboard page
    Then the fourth click on the right arrow shouldn't change the screen
    And the year number should increment to 4
    And the right arrow icon should not be visible

    Scenario: Disabled left arrow at Year 1
    Given I reload the dashboard page
    Then the left arrow icon should not be visible
    And the screen should remain the same when I click where the icon would be
    And the year number should remain the same

    Scenario: Clicking above and below the arrows doesn't prompt transition
    Given I navigate back to the dashboard page
    Then the screen and year number don't change when I click above the right arrow icon
    And the screen and year number don't change when I click below the right arrow icon
    And the screen and year number don't change when I click above the left arrow icon
    And the screen and year number don't change when I click below the left arrow icon
