# Resources and Next Steps

Congratulations on completing this course! Here's where to go next to deepen your understanding.

## Your Learning Journey

```mermaid
flowchart LR
    subgraph Done["Completed"]
        Course["This Course"]
    end

    subgraph Next["Next Steps"]
        Practice["Practice<br/>Build a project"]
        Deep["Go Deeper<br/>Read books"]
        Related["Related Patterns<br/>DDD, CQRS"]
    end

    Done --> Practice
    Done --> Deep
    Done --> Related

    style Done fill:#90EE90,stroke:#333
    style Next fill:#87CEEB,stroke:#333
```

## Recommended Books

| Book | Author | Focus |
|------|--------|-------|
| **Clean Architecture** | Robert C. Martin | Dependency rule, enterprise patterns |
| **Domain-Driven Design** | Eric Evans | Strategic and tactical DDD |
| **Implementing DDD** | Vaughn Vernon | Practical DDD implementation |
| **Get Your Hands Dirty on Clean Architecture** | Tom Hombergs | Hands-on with Java examples |

## Key Articles

- **Original Hexagonal Architecture** - Alistair Cockburn's 2005 article
- **The Clean Architecture** - Uncle Bob's blog post
- **Onion Architecture** - Jeffrey Palermo's articles

## Related Patterns to Learn

```mermaid
mindmap
  root((Next Patterns))
    DDD
      Aggregates
      Bounded Contexts
      Ubiquitous Language
    CQRS
      Command/Query Separation
      Event Sourcing
      Read Models
    Event-Driven
      Domain Events
      Event Sourcing
      Saga Pattern
    Microservices
      Service Boundaries
      API Gateways
      Distributed Systems
```

## Practice Project Ideas

1. **User Management Service**
   - Entities: User, Role, Permission
   - Adapters: REST, PostgreSQL, Email
   - Features: Registration, authentication, password reset

2. **Order Management System**
   - Entities: Order, Product, Customer
   - Adapters: REST, GraphQL, MongoDB, Stripe
   - Features: Cart, checkout, payment, notifications

3. **Content Management System**
   - Entities: Article, Category, Author
   - Adapters: REST, CLI, SQLite, S3
   - Features: CRUD, file uploads, search

## Checklist Before Building

Before your next project, ask yourself:

- [ ] Have I identified my core domain entities?
- [ ] Have I defined my driving ports (what the app does)?
- [ ] Have I defined my driven ports (what the app needs)?
- [ ] Is my domain free of infrastructure concerns?
- [ ] Can I test my use cases with mocks?
- [ ] Is my project structure clear and navigable?

## Communities

- **Go Discord** - #architecture channel
- **Reddit** - r/golang, r/softwarearchitecture
- **Dev.to** - Clean architecture tag
- **GitHub** - Search "hexagonal architecture go" for examples

## Final Thoughts

```mermaid
flowchart TB
    subgraph Remember["Key Takeaways"]
        R1["Business logic at the center"]
        R2["Dependencies point inward"]
        R3["Ports define contracts"]
        R4["Adapters implement contracts"]
        R5["Test at every level"]
    end

    style Remember fill:#90EE90,stroke:#333
```

The best way to learn is by doing. Start with a small project, apply the patterns, make mistakes, and iterate.

**Happy architecting!**
