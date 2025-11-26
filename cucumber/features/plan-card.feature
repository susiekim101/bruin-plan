@planCard
Feature: Plan cards that are clickable buttons from the public page. Once clicked, should open the correpsonding plan.
    As a user of Bruin Plan,
    I want to be able to quickly determine which plan card is for which major
    So that I can figure out whether it is relevant to me or not.

    Scenario: Users see all anonymously posted public plans on Public page
    Given a user is on the public page
    When they have Select a major selected,
    Then they should see all the course cards

    Scenario Outline: Users select specific major to see cards of only that major
    Given a user is on the public page
    When they have "<major>" selected
    Then they should only course cards for "<major>"

    Examples:
    | major                             |
    | Bioengineering                    |
    | Computer Science                  |
    | Computer Science and Engineering  |
    | Computer Engineering              |