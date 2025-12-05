Feature: Drag and drop courses to add and remove courses from user's plan
    As a user, 
    I want to be able to drag and drop courses,
    so that I can add and remove courses from my plan

    Scenario: Dragging course from sidebar and dropping into quarter adds it to container and plan
    Given I navigate to my dashboard
    Then I should see courses for my major in the sidebar
    And I should be able to drag a course from the sidebar and drop it into a quarter
    And the course should appear in the quarter

    Scenario: Dragging course from one quarter to another adds course to quarter it was dropped in
    Given I navigate to my dashboard
    Then I should be able to see a course I have previously added to my quarter
    And I should be able to drag and drop it into another quarter
    And the course should appear in the new quarter

    Scenario: Dragging course from quarter to sidebar removes it from container and plan
    Given I navigate to my dashboard
    Then I should be bale to seea course that I have previously added to my quarter
    And I should be able to drag the course and drop it in the sidebar
    And the course should be removed from the quarter container
    And the course should appear at the top of the sidebar