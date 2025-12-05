# The Complete Picture

## Sam's Scenario

After weeks of refactoring BookShelf with Alex's guidance, Sam wanted to understand how everything fit together. "Let's trace a complete request," Alex suggested. "When a user borrows a book through your API, how does the request flow through all the layers?"

Sam pulled up his architecture diagram. "It starts with an HTTP request, goes through my handler adapter, calls the BorrowBook use case, which uses the domain entities and calls repository ports, which are implemented by my PostgreSQL adapters."

"Exactly!" Alex said. "Let's walk through it step by step so you can see how hexagonal architecture orchestrates all these components."

## Tracing a Request Through BookShelf

Let's trace a complete request through a Hexagonal Architecture application to see how all the pieces work together.

## End-to-End Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant HTTP as HTTP Handler
    participant UC as BorrowBookUseCase
    participant Book as Book Entity
    participant BookRepo as BookRepository
    participant LoanRepo as LoanRepository
    participant Notifier as NotificationSender
    participant DB as PostgreSQL
    participant Email as Email Service

    Client->>HTTP: POST /loans {"user_id": "user-123", "book_id": "book-456"}
    HTTP->>HTTP: Parse JSON, validate HTTP

    HTTP->>UC: BorrowBook(input)
    UC->>BookRepo: FindByID("book-456")
    BookRepo->>DB: SELECT * FROM books WHERE id = ?
    DB-->>BookRepo: book data
    BookRepo-->>UC: book

    UC->>Book: book.IsAvailable()
    Book-->>UC: true

    UC->>Book: NewLoan("user-123", "book-456", dueDate)
    Book->>Book: Validate, generate ID
    Book-->>UC: loan

    UC->>LoanRepo: Save(loan)
    LoanRepo->>DB: INSERT INTO loans...
    DB-->>LoanRepo: OK
    LoanRepo-->>UC: nil

    UC->>BookRepo: MarkAsUnavailable("book-456")
    BookRepo->>DB: UPDATE books SET available = false...
    DB-->>BookRepo: OK
    BookRepo-->>UC: nil

    UC->>Notifier: SendLoanConfirmation("user-123", "book-456")
    Notifier->>Email: Send email
    Email-->>Notifier: OK
    Notifier-->>UC: nil

    UC-->>HTTP: loan

    HTTP->>HTTP: Map to response
    HTTP-->>Client: 201 Created {"id": "loan-789", "due_date": "2024-02-15", ...}
```

## The Architecture Diagram

```mermaid
flowchart TB
    subgraph External["External World"]
        Client["HTTP Client"]
        DB[(PostgreSQL)]
        SMTP["SendGrid"]
    end

    subgraph Driving["Driving Adapters"]
        HTTP["HTTP Handler<br/>(adapters/http)"]
    end

    subgraph Application["Application Layer"]
        UC["UserUseCase<br/>(application/usecases)"]
        Ports["UserService Port<br/>(application/ports)"]
    end

    subgraph Domain["Domain Layer"]
        Entity["User Entity<br/>(domain/entities)"]
        RepoPort["UserRepository Port<br/>(domain/repositories)"]
        EmailPort["EmailSender Port<br/>(domain/ports)"]
    end

    subgraph Driven["Driven Adapters"]
        PGRepo["PostgresRepository<br/>(adapters/db/postgres)"]
        SGEmail["SendGridSender<br/>(adapters/email/sendgrid)"]
    end

    Client --> HTTP
    HTTP -.->|implements| Ports
    HTTP --> UC
    UC --> Entity
    UC --> RepoPort
    UC --> EmailPort
    PGRepo -.->|implements| RepoPort
    SGEmail -.->|implements| EmailPort
    PGRepo --> DB
    SGEmail --> SMTP

    style Domain fill:#90EE90,stroke:#333
    style Application fill:#FFD700,stroke:#333
    style Driving fill:#87CEEB,stroke:#333
    style Driven fill:#DDA0DD,stroke:#333
```

## Dependency Wiring (main.go)

```go
func main() {
    // 1. Load configuration
    cfg, err := config.Load()
    if err != nil {
        log.Fatal(err)
    }

    // 2. Create infrastructure
    db, err := pgxpool.New(context.Background(), cfg.Database.URL)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

    // 3. Create driven adapters (outbound)
    userRepo := postgres.NewUserRepository(db)
    emailSender := sendgrid.NewEmailSender(cfg.Email.APIKey, cfg.Email.From)

    // 4. Create domain services
    authService := services.NewAuthService(cfg.Auth.JWTSecret)

    // 5. Create use cases
    userUseCase := usecases.NewUserUseCase(userRepo, emailSender, logger)

    // 6. Create driving adapters (inbound)
    userHandler := http.NewUserHandler(userUseCase, authService)

    // 7. Create router and start server
    router := http.NewRouter(userHandler)

    log.Printf("Server starting on %s", cfg.Server.Addr())
    if err := router.ListenAndServe(cfg.Server.Addr()); err != nil {
        log.Fatal(err)
    }
}
```

## How Each Layer Communicates

| From | To | Via | Direction |
|------|-----|-----|-----------|
| HTTP Handler | Use Case | Driving Port interface | Inbound |
| Use Case | Entity | Direct import | Internal |
| Use Case | Repository | Driven Port interface | Outbound |
| Repository | Database | Database driver | External |

## The Key Insight

The domain and use cases have **no idea**:
- That HTTP is being used (could be CLI, GraphQL, gRPC)
- That PostgreSQL stores the data (could be MongoDB, SQLite)
- That email notifications are sent (could be SMS, push notifications)

This ignorance is the source of the architecture's power.

## Sam's Insight

"I get it now!" Sam exclaimed. "My BorrowBook use case doesn't know about HTTP status codes, SQL queries, or email APIs. It just knows about books, users, loans, and ports. When Maya asks for a mobile app, I just add a new driving adapter. When Chen needs on-premise deployment, I swap the PostgreSQL adapter for a different database adapter. The core business logic stays the same!"

Alex nodded. "That's hexagonal architecture in action. The center holds your valuable business logic, and the edges are swappable adapters. You've built a system that can evolve without rewriting the core."
