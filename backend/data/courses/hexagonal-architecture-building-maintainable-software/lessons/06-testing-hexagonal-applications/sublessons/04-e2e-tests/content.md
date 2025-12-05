# End-to-End Tests

## Sam's Scenario

Sam had unit tests, use case tests, and integration tests all passing. But he wanted one final safety net: an end-to-end test that verified the complete user journey from HTTP request to database and back.

"E2E tests are your highest confidence tests," Alex explained. "They test the entire stack - HTTP handling, use cases, database, everything. They're slower and more brittle, so you only write them for critical user flows. For BookShelf, let's test the complete borrow-and-return flow."

## Testing the Full Stack

End-to-end tests verify complete user flows through HTTP:

```go
func TestBorrowAndReturnBook_E2E(t *testing.T) {
    // Start test server with real dependencies
    server := setupTestServer(t)
    defer server.Close()

    // Step 1: Create a book
    bookResp := createBook(t, server.URL, Book{
        Title:  "Clean Code",
        Author: "Robert Martin",
        ISBN:   "9780132350884",
    })
    bookID := bookResp.ID

    // Step 2: Create a user
    userResp := createUser(t, server.URL, User{
        Name:  "Alice",
        Email: "alice@example.com",
    })
    userID := userResp.ID

    // Step 3: Borrow the book
    borrowResp, err := http.Post(
        server.URL+"/loans",
        "application/json",
        strings.NewReader(fmt.Sprintf(`{"user_id":"%s","book_id":"%s"}`, userID, bookID)),
    )
    require.NoError(t, err)
    assert.Equal(t, http.StatusCreated, borrowResp.StatusCode)

    var loan LoanResponse
    json.NewDecoder(borrowResp.Body).Decode(&loan)
    assert.NotEmpty(t, loan.ID)
    assert.Equal(t, bookID, loan.BookID)
    assert.Equal(t, userID, loan.UserID)

    // Step 4: Verify book is unavailable
    bookCheckResp, _ := http.Get(server.URL + "/books/" + bookID)
    var updatedBook BookResponse
    json.NewDecoder(bookCheckResp.Body).Decode(&updatedBook)
    assert.False(t, updatedBook.Available, "book should be unavailable after borrowing")

    // Step 5: Return the book
    returnResp, err := http.Post(
        server.URL+"/loans/"+loan.ID+"/return",
        "application/json",
        nil,
    )
    require.NoError(t, err)
    assert.Equal(t, http.StatusOK, returnResp.StatusCode)

    // Step 6: Verify book is available again
    finalBookResp, _ := http.Get(server.URL + "/books/" + bookID)
    var finalBook BookResponse
    json.NewDecoder(finalBookResp.Body).Decode(&finalBook)
    assert.True(t, finalBook.Available, "book should be available after return")
}

func TestBorrowBook_UserAtLimit_E2E(t *testing.T) {
    server := setupTestServer(t)
    defer server.Close()

    userID := createUser(t, server.URL, User{Name: "Bob", Email: "bob@example.com"}).ID

    // Borrow 3 books (the limit)
    for i := 0; i < 3; i++ {
        bookID := createBook(t, server.URL, Book{
            Title:  fmt.Sprintf("Book %d", i),
            Author: "Author",
            ISBN:   fmt.Sprintf("978000000000%d", i),
        }).ID

        borrowBook(t, server.URL, userID, bookID)
    }

    // Try to borrow a 4th book - should fail
    fourthBook := createBook(t, server.URL, Book{
        Title:  "Fourth Book",
        Author: "Author",
        ISBN:   "9780000000004",
    }).ID

    resp, _ := http.Post(
        server.URL+"/loans",
        "application/json",
        strings.NewReader(fmt.Sprintf(`{"user_id":"%s","book_id":"%s"}`, userID, fourthBook)),
    )

    assert.Equal(t, http.StatusBadRequest, resp.StatusCode)

    var errResp ErrorResponse
    json.NewDecoder(resp.Body).Decode(&errResp)
    assert.Contains(t, errResp.Message, "borrow limit reached")
}
```

## Test Server Setup

```go
func setupTestServer(t *testing.T) *httptest.Server {
    // Setup test database
    db := setupTestDB(t)

    // Create adapters
    bookRepo := postgres.NewBookRepository(db)
    userRepo := postgres.NewUserRepository(db)
    loanRepo := postgres.NewLoanRepository(db)
    notifier := memory.NewNotificationSender() // In-memory for tests

    // Create use cases
    borrowUseCase := usecases.NewBorrowBookUseCase(bookRepo, userRepo, loanRepo, notifier, logger)
    returnUseCase := usecases.NewReturnBookUseCase(bookRepo, loanRepo, logger)

    // Create HTTP handlers
    router := http.NewRouter(borrowUseCase, returnUseCase, bookRepo, userRepo)

    return httptest.NewServer(router)
}
```

## The Testing Pyramid

- **Many** domain unit tests (fast, isolated) - 70%
- **Some** use case tests with mocks - 20%
- **Few** adapter integration tests - 8%
- **Fewer** E2E tests - 2%

## Sam's Insight

Sam's first E2E test caught a critical bug: he forgot to mark books as unavailable after borrowing. The unit tests and use case tests all passed because they tested components in isolation, but the E2E test revealed the missing integration between BorrowBook and the book's availability status.

"E2E tests are slow - about 1 second each," Sam noted. "But they give me confidence that the entire system works together. I only have 5 E2E tests, but they cover my most critical flows: borrow, return, overdue notifications, and user limits."

Alex smiled. "Perfect. That's exactly the right balance. Fast feedback from unit tests, confidence from E2E tests, and the pyramid keeps your test suite maintainable."