@markAllStatus
Feature: Drag and drop courses to add and remove courses from user's plan
    As a Bruin Plan user, 
    I want to be able to change the status of all the courses in a quarter
    so that I can keep track of my progress through my plan
    

    Scenario: Selecting "In Progress" in the Mark All as Dropdown should set all the courses' status to "In Progress"
    Given I log into my account and am directed to the dashboard page
    When I add multiple courses to a quarter
    Then the status of all the courses in the quarter should be "Planned"
    When I select "In Progress" under the Mark All as dropdown
    Then the status of all the courses in the quarter should be "In Progress"
    And when the page is reloaded, the courses' status should remain "In Progress"

    Scenario: Selecting "Completed" in the Mark All as Dropdown should set all the courses' status to "Completed"
    Given I log into my account and am directed to the dashboard page
    And the current status of all the courses in a quarter is "In Progress"
    When I select "Completed" under the Mark All as dropdown
    Then the status of all the courses in the quarter should be "Completed"
    And when the page is reloaded, the courses' status should remain "Completed"

    Scenario: Selecting "Planned" in the Mark All as Dropdown should set all the courses' status to "Planned"
    Given I log into my account and am directed to the dashboard page
    And the current status of all the courses in a quarter is "Completed"
    When I select "Planned" under the Mark All as dropdown
    Then the status of all the courses in the quarter should be "Planned"
    And when the page is reloaded, the courses' status should remain "Planned"
    Then remove added courses from user's plan