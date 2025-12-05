# Mermaid Diagram Support

**Date:** 2024-12-05
**Feature:** Rich diagram rendering in course content

## Summary

I'm implementing Mermaid diagram support for the course content. This allows course authors to include visual diagrams like flowcharts, sequence diagrams, state diagrams, and more directly in their markdown content using the standard Mermaid syntax.

## My Thinking

The course content is already stored as Markdown and rendered with `react-markdown`. The existing `MarkdownRenderer` component uses `remark-gfm` for GitHub Flavored Markdown support (tables, task lists, etc). Adding Mermaid support is a natural extension.

I considered two approaches:

1. **rehype-mermaid plugin** - A remark/rehype plugin that processes Mermaid blocks server-side
2. **Client-side Mermaid rendering** - Detect Mermaid code blocks in the custom components and render them with the mermaid library

I chose approach #2 because:
- It's simpler to implement and debug
- Works entirely client-side without backend changes
- Gives us full control over error handling and styling
- The mermaid library is well-maintained and feature-rich

## Implementation

### Frontend Changes

1. Added `mermaid` package (v11.12.2) to frontend dependencies
2. Updated `MarkdownRenderer.tsx` with:
   - Mermaid initialization with sensible defaults
   - A `MermaidDiagram` component that renders mermaid code blocks to SVG
   - Custom `code` component handler to detect `language-mermaid` blocks
   - Error handling for invalid Mermaid syntax (shows error gracefully)

### Course Content Updates

Updated the Hexagonal Architecture course with comprehensive Mermaid diagrams:
- **Mind maps** for course overview
- **Timelines** showing project evolution
- **Flowcharts** for architecture visualization (the hexagon!)
- **Sequence diagrams** for request/response flows
- **Class diagrams** for adapter implementations
- **State diagrams** for entity lifecycles

The diagrams significantly improve the educational value by making abstract concepts visual.

## Trade-offs

### Pros
- Visual learning aids for complex architecture concepts
- Standard Mermaid syntax - authors already know it
- Client-side rendering - no backend changes needed
- Graceful error handling - bad syntax doesn't break the page

### Cons
- Adds ~500KB to bundle size (mermaid library)
- Client-side rendering means slight delay before diagrams appear
- Complex diagrams may render slowly on low-end devices

## Concerns

1. **Bundle size** - Mermaid is a large library. For a learning platform, I think it's worth it, but we could lazy-load it if needed.

2. **SSR compatibility** - Mermaid requires DOM access. If we add SSR later, we'll need to handle this (render placeholder, hydrate on client).

3. **Accessibility** - SVG diagrams need proper aria labels. The current implementation doesn't add them automatically - something to improve.

## Discoveries

- The `react-markdown` custom components API is powerful but has some quirks with how `pre` and `code` elements interact
- Mermaid v11+ has improved async rendering with `mermaid.render()` returning a Promise
- The `securityLevel: 'loose'` setting is needed for some diagram features but is acceptable in a controlled course content context

## Files Changed

- `frontend/package.json` - Added mermaid dependency
- `frontend/src/components/MarkdownRenderer.tsx` - Mermaid rendering support
- `backend/scripts/add_mermaid_diagrams.go` - Script to update course with diagrams
- `backend/data/app.db` - Updated with diagram content
- `backend/data/seed.db` - Updated seed database
- `frontend/e2e/mermaid-diagrams.spec.ts` - E2E tests for diagram rendering

## Test Outcomes

- E2E tests verify Mermaid diagrams render without crashing the page
- Manual testing confirms diagrams display correctly in the course viewer
- Error handling works - invalid Mermaid syntax shows error message instead of breaking

## Next Steps

1. Consider lazy-loading mermaid library for bundle size optimization
2. Add aria-labels to SVG diagrams for accessibility
3. Add Mermaid preview to the course editor (MarkdownEditor component)
4. Document Mermaid support for course authors
