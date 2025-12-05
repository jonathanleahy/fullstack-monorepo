# Diary Entry 016 - Storybook Component Library

**Date:** 2024-12-05
**Feature:** Storybook setup and component library organization

## Summary

Set up Storybook for the playbook design system, moved reusable components from frontend to playbook, and created comprehensive stories for all components.

## What Was Done

### 1. Storybook Configuration

Fixed Storybook to properly render Tailwind CSS and shadcn/ui components:

- Added CSS variables for shadcn/ui theme to `playbook/src/styles.css`
- Created `playbook/postcss.config.js` for Tailwind processing
- Added `"type": "module"` to package.json
- Installed missing dependencies: `tailwindcss`, `postcss`, `autoprefixer`

### 2. Components Moved to Playbook

Moved reusable UI components from frontend to playbook following the Storybook-first pattern:

| Component | From | To |
|-----------|------|-----|
| TagInput | frontend/src/components | playbook/src/atoms |
| TagFilter | frontend/src/components | playbook/src/molecules |

### 3. Stories Created

Created Storybook stories for all 14 playbook components:

**Atoms (8):**
- Badge (7 variants: default, secondary, destructive, outline, success, warning, danger)
- Button (existing)
- Input (default, with label, disabled, with error)
- Label (default, with input, required)
- Progress (various percentages, with label)
- Select (default, with label, disabled, default value)
- TagInput (default, with tags, with suggestions)
- Textarea (default, with label, disabled, with rows)

**Molecules (6):**
- Alert (default, destructive, warning variants)
- Card (default, with footer, simple)
- FormField (default, with hint, with error, disabled)
- Tabs (default, with content)
- TagFilter (default, with selected, many tags)
- Tooltip (all positions: top, right, bottom, left)

### 4. Updated ai-new-feature.md

Added "Step 4.2 - Storybook-First Development" to the feature development workflow documentation, establishing the requirement that UI components must be created and tested in Storybook before being used in the main app.

## Component Analysis

Analyzed all frontend components to determine what could be moved to playbook:

**Moved (pure UI, no app dependencies):**
- TagInput, TagFilter

**Kept in Frontend (app-specific):**
- AnalyticsCard/Dashboard - Uses app data structures
- AttachmentList/Upload - Uses app services
- BookmarkButton/List - Uses bookmarkService
- Certificate - App-specific course certificate
- CourseForm - Uses app types (Difficulty, LibraryCourse)
- EnrollButton - Uses app services
- Layout - App-specific navigation/auth
- LessonEditor - Complex app-specific editor
- LessonProgress - Uses courseService
- MarkdownEditor/Renderer - Heavy dependencies (mermaid, syntax-highlighter)
- ProgressChart - Uses recharts, app-specific
- ProtectedRoute - App-specific auth
- Quiz - App-specific quiz logic

## Playbook Usage in App

The frontend now imports these components from `@repo/playbook`:

- Badge, Button, Card, CardHeader, CardTitle, CardContent, CardFooter
- Input, Label, Select, Textarea
- Progress, Alert
- TagInput, TagFilter

Used across 22+ files in the frontend.

## Running Storybook

```bash
cd playbook
pnpm storybook
# Opens at http://localhost:6006
```

## Files Changed

```
playbook/src/styles.css (CSS variables)
playbook/postcss.config.js (new)
playbook/package.json (type: module)
playbook/src/atoms/TagInput.tsx (moved from frontend)
playbook/src/atoms/index.ts
playbook/src/molecules/TagFilter.tsx (moved from frontend)
playbook/src/molecules/index.ts
playbook/stories/*.stories.tsx (14 files)
frontend/src/components/CourseForm.tsx (updated imports)
frontend/src/pages/CoursesPage.tsx (updated imports)
ai-build-instructions/ai-new-feature.md (Storybook-first docs)
```

## What's Next

- Add more shadcn/ui components (Dialog, Dropdown, Avatar, Switch, Checkbox)
- Add dark mode support
- Consider adding visual regression testing with Chromatic
