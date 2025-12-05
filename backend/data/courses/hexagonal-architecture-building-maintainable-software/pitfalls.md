# Common Pitfalls

Mistakes to avoid when implementing Hexagonal Architecture.

---

## Pitfall 1: Anemic Domain Model

### What people do wrong
Creating entities that are just data containers with getters and setters, while all business logic lives in services.

```go
// ❌ WRONG: Anemic entity
type Book struct {
    ID        string
    Title     string
    Available bool
}

// All logic in service
func (s *BookService) BorrowBook(book *Book, user *User) error {
    if !book.Available {
        return errors.New("book not available")
    }
    book.Available = false
    // ...
}
```

### Why it's a problem
- Business rules are scattered across services
- Easy to bypass rules by manipulating data directly
- Harder to test business logic in isolation
- Violates encapsulation

### The correct approach
```go
// ✅ RIGHT: Rich domain model
type Book struct {
    id        string
    title     string
    available bool
}

func (b *Book) Borrow(borrower *User) (*Loan, error) {
    if !b.available {
        return nil, ErrBookNotAvailable
    }
    b.available = false
    return NewLoan(b, borrower), nil
}
```

### How to recognize the mistake
- Entities have only getters/setters
- Services contain `if` statements checking entity state
- You can create invalid entities

---

## Pitfall 2: Leaking Infrastructure into Domain

### What people do wrong
Importing database, HTTP, or framework packages in domain code.

```go
// ❌ WRONG: Domain knows about infrastructure
package domain

import (
    "database/sql"
    "encoding/json"
)

type User struct {
    ID   sql.NullString  // Database type leaked!
    Data json.RawMessage // JSON concern leaked!
}
```

### Why it's a problem
- Domain becomes coupled to specific technologies
- Can't test domain without infrastructure
- Changing databases requires changing domain
- Breaks the core principle of Hexagonal Architecture

### The correct approach
```go
// ✅ RIGHT: Pure domain
package domain

type User struct {
    ID       string
    Metadata map[string]string
}
```

Adapters handle the translation:
```go
package postgres

func (r *UserRepo) toEntity(row *sql.Row) *domain.User {
    var id sql.NullString
    row.Scan(&id)
    return &domain.User{ID: id.String}
}
```

### How to recognize the mistake
- Domain package imports `database/sql`, `net/http`, `encoding/json`
- Domain types include framework-specific tags (`json:`, `gorm:`, `db:`)
- Tests require database connections

---

## Pitfall 3: Port Explosion

### What people do wrong
Creating a separate port (interface) for every single method.

```go
// ❌ WRONG: Too many ports
type BookFinder interface { FindByID(id string) (*Book, error) }
type BookSaver interface { Save(book *Book) error }
type BookDeleter interface { Delete(id string) error }
type BookLister interface { List() ([]*Book, error) }
type BookSearcher interface { Search(query string) ([]*Book, error) }
```

### Why it's a problem
- Excessive complexity
- Hard to navigate codebase
- Adapter classes implement dozens of tiny interfaces
- Dependency injection becomes unwieldy

### The correct approach
```go
// ✅ RIGHT: Cohesive port
type BookRepository interface {
    FindByID(id string) (*Book, error)
    Save(book *Book) error
    Delete(id string) error
    List() ([]*Book, error)
    Search(query string) ([]*Book, error)
}
```

Group related operations into cohesive interfaces.

### How to recognize the mistake
- More interfaces than methods
- Each interface has only one method
- Constructors take 10+ interface parameters

---

## Pitfall 4: Skipping the Port Layer

### What people do wrong
Having use cases directly depend on concrete adapters.

```go
// ❌ WRONG: Direct dependency on adapter
type BorrowBookUseCase struct {
    repo *postgres.BookRepository  // Concrete type!
}
```

### Why it's a problem
- Can't swap implementations for testing
- Tight coupling to infrastructure
- Loses the main benefit of Hexagonal Architecture

### The correct approach
```go
// ✅ RIGHT: Depend on port
type BorrowBookUseCase struct {
    repo BookRepository  // Interface!
}
```

### How to recognize the mistake
- Use cases import adapter packages
- Tests require real databases/services
- Changing infrastructure requires changing application layer

---

## Pitfall 5: Business Logic in Adapters

### What people do wrong
Putting validation, calculations, or decisions in HTTP handlers or repositories.

```go
// ❌ WRONG: Business logic in handler
func (h *Handler) BorrowBook(w http.ResponseWriter, r *http.Request) {
    book := h.repo.FindByID(r.URL.Query().Get("id"))

    // Business logic leaked into adapter!
    if book.AvailableCopies <= 0 {
        http.Error(w, "No copies available", 400)
        return
    }
    if user.ActiveLoans >= 5 {
        http.Error(w, "Loan limit reached", 400)
        return
    }

    book.AvailableCopies--
    h.repo.Save(book)
}
```

### Why it's a problem
- Business rules can't be tested without HTTP
- Rules are duplicated if you add a CLI or GraphQL adapter
- Logic is scattered and hard to find

### The correct approach
```go
// ✅ RIGHT: Business logic in domain/use case
func (h *Handler) BorrowBook(w http.ResponseWriter, r *http.Request) {
    err := h.borrowBookUseCase.Execute(bookID, userID)
    if err != nil {
        // Just translate errors to HTTP
        http.Error(w, err.Error(), errorToStatus(err))
        return
    }
    w.WriteHeader(200)
}
```

### How to recognize the mistake
- Handlers/repositories contain `if` statements with business conditions
- Same validation code appears in multiple adapters
- You test business rules through HTTP

---

## Pitfall 6: Wrong Dependency Direction

### What people do wrong
Having inner layers depend on outer layers.

```go
// ❌ WRONG: Domain depends on application
package domain

import "myapp/application" // Wrong direction!

type Book struct {
    service application.BookService // Inner depends on outer!
}
```

### Why it's a problem
- Circular dependencies
- Can't compile or test layers independently
- Violates Dependency Inversion Principle

### The correct approach
Dependencies always point inward:
```
Adapters → Application → Domain
```

Domain knows nothing about the outside world.

### How to recognize the mistake
- Import cycles in your code
- Domain package imports application or adapter packages
- Compiler errors about circular dependencies

---

## Pitfall 7: Over-Engineering Simple Apps

### What people do wrong
Applying full Hexagonal Architecture to a simple CRUD app.

```go
// ❌ OVERKILL for a TODO app
type CreateTodoUseCase struct { ... }
type CreateTodoPort interface { ... }
type CreateTodoRequest struct { ... }
type CreateTodoResponse struct { ... }
// 20 files for a 3-field entity...
```

### Why it's a problem
- Massive overhead for simple logic
- Slower development
- More code to maintain
- The "architecture" becomes the complexity

### The correct approach
Use judgment. Hexagonal Architecture shines when:
- Business logic is complex
- You need multiple adapters (mobile + web + CLI)
- Long-term maintainability matters
- Testing is important

Skip it when:
- It's a prototype
- Simple CRUD with no business rules
- Solo project you'll finish in a week

### How to recognize the mistake
- More infrastructure code than business code
- You're copying patterns without needing them
- Development feels slow for simple features

---

## Quick Reference

| Pitfall | Sign | Fix |
|---------|------|-----|
| Anemic Domain | Entities are just data | Move logic into entities |
| Leaking Infrastructure | Domain imports `sql`, `http` | Keep domain pure |
| Port Explosion | One method per interface | Group related operations |
| Skipping Ports | Use cases have concrete deps | Depend on interfaces |
| Logic in Adapters | Business rules in handlers | Move to domain/use cases |
| Wrong Direction | Domain imports application | Inner never imports outer |
| Over-Engineering | More arch than business code | Match complexity to need |
