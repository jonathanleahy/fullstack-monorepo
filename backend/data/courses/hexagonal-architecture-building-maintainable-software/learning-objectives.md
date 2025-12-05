# Learning Objectives

Specific, measurable skills you'll gain from each chapter.

---

## Chapter 1: Introduction to Hexagonal Architecture

By the end of this chapter, you will be able to:

- [ ] **Identify coupling problems** in traditional layered architectures
- [ ] **Explain the hexagon metaphor** and why it's used
- [ ] **List 3+ benefits** of Hexagonal Architecture (testability, flexibility, maintainability)
- [ ] **Determine when to use** (and when not to use) this pattern

**Self-Check Questions:**
1. What's wrong with an HTTP handler that directly calls `db.Query()`?
2. Why is the architecture called "hexagonal"?
3. When would you NOT use Hexagonal Architecture?

---

## Chapter 2: Core Concepts - Ports

By the end of this chapter, you will be able to:

- [ ] **Define what a port is** in Hexagonal Architecture
- [ ] **Distinguish driving ports from driven ports** with examples
- [ ] **Design a port interface** following best practices
- [ ] **Identify common port patterns** (Repository, Service, Notifier)

**Self-Check Questions:**
1. Is `UserRepository` a driving or driven port? Why?
2. What's wrong with a port that has 20 methods?
3. Write a port interface for sending notifications.

---

## Chapter 3: Core Concepts - Adapters

By the end of this chapter, you will be able to:

- [ ] **Define what an adapter is** and how it relates to ports
- [ ] **Implement a driving adapter** (HTTP handler calling a port)
- [ ] **Implement a driven adapter** (database repository implementing a port)
- [ ] **Swap adapters** without changing application code

**Self-Check Questions:**
1. What's the difference between a driving and driven adapter?
2. How would you test a use case without a real database?
3. Write a mock adapter for an email sender port.

---

## Chapter 4: The Domain Layer

By the end of this chapter, you will be able to:

- [ ] **Distinguish entities from value objects**
- [ ] **Design entities** with proper encapsulation
- [ ] **Create value objects** for domain concepts
- [ ] **Implement domain services** for cross-entity logic
- [ ] **Define domain errors** that speak the business language

**Self-Check Questions:**
1. Is "Money" an entity or value object? Why?
2. What imports should NEVER appear in domain code?
3. When should you use a domain service vs. entity method?

---

## Chapter 5: Use Cases - Orchestrating Operations

By the end of this chapter, you will be able to:

- [ ] **Define what a use case is** in the architecture
- [ ] **Structure a use case** with clear input, processing, and output
- [ ] **Implement error handling** that translates domain errors
- [ ] **Write unit tests** for use cases with mock adapters

**Self-Check Questions:**
1. What layer do use cases belong to?
2. Should a use case know about HTTP status codes? Why not?
3. How many things should one use case do?

---

## Chapter 6: Project Structure

By the end of this chapter, you will be able to:

- [ ] **Organize a Go project** following hexagonal structure
- [ ] **Set up the cmd directory** for entry points
- [ ] **Configure dependency injection** at application startup
- [ ] **Enforce dependency direction** (dependencies point inward)

**Self-Check Questions:**
1. What goes in the `cmd/` directory?
2. Which packages can import which? Draw the direction.
3. Where do you wire up concrete adapters?

---

## Chapter 7: Testing Hexagonal Applications

By the end of this chapter, you will be able to:

- [ ] **Describe the testing pyramid** for hexagonal apps
- [ ] **Write pure unit tests** for domain logic (no mocks needed)
- [ ] **Test use cases** with mock adapters
- [ ] **Write integration tests** for adapters
- [ ] **Design E2E tests** that go through driving adapters

**Self-Check Questions:**
1. Why don't domain tests need mocks?
2. What's the difference between use case tests and adapter tests?
3. When should you use integration tests vs. unit tests?

---

## Chapter 8: Putting It All Together

By the end of this chapter, you will be able to:

- [ ] **Trace a request** from adapter through use case to domain and back
- [ ] **Summarize the benefits** of the architecture
- [ ] **Identify common pitfalls** and how to avoid them
- [ ] **Evaluate whether** a project would benefit from hexagonal architecture

**Self-Check Questions:**
1. Walk through what happens when a user borrows a book.
2. What are 3 signs you've implemented hexagonal architecture wrong?
3. Would you use this architecture for a CLI tool? Why or why not?

---

## Chapter 9: Real-World Patterns

By the end of this chapter, you will be able to:

- [ ] **Handle cross-cutting concerns** (logging, metrics) without polluting domain
- [ ] **Manage transactions** across repository calls
- [ ] **Implement event-driven patterns** with domain events
- [ ] **Add caching** as a decorator adapter
- [ ] **Version APIs** in driving adapters

**Self-Check Questions:**
1. Where should logging happen - domain, use case, or adapter?
2. How do you ensure two repository operations happen in one transaction?
3. What's a domain event and when would you use one?

---

## Chapter 10: Migration Strategies

By the end of this chapter, you will be able to:

- [ ] **Assess an existing codebase** for migration readiness
- [ ] **Apply the Strangler Fig pattern** to gradually replace legacy code
- [ ] **Extract domain logic** from tangled handlers
- [ ] **Introduce ports incrementally** without breaking existing code
- [ ] **Measure migration success** with specific metrics

**Self-Check Questions:**
1. Why is a "big bang" rewrite risky?
2. How do you run old and new code side by side?
3. What metrics would show your migration is succeeding?

---

## Skills Checklist

Use this checklist to track your progress:

### Fundamental Skills
- [ ] I can explain Hexagonal Architecture to a colleague
- [ ] I can draw the hexagon diagram with ports and adapters
- [ ] I can identify whether a component is a port, adapter, or domain

### Design Skills
- [ ] I can design port interfaces for a new feature
- [ ] I can structure a domain layer with entities and value objects
- [ ] I can write use cases that orchestrate domain logic

### Implementation Skills
- [ ] I can implement driving adapters (HTTP, CLI)
- [ ] I can implement driven adapters (database, external APIs)
- [ ] I can wire up dependency injection at startup

### Testing Skills
- [ ] I can unit test domain logic without mocks
- [ ] I can test use cases with mock adapters
- [ ] I can write integration tests for adapters

### Advanced Skills
- [ ] I can add cross-cutting concerns without polluting domain
- [ ] I can manage transactions across repositories
- [ ] I can migrate legacy code incrementally

---

## Final Assessment Readiness

You're ready for the final exam when you can:

1. **Explain** the architecture to someone unfamiliar with it
2. **Design** a hexagonal structure for a new application
3. **Implement** ports, adapters, and domain from scratch
4. **Test** all layers appropriately
5. **Migrate** an existing codebase incrementally

Complete all chapter quizzes with 70%+ before attempting the final exam.
