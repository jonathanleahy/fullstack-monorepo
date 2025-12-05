# When to Use Hexagonal Architecture

Hexagonal Architecture is powerful but not always necessary. Here's a practical guide to help you decide.

## The Decision Matrix

```mermaid
flowchart TD
    Start["New Project"] --> Q1{"Will it live<br/>longer than<br/>6 months?"}
    Q1 -->|No| Simple["Keep it simple"]
    Q1 -->|Yes| Q2{"Complex business<br/>logic?"}
    Q2 -->|No| Simple
    Q2 -->|Yes| Q3{"Team size<br/>> 2 people?"}
    Q3 -->|No| Consider["Consider it"]
    Q3 -->|Yes| Q4{"Multiple<br/>interfaces?"}
    Q4 -->|No| Consider
    Q4 -->|Yes| Use["Use Hexagonal"]

    style Use fill:#90EE90,stroke:#333
    style Consider fill:#FFD700,stroke:#333
    style Simple fill:#87CEEB,stroke:#333
```

## Good Fit: Use Hexagonal

```mermaid
mindmap
  root((Good Fit))
    Complex Domain
      Many business rules
      Domain expertise needed
      Not just CRUD
    Long-Lived
      Multi-year projects
      Evolving requirements
      Multiple releases
    Multiple Interfaces
      REST + GraphQL
      Web + Mobile
      CLI + Queue
    Growing Team
      3+ developers
      Onboarding needed
      Clear ownership
```

**Examples:**
- E-commerce platforms with complex pricing rules
- Financial applications with regulatory requirements
- Healthcare systems with complex workflows
- Enterprise SaaS with multiple integration points

## Overkill: Keep It Simple

```mermaid
mindmap
  root((Overkill))
    Simple CRUD
      Basic forms
      Database wrapper
      No business rules
    Short-Lived
      Prototypes
      Experiments
      Throwaway code
    Solo Developer
      One person
      Quick iteration
      Full context
    Data Pipelines
      ETL jobs
      Batch processing
      No domain logic
```

**Examples:**
- Landing page backends
- Simple REST wrappers
- Prototypes and MVPs
- One-off scripts
- Internal tools with basic needs

## The Gradual Approach

You don't have to commit upfront. Start simple and evolve:

```mermaid
flowchart LR
    subgraph Stage1["Stage 1: Simple"]
        S1["Handler + DB<br/>in one file"]
    end

    subgraph Stage2["Stage 2: Separate"]
        S2["Handlers"]
        S3["Services"]
        S4["Repository"]
    end

    subgraph Stage3["Stage 3: Hexagonal"]
        S5["Full ports<br/>and adapters"]
    end

    Stage1 -->|"Complexity grows"| Stage2
    Stage2 -->|"Need flexibility"| Stage3

    style Stage1 fill:#87CEEB,stroke:#333
    style Stage2 fill:#FFD700,stroke:#333
    style Stage3 fill:#90EE90,stroke:#333
```

## Questions to Ask

| Question | If Yes → Hexagonal | If No → Keep Simple |
|----------|-------------------|---------------------|
| Will this exist in 2+ years? | ✓ | |
| Multiple data sources? | ✓ | |
| Need high test coverage? | ✓ | |
| Team growing? | ✓ | |
| Complex business rules? | ✓ | |
| Multiple interfaces? | ✓ | |
| Replacing existing system? | ✓ | |

## Signs You Made the Wrong Choice

**Used Hexagonal when you shouldn't have:**
- Spending more time on structure than features
- Ports with single implementations that won't change
- Team confused by the layers

**Didn't use it when you should have:**
- Fear of refactoring
- Tests require full infrastructure
- New developers take months to onboard
- Simple changes break unrelated code

## The Bottom Line

> **When in doubt, start simpler.** It's easier to add structure than to remove it.

You can always refactor toward Hexagonal Architecture when:
- The codebase becomes hard to test
- You need to add a new interface (CLI, GraphQL)
- You want to swap a technology (new database)
- The team is growing and needs clearer boundaries
