# Common Pitfalls

Even experienced developers make mistakes when implementing Hexagonal Architecture. Here are the most common pitfalls and how to avoid them.

## Pitfall 1: Domain Importing Infrastructure

```mermaid
flowchart LR
    subgraph Wrong["Wrong"]
        D1["Domain"] -->|imports| I1["database/sql"]
    end

    subgraph Right["Right"]
        A1["Adapter"] -->|imports| I2["database/sql"]
        A1 -->|imports| D2["Domain"]
    end

    style Wrong fill:#f99,stroke:#333
    style Right fill:#9f9,stroke:#333
```

```go
// ❌ WRONG: Domain knows about SQL
package entities

import "database/sql"

type User struct {
    db *sql.DB  // Infrastructure leak!
}

// ✅ RIGHT: Domain is pure
package entities

type User struct {
    ID    string
    Name  string
    Email string
}
```

## Pitfall 2: Business Logic in Adapters

```go
// ❌ WRONG: Business logic in HTTP handler
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
    // Business rule in adapter!
    if existingUser := h.db.FindByEmail(email); existingUser != nil {
        http.Error(w, "email taken", 400)
        return
    }

    // More business logic...
    if len(name) < 2 {
        http.Error(w, "name too short", 400)
        return
    }
}

// ✅ RIGHT: Adapter just translates
func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    json.NewDecoder(r.Body).Decode(&req)

    user, err := h.userService.CreateUser(ctx, ports.CreateUserInput{
        Name:  req.Name,
        Email: req.Email,
    })

    if err != nil {
        h.handleError(w, err)  // Translate error to HTTP
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
```

## Pitfall 3: Over-Engineering Simple Apps

```mermaid
flowchart LR
    subgraph Simple["Simple CRUD App"]
        S1["Does it need<br/>all this structure?"]
    end

    subgraph Signs["Signs of Over-Engineering"]
        S2["Ports with 1 implementation"]
        S3["More boilerplate than logic"]
        S4["Team confused by structure"]
    end

    Simple --> Signs

    style Simple fill:#FFD700,stroke:#333
    style Signs fill:#f99,stroke:#333
```

**Rule of thumb**: If your business logic fits in one file, you might not need full Hexagonal Architecture.

## Pitfall 4: Leaking Infrastructure Errors

```go
// ❌ WRONG: Infrastructure error leaks to domain
func (r *PostgresRepo) FindByID(ctx context.Context, id string) (*User, error) {
    var user User
    err := r.db.QueryRow(...).Scan(...)
    if err == sql.ErrNoRows {
        return nil, sql.ErrNoRows  // Infrastructure error!
    }
    return &user, err
}

// ✅ RIGHT: Translate to domain error
func (r *PostgresRepo) FindByID(ctx context.Context, id string) (*User, error) {
    var user User
    err := r.db.QueryRow(...).Scan(...)
    if err == sql.ErrNoRows {
        return nil, entities.ErrUserNotFound  // Domain error
    }
    return &user, err
}
```

## Pitfall 5: Anemic Domain Model

```go
// ❌ WRONG: Entity is just data
type User struct {
    ID    string
    Name  string
    Email string
}

// All logic in use case
func (uc *UseCase) CreateUser(name, email string) (*User, error) {
    if len(name) < 2 {
        return nil, ErrNameTooShort
    }
    // Validation belongs in entity!
}

// ✅ RIGHT: Entity has behavior
type User struct {
    ID    string
    name  string
    email string
}

func NewUser(name, email string) (*User, error) {
    if len(name) < 2 {
        return nil, ErrNameTooShort
    }
    if !isValidEmail(email) {
        return nil, ErrInvalidEmail
    }
    return &User{ID: uuid.New().String(), name: name, email: email}, nil
}

func (u *User) UpdateEmail(email string) error {
    if !isValidEmail(email) {
        return ErrInvalidEmail
    }
    u.email = email
    return nil
}
```

## Pitfall Summary

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| **Infrastructure in domain** | Domain imports `database/sql`, `net/http` | Move to adapters |
| **Logic in adapters** | Handlers contain business rules | Move to use cases |
| **Over-engineering** | Simple app with complex structure | Start simpler |
| **Error leakage** | `sql.ErrNoRows` reaches use cases | Translate in adapter |
| **Anemic domain** | Entities are just structs | Add behavior |
| **Skip testing** | "I'll add tests later" | TDD from start |
