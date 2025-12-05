# Diary Entry 014 - Folder-Based Course Repository

**Date:** 2024-12-05
**Feature:** Backend reads courses directly from folder structure

## Overview

Implemented a folder-based course repository that reads courses directly from the file system instead of requiring database imports. This simplifies course management and enables version control of course content.

## What Was Implemented

### Backend Changes

1. **New Folder Repository** (`backend/adapters/folder/course_repository.go`)
   - Implements `LibraryCourseRepository` interface
   - Reads courses from `data/courses/{course-slug}/`
   - Parses `course.json`, `lesson.json`, `quiz.json`, and `content.md` files
   - 5-minute caching for performance
   - Supports both old (flat) and new (nested) course.json formats
   - Read-only (Create/Update/Delete return errors)

2. **Configuration** (`backend/config/config.go`)
   - `COURSES_PATH` - Path to courses folder (default: `./data/courses`)
   - `USE_FOLDER_COURSES` - Enable folder-based loading (default: `true`)

3. **Main.go Updates**
   - Switches between folder and database repository based on config

### Docker Changes (`infra/docker-compose.yml`)

- Added volume mount: `../backend/data/courses:/app/courses:ro`
- Added environment variables for folder-based courses

### Course Templates (`backend/data/courses/COURSE-TEMPLATE/`)

Created comprehensive templates with 18 files:
- `course.json` - Full metadata with tags, categories, prerequisites
- `sales-page.md` - Udemy-style marketing page
- `curriculum.md` - Detailed course outline
- `quiz.json` - Multi-type questions (MC, T/F, multi-select, fill-blank)
- `final-exam.json` - End-of-course assessment with scoring
- `certificate.json` - Completion certificate config
- `glossary.md`, `faq.md`, `pitfalls.md`, `case-studies.md`
- `learning-objectives.md`, `prerequisites.md`
- `ai-new-course.md` - Prompts for creating courses with Claude
- `for-consideration.md` - Feature status tracker

### Course Content

Extracted Hexagonal Architecture course to folder structure:
- 10 chapters
- 50 sub-chapters (5 per chapter)
- Quiz for each chapter
- Sales page and curriculum

### Documentation

Updated `course-structure.md` with:
- Backend configuration instructions
- Docker setup
- How to add new courses
- How to switch between folder/database modes

## Technical Decisions

1. **Caching**: 5-minute cache to balance performance vs. content freshness
2. **Read-only**: Folder repo is read-only; editing is done via file system
3. **Format compatibility**: Supports both old flat and new nested JSON formats
4. **Template folder**: `COURSE-TEMPLATE` is skipped during course loading

## Files Changed

```
backend/adapters/folder/course_repository.go (new)
backend/cmd/api/main.go
backend/config/config.go
backend/data/courses/COURSE-TEMPLATE/* (18 files)
backend/data/courses/hexagonal-architecture-*/* (106 files)
backend/data/courses/course-structure.md
infra/docker-compose.yml
```

## PR

- PR #15: https://github.com/jonathanleahy/fullstack-monorepo/pull/15
- Merged to main

## What's Next (from diary/011)

Remaining features from the Seven Features list:
1. Rich Text Editor - Markdown editing for course authors
2. Progress Tracking - Charts, certificates, statistics
3. Permissions - Author-only edit access
4. Tag Filter UI - Frontend for filtering by tags
5. Lesson Navigation - Keyboard shortcuts, ToC sidebar
6. Dashboard - User dashboard with progress
