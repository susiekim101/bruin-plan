@searchBar
Feature: Search bar
    As a user of Bruin Plan
    I want to search for certain courses by their course code
    so that I can easily find classes I want to take and move them into my plan

    Background: User is logged in
    Given I log in
    And I land on the dashboard page

    Scenario: Entering no course code displays all courses for user's major
    When I don't enter a course code into the search bar
    Then I should see the courses for my major

    Scenario: Entering an existing (partial) course code displays courses matching that course code
    When I enter COM SCI 
    Then I should see all courses with COM SCI in their course code

    Scenario: Entering an invalid course code displays no courses
    When I enter TEST CODE 
    Then I should see no course cards displayed