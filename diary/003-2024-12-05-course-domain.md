# Diary Entry: Course Domain Model

**Date:** 2024-12-05
**Branch:** `feature/course-domain`
**Status:** In Progress

---

## Summary

Building the course domain model for the Course Tutor system. This includes two main entities:
- **LibraryCourse**: Master course definitions in the shared library
- **UserCourse**: User's personal copy with progress tracking

## My Thinking

*The user needs to browse courses from a library, then add them to their personal learning list. Once added, they track progress through lessons.*

*Key insight: LibraryCourse is the "template" while UserCourse is the "instance". This is like the prototype pattern - library courses define the structure, user courses track individual progress.*

*For progress, I'll start simple: percentage complete and current lesson index. Can add more granular tracking later.*

## Trade-offs

- **Separate tables vs single table with ownership**: Chose separate for cleaner domain boundaries
- **Progress as percentage vs lesson-by-lesson**: Starting with percentage, can add lesson progress later
- **Course content in entity vs separate**: Keep content simple for now, can extract to ContentBlock entity later

## Concerns

- How to handle course updates after user has started? (freeze at start? or track version?)
- Lesson ordering - simple index or explicit order field?
- What happens when a library course is deleted but user has it?

## Design Decisions

1. **LibraryCourse**: id, title, description, lessons[], author, difficulty, estimatedHours
2. **UserCourse**: id, userId, libraryCourseId, progress, currentLessonIndex, startedAt, completedAt
3. **Lesson**: Embedded in LibraryCourse for now (not separate entity)

---

## Test Plan

- [x] LibraryCourse validates title is not empty
- [x] LibraryCourse validates lessons exist
- [x] LibraryCourse can add/remove lessons
- [x] UserCourse validates userId and libraryCourseId
- [x] UserCourse can update progress (0-100%)
- [x] UserCourse marks completion when progress hits 100%

---

## Implementation Notes

**Files Created:**
- `backend/domain/entities/course.go` - LibraryCourse, UserCourse, Lesson, Difficulty types
- `backend/domain/entities/course_test.go` - 24 tests covering all entity behavior
- `backend/domain/repositories/course_repository.go` - Repository interfaces for both entities

**Files Modified:**
- `backend/domain/entities/errors.go` - Added course-related domain errors

**Key Implementation Details:**
- `Difficulty` is a typed string enum (beginner, intermediate, advanced)
- `Lesson` is embedded in LibraryCourse (not a separate entity yet)
- `UserCourse.CompletedAt` is a pointer (nil until progress reaches 100%)
- All 31 entity tests pass (including existing user tests)

**Test Results:**
```
=== RUN   TestNewLibraryCourse_ValidInput       --- PASS
=== RUN   TestNewLibraryCourse_EmptyTitle       --- PASS
=== RUN   TestNewLibraryCourse_NoLessons        --- PASS
... (24 course tests + 7 user tests = 31 total)
PASS
```

## Final Outcome

Course domain model is complete:
- LibraryCourse entity with lessons, difficulty, and author
- UserCourse entity with progress tracking and completion
- Repository interfaces defined for data access layer
- TDD approach: tests written first, then implementation
- All tests passing, build succeeds
