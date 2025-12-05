# What Are Ports?

Ports are the **interfaces** that define how your application communicates with the outside world. They're the "contract" between your business logic and everything else.

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
// A Driving Port - what the application offers
type UserService interface {
    CreateUser(ctx context.Context, input CreateUserInput) (*User, error)
    GetUser(ctx context.Context, id string) (*User, error)
}

// A Driven Port - what the application needs
type UserRepository interface {
    Save(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id string) (*User, error)
}
```

## Two Types of Ports

| Type | Direction | Question It Answers | Example |
|------|-----------|---------------------|---------|
| **Driving Port** | Inbound | "What can this app do?" | UserService, OrderService |
| **Driven Port** | Outbound | "What does this app need?" | UserRepository, EmailSender |

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
