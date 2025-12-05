# Use Cases: Orchestrating Operations

Use cases (also called "application services" or "interactors") orchestrate the flow of data between ports and the domain.

## Use Case Position in Architecture

```mermaid
flowchart TB
    subgraph DA["Driving Adapters"]
        HTTP["HTTP Handler"]
        GQL["GraphQL"]
    end

    subgraph UC["Use Cases"]
        Create["CreateUser"]
        Get["GetUser"]
        Update["UpdateUser"]
    end

    subgraph Domain["Domain"]
        Entities["Entities"]
        Services["Domain Services"]
    end

    subgraph DrA["Driven Adapters"]
        Repo["Repository"]
        Email["Email Sender"]
    end

    DA --> UC
    UC --> Domain
    UC --> DrA

    style UC fill:#FFD700,stroke:#333
    style Domain fill:#90EE90,stroke:#333
```

A use case represents a **single business operation**:
- "Create a new user account"
- "Place an order"
- "Transfer money between accounts"