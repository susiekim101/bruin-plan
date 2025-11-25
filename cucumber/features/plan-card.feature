@planCard
Feature: Plan cards that are clickable buttons from the public page. Once clicked, should open the correpsonding plan.
    As a user of Bruin Plan,
    I want to be able to quickly determine which plan card is for which major
    So that I can figure out whether it is relevant to me or not.

    Scenario: Users see all anonymously posted public plans on Public page
    Given a user is on the public page
    When they have Select a major selected,
    Then they should see all the course cards
    And all the Plan cards will have their major
    And all the plan cards will have an icon representing its major