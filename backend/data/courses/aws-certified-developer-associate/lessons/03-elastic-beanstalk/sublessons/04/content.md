# Deployment Strategies

## Alex's Deployment Dilemma

Alex is about to deploy a major update to the ML model. Maya warns:

"Be careful with your deployment strategy. Last month, someone used 'All at once' for a production update. All instances went down at the same time. 5 minutes of downtime, angry users, CTO not happy."

Alex asks: "What strategy should I use?"

## Available Deployment Policies

```mermaid
graph TB
    subgraph "Deployment Policies"
        AAO[All at Once<br/>Fast, has downtime]
        Roll[Rolling<br/>No downtime, reduced capacity]
        RollB[Rolling with Batch<br/>No downtime, maintains capacity]
        Immut[Immutable<br/>Zero downtime, safe rollback]
        Traffic[Traffic Splitting<br/>Canary deployments]
    end
```

## All at Once

Deploys to all instances simultaneously.

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant I1 as Instance 1
    participant I2 as Instance 2

    Note over LB,I2: Before: v1.0 running
    LB->>I1: Deploy v1.1
    LB->>I2: Deploy v1.1
    Note over I1,I2: ⚠️ All instances updating
    Note over I1,I2: Brief downtime
    Note over LB,I2: After: v1.1 running
```

### Characteristics

| Aspect | Value |
|--------|-------|
| Downtime | Yes (brief) |
| Deploy time | Fastest |
| Rollback | Redeploy previous version |
| Cost | No additional cost |
| Best for | Development environments |

```bash
# Configure all-at-once deployment
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-dev \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=DeploymentPolicy,Value=AllAtOnce
```

## Rolling

Deploys in batches, keeping some instances serving traffic.

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant I1 as Instance 1
    participant I2 as Instance 2
    participant I3 as Instance 3
    participant I4 as Instance 4

    Note over LB,I4: Before: All running v1.0
    Note over I1,I2: Batch 1: Updating
    LB->>I1: Deploy v1.1
    LB->>I2: Deploy v1.1
    Note over I3,I4: Still serving v1.0
    Note over I1,I2: Batch 1: Complete
    Note over I3,I4: Batch 2: Updating
    LB->>I3: Deploy v1.1
    LB->>I4: Deploy v1.1
    Note over LB,I4: After: All running v1.1
```

### Characteristics

| Aspect | Value |
|--------|-------|
| Downtime | No |
| Deploy time | Moderate |
| Capacity | Reduced during deployment |
| Rollback | Redeploy (takes time) |
| Cost | No additional cost |
| Best for | Non-critical production |

```bash
# Configure rolling deployment
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-staging \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=DeploymentPolicy,Value=Rolling \
        Namespace=aws:elasticbeanstalk:command,OptionName=BatchSizeType,Value=Percentage \
        Namespace=aws:elasticbeanstalk:command,OptionName=BatchSize,Value=25
```

### Batch Size Options

```bash
# Percentage (25% of instances at a time)
Namespace=aws:elasticbeanstalk:command,OptionName=BatchSizeType,Value=Percentage
Namespace=aws:elasticbeanstalk:command,OptionName=BatchSize,Value=25

# Fixed number (2 instances at a time)
Namespace=aws:elasticbeanstalk:command,OptionName=BatchSizeType,Value=Fixed
Namespace=aws:elasticbeanstalk:command,OptionName=BatchSize,Value=2
```

## Rolling with Additional Batch

Launches new instances first, maintains full capacity throughout.

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant I1 as Instance 1
    participant I2 as Instance 2
    participant New as New Instance

    Note over LB,New: Before: 2 instances running v1.0
    LB->>New: Launch new instance with v1.1
    Note over New: Extra capacity added
    Note over I1: Update to v1.1
    Note over LB,New: Still at full capacity
    Note over I2: Update to v1.1
    LB->>New: Terminate extra instance
    Note over LB,I2: After: 2 instances running v1.1
```

### Characteristics

| Aspect | Value |
|--------|-------|
| Downtime | No |
| Deploy time | Moderate to slow |
| Capacity | Maintained (temporarily higher) |
| Rollback | Redeploy (takes time) |
| Cost | Temporarily higher |
| Best for | Production with capacity concerns |

```bash
# Configure rolling with additional batch
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-prod \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=DeploymentPolicy,Value=RollingWithAdditionalBatch \
        Namespace=aws:elasticbeanstalk:command,OptionName=BatchSizeType,Value=Fixed \
        Namespace=aws:elasticbeanstalk:command,OptionName=BatchSize,Value=1
```

## Immutable

Creates entirely new instances, swaps when healthy.

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant ASG1 as Original ASG
    participant ASG2 as Temp ASG

    Note over LB,ASG2: Before: Original instances v1.0
    LB->>ASG2: Create new ASG
    ASG2->>ASG2: Launch instances with v1.1
    ASG2->>ASG2: Health checks pass
    LB->>ASG2: Add to load balancer
    LB->>ASG1: Remove from load balancer
    ASG1->>ASG1: Terminate old instances
    Note over LB,ASG2: After: New instances v1.1 only
```

### Characteristics

| Aspect | Value |
|--------|-------|
| Downtime | No |
| Deploy time | Slowest |
| Capacity | Doubled temporarily |
| Rollback | Instant (just terminate new ASG) |
| Cost | Double during deployment |
| Best for | Critical production, risk-averse |

```bash
# Configure immutable deployment
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-prod \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=DeploymentPolicy,Value=Immutable
```

### Why Immutable is Safest

```mermaid
graph LR
    subgraph "If Deployment Fails"
        RollFail[Rolling Fail] --> RollAction[Some instances broken<br/>Complex rollback]
        ImmutFail[Immutable Fail] --> ImmutAction[Terminate new ASG<br/>Original untouched]
    end
```

## Traffic Splitting (Canary)

Gradually shift traffic to new version.

```mermaid
sequenceDiagram
    participant Users
    participant ALB as Load Balancer
    participant Old as Old Version
    participant New as New Version

    Note over ALB,New: Deploy new version to new instances
    Users->>ALB: Request
    ALB->>Old: 90% traffic
    ALB->>New: 10% traffic
    Note over ALB,New: Monitor for errors
    Users->>ALB: Request
    ALB->>Old: 50% traffic
    ALB->>New: 50% traffic
    Note over ALB,New: Looking good!
    Users->>ALB: Request
    ALB->>New: 100% traffic
    Note over ALB,New: Old instances terminated
```

### Characteristics

| Aspect | Value |
|--------|-------|
| Downtime | No |
| Deploy time | Configurable |
| Capacity | Extra during evaluation |
| Rollback | Instant |
| Cost | Higher during evaluation |
| Best for | High-risk changes, A/B testing |

```bash
# Configure traffic splitting
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-prod \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=DeploymentPolicy,Value=TrafficSplitting \
        Namespace=aws:elasticbeanstalk:trafficsplitting,OptionName=NewVersionPercent,Value=10 \
        Namespace=aws:elasticbeanstalk:trafficsplitting,OptionName=EvaluationTime,Value=5
```

## Comparison Table

| Policy | Downtime | Speed | Cost | Rollback | Risk |
|--------|----------|-------|------|----------|------|
| All at Once | Yes | ⚡ Fast | $ | Slow | High |
| Rolling | No | 🐢 Moderate | $ | Slow | Medium |
| Rolling + Batch | No | 🐢 Moderate | $$ | Slow | Medium |
| Immutable | No | 🐌 Slow | $$$ | ⚡ Fast | Low |
| Traffic Split | No | 🐌 Slow | $$$ | ⚡ Fast | Lowest |

## Alex's Decision Matrix

```mermaid
flowchart TD
    Start[Choose Deployment Policy] --> Q1{Is this prod?}
    Q1 -->|No| Dev[All at Once<br/>Speed matters]
    Q1 -->|Yes| Q2{Can handle reduced capacity?}
    Q2 -->|Yes| Q3{Need fast rollback?}
    Q2 -->|No| Q4{Risk tolerance?}
    Q3 -->|Yes| Immut[Immutable]
    Q3 -->|No| Roll[Rolling]
    Q4 -->|High| RollBatch[Rolling with Batch]
    Q4 -->|Low| Traffic[Traffic Splitting]
```

Alex's choices:
- **Development**: All at Once (fast iteration)
- **Staging**: Rolling (test deployments)
- **Production**: Immutable (safe rollback)

## Configuration Examples

### Via .ebextensions

```yaml
# .ebextensions/deployment.config
option_settings:
  aws:elasticbeanstalk:command:
    DeploymentPolicy: Immutable
    Timeout: 600
    IgnoreHealthCheck: false

  aws:autoscaling:updatepolicy:rollingupdate:
    RollingUpdateEnabled: true
    RollingUpdateType: Immutable
```

### Via EB CLI

```bash
# Create config file for different environments
cat > .elasticbeanstalk/deploy-prod.yml << 'EOF'
option_settings:
  aws:elasticbeanstalk:command:
    DeploymentPolicy: Immutable
EOF

# Apply to environment
eb config put deploy-prod
eb config --cfg deploy-prod
```

## Health Check During Deployment

```bash
# Configure health check settings
aws elasticbeanstalk update-environment \
    --environment-name pettracker-ml-prod \
    --option-settings \
        Namespace=aws:elasticbeanstalk:command,OptionName=IgnoreHealthCheck,Value=false \
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthCheckPath,Value=/health \
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthCheckInterval,Value=15 \
        Namespace=aws:elasticbeanstalk:environment:process:default,OptionName=HealthyThresholdCount,Value=2
```

## Exam Tips

**For DVA-C02:**

1. **All at Once**: Fastest, has downtime
2. **Rolling**: No downtime, reduced capacity
3. **Rolling with Batch**: Maintains full capacity
4. **Immutable**: New ASG, safest rollback
5. **Traffic Splitting**: Canary deployment

**Common scenarios:**

> "Zero downtime, must maintain full capacity..."
> → Rolling with additional batch or Immutable

> "Need instant rollback capability..."
> → Immutable or Traffic Splitting

> "Development environment, speed matters..."
> → All at Once

> "Gradually test new version with real traffic..."
> → Traffic Splitting

## Key Takeaways

1. **All at Once** for development (fast but risky)
2. **Rolling** for staging (no downtime, some risk)
3. **Rolling with Batch** maintains capacity during deployment
4. **Immutable** safest for production (instant rollback)
5. **Traffic Splitting** for canary deployments
6. **Choose based on** risk tolerance, speed needs, and cost

---

*Next: Alex learns to customize environments with .ebextensions.*
