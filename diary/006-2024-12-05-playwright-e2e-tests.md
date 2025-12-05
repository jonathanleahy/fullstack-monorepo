# Diary Entry: Playwright E2E Tests

**Date:** 2024-12-05
**Branch:** `feature/playwright-tests`
**Status:** In Progress

---

## Summary

Adding Playwright end-to-end tests to verify the frontend UI works correctly. This ensures our course browsing, enrollment, and progress tracking features work as expected from a user's perspective.

## My Thinking

*We've built the course UI but haven't verified it actually works end-to-end. Unit tests are great for testing components in isolation, but E2E tests catch issues like routing problems, API integration failures, and real user flow bugs.*

*Playwright is a great choice because:*
- *Fast and reliable compared to older tools like Selenium*
- *Built-in support for modern web features*
- *Great debugging tools (trace viewer, UI mode)*
- *Can test multiple browsers with same code*

*For the test structure, I'll organize by feature:*
- *auth.spec.ts - Login, register, logout flows*
- *courses.spec.ts - Browse, search, filter courses*
- *my-courses.spec.ts - Enrollment, progress tracking*

*The tricky part is testing authenticated flows. I'll need to either:*
1. *Login via UI before each test (slow but realistic)*
2. *Set auth tokens directly in browser storage (fast but less realistic)*

*I'll go with option 1 for critical flows and option 2 for tests that just need auth context.*

## Trade-offs

- **UI login vs direct token injection**: UI login is slower but catches more real bugs
- **Test isolation vs speed**: Each test has fresh state but takes longer
- **CI complexity**: Need to run both backend and frontend for E2E tests

## Concerns

- Tests need backend running to work
- Might need test fixtures/seed data for courses
- Flaky tests if not careful with waiting

## Design Decisions

1. Use Playwright Test runner (not jest integration)
2. Tests live in `frontend/e2e/` directory
3. Config in `frontend/playwright.config.ts`
4. Add npm scripts for running E2E tests
5. Update precommit-check.sh to run E2E tests

---

## Test Plan

- [ ] Playwright installed and configured
- [ ] Auth E2E tests (login, register)
- [ ] Courses page E2E tests (browse, search, filter)
- [ ] Course detail E2E tests
- [ ] My courses E2E tests
- [ ] All tests pass
- [ ] Precommit updated to run E2E

---

## Implementation Notes

**Files to Create:**
- `frontend/playwright.config.ts` - Playwright configuration
- `frontend/e2e/auth.spec.ts` - Authentication tests
- `frontend/e2e/courses.spec.ts` - Course browsing tests
- `frontend/e2e/my-courses.spec.ts` - User course tests

**Files to Modify:**
- `frontend/package.json` - Add test:e2e scripts
- `scripts/precommit-check.sh` - Add E2E test step
