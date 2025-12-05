# Diary Entry 009 - Auth UX Improvements

**Date:** 2024-12-05
**Feature:** Improve authentication error messages and developer experience

## Summary

Fixed poor user experience on login/register pages where GraphQL errors were displayed as raw JSON instead of clean, readable messages. Also added pre-filled test credentials for development mode.

## The Problem

When registration failed (e.g., "user with this email already exists"), the error displayed was:

```
user with this email already exists: {"response":{"errors":[{"message":"user with this email already exists","path":["register"]}],"data":null,"status":200,"headers":{}},"request":{...}}
```

This is terrible UX - users see technical JSON instead of a clean error message.

## My Thinking

The `graphql-request` library throws `ClientError` objects that contain the full request/response structure. The error's `.message` property includes the entire JSON stringified response, not just the GraphQL error message.

I needed to:
1. Extract the actual error message from the GraphQL response structure
2. Handle edge cases gracefully (non-GraphQL errors, network errors, etc.)
3. Make this reusable across all pages that make GraphQL requests

## Solution

### 1. Created `extractGraphQLError()` helper

Added to `frontend/src/services/graphql.ts`:

```typescript
export function extractGraphQLError(error: unknown): string {
  // Handle graphql-request ClientError
  if (error instanceof ClientError) {
    const gqlErrors = error.response?.errors;
    if (gqlErrors && gqlErrors.length > 0) {
      return gqlErrors[0].message;
    }
  }
  // ... fallback handling
}
```

### 2. Updated Login and Register pages

Both pages now use `extractGraphQLError(err)` instead of `err.message` in their catch blocks.

### 3. Pre-filled development credentials

In development mode (`import.meta.env.DEV`), forms now pre-fill with:
- Email: `test@example.com`
- Password: `password123`
- Name: `Test User` (register only)

This speeds up development testing significantly.

## Trade-offs

**Pros:**
- Clean, user-friendly error messages
- Faster development workflow with pre-filled forms
- Centralized error extraction logic (DRY)

**Cons:**
- Pre-filled credentials could be a security concern if accidentally shipped to production (mitigated by checking `import.meta.env.DEV`)
- Only extracts first error message (usually sufficient for auth flows)

## Files Changed

- `frontend/src/services/graphql.ts` - Added `extractGraphQLError()` helper
- `frontend/src/pages/LoginPage.tsx` - Use helper, add dev defaults
- `frontend/src/pages/RegisterPage.tsx` - Use helper, add dev defaults
