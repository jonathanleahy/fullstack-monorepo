# Events Deep Dive: Beyond the Basics

## What the Main Page Introduced

The main page explained that an event is a record that something happened - a JSON message with source, type, time, and details. It also introduced the fundamental mental model shift: **with SQS, publishers decide where messages go; with EventBridge, consumers decide what they want.**

Now let's go deeper into the mechanics that matter when you're actually building systems.

## Going Deeper

In this sub-chapter, we'll explore:
1. **The complete event envelope** - Every field and what it's for
2. **Event-driven thinking** - How the mental model changes your architecture
3. **Event design patterns** - Fat vs thin events, when to use each
4. **AWS event examples** - What real events look like from S3, EC2, etc.
5. **Schema registry** - How EventBridge discovers and validates event structures
6. **Event versioning** - How to evolve events without breaking consumers

---

## The Complete Event Envelope

Every EventBridge event follows this structure:

```json
{
    "version": "0",
    "id": "12345678-1234-1234-1234-123456789012",
    "detail-type": "Pet Created",
    "source": "pettracker.pets",
    "account": "123456789012",
    "time": "2024-03-23T10:30:00Z",
    "region": "us-east-1",
    "resources": ["arn:aws:dynamodb:us-east-1:123456789012:table/pets"],
    "detail": {
        "petId": "pet-123",
        "userId": "user-456",
        "species": "dog",
        "name": "Buddy"
    }
}
```

### Field-by-Field Breakdown

| Field | Required | Purpose | Who Sets It |
|-------|----------|---------|-------------|
| `version` | Yes | Always "0" (reserved for future) | EventBridge |
| `id` | Yes | Unique event identifier (UUID) | EventBridge |
| `detail-type` | Yes | Human-readable event type | You (or AWS service) |
| `source` | Yes | Who sent this event | You (or AWS service) |
| `account` | Yes | AWS account ID | EventBridge |
| `time` | Yes | When the event occurred | You (or EventBridge) |
| `region` | Yes | AWS region | EventBridge |
| `resources` | No | Related AWS resources | Optional |
| `detail` | Yes | The actual event payload | You (or AWS service) |

**Key insight:** When you publish custom events, you control `source`, `detail-type`, `detail`, and optionally `time` and `resources`. EventBridge fills in the rest.

### The Source Field Convention

AWS services use a standard format: `aws.{service-name}`

```
aws.s3           - S3 events
aws.ec2          - EC2 events
aws.dynamodb     - DynamoDB events
aws.codepipeline - CodePipeline events
```

For your own events, use reverse domain notation:

```
com.pettracker.users      - User service events
com.pettracker.payments   - Payment service events
com.pettracker.orders     - Order service events
```

**Why this matters:** Rules can filter by source prefix, so organizing sources well enables powerful filtering:

```json
{
  "source": [{"prefix": "com.pettracker."}]
}
```

---

## Event Design Patterns

### Fat Events vs Thin Events

**Fat Event** - Contains all the data a consumer might need:

```json
{
  "detail-type": "Order Completed",
  "source": "pettracker.orders",
  "detail": {
    "orderId": "order-789",
    "userId": "user-456",
    "items": [
      {"productId": "prod-1", "name": "Dog Food", "price": 29.99, "quantity": 2},
      {"productId": "prod-2", "name": "Leash", "price": 15.99, "quantity": 1}
    ],
    "subtotal": 75.97,
    "tax": 6.08,
    "total": 82.05,
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "paymentMethod": "card_ending_4242",
    "status": "completed"
  }
}
```

**Thin Event** - Contains identifiers; consumers fetch details if needed:

```json
{
  "detail-type": "Order Completed",
  "source": "pettracker.orders",
  "detail": {
    "orderId": "order-789",
    "userId": "user-456",
    "total": 82.05
  }
}
```

### When to Use Each

| Pattern | Use When | Pros | Cons |
|---------|----------|------|------|
| **Fat** | Consumers need most data, data doesn't change | No extra API calls, works if source is down | Larger events, data might be stale |
| **Thin** | Data changes frequently, many consumers need different subsets | Smaller events, always fresh data | Consumers must call APIs, source must be available |

**Alex's rule of thumb:** Start thin, add fields as consumers need them. It's easier to add data than remove it.

### The 256KB Limit

EventBridge events max out at 256KB. For larger payloads:

```json
{
  "detail-type": "Large File Processed",
  "source": "pettracker.processing",
  "detail": {
    "resultLocation": "s3://pettracker-results/job-123/output.json",
    "recordCount": 1500000,
    "status": "completed"
  }
}
```

Store the actual data in S3, pass the reference in the event.

---

## Real AWS Events: What They Look Like

### S3 Object Created

```json
{
  "version": "0",
  "id": "17793124-05d4-b198-2fde-7ededc63b103",
  "detail-type": "Object Created",
  "source": "aws.s3",
  "account": "123456789012",
  "time": "2024-03-23T10:30:00Z",
  "region": "us-east-1",
  "resources": ["arn:aws:s3:::my-bucket"],
  "detail": {
    "version": "0",
    "bucket": {
      "name": "my-bucket"
    },
    "object": {
      "key": "uploads/photo.jpg",
      "size": 1024000,
      "etag": "d41d8cd98f00b204e9800998ecf8427e",
      "sequencer": "00638C8E850DE8D832"
    },
    "request-id": "C3D13FE58DE4C810",
    "requester": "123456789012",
    "source-ip-address": "203.0.113.15",
    "reason": "PutObject"
  }
}
```

**Useful fields for filtering:**
- `detail.bucket.name` - Which bucket
- `detail.object.key` - File path (use prefix matching)
- `detail.object.size` - File size (numeric comparison)

### EC2 Instance State Change

```json
{
  "version": "0",
  "id": "ee376907-2647-4179-9203-343cfb3017a4",
  "detail-type": "EC2 Instance State-change Notification",
  "source": "aws.ec2",
  "account": "123456789012",
  "time": "2024-03-23T10:30:00Z",
  "region": "us-east-1",
  "resources": ["arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0"],
  "detail": {
    "instance-id": "i-1234567890abcdef0",
    "state": "stopped"
  }
}
```

**Common states:** `pending`, `running`, `stopping`, `stopped`, `shutting-down`, `terminated`

### CodePipeline Execution State Change

```json
{
  "version": "0",
  "id": "CWE-event-id",
  "detail-type": "CodePipeline Pipeline Execution State Change",
  "source": "aws.codepipeline",
  "account": "123456789012",
  "time": "2024-03-23T10:30:00Z",
  "region": "us-east-1",
  "resources": ["arn:aws:codepipeline:us-east-1:123456789012:my-pipeline"],
  "detail": {
    "pipeline": "my-pipeline",
    "execution-id": "01234567-0123-0123-0123-012345678901",
    "state": "FAILED",
    "version": 1
  }
}
```

**States:** `STARTED`, `SUCCEEDED`, `FAILED`, `CANCELED`, `SUPERSEDED`

---

## The Schema Registry

EventBridge automatically discovers the structure of events flowing through your bus.

"Wait," Maya asked, "it figures out the schema automatically?"

"Yes," Sam explained. "When events flow through, EventBridge analyzes them and creates schemas. You can see exactly what fields exist before writing code."

### How It Works

1. **Enable schema discovery** on your event bus
2. **Events flow through** - EventBridge analyzes structure
3. **Schemas appear** in the Schema Registry
4. **Generate code** - Download bindings for your language

### Viewing Schemas

In the console: EventBridge → Schemas → Your schemas

Or via CLI:

```bash
# List discovered schemas
aws schemas list-schemas --registry-name discovered-schemas

# Get schema details
aws schemas describe-schema \
  --registry-name discovered-schemas \
  --schema-name pettracker.orders@OrderCompleted
```

### Using Schemas in Code

Download type bindings:

```bash
# Generate TypeScript types
aws schemas get-code-binding-source \
  --registry-name discovered-schemas \
  --schema-name pettracker.orders@OrderCompleted \
  --language TypeScript3
```

Now your code is type-safe:

```typescript
import { OrderCompletedDetail } from './generated/OrderCompleted';

function handleOrder(event: EventBridgeEvent<'Order Completed', OrderCompletedDetail>) {
  const { orderId, total } = event.detail;
  // TypeScript knows exactly what fields exist
}
```

---

## Event Versioning Strategies

Events evolve over time. How do you change them without breaking consumers?

### Strategy 1: Additive Changes Only

Add new fields, never remove or rename:

```json
// Version 1
{ "orderId": "123", "total": 50.00 }

// Version 2 - added field, old consumers still work
{ "orderId": "123", "total": 50.00, "currency": "USD" }
```

**Pros:** Simple, backwards compatible
**Cons:** Accumulates cruft over time

### Strategy 2: Version in Detail-Type

```json
// Consumers subscribe to specific versions
{ "detail-type": "Order Completed v1", ... }
{ "detail-type": "Order Completed v2", ... }
```

**Pros:** Clear versioning, consumers opt into upgrades
**Cons:** Multiple rules needed, migration coordination

### Strategy 3: Version in Detail

```json
{
  "detail-type": "Order Completed",
  "detail": {
    "version": "2",
    "orderId": "123",
    ...
  }
}
```

**Pros:** Filtering by version, single detail-type
**Cons:** Consumers must check version

**Alex's approach:** Start with Strategy 1. Move to Strategy 2 when you need breaking changes.

---

## Did You Know?

**Did you know?** EventBridge events are delivered **at least once**, which means your handlers might process the same event twice. This isn't a bug - it's a deliberate trade-off for reliability. When EventBridge isn't certain a target received an event (network timeout, ambiguous response), it re-delivers rather than risking data loss. This design choice means YOU must implement idempotency - use the event's `id` field to track what you've already processed, typically with a DynamoDB table or Redis cache that records processed event IDs.

**Here's something interesting:** The `time` field can be set by you when publishing events, not just by EventBridge. This is powerful for events that represent something that happened in the past. Imagine you're batch processing historical data or migrating from another system - you can publish events with their original timestamps, and consumers can use that time for ordering, filtering, or analytics. Without this capability, you'd lose temporal context during migrations.

**One more thing:** Partner events (from Stripe, Auth0, etc.) have their own event structure, but EventBridge wraps them in the standard envelope. The original partner payload goes in the `detail` field, while EventBridge adds the standard `source`, `detail-type`, `time`, etc. This means your patterns work consistently whether the event came from S3, Stripe, or your own application - the filtering syntax is identical.

---

## Exam Tips

**Key points for DVA-C02:**

1. **Event size limit**: 256KB maximum
2. **At-least-once delivery**: Events may be delivered more than once
3. **Source format**: AWS uses `aws.{service}`, custom uses your namespace
4. **Schema Registry**: Automatically discovers event structure

**Common exam patterns:**

> "An application publishes events larger than 256KB..."
> → Store in S3, pass reference in event

> "Events are occasionally processed twice..."
> → Expected behavior (at-least-once); make consumers idempotent

---

## Quick Reference

| Concept | Definition | Example |
|---------|------------|---------|
| **Event envelope** | Standard wrapper for all events | version, id, source, detail-type, detail |
| **Fat event** | Contains all data | Full order with items, address, etc. |
| **Thin event** | Contains references | Order ID + total only |
| **Schema Registry** | Auto-discovers event structure | Generate type bindings |

---

## Key Takeaways

- **Every EventBridge event** follows the same envelope structure - source, detail-type, time, detail. This consistency is what makes the "consumer-decides" model work: you can write patterns that filter any event, regardless of whether it came from S3, Stripe, or your own code, because the structure is always the same.

- **Design events intentionally** - the fat vs thin decision shapes your entire architecture. Fat events (full data payload) work best when consumers need most of the data and it doesn't change often. Thin events (just IDs and references) work best when data changes frequently or different consumers need different subsets. Start thin - it's easier to add fields than remove them.

- **Use namespaced sources** like `com.pettracker.orders` - this enables prefix-based filtering (`{"prefix": "com.pettracker."}`) and makes it clear where events originate. When debugging at 2 AM, you'll thank yourself for consistent naming.

- **The Schema Registry** automatically discovers event structure as events flow through your bus. Generate TypeScript, Python, or Java bindings directly from discovered schemas. This turns runtime "what fields exist?" errors into compile-time type errors - much easier to catch and fix.

- **Plan for evolution** - events are contracts between services. Additive changes (new fields) are safe; breaking changes (renamed/removed fields) require versioning. Treat event schemas with the same care as REST API contracts.

---

*Next: **The Problem in Detail** - Now that you understand events, let's see the real code and debugging scenarios that make manual event handling so painful.*

