# Diary Entry: Frontend Authentication

**Date:** 2024-12-05
**Branch:** `feature/frontend-auth`
**Status:** In Progress

---

## Summary

Building the frontend authentication layer to connect with the JWT backend we just implemented. This completes the auth feature end-to-end.

## My Thinking

*The backend auth is ready - register, login, refreshToken, and me query all work. Now I need to build the React side.*

*Looking at modern React patterns, I'll use Context + custom hooks for auth state management. The key decision is token storage - localStorage is convenient but vulnerable to XSS. I'll store the access token in memory (React state) and rely on token refresh for persistence. This means users get logged out on page refresh, but we can add silent refresh later.*

*For forms, I could use react-hook-form or just controlled components. Since we're using ShadCN UI, I'll keep it simple with controlled inputs and basic validation. We can add a form library later if complexity grows.*

## Trade-offs

- **Token in memory vs localStorage**: More secure but users lose session on refresh
- **Simple forms vs react-hook-form**: Less boilerplate now, might need to refactor later
- **No silent refresh yet**: Users see login screen after token expires

## Concerns

- Need to handle token expiration gracefully
- Protected routes should redirect to login smoothly
- Form validation should give good UX feedback

## Design Decisions

1. **AuthContext**: Global state for user, tokens, login/logout functions
2. **useAuth hook**: Access auth state from any component
3. **ProtectedRoute**: Wrapper that redirects unauthenticated users
4. **Apollo Client auth**: Add Authorization header via link

---

## Test Plan

- [ ] Login form validates inputs
- [ ] Login redirects to dashboard on success
- [ ] Login shows error on wrong credentials
- [ ] Register creates account and logs in
- [ ] Protected routes redirect to login
- [ ] Logout clears auth state

---

## Implementation Notes

**Files Created:**
- `frontend/src/types/auth.ts` - TypeScript types for auth (User, AuthPayload, AuthContextType)
- `frontend/src/contexts/AuthContext.tsx` - Auth context provider with login, register, logout, refreshToken
- `frontend/src/hooks/useAuth.ts` - Custom hook to access auth context (separated for react-refresh)
- `frontend/src/components/ProtectedRoute.tsx` - Wrapper that redirects unauthenticated users to /login
- `frontend/src/pages/LoginPage.tsx` - Email/password login form
- `frontend/src/pages/RegisterPage.tsx` - Name/email/password registration form with validation

**Files Modified:**
- `frontend/src/main.tsx` - Added AuthProvider wrapper
- `frontend/src/App.tsx` - Added public/protected routes
- `frontend/src/components/Layout.tsx` - Added login/logout UI based on auth state

**Key Decisions:**
- Used `graphql-request` directly instead of Apollo Client (simpler, already had it working)
- Stored refreshToken in localStorage, accessToken in React state (memory)
- Separated useAuth hook from context file to satisfy ESLint react-refresh rule
- Made HomePage public (no login required) per user request
- Login/Register pages don't use Layout component (cleaner auth flow)

## Final Outcome

Frontend authentication is complete:
- Users can register with name, email, password
- Users can log in with email/password
- Authenticated users see their name and logout button in nav
- Unauthenticated users see login/register links
- Protected routes (/users) redirect to login
- Public routes (/) accessible without login
- Session restored on page refresh via token refresh
- Build passes with no TypeScript or ESLint errors
