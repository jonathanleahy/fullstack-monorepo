# AI Course Creation Guide

Instructions for prompting Claude to create a new course.

---

## Step 1: Initial Course Planning

Use this prompt to plan your course structure:

```
I want to create a new course on [TOPIC].

Target audience: [WHO IS THIS FOR]
Skill level: [beginner/intermediate/advanced]
Main goal: [WHAT WILL STUDENTS BE ABLE TO DO AFTER]

Please create:
1. A course title and compelling subtitle
2. 10 chapter titles that progress logically from basics to advanced
3. 5 sub-chapter titles for each chapter
4. A brief description of what each chapter covers
5. 10-15 key terms for the glossary
6. 5 common mistakes/pitfalls students make

Follow the course structure in: backend/data/courses/COURSE-TEMPLATE/
```

---

## Step 2: Create course.json

```
Create the course.json file for the [COURSE NAME] course with:
- Full metadata (title, subtitle, description)
- Author info
- Appropriate tags and categories
- Skills taught
- Target audience
- Prerequisites (required and recommended)
- Feature flags (quizzes, final exam, certificate, etc.)
- SEO keywords

Use the template: backend/data/courses/COURSE-TEMPLATE/course.json
Save to: backend/data/courses/[course-slug]/course.json
```

---

## Step 3: Create Marketing Documents

```
Create the marketing documents for the [COURSE NAME] course:

1. sales-page.md - Udemy-style landing page with:
   - Compelling headline that sells the transformation
   - "What You'll Learn" (6 bullet points)
   - Course overview (3 paragraphs)
   - Who this is for / Who this is NOT for
   - Prerequisites
   - Course stats table
   - Instructor section
   - 3 student testimonials

2. curriculum.md - Detailed curriculum showing:
   - All 10 chapters with overviews
   - All 50 sub-chapters with descriptions
   - Learning outcomes per chapter
   - What students will build

Use templates in: backend/data/courses/COURSE-TEMPLATE/
Save to: backend/data/courses/[course-slug]/
```

---

## Step 4: Create Supporting Documents

```
Create the supporting documents for the [COURSE NAME] course:

1. glossary.md - Define these key terms: [LIST TERMS FROM STEP 1]
   - Clear definitions
   - Examples where helpful
   - Chapter references

2. faq.md - Common questions including:
   - Prerequisites questions
   - Technical setup questions
   - Content-specific questions
   - Assessment questions
   - Certificate questions

3. pitfalls.md - Document these common mistakes: [LIST FROM STEP 1]
   - What people do wrong
   - Why it's a problem
   - The correct approach
   - How to recognize the mistake

4. case-studies.md - Create 3 case studies showing:
   - Real or realistic company examples
   - Problem they faced
   - How they applied course concepts
   - Results achieved

5. prerequisites.md - Define:
   - Required knowledge (with self-assessment)
   - Recommended knowledge
   - Learning path (before and after this course)

6. learning-objectives.md - For each chapter:
   - 3 specific, measurable objectives
   - Self-assessment questions

Use templates in: backend/data/courses/COURSE-TEMPLATE/
Save to: backend/data/courses/[course-slug]/
```

---

## Step 5: Create Chapter Content

For each chapter (run 10 times, or batch):

```
Create Chapter [N]: [Chapter Title] for the [COURSE NAME] course.

1. content.md - Chapter overview that:
   - Introduces the chapter topic
   - Shows a Mermaid mindmap of concepts covered
   - Previews each of the 5 sub-chapters (2-3 sentences each)
   - Explains why this matters
   - Does NOT contain detailed teaching (that's in sub-chapters)

2. lesson.json - With:
   - Title
   - Order number
   - 3 learning objectives
   - Estimated minutes
   - has_quiz: true

3. quiz.json - 4 questions using MULTIPLE types:
   - 1 multiple-choice question
   - 1 true-false question
   - 1 multiple-select question
   - 1 fill-in-the-blank question

   ALL questions must:
   - Reference ACTUAL content from sub-chapters
   - Use "According to the diagram..." or "According to the lesson..."
   - Include explanations referencing specific content
   - NOT test trivia or general knowledge

Save to: backend/data/courses/[course-slug]/lessons/0[N]-[chapter-slug]/
```

---

## Step 6: Create Sub-chapter Content

For each sub-chapter (run 50 times, or batch by chapter):

```
Create Sub-chapter [N.M]: [Sub-chapter Title] for the [COURSE NAME] course.

Create content.md that:
- Teaches ONE specific concept in depth
- Includes a Mermaid diagram (flowchart, sequence, or mindmap)
- Has code examples where appropriate
- Explains practical applications
- Has "Key Takeaways" section (3 bullet points)
- Has "Next Up" transition to next sub-chapter

Content should be:
- 400-600 words
- Clear and practical
- Focused on the specific sub-topic
- Self-contained but connected to chapter theme

Save to: backend/data/courses/[course-slug]/lessons/0[N]-[chapter-slug]/sublessons/0[M]-[sub-slug]/content.md
```

---

## Step 7: Create Final Exam

```
Create the final-exam.json for the [COURSE NAME] course.

Include:
- 15-20 questions covering all 10 chapters
- Mix of question types (multiple-choice, true-false, multiple-select, fill-blank)
- Difficulty progression (easy → medium → hard)
- 1-2 synthesis questions requiring cross-chapter knowledge
- Point values (easy=1, medium=2, hard=3, synthesis=5)
- Passing score of 70%

All questions must reference actual taught content.

Use template: backend/data/courses/COURSE-TEMPLATE/final-exam.json
Save to: backend/data/courses/[course-slug]/final-exam.json
```

---

## Step 8: Create Certificate Config

```
Create the certificate.json for the [COURSE NAME] course.

Include:
- Certificate title and subtitle
- Requirements (min chapters, quiz scores, final exam)
- Skills to list on certificate
- Achievement badges
- Sharing options

Use template: backend/data/courses/COURSE-TEMPLATE/certificate.json
Save to: backend/data/courses/[course-slug]/certificate.json
```

---

## Step 9: Review and Validate

```
Review the [COURSE NAME] course for:

1. Content consistency - Do chapters flow logically?
2. Quiz accuracy - Do ALL questions reference taught content?
3. Completeness - All 10 chapters, 50 sub-chapters present?
4. Mermaid diagrams - Do they all render correctly?
5. Marketing alignment - Does curriculum match sales page promises?
6. Glossary coverage - Are all key terms defined?
7. FAQ completeness - Are common questions addressed?
8. Prerequisites accuracy - Is learning path clear?
9. Objectives alignment - Do objectives match content?
10. No placeholder text - All [brackets] replaced?

List any issues found and fix them.
```

---

## Batch Creation (Faster)

Create multiple chapters at once:

```
Create chapters 1-5 for the [COURSE NAME] course.

For each chapter, create:
- content.md (chapter overview with Mermaid mindmap)
- lesson.json (with learning objectives)
- quiz.json (4 questions, mixed types, content-based)
- 5 sub-chapter content.md files (with diagrams and key takeaways)

Follow templates in COURSE-TEMPLATE.
Ensure quiz questions reference actual taught content.
```

---

## Complete Course in One Session

For a full course creation in one conversation:

```
Create a complete course on [TOPIC] for [AUDIENCE].

Using the COURSE-TEMPLATE folder structure, create ALL files:

1. course.json - Full metadata with tags/categories
2. sales-page.md - Udemy-style marketing
3. curriculum.md - All 10 chapters, 50 sub-chapters
4. glossary.md - 15+ key terms
5. faq.md - 10+ common questions
6. pitfalls.md - 5+ common mistakes
7. case-studies.md - 3 real-world examples
8. prerequisites.md - Learning path
9. learning-objectives.md - All chapter objectives
10. All 10 chapter folders with:
    - content.md (overview with diagram)
    - lesson.json
    - quiz.json (4 mixed-type questions)
    - 5 sub-chapter content.md files
11. final-exam.json - 15+ questions
12. certificate.json - Completion config

Save to: backend/data/courses/[generated-slug]/
```

---

## Tips for Better Results

1. **Be specific about audience** - "JavaScript developers with 2+ years experience" vs "developers"

2. **Specify practical outcomes** - "Build and deploy a REST API" vs "understand APIs"

3. **Request diagrams explicitly** - "Include a Mermaid flowchart showing the request flow"

4. **Review quiz questions carefully** - Ensure they test content actually taught

5. **Keep sub-chapters focused** - One concept = one sub-chapter

6. **Use the templates** - They ensure consistency and completeness

7. **Batch when possible** - Create multiple chapters/sub-chapters in one prompt

8. **Verify no placeholders** - Search for `[` to find unfilled brackets

---

## File Locations Reference

| File | Location |
|------|----------|
| Template folder | `backend/data/courses/COURSE-TEMPLATE/` |
| Structure docs | `backend/data/courses/course-structure.md` |
| Output location | `backend/data/courses/[your-course-slug]/` |
