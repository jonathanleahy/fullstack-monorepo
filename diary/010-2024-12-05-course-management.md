# Diary Entry 010 - Course Management UI

**Date:** 2024-12-05
**Feature:** Create and edit courses with lessons

## BDD Scenarios

```gherkin
Feature: Course Management
  As an authenticated user
  I want to create and manage courses
  So that I can share learning content with others

  Scenario: Create a new course
    Given I am logged in
    When I navigate to "Create Course"
    And I fill in the course title "Introduction to Go"
    And I fill in the description "Learn Go programming basics"
    And I select difficulty "Beginner"
    And I set estimated hours to 10
    And I add a lesson with title "Getting Started" and content "Install Go..."
    And I click "Create Course"
    Then I should see a success message
    And the course should appear in the courses list

  Scenario: Add lessons to a course
    Given I am logged in
    And I am editing a course
    When I click "Add Lesson"
    And I fill in lesson title "Variables and Types"
    And I fill in lesson content "Go has several built-in types..."
    And I click "Save Lesson"
    Then the lesson should appear in the lessons list

  Scenario: Edit a lesson
    Given I am logged in
    And I am editing a course with existing lessons
    When I click edit on a lesson
    And I change the lesson title to "Updated Title"
    And I click "Save"
    Then the lesson should show the updated title

  Scenario: Delete a lesson
    Given I am logged in
    And I am editing a course with multiple lessons
    When I click delete on a lesson
    And I confirm the deletion
    Then the lesson should be removed from the list

  Scenario: Reorder lessons
    Given I am logged in
    And I am editing a course with multiple lessons
    When I drag a lesson to a new position
    Then the lesson order should be updated

  Scenario: Edit existing course
    Given I am logged in
    And I have created a course
    When I navigate to my courses
    And I click "Edit" on a course
    Then I should see the course editor with existing data
    And I should be able to modify the course details
```

## Summary

Building a full course management UI that allows users to:
- Create new courses with title, description, difficulty, and estimated hours
- Add, edit, delete, and reorder lessons within a course
- Edit existing courses

## My Thinking

The current structure has:
- **LibraryCourse**: title, description, lessons[], author, difficulty, estimatedHours
- **Lesson**: title, content, order

I'll build:
1. **CreateCoursePage** - Form to create new courses
2. **EditCoursePage** - Edit existing course details and manage lessons
3. **LessonEditor component** - Inline editing of lessons with drag-to-reorder

The backend already has all the necessary mutations, so this is purely frontend work.

## Components Needed

1. **CourseForm** - Reusable form for course metadata (title, description, difficulty, hours)
2. **LessonList** - Display and manage lessons with add/edit/delete/reorder
3. **LessonEditor** - Modal or inline editor for individual lessons
4. **CreateCoursePage** - New course creation flow
5. **EditCoursePage** - Edit existing course

## Trade-offs

**Approach 1: Single page with all lessons inline**
- Pros: Simple, everything visible at once
- Cons: Can get cluttered with many lessons

**Approach 2: Course metadata separate from lesson editor**
- Pros: Cleaner separation
- Cons: More navigation

I'll go with Approach 1 - a single page where you can see and edit everything. For large courses, we can add collapsible sections later.

## Files to Create/Modify

- `frontend/src/pages/CreateCoursePage.tsx` - NEW
- `frontend/src/pages/EditCoursePage.tsx` - NEW
- `frontend/src/components/CourseForm.tsx` - NEW
- `frontend/src/components/LessonEditor.tsx` - NEW
- `frontend/src/services/courseService.ts` - Add mutations
- `frontend/src/types/course.ts` - Add input types
- `frontend/src/App.tsx` - Add routes
- `frontend/src/pages/CoursesPage.tsx` - Add Create Course button
- `frontend/src/pages/CourseDetailPage.tsx` - Add Edit button
- `frontend/e2e/course-management.spec.ts` - NEW E2E tests

## Implementation Notes

### Components Created

1. **CourseForm** (`frontend/src/components/CourseForm.tsx`)
   - Reusable form component for course metadata
   - Fields: title, description, author, difficulty, estimated hours
   - Validation for required fields
   - Can be used for both create and edit modes

2. **LessonEditor** (`frontend/src/components/LessonEditor.tsx`)
   - Manages list of lessons with add/edit/delete functionality
   - Reorder lessons using up/down arrow buttons
   - Inline editing with title and content fields
   - Automatically updates lesson order when reordering

### Pages Created

1. **CreateCoursePage** (`frontend/src/pages/CreateCoursePage.tsx`)
   - Uses CourseForm for course metadata
   - Uses LessonEditor for managing lessons
   - Redirects to course detail on successful creation

2. **EditCoursePage** (`frontend/src/pages/EditCoursePage.tsx`)
   - Loads existing course data
   - Delete course with confirmation dialog
   - Redirects to course detail on save

### Routes Added

- `/courses/new` - Create new course (protected)
- `/courses/:id/edit` - Edit existing course (protected)

### Service Updates

Added to `courseService.ts`:
- `createLibraryCourse(input)` - Create a new course
- `updateLibraryCourse(id, input)` - Update existing course
- `deleteLibraryCourse(id)` - Delete a course

### Navigation Updates

- CoursesPage: Added "Create Course" button
- CourseDetailPage: Added "Edit" link for authenticated users

## Test Results

All 41 E2E tests pass including 12 new course management tests:
- Create Course button visibility
- Navigate to create course page
- Display course form with required fields
- Validation errors for empty form
- Add a lesson
- Edit a lesson
- Delete a lesson
- Create a complete course
- Navigate to edit page from course detail
- Edit course details
- Delete a course
- Reorder lessons
