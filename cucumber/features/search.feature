Feature: Search courses by code
    As a user, 
    I want to search for courses by their codes in the sidebar,
    so I can find easily course cards matching those codes.

    Scenario:
        Given I am on the dashboard page,
        When I don't enter anything in the search bar,
        Then I should see all course cards for my major displayed on the sidebar.

        Given I am on the dashboard page,
        When I enter COM SCI in the search bar,
        Then I should see all course cards with COM SCI in the course_number.
