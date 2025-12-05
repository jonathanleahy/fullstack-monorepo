# Diary Entry 013 - Quiz/Assessment System

**Date:** 2024-12-05
**Feature:** Quiz/Assessment System with AI-generated questions for Hexagonal Architecture course

## Summary

I'm implementing a quiz system that allows learners to test their understanding at the end of each lesson. The key feature is using Claude to generate relevant multiple-choice questions based on the lesson content - specifically for the Hexagonal Architecture course.

## My Thinking

### Why Quizzes?

The course currently has great content with Mermaid diagrams, but there's no way for learners to validate their understanding. Quizzes serve multiple purposes:
1. **Self-assessment** - Learners know if they understood the material
2. **Retention** - Active recall improves memory
3. **Engagement** - Interactive elements keep learners engaged
4. **Completion validation** - Authors can see if learners actually understood content

### Design Decisions

**Quiz Structure:**
- Each lesson can have one optional quiz
- Quizzes consist of 3-5 multiple choice questions
- Questions are stored in the Lesson entity (not a separate table)
- Each question has 4 options, one correct answer, and an explanation

**Why embed in Lesson rather than separate entity?**
- Simpler schema - quizzes are tightly coupled to lessons
- No orphan quiz problem
- Easier to update/delete
- Trade-off: less flexible for future quiz types (essay, fill-in-blank)

**Scoring:**
- Simple percentage based (correct/total)
- No time limits initially (keep it stress-free)
- Users can retake quizzes unlimited times
- Best score is tracked per user

### AI Question Generation

Using Claude to generate questions for the Hex course. The approach:
1. Read each lesson's content
2. Generate 3-5 questions that test understanding of key concepts
3. Include plausible distractors (wrong answers that seem reasonable)
4. Add explanations for why the correct answer is correct

Example question format:
```json
{
  "question": "In Hexagonal Architecture, what is the primary purpose of a 'port'?",
  "options": [
    "To connect to a specific database implementation",
    "To define an interface for communication between the domain and external systems",
    "To handle HTTP request routing",
    "To manage application state"
  ],
  "correctIndex": 1,
  "explanation": "Ports are interfaces that define how the domain communicates with the outside world, allowing adapters to be swapped without changing the core domain logic."
}
```

## Data Model

Adding to the existing Lesson structure:

```graphql
type Question {
  id: ID!
  question: String!
  options: [String!]!
  correctIndex: Int!
  explanation: String
}

type Quiz {
  questions: [Question!]!
}

# Add to Lesson type
type Lesson {
  # ... existing fields
  quiz: Quiz
}

# For tracking user quiz results
type QuizAttempt {
  id: ID!
  lessonId: ID!
  userId: ID!
  score: Int!
  totalQuestions: Int!
  answers: [Int!]!
  completedAt: DateTime!
}
```

## UI Components

- **QuizButton** - Shows at bottom of lesson if quiz exists
- **QuizModal** - Full-screen quiz taking experience
- **QuizQuestion** - Single question display with options
- **QuizFeedback** - Shows correct/incorrect after each answer
- **QuizResults** - Final score and review of answers

## Implementation Order

1. Backend schema changes (add quiz fields to Lesson)
2. GraphQL types and resolvers
3. Frontend Quiz components
4. Generate Hex course questions using Claude
5. Update seed data with quiz content
6. Test and polish

## Concerns

1. **Question quality** - AI-generated questions need review for accuracy
2. **Answer position bias** - Should randomize option order on display
3. **Mobile UX** - Quiz modal needs to work well on small screens
4. **Accessibility** - Keyboard navigation for quiz options

## Files to Create/Modify

### Backend
- `backend/domain/entities/quiz.go` - Quiz, Question entities
- `backend/adapters/graphql/schema.graphqls` - Quiz types
- `backend/adapters/graphql/schema.resolvers.go` - Quiz resolvers
- `backend/scripts/add_quiz_questions.go` - Script to add quiz data

### Frontend
- `frontend/src/components/Quiz.tsx` - Main quiz component (all-in-one)
- `frontend/src/types/course.ts` - Quiz TypeScript types
- `frontend/src/pages/CourseDetailPage.tsx` - Add quiz button
- `frontend/src/services/courseService.ts` - Quiz GraphQL queries
- `frontend/e2e/quiz-assessment.spec.ts` - E2E tests

## Implementation Notes

### What Actually Changed

**Backend:**
- Added `Quiz` and `QuizQuestion` types to `domain/entities/course.go`
- Extended GraphQL schema with quiz types and input types
- Updated gqlgen.yml to map Quiz types to entities
- Created helpers.go for input conversion functions (to prevent regeneration issues)
- Created `scripts/add_quiz_questions.go` with 20+ AI-generated questions

**Frontend:**
- Created a single `Quiz.tsx` component that handles all quiz states:
  - Question display with multiple choice options
  - Submit and feedback flow
  - Progress tracking
  - Results display with score percentage
  - Retake functionality
- Integrated quiz into CourseDetailPage with "Take Quiz" button

### Challenges Faced

1. **gqlgen regeneration** - Helper functions kept getting commented out. Moved them to separate `helpers.go` file.

2. **GraphQL type mapping** - Had to explicitly map Quiz and QuizQuestion in gqlgen.yml to use entities instead of generated models.

3. **E2E test selectors** - Initial tests failed due to strict mode violations when multiple elements matched. Fixed by using more specific selectors like `.first()` and `level: 1`.

4. **Quiz flow logic** - The button changes from "Next Question" to "See Results" on the last question. Tests needed to handle both cases.

### E2E Tests (All Passing)

1. Should display Take Quiz button at end of lesson with quiz
2. Should start quiz and show first question when clicking Take Quiz
3. Should show correct feedback when answering correctly
4. Should show quiz results after completing all questions
5. Should allow retaking a quiz
6. Should display quiz score as percentage

## Lessons Learned

1. **Keep resolvers minimal** - GraphQL resolvers should just call service methods. Complex logic belongs in helper functions in separate files.

2. **gqlgen config matters** - Explicit type mapping prevents issues with generated models vs entities.

3. **Component consolidation** - Originally planned separate QuizQuestion/QuizResults components, but a single Quiz component was cleaner and easier to manage state.

4. **Test data isolation** - Having quiz data in the database before tests run is essential. The add_quiz_questions.go script handles this.

## Future Enhancements

- [ ] Track quiz attempts per user (QuizAttempt entity)
- [ ] Show best score on lesson sidebar
- [ ] Quiz analytics for course authors
- [ ] Randomize option order
- [ ] Time limits (optional)
- [x] Different question types (true/false, multiple select) - **Done in PR #15**
