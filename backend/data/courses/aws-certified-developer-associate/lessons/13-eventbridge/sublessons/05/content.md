# Event Patterns: The Art of Filtering

## What the Main Page Introduced

The main page showed that EventBridge patterns can match on any part of an event - source, type, or nested values. This content-based filtering is what enables **consumers to decide what they want** without publisher changes. Now let's master every pattern operator and learn to write efficient filters.

## Going Deeper

In this sub-chapter, we'll explore:
1. **Pattern fundamentals** - How matching works
2. **All pattern operators** - Exact, prefix, numeric, exists, and more
3. **Complex patterns** - Nested fields, arrays, combinations
4. **Pattern optimization** - Writing efficient filters
5. **Testing patterns** - Validating before deployment
6. **Common pitfalls** - Mistakes to avoid

---

## Pattern Fundamentals

### How Pattern Matching Works

An event matches a pattern when:
1. **Every field in the pattern** exists in the event
2. **Every value in the pattern** matches the corresponding event value
3. **Extra event fields** are ignored (patterns don't need to match everything)

```json
// Event
{
  "source": "pettracker.orders",
  "detail-type": "Order Completed",
  "detail": {
    "orderId": "order-123",
    "total": 150.00,
    "status": "completed"
  }
}

// Pattern - MATCHES (only checks fields it specifies)
{
  "source": ["pettracker.orders"],
  "detail": {
    "status": ["completed"]
  }
}
```

### Pattern vs Event Structure

| Pattern | Event | Match? |
|---------|-------|--------|
| `{"source": ["a"]}` | `{"source": "a", "detail": {...}}` | ✅ Yes |
| `{"source": ["a", "b"]}` | `{"source": "a"}` | ✅ Yes (OR) |
| `{"source": ["a"], "detail": {"x": [1]}}` | `{"source": "a"}` | ❌ No (missing field) |

---

## All Pattern Operators

### 1. Exact Match

The simplest pattern - value must match exactly.

```json
{
  "source": ["pettracker.orders"],
  "detail-type": ["Order Completed"]
}
```

**Multiple values = OR:**

```json
{
  "source": ["pettracker.orders", "pettracker.payments"]
}
// Matches if source is orders OR payments
```

### 2. Prefix Match

Match strings that start with a value.

```json
{
  "source": [{"prefix": "pettracker."}]
}
// Matches: pettracker.orders, pettracker.payments, pettracker.anything
```

**Use case:** Match all events from your application namespace.

### 3. Suffix Match

Match strings that end with a value.

```json
{
  "detail": {
    "filename": [{"suffix": ".jpg"}]
  }
}
// Matches: photo.jpg, image.jpg, /path/to/file.jpg
```

**Use case:** Filter by file extension, domain suffix.

### 4. Prefix + Suffix Combined

Must use `anything-but` with nested match for this:

```json
{
  "detail": {
    "key": [
      {"prefix": "uploads/"},
      {"suffix": ".jpg"}
    ]
  }
}
// BOTH conditions must match - uploads/*.jpg
```

**Wait, that's AND?** Yes! Within the same field array, `prefix` and `suffix` are AND. Multiple exact values are OR.

### 5. Numeric Comparisons

Compare numbers with operators.

```json
{
  "detail": {
    "total": [{"numeric": [">", 100]}]
  }
}
```

**Operators:**
| Syntax | Meaning |
|--------|---------|
| `["=", 100]` | Equal to 100 |
| `[">", 100]` | Greater than 100 |
| `[">=", 100]` | Greater than or equal |
| `["<", 100]` | Less than 100 |
| `["<=", 100]` | Less than or equal |

**Range:**

```json
{
  "detail": {
    "total": [{"numeric": [">=", 100, "<", 1000]}]
  }
}
// Matches 100 to 999
```

### 6. Exists

Check if a field is present.

```json
{
  "detail": {
    "metadata": [{"exists": true}]
  }
}
// Matches if metadata field exists (even if null)
```

**Does not exist:**

```json
{
  "detail": {
    "errorCode": [{"exists": false}]
  }
}
// Matches if errorCode is NOT present
```

### 7. Anything-But

Match everything EXCEPT specified values.

```json
{
  "detail": {
    "status": [{"anything-but": ["cancelled", "failed"]}]
  }
}
// Matches: pending, processing, completed, etc.
```

**Anything-but with prefix:**

```json
{
  "detail": {
    "key": [{"anything-but": {"prefix": "test-"}}]
  }
}
// Matches keys that DON'T start with test-
```

### 8. Wildcard

Pattern match with wildcards (*).

```json
{
  "detail": {
    "bucket": [{"wildcard": "prod-*-data"}]
  }
}
// Matches: prod-us-data, prod-eu-data, prod-anything-data
```

**Multiple wildcards:**

```json
{
  "detail": {
    "key": [{"wildcard": "users/*/photos/*.jpg"}]
  }
}
// Matches: users/123/photos/avatar.jpg
```

### 9. Equals-Ignore-Case

Case-insensitive matching (added 2023).

```json
{
  "detail": {
    "country": [{"equals-ignore-case": "usa"}]
  }
}
// Matches: USA, usa, Usa, UsA
```

---

## Complex Patterns

### Nested Fields

Navigate deep into event structure:

```json
{
  "detail": {
    "order": {
      "customer": {
        "tier": ["premium", "vip"]
      }
    }
  }
}
```

### Arrays

Match if ANY element in an array matches:

```json
// Event
{
  "detail": {
    "tags": ["urgent", "billing", "support"]
  }
}

// Pattern - matches because "urgent" is in the array
{
  "detail": {
    "tags": ["urgent"]
  }
}
```

**Important:** You cannot match "array contains BOTH X AND Y" with one pattern. That requires Lambda filtering.

### Combining Operators

```json
{
  "source": ["pettracker.orders"],
  "detail-type": ["Order Completed"],
  "detail": {
    "total": [{"numeric": [">=", 100]}],
    "status": [{"anything-but": ["cancelled"]}],
    "customer": {
      "tier": ["premium", "vip"]
    }
  }
}
// High-value orders from premium customers that weren't cancelled
```

---

## Pattern Optimization

### Efficient Patterns

EventBridge indexes by `source` and `detail-type` first. Always include these when possible.

**Fast (uses index):**

```json
{
  "source": ["pettracker.orders"],
  "detail-type": ["Order Completed"],
  "detail": {
    "total": [{"numeric": [">", 100]}]
  }
}
```

**Slow (no index):**

```json
{
  "detail": {
    "total": [{"numeric": [">", 100]}]
  }
}
// Has to check against ALL rules on the bus
```

### Pattern Complexity Guidelines

| Complexity | Impact | Example |
|------------|--------|---------|
| Simple | Fastest | `source` and `detail-type` only |
| Moderate | Fast | + 1-2 detail field checks |
| Complex | Slower | Nested fields, multiple operators |
| Very Complex | Slowest | Wildcards, deep nesting, arrays |

### When to Filter in Lambda

Sometimes Lambda filtering is better:

- **Complex AND logic on arrays** - Pattern can't do "contains X AND Y"
- **Regex matching** - Patterns only have wildcard, not full regex
- **Dynamic filtering** - Logic depends on external data

```python
# Lambda does what patterns can't
def handler(event, context):
    tags = event['detail']['tags']

    # Match if BOTH urgent AND billing
    if 'urgent' in tags and 'billing' in tags:
        process(event)
```

---

## Testing Patterns

### AWS Console Test

EventBridge console has a pattern tester:
1. Go to EventBridge → Rules
2. Create or edit a rule
3. Use "Event pattern" → "Test pattern"
4. Paste sample event and check if it matches

### CLI Testing

```bash
aws events test-event-pattern \
  --event-pattern '{"source": ["pettracker.orders"]}' \
  --event '{"source": "pettracker.orders", "detail-type": "Test"}'

# Output: {"Result": true}
```

### Python Testing Locally

```python
import json
import re

def matches_pattern(event, pattern):
    """Simple pattern matcher for testing"""
    for key, expected in pattern.items():
        if key not in event:
            return False
        actual = event[key]

        if isinstance(expected, list):
            # Check if any value matches
            if actual not in expected:
                return False
        elif isinstance(expected, dict):
            if not matches_pattern(actual, expected):
                return False
    return True

# Test it
event = {"source": "orders", "detail": {"status": "completed"}}
pattern = {"source": ["orders"], "detail": {"status": ["completed"]}}
print(matches_pattern(event, pattern))  # True
```

---

## Common Pitfalls

### Pitfall 1: Forgetting Array Syntax

❌ Wrong:
```json
{"source": "pettracker.orders"}
```

✅ Correct:
```json
{"source": ["pettracker.orders"]}
```

Pattern values are ALWAYS arrays.

### Pitfall 2: Numeric as String

❌ Wrong:
```json
{"detail": {"total": [{"numeric": [">", "100"]}]}}
```

✅ Correct:
```json
{"detail": {"total": [{"numeric": [">", 100]}]}}
```

Numeric operators need actual numbers, not strings.

### Pitfall 3: Expecting AND on Arrays

❌ Doesn't work as expected:
```json
{"detail": {"tags": ["urgent", "billing"]}}
```
This matches if tags contains "urgent" OR "billing", not both.

✅ To match both, use Lambda filtering.

### Pitfall 4: Case Sensitivity

```json
{"detail": {"status": ["COMPLETED"]}}
```

This won't match `"status": "completed"`. Use `equals-ignore-case` if needed.

---

## Did You Know?

**Did you know?** Pattern complexity doesn't affect cost - you pay per event matched, not per pattern evaluated. This means you can write detailed, specific patterns without worrying about efficiency penalties. A pattern that checks 10 nested fields costs the same as one that checks just the source. In fact, specific patterns are better because they reduce downstream processing - let EventBridge filter, not your Lambda.

**Here's something interesting:** The `wildcard` operator was added in 2021, and it was a big deal. Before that, you had to use Lambda for any pattern matching beyond simple prefix/suffix - matching "prod-*-data" required invoking a Lambda that checked every event. Now EventBridge does this natively, which means faster filtering and no Lambda invocation costs for events that don't match.

**One more thing:** You can use empty patterns to match ALL events on a bus - useful for archiving or audit logging. An empty pattern `{}` matches everything because there are no conditions to fail. This is the pattern used for "archive all events" rules or "send everything to CloudWatch Logs for debugging." Just be careful in production - matching every event to a Lambda target could get expensive fast.

```json
{}  // Matches everything on the bus!
```

---

## Exam Tips

**Key points for DVA-C02:**

1. **Pattern syntax**: Values are always arrays
2. **Numeric operators**: Use actual numbers, not strings
3. **Array matching**: OR logic (any element matches)
4. **Optimization**: Include source and detail-type for indexing

**Common exam patterns:**

> "Match events where price is between 100 and 500..."
> → `{"numeric": [">=", 100, "<=", 500]}`

> "Match all events except from test source..."
> → `{"source": [{"anything-but": ["test"]}]}`

> "Match files with .jpg extension..."
> → `{"suffix": ".jpg"}`

---

## Quick Reference

| Operator | Syntax | Use Case |
|----------|--------|----------|
| Exact | `["value"]` | Specific values |
| Prefix | `[{"prefix": "val"}]` | String starts with |
| Suffix | `[{"suffix": "val"}]` | String ends with |
| Numeric | `[{"numeric": [">", 100]}]` | Number comparisons |
| Exists | `[{"exists": true}]` | Field presence |
| Anything-but | `[{"anything-but": ["val"]}]` | Exclude values |
| Wildcard | `[{"wildcard": "a*b"}]` | Pattern matching |

---

## Key Takeaways

- **Patterns are the filter** - they're the mechanism that makes "consumers decide what they want" possible. Without powerful pattern matching, EventBridge would just be a message bus. With it, each consumer specifies exactly which events they care about, down to nested field values.

- **Values are always arrays** - write `["value"]`, not `"value"`. This array syntax enables OR matching: `["pending", "processing"]` matches either value. Forgetting the brackets is the #1 pattern debugging issue.

- **AND within a field, OR across values** - all conditions in a pattern must match (AND), but multiple values for the same field are OR. `{"source": ["a", "b"], "detail": {"status": ["active"]}}` means (source is a OR b) AND (status is active).

- **Include source and detail-type** for efficient indexing. EventBridge indexes rules by these fields first. Patterns that start with detail checks (skipping source) have to evaluate against every rule on the bus - much slower.

- **Test before deploying** - use `aws events test-event-pattern` or the console's pattern tester. It's much easier to debug patterns in a test environment than in production where events are flowing. A pattern that doesn't match is silent - you just don't get events.

- **Patterns enable the consumer-decides model** - this is the key insight. Publishers don't need to know what consumers want. Consumers define their own patterns: "give me orders over $100 from premium customers that weren't cancelled." The publisher just publishes orders; the consumer expresses their interest through patterns.

---

*Next: **AWS Service Integration** - Let's see how 200+ AWS services send events to EventBridge automatically.*


---
*v2.0*
