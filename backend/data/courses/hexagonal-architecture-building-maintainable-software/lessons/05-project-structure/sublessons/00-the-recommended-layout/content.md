# The Recommended Layout

A well-organized project structure makes Hexagonal Architecture visible and maintainable. Here's the recommended layout for Go projects.

## Project Structure Overview

```mermaid
flowchart TB
    subgraph Root["myapp/"]
        cmd["cmd/<br/>Entry points"]
        internal["internal/<br/>Private packages"]
        pkg["pkg/<br/>Public packages"]
    end

    subgraph Internal["internal/"]
        domain["domain/<br/>Business logic"]
        application["application/<br/>Use cases"]
        adapters["adapters/<br/>Infrastructure"]
        config["config/<br/>Configuration"]
    end

    subgraph Domain["domain/"]
        entities["entities/"]
        services["services/"]
        repositories["repositories/<br/>(interfaces only)"]
    end

    subgraph Adapters["adapters/"]
        http["http/<br/>REST handlers"]
        graphql["graphql/<br/>Resolvers"]
        db["db/<br/>Database repos"]
        email["email/<br/>Email senders"]
    end

    style domain fill:#90EE90,stroke:#333
    style application fill:#FFD700,stroke:#333
    style adapters fill:#87CEEB,stroke:#333
```

## Complete Directory Structure

```
myapp/
├── cmd/
│   ├── api/
│   │   └── main.go           # HTTP API entry point
│   └── cli/
│       └── main.go           # CLI tool entry point
├── internal/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── user.go
│   │   │   ├── order.go
│   │   │   └── errors.go
│   │   ├── services/
│   │   │   └── auth.go
│   │   └── repositories/
│   │       ├── user.go       # Interface only
│   │       └── order.go      # Interface only
│   ├── application/
│   │   ├── ports/
│   │   │   └── services.go   # Driving port interfaces
│   │   └── usecases/
│   │       ├── user.go
│   │       └── order.go
│   ├── adapters/
│   │   ├── http/
│   │   │   ├── router.go
│   │   │   ├── user_handler.go
│   │   │   └── middleware.go
│   │   ├── graphql/
│   │   │   ├── schema.go
│   │   │   └── resolvers.go
│   │   └── db/
│   │       ├── postgres/
│   │       │   └── user_repo.go
│   │       └── sqlite/
│   │           └── user_repo.go
│   └── config/
│       └── config.go
├── pkg/                       # Public shared packages
│   └── validator/
├── go.mod
└── go.sum
```

## Layer Responsibilities

| Layer | Location | Contains | Depends On |
|-------|----------|----------|------------|
| **Domain** | `internal/domain/` | Entities, domain services, repository interfaces | Nothing |
| **Application** | `internal/application/` | Use cases, driving port interfaces | Domain |
| **Adapters** | `internal/adapters/` | HTTP handlers, DB repos, API clients | Application, Domain |
| **Config** | `internal/config/` | Configuration loading, environment parsing | Nothing |
| **Entry Points** | `cmd/` | Main functions, dependency wiring | All layers |

## Why This Structure?

```mermaid
flowchart LR
    subgraph Benefits["Benefits"]
        B1["Clear ownership"]
        B2["Easy navigation"]
        B3["Dependency enforcement"]
        B4["Team scalability"]
    end

    B1 --- B2 --- B3 --- B4

    style Benefits fill:#90EE90,stroke:#333
```

- **Clear ownership**: Each directory has a single responsibility
- **Easy navigation**: New developers find code quickly
- **Dependency enforcement**: `internal/` prevents external imports
- **Team scalability**: Teams can own different layers
