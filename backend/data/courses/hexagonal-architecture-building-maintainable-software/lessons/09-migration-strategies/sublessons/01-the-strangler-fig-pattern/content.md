# The Strangler Fig Pattern

## Sam's Scenario

"We can't stop development to rewrite everything," Riley worried. "I have features to ship and users to support."

"You don't need to," Sam reassured them. "We'll use the strangler fig pattern. You'll keep the old code running while gradually building new hexagonal components alongside it. We'll route traffic to the new system piece by piece using feature flags. If something breaks, we just flip the flag back. No big bang, no risk."

Riley was skeptical. "How do we run old and new code side by side?"

Sam pulled up a diagram. "Let me show you how the strangler fig pattern works."

## Incremental Migration

The Strangler Fig pattern, named after fig trees that gradually wrap and replace their hosts, allows you to migrate incrementally without risky big-bang rewrites.

## The Pattern

```mermaid
flowchart TB
    subgraph Phase1["Phase 1: Facade"]
        Req1["Request"] --> Facade1["Facade"]
        Facade1 --> Old1["Old System<br/>(100%)"]
    end

    subgraph Phase2["Phase 2: Partial"]
        Req2["Request"] --> Facade2["Facade"]
        Facade2 --> Old2["Old System<br/>(70%)"]
        Facade2 --> New2["New System<br/>(30%)"]
    end

    subgraph Phase3["Phase 3: Complete"]
        Req3["Request"] --> New3["New System<br/>(100%)"]
    end

    Phase1 --> Phase2 --> Phase3

    style Phase1 fill:#f99,stroke:#333
    style Phase2 fill:#FFD700,stroke:#333
    style Phase3 fill:#90EE90,stroke:#333
```

## How It Works

1. **Add a Facade**: Route all requests through a new facade/proxy
2. **Migrate Incrementally**: Move one endpoint/feature at a time to the new system
3. **Run in Parallel**: Old and new systems coexist during migration
4. **Cut Over**: Once all traffic goes to the new system, remove the old

## Implementation: Router as Facade

```go
// The facade routes to old or new handlers
type MigrationRouter struct {
    oldHandler *legacy.UserHandler
    newHandler *hexagonal.UserHandler
    featureFlags FeatureFlags
}

func (r *MigrationRouter) CreateUser(w http.ResponseWriter, req *http.Request) {
    if r.featureFlags.IsEnabled("hex_create_user") {
        r.newHandler.CreateUser(w, req)  // New hexagonal implementation
    } else {
        r.oldHandler.CreateUser(w, req)  // Legacy implementation
    }
}

func (r *MigrationRouter) GetUser(w http.ResponseWriter, req *http.Request) {
    // Still using old system
    r.oldHandler.GetUser(w, req)
}
```

## Feature Flag Strategy

```mermaid
flowchart LR
    subgraph Rollout["Gradual Rollout"]
        FF["Feature Flag"]
        FF -->|"0%"| Old["Old Handler"]
        FF -->|"10%"| Test["New Handler<br/>(Testing)"]
        FF -->|"50%"| Canary["New Handler<br/>(Canary)"]
        FF -->|"100%"| Full["New Handler<br/>(Full)"]
    end

    style Rollout fill:#FFD700,stroke:#333
```

```go
type FeatureFlags struct {
    store FeatureFlagStore
}

func (f *FeatureFlags) IsEnabled(flag string) bool {
    return f.store.GetPercentage(flag) > rand.Float64()*100
}

// Gradual rollout
// Day 1: SetPercentage("hex_create_user", 10)  // 10% traffic
// Day 3: SetPercentage("hex_create_user", 50)  // 50% traffic
// Day 7: SetPercentage("hex_create_user", 100) // Full migration
```

## Data Migration Considerations

```mermaid
flowchart TB
    subgraph Data["Data Strategy"]
        Both["Write to both DBs"]
        Sync["Sync periodically"]
        Shadow["Shadow reads"]
    end

    style Data fill:#87CEEB,stroke:#333
```

When migrating data access:

```go
// Dual-write during migration
func (r *MigrationRepository) Save(ctx context.Context, user *User) error {
    // Write to old system
    if err := r.oldRepo.Save(ctx, user); err != nil {
        return err
    }

    // Also write to new system
    if err := r.newRepo.Save(ctx, user); err != nil {
        log.Error("new system write failed", "error", err)
        // Don't fail the request - old system is source of truth
    }

    return nil
}
```

## Rollback Safety

```go
func (r *MigrationRouter) CreateUser(w http.ResponseWriter, req *http.Request) {
    if r.featureFlags.IsEnabled("hex_create_user") {
        defer func() {
            if err := recover(); err != nil {
                // Automatic rollback on panic
                r.featureFlags.Disable("hex_create_user")
                log.Error("new handler panicked, rolling back", "error", err)
                r.oldHandler.CreateUser(w, req)
            }
        }()
        r.newHandler.CreateUser(w, req)
    } else {
        r.oldHandler.CreateUser(w, req)
    }
}
```

## Strangler Fig Checklist

| Step | Action | Success Criteria |
|------|--------|------------------|
| 1 | Add facade/router | All traffic through router |
| 2 | Create new handler | Tests pass |
| 3 | Enable for 10% | No errors |
| 4 | Enable for 50% | Latency similar |
| 5 | Enable for 100% | Metrics match |
| 6 | Remove old code | Clean codebase |

## Benefits of Strangler Fig

- **Low risk**: Rollback is instant
- **Continuous delivery**: Never stop shipping
- **Measurable progress**: Track percentage migrated
- **Team learning**: Learn patterns on low-risk features first

## Sam's Migration Plan for Riley

Sam set up a migration router for Riley's supply tracking system. Week 1: They migrated CreateItem to hexagonal architecture and routed 10% of traffic through the new handler. No issues. Week 2: 50% of traffic. Still smooth. Week 3: 100% of CreateItem traffic used the new handler.

"We migrated the most critical endpoint without a single outage," Riley said, amazed. "Users had no idea we were refactoring underneath."

Over the next two months, Riley and Sam migrated one endpoint at a time: UpdateItem, DeleteItem, ListItems, SearchItems. Each migration was isolated, testable, and reversible.

"The strangler fig pattern saved us," Riley told their team. "We refactored to hexagonal architecture while shipping new features every week. No big rewrite, no downtime, no drama."
