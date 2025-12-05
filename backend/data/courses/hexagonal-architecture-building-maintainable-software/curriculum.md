# Hexagonal Architecture: Building Maintainable Software - Full Curriculum

## Course Description

This comprehensive course takes you from understanding why traditional architecture fails to implementing a complete Hexagonal Architecture system. You'll learn the theory, see it in practice, and build the skills to apply these patterns in your own projects.

**Follow Sam's Journey:** Throughout this course, you'll follow Sam, a solo founder who built BookShelf—a digital library management system—quickly to validate the idea. Now with paying customers, an investor demanding mobile apps, and an enterprise customer requiring on-premise deployment, Sam must transform a tangled codebase into something maintainable. Hexagonal Architecture becomes the lifeline.

By the end of this course, you'll be able to design, implement, and test applications using Hexagonal Architecture principles.

---

## Chapter 1: Introduction to Hexagonal Architecture

**Overview:** Set the foundation by understanding why Hexagonal Architecture exists and what problems it solves.

**Sam's Story:** Sam built BookShelf in a weekend hackathon and it worked! But now, 6 months later, the codebase is a nightmare. HTTP handlers call the database directly, email sending is mixed with business logic, and writing tests seems impossible. Sam's former colleague Alex suggests looking into Hexagonal Architecture.

**What You'll Learn:**
- Why traditional layered architecture leads to tightly-coupled, hard-to-test code
- The core idea behind Hexagonal Architecture
- How this pattern enables true separation of concerns

### Sub-chapters:

1. **The Problem: Why Traditional Architecture Fails** - Explore Sam's original BookShelf code and the pain it causes
2. **The Big Picture: What is Hexagonal Architecture?** - Introduction to the hexagon metaphor and core concepts
3. **History and Alternative Names** - Ports and Adapters, Onion Architecture, and Clean Architecture connections
4. **Key Benefits** - Testability, flexibility, and maintainability explained
5. **When to Use (and When Not To)** - Practical guidance for choosing this architecture

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 2: Core Concepts - Ports

**Overview:** Deep dive into Ports - the interfaces that define how your application communicates with the world.

**Sam's Story:** Alex explains that Sam's first step is understanding "ports" - the contracts that define what BookShelf needs from the outside world (like a database) and what it offers to the outside world (like a book borrowing service). Sam starts sketching out what these interfaces might look like.

**What You'll Learn:**
- The difference between Driving and Driven Ports
- How to design effective port interfaces
- Common port patterns and anti-patterns

### Sub-chapters:

1. **What Are Ports?** - Definition and purpose of ports in the architecture
2. **Driving Ports (Inbound)** - Interfaces that the outside world calls
3. **Driven Ports (Outbound)** - Interfaces that your application needs from the world
4. **Port Design Guidelines** - Best practices for creating clean, focused interfaces
5. **Common Port Patterns** - Repository, Notification, and Service port examples

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 3: Core Concepts - Adapters

**Overview:** Learn about Adapters - the concrete implementations that connect your application to the real world.

**Sam's Story:** With ports defined, Sam learns about adapters - the actual implementations. This is exciting: Sam realizes that by creating a `PostgresBookRepository` adapter AND an `SQLiteBookRepository` adapter, BookShelf could support both Maya's cloud deployment AND Chen's on-premise requirement!

**What You'll Learn:**
- How adapters implement ports
- The difference between driving and driven adapters
- How to swap adapters without changing business logic

### Sub-chapters:

1. **What Are Adapters?** - The bridge between ports and external systems
2. **Driving Adapters (Inbound)** - HTTP handlers, CLI commands, GraphQL resolvers
3. **Driven Adapters (Outbound)** - Database repositories, email senders, API clients
4. **The Power of Swappable Adapters** - Testing with mocks, switching databases
5. **Adapter Implementation Patterns** - Constructor injection and configuration

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 4: The Domain Layer

**Overview:** The heart of your application - where business logic lives, pure and untainted by infrastructure.

**Sam's Story:** Sam extracts BookShelf's business rules from the HTTP handlers into a clean domain layer. The `Book` entity now has a `Borrow()` method that enforces the rule "users can't borrow more than 5 books." The `Loan` value object calculates due dates. No database imports, no HTTP concerns - just pure business logic.

**What You'll Learn:**
- How to design entities and value objects
- When to use domain services
- The golden rules that keep your domain clean

### Sub-chapters:

1. **Entities: Objects with Identity** - Designing Book, User, and Loan entities
2. **Value Objects: Immutable Values** - ISBN, Email, and DateRange as value objects
3. **Domain Services** - Business logic that doesn't belong to a single entity
4. **The Golden Rules of the Domain** - No infrastructure imports, no framework dependencies
5. **Domain Errors** - Typed, meaningful errors that speak the business language

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 5: Use Cases - Orchestrating Business Operations

**Overview:** Learn how Use Cases coordinate the flow between ports and domain logic.

**Sam's Story:** Sam creates use cases like `BorrowBookUseCase` and `ReturnBookUseCase`. Each one is a single business operation that coordinates between repositories and domain logic. The HTTP handler becomes incredibly thin - it just translates HTTP to a use case call.

**What You'll Learn:**
- The role of use cases in the architecture
- How to structure use cases for clarity and testability
- Common use case patterns

### Sub-chapters:

1. **What is a Use Case?** - Single business operations as first-class citizens
2. **Anatomy of a Use Case** - Input, processing, and output structure
3. **Use Case Patterns** - Command/Query separation and more
4. **Error Handling in Use Cases** - Translating domain errors to appropriate responses
5. **Use Case Testing Strategies** - Unit testing with mock adapters

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 6: Project Structure

**Overview:** How to organize your codebase to make Hexagonal Architecture visible and maintainable.

**Sam's Story:** Sam restructures the entire BookShelf project. The new layout has clear directories: `domain/` for pure business logic, `application/` for use cases, `ports/` for interfaces, and `adapters/` for implementations. Anyone joining the project can immediately understand where things belong.

**What You'll Learn:**
- Recommended directory layouts for Go projects
- Package organization strategies
- The dependency direction rule in practice

### Sub-chapters:

1. **The Recommended Layout** - cmd, domain, application, adapters, config
2. **The cmd Directory** - Entry points and dependency wiring
3. **Package Organization** - Grouping by feature vs. grouping by layer
4. **Dependency Direction** - Enforcing the "always inward" rule
5. **Configuration Management** - Environment-based adapter selection

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 7: Testing Hexagonal Applications

**Overview:** One of the biggest benefits of Hexagonal Architecture - learn how to test at every level.

**Sam's Story:** For the first time ever, Sam writes real tests for BookShelf! Domain logic tests are pure and fast. Use case tests use mock repositories. Integration tests verify the PostgreSQL adapter actually works. Sam goes from 0% coverage to 85% in a week.

**What You'll Learn:**
- The testing pyramid for hexagonal applications
- How to test domain logic in complete isolation
- Integration and E2E testing strategies

### Sub-chapters:

1. **The Testing Pyramid** - Unit, Integration, and E2E tests in context
2. **Testing the Domain** - Pure unit tests with no mocks needed
3. **Testing Use Cases** - Mock adapters for isolated business logic tests
4. **Testing Adapters** - Integration tests with real dependencies
5. **E2E Tests** - Full system testing through driving adapters

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 8: Putting It All Together

**Overview:** Review, synthesis, and guidance for applying what you've learned.

**Sam's Story:** BookShelf is transformed. Sam demos the new architecture to Maya (investor) and Chen (enterprise customer). Maya sees how easy it is to add a mobile API. Chen sees the SQLite adapter for on-premise. Both are impressed. Sam finally has a codebase to be proud of.

**What You'll Learn:**
- How all the pieces fit together
- Common pitfalls and how to avoid them
- When Hexagonal Architecture is the right choice

### Sub-chapters:

1. **The Complete Picture** - End-to-end request flow through the architecture
2. **Benefits Recap** - Testability, flexibility, maintainability summarized
3. **Common Pitfalls** - Mistakes to avoid when implementing
4. **When to Use Hexagonal Architecture** - Good fit vs. overkill scenarios
5. **Resources and Next Steps** - Books, articles, and communities for further learning

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 9: Real-World Patterns

**Overview:** Advanced patterns and solutions for common challenges.

**Sam's Story:** BookShelf is growing. Sam needs to add transaction logging, caching for popular books, and metrics. But where do these cross-cutting concerns fit? Alex guides Sam through advanced patterns that keep the architecture clean while adding enterprise features.

**What You'll Learn:**
- Handling cross-cutting concerns
- Transaction management across adapters
- Event-driven patterns in Hexagonal Architecture

### Sub-chapters:

1. **Cross-Cutting Concerns** - Logging, metrics, and tracing without pollution
2. **Transaction Management** - Coordinating database transactions
3. **Event-Driven Patterns** - Domain events and eventual consistency
4. **Caching Strategies** - Where caching fits in the architecture
5. **API Versioning** - Managing change in driving adapters

**Chapter Quiz:** 4 questions testing comprehension

---

## Chapter 10: Migration Strategies

**Overview:** How to gradually migrate existing applications to Hexagonal Architecture.

**Sam's Story:** Sam's friend Riley has an even messier codebase. Sam shares what was learned and helps Riley plan an incremental migration using the Strangler Fig pattern. No big-bang rewrite - just gradual improvement while the system keeps running.

**What You'll Learn:**
- Strategies for incremental migration
- Identifying seams in existing code
- Managing risk during migration

### Sub-chapters:

1. **Assessing Your Current Architecture** - Finding coupling and pain points
2. **The Strangler Fig Pattern** - Gradual replacement strategy
3. **Extracting the Domain** - Moving business logic out of handlers
4. **Introducing Ports and Adapters** - Creating interfaces incrementally
5. **Validating the Migration** - Testing and measuring success

**Chapter Quiz:** 4 questions testing comprehension

---

## What You'll Build with Sam

Throughout this course, you'll see BookShelf evolve:

| Chapter | BookShelf Feature | Architecture Concept |
|---------|-------------------|---------------------|
| 1 | Recognize the tangled mess | Why architecture matters |
| 2 | Define repository and service interfaces | Ports |
| 3 | Implement PostgreSQL, SQLite, HTTP | Adapters |
| 4 | Extract Book, User, Loan entities | Domain Layer |
| 5 | Create BorrowBook, ReturnBook operations | Use Cases |
| 6 | Restructure the entire project | Project Structure |
| 7 | Add comprehensive test coverage | Testing |
| 8 | Demo to Maya and Chen | Integration |
| 9 | Add logging, caching, metrics | Advanced Patterns |
| 10 | Help Riley migrate their codebase | Migration |

## Character Cast

The course features recurring characters:

- **Sam** - Protagonist, solo founder who built BookShelf
- **Alex** - Senior architect mentor who guides Sam
- **Maya** - Angel investor who needs mobile app support
- **Chen** - Enterprise customer (Riverside Library) requiring on-premise deployment
- **Riley** - Sam's friend with an even messier codebase to migrate

## Certificate of Completion

Upon completing all 10 chapters and passing all quizzes, you'll receive a certificate of completion that you can share on LinkedIn and add to your resume.

---

**Total Course Content:**
- 10 Chapters
- 50 Sub-chapters
- 10 Chapter Quizzes
- 1 Final Exam (20 questions)
- 12 Hours of Content
- Lifetime Access
