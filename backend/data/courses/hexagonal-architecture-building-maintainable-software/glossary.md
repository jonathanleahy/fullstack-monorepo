# Hexagonal Architecture Glossary

Key terms and definitions used throughout this course.

---

## A

### Adapter
A concrete implementation that connects a port to the outside world. Adapters translate between the application's internal language (ports) and external systems (databases, APIs, UIs). *See: Chapter 3*

### Application Layer
The layer containing use cases that orchestrate domain logic. Also called the "service layer" in some architectures. *See: Chapter 5*

---

## B

### Boundary
The edge of the hexagon where the application meets the external world. All communication crosses boundaries through ports. *See: Chapter 1*

---

## C

### Clean Architecture
A related architecture pattern by Robert C. Martin that shares principles with Hexagonal Architecture. Features concentric circles with dependencies pointing inward. *See: Chapter 1*

### Command
An operation that changes state in the system. In CQRS, commands are handled separately from queries. *See: Chapter 5*

---

## D

### Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules; both should depend on abstractions. Core principle enabling Hexagonal Architecture. *See: Chapter 4*

### Domain
The core business logic of the application, completely isolated from infrastructure concerns. The "inside" of the hexagon. *See: Chapter 4*

### Domain Service
Business logic that doesn't naturally belong to a single entity. Operates on multiple entities or external data. *See: Chapter 4*

### Driven Adapter (Secondary Adapter)
An adapter that the application drives/calls. Examples: database repositories, email senders, API clients. The application tells these what to do. *See: Chapter 3*

### Driven Port (Secondary Port)
An interface that the application needs from the outside world. Defines what the application requires from external systems. *See: Chapter 2*

### Driving Adapter (Primary Adapter)
An adapter that drives/calls the application. Examples: HTTP handlers, CLI commands, GraphQL resolvers. Users interact through these. *See: Chapter 3*

### Driving Port (Primary Port)
An interface that the outside world uses to interact with the application. Defines the application's capabilities. *See: Chapter 2*

---

## E

### Entity
A domain object with a unique identity that persists over time. Identity matters more than attributes. Example: a User with a unique ID. *See: Chapter 4*

---

## H

### Hexagon
The visual metaphor for the architecture. The application sits inside; ports are the edges; adapters connect to external systems. *See: Chapter 1*

---

## I

### Inbound
Synonym for "driving" - something coming into the application from outside. Inbound adapters handle external requests. *See: Chapter 2*

### Infrastructure
External systems and technical details: databases, message queues, HTTP servers, file systems. Lives outside the hexagon. *See: Chapter 3*

---

## O

### Onion Architecture
A related pattern by Jeffrey Palermo. Uses concentric layers with the domain at the center. Very similar to Hexagonal Architecture. *See: Chapter 1*

### Outbound
Synonym for "driven" - something going out from the application. Outbound adapters send requests to external systems. *See: Chapter 2*

---

## P

### Port
An interface defining how the application communicates with the outside world. Ports are technology-agnostic contracts. *See: Chapter 2*

### Ports and Adapters
Alternative name for Hexagonal Architecture, emphasizing the two key concepts. *See: Chapter 1*

### Primary
Synonym for "driving" - the primary actors that initiate interactions with the application. *See: Chapter 2*

### Projection
A read-optimized view of data, often created by projecting events or denormalizing for queries. *See: Chapter 9*

---

## Q

### Query
An operation that reads data without changing state. In CQRS, queries are handled separately from commands. *See: Chapter 5*

---

## R

### Repository
A port/adapter pattern for data persistence. The port defines data access operations; the adapter implements them for specific databases. *See: Chapter 3*

---

## S

### Secondary
Synonym for "driven" - secondary actors that the application calls when needed. *See: Chapter 2*

### Separation of Concerns
The principle of dividing a system into distinct sections, each addressing a separate concern. Core goal of Hexagonal Architecture. *See: Chapter 1*

### Service Layer
See Application Layer. Contains use cases that coordinate domain operations. *See: Chapter 5*

### Strangler Fig Pattern
A migration strategy where new code gradually replaces old code, like a strangler fig tree enveloping its host. *See: Chapter 10*

---

## T

### Testability
The ease with which code can be tested. Hexagonal Architecture dramatically improves testability by isolating the domain. *See: Chapter 7*

---

## U

### Use Case
A single business operation that the application supports. Use cases orchestrate domain logic and port calls. *See: Chapter 5*

---

## V

### Value Object
A domain object defined by its attributes rather than identity. Two value objects with the same attributes are equal. Example: Money, Address. *See: Chapter 4*

---

## Quick Reference Table

| Term | Also Known As | Chapter |
|------|---------------|---------|
| Driving Port | Primary Port, Inbound Port | 2 |
| Driven Port | Secondary Port, Outbound Port | 2 |
| Driving Adapter | Primary Adapter, Inbound Adapter | 3 |
| Driven Adapter | Secondary Adapter, Outbound Adapter | 3 |
| Application Layer | Service Layer, Use Case Layer | 5 |
| Hexagonal Architecture | Ports and Adapters | 1 |
