# Driven Ports (Outbound)

**Who uses them:** Your application
**What they do:** Define what your application NEEDS

Think: "What external capabilities does my application require?"

## Driven Port Flow

```mermaid
sequenceDiagram
    participant UC as Use Case
    participant Port as Repository (Port)
    participant Adapter as SQLite Adapter
    participant DB as Database

    UC->>Port: Save(user)
    Note over Port: Interface - domain doesn't know implementation
    Port->>Adapter: Actual implementation
    Adapter->>DB: INSERT INTO users...
    DB-->>Adapter: OK
    Adapter-->>Port: nil (success)
    Port-->>UC: nil (success)
```

```go
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
```

These ports are **defined by your domain** but **implemented by adapters**.