@filter
Feature: Filter
    As a Computer Science student and a user of Bruin Plan
    I want to see courses required for other engineering majors
    so that I can add elective courses not necessarily required for my major to my plan

    Background: User is logged in
    Given I log in as a returning user
    And I am a Computer Science major

    Scenario: Clicking on Filter component displays all engineering major options in the database except the user's major
    When I click on the Filter component
    Then I should see the Computer Engineering and Computer Science and Engineering options
    And I should not see the Computer Science option

    Scenario: Not selecting an option displays the courses for the user's major
    When I do not select an option in the Filter component
    Then I should see all courses required for the Computer Science major in the Sidebar

    Scenario: Selecting a different major displays the courses for that major
    When I select the Computer Engineering option
    Then I should see all courses required for the Computer Engineering major in the Sidebar