# Team 14 Log (Iteration 1)

## Feb 11, 2026 — Work Session
**Attendees:** Iyinoluwa  
**Summary:** Set up core Iteration 1 backend components and testing + basic GUI page.

### Work Completed
- Added Term domain class in model package.
- Added InMemoryExpenseRepository as stub database (in-memory list + initial fake data).
- Added BudgetService to compute totals, remaining balance, and over-budget detection.
- Added JUnit tests for BudgetService.
- Added basic GUI page templates/index.html.
- Added HomeController to serve the GUI page at /.
- Updated pom.xml to include JUnit 5 dependency.

### Design Decisions / Rationale
- Used an in-memory repository to satisfy stub database requirement (no real DB needed in ITR1).
- Placed calculations and business rules in BudgetService to keep controllers and UI simple and testable.
- Tests focus on service logic rather than GUI.

### Remaining Work
- Team needs to run backend locally and confirm mvn test passes and the GUI loads.
- Add/update GitHub Wiki and architecture sketch.
- Update planning document (ITR0 → revised ITR1).
- Tag final commit as ITR1 before deadline.
