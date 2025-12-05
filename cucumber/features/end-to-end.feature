@endToEnd
Feature: Use the Bruin Plan Website to create 4-year plans and browse others
    As a UCLA Engineering Student,
    I want to use the Bruin Plan website to conveniently create a 4-year plan
    so that I can keep track of my degree requirements and graduation progress

    Scenario: Full end-to-end test of user registration, drag-and-drop, sidebar searching, marking status, and logging out
    Given I navigate to the Bruin Plan landing page
    When I click on the my dashboard button
    Then I should see the Don't have an account? Sign up button
    When I click on the Sign up text
    Then I should be able to create an account
    And be navigated to my dashboard page
    And drag and drop COM SCI M51A to my plan
    And navigate to the next year
    And search for MATH 32A in the sidebar
    And add MATH 32A into my plan
    And set the status of fall quarter to In Progress
    And go back to the first year
    And set the status of spring quarter to Completed
    And log out

    Scenario: Full end-to-end test of user login, drag-and-drop, sharing plan, viewing public page, and logging out
    Given I navigate to the Bruin Plan landing page
    When I click on the my dashboard button
    Then I should see the login dialog
    Then I should be able to log in with my credentials
    And be naviaged to my dashboard page
    And drag and drop COM SCI M51A to my plan
    And share my plan
    And visit the public page
    And navigate back to the dashboard
    And log out
