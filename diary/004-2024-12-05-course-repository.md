# Diary Entry: Course Repository & GraphQL API

**Date:** 2024-12-05
**Branch:** `feature/course-repository`
**Status:** In Progress

---

## Summary

Building the data access layer and GraphQL API for courses. This connects the domain entities I created earlier to SQLite storage and exposes them via GraphQL.

## My Thinking

*Now that we have LibraryCourse and UserCourse entities with their business logic tested, I need to persist them. Looking at the existing user repository, the pattern is clear: SQLite with raw SQL queries, using the adapter pattern.*

*The tricky part is storing lessons. In PostgreSQL I'd use JSONB, but SQLite doesn't have that natively. Options:*
1. *Serialize lessons to JSON string in a TEXT column*
2. *Create a separate lessons table with foreign key*

*I'll go with JSON serialization for now - it keeps queries simple and lessons are always loaded with their course anyway. If we need to query individual lessons later, we can refactor to a separate table.*

*For the GraphQL schema, I need to think about what queries/mutations users actually need:*
- *Browse library courses (list, filter by difficulty, search)*
- *Start a course (creates UserCourse)*
- *Track progress (update UserCourse)*
- *View my courses (list user's courses with progress)*

## Trade-offs

- **JSON serialization for lessons**: Simpler but can't query individual lessons efficiently
- **UserCourse references LibraryCourse by ID only**: Need a separate query to get full course details
- **Soft delete vs hard delete**: Going with hard delete for now, can add soft delete later

## Concerns

- What if a LibraryCourse is deleted while users have it? Need ON DELETE behavior or validation
- Progress calculation - should backend calculate or trust frontend?
- Concurrent progress updates - last write wins for now

## Design Decisions

1. Lessons stored as JSON in `lessons` TEXT column
2. Timestamps stored as DATETIME (ISO8601 strings in SQLite)
3. GraphQL mutations require authentication
4. LibraryCourse CRUD for admin operations (future: role-based)
5. UserCourse operations scoped to authenticated user

---

## Test Plan

- [x] LibraryCourseRepository.Create stores and retrieves correctly
- [x] LibraryCourseRepository.List with pagination works
- [x] LibraryCourseRepository.Search finds by title
- [x] UserCourseRepository.Create links user to course
- [x] UserCourseRepository.ListByUser returns only that user's courses
- [x] GraphQL queries return expected data
- [x] GraphQL mutations require authentication

---

## Implementation Notes

**Files Created:**
- `backend/adapters/db/course_repository.go` - SQLite implementations for LibraryCourse and UserCourse repos
- `backend/adapters/db/course_repository_test.go` - 14 tests covering all repository operations

**Files Modified:**
- `backend/adapters/db/sqlite.go` - Added migrations for library_courses and user_courses tables
- `backend/adapters/graphql/schema.graphqls` - Added course types, queries, and mutations
- `backend/adapters/graphql/gqlgen.yml` - Added course model bindings
- `backend/adapters/graphql/resolver.go` - Added course repository fields
- `backend/adapters/graphql/schema.resolvers.go` - Implemented all course resolvers
- `backend/cmd/api/main.go` - Wired up course repositories

**GraphQL API Added:**
- Queries: `libraryCourse`, `libraryCourses`, `searchLibraryCourses`, `myCourses`, `myCompletedCourses`, `myInProgressCourses`, `userCourse`
- Mutations: `createLibraryCourse`, `updateLibraryCourse`, `deleteLibraryCourse`, `startCourse`, `updateProgress`, `dropCourse`

**Database Schema:**
```sql
library_courses (id, title, description, lessons[JSON], author, difficulty, estimated_hours, created_at, updated_at)
user_courses (id, user_id, library_course_id, progress, current_lesson_index, started_at, updated_at, completed_at)
```

## Final Outcome

Course repository and GraphQL API complete:
- Full CRUD for library courses
- User course enrollment, progress tracking, and completion
- All user course operations scoped to authenticated user
- 14 repository tests + all existing tests passing
- Backend builds successfully
