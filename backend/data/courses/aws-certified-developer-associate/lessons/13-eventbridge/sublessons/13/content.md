# Security and Access Control: Protecting Your Events

## What the Main Page Introduced

The main page focused on EventBridge functionality. Now let's ensure your event buses, rules, and events are properly secured. Security in EventBridge involves IAM policies, resource policies, and encryption.

## Going Deeper

In this sub-chapter, we'll explore:
1. **IAM policies** - Who can do what
2. **Resource policies** - Cross-account and service access
3. **Encryption** - Protecting event data
4. **Least privilege patterns** - Security best practices
5. **Common security scenarios** - Real-world configurations
6. **Audit and compliance** - Monitoring access

---

## IAM Policies for EventBridge

### Key Actions

| Action | Description | Use Case |
|--------|-------------|----------|
| `events:PutEvents` | Publish events | Event producers |
| `events:PutRule` | Create/update rules | Administrators |
| `events:PutTargets` | Add targets to rules | Administrators |
| `events:DescribeRule` | View rule details | Developers, monitoring |
| `events:ListRules` | List rules | Developers |
| `events:EnableRule` | Enable a rule | Operations |
| `events:DisableRule` | Disable a rule | Operations |
| `events:DeleteRule` | Delete a rule | Administrators |

### Publisher Policy (Minimal)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:us-east-1:123456789012:event-bus/orders-bus"
    }
  ]
}
```

### Rule Manager Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "events:PutRule",
        "events:PutTargets",
        "events:RemoveTargets",
        "events:DeleteRule",
        "events:DescribeRule",
        "events:ListRules",
        "events:ListTargetsByRule"
      ],
      "Resource": "arn:aws:events:us-east-1:123456789012:rule/orders-bus/*"
    }
  ]
}
```

### Read-Only Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "events:Describe*",
        "events:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Resource Policies: Cross-Account Access

Resource policies control who can access an event bus from outside your account.

### When You Need Resource Policies

| Scenario | Resource Policy Needed? |
|----------|------------------------|
| Same account publishing | No (use IAM) |
| Cross-account publishing | Yes |
| AWS service publishing | Sometimes |
| Partner event sources | Yes (auto-created) |

### Cross-Account Publishing

Allow Account B to publish to Account A's bus:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccountBToPublish",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::222222222222:root"
      },
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:us-east-1:111111111111:event-bus/shared-bus"
    }
  ]
}
```

### Cross-Account with Specific Role

More restrictive - only a specific role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSpecificRole",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::222222222222:role/EventPublisher"
      },
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:us-east-1:111111111111:event-bus/shared-bus"
    }
  ]
}
```

### Organization-Wide Access

Allow entire AWS Organization:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowOrganization",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:us-east-1:111111111111:event-bus/org-events",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalOrgID": "o-abc123"
        }
      }
    }
  ]
}
```

### Applying Resource Policies

**CloudFormation:**

```yaml
EventBusPolicy:
  Type: AWS::Events::EventBusPolicy
  Properties:
    EventBusName: !Ref SharedEventBus
    StatementId: AllowCrossAccount
    Action: events:PutEvents
    Principal: "222222222222"
```

**CLI:**

```bash
aws events put-permission \
  --event-bus-name shared-bus \
  --statement-id AllowAccountB \
  --action events:PutEvents \
  --principal 222222222222
```

---

## Target Permissions

Targets need permission to be invoked by EventBridge.

### Lambda: Resource-Based Policy

```yaml
LambdaPermission:
  Type: AWS::Lambda::Permission
  Properties:
    FunctionName: !Ref MyFunction
    Action: lambda:InvokeFunction
    Principal: events.amazonaws.com
    SourceArn: !GetAtt MyRule.Arn
```

### Role-Based Targets (SQS, SNS, Step Functions)

```yaml
EventBridgeRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: "2012-10-17"
      Statement:
        - Effect: Allow
          Principal:
            Service: events.amazonaws.com
          Action: sts:AssumeRole
    Policies:
      - PolicyName: TargetPermissions
        PolicyDocument:
          Version: "2012-10-17"
          Statement:
            - Effect: Allow
              Action: sqs:SendMessage
              Resource: !GetAtt MyQueue.Arn
            - Effect: Allow
              Action: sns:Publish
              Resource: !Ref MyTopic
            - Effect: Allow
              Action: states:StartExecution
              Resource: !Ref MyStateMachine
```

### Cross-Account Target

To send events to another account's target, the target account must:

1. **Create resource policy on their bus**
2. **Your rule targets their bus (not Lambda directly)**

```yaml
CrossAccountTarget:
  Type: AWS::Events::Rule
  Properties:
    EventPattern:
      source: ["pettracker.orders"]
    Targets:
      - Id: OtherAccountBus
        Arn: arn:aws:events:us-east-1:222222222222:event-bus/their-bus
        RoleArn: !GetAtt CrossAccountRole.Arn
```

---

## Encryption

### Encryption at Rest

EventBridge encrypts data at rest using AWS-managed keys by default.

For customer-managed keys:

```yaml
EventBus:
  Type: AWS::Events::EventBus
  Properties:
    Name: secure-bus
    KmsKeyIdentifier: !GetAtt EventBusKey.Arn

EventBusKey:
  Type: AWS::KMS::Key
  Properties:
    Description: Key for EventBridge encryption
    KeyPolicy:
      Version: "2012-10-17"
      Statement:
        - Sid: AllowEventBridge
          Effect: Allow
          Principal:
            Service: events.amazonaws.com
          Action:
            - kms:Decrypt
            - kms:GenerateDataKey
          Resource: "*"
```

### Encryption in Transit

All EventBridge API calls use HTTPS (TLS 1.2+). Events in transit are always encrypted.

### KMS Key Policy

Your KMS key must allow EventBridge to use it:

```json
{
  "Sid": "AllowEventBridgeToUseKey",
  "Effect": "Allow",
  "Principal": {
    "Service": "events.amazonaws.com"
  },
  "Action": [
    "kms:Decrypt",
    "kms:GenerateDataKey*"
  ],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "aws:SourceAccount": "123456789012"
    }
  }
}
```

---

## Least Privilege Patterns

### Pattern 1: Service-Specific Publisher

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:*:*:event-bus/orders-bus",
      "Condition": {
        "StringEquals": {
          "events:source": "pettracker.orders"
        }
      }
    }
  ]
}
```

Only allows publishing events with `source: pettracker.orders`.

### Pattern 2: Environment Isolation

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "events:PutEvents",
      "Resource": [
        "arn:aws:events:*:*:event-bus/dev-*",
        "arn:aws:events:*:*:event-bus/staging-*"
      ]
    },
    {
      "Effect": "Deny",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:*:*:event-bus/prod-*"
    }
  ]
}
```

### Pattern 3: Rule Management by Prefix

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "events:PutRule",
        "events:DeleteRule",
        "events:PutTargets",
        "events:RemoveTargets"
      ],
      "Resource": "arn:aws:events:*:*:rule/*/team-alpha-*"
    }
  ]
}
```

Only manage rules with prefix `team-alpha-`.

---

## Common Security Scenarios

### Scenario 1: Multi-Tenant Event Bus

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:*:*:event-bus/tenant-events",
      "Condition": {
        "StringEquals": {
          "events:detail.tenantId": "${aws:PrincipalTag/TenantId}"
        }
      }
    }
  ]
}
```

Tenants can only publish events with their own tenantId.

### Scenario 2: Central Logging Bus

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAllAccountsToPublish",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "events:PutEvents",
      "Resource": "arn:aws:events:us-east-1:999999999999:event-bus/central-logs",
      "Condition": {
        "StringEquals": {
          "aws:PrincipalOrgID": "o-abc123"
        },
        "StringLike": {
          "events:detail-type": ["Audit *", "Security *"]
        }
      }
    }
  ]
}
```

### Scenario 3: Read-Only Access for Monitoring

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "events:DescribeEventBus",
        "events:DescribeRule",
        "events:ListRules",
        "events:ListTargetsByRule",
        "events:ListArchives",
        "events:DescribeArchive"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## Audit and Compliance

### CloudTrail Integration

All EventBridge API calls are logged in CloudTrail:

```json
{
  "eventSource": "events.amazonaws.com",
  "eventName": "PutEvents",
  "userIdentity": {
    "arn": "arn:aws:iam::123456789012:role/OrderService"
  },
  "requestParameters": {
    "entries": [
      {
        "source": "pettracker.orders",
        "detailType": "Order Completed"
      }
    ]
  }
}
```

### Monitoring with CloudWatch

Create alarms for security events:

```yaml
UnauthorizedAccessAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: EventBridge-Unauthorized-Access
    MetricName: ThrottledRequests
    Namespace: AWS/Events
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 1
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold
    AlarmActions:
      - !Ref SecurityAlertTopic
```

### Event Pattern for Security Monitoring

Create a rule to capture IAM changes to EventBridge:

```json
{
  "source": ["aws.events"],
  "detail-type": ["AWS API Call via CloudTrail"],
  "detail": {
    "eventSource": ["events.amazonaws.com"],
    "eventName": [
      "PutRule",
      "DeleteRule",
      "PutTargets",
      "RemoveTargets",
      "PutPermission",
      "RemovePermission"
    ]
  }
}
```

---

## Security Checklist

| Item | Status |
|------|--------|
| ☐ Least privilege IAM policies for publishers |  |
| ☐ Resource policies restrict cross-account access |  |
| ☐ Customer-managed KMS keys for sensitive buses |  |
| ☐ CloudTrail enabled for audit |  |
| ☐ Alarms on unauthorized access attempts |  |
| ☐ Rules monitor for configuration changes |  |
| ☐ Lambda permissions use SourceArn condition |  |
| ☐ Target roles follow least privilege |  |

---

## Did You Know?

**Did you know?** You can use AWS Organizations SCPs (Service Control Policies) to prevent EventBridge rule creation in certain accounts, enforcing a centralized event management model. This is powerful for enterprises: member accounts can publish events, but only the central security/platform team can create rules that consume them. This prevents shadow integrations and ensures all event processing goes through approved patterns.

**Here's something interesting:** The `events:source` condition key lets you restrict which event sources a principal can publish - and this prevents a subtle but serious attack. Without it, a compromised service could publish events impersonating another service (e.g., publishing `source: pettracker.payments` from a non-payment service). By constraining IAM policies with `events:source` conditions, each service can only publish events with its own source identifier.

**One more thing:** EventBridge supports VPC endpoints (PrivateLink), which keeps event traffic within your VPC without traversing the public internet. This matters for compliance (PCI-DSS, HIPAA) and security-sensitive workloads. Without a VPC endpoint, `put_events` calls go over the internet (encrypted, but still public). With it, traffic stays on AWS's private network.

```yaml
EventBridgeEndpoint:
  Type: AWS::EC2::VPCEndpoint
  Properties:
    VpcId: !Ref VPC
    ServiceName: !Sub com.amazonaws.${AWS::Region}.events
    VpcEndpointType: Interface
    PrivateDnsEnabled: true  # So "events.amazonaws.com" resolves to the private endpoint
```

---

## Exam Tips

**Key points for DVA-C02:**

1. **Resource policies**: For cross-account access to event buses
2. **IAM policies**: For same-account access control
3. **Lambda permissions**: Resource-based policy with SourceArn
4. **Encryption**: AWS-managed by default, customer-managed optional

**Common exam patterns:**

> "Allow another account to send events to your bus..."
> → Resource policy on the event bus

> "Restrict which events a service can publish..."
> → IAM condition on events:source

> "Audit all changes to EventBridge rules..."
> → CloudTrail + EventBridge rule on API calls

---

## Quick Reference

| Security Layer | Mechanism |
|----------------|-----------|
| **Who can publish** | IAM policy + Resource policy |
| **Who can manage rules** | IAM policy |
| **Target invocation** | Lambda permission or IAM role |
| **Data encryption** | KMS (AWS or customer managed) |
| **Network isolation** | VPC endpoints |
| **Audit** | CloudTrail |

---

## Key Takeaways

- **IAM policies** control what principals in your account can do; **resource policies** control what principals from other accounts can do. For cross-account event publishing, you need a resource policy on the receiving bus that allows the sender's account. IAM alone isn't enough.

- **Least privilege** means more than just limiting actions - use conditions. Restrict `events:PutEvents` to specific buses, and use `events:source` conditions to prevent services from impersonating each other. A compromised Lambda shouldn't be able to publish events claiming to be from the payment service.

- **Lambda targets need explicit permission** via resource-based policies. Unlike IAM (where you grant the role permission to invoke), Lambda requires the caller to be explicitly allowed. Add `AWS::Lambda::Permission` with `Principal: events.amazonaws.com` and `SourceArn` pointing to your rule.

- **Customer-managed KMS keys** provide control over encryption at rest. AWS-managed encryption is the default and sufficient for most workloads, but if you need to control key rotation, key policies, or audit key usage, create a CMK and configure it on the bus.

- **Monitor and audit** everything - CloudTrail captures all EventBridge API calls (PutEvents, PutRule, etc.). Create an EventBridge rule that captures CloudTrail events for EventBridge changes, sending them to your security monitoring. You'll know immediately when someone creates a new rule or modifies permissions.

- **VPC endpoints** are essential for compliance workloads. Without them, EventBridge API calls traverse the public internet (encrypted, but public). With PrivateLink, traffic stays within AWS's network, meeting PCI-DSS and HIPAA requirements for network isolation.

---

*Next: **Alex's Solution** - Let's bring everything together with the complete unified event architecture.*

