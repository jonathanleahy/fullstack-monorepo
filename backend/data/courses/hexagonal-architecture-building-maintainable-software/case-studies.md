# Case Studies

Real-world examples of Hexagonal Architecture in action.

---

## Case Study 1: Netflix - Content Delivery Platform

### Company Background
Netflix serves over 200 million subscribers worldwide, streaming content across thousands of device types. Their backend systems handle billions of API requests daily.

### The Problem
Netflix's early architecture tightly coupled their streaming logic to specific infrastructure. When they needed to:
- Support new device types (smart TVs, game consoles, mobile)
- Migrate from data centers to AWS
- Scale individual services independently

...they found that changes in one area cascaded throughout the system.

### How They Applied Hexagonal Architecture

Netflix adopted what they call "Clean Microservices Architecture," which applies Hexagonal principles:

**Domain Isolation**
Each microservice has a pure domain core containing business logic for content recommendations, user preferences, and streaming optimization.

**Ports for Flexibility**
```
ContentService Port
├── Driving: REST API, GraphQL, gRPC
└── Driven: Cassandra, DynamoDB, Redis
```

**Adapter Per Device**
Different driving adapters handle the unique requirements of iOS, Android, web, smart TVs, and game consoles—all calling the same domain logic.

### Results

| Metric | Before | After |
|--------|--------|-------|
| Time to support new device | 6 months | 2 weeks |
| Deployment frequency | Monthly | Hundreds/day |
| Test coverage | ~40% | 90%+ |

### Key Takeaway
> "The ability to swap adapters let us migrate from our data center to AWS incrementally over 7 years, with zero downtime."
> — Netflix Tech Blog

---

## Case Study 2: Spotify - Music Streaming

### Company Background
Spotify serves 500+ million users with real-time music streaming, personalized playlists, and social features. Their engineering teams are organized into autonomous "squads."

### The Problem
With hundreds of squads building features independently, Spotify faced:
- Inconsistent architectures across teams
- Difficulty testing features in isolation
- Database changes breaking unrelated services
- Slow onboarding for new developers

### How They Applied Hexagonal Architecture

Spotify standardized on Hexagonal Architecture as their "golden path":

**Consistent Structure**
Every service follows the same layout:
```
service/
├── domain/      # Pure business logic
├── application/ # Use cases
├── adapters/
│   ├── api/    # REST, gRPC handlers
│   ├── db/     # PostgreSQL, BigTable
│   └── events/ # Kafka producers/consumers
└── cmd/        # Entry points
```

**Event-Driven Adapters**
Kafka adapters allow squads to publish domain events without knowing who consumes them:
```go
type PlaybackEventAdapter struct {
    producer KafkaProducer
}

func (a *PlaybackEventAdapter) PublishPlayed(track Track, user User) {
    event := domain.TrackPlayedEvent{...}
    a.producer.Send("playback-events", event)
}
```

**Mock Adapters for Testing**
Squads test their domain logic without Kafka, databases, or network:
```go
func TestPlaybackTracking(t *testing.T) {
    mockPublisher := &MockEventPublisher{}
    useCase := NewTrackPlaybackUseCase(mockPublisher)

    useCase.RecordPlay(track, user)

    assert.Equal(t, 1, len(mockPublisher.Events))
}
```

### Results

| Metric | Before | After |
|--------|--------|-------|
| New developer productivity | 3 months to contribute | 2 weeks |
| Test execution time | 30+ minutes | 3 minutes |
| Cross-team dependencies | High | Minimal |

### Key Takeaway
> "Hexagonal Architecture gave us a common language. Any engineer can join any squad and immediately understand the codebase structure."
> — Spotify Engineering

---

## Case Study 3: A Healthcare Startup - MedSchedule

### Company Background
MedSchedule (name changed) is a Series A startup building appointment scheduling software for hospitals. They integrate with 15+ Electronic Health Record (EHR) systems.

### The Problem
Their initial architecture was a monolith that directly called EHR APIs:

```go
// ❌ Their original code
func ScheduleAppointment(patient Patient, time Time) error {
    // Directly coupled to Epic's API
    epicClient := epic.NewClient(os.Getenv("EPIC_URL"))
    slot := epicClient.FindSlot(patient.MRN, time)
    return epicClient.Book(slot)
}
```

Problems:
- Adding a new EHR (Cerner, Allscripts) meant rewriting scheduling logic
- Couldn't test without live EHR connections
- HIPAA compliance audits were nightmares
- Each hospital had slightly different workflows

### How They Applied Hexagonal Architecture

**EHR Adapter Port**
```go
type EHRAdapter interface {
    FindAvailableSlots(patientID string, dateRange DateRange) ([]Slot, error)
    BookAppointment(slot Slot, patient Patient) (Confirmation, error)
    CancelAppointment(confirmationID string) error
}
```

**Multiple EHR Adapters**
```
adapters/
├── epic/         # Epic EHR adapter
├── cerner/       # Cerner EHR adapter
├── allscripts/   # Allscripts adapter
├── mock/         # Testing adapter
└── fhir/         # FHIR-compliant generic adapter
```

**Hospital-Specific Configuration**
```go
func main() {
    var ehrAdapter ports.EHRAdapter

    switch os.Getenv("HOSPITAL_EHR") {
    case "epic":
        ehrAdapter = epic.NewAdapter(epicConfig)
    case "cerner":
        ehrAdapter = cerner.NewAdapter(cernerConfig)
    default:
        ehrAdapter = fhir.NewAdapter(fhirConfig)
    }

    schedulingService := application.NewSchedulingService(ehrAdapter)
    // ...
}
```

### Results

| Metric | Before | After |
|--------|--------|-------|
| Time to integrate new EHR | 4 months | 3 weeks |
| Test coverage | 25% | 85% |
| HIPAA audit preparation | 2 weeks | 2 days |
| Production bugs from EHR changes | Monthly | Rare |

### Key Takeaway
> "When Epic changed their API, we updated one adapter file. Nothing else changed. That single moment paid for all the upfront architecture work."
> — MedSchedule CTO

---

## Case Study 4: E-Commerce Migration - ShopFlow

### Company Background
ShopFlow is a mid-size e-commerce platform processing $50M annually. They started on Shopify but outgrew it and needed custom features.

### The Problem
Their "big bang" rewrite attempt failed after 8 months:
- Tried to rebuild everything at once
- No way to test new code with production data
- Team burned out before launch
- Customers couldn't wait; features shipped to old system

### How They Applied Hexagonal Architecture

**Strangler Fig Migration**

Instead of rewriting, they wrapped the old system:

```go
// Adapter that delegates to legacy system
type LegacyOrderAdapter struct {
    shopifyClient *shopify.Client
}

func (a *LegacyOrderAdapter) CreateOrder(order Order) (string, error) {
    // Translate to Shopify format and create
    return a.shopifyClient.CreateOrder(toShopifyOrder(order))
}
```

**Gradual Extraction**

1. Created domain models for Order, Product, Customer
2. Built ports for OrderRepository, PaymentGateway
3. Implemented adapters that called Shopify
4. Migrated logic one use case at a time
5. Eventually replaced Shopify adapters with native ones

**Feature Flags**
```go
func (uc *CreateOrderUseCase) Execute(order Order) error {
    if featureflags.IsEnabled("native-orders") {
        return uc.nativeOrderRepo.Save(order)
    }
    return uc.legacyOrderAdapter.CreateOrder(order)
}
```

### Results

| Metric | Big Bang (Failed) | Strangler Fig |
|--------|-------------------|---------------|
| Duration | 8 months, abandoned | 14 months, success |
| Downtime | Would have been days | Zero |
| Revenue impact | Nearly killed company | Increased 20% |
| Team morale | Burned out | Energized by wins |

### Key Takeaway
> "The adapter pattern let us migrate while the plane was flying. Customers never noticed, but our developers went from dreading work to being excited about the codebase."
> — ShopFlow Tech Lead

---

## Summary: What These Cases Have in Common

1. **All started with coupling pain** - Testing was hard, changes cascaded, new integrations took months.

2. **Ports enabled flexibility** - Whether it's EHR systems, streaming devices, or databases, ports made swapping trivial.

3. **Testing improved dramatically** - Mock adapters enabled fast, isolated tests without infrastructure.

4. **Migration was incremental** - No big-bang rewrites. The Strangler Fig pattern let them migrate safely.

5. **Teams moved faster** - Standardized structure reduced cognitive load and onboarding time.

---

## Apply These Lessons

As you follow Sam's journey with BookShelf in this course, you'll face similar challenges:
- Maya (investor) wants mobile support → Multiple driving adapters
- Chen (enterprise customer) needs on-premise → Swappable database adapters
- Sam can't write tests → Mock adapters enable testing

The patterns that worked for Netflix, Spotify, and startups will work for BookShelf—and for your projects too.
