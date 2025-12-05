# Dependency Direction

The **Dependency Rule** is the most important principle in Hexagonal Architecture: dependencies always point **inward**, toward the domain.

## The Dependency Rule

```mermaid
flowchart TB
    subgraph Outer["Outer Layers"]
        Adapters["Adapters<br/>(HTTP, DB, Email)"]
    end

    subgraph Middle["Middle Layer"]
        Application["Application<br/>(Use Cases)"]
    end

    subgraph Inner["Inner Layer (Core)"]
        Domain["Domain<br/>(Entities, Services)"]
    end

    Adapters -->|"depends on"| Application
    Application -->|"depends on"| Domain
    Domain -->|"depends on"| Nothing["Nothing"]

    style Inner fill:#90EE90,stroke:#333
    style Middle fill:#FFD700,stroke:#333
    style Outer fill:#87CEEB,stroke:#333
```

## What This Means in Code

```go
// ❌ WRONG: Domain imports adapter
package entities

import "database/sql"  // Domain knows about infrastructure!

type User struct {
    db *sql.DB  // Domain holds infrastructure reference
}

// ✅ CORRECT: Adapter imports domain
package postgres

import "myapp/internal/domain/entities"  // Adapter knows domain

type UserRepository struct {
    db *sql.DB
}

func (r *UserRepository) Save(ctx context.Context, user *entities.User) error {
    // Adapter translates domain to infrastructure
}
```

## Import Rules

```mermaid
flowchart LR
    subgraph Allowed["Allowed Imports"]
        A1["adapters → application"]
        A2["adapters → domain"]
        A3["application → domain"]
        A4["cmd → everything"]
    end

    subgraph Forbidden["Forbidden Imports"]
        F1["domain → adapters"]
        F2["domain → application"]
        F3["application → adapters"]
    end

    style Allowed fill:#9f9,stroke:#333
    style Forbidden fill:#f99,stroke:#333
```

## Enforcing with Go Package Structure

```go
// internal/domain/entities/user.go
package entities

// NO imports from adapters or application!
// Only standard library and domain packages

type User struct {
    ID    string
    Name  string
    Email string
}

// internal/domain/repositories/user.go
package repositories

import "myapp/internal/domain/entities"

// Interface defined in domain - implemented by adapters
type UserRepository interface {
    Save(ctx context.Context, user *entities.User) error
    FindByID(ctx context.Context, id string) (*entities.User, error)
}

// internal/adapters/db/postgres/user_repo.go
package postgres

import (
    "myapp/internal/domain/entities"
    "myapp/internal/domain/repositories"
    "github.com/jackc/pgx/v5/pgxpool"  // Infrastructure dependency
)

// Adapter implements domain interface
type UserRepository struct {
    db *pgxpool.Pool
}

// Compile-time check: ensure interface is implemented
var _ repositories.UserRepository = (*UserRepository)(nil)
```

## Dependency Inversion in Practice

```mermaid
flowchart TB
    subgraph Traditional["Traditional (Wrong)"]
        UC1["Use Case"]
        Repo1["PostgresRepo"]
        UC1 -->|"creates"| Repo1
    end

    subgraph Inverted["Inverted (Correct)"]
        UC2["Use Case"]
        Interface["Repository Interface"]
        Repo2["PostgresRepo"]
        UC2 -->|"depends on"| Interface
        Repo2 -.->|"implements"| Interface
    end

    style Traditional fill:#f99,stroke:#333
    style Inverted fill:#9f9,stroke:#333
```

The use case depends on the **interface** (abstraction), not the concrete implementation.

## Linting Dependencies

You can use tools like `go-arch` or custom scripts to enforce:

```go
// scripts/check-deps.go
// Fails if domain imports from adapters

forbiddenImports := map[string][]string{
    "internal/domain": {
        "internal/adapters",
        "internal/application",
        "database/sql",
        "net/http",
    },
    "internal/application": {
        "internal/adapters",
    },
}
```

## Summary

| Layer | Can Import | Cannot Import |
|-------|-----------|---------------|
| **Domain** | Standard library only | Adapters, Application, Infrastructure |
| **Application** | Domain | Adapters, Infrastructure |
| **Adapters** | Application, Domain, Infrastructure | - |
| **Cmd** | All layers | - |
