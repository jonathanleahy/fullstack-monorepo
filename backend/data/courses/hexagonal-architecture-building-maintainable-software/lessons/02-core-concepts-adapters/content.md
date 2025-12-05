# Core Concepts: Adapters

If ports are the contracts, adapters are the **concrete implementations** that fulfill those contracts.

## Adapter Architecture

```mermaid
flowchart TB
    subgraph Driving["Driving Adapters (Inbound)"]
        HTTP["HTTP/REST"]
        GQL["GraphQL"]
        GRPC["gRPC"]
        CLI["CLI"]
    end

    subgraph Ports["Ports (Interfaces)"]
        DP["Driving Ports"]
        DrP["Driven Ports"]
    end

    subgraph Driven["Driven Adapters (Outbound)"]
        PG["PostgreSQL"]
        Mongo["MongoDB"]
        Redis["Redis"]
        SES["AWS SES"]
    end

    Driving -->|implement| DP
    DrP -->|implemented by| Driven

    style Driving fill:#87CEEB,stroke:#333
    style Ports fill:#FFD700,stroke:#333
    style Driven fill:#DDA0DD,stroke:#333
```

In software, adapters translate between your domain and the outside world.