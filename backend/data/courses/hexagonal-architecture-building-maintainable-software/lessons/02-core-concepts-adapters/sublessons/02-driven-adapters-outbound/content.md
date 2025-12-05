# Driven Adapters (Outbound)

## Sam's Scenario: The Database Implementation

"Now for the other side," Sam said. "My use case calls `bookRepo.Save(book)`. That's the port. But I need an actual implementation that talks to SQLite. That's a driven adapter, right?"

"Exactly!" Alex confirmed. "Your `SQLiteBookRepository` is a driven adapter. It implements the `BookRepository` port and contains all the SQLite-specific code—SQL queries, connection handling, error mapping. Your use case just calls the interface and doesn't care about the implementation details."

**What they do:** Implement the interfaces your domain needs, connecting to real infrastructure.

## Driven Adapter Implementation

```mermaid
classDiagram
    class UserRepository {
        <<interface>>
        +Save(ctx, user) error
        +FindByID(ctx, id) User
        +FindByEmail(ctx, email) User
    }

    class SQLiteUserRepository {
        -db *sql.DB
        +Save(ctx, user) error
        +FindByID(ctx, id) User
        +FindByEmail(ctx, email) User
    }

    class PostgresUserRepository {
        -pool *pgxpool.Pool
        +Save(ctx, user) error
        +FindByID(ctx, id) User
        +FindByEmail(ctx, email) User
    }

    class InMemoryUserRepository {
        -users map[string]*User
        +Save(ctx, user) error
        +FindByID(ctx, id) User
        +FindByEmail(ctx, email) User
    }

    UserRepository <|.. SQLiteUserRepository
    UserRepository <|.. PostgresUserRepository
    UserRepository <|.. InMemoryUserRepository

## Sam's Insight

"This is brilliant for testing!" Sam realized. "In my tests, I can use `InMemoryBookRepository`—no database needed, everything runs in milliseconds. In development, I use `SQLiteBookRepository`—easy setup, no server required. For Chen's production deployment, I use `OracleBookRepository`—enterprise-grade, meets their requirements."

Sam continued, "And the best part? My `CreateLoan` use case looks exactly the same in all three environments:

```go
func (uc *CreateLoanUseCase) Execute(ctx context.Context, input CreateLoanInput) (*Loan, error) {
    // This line works with ANY adapter that implements BookRepository!
    book, err := uc.bookRepo.FindByISBN(ctx, input.BookISBN)
    // ... business logic ...
}
```

The use case doesn't know or care which adapter is behind that interface!"
```

**Examples for BookShelf:**
- Database repositories (SQLite for dev, Oracle for Chen's enterprise)
- Email services (SMTP for dev, SendGrid for production)
- External API clients (ISBN validation service)
- File storage (local filesystem, S3 for book covers)

```go
// SQLite Adapter - implements BookRepository port
type SQLiteBookRepository struct {
    db *sql.DB
}

func (r *SQLiteBookRepository) Save(ctx context.Context, book *entities.Book) error {
    query := `INSERT INTO books (isbn, title, author, available) VALUES (?, ?, ?, ?)`
    _, err := r.db.ExecContext(ctx, query, book.ISBN, book.Title, book.Author, book.Available)
    return err
}

func (r *SQLiteBookRepository) FindByISBN(ctx context.Context, isbn string) (*entities.Book, error) {
    query := `SELECT isbn, title, author, available FROM books WHERE isbn = ?`

    var book entities.Book
    err := r.db.QueryRowContext(ctx, query, isbn).Scan(
        &book.ISBN, &book.Title, &book.Author, &book.Available)

    if err == sql.ErrNoRows {
        return nil, entities.ErrBookNotFound
    }
    return &book, err
}

func (r *SQLiteBookRepository) FindByTitle(ctx context.Context, title string) ([]*entities.Book, error) {
    query := `SELECT isbn, title, author, available FROM books WHERE title LIKE ?`
    rows, err := r.db.QueryContext(ctx, query, "%"+title+"%")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var books []*entities.Book
    for rows.Next() {
        var book entities.Book
        if err := rows.Scan(&book.ISBN, &book.Title, &book.Author, &book.Available); err != nil {
            return nil, err
        }
        books = append(books, &book)
    }
    return books, nil
}
```