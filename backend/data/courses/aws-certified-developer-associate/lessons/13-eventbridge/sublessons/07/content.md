# Custom Events: Publishing Your Own Events

## What the Main Page Introduced

The main page explained that your applications can publish events to EventBridge, integrating into the same event ecosystem as AWS services. This lets **consumers subscribe to your events without you knowing who they are**. Now let's master the PutEvents API and design effective custom events.

## Going Deeper

In this sub-chapter, we'll explore:
1. **The PutEvents API** - How to publish events
2. **Event design** - Structure, naming, content decisions
3. **Error handling** - Partial failures, retries, dead letter handling
4. **Performance optimization** - Batching, throughput
5. **SDK examples** - Python, Node.js, Java, Go
6. **Best practices** - Patterns that scale

---

## The PutEvents API

### Basic Structure

```python
import boto3
import json

events = boto3.client('events')

response = events.put_events(
    Entries=[
        {
            'Source': 'pettracker.orders',           # Required
            'DetailType': 'Order Completed',          # Required
            'Detail': json.dumps({                    # Required (JSON string)
                'orderId': 'order-123',
                'total': 99.99,
                'userId': 'user-456'
            }),
            'EventBusName': 'default',               # Optional (default: default)
            'Time': datetime.now(timezone.utc),      # Optional
            'Resources': [                            # Optional
                'arn:aws:dynamodb:us-east-1:123456789012:table/orders'
            ],
            'TraceHeader': 'Root=1-abc-def'          # Optional (X-Ray)
        }
    ]
)
```

### Response Handling

```python
response = events.put_events(Entries=entries)

# Check for failures
if response['FailedEntryCount'] > 0:
    for i, entry in enumerate(response['Entries']):
        if 'ErrorCode' in entry:
            print(f"Failed entry {i}: {entry['ErrorCode']} - {entry['ErrorMessage']}")
            # Retry this entry
            failed_entries.append(entries[i])
```

**Response structure:**

```json
{
  "FailedEntryCount": 1,
  "Entries": [
    {"EventId": "abc-123"},
    {"EventId": "def-456"},
    {"ErrorCode": "ThrottlingException", "ErrorMessage": "Rate exceeded"}
  ]
}
```

---

## Event Design

### Naming Conventions

**Source format:** Use reverse domain notation

```
com.yourcompany.servicename
pettracker.orders
pettracker.users
pettracker.payments
```

**Detail-type format:** Human-readable action in past tense

```
Order Completed
User Signed Up
Payment Failed
Pet Profile Updated
```

### Event Content Decisions

Remember the **fat vs thin** decision from the main page:

**Fat event** - Include all data consumers might need:

```json
{
  "Source": "pettracker.orders",
  "DetailType": "Order Completed",
  "Detail": {
    "orderId": "order-123",
    "userId": "user-456",
    "userEmail": "alex@example.com",
    "items": [
      {"productId": "prod-1", "name": "Dog Food", "quantity": 2, "price": 29.99}
    ],
    "subtotal": 59.98,
    "tax": 5.40,
    "total": 65.38,
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "timestamp": "2024-03-23T10:30:00Z"
  }
}
```

**Thin event** - Include identifiers and key metrics only:

```json
{
  "Source": "pettracker.orders",
  "DetailType": "Order Completed",
  "Detail": {
    "orderId": "order-123",
    "userId": "user-456",
    "total": 65.38,
    "itemCount": 1,
    "timestamp": "2024-03-23T10:30:00Z"
  }
}
```

### When to Use Each

| Factor | Fat Event | Thin Event |
|--------|-----------|------------|
| Data changes frequently | ❌ | ✅ |
| Consumers need full data | ✅ | ❌ |
| Event size near 256KB | ❌ | ✅ |
| Source availability uncertain | ✅ | ❌ |
| Multiple consumers need different data | ❌ | ✅ |

**Start thin, add fields as needed.** It's easier to add data than remove it.

---

## Error Handling

### Partial Failures

A single PutEvents call can partially fail. Always check `FailedEntryCount`:

```python
def publish_events_with_retry(entries, max_retries=3):
    for attempt in range(max_retries):
        response = events.put_events(Entries=entries)

        if response['FailedEntryCount'] == 0:
            return  # All succeeded

        # Collect failed entries for retry
        failed = []
        for i, result in enumerate(response['Entries']):
            if 'ErrorCode' in result:
                failed.append(entries[i])

        if not failed:
            return

        entries = failed
        time.sleep(2 ** attempt)  # Exponential backoff

    raise Exception(f"Failed to publish {len(entries)} events after {max_retries} retries")
```

### Common Error Codes

| Error Code | Cause | Action |
|------------|-------|--------|
| `ThrottlingException` | Rate limit exceeded | Backoff and retry |
| `InternalFailure` | AWS service issue | Retry |
| `InvalidParameterValue` | Bad event format | Fix the event |

### Circuit Breaker Pattern

For high-throughput systems, implement circuit breaker:

```python
class EventBridgePublisher:
    def __init__(self):
        self.failure_count = 0
        self.circuit_open = False
        self.last_failure_time = None

    def publish(self, entries):
        if self.circuit_open:
            if time.time() - self.last_failure_time > 30:  # Try again after 30s
                self.circuit_open = False
            else:
                # Fall back to DLQ or local queue
                self.queue_locally(entries)
                return

        try:
            response = events.put_events(Entries=entries)
            if response['FailedEntryCount'] == 0:
                self.failure_count = 0
            else:
                self._handle_partial_failure(entries, response)
        except Exception as e:
            self.failure_count += 1
            if self.failure_count >= 5:
                self.circuit_open = True
                self.last_failure_time = time.time()
            raise
```

---

## Performance Optimization

### Batching

PutEvents accepts up to **10 entries per call**. Batch for efficiency:

```python
def publish_batch(all_events):
    # Split into batches of 10
    for i in range(0, len(all_events), 10):
        batch = all_events[i:i+10]
        entries = [format_entry(e) for e in batch]
        events.put_events(Entries=entries)
```

### Throughput Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Events per PutEvents | 10 | Hard limit |
| PutEvents requests/sec | 10,000+ | Soft limit, can increase |
| Event size | 256 KB | Hard limit |
| Total request size | 256 KB | All entries combined |

### High-Throughput Pattern

For very high volume, use async publishing:

```python
import asyncio
import aioboto3

async def publish_async(batches):
    session = aioboto3.Session()
    async with session.client('events') as events:
        tasks = [events.put_events(Entries=batch) for batch in batches]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    return results
```

---

## SDK Examples

### Python (Boto3)

```python
import boto3
import json
from datetime import datetime, timezone

events = boto3.client('events')

def publish_order_completed(order):
    response = events.put_events(
        Entries=[{
            'Source': 'pettracker.orders',
            'DetailType': 'Order Completed',
            'Detail': json.dumps({
                'orderId': order['id'],
                'total': order['total'],
                'userId': order['user_id']
            }),
            'EventBusName': 'default'
        }]
    )

    if response['FailedEntryCount'] > 0:
        raise Exception(f"Failed to publish event: {response['Entries'][0]}")

    return response['Entries'][0]['EventId']
```

### Node.js (AWS SDK v3)

```javascript
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient({});

async function publishOrderCompleted(order) {
  const command = new PutEventsCommand({
    Entries: [{
      Source: 'pettracker.orders',
      DetailType: 'Order Completed',
      Detail: JSON.stringify({
        orderId: order.id,
        total: order.total,
        userId: order.userId
      }),
      EventBusName: 'default'
    }]
  });

  const response = await client.send(command);

  if (response.FailedEntryCount > 0) {
    throw new Error(`Failed: ${response.Entries[0].ErrorMessage}`);
  }

  return response.Entries[0].EventId;
}
```

### Go

```go
package main

import (
    "context"
    "encoding/json"
    "github.com/aws/aws-sdk-go-v2/service/eventbridge"
    "github.com/aws/aws-sdk-go-v2/service/eventbridge/types"
)

func publishOrderCompleted(ctx context.Context, client *eventbridge.Client, order Order) error {
    detail, _ := json.Marshal(map[string]interface{}{
        "orderId": order.ID,
        "total":   order.Total,
        "userId":  order.UserID,
    })

    source := "pettracker.orders"
    detailType := "Order Completed"
    busName := "default"

    _, err := client.PutEvents(ctx, &eventbridge.PutEventsInput{
        Entries: []types.PutEventsRequestEntry{{
            Source:       &source,
            DetailType:   &detailType,
            Detail:       aws.String(string(detail)),
            EventBusName: &busName,
        }},
    })

    return err
}
```

### Java

```java
import software.amazon.awssdk.services.eventbridge.EventBridgeClient;
import software.amazon.awssdk.services.eventbridge.model.*;

public class EventPublisher {
    private final EventBridgeClient client;

    public String publishOrderCompleted(Order order) {
        String detail = String.format(
            "{\"orderId\":\"%s\",\"total\":%s,\"userId\":\"%s\"}",
            order.getId(), order.getTotal(), order.getUserId()
        );

        PutEventsResponse response = client.putEvents(PutEventsRequest.builder()
            .entries(PutEventsRequestEntry.builder()
                .source("pettracker.orders")
                .detailType("Order Completed")
                .detail(detail)
                .eventBusName("default")
                .build())
            .build());

        if (response.failedEntryCount() > 0) {
            throw new RuntimeException("Failed to publish event");
        }

        return response.entries().get(0).eventId();
    }
}
```

---

## Best Practices

### 1. Version Your Events

Include version in the detail for future compatibility:

```json
{
  "Detail": {
    "version": "1.0",
    "orderId": "order-123",
    ...
  }
}
```

### 2. Include Correlation IDs

Enable distributed tracing:

```json
{
  "Detail": {
    "correlationId": "req-abc-123",
    "orderId": "order-123",
    ...
  }
}
```

### 3. Timestamp Everything

Include when the business event actually happened:

```json
{
  "Detail": {
    "occurredAt": "2024-03-23T10:30:00Z",
    "publishedAt": "2024-03-23T10:30:01Z",
    ...
  }
}
```

### 4. Document Your Events

Create a schema registry or documentation:

```yaml
# events/order-completed.yaml
source: pettracker.orders
detail-type: Order Completed
version: "1.0"
description: Emitted when an order is successfully completed
fields:
  orderId: string (required)
  userId: string (required)
  total: number (required)
  itemCount: integer (required)
```

---

## Did You Know?

**Did you know?** The `Time` field can be backdated. This is useful when publishing events about things that happened in the past (batch processing, data migration).

**Here's something interesting:** EventBridge assigns a unique `id` to every event. You can use this for idempotency checks in consumers.

**One more thing:** The `TraceHeader` field integrates with X-Ray for distributed tracing across your event-driven architecture.

---

## Exam Tips

**Key points for DVA-C02:**

1. **PutEvents limit**: 10 entries per call
2. **Event size**: 256KB maximum
3. **Partial failures**: Check FailedEntryCount, retry failed entries
4. **Detail is JSON string**: Must be stringified, not raw object

**Common exam patterns:**

> "Application needs to publish events to multiple consumers without knowing them..."
> → EventBridge PutEvents with appropriate source/detail-type

> "Some events fail to publish but others succeed..."
> → Normal behavior; check FailedEntryCount and retry

> "Event payload is 500KB..."
> → Too large; store in S3, pass reference in event

---

## Quick Reference

| Property | Required | Notes |
|----------|----------|-------|
| `Source` | Yes | Your namespace (reverse domain) |
| `DetailType` | Yes | Human-readable event name |
| `Detail` | Yes | JSON string of payload |
| `EventBusName` | No | Default: "default" |
| `Time` | No | Default: now |
| `Resources` | No | Related ARNs |
| `TraceHeader` | No | X-Ray trace ID |

---

## Key Takeaways

- **PutEvents** is the API for publishing custom events - up to 10 per call
- **Design events carefully** - fat vs thin depends on your consumers
- **Handle partial failures** - check FailedEntryCount, implement retries
- **Batch for efficiency** - group events when possible
- **Version and document** - treat events as a contract
- **Publishers are decoupled** - you don't need to know who's listening; that's the power of the consumer-decides model

---

*Next: **SaaS Partner Integration** - Let's see how third-party services like Stripe and Auth0 send events to EventBridge.*


---
*v2.0*
