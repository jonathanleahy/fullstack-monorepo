# Extracting the Domain

The first and most important step: pull business logic out of handlers and infrastructure into a clean domain layer.

## Before and After

```mermaid
flowchart LR
    subgraph Before["Before: Mixed"]
        Handler1["Handler"]
        Handler1 --> BL["Business Logic"]
        Handler1 --> DB["Database Calls"]
        Handler1 --> Valid["Validation"]
    end

    subgraph After["After: Separated"]
        Handler2["Handler"]
        Domain["Domain Layer"]
        Repo["Repository"]
        Handler2 --> Domain
        Domain --> Repo
    end

    Before -->|"Extract"| After

    style Before fill:#f99,stroke:#333
    style After fill:#9f9,stroke:#333
```

## Step 1: Identify Business Rules

Look for code that:
- Validates business constraints (not just data format)
- Makes decisions based on business rules
- Calculates business values
- Changes state based on business events

```go
// Before: Handler with embedded business logic
func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    json.NewDecoder(r.Body).Decode(&req)

    // ← Business rule: name length
    if len(req.Name) < 2 {
        http.Error(w, "name too short", 400)
        return
    }

    // ← Business rule: email format
    if !strings.Contains(req.Email, "@") {
        http.Error(w, "invalid email", 400)
        return
    }

    // ← Business rule: unique email
    var exists bool
    db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)", req.Email).Scan(&exists)
    if exists {
        http.Error(w, "email taken", 400)
        return
    }

    // Insert...
}
```

## Step 2: Create Domain Entity

Extract validation into the entity:

```go
// domain/entities/user.go
package entities

var (
    ErrNameTooShort  = errors.New("name must be at least 2 characters")
    ErrInvalidEmail  = errors.New("invalid email format")
    ErrEmailTaken    = errors.New("email is already taken")
)

type User struct {
    ID        string
    Name      string
    Email     string
    CreatedAt time.Time
}

// Factory function with validation
func NewUser(name, email string) (*User, error) {
    if len(name) < 2 {
        return nil, ErrNameTooShort
    }
    if !isValidEmail(email) {
        return nil, ErrInvalidEmail
    }

    return &User{
        ID:        uuid.New().String(),
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }, nil
}

func isValidEmail(email string) bool {
    // Simple check - could use regex for more thorough validation
    return strings.Contains(email, "@") && strings.Contains(email, ".")
}
```

## Step 3: Create Repository Interface

Define what persistence operations you need:

```go
// domain/repositories/user_repository.go
package repositories

type UserRepository interface {
    Save(ctx context.Context, user *entities.User) error
    FindByID(ctx context.Context, id string) (*entities.User, error)
    FindByEmail(ctx context.Context, email string) (*entities.User, error)
    ExistsByEmail(ctx context.Context, email string) (bool, error)
}
```

## Step 4: Create Use Case

Move orchestration logic:

```go
// application/usecases/create_user.go
package usecases

type CreateUserInput struct {
    Name  string
    Email string
}

type CreateUserUseCase struct {
    userRepo repositories.UserRepository
}

func (uc *CreateUserUseCase) Execute(ctx context.Context, input CreateUserInput) (*entities.User, error) {
    // Check email uniqueness (business rule)
    exists, err := uc.userRepo.ExistsByEmail(ctx, input.Email)
    if err != nil {
        return nil, fmt.Errorf("failed to check email: %w", err)
    }
    if exists {
        return nil, entities.ErrEmailTaken
    }

    // Create entity (validates internally)
    user, err := entities.NewUser(input.Name, input.Email)
    if err != nil {
        return nil, err
    }

    // Persist
    if err := uc.userRepo.Save(ctx, user); err != nil {
        return nil, fmt.Errorf("failed to save user: %w", err)
    }

    return user, nil
}
```

## Step 5: Update Handler

Now the handler is thin:

```go
// adapters/http/user_handler.go
func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid json", 400)
        return
    }

    user, err := h.createUserUseCase.Execute(r.Context(), usecases.CreateUserInput{
        Name:  req.Name,
        Email: req.Email,
    })

    if err != nil {
        h.handleError(w, err)  // Translate domain errors to HTTP
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(toUserResponse(user))
}
```

## Extraction Checklist

- [ ] Identified business rules in handlers
- [ ] Created entity with factory function
- [ ] Moved validation to entity
- [ ] Created repository interface
- [ ] Created use case for orchestration
- [ ] Updated handler to be thin
- [ ] Added tests for domain logic
