# Course Template

Use this template when creating a new course. Copy this entire folder and rename it to your course slug.

## Quick Start

1. **Copy this folder:**
   ```bash
   cp -r COURSE-TEMPLATE your-course-slug
   ```

2. **Update course.json** with your course details, tags, and categories

3. **Write marketing documents:**
   - `sales-page.md` - Udemy-style landing page
   - `curriculum.md` - Detailed course outline

4. **Create 10 chapters** (copy `00-chapter-one` folder, rename to `01-*` through `09-*`)

5. **Create 5 sub-chapters per chapter**

6. **Fill in supporting documents:**
   - `glossary.md` - Key terms
   - `faq.md` - Common questions
   - `pitfalls.md` - Mistakes to avoid
   - `case-studies.md` - Real-world examples
   - `prerequisites.md` - Learning path
   - `learning-objectives.md` - Skills checklist

7. **Set up assessments:**
   - Chapter `quiz.json` files (multiple question types)
   - `final-exam.json` - End-of-course assessment
   - `certificate.json` - Completion certificate config

---

## Complete File Structure

```
your-course-slug/
├── course.json                  # Course metadata, tags, categories
├── sales-page.md                # Marketing page for browsers
├── curriculum.md                # Detailed curriculum
│
├── glossary.md                  # Key terms & definitions
├── faq.md                       # Frequently asked questions
├── pitfalls.md                  # Common mistakes to avoid
├── case-studies.md              # Real-world examples
├── prerequisites.md             # Learning path & prerequisites
├── learning-objectives.md       # Skills checklist
│
├── final-exam.json              # Comprehensive end-of-course exam
├── certificate.json             # Certificate configuration
│
└── lessons/
    ├── 00-chapter-slug/         # Chapter 1
    │   ├── content.md           # Chapter overview
    │   ├── lesson.json          # Chapter metadata
    │   ├── quiz.json            # Chapter quiz (multi-type questions)
    │   └── sublessons/
    │       ├── 00-sub-slug/content.md
    │       ├── 01-sub-slug/content.md
    │       ├── 02-sub-slug/content.md
    │       ├── 03-sub-slug/content.md
    │       └── 04-sub-slug/content.md
    ├── 01-chapter-slug/         # Chapter 2
    │   └── ... (same structure)
    ... (10 chapters total: 00 through 09)
```

---

## File Descriptions

### Core Content
| File | Purpose |
|------|---------|
| `course.json` | Metadata, tags, categories, pricing, features |
| `sales-page.md` | Marketing copy for course listing |
| `curriculum.md` | Full chapter/sub-chapter outline |
| `lessons/*/content.md` | Chapter overviews and sub-chapter teaching content |

### Supporting Content
| File | Purpose |
|------|---------|
| `glossary.md` | Definitions of key terms |
| `faq.md` | Answers to common questions |
| `pitfalls.md` | Mistakes to avoid, anti-patterns |
| `case-studies.md` | Real-world examples from companies |
| `prerequisites.md` | Required knowledge, learning path |
| `learning-objectives.md` | Skills checklist for self-assessment |

### Assessment
| File | Purpose |
|------|---------|
| `lessons/*/quiz.json` | Chapter quiz (3+ questions, multiple types) |
| `final-exam.json` | End-of-course comprehensive exam |
| `certificate.json` | Certificate requirements and config |

---

## Question Types

Chapter quizzes and final exam support multiple question types:

| Type | Description | Fields |
|------|-------------|--------|
| `multiple-choice` | Single correct answer from 4 options | `Options`, `CorrectIndex` |
| `true-false` | True or false statement | `CorrectAnswer` (boolean) |
| `multiple-select` | Multiple correct answers | `Options`, `CorrectIndices` (array) |
| `fill-blank` | Fill in the blank | `CorrectAnswers` (array of acceptable answers) |

See `lessons/00-chapter-one/quiz.json` for examples of each type.

---

## Checklist

### Core Content
- [ ] `course.json` - All fields filled, tags and categories set
- [ ] `sales-page.md` - Compelling marketing copy
- [ ] `curriculum.md` - All 10 chapters, 50 sub-chapters outlined
- [ ] 10 chapter folders created (00 through 09)
- [ ] Each chapter has `content.md`, `lesson.json`, `quiz.json`
- [ ] Each chapter has 5 sub-chapters with `content.md`

### Supporting Content
- [ ] `glossary.md` - All key terms defined
- [ ] `faq.md` - Common questions answered
- [ ] `pitfalls.md` - Mistakes documented
- [ ] `case-studies.md` - Real examples included
- [ ] `prerequisites.md` - Learning path defined
- [ ] `learning-objectives.md` - All objectives listed

### Assessment
- [ ] All chapter quizzes have 3+ questions
- [ ] Mix of question types used
- [ ] Questions reference actual content
- [ ] `final-exam.json` - Questions from all chapters
- [ ] `certificate.json` - Requirements configured

### Quality
- [ ] All Mermaid diagrams render correctly
- [ ] Quiz questions test taught content (not trivia)
- [ ] Estimated times are realistic
- [ ] No placeholder text remaining

---

## AI Course Creation

See `ai-new-course.md` for prompts to use with Claude when creating course content.
