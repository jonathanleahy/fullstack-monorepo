# Assessing Your Current Architecture

Before migrating, you need to understand what you have. This assessment will guide your migration strategy.

## What to Look For

```mermaid
mindmap
  root((Assessment))
    Pain Points
      Hard to test
      Slow to change
      Frequent bugs
      Onboarding struggles
    Coupling
      DB in handlers
      Business logic scattered
      Framework dependencies
    Opportunities
      Clear seams
      Existing interfaces
      Test coverage
```

## Signs You Need Migration

| Symptom | Root Cause | Hex Arch Solution |
|---------|------------|-------------------|
| Tests need real DB | Domain coupled to infrastructure | Ports abstract infrastructure |
| Changes break unrelated code | No clear boundaries | Layer isolation |
| New features take too long | Spaghetti dependencies | Clear dependency direction |
| Hard to onboard developers | No consistent structure | Standard project layout |

## Assessing Your Codebase

### 1. Find the Business Logic

Where does your business logic live?

```go
// ❌ Common: Business logic in handlers
func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
    // Parsing (adapter concern)
    var req CreateUserRequest
    json.NewDecoder(r.Body).Decode(&req)

    // Validation (domain concern - mixed in!)
    if len(req.Name) < 2 {
        http.Error(w, "name too short", 400)
        return
    }

    // Database (adapter concern - mixed in!)
    _, err := db.Exec("INSERT INTO users...")

    // Response (adapter concern)
    w.WriteHeader(201)
}
```

### 2. Identify Coupling

```mermaid
flowchart TB
    subgraph Current["Current State"]
        Handler["Handler"]
        Handler --> SQL["database/sql"]
        Handler --> HTTP["net/http"]
        Handler --> SMTP["net/smtp"]
        Handler --> Business["Business Rules"]
    end

    style Current fill:#f99,stroke:#333
```

Questions to ask:
- Can you test business logic without a database?
- Can you change the database without modifying handlers?
- Can you add a CLI without duplicating logic?

### 3. Map Dependencies

Create a dependency diagram:

```go
// Example: Document what imports what
handlers/
    user_handler.go
        → imports: database/sql, net/http, models, utils

models/
    user.go
        → imports: database/sql (!)

utils/
    validation.go
        → imports: nothing (good!)
```

## Prioritizing Migration

```mermaid
flowchart TD
    Start["Identify Candidates"] --> Pain{"Highest Pain?"}
    Pain --> Risk{"Lowest Risk?"}
    Risk --> Value{"Highest Value?"}
    Value --> First["Start Here"]

    style First fill:#90EE90,stroke:#333
```

### Migration Priority Matrix

| Area | Pain Level | Risk | Value | Priority |
|------|------------|------|-------|----------|
| User management | High | Low | High | **1st** |
| Payment processing | High | High | High | 2nd |
| Reporting | Low | Low | Low | Later |
| Legacy import | Medium | High | Low | Last |

## Create a Migration Map

Document your findings:

```markdown
## Migration Assessment: User Service

### Current State
- Business logic split between `handlers/user.go` and `models/user.go`
- Direct SQL queries in handlers
- No tests for business rules
- Validation mixed with HTTP handling

### Target State
- `domain/entities/user.go` - Entity with validation
- `domain/repositories/user.go` - Repository interface
- `application/usecases/user.go` - Use cases
- `adapters/http/user_handler.go` - HTTP adapter
- `adapters/db/postgres/user_repo.go` - DB adapter

### Migration Steps
1. Extract User entity with validation
2. Create repository interface
3. Move business logic to use case
4. Create adapters
5. Update handlers to use adapters
```

## Assessment Checklist

- [ ] Identified where business logic lives
- [ ] Mapped infrastructure dependencies
- [ ] Listed pain points and their causes
- [ ] Prioritized areas for migration
- [ ] Created target state diagram
- [ ] Defined success criteria
