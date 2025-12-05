# What Are Ports?

## Sam's Scenario: The Interface Revelation

"Okay, so I need to separate my business logic from the infrastructure," Sam said, opening BookShelf's codebase. "But how? Where do I even start?"

Alex pulled up the loan creation code. "See this direct database call? Instead of calling SQLite directly, what if your loan logic just called an interface called 'LoanRepository'? It doesn't care if it's SQLite, Oracle, or a test mock—it just needs something that can save and retrieve loans."

"An interface..." Sam's eyes widened. "So ports are just Go interfaces?"

"Exactly! Ports are the **interfaces** that define how your application communicates with the outside world. They're the 'contract' between your business logic and everything else."

## The Port Concept

```mermaid
flowchart TB
    subgraph External["External World"]
        Users["Users"]
        DB[(Database)]
        Email["Email Service"]
    end

    subgraph App["Your Application"]
        subgraph Ports["Ports (Interfaces)"]
            DP["Driving Ports<br/>'What I Can Do'"]
            DrP["Driven Ports<br/>'What I Need'"]
        end

        subgraph Core["Domain Core"]
            Logic["Business Logic"]
        end
    end

    Users -->|"uses"| DP
    DP --> Core
    Core --> DrP
    DrP -->|"uses"| DB
    DrP -->|"uses"| Email

    style Ports fill:#FFD700,stroke:#333
    style Core fill:#90EE90,stroke:#333
```

## Think of Ports as Electrical Outlets

Just like a wall outlet:
- Defines a **standard interface** (the shape of the plug)
- **Doesn't care** what's plugged in (lamp, phone, laptop)
- **Abstracts** the complexity behind it (power grid, transformers)

```mermaid
flowchart LR
    subgraph Analogy["Real World Analogy"]
        Outlet["Wall Outlet<br/>(Port)"]
        Lamp["Lamp<br/>(Adapter 1)"]
        Phone["Phone<br/>(Adapter 2)"]
        Laptop["Laptop<br/>(Adapter 3)"]
    end

    Lamp --> Outlet
    Phone --> Outlet
    Laptop --> Outlet

    style Outlet fill:#FFD700,stroke:#333
```

## Ports in Code

In Go, ports are simply **interfaces**:

```go
// A Driving Port - what BookShelf offers
type LoanService interface {
    CreateLoan(ctx context.Context, input CreateLoanInput) (*Loan, error)
    GetLoan(ctx context.Context, id string) (*Loan, error)
    ReturnBook(ctx context.Context, loanID string) error
}

// A Driven Port - what BookShelf needs
type BookRepository interface {
    Save(ctx context.Context, book *Book) error
    FindByISBN(ctx context.Context, isbn string) (*Book, error)
    FindByTitle(ctx context.Context, title string) ([]*Book, error)
}
```

## Two Types of Ports

| Type | Direction | Question It Answers | BookShelf Examples |
|------|-----------|---------------------|---------|
| **Driving Port** | Inbound | "What can this app do?" | LoanService, BookService |
| **Driven Port** | Outbound | "What does this app need?" | BookRepository, EmailNotifier |

## Why Ports Matter

```mermaid
flowchart TB
    subgraph Without["Without Ports"]
        Handler1["HTTP Handler"] --> DB1[(Database)]
        Handler1 --> Email1["SMTP"]
    end

    subgraph With["With Ports"]
        Handler2["HTTP Handler"] --> Port1["UserService"]
        Port1 --> Port2["UserRepository"]
        Port2 --> DB2[(Database)]
    end

    style Without fill:#f99,stroke:#333
    style With fill:#9f9,stroke:#333
```

Ports provide:
- **Abstraction** - hide implementation details
- **Testability** - mock the interfaces easily
- **Flexibility** - swap implementations without changing logic
- **Documentation** - interfaces describe capabilities

## Sam's Insight

"I get it now!" Sam said, typing rapidly. "My `CreateLoan` use case doesn't call SQLite directly—it calls the `BookRepository` interface. I can have a `SQLiteBookRepository` for development, an `OracleBookRepository` for Chen's enterprise deployment, and an `InMemoryBookRepository` for testing. The loan logic never changes!"

Alex nodded approvingly. "Now you're thinking in ports. The interface is the boundary, the contract. Everything on the BookShelf side of that boundary is pure business logic. Everything on the other side is infrastructure that can be swapped at will."
