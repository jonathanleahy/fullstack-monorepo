// +build ignore

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type Lesson struct {
	Title      string   `json:"Title"`
	Content    string   `json:"Content"`
	Order      int      `json:"Order"`
	Sublessons []Lesson `json:"Sublessons,omitempty"`
}

func main() {
	// Open database
	db, err := sql.Open("sqlite3", "../data/app.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	courseID := "325d185d-2b79-450f-92e7-fabc030474d7"

	// Create updated lessons with subchapters
	lessons := []Lesson{
		{
			Title: "Introduction to Hexagonal Architecture",
			Order: 1,
			Content: `# Introduction to Hexagonal Architecture

Welcome to this comprehensive course on Hexagonal Architecture! By the end of this course, you'll understand how to build maintainable, testable, and flexible software.

## What You'll Learn

- Why traditional architecture often fails at scale
- The core principles of Hexagonal Architecture
- How to implement Ports and Adapters
- Real-world patterns and best practices
- How to test hexagonal applications

## Prerequisites

- Basic knowledge of Go programming
- Understanding of interfaces
- Familiarity with web APIs (REST/GraphQL)

Let's begin our journey into better software architecture!`,
			Sublessons: []Lesson{
				{
					Title: "The Problem: Why Traditional Architecture Fails",
					Order: 1,
					Content: `# The Problem: Why Traditional Architecture Fails

Before we dive into Hexagonal Architecture, let's understand the pain it solves.

## The Typical Project Journey

**Month 1:** Everything is great! You're building fast, shipping features.

**Month 6:** "Why is this test taking 30 seconds? Oh, it's hitting the real database."

**Month 12:** "We need to switch from PostgreSQL to MongoDB." *Team collectively sighs*

**Month 18:** "The framework we chose is no longer maintained." *Panic ensues*

## A Real Story

Imagine you're building an e-commerce platform. You start simple:

` + "```go" + `
// Seems reasonable at first...
func CreateOrder(w http.ResponseWriter, r *http.Request) {
    var order Order
    json.NewDecoder(r.Body).Decode(&order)

    // Validate
    if order.Total < 0 {
        http.Error(w, "Invalid total", 400)
        return
    }

    // Save to database
    db.Exec("INSERT INTO orders...")

    // Send email
    smtp.Send(order.CustomerEmail, "Order confirmed!")

    json.NewEncoder(w).Encode(order)
}
` + "```" + `

### What's Wrong Here?

1. **Testing is painful** - You need a real database and SMTP server
2. **Changes cascade** - Switching email providers means changing business logic
3. **Everything is coupled** - HTTP, database, email all mixed together
4. **No clear boundaries** - Where does "order creation" logic live?`,
				},
				{
					Title: "The Big Picture: What is Hexagonal Architecture?",
					Order: 2,
					Content: `# The Big Picture: What is Hexagonal Architecture?

Hexagonal Architecture was invented by Alistair Cockburn in 2005.

## The Core Idea (In One Sentence)

> **Your business logic should not know or care about the outside world.**

That's it. Everything else flows from this principle.

## The Hexagon Metaphor

Imagine your application as a fortress with the business logic protected at the center:

- **Domain (Core)** - Pure business logic, no dependencies
- **Ports** - Interfaces that define contracts
- **Adapters** - Implementations that connect to the real world

## Other Names

You might hear these terms - they're all related:
- **Ports and Adapters** (same thing, clearer name)
- **Clean Architecture** (Uncle Bob's version)
- **Onion Architecture** (similar, layers like an onion)`,
				},
			},
		},
		{
			Title: "Core Concepts: Ports",
			Order: 2,
			Content: `# Core Concepts: Ports

Ports are the **interfaces** that define how your application communicates with the outside world.

## The Analogy: Electrical Outlets

Consider a wall outlet:
- The outlet doesn't care what you plug into it
- Your devices don't care how electricity is generated
- The **interface** (the outlet shape) is the contract

This chapter covers the two types of ports and how to design them effectively.`,
			Sublessons: []Lesson{
				{
					Title: "Driving Ports (Inbound)",
					Order: 1,
					Content: `# Driving Ports (Inbound)

**Who uses them:** The outside world
**What they do:** Define what your application CAN DO

Think: "What services does my application offer?"

` + "```go" + `
// This port says: "My application can manage users"
type UserService interface {
    CreateUser(ctx context.Context, input CreateUserInput) (*User, error)
    GetUser(ctx context.Context, id string) (*User, error)
    UpdateUser(ctx context.Context, id string, input UpdateUserInput) (*User, error)
    DeleteUser(ctx context.Context, id string) error
}
` + "```" + `

These ports are implemented by your **use cases** and called by **driving adapters**.`,
				},
				{
					Title: "Driven Ports (Outbound)",
					Order: 2,
					Content: `# Driven Ports (Outbound)

**Who uses them:** Your application
**What they do:** Define what your application NEEDS

Think: "What external capabilities does my application require?"

` + "```go" + `
// This port says: "I need to store users somewhere"
type UserRepository interface {
    Save(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id string) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
}

// This port says: "I need to send emails somehow"
type EmailSender interface {
    SendWelcomeEmail(ctx context.Context, to, userName string) error
    SendPasswordReset(ctx context.Context, to, resetLink string) error
}
` + "```" + `

These ports are **defined by your domain** but **implemented by adapters**.`,
				},
				{
					Title: "Port Design Guidelines",
					Order: 3,
					Content: `# Port Design Guidelines

## 1. Use Domain Language

` + "```go" + `
// Bad: Technical/database language
type UserDAO interface {
    Insert(row UserRow) error
    SelectByPK(pk int64) (*UserRow, error)
}

// Good: Domain language
type UserRepository interface {
    Save(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id string) (*User, error)
}
` + "```" + `

## 2. Keep Ports Focused

Follow the Interface Segregation Principle - many small interfaces are better than one large one.

## 3. Don't Leak Infrastructure

` + "```go" + `
// Bad: Leaks SQL concepts
type UserRepository interface {
    Query(sql string, args ...interface{}) (*sql.Rows, error)
}

// Good: Pure domain concepts
type UserRepository interface {
    FindByID(ctx context.Context, id string) (*User, error)
}
` + "```",
				},
			},
		},
		{
			Title: "Core Concepts: Adapters",
			Order: 3,
			Content: `# Core Concepts: Adapters

If ports are the contracts, adapters are the **concrete implementations** that fulfill those contracts.

## The Analogy: Power Adapters

When you travel internationally, you use a power adapter:
- Your laptop expects a certain plug shape (the "port")
- Different countries have different outlets
- The adapter **translates** between them

In software, adapters translate between your domain and the outside world.`,
			Sublessons: []Lesson{
				{
					Title: "Driving Adapters (Inbound)",
					Order: 1,
					Content: `# Driving Adapters (Inbound)

**What they do:** Receive requests from the outside world and translate them into domain calls.

**Examples:**
- HTTP handlers (REST APIs)
- GraphQL resolvers
- CLI commands
- gRPC servers
- Message queue consumers

` + "```go" + `
// HTTP Adapter - translates HTTP to domain calls
type UserHTTPHandler struct {
    userService ports.UserService  // The driving port
}

func (h *UserHTTPHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    // 1. TRANSLATE: HTTP request -> Domain input
    var req CreateUserRequest
    json.NewDecoder(r.Body).Decode(&req)

    // 2. CALL: Domain service
    user, err := h.userService.CreateUser(r.Context(), ports.CreateUserInput{
        Name:  req.Name,
        Email: req.Email,
    })

    // 3. TRANSLATE: Domain result -> HTTP response
    if err != nil {
        // Handle error and return appropriate HTTP status
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
` + "```",
				},
				{
					Title: "Driven Adapters (Outbound)",
					Order: 2,
					Content: `# Driven Adapters (Outbound)

**What they do:** Implement the interfaces your domain needs, connecting to real infrastructure.

**Examples:**
- Database repositories (PostgreSQL, MongoDB, SQLite)
- Email services (SendGrid, SES, SMTP)
- Payment gateways (Stripe, PayPal)
- External API clients

` + "```go" + `
// SQLite Adapter - implements UserRepository port
type SQLiteUserRepository struct {
    db *sql.DB
}

func (r *SQLiteUserRepository) Save(ctx context.Context, user *entities.User) error {
    query := ` + "`" + `INSERT INTO users (id, name, email) VALUES (?, ?, ?)` + "`" + `
    _, err := r.db.ExecContext(ctx, query, user.ID, user.Name, user.Email)
    return err
}

func (r *SQLiteUserRepository) FindByID(ctx context.Context, id string) (*entities.User, error) {
    query := ` + "`" + `SELECT id, name, email FROM users WHERE id = ?` + "`" + `

    var user entities.User
    err := r.db.QueryRowContext(ctx, query, id).Scan(&user.ID, &user.Name, &user.Email)

    if err == sql.ErrNoRows {
        return nil, entities.ErrUserNotFound
    }
    return &user, err
}
` + "```",
				},
				{
					Title: "The Power of Swappable Adapters",
					Order: 3,
					Content: `# The Power of Swappable Adapters

The magic of adapters is that they can be **swapped** without changing business logic.

## Example: Switching Databases

` + "```go" + `
// In main.go, just swap the adapter:

// Development: SQLite
userRepo := sqlite.NewUserRepository(sqliteDB)

// Production: PostgreSQL
userRepo := postgres.NewUserRepository(pgPool)

// Testing: In-memory
userRepo := memory.NewUserRepository()

// The rest of your code doesn't change!
userService := usecases.NewUserService(userRepo)
` + "```" + `

## Adapter Responsibilities

| Do This | Don't Do This |
|---------|---------------|
| Translate data formats | Contain business logic |
| Handle infrastructure errors | Make business decisions |
| Map to/from domain types | Validate business rules |
| Deal with protocols | Know about other adapters |`,
				},
			},
		},
		{
			Title: "The Domain Layer",
			Order: 4,
			Content: `# The Domain Layer

The domain layer is the **most important** part of your application. It's where your business lives.

This chapter covers entities, value objects, and domain services - the building blocks of your business logic.`,
			Sublessons: []Lesson{
				{
					Title: "Entities: Objects with Identity",
					Order: 1,
					Content: `# Entities: Objects with Identity

Entities are objects with **identity** and **behavior**:

` + "```go" + `
package entities

// Domain errors
var (
    ErrInvalidEmail = errors.New("invalid email format")
    ErrNameTooShort = errors.New("name must be at least 2 characters")
    ErrUserNotFound = errors.New("user not found")
)

// User is a domain entity
type User struct {
    ID        string
    Name      string
    Email     string
    CreatedAt time.Time
    UpdatedAt time.Time
}

// NewUser is a factory function - enforces business rules
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
        UpdatedAt: time.Now(),
    }, nil
}

// UpdateEmail changes the user's email with validation
func (u *User) UpdateEmail(email string) error {
    if !isValidEmail(email) {
        return ErrInvalidEmail
    }
    u.Email = email
    u.UpdatedAt = time.Now()
    return nil
}
` + "```",
				},
				{
					Title: "Value Objects: Immutable Values",
					Order: 2,
					Content: `# Value Objects: Immutable Values

Value objects don't have identity - they're defined entirely by their values:

` + "```go" + `
// Money is a value object
type Money struct {
    amount   int64  // cents to avoid floating point issues
    currency string
}

func NewMoney(amount int64, currency string) (Money, error) {
    if amount < 0 {
        return Money{}, errors.New("amount cannot be negative")
    }
    return Money{amount: amount, currency: currency}, nil
}

func (m Money) Add(other Money) (Money, error) {
    if m.currency != other.currency {
        return Money{}, errors.New("cannot add different currencies")
    }
    return Money{amount: m.amount + other.amount, currency: m.currency}, nil
}

// Value objects should be immutable
func (m Money) Amount() int64   { return m.amount }
func (m Money) Currency() string { return m.currency }
` + "```" + `

## Key Differences: Entity vs Value Object

| Entity | Value Object |
|--------|--------------|
| Has unique identity (ID) | Defined by its values |
| Mutable over time | Immutable |
| Compared by ID | Compared by value |
| Example: User, Order | Example: Money, Address |`,
				},
				{
					Title: "Domain Services",
					Order: 3,
					Content: `# Domain Services

Domain services contain logic that doesn't belong to a single entity:

` + "```go" + `
// AuthService handles authentication logic
type AuthService struct {
    jwtSecret     string
    tokenDuration time.Duration
}

func NewAuthService(secret string) *AuthService {
    return &AuthService{
        jwtSecret:     secret,
        tokenDuration: 24 * time.Hour,
    }
}

func (s *AuthService) GenerateToken(user *User) (string, error) {
    claims := jwt.MapClaims{
        "user_id": user.ID,
        "email":   user.Email,
        "exp":     time.Now().Add(s.tokenDuration).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(s.jwtSecret))
}
` + "```" + `

## When to Use a Domain Service

- Logic involves multiple entities
- Logic doesn't naturally belong to one entity
- Stateless operations
- Examples: Pricing calculations, authentication, validation rules`,
				},
				{
					Title: "The Golden Rules of the Domain",
					Order: 4,
					Content: `# The Golden Rules of the Domain

## Rule 1: No Framework Dependencies

` + "```go" + `
// BAD: Domain depends on web framework
import "github.com/gin-gonic/gin"

func (u *User) HandleRequest(c *gin.Context) { ... }

// GOOD: Domain is pure Go
func (u *User) UpdateEmail(email string) error { ... }
` + "```" + `

## Rule 2: No Infrastructure Concerns

` + "```go" + `
// BAD: Domain knows about SQL
func (u *User) Save(db *sql.DB) error {
    db.Exec("INSERT INTO users...")
}

// GOOD: Domain doesn't know how it's persisted
// (Persistence is handled by repository adapters)
` + "```" + `

## Rule 3: Express Business Rules Clearly

` + "```go" + `
// BAD: Magic numbers, unclear rules
if len(password) < 8 {
    return err
}

// GOOD: Named constants, clear rules
const MinPasswordLength = 8

var ErrPasswordTooShort = fmt.Errorf(
    "password must be at least %d characters",
    MinPasswordLength,
)

func ValidatePassword(password string) error {
    if len(password) < MinPasswordLength {
        return ErrPasswordTooShort
    }
    return nil
}
` + "```",
				},
			},
		},
		{
			Title: "Use Cases: Orchestrating Operations",
			Order: 5,
			Content: `# Use Cases: Orchestrating Operations

Use cases (also called "application services" or "interactors") orchestrate the flow of data between ports and the domain.

A use case represents a **single business operation**:
- "Create a new user account"
- "Place an order"
- "Transfer money between accounts"`,
			Sublessons: []Lesson{
				{
					Title: "Anatomy of a Use Case",
					Order: 1,
					Content: `# Anatomy of a Use Case

` + "```go" + `
package usecases

// UserUseCase implements the UserService driving port
type UserUseCase struct {
    userRepo    repositories.UserRepository  // driven port
    emailSender repositories.EmailSender     // driven port
    logger      *slog.Logger
}

func NewUserUseCase(
    userRepo repositories.UserRepository,
    emailSender repositories.EmailSender,
    logger *slog.Logger,
) *UserUseCase {
    return &UserUseCase{
        userRepo:    userRepo,
        emailSender: emailSender,
        logger:      logger,
    }
}

func (uc *UserUseCase) CreateUser(
    ctx context.Context,
    input ports.CreateUserInput,
) (*entities.User, error) {
    // 1. LOG: Operation started
    uc.logger.Info("creating user", "email", input.Email)

    // 2. CHECK: Business rule - email must be unique
    existing, _ := uc.userRepo.FindByEmail(ctx, input.Email)
    if existing != nil {
        return nil, entities.ErrEmailTaken
    }

    // 3. CREATE: Domain entity
    user, err := entities.NewUser(input.Name, input.Email)
    if err != nil {
        return nil, err
    }

    // 4. PERSIST: Save via repository
    if err := uc.userRepo.Save(ctx, user); err != nil {
        return nil, err
    }

    // 5. SIDE EFFECT: Send welcome email
    uc.emailSender.SendWelcomeEmail(ctx, user.Email, user.Name)

    return user, nil
}
` + "```",
				},
				{
					Title: "Use Case Patterns",
					Order: 2,
					Content: `# Use Case Patterns

## Query Use Case (Simple Read)

` + "```go" + `
func (uc *UserUseCase) GetUser(
    ctx context.Context,
    id string,
) (*entities.User, error) {
    return uc.userRepo.FindByID(ctx, id)
}
` + "```" + `

## Command Use Case with Transaction

` + "```go" + `
func (uc *OrderUseCase) PlaceOrder(
    ctx context.Context,
    input ports.PlaceOrderInput,
) (*entities.Order, error) {
    // Start transaction
    tx, err := uc.txManager.Begin(ctx)
    if err != nil {
        return nil, err
    }
    defer tx.Rollback()

    // Create order
    order, err := entities.NewOrder(input.CustomerID, input.Items)
    if err != nil {
        return nil, err
    }

    // Reserve inventory
    for _, item := range order.Items {
        if err := uc.inventoryRepo.Reserve(ctx, tx, item.ProductID, item.Quantity); err != nil {
            return nil, err
        }
    }

    // Save and commit
    if err := uc.orderRepo.Save(ctx, tx, order); err != nil {
        return nil, err
    }

    return order, tx.Commit()
}
` + "```" + `

## Guidelines

| Do | Don't |
|-----|-------|
| Orchestrate domain objects | Implement business rules |
| Handle cross-cutting concerns | Know about HTTP, SQL |
| Coordinate multiple repositories | Contain presentation logic |`,
				},
			},
		},
		{
			Title: "Project Structure",
			Order: 6,
			Content: `# Project Structure

A clear project structure makes hexagonal architecture visible and maintainable.

## The Recommended Layout

` + "```" + `
myapp/
├── cmd/                    # Entry points
│   └── api/main.go
├── domain/                 # THE CORE
│   ├── entities/
│   ├── services/
│   └── repositories/       # Driven ports (interfaces)
├── application/
│   ├── ports/              # Driving ports (interfaces)
│   └── usecases/
├── adapters/
│   ├── http/               # Driving adapters
│   ├── graphql/
│   └── db/                 # Driven adapters
└── config/
` + "```" + `

## Dependency Direction

Dependencies always point **inward**:
- Adapters → Application → Domain
- Never: Domain → Adapters`,
			Sublessons: []Lesson{
				{
					Title: "The cmd Directory",
					Order: 1,
					Content: `# The cmd Directory

The cmd directory contains your application entry points - where everything gets wired together.

` + "```go" + `
// cmd/api/main.go
package main

func main() {
    // Load configuration
    cfg := config.Load()

    // Create infrastructure
    db := setupDatabase(cfg)
    logger := setupLogger(cfg)

    // Create adapters (driven)
    userRepo := sqlite.NewUserRepository(db)
    emailSender := sendgrid.NewEmailSender(cfg.SendGridKey)

    // Create domain services
    authService := services.NewAuthService(cfg.JWTSecret)

    // Create use cases
    userUseCase := usecases.NewUserUseCase(userRepo, emailSender, logger)

    // Create adapters (driving)
    userHandler := http.NewUserHandler(userUseCase)

    // Start server
    router := http.NewRouter(userHandler, authService)
    router.ListenAndServe(":8080")
}
` + "```" + `

The main function is the **composition root** - the only place that knows about all concrete implementations.`,
				},
				{
					Title: "Package Organization",
					Order: 2,
					Content: `# Package Organization

## Domain Package

` + "```go" + `
// domain/entities/user.go
package entities

type User struct { ... }
func NewUser(name, email string) (*User, error) { ... }

// domain/repositories/user_repository.go
package repositories

type UserRepository interface {
    Save(ctx context.Context, user *entities.User) error
    FindByID(ctx context.Context, id string) (*entities.User, error)
}
` + "```" + `

## Application Package

` + "```go" + `
// application/ports/user_service.go
package ports

type UserService interface {
    CreateUser(ctx context.Context, input CreateUserInput) (*entities.User, error)
}

// application/usecases/user_usecase.go
package usecases

type UserUseCase struct { ... }
func (uc *UserUseCase) CreateUser(...) (*entities.User, error) { ... }
` + "```" + `

## Adapters Package

` + "```go" + `
// adapters/http/user_handler.go
package http

type UserHandler struct { ... }
func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) { ... }

// adapters/db/sqlite/user_repository.go
package sqlite

type UserRepository struct { ... }
func (r *UserRepository) Save(ctx context.Context, user *entities.User) error { ... }
` + "```",
				},
			},
		},
		{
			Title: "Testing Hexagonal Applications",
			Order: 7,
			Content: `# Testing Hexagonal Applications

One of the biggest benefits of Hexagonal Architecture is **testability**. Each layer can be tested in isolation.`,
			Sublessons: []Lesson{
				{
					Title: "Testing the Domain",
					Order: 1,
					Content: `# Testing the Domain

Domain tests are pure unit tests - no mocks needed!

` + "```go" + `
func TestNewUser_ValidInput(t *testing.T) {
    user, err := entities.NewUser("John", "john@example.com")

    assert.NoError(t, err)
    assert.Equal(t, "John", user.Name)
    assert.Equal(t, "john@example.com", user.Email)
    assert.NotEmpty(t, user.ID)
}

func TestNewUser_InvalidEmail(t *testing.T) {
    _, err := entities.NewUser("John", "invalid-email")

    assert.ErrorIs(t, err, entities.ErrInvalidEmail)
}

func TestNewUser_ShortName(t *testing.T) {
    _, err := entities.NewUser("J", "john@example.com")

    assert.ErrorIs(t, err, entities.ErrNameTooShort)
}

func TestMoney_Add_SameCurrency(t *testing.T) {
    m1, _ := entities.NewMoney(100, "USD")
    m2, _ := entities.NewMoney(50, "USD")

    result, err := m1.Add(m2)

    assert.NoError(t, err)
    assert.Equal(t, int64(150), result.Amount())
}
` + "```" + `

These tests run in **milliseconds** with no external dependencies!`,
				},
				{
					Title: "Testing Use Cases",
					Order: 2,
					Content: `# Testing Use Cases

Use case tests use mock adapters to verify orchestration logic.

` + "```go" + `
func TestCreateUser_Success(t *testing.T) {
    // Arrange
    mockRepo := &mocks.UserRepository{}
    mockEmail := &mocks.EmailSender{}
    logger := slog.New(slog.NewTextHandler(io.Discard, nil))

    mockRepo.On("FindByEmail", mock.Anything, "john@example.com").
        Return(nil, entities.ErrUserNotFound)
    mockRepo.On("Save", mock.Anything, mock.AnythingOfType("*entities.User")).
        Return(nil)
    mockEmail.On("SendWelcomeEmail", mock.Anything, "john@example.com", "John").
        Return(nil)

    useCase := usecases.NewUserUseCase(mockRepo, mockEmail, logger)

    // Act
    user, err := useCase.CreateUser(context.Background(), ports.CreateUserInput{
        Name:  "John",
        Email: "john@example.com",
    })

    // Assert
    assert.NoError(t, err)
    assert.Equal(t, "John", user.Name)
    mockRepo.AssertExpectations(t)
    mockEmail.AssertExpectations(t)
}

func TestCreateUser_EmailTaken(t *testing.T) {
    mockRepo := &mocks.UserRepository{}
    existingUser := &entities.User{Email: "john@example.com"}

    mockRepo.On("FindByEmail", mock.Anything, "john@example.com").
        Return(existingUser, nil)

    useCase := usecases.NewUserUseCase(mockRepo, nil, nil)

    _, err := useCase.CreateUser(context.Background(), ports.CreateUserInput{
        Email: "john@example.com",
    })

    assert.ErrorIs(t, err, entities.ErrEmailTaken)
}
` + "```",
				},
				{
					Title: "Integration and E2E Tests",
					Order: 3,
					Content: `# Integration and E2E Tests

## Testing Adapters

Test adapters against real infrastructure (databases, APIs):

` + "```go" + `
func TestSQLiteUserRepository_Save(t *testing.T) {
    // Use test database
    db := setupTestDB(t)
    repo := sqlite.NewUserRepository(db)

    user, _ := entities.NewUser("John", "john@example.com")

    err := repo.Save(context.Background(), user)

    assert.NoError(t, err)

    // Verify in database
    found, err := repo.FindByID(context.Background(), user.ID)
    assert.NoError(t, err)
    assert.Equal(t, user.Email, found.Email)
}
` + "```" + `

## End-to-End Tests

Test the full flow through HTTP:

` + "```go" + `
func TestCreateUser_HTTP(t *testing.T) {
    // Start test server with real dependencies
    server := setupTestServer(t)

    resp, err := http.Post(
        server.URL+"/users",
        "application/json",
        strings.NewReader(` + "`" + `{"name":"John","email":"john@example.com"}` + "`" + `),
    )

    assert.NoError(t, err)
    assert.Equal(t, http.StatusCreated, resp.StatusCode)
}
` + "```" + `

## The Testing Pyramid

- **Many** domain unit tests (fast, isolated)
- **Some** use case tests with mocks
- **Few** adapter integration tests
- **Fewer** E2E tests`,
				},
			},
		},
		{
			Title: "Putting It All Together",
			Order: 8,
			Content: `# Putting It All Together

Let's review what we've learned and see how all the pieces fit together.

## The Complete Picture

1. **Domain** - Pure business logic (entities, value objects, domain services)
2. **Ports** - Interfaces defining contracts (driving and driven)
3. **Adapters** - Concrete implementations (HTTP handlers, repositories)
4. **Use Cases** - Orchestrate operations between ports and domain

## Benefits Recap

| Benefit | How Hex Arch Achieves It |
|---------|--------------------------|
| Testability | Domain has no dependencies, use mocks for adapters |
| Flexibility | Swap adapters without changing business logic |
| Maintainability | Clear boundaries, each layer has one job |
| Framework Independence | Domain doesn't know about frameworks |

## When to Use Hexagonal Architecture

**Good fit:**
- Long-lived applications
- Complex business logic
- Multiple interfaces (web, mobile, CLI)
- Team larger than 2-3 developers

**Overkill for:**
- Simple CRUD applications
- Prototypes or throwaway code
- Very small teams or solo projects

## Next Steps

1. Start with the domain - what are your core entities?
2. Define your ports - what does your app do? What does it need?
3. Implement adapters - connect to the real world
4. Wire it together in main.go

Happy architecting!`,
		},
	}

	// Marshal to JSON
	lessonsJSON, err := json.Marshal(lessons)
	if err != nil {
		log.Fatal("Failed to marshal lessons:", err)
	}

	// Update database
	query := `UPDATE library_courses SET lessons = ?, updated_at = datetime('now') WHERE id = ?`
	result, err := db.Exec(query, string(lessonsJSON), courseID)
	if err != nil {
		log.Fatal("Failed to update course:", err)
	}

	rows, _ := result.RowsAffected()
	fmt.Printf("Updated %d rows\n", rows)
	fmt.Println("Hexagonal Architecture course updated with subchapters!")
}
