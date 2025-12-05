# Diary Entry: Frontend Course UI

**Date:** 2024-12-05
**Branch:** `feature/frontend-courses`
**Status:** In Progress

---

## Summary

Building the frontend UI for browsing courses, enrolling, and tracking progress. This connects to the GraphQL API I built in the previous feature.

## My Thinking

*The backend course API is complete with all the queries and mutations I need. Now I need to build the frontend that lets users actually interact with courses.*

*Looking at the existing frontend structure, I see:*
- *AuthContext pattern for state management - I'll follow the same pattern for courses*
- *graphql-request library for API calls*
- *TailwindCSS for styling*
- *React Router for navigation*

*For the course UI, I'm thinking three main pages:*
1. *CoursesPage - browse all available library courses, filter by difficulty*
2. *MyCoursesPage - see enrolled courses with progress*
3. *CourseDetailPage - view course info and lessons, enroll/track progress*

*I could use a CourseContext for state, but I'll keep it simpler - just hooks that call the GraphQL API directly. The auth token is already handled by the AuthContext setting headers on graphqlClient.*

## Trade-offs

- **No course context**: Simpler but each page makes its own API calls. Fine for now since courses aren't shared state like auth.
- **Server state vs client state**: Relying on server as source of truth. Could add react-query later for caching.
- **Single CourseDetailPage**: Shows both course info and lessons. Could split later if needed.

## Concerns

- Need to handle loading and error states gracefully
- Progress updates should feel responsive even if API is slow
- Need to handle case where user isn't authenticated for myCourses

## Design Decisions

1. Create types matching GraphQL schema
2. Build a course service with GraphQL queries/mutations
3. Create useCourses hook for data fetching
4. Three pages: Courses, MyCourses, CourseDetail
5. Add navigation links in Layout

---

## Test Plan

- [x] Courses page shows library courses
- [x] Can filter courses by difficulty
- [x] Can search courses
- [x] CourseDetail shows course info and lessons
- [x] Can enroll in a course (requires auth)
- [x] MyCourses shows enrolled courses
- [x] Can update progress on a course
- [x] Navigation works correctly
- [x] Frontend builds successfully

---

## Implementation Notes

**Files Created:**
- `frontend/src/types/course.ts` - TypeScript types for courses
- `frontend/src/services/courseService.ts` - GraphQL operations for all course queries/mutations
- `frontend/src/hooks/useCourses.ts` - React hooks for data fetching (useLibraryCourses, useLibraryCourse, useMyCourses, useCourseActions)
- `frontend/src/pages/CoursesPage.tsx` - Browse and search library courses with difficulty filter
- `frontend/src/pages/MyCoursesPage.tsx` - User's enrolled courses with tabs (All, In Progress, Completed)
- `frontend/src/pages/CourseDetailPage.tsx` - Course details with lesson navigation and progress tracking

**Files Modified:**
- `frontend/src/App.tsx` - Added routes for /courses, /courses/:id, /my-courses
- `frontend/src/components/Layout.tsx` - Added Courses and My Courses nav links
- `frontend/src/pages/HomePage.tsx` - Changed "View Users" to "Browse Courses"

## Final Outcome

Frontend course UI complete:
- Browse, search, and filter library courses
- View course details and lesson content
- Enroll in courses (with auth check)
- Track progress through lessons
- View enrolled courses with progress bars
- Drop courses with confirmation
- All user course operations require authentication
- Frontend builds successfully
