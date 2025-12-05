# Frequently Asked Questions

Common questions about this course and Hexagonal Architecture.

---

## Course Questions

### Who is this course for?

This course is designed for:
- Backend developers wanting to write more maintainable code
- Developers struggling with tightly-coupled legacy systems
- Tech leads evaluating architectural patterns
- Anyone preparing for system design interviews

You should have basic Go programming knowledge and understand interfaces.

### How long does the course take?

The course contains approximately 12 hours of content across 10 chapters and 50 sub-chapters. Most students complete it in 2-3 weeks studying part-time.

### Do I need to know Go?

Yes, code examples are in Go. However, the concepts apply to any language. If you know another language with interfaces (Java, TypeScript, C#), you'll be able to follow along and translate concepts.

### Is there a certificate?

Yes! Upon completing all 10 chapters and passing all quizzes with 70% or higher, you'll receive a certificate of completion.

### Who is Sam?

Sam is the protagonist of our story. Throughout the course, you'll follow Sam—a solo founder who built BookShelf (a digital library management system) and must transform it from a tangled mess into maintainable software using Hexagonal Architecture.

---

## Architecture Questions

### What's the difference between Hexagonal, Clean, and Onion Architecture?

All three share the same core principle: **dependencies point inward** toward the domain. The differences are mostly in terminology and visual representation:

| Architecture | Creator | Visual | Key Concept |
|--------------|---------|--------|-------------|
| Hexagonal | Alistair Cockburn | Hexagon with ports | Ports & Adapters |
| Clean | Robert C. Martin | Concentric circles | Use Cases & Entities |
| Onion | Jeffrey Palermo | Concentric circles | Domain at center |

In practice, they're interchangeable. This course uses "Hexagonal" terminology.

### Is Hexagonal Architecture the same as Domain-Driven Design (DDD)?

No, but they complement each other well:
- **Hexagonal Architecture** is about *structure* - how layers communicate
- **DDD** is about *modeling* - how to capture business concepts

You can use Hexagonal Architecture without DDD, and vice versa. Many teams use both together.

### When should I NOT use Hexagonal Architecture?

Skip it when:
- Building a simple CRUD app with no complex business logic
- Creating a prototype or throwaway code
- Working on a script or CLI tool
- The overhead isn't worth it (small team, simple domain)

The course covers this in detail in Chapter 1.

### How many ports should I have?

There's no fixed number. Start with the ports you need:
- One driving port per use case group (e.g., `UserService`, `BookService`)
- One driven port per external dependency type (e.g., `UserRepository`, `EmailSender`)

Avoid creating ports for every single function.

### Can I have multiple adapters for one port?

Yes! This is the power of the pattern. Common examples:
- `PostgresUserRepository` and `InMemoryUserRepository` for the `UserRepository` port
- `HTTPUserHandler` and `CLIUserHandler` for the `UserService` port
- `SendGridEmailSender` and `MockEmailSender` for the `EmailSender` port

### Should the domain know about ports?

No. The domain should be completely pure—no imports from the port layer. Ports depend on domain types, not the other way around.

```
✅ Port imports Domain
❌ Domain imports Port
```

---

## Implementation Questions

### How do I handle transactions across multiple repositories?

Use a Unit of Work pattern or transaction coordinator in the application layer. The use case starts the transaction, calls repositories, then commits or rolls back.

```go
func (uc *BorrowBookUseCase) Execute(userID, bookID string) error {
    return uc.txManager.WithTransaction(func(tx Transaction) error {
        // All repository calls use this transaction
        book, _ := uc.bookRepo.FindByID(tx, bookID)
        user, _ := uc.userRepo.FindByID(tx, userID)
        // ... business logic
        return uc.loanRepo.Save(tx, loan)
    })
}
```

### Where should validation live?

**Domain validation** (business rules) belongs in entities and value objects:
```go
func NewBook(title string) (*Book, error) {
    if len(title) < 1 {
        return nil, ErrBookTitleRequired // Domain error
    }
    return &Book{Title: title}, nil
}
```

**Input validation** (format, required fields) can live in adapters:
```go
func (h *Handler) CreateBook(w http.ResponseWriter, r *http.Request) {
    if req.Title == "" {
        http.Error(w, "title required", 400) // HTTP concern
        return
    }
    // Call use case...
}
```

### How do I test adapters?

Adapters require integration tests with real (or containerized) dependencies:

```go
func TestPostgresBookRepository(t *testing.T) {
    // Use testcontainers or a test database
    db := setupTestDB(t)
    repo := postgres.NewBookRepository(db)

    book := domain.NewBook("Clean Code")
    err := repo.Save(book)

    assert.NoError(t, err)
    // ...
}
```

Use cases and domain can be unit tested with mock adapters.

### What about caching?

Caching can be implemented as a decorator adapter:

```go
type CachedBookRepository struct {
    inner BookRepository
    cache Cache
}

func (r *CachedBookRepository) FindByID(id string) (*Book, error) {
    if cached, ok := r.cache.Get(id); ok {
        return cached.(*Book), nil
    }
    book, err := r.inner.FindByID(id)
    if err == nil {
        r.cache.Set(id, book)
    }
    return book, err
}
```

This keeps caching concerns out of both the domain and the primary repository.

---

## Migration Questions

### How do I migrate an existing codebase?

Use the Strangler Fig Pattern (Chapter 10):
1. Identify a bounded context or feature to migrate first
2. Extract the domain logic into a clean domain package
3. Create ports for the extracted functionality
4. Implement adapters that work with existing infrastructure
5. Gradually route traffic to the new code
6. Repeat for other areas

### Should I migrate all at once or incrementally?

**Incrementally**. Big-bang rewrites usually fail. The Strangler Fig approach lets you:
- Deliver value continuously
- Learn and adjust as you go
- Reduce risk
- Keep the system running

### How long does migration take?

It depends on codebase size and complexity. Expect:
- Small app (< 10k lines): 1-2 weeks
- Medium app (10k-50k lines): 1-3 months
- Large app (> 50k lines): 6-12 months+

The good news: you get benefits incrementally, not just at the end.

---

## Still have questions?

The concepts covered in each chapter include detailed explanations and code examples. If you're stuck on a specific chapter, revisit the sub-chapters and quiz questions for reinforcement.
