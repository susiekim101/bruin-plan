Feature: Drag and drop courses to add and remove courses from user's plan
    As a user, 
    I want to be able to drag and drop courses,
    so that I can add and remove courses from my plan

    Scenario: Dragging course from sidebar and dropping into quarter adds it to container and plan
    Given I navigate to my dashboard
    When I drag a course from the sidebar and drop it into a quarter
    Then it should appear in the quarter I dropped it in
    And the course should remain in the quarter after I reload the page

    Scenario: Dragging course from one quarter to another adds course to quarter it was dropped in
    Given I navigate to my dashboard
    When I drag an existing course in a quarter and drop it in another quarter
    Thne the course should appear in the new quarter I dropped it in
    And the course shoudl remain in the new quarter after I reload the page

    Scenario: Dragging course from quarter to sidebar removes it from container and plan
    Given I navigate to my dashboard
    When I drag an existing course in a quarter and drop it in the sidebar
    Then the course should be removed from the quarter container
    And the course should appear at the top of the sidebar
    And the course should not be in the old quarter after I reload the page