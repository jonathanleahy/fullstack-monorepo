# Diary Entry 007 - shadcn/ui Component Refactor

**Date:** 2024-12-05
**Feature:** Refactor UI to use Playbook shadcn components

## Summary

I'm refactoring the frontend pages to properly use the Playbook design system components instead of inline Tailwind classes. The project already had shadcn-style components (Button, Input, Card) in the Playbook package, but they weren't being used consistently in the pages.

## My Thinking

Looking at the current CoursesPage and MyCoursesPage, they use raw Tailwind classes everywhere - things like:
- `<button className="px-4 py-2 bg-primary text-primary-foreground rounded-md...">` instead of `<Button>`
- `<div className="border rounded-lg p-6...">` instead of `<Card>`
- Inline difficulty badges instead of a proper `<Badge>` component

This is a maintainability problem. If we want to change button styles across the app, we'd have to hunt down every inline class. With proper components, we change it once in the Playbook.

## What I'm Building

1. **New Playbook components:**
   - `Badge` - for difficulty levels, status indicators
   - `Progress` - for course progress bars
   - `Select` - for dropdowns (difficulty filter)
   - `Tabs` - for the My Courses page tab navigation

2. **Refactored pages:**
   - CoursesPage - use Card, Button, Input, Select, Badge
   - MyCoursesPage - use Tabs, Card, Button, Badge, Progress
   - LoginPage/RegisterPage - use Card, Button, Input, Label, FormField

## Trade-offs

**Pros:**
- Consistent styling across the app
- Easier to maintain and update styles
- Better accessibility (components have proper ARIA attributes)
- Follows atomic design principles (atoms → molecules → organisms)
- Components are tested in Storybook

**Cons:**
- Slightly more verbose imports
- Need to build Playbook before frontend sees changes
- Less flexibility for one-off styling (but that's usually a good thing)

## Concerns

The E2E tests use element selectors like `getByRole('button', { name: 'Search' })`. As long as I keep the same button text and roles, they should continue to work. I'll run the full test suite after the refactor to make sure.

One thing I'm unsure about: should Tabs use Radix UI primitives or a simple custom implementation? I went with a custom implementation using React context because:
1. It's simpler and doesn't add dependencies
2. Our tabs are simple - no complex keyboard navigation needed yet
3. We can always upgrade to Radix later if needed

## Documentation Update

I need to update ai-new-feature.md to require that new UI features use Playbook components. This ensures future features maintain consistency.

## Final Outcome

**Components Added to Playbook:**
- Badge (atoms) - with success/warning/danger variants for difficulty levels
- Progress (atoms) - accessible progress bar
- Select (atoms) - native select with Playbook styling
- Tabs, TabsList, TabsTrigger, TabsContent (molecules) - proper accessible tabs

**Pages Refactored:**
- CoursesPage - uses Card, Button, Input, Select, Badge
- MyCoursesPage - uses Tabs, Card, Button, Badge, Progress
- LoginPage - uses Card, Button, Input, Label
- RegisterPage - uses Card, Button, Input, Label

**Test Updates:**
- Updated tab tests to use `getByRole('tab')` instead of `getByRole('button')` since the new Tabs component uses proper ARIA roles

**All 29 E2E tests pass.**
