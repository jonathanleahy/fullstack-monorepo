# The Testing Pyramid

The testing pyramid is a strategy for organizing tests by scope and speed. Hexagonal Architecture makes each level easier to implement.

## The Pyramid

```mermaid
flowchart TB
    subgraph Pyramid["Testing Pyramid"]
        E2E["E2E Tests<br/>(Few, Slow, High Confidence)"]
        Integration["Integration Tests<br/>(Some, Medium Speed)"]
        UseCase["Use Case Tests<br/>(More, Fast)"]
        Unit["Domain Unit Tests<br/>(Many, Very Fast)"]
    end

    E2E --> Integration
    Integration --> UseCase
    UseCase --> Unit

    style E2E fill:#f99,stroke:#333,stroke-width:1px
    style Integration fill:#FFD700,stroke:#333,stroke-width:2px
    style UseCase fill:#87CEEB,stroke:#333,stroke-width:3px
    style Unit fill:#90EE90,stroke:#333,stroke-width:4px
```

## Test Types in Hexagonal Architecture

| Level | What It Tests | Dependencies | Speed | Count |
|-------|---------------|--------------|-------|-------|
| **Unit** | Domain entities & services | None | ~1ms | Many |
| **Use Case** | Business logic orchestration | Mocks | ~10ms | More |
| **Integration** | Adapters + infrastructure | Real DB/services | ~100ms | Some |
| **E2E** | Full system flow | Everything | ~1s+ | Few |

## How Hex Arch Enables the Pyramid

```mermaid
flowchart TB
    subgraph Traditional["Traditional Architecture"]
        T1["All tests need DB"]
        T2["Tests are slow"]
        T3["Tests are flaky"]
        T4["Low coverage"]
    end

    subgraph Hex["Hexagonal Architecture"]
        H1["Domain tests: no deps"]
        H2["Use case tests: mocks"]
        H3["Integration: isolated"]
        H4["High coverage, fast"]
    end

    Traditional -->|"Migrate to"| Hex

    style Traditional fill:#f99,stroke:#333
    style Hex fill:#9f9,stroke:#333
```

## Real-World Test Distribution

A well-structured project might have:

```
tests/
├── unit/           (70% of tests)
│   ├── entities/
│   │   ├── user_test.go
│   │   └── order_test.go
│   └── services/
│       └── pricing_test.go
├── usecase/        (20% of tests)
│   ├── create_user_test.go
│   └── place_order_test.go
├── integration/    (8% of tests)
│   ├── postgres_repo_test.go
│   └── email_sender_test.go
└── e2e/            (2% of tests)
    └── api_test.go
```

## Test Execution Times

```mermaid
gantt
    title Test Execution Comparison
    dateFormat X
    axisFormat %L ms

    section Unit Tests
    100 entity tests    :0, 100

    section Use Case Tests
    50 use case tests   :0, 500

    section Integration
    20 adapter tests    :0, 2000

    section E2E
    5 full flow tests   :0, 5000
```

## The Confidence Trade-off

| More Unit Tests | More E2E Tests |
|-----------------|----------------|
| Fast feedback | High confidence |
| Easy to write | Catch integration issues |
| Catch logic bugs | Slow execution |
| Miss integration issues | Hard to debug |

The pyramid gives you the best of both: **high confidence with fast feedback**.

## When to Write Each Type

```mermaid
flowchart TD
    Start["New Feature"] --> Domain{"Business<br/>Logic?"}
    Domain -->|Yes| Unit["Write Unit Tests<br/>for entities/services"]
    Domain -->|No| Skip1["Skip unit tests"]

    Unit --> UseCase["Write Use Case Tests<br/>with mocks"]
    Skip1 --> UseCase

    UseCase --> NewAdapter{"New<br/>Adapter?"}
    NewAdapter -->|Yes| Integration["Write Integration Test"]
    NewAdapter -->|No| Skip2["Skip integration"]

    Integration --> Critical{"Critical<br/>Flow?"}
    Skip2 --> Critical
    Critical -->|Yes| E2E["Write E2E Test"]
    Critical -->|No| Done["Done"]
    E2E --> Done

    style Unit fill:#90EE90,stroke:#333
    style UseCase fill:#87CEEB,stroke:#333
    style Integration fill:#FFD700,stroke:#333
    style E2E fill:#f99,stroke:#333
```
