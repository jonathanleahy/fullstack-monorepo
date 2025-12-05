# Diary Entry 011 - Seven Features Implementation

**Date:** 2024-12-05
**Features:** Course Import, Rich Text Editor, Progress Tracking, Permissions, Search/Filter, Navigation, Dashboard

## Overview

Implementing 7 major features in one sprint:
1. Course Import - JSON import functionality
2. Rich Text Editor - Markdown support for lessons
3. Progress Tracking - Charts, certificates, statistics
4. User Roles/Permissions - Authors can only edit own courses
5. Search & Filter - Tags/categories for courses
6. Lesson Navigation - Better in-course navigation
7. Dashboard - User dashboard with enrolled courses and progress

## Implementation Strategy

### Phase 1: Foundation (Backend + shadcn fixes)

**shadcn/Playbook Improvements:**
- Add tailwindcss-animate plugin
- Add Textarea component
- Add Dialog component (properly wired)
- Add Alert component
- Add Tooltip component

**Backend Schema Changes:**
```graphql
# Add to LibraryCourse
authorId: ID!           # Links to User who created the course
tags: [String!]!        # Array of tag strings

# Add new queries
coursesByTag(tag: String!, pagination: PaginationInput): LibraryCourseConnection!
myAuthoredCourses(pagination: PaginationInput): LibraryCourseConnection!
allTags: [String!]!     # Get all unique tags

# Add new input
input ImportCourseInput {
  courses: [CreateLibraryCourseInput!]!
}

# Add new mutation
importCourses(input: ImportCourseInput!): [LibraryCourse!]!
```

### Phase 2: Features

**Feature 4: Permissions**
- Add `authorId` to LibraryCourse entity
- Validate on update/delete that user is author
- Frontend: conditionally show Edit button

**Feature 5: Tags & Search**
- Add `tags` field to LibraryCourse
- Create tag filter UI
- Tag-based search

**Feature 2: Rich Text Editor**
- Add react-markdown for rendering
- Add @uiw/react-md-editor for editing
- Update LessonEditor to use markdown
- Preview mode for lessons

**Feature 1: Course Import**
- Import page/modal
- JSON paste or file upload
- Validation and preview before import
- Bulk create via GraphQL

**Feature 6: Lesson Navigation**
- Keyboard shortcuts (j/k or arrow keys)
- Progress bar within lesson view
- Lesson bookmarks
- Table of contents sidebar

**Feature 3: Progress Tracking**
- Progress charts (completion percentage over time)
- Course completion certificate
- Statistics: total hours, courses completed, streak

**Feature 7: Dashboard**
- New /dashboard route
- Enrolled courses overview
- Authored courses section
- Progress statistics
- Quick actions

## Files to Create/Modify

### Backend
- `backend/domain/entities/course.go` - Add AuthorID, Tags fields
- `backend/adapters/graphql/schema.graphqls` - New types and queries
- `backend/adapters/graphql/schema.resolvers.go` - Implement resolvers
- `backend/adapters/db/course_repository.go` - Update queries

### Frontend - New Components
- `playbook/src/atoms/Textarea.tsx`
- `playbook/src/molecules/Alert.tsx`
- `frontend/src/components/MarkdownEditor.tsx`
- `frontend/src/components/MarkdownRenderer.tsx`
- `frontend/src/components/TagInput.tsx`
- `frontend/src/components/TagFilter.tsx`
- `frontend/src/components/ProgressChart.tsx`
- `frontend/src/components/Certificate.tsx`
- `frontend/src/components/KeyboardShortcuts.tsx`

### Frontend - New Pages
- `frontend/src/pages/DashboardPage.tsx`
- `frontend/src/pages/ImportCoursePage.tsx`

### Frontend - Modified
- `frontend/src/pages/CoursesPage.tsx` - Tag filter
- `frontend/src/pages/CourseDetailPage.tsx` - Better navigation, bookmarks
- `frontend/src/pages/CreateCoursePage.tsx` - Tags input
- `frontend/src/pages/EditCoursePage.tsx` - Tags input, permission check
- `frontend/src/components/LessonEditor.tsx` - Markdown support
- `frontend/src/components/CourseForm.tsx` - Tags input
- `frontend/src/services/courseService.ts` - New mutations/queries

## Dependency Order

1. shadcn fixes (independent)
2. Backend schema changes (independent)
3. Permissions (depends on backend)
4. Tags (depends on backend)
5. Rich Text Editor (independent after shadcn)
6. Import (depends on backend, tags)
7. Navigation improvements (independent)
8. Progress tracking (depends on backend stats)
9. Dashboard (depends on all)

## Technical Decisions

1. **Markdown library**: Using @uiw/react-md-editor - lightweight, good UX
2. **Charts**: Using recharts - lightweight, good React integration
3. **Certificate**: Generate as downloadable PDF or shareable image
4. **Keyboard shortcuts**: Custom hook with event listeners
5. **Tags storage**: Simple string array in database (no separate tags table)
