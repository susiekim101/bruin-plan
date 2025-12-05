@unitTracker
Feature: Total units displayed for the entire plan and each quarter are updated dynamically
    As a Bruin Plan user, 
    I want to be able to see the total units of my plan
    so that I can see if it meets the graduation unit requirement

    As a Bruin Plan user, 
    I want to be able to see the unit total for each quarter
    so I can see if quarterly plan is within the allowed unit range

    Scenario: The total units and quarter total should increase accordingly when a course is added
    Given I am on my dashboard page
    Then the plan's total units in the top left corner of the dashboard should be 26
    And the units for the first quarter should be 0 
    When I add a 4-unit course to the first quarter
    Then the unit total in the top left corner of the dashboard should be 30
    And the unit total at bottom of the quarter container should be 4
    When I add a 5-unit course from another quarter to the first quarter
    Then the unit total in the top left corner of the dashboard should remain 30
    And the unit total at the bottom of the quarter container should be 9

    Scenario: The total units and quarter total should decrease accordingly when a course is removed
    Given I am on my dashboard page
    Then the plan's total units in the top left corner of the dashboard should be 30
    And the units for the first quarter should be 9
    When I remove a 4-unit course from the first quarter
    Then the unit total in the top left corner of the dashboard should be 26
    And the unit total at the bottom of the quarter container should be 5
    When I move a 5-unit course into another quarter
    Then the unit total in the top left corner of the dashboard should remain 26
    And the unit total at the bottom of the quarter container should be 0