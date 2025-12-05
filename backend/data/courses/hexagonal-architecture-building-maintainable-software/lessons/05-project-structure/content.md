# Project Structure

A clear project structure makes hexagonal architecture visible and maintainable.

## The Recommended Layout

```mermaid
flowchart TB
    subgraph Project["myapp/"]
        cmd["cmd/<br/>Entry points"]
        domain["domain/<br/>THE CORE"]
        app["application/<br/>Use cases"]
        adapters["adapters/<br/>Infrastructure"]
        config["config/<br/>Configuration"]
    end

    subgraph Domain["domain/"]
        entities["entities/"]
        services["services/"]
        repos["repositories/<br/>(interfaces)"]
    end

    subgraph App["application/"]
        ports["ports/"]
        usecases["usecases/"]
    end

    subgraph Adapt["adapters/"]
        http["http/"]
        graphql["graphql/"]
        db["db/"]
    end

    style domain fill:#90EE90,stroke:#333
    style app fill:#FFD700,stroke:#333
    style adapters fill:#87CEEB,stroke:#333
```

## Dependency Direction

Dependencies always point **inward**:
- Adapters → Application → Domain
- Never: Domain → Adapters