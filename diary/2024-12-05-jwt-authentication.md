# Diary Entry: JWT Authentication

**Date:** 2024-12-05
**Branch:** `feature/jwt-authentication`
**Status:** Complete (Backend)

---

## Summary

Implement JWT-based authentication as the foundational security layer for the Course Library system.

## Reason

Per the security-first requirements in `ai-new-feature.md`:
- Authentication must be implemented BEFORE any other features
- All API endpoints must require authentication from day one
- Security cannot be "bolted on later"

## Initial Design Approach

### Backend Components

1. **AuthService** (`domain/services/auth_service.go`)
   - Password hashing with bcrypt (cost factor 12)
   - JWT token generation (access + refresh tokens)
   - Token validation and refresh logic

2. **AuthMiddleware** (`adapters/http/auth_middleware.go`)
   - Extract Bearer token from Authorization header
   - Validate token and add user context
   - Provide helper functions for context extraction

3. **AuthUseCase** (`application/usecases/auth_usecase.go`)
   - Register: Create user with hashed password
   - Login: Verify credentials, return tokens
   - Refresh: Generate new token pair
   - GetCurrentUser: Return authenticated user

4. **GraphQL Schema Updates**
   - `register` mutation
   - `login` mutation
   - `refreshToken` mutation
   - `me` query (current user)

5. **Config Updates**
   - JWT_SECRET environment variable
   - Token TTL configuration

### Frontend Components

1. **Auth Context** - Global auth state management
2. **Login Page** - Email/password form
3. **Register Page** - Registration form
4. **Protected Routes** - Redirect unauthenticated users
5. **Token Storage** - Secure token handling

## Assumptions & Constraints

- Access tokens: 15 minute TTL
- Refresh tokens: 7 day TTL
- Passwords: Minimum 8 characters
- bcrypt cost factor: 12 (balance security/performance)
- Tokens stored in memory (not localStorage) for security

## Test Plan (TDD)

### Unit Tests - AuthService (8 tests - ALL PASS)
- [x] HashPassword returns different hash each time
- [x] VerifyPassword returns true for correct password
- [x] VerifyPassword returns false for wrong password
- [x] GenerateTokenPair returns valid tokens
- [x] ValidateToken returns claims for valid token
- [x] ValidateToken returns error for invalid token
- [x] ValidateToken returns error for wrong secret
- [x] RefreshTokens generates new pair from valid refresh token

### Unit Tests - AuthUseCase (6 tests - ALL PASS)
- [x] Register creates user with hashed password
- [x] Register fails for duplicate email
- [x] Login returns tokens for valid credentials
- [x] Login fails for wrong password
- [x] Login fails for non-existent user
- [x] RefreshToken generates new tokens

### Manual Integration Tests (ALL PASS)
- [x] Full registration flow via GraphQL
- [x] Full login flow via GraphQL
- [x] `me` query rejects unauthenticated requests
- [x] `me` query accepts valid token

---

## Implementation Notes

*Today was a good day. Followed TDD strictly - wrote tests first, watched them fail, then implemented the code.*

Started with the AuthService in the domain layer. The bcrypt cost factor of 12 feels right - fast enough for testing (about 0.18s per hash) but slow enough to make brute force attacks impractical. Each hash is salted, so the same password produces different hashes every time. I initially forgot that the golang-jwt library has breaking changes between v4 and v5 - had to use `jwt.RegisteredClaims` instead of `jwt.StandardClaims`.

The middleware was straightforward - Chi's middleware pattern is clean. I made a conscious decision to let requests through without a token (for public endpoints like `register` and `login`) rather than blocking them. The `me` query handles its own auth check in the resolver.

One gotcha that cost me 30 minutes: the mock repository in tests was storing pointers to user objects. When the use case cleared `user.Password = ""` after registration, it was clearing it from the stored object too! Fixed by storing a copy in the mock. This is why I always test Login after Register in the same test - it catches these subtle issues.

The ports/interfaces pattern is paying off. The GraphQL resolvers are now just thin wrappers that call the use case methods - exactly what Clean Architecture promises.

## Final Outcome

Backend JWT authentication is fully implemented and tested:

- **AuthService**: Password hashing (bcrypt), token generation (HS256 JWT), token validation, token refresh
- **AuthMiddleware**: Extracts Bearer token, validates, adds user to context
- **AuthUseCase**: Register, Login, RefreshToken, GetCurrentUser
- **GraphQL API**: `register`, `login`, `refreshToken` mutations and `me` query
- **Config**: `JWT_SECRET` environment variable (with dev default)

All 20 backend tests pass. Manual testing confirms the full flow works via GraphQL.

## Follow-up Actions

- [ ] Add rate limiting to auth endpoints
- [ ] Implement token blacklist for logout
- [ ] Add audit logging for auth events
