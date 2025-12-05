# Integration and E2E Tests

## Testing Adapters

Test adapters against real infrastructure (databases, APIs):

```go
func TestSQLiteUserRepository_Save(t *testing.T) {
    // Use test database
    db := setupTestDB(t)
    repo := sqlite.NewUserRepository(db)

    user, _ := entities.NewUser("John", "john@example.com")

    err := repo.Save(context.Background(), user)

    assert.NoError(t, err)

    // Verify in database
    found, err := repo.FindByID(context.Background(), user.ID)
    assert.NoError(t, err)
    assert.Equal(t, user.Email, found.Email)
}
```

## End-to-End Tests

Test the full flow through HTTP:

```go
func TestCreateUser_HTTP(t *testing.T) {
    // Start test server with real dependencies
    server := setupTestServer(t)

    resp, err := http.Post(
        server.URL+"/users",
        "application/json",
        strings.NewReader(`{"name":"John","email":"john@example.com"}`),
    )

    assert.NoError(t, err)
    assert.Equal(t, http.StatusCreated, resp.StatusCode)
}
```

## The Testing Pyramid

- **Many** domain unit tests (fast, isolated)
- **Some** use case tests with mocks
- **Few** adapter integration tests
- **Fewer** E2E tests