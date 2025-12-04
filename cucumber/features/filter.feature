@filter
Feature: Filter
    As a Computer Science student and a user of Bruin Plan
    I want to see courses required for other engineering majors
    so that I can add elective courses not necessarily required for my major to my plan

    Background: User is logged in
    Given I log in as a returning user with a Computer Science major
    And I am on the dashboard

    Scenario: Clicking on Filter component displays all engineering major options in the database except the user's major
    When I click on the Filter component
    Then I should only see the Computer Engineering and Computer Science and Engineering options

    Scenario: Not selecting an option displays the courses for the user's major
    When I do not select an option in the Filter component
    Then I should see course cards for the Computer Science major

    Scenario: Selecting a different major displays the courses for that major
    When I select the Computer Engineering option
    Then I should see course cards for the Computer Engineering major