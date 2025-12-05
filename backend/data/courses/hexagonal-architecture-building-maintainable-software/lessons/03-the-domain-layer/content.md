# The Domain Layer

The domain layer is the **most important** part of your application. It's where your business lives.

## Domain Layer Structure

```mermaid
flowchart TB
    subgraph Domain["Domain Layer"]
        subgraph Entities["Entities"]
            User["User"]
            Order["Order"]
            Product["Product"]
        end

        subgraph VO["Value Objects"]
            Money["Money"]
            Email["Email"]
            Address["Address"]
        end

        subgraph Services["Domain Services"]
            Auth["AuthService"]
            Pricing["PricingService"]
        end

        subgraph Errors["Domain Errors"]
            E1["ErrUserNotFound"]
            E2["ErrInvalidEmail"]
            E3["ErrInsufficientFunds"]
        end
    end

    Entities --> VO
    Services --> Entities

    style Domain fill:#90EE90,stroke:#333
```

This chapter covers entities, value objects, and domain services - the building blocks of your business logic.