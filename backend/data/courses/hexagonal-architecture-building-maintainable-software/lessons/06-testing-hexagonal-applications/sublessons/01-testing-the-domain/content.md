# Testing the Domain

## Sam's Scenario

Sam was adding a new feature to BookShelf: preventing users from borrowing more than 3 books at once. He wrote the validation logic in his Book entity, but without tests, he wasn't sure it worked correctly. Alex showed him how to test domain entities in isolation.

"Domain tests are the easiest," Alex explained. "No database, no HTTP, no mocks. Just pure business logic. Let me show you how to test your Book and Loan entities."

## Pure Unit Tests - No Mocks Needed

Domain tests are pure unit tests - no mocks needed!

```go
func TestNewBook_ValidInput(t *testing.T) {
    book, err := entities.NewBook("Clean Code", "Robert Martin", "9780132350884")

    assert.NoError(t, err)
    assert.Equal(t, "Clean Code", book.Title)
    assert.Equal(t, "Robert Martin", book.Author)
    assert.NotEmpty(t, book.ID)
}

func TestNewBook_InvalidISBN(t *testing.T) {
    _, err := entities.NewBook("Clean Code", "Robert Martin", "invalid")

    assert.ErrorIs(t, err, entities.ErrInvalidISBN)
}

func TestLoan_CalculateLateFee(t *testing.T) {
    loan := &entities.Loan{
        BookID:   "book-123",
        UserID:   "user-456",
        DueDate:  time.Now().Add(-5 * 24 * time.Hour), // 5 days overdue
    }

    fee := loan.CalculateLateFee()

    assert.Equal(t, int64(250), fee) // $2.50 (50 cents per day)
}

func TestUser_CanBorrow_UnderLimit(t *testing.T) {
    user := &entities.User{
        ID:           "user-123",
        ActiveLoans:  2,
    }

    canBorrow := user.CanBorrow()

    assert.True(t, canBorrow)
}

func TestUser_CanBorrow_AtLimit(t *testing.T) {
    user := &entities.User{
        ID:           "user-123",
        ActiveLoans:  3,
    }

    canBorrow := user.CanBorrow()

    assert.False(t, canBorrow)
}
```

These tests run in **milliseconds** with no external dependencies!

## Sam's Insight

"These tests are amazing!" Sam exclaimed after running his first domain test suite. "All 15 tests ran in 3 milliseconds. I can test every edge case for late fees, borrowing limits, and ISBN validation without touching a database."

Alex smiled. "That's the power of keeping your domain pure. These tests will run thousands of times a day in CI, catching bugs before they reach production."