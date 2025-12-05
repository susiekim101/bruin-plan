@unit-tracker
Feature: Total units displayed for the entire plan and each quarter are updated dynamically
    As a Bruin Plan user, 
    I want to be able to see the total units of my plan
    so that I can see if it meets the graduation unit requirement

    As a Bruin Plan user, 
    I want to be able to see the unit total for each quarter
    so I can see if quarterly plan is within the allowed unit range

    Scenario: The total units and quarter total should increase accordingly when a course is added
    Given I am on my dashboard page
    When I add a course to my plan
    Then the unit total in the top left corner of the dashboard should increase accordingly
    And the unit total at bottom of the quarter container should increase accordingly

    Scenario: The total units and quarter total should decrease accordingly when a course is removed
    Given I am on my dashboard page
    When I add a course to my plan
    Then the unit total in the top left corner of the dashboard should decrease accordingly
    And the unit total at bottom of the quarter container should decrease accordingly