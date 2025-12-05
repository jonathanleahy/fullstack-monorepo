# What Are Adapters?

## Sam's Scenario: Making It Real

"Okay, I've defined all my ports," Sam said, looking at the interface definitions. "But these are just contracts. How do I actually save a book to SQLite? How do I actually send an email? That's where adapters come in, right?"

"Exactly!" Alex confirmed. "Ports are the 'what'—the contract. Adapters are the 'how'—the actual implementation. Your `BookRepository` port says 'I need to save books.' Your `SQLiteBookRepository` adapter says 'here's how to save books to SQLite.'"

If ports are the interfaces (contracts), adapters are the **concrete implementations** that fulfill those contracts. They bridge the gap between your application and the outside world.

## The Adapter Concept

```mermaid
flowchart TB
    subgraph External["External World"]
        HTTP["HTTP Request"]
        PG[(PostgreSQL)]
        SG["SendGrid API"]
    end

    subgraph Adapters["Adapters (Implementations)"]
        HA["HTTP Handler<br/>(Driving Adapter)"]
        PA["PostgreSQL Repo<br/>(Driven Adapter)"]
        EA["SendGrid Client<br/>(Driven Adapter)"]
    end

    subgraph Ports["Ports (Interfaces)"]
        US["UserService"]
        UR["UserRepository"]
        ES["EmailSender"]
    end

    HTTP --> HA
    HA -.->|implements| US
    PA -.->|implements| UR
    EA -.->|implements| ES
    PA --> PG
    EA --> SG

    style Adapters fill:#87CEEB,stroke:#333
    style Ports fill:#FFD700,stroke:#333
```

## Real-World Analogy

Think of a power adapter for international travel:

```mermaid
flowchart LR
    subgraph Device["Your Device"]
        US_Plug["US Plug<br/>(Standard Interface)"]
    end

    subgraph Adapter["Travel Adapter"]
        Convert["Converts<br/>US → UK"]
    end

    subgraph Wall["UK Wall"]
        UK_Outlet["UK Outlet<br/>(External System)"]
    end

    US_Plug --> Convert --> UK_Outlet

    style Adapter fill:#FFD700,stroke:#333
```

The adapter:
- **Knows** both the interface your device expects AND the external system
- **Translates** between the two formats
- **Isolates** your device from knowing about UK outlets

## Adapters in Code

```go
// Port (Interface) - The contract
type BookRepository interface {
    Save(ctx context.Context, book *Book) error
    FindByISBN(ctx context.Context, isbn string) (*Book, error)
}

// Adapter (Implementation) - SQLite version for development
type SQLiteBookRepository struct {
    db *sql.DB
}

func (r *SQLiteBookRepository) Save(ctx context.Context, book *Book) error {
    query := `INSERT INTO books (isbn, title, author) VALUES (?, ?, ?)`
    _, err := r.db.ExecContext(ctx, query, book.ISBN, book.Title, book.Author)
    return err
}

func (r *SQLiteBookRepository) FindByISBN(ctx context.Context, isbn string) (*Book, error) {
    query := `SELECT isbn, title, author FROM books WHERE isbn = ?`
    row := r.db.QueryRowContext(ctx, query, isbn)

    var book Book
    err := row.Scan(&book.ISBN, &book.Title, &book.Author)
    return &book, err
}

// Another Adapter - Oracle version for Chen's enterprise deployment
type OracleBookRepository struct {
    db *sql.DB
}

func (r *OracleBookRepository) Save(ctx context.Context, book *Book) error {
    query := `INSERT INTO books (isbn, title, author) VALUES (:1, :2, :3)`
    _, err := r.db.ExecContext(ctx, query, book.ISBN, book.Title, book.Author)
    return err
}

func (r *OracleBookRepository) FindByISBN(ctx context.Context, isbn string) (*Book, error) {
    // Oracle-specific implementation
    // Same interface, different database!
    // ...
}
```

## Two Types of Adapters

```mermaid
flowchart LR
    subgraph Driving["Driving Adapters"]
        direction TB
        D1["HTTP Handler"]
        D2["GraphQL Resolver"]
        D3["CLI Command"]
        D4["Queue Consumer"]
    end

    subgraph Core["Application Core"]
        Ports["Ports"]
    end

    subgraph Driven["Driven Adapters"]
        direction TB
        Dr1["PostgreSQL Repo"]
        Dr2["Redis Cache"]
        Dr3["SendGrid Client"]
        Dr4["S3 Storage"]
    end

    Driving -->|"calls"| Core
    Core -->|"uses"| Driven

    style Driving fill:#87CEEB,stroke:#333
    style Driven fill:#DDA0DD,stroke:#333
```

| Type | Direction | Purpose | Examples |
|------|-----------|---------|----------|
| **Driving** | Inbound | Receive external input | HTTP handlers, CLI, GraphQL |
| **Driven** | Outbound | Access external resources | Database repos, API clients |

## Key Adapter Responsibilities

| Do This | Don't Do This |
|---------|---------------|
| Translate data formats | Contain business logic |
| Handle protocol details | Make business decisions |
| Map to/from domain types | Validate business rules |
| Deal with external errors | Know about other adapters |
| Configure connections | Store business state |

## Sam's Insight

"This is the missing piece!" Sam exclaimed. "I have one `BookRepository` interface, but I can create multiple adapters:
- `SQLiteBookRepository` for my development machine
- `OracleBookRepository` for Chen's enterprise deployment
- `InMemoryBookRepository` for testing

They all implement the same interface, so my business logic doesn't change. I just swap which adapter gets injected. The power is in the separation!"

Alex nodded. "Now you're seeing the full picture. Ports define the contract, adapters fulfill it. Your loan creation logic calls `bookRepo.Save(book)` and doesn't care which adapter is behind that interface."
