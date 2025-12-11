# EventBridge Scheduler: Time-Based Events Done Right

## What the Main Page Introduced

The main page mentioned that EventBridge can trigger scheduled events - cron and rate expressions. But EventBridge Scheduler is actually a separate, more powerful service. Let's explore the difference and master time-based event triggering.

## Going Deeper

In this sub-chapter, we'll explore:
1. **Scheduler vs Rules** - Two different approaches to scheduling
2. **Schedule types** - Cron, rate, and one-time
3. **Targets and payloads** - What you can invoke
4. **Time zones and windows** - Handling global schedules
5. **Scale and limits** - High-volume scheduling
6. **Common patterns** - Real-world use cases

---

## Scheduler vs Scheduled Rules

There are TWO ways to schedule events in EventBridge:

### EventBridge Rules (Legacy Approach)

```yaml
# Schedule expression on a rule
ScheduledRule:
  Type: AWS::Events::Rule
  Properties:
    ScheduleExpression: "rate(1 hour)"
    Targets:
      - Id: MyLambda
        Arn: !GetAtt MyFunction.Arn
```

### EventBridge Scheduler (Newer, Better)

```yaml
# Dedicated scheduler resource
MySchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    ScheduleExpression: "rate(1 hour)"
    FlexibleTimeWindow:
      Mode: "OFF"
    Target:
      Arn: !GetAtt MyFunction.Arn
      RoleArn: !GetAtt SchedulerRole.Arn
```

### Why Scheduler is Better

| Feature | Rules (Schedule) | Scheduler |
|---------|------------------|-----------|
| **One-time schedules** | ❌ Not supported | ✅ Supported |
| **Time zones** | ❌ UTC only | ✅ Any timezone |
| **Flexible windows** | ❌ Fixed | ✅ Configurable |
| **Scale** | 300 rules/bus | Millions of schedules |
| **Target types** | Limited | 200+ AWS services |
| **Custom payload** | Limited | Full control |
| **Dead letter queue** | Manual | Built-in |
| **Retries** | Basic | Configurable |

**Bottom line:** Use EventBridge Scheduler for new projects. Rules-based scheduling is legacy.

---

## Schedule Types

### Rate Expressions

Run at a fixed interval:

```
rate(1 minute)
rate(5 minutes)
rate(1 hour)
rate(12 hours)
rate(1 day)
rate(7 days)
```

**Note:** `minute` vs `minutes` - singular for 1, plural for >1.

### Cron Expressions

Run at specific times:

```
cron(minutes hours day-of-month month day-of-week year)
```

**Examples:**

| Expression | Meaning |
|------------|---------|
| `cron(0 9 * * ? *)` | Every day at 9 AM UTC |
| `cron(0 9 ? * MON *)` | Every Monday at 9 AM |
| `cron(0 0 1 * ? *)` | First of every month at midnight |
| `cron(0/15 * * * ? *)` | Every 15 minutes |
| `cron(0 9 ? * MON-FRI *)` | Weekdays at 9 AM |

**Special characters:**
- `*` - All values
- `?` - No specific value (for day-of-month or day-of-week)
- `-` - Range (MON-FRI)
- `,` - List (MON,WED,FRI)
- `/` - Increment (0/15 = every 15 starting at 0)

### One-Time Schedules (Scheduler Only)

Execute once at a specific time:

```yaml
OneTimeSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    ScheduleExpression: "at(2024-12-25T09:00:00)"
    ScheduleExpressionTimezone: "America/New_York"
    FlexibleTimeWindow:
      Mode: "OFF"
    Target:
      Arn: !GetAtt ChristmasFunction.Arn
      RoleArn: !GetAtt SchedulerRole.Arn
```

**Use cases:**
- Send reminder emails
- Expire promotional offers
- Execute deferred actions
- Delayed notifications

---

## Creating Schedules

### Console

```
EventBridge → Scheduler → Create schedule
```

### CloudFormation

```yaml
DailyReportSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: daily-report
    Description: Generate daily sales report
    ScheduleExpression: "cron(0 8 * * ? *)"
    ScheduleExpressionTimezone: "America/Los_Angeles"
    State: ENABLED
    FlexibleTimeWindow:
      Mode: FLEXIBLE
      MaximumWindowInMinutes: 15
    Target:
      Arn: !GetAtt ReportFunction.Arn
      RoleArn: !GetAtt SchedulerRole.Arn
      Input: '{"reportType": "daily", "format": "pdf"}'
      RetryPolicy:
        MaximumRetryAttempts: 3
        MaximumEventAgeInSeconds: 3600
      DeadLetterConfig:
        Arn: !GetAtt SchedulerDLQ.Arn
```

### SDK (Python)

```python
import boto3

scheduler = boto3.client('scheduler')

# Create a one-time schedule
scheduler.create_schedule(
    Name='user-reminder-abc123',
    ScheduleExpression='at(2024-03-25T14:00:00)',
    ScheduleExpressionTimezone='America/New_York',
    FlexibleTimeWindow={'Mode': 'OFF'},
    Target={
        'Arn': 'arn:aws:lambda:us-east-1:123456789012:function:send-reminder',
        'RoleArn': 'arn:aws:iam::123456789012:role/SchedulerRole',
        'Input': json.dumps({
            'userId': 'user-abc',
            'message': 'Your subscription expires tomorrow!'
        })
    }
)

# Delete after it runs (or use auto-delete group)
```

---

## Targets and Payloads

### Supported Targets

EventBridge Scheduler can invoke 200+ AWS services directly:

| Category | Examples |
|----------|----------|
| **Compute** | Lambda, ECS RunTask, Batch SubmitJob |
| **Messaging** | SQS, SNS, EventBridge PutEvents |
| **Workflows** | Step Functions StartExecution |
| **Data** | Kinesis PutRecord, Firehose PutRecord |
| **Management** | Systems Manager, CodeBuild |

### Lambda Target

```yaml
Target:
  Arn: !GetAtt MyFunction.Arn
  RoleArn: !GetAtt SchedulerRole.Arn
  Input: '{"action": "cleanup", "days": 30}'
```

### Step Functions Target

```yaml
Target:
  Arn: !Ref ProcessingStateMachine
  RoleArn: !GetAtt SchedulerRole.Arn
  Input: '{"startDate": "2024-01-01"}'
```

### SQS Target

```yaml
Target:
  Arn: !GetAtt TaskQueue.Arn
  RoleArn: !GetAtt SchedulerRole.Arn
  SqsParameters:
    MessageGroupId: "scheduled-tasks"
```

### Universal Target (Any AWS API)

```yaml
Target:
  Arn: "arn:aws:scheduler:::aws-sdk:ec2:stopInstances"
  RoleArn: !GetAtt SchedulerRole.Arn
  Input: '{"InstanceIds": ["i-1234567890abcdef0"]}'
```

This lets you call ANY AWS API action on a schedule!

---

## Time Zones and Flexible Windows

### Time Zone Support

```yaml
ScheduleExpressionTimezone: "America/New_York"
```

**Common time zones:**
- `UTC` (default)
- `America/New_York`
- `America/Los_Angeles`
- `Europe/London`
- `Asia/Tokyo`

### Flexible Time Windows

Spread load to avoid thundering herd:

```yaml
FlexibleTimeWindow:
  Mode: FLEXIBLE
  MaximumWindowInMinutes: 30
```

**How it works:**
- `cron(0 9 * * ? *)` with 30-minute window
- Schedule fires randomly between 9:00 and 9:30
- Each schedule instance picks a random time in the window

**Use cases:**
- Thousands of daily reports → spread over 30 minutes
- Rate limiting external APIs
- Database load distribution

---

## Scale and Schedule Groups

### Schedule Groups

Organize and manage related schedules:

```yaml
ReportScheduleGroup:
  Type: AWS::Scheduler::ScheduleGroup
  Properties:
    Name: daily-reports

DailyReportSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    GroupName: daily-reports
    Name: sales-report
    # ... rest of schedule
```

**Benefits:**
- Delete all schedules in a group at once
- IAM permissions by group
- Cost tracking by group

### High-Volume Scheduling

For millions of schedules (e.g., user reminders):

```python
def create_user_reminder(user_id, remind_at):
    scheduler.create_schedule(
        Name=f'reminder-{user_id}',
        GroupName='user-reminders',
        ScheduleExpression=f'at({remind_at.isoformat()})',
        ScheduleExpressionTimezone='UTC',
        FlexibleTimeWindow={'Mode': 'OFF'},
        Target={...},
        # Auto-delete after execution
        ActionAfterCompletion='DELETE'
    )
```

**Limits:**
- 1 million schedules per account (soft limit)
- No limit on schedule groups
- 10,000 API calls/second

---

## Common Patterns

### Pattern 1: Daily Cleanup Job

```yaml
CleanupSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: daily-cleanup
    ScheduleExpression: "cron(0 2 * * ? *)"  # 2 AM daily
    ScheduleExpressionTimezone: "UTC"
    FlexibleTimeWindow:
      Mode: FLEXIBLE
      MaximumWindowInMinutes: 60
    Target:
      Arn: !GetAtt CleanupFunction.Arn
      RoleArn: !GetAtt SchedulerRole.Arn
      Input: '{"olderThanDays": 90}'
```

### Pattern 2: Business Hours Auto-Scaling

```yaml
ScaleUpSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: scale-up-morning
    ScheduleExpression: "cron(0 8 ? * MON-FRI *)"
    ScheduleExpressionTimezone: "America/New_York"
    FlexibleTimeWindow:
      Mode: "OFF"
    Target:
      Arn: "arn:aws:scheduler:::aws-sdk:applicationautoscaling:registerScalableTarget"
      RoleArn: !GetAtt SchedulerRole.Arn
      Input: |
        {
          "ServiceNamespace": "ecs",
          "ResourceId": "service/cluster/api-service",
          "ScalableDimension": "ecs:service:DesiredCount",
          "MinCapacity": 10,
          "MaxCapacity": 50
        }

ScaleDownSchedule:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: scale-down-evening
    ScheduleExpression: "cron(0 20 ? * MON-FRI *)"
    # Scale back to minimum at 8 PM
```

### Pattern 3: Scheduled Reminders

```python
def schedule_subscription_reminder(user_id, expiry_date):
    # Remind 3 days before expiry
    remind_date = expiry_date - timedelta(days=3)

    scheduler.create_schedule(
        Name=f'sub-reminder-{user_id}',
        GroupName='subscription-reminders',
        ScheduleExpression=f'at({remind_date.strftime("%Y-%m-%dT09:00:00")})',
        ScheduleExpressionTimezone='America/New_York',
        FlexibleTimeWindow={'Mode': 'OFF'},
        Target={
            'Arn': lambda_arn,
            'RoleArn': role_arn,
            'Input': json.dumps({
                'userId': user_id,
                'expiryDate': expiry_date.isoformat(),
                'type': 'subscription_reminder'
            })
        },
        ActionAfterCompletion='DELETE'
    )
```

### Pattern 4: Scheduled EC2 Start/Stop

```yaml
StartDevEnvironment:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: start-dev-ec2
    ScheduleExpression: "cron(0 8 ? * MON-FRI *)"
    ScheduleExpressionTimezone: "America/New_York"
    Target:
      Arn: "arn:aws:scheduler:::aws-sdk:ec2:startInstances"
      RoleArn: !GetAtt SchedulerRole.Arn
      Input: '{"InstanceIds": ["i-dev123", "i-dev456"]}'

StopDevEnvironment:
  Type: AWS::Scheduler::Schedule
  Properties:
    Name: stop-dev-ec2
    ScheduleExpression: "cron(0 20 ? * MON-FRI *)"
    ScheduleExpressionTimezone: "America/New_York"
    Target:
      Arn: "arn:aws:scheduler:::aws-sdk:ec2:stopInstances"
      RoleArn: !GetAtt SchedulerRole.Arn
      Input: '{"InstanceIds": ["i-dev123", "i-dev456"]}'
```

---

## Did You Know?

**Did you know?** EventBridge Scheduler can call ANY AWS API action without Lambda using the universal target format: `arn:aws:scheduler:::aws-sdk:{service}:{action}`. Want to stop EC2 instances at night? You don't need a Lambda - just target `aws-sdk:ec2:stopInstances` directly. This works for hundreds of AWS API actions: starting CodeBuild projects, sending SQS messages, updating DynamoDB items, and more. It's Lambda-free scheduling for many common tasks.

**Here's something interesting:** Scheduler handles daylight saving time correctly when you specify a time zone, and this matters more than you'd think. `cron(0 9 * * ? *)` in `America/New_York` will always run at 9 AM local time - even when clocks change in March and November. Without time zone support (like rules-based scheduling), you'd need to update your cron expressions twice a year or accept that your "9 AM" job runs at 8 AM or 10 AM for half the year.

**One more thing:** You can create schedules that only run during a specific date range using `StartDate` and `EndDate` properties. This is perfect for promotional campaigns, limited-time features, or seasonal jobs without leaving orphaned schedules running forever.

```yaml
StartDate: "2024-11-29T00:00:00Z"  # Black Friday
EndDate: "2024-12-02T23:59:59Z"    # Cyber Monday ends
```

---

## Exam Tips

**Key points for DVA-C02:**

1. **Scheduler vs Rules**: Scheduler is newer and more powerful
2. **One-time schedules**: Only Scheduler supports `at()` expressions
3. **Time zones**: Scheduler supports time zones; rules are UTC only
4. **Flexible windows**: Spread load to avoid thundering herd

**Common exam patterns:**

> "Send a reminder email 24 hours before appointment..."
> → EventBridge Scheduler with one-time `at()` expression

> "Run cleanup job every night but spread the load..."
> → Scheduler with FlexibleTimeWindow

> "Stop EC2 instances every night at 7 PM Eastern..."
> → Scheduler with timezone and universal target

---

## Quick Reference

| Feature | Schedule Rule | EventBridge Scheduler |
|---------|---------------|----------------------|
| Rate expressions | ✅ | ✅ |
| Cron expressions | ✅ | ✅ |
| One-time (`at()`) | ❌ | ✅ |
| Time zones | ❌ | ✅ |
| Flexible windows | ❌ | ✅ |
| Universal targets | ❌ | ✅ |
| Scale | 300/bus | Millions |

---

## Key Takeaways

- **Use EventBridge Scheduler** for new projects - it's the modern approach to time-based triggers. Rules-based scheduling (ScheduleExpression on rules) still works but lacks key features like time zones, one-time schedules, and flexible windows. For anything beyond simple "every 5 minutes" jobs, Scheduler is the right choice.

- **One-time schedules** enable deferred actions and reminders - send a reminder email 24 hours before an appointment, expire a promotional offer at midnight, execute a future-dated action. The `at()` expression handles this elegantly, and `ActionAfterCompletion: DELETE` cleans up after execution.

- **Time zone support** isn't just convenience - it's correctness. "Run at 9 AM Pacific" means 9 AM Pacific even during daylight saving time transitions. Without time zone support, you're managing UTC offsets manually and updating cron expressions twice a year.

- **Flexible windows** prevent thundering herd problems when you have thousands of schedules at the same time. If 10,000 daily reports all run at exactly 8:00 AM, your downstream services spike. A 30-minute flexible window spreads them randomly between 8:00-8:30, smoothing the load.

- **Universal targets** (`aws-sdk:{service}:{action}`) let you call any AWS API without writing Lambda code. Stop EC2 instances, scale ECS services, publish to SNS - all directly from a schedule. This eliminates hundreds of "one-line Lambda functions" that just call an AWS API.

- **Schedule groups** are essential for organization at scale. Group by purpose (daily-reports, user-reminders), by environment (prod-schedules, dev-schedules), or by team. Groups enable bulk deletion, IAM scoping, and cost attribution.

---

*Next: **EventBridge Pipes** - Let's explore point-to-point integration with filtering and enrichment.*

