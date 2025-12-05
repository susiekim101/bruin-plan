@endToEnd
Feature: Use the Bruin Plan Website to create 4-year plans and browse others
    As a UCLA Engineering Student,
    I want to use the Bruin Plan website to conveniently create a 4-year plan
    so that I can keep track of my degree requirements and graduation progress

    Scenario: A new user registers for website, adds courses to their plan, marks their status, and logs out
    Given I am on the landing page
    When I click on the My Dashboard button
    Then a dialog with a link to sign up should appear
    Then I should be able to create an account
    And be navigated to my dashboard page
    And add a course to my plan
    And search for courses in the sidebar
    And add the searched course into my plan
    And set the status of those courses
    And log out

    Scenario: A returning user logs in, adds a course to their plan, shares their plan, visits public page, returns to dashboard, and logs out
    Given I am on the landing page
    When I click on the My Dashboard button
    Then I should be able to log in with my credentials
    And be naviaged to my dashboard page
    And add a course to my plan
    And share my plan
    And visit the public page
    And navigate back to the dashboard
    And log out
