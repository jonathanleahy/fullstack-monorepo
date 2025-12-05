# The Big Picture: What is Hexagonal Architecture?

Hexagonal Architecture was invented by Alistair Cockburn in 2005.

## The Core Idea (In One Sentence)

> **Your business logic should not know or care about the outside world.**

That's it. Everything else flows from this principle.

## The Hexagon Metaphor

```mermaid
flowchart TB
    subgraph External["External World"]
        HTTP["HTTP API"]
        CLI["CLI"]
        Queue["Message Queue"]
        DB[(Database)]
        Email["Email Service"]
        Payment["Payment Gateway"]
    end

    subgraph Hex["The Hexagon"]
        subgraph Driving["Driving Adapters"]
            HA["HTTP Adapter"]
            CA["CLI Adapter"]
            QA["Queue Adapter"]
        end

        subgraph Core["Domain Core"]
            UC["Use Cases"]
            E["Entities"]
            S["Domain Services"]
        end

        subgraph Driven["Driven Adapters"]
            RA["Repository Adapter"]
            EA["Email Adapter"]
            PA["Payment Adapter"]
        end
    end

    HTTP --> HA
    CLI --> CA
    Queue --> QA

    HA --> UC
    CA --> UC
    QA --> UC

    UC --> E
    UC --> S

    UC --> RA
    UC --> EA
    UC --> PA

    RA --> DB
    EA --> Email
    PA --> Payment

    style Core fill:#90EE90,stroke:#333
    style Driving fill:#87CEEB,stroke:#333
    style Driven fill:#DDA0DD,stroke:#333
```

- **Domain (Core)** - Pure business logic, no dependencies
- **Ports** - Interfaces that define contracts
- **Adapters** - Implementations that connect to the real world

## Other Names

You might hear these terms - they're all related:
- **Ports and Adapters** (same thing, clearer name)
- **Clean Architecture** (Uncle Bob's version)
- **Onion Architecture** (similar, layers like an onion)