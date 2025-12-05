# The Power of Swappable Adapters

The magic of adapters is that they can be **swapped** without changing business logic.

## Adapter Swapping

```mermaid
flowchart TB
    subgraph UseCase["Use Case (unchanged)"]
        UC["UserUseCase"]
    end

    subgraph Dev["Development"]
        SQLite["SQLite Adapter"]
    end

    subgraph Prod["Production"]
        PG["PostgreSQL Adapter"]
    end

    subgraph Test["Testing"]
        Mem["In-Memory Adapter"]
    end

    UC -->|"dev"| SQLite
    UC -->|"prod"| PG
    UC -->|"test"| Mem

    style UseCase fill:#90EE90,stroke:#333
    style Dev fill:#87CEEB,stroke:#333
    style Prod fill:#DDA0DD,stroke:#333
    style Test fill:#FFD700,stroke:#333
```

```go
// In main.go, just swap the adapter:

// Development: SQLite
userRepo := sqlite.NewUserRepository(sqliteDB)

// Production: PostgreSQL
userRepo := postgres.NewUserRepository(pgPool)

// Testing: In-memory
userRepo := memory.NewUserRepository()

// The rest of your code doesn't change!
userService := usecases.NewUserService(userRepo)
```

## Adapter Responsibilities

| Do This | Don't Do This |
|---------|---------------|
| Translate data formats | Contain business logic |
| Handle infrastructure errors | Make business decisions |
| Map to/from domain types | Validate business rules |
| Deal with protocols | Know about other adapters |