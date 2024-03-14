RETROSPECTIVE FOR DEMO 4 (Team 17)
=====================================

Total number of stories completed across all sprints: 21

Sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 5 stories committed | 5 stories done 
- 29 points committed | 29 points done 
- 96h planned | 96.5h spent (as a team) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |   13    |    -   |   58.75h   |     69.5h    |
| n 15   |    1    |    1   |      4h    |      4h      |
| n 27   |    3    |   13   |     9h     |      8h      |
| n 28   |    3    |    5   |     9h     |     8.5h     |
| n 29   |    2    |    8   |     6h     |     3.5h     |
| n 17   |    2    |    2   |     2h     |      3h      |
   

- Hours per task average, standard deviation (estimate and actual)

  - Hours per Task Average and Standard Deviation:

    - For **Estimated** Hours:
      - Average Estimate: 3h 42m
      - Standard Deviation Estimate: 1h 30m

    - For **Actual** Hours:
      - Average Actual: 4h 1m
      - Standard Deviation Actual: 2h 6m

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1 
  --> 88.75/96.5 - 1 = -0.08

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated --> 8h
  - Total hours spent --> 13h
  - Coverage (if available) --> 93.4%
- E2E testing:
  - Total hours estimated --> 16h
  - Total hours spent --> 14h

- Code review 
  - Total hours estimated --> 9h
  - Total hours spent --> 9h

- Technical Debt management:
  - Total hours estimated --> 8h
  - Total hours spent --> 5h
  - Hours estimated for remediation by SonarQube --> 16h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues --> 8h
  - Hours spent on remediation --> 5h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") --> 0.7%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - reliability: rating A
    - security: rating A
    - maintainability: rating A 
  
  Our focus was on stabilizing each quality measure at the maximum rating (based on ratings from previous sprints) to maintain the code quality at the highest possible level. This has implied continuous and constant access to SonarCloud to check and review every new line of code added.

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We encountered some challenges with extreme use cases, leading to the need for additional fixes.
  - Redesigning a banner in the three days before the demo required revisiting a portion of the code related to automated end-to-end (E2E) testing.

- What lessons did you learn (both positive and negative) in this sprint?

  > positive
  - Despite the holidays and break, we organized efficiently, resulting in the completion of all planned stories.
  - We realized that, despite remote work and everyone being in different locations, with proper organization, each team member successfully completed their tasks.

  > negative
  - It's crucial to test all use cases across the entire site more thoroughly to detect potential bugs that may not manifest but still need resolution.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - We achieved a high test coverage percentage, resulting in an elevated class (A) on SonarCloud in all required fields.
  - We successfully met the set deadlines, allowing us to complete development a couple of days before the demo.
  - Optimal organization and transparent communication within the team led to streamlined production. We have concentrated more on consulting each other regularly and waiting for updates from team members.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Although there may not be a formal next sprint, consideration could be given to enhancing and optimizing specific code segments.
  - Additionally, despite the site being fully responsive, exploring ways to enhance its aesthetic appeal in mobile mode could be pursued.

- One thing you are proud of as a Team!!

  - Despite a challenging start, we are proud of each team member's work. We successfully responded to initial issues and met, if not exceeded, our expectations and those of the Scrum Masters. We built trust in each other, and each team member showcased their abilities, leveraging them to the fullest.