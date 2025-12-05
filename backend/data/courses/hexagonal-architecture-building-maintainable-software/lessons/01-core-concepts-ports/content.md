# Core Concepts: Ports

Ports are the **interfaces** that define how your application communicates with the outside world.

## Port Types Overview

```mermaid
flowchart LR
    subgraph DP["Driving Ports"]
        direction TB
        D1["UserService"]
        D2["OrderService"]
        D3["PaymentService"]
    end

    subgraph App["Application Core"]
        direction TB
        UC["Use Cases"]
    end

    subgraph DrP["Driven Ports"]
        direction TB
        Dr1["UserRepository"]
        Dr2["OrderRepository"]
        Dr3["EmailSender"]
    end

    DP -->|"calls"| UC
    UC -->|"uses"| DrP

    style DP fill:#87CEEB,stroke:#333
    style App fill:#90EE90,stroke:#333
    style DrP fill:#DDA0DD,stroke:#333
```

This chapter covers the two types of ports and how to design them effectively.