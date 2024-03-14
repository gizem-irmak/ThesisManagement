RETROSPECTIVE FOR DEMO 3 (Team 17)
=====================================

Sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 5 stories committed | 5 stories done 
- 39 points committed | 39 points done 
- 96h | 98h 25m spent (as a team)


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |   8     |        |    56h       |   60.5h    |
| n 9    |   3    |    13   |      4.5h    |     8h     |
| n 11   |   2    |    2    |      2h      |    2h      |
| n 13   |   2    |    8    |      4h      |    8.5h    |
| n 14   |   3    |   8     |      4.5h    |  6.25h     |
| n 26   |   2    |   8     |      6h      |      13h   |


- Hours per task average, standard deviation (estimate and actual)

  - Hours per Task Average and Standard Deviation:

    - For **Estimated** Hours:
      - Average Estimate: 9h 38m
      - Standard Deviation Estimate: 2h 41m

    - For **Actual** Hours:
      - Average Actual: 12h 17m
      - Standard Deviation Actual: 3h 56m

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 --> 77/98.25 - 1 = -0.21


## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated --> 3.5h
  - Total hours spent --> 7.5h 
  - Coverage (if available) --> 65.7%
- E2E testing:
  - Total hours estimated --> 16h
  - Total hours spent --> 16h

- Code review/refactoring 
  - Total hours estimated --> 16h
  - Total hours spent --> 16h

- Technical Debt management:
  - Total hours estimated --> 8h
  - Total hours spent --> 8h
  - Hours estimated for remediation by SonarQube --> 12h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues --> 6h
  - Hours spent on remediation --> 8h
  - debt ratio (as reported by SonarQube under "Measures-Maintainability") --> 0.5%
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability)
    - reliability: rating A
    - security: rating A
    - maintainability: rating A  

  About SonarCloud, we focused more on solving issues with a higher severity level across the various measures (maintainability, vulnerability, security hotspot and bugs). We obtained a good rating for all these section but we encountered challenges meeting the Quality Gate due to test coverage section (percentage of lines of code covered by tests). Therefore we need to conduct additional tests to avoid leaving any line of code untested (particular attention on unit tests).

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - We experienced fewer errors in our overall estimations, but we can improve according to our capabilities. One specific area for enhancement is in the readiness of backend tasks, which were completed later than optimal: this delay impacted on our ability in coducing tests (E2E), particularly towards the final days of the sprint.

- What lessons did you learn (both positive and negative) in this sprint?

  > negative
  - We conducted the merging operation in the last two days, resulting in challenges when fixing issues due to several conflicts.
  - We need to keep more updated about the overall status of our work.

  > positive
  - We can consider to set a deadline a few days (3 or 2) before the sprint expires to avoid potential problems with GitHub merging operations.
  - We learned to place more trust in the outcomes of our colleagues' work.
  - We focused on fewer stories, allowing us to invest more effort in ensuring the quality of the software.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  
  - We made the functionalities developed in the previous sprint responsive so that the application is now usable on portable devices and we have been consistent in the style of the entire application even though the front-end and back-end work was divided among different team members.
  - We splitted the work more efficiently, improving overall coordination.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - We need to fix all the minor details related to the graphical aspect of the application (more focus on both UI and user experience).
  - We also need to cover the lack of tests to increase the tests covarege and successfully pass the Quality Gate.
  - We should work on less story (maybe 3 at max) and concentrate more on each step of team coordination, including: consulting each other regularly, waiting for updates from team members to stay informed about ongoing work, merging GitHub branches, review the entire code on sonarcloud to identify fixes and pass the Quality Gate.
  - We can set a deadline for each team member, particularly those working on tasks that are closely related.
  - we need to be more consistent in terms of spending equal amount of time per day on work

- One thing you are proud of as a Team!!

  - We reminded each other more frequently about various tasks, including the importance of tracking time.
  - We reached a higher level of internal dynamics among team members, offering support throught chat and improving overall communication.