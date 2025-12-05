# The Complete Picture

Let's trace a complete request through a Hexagonal Architecture application to see how all the pieces work together.

## End-to-End Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant HTTP as HTTP Handler
    participant UC as CreateUserUseCase
    participant Entity as User Entity
    participant Repo as UserRepository
    participant Email as EmailSender
    participant DB as Database
    participant SMTP as Email Service

    Client->>HTTP: POST /users {"name": "John", "email": "john@example.com"}
    HTTP->>HTTP: Parse JSON, validate HTTP

    HTTP->>UC: CreateUser(input)
    UC->>Repo: FindByEmail("john@example.com")
    Repo->>DB: SELECT * FROM users WHERE email = ?
    DB-->>Repo: No rows
    Repo-->>UC: nil, ErrUserNotFound

    UC->>Entity: NewUser("John", "john@example.com")
    Entity->>Entity: Validate, generate ID
    Entity-->>UC: user

    UC->>Repo: Save(user)
    Repo->>DB: INSERT INTO users...
    DB-->>Repo: OK
    Repo-->>UC: nil

    UC->>Email: SendWelcomeEmail("john@example.com", "John")
    Email->>SMTP: Send email
    SMTP-->>Email: OK
    Email-->>UC: nil

    UC-->>HTTP: user

    HTTP->>HTTP: Map to response
    HTTP-->>Client: 201 Created {"id": "...", "name": "John", ...}
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
- That SendGrid sends emails (could be SES, SMTP)

This ignorance is the source of the architecture's power.
