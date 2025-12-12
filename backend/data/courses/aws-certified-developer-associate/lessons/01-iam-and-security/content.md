# IAM and Security: The Foundation Everything Else Stands On

## The Email That Woke Alex Up

It was 6:47 AM when Alex's phone buzzed with an urgent email from Jordan Chen, PetTracker's security consultant:

```
Subject: CRITICAL - AWS Security Audit Results
From: jordan@securityfirst.io

Alex,

I've completed the preliminary security review.
We need to talk. Today. In person.

Critical findings: 3
High severity: 7
Medium severity: 12

Your AWS account is a ticking time bomb.

Jordan
```

Alex's coffee suddenly tasted bitter. Three critical findings. In a startup that handles pet owners' personal data.

---

## "But We're Just a Small Startup..."

This is the excuse every small company makes before their first security incident. Let's examine why it's dangerous.

:::floating:right:1/2
```mermaid
graph TB
    subgraph "The Startup Security Fallacy"
        Small[We're too small to be targeted]
        Auto[Attacks are automated]
        Small -->|Reality| Auto
        Auto --> Bot[Bots scan ALL public IPs]
        Bot --> Keys[Exposed keys found in minutes]
    end
```

"I thought security could wait until we scale," Alex admitted when Jordan arrived.

Jordan shook their head. "That's backwards. Security debt compounds faster than technical debt. Here's what I found..."
:::

**Finding #1: Root Account in Daily Use**

```bash
# CloudTrail shows 47 root account actions in 7 days
aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=Username,AttributeValue=root \
    --max-results 50
```

"You've been using the root account for *everything*," Jordan said. "The root account has unlimited power. It can delete every resource, all backups, all audit logs. It's the nuclear launch codes of your AWS account."

**Finding #2: Access Keys in GitHub**

Jordan pulled up a search result:

```
GitHub Search: "AKIAIOSFODNN" site:github.com

Results: 1 match
  pettracker/config/settings.py - Line 23
  AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
```

"Your access keys were in a public repository. Bots scrape GitHub continuously. These keys were probably compromised within 2 minutes of being pushed."

**Finding #3: Shared IAM User**

```bash
$ aws iam list-users
# Only 2 users for a 4-person team
# "admin-shared" being used by everyone
```

"Four developers sharing one IAM user called 'admin-shared'. No accountability. No ability to revoke one person's access. Password probably shared via Slack."

Alex's face went pale. "How bad is this really?"

---

## "But Why Not Just Use Admin Access for Everyone?"

This is the question that leads to security incidents. Let's examine why "everyone gets admin" is a catastrophe waiting to happen.

**Scenario 1: The Accidental Deletion**

```bash
# Alex meant to delete ONE object
aws s3 rm s3://pettracker-prod-data/temp-file.json

# But accidentally ran this instead (autocomplete mishap)
aws s3 rm s3://pettracker-prod-data/ --recursive
# With admin access: ENTIRE BUCKET DELETED
# With proper permissions: Access Denied (saved!)
```

**Scenario 2: The Compromised Credential**

:::floating:left:1/2
```mermaid
sequenceDiagram
    participant Attacker
    participant GitHub
    participant AWS

    Attacker->>GitHub: Scrape for AWS keys
    GitHub-->>Attacker: Found AKIA... key
    Attacker->>AWS: Create backdoor user
    Attacker->>AWS: Attach admin policy
    Attacker->>AWS: Create new access key
    Note over Attacker,AWS: Attacker now has persistent access
```

When credentials with admin access are compromised:
- Attacker can create backdoor users
- Attacker can delete all data
- Attacker can launch crypto miners
- Attacker can exfiltrate everything
:::

**Scenario 3: The Insider Threat**

"What happens when someone leaves the company?" Jordan asked.

"We... change the shared password?"

"And the access keys? The CLI credentials on everyone's laptop? The scripts with hardcoded credentials?"

---

## How AWS Security Actually Works

AWS security is built on Identity and Access Management (IAM). Every single API call - whether from the console, CLI, or SDK - goes through IAM for authentication and authorization.

```mermaid
sequenceDiagram
    participant User
    participant IAM
    participant Service as AWS Service

    User->>IAM: Request + Credentials
    IAM->>IAM: Authentication (Who are you?)
    IAM->>IAM: Authorization (What can you do?)
    alt Allowed
        IAM->>Service: Forward Request
        Service->>User: Success Response
    else Denied
        IAM->>User: Access Denied
    end
```

**IAM answers two questions for every request:**
1. **Authentication**: Is this who they claim to be?
2. **Authorization**: Are they allowed to do this?

---

## The Four Pillars of IAM

:::floating:right:2/3
```mermaid
graph TB
    subgraph "IAM Components"
        Users[Users<br/>Individual identities]
        Groups[Groups<br/>Collections of users]
        Roles[Roles<br/>Temporary credentials]
        Policies[Policies<br/>Permission definitions]
    end

    Policies -->|attached to| Users
    Policies -->|attached to| Groups
    Policies -->|attached to| Roles
    Users -->|belong to| Groups
    Users -->|can assume| Roles
```

**Users** - Individual identities for people or applications. Long-term credentials (password, access keys).

**Groups** - Collections of users. Attach policies to groups, all members inherit permissions.

**Roles** - Temporary credentials. Used by services, cross-account access, and temporary elevation.

**Policies** - JSON documents defining what actions are allowed or denied.
:::

| Component | Credentials | Best For |
|-----------|-------------|----------|
| **User** | Long-term (password, keys) | Individual developers |
| **Group** | None (just organizes users) | Permission management |
| **Role** | Temporary (STS tokens) | Services, cross-account |
| **Policy** | N/A (defines permissions) | Everything |

---

## What You'll Learn in This Chapter

This chapter follows Alex's journey from security disaster to properly secured AWS environment:

- **IAM fundamentals** - Users, groups, roles, and how they interact
- **Policy deep dive** - JSON structure, evaluation logic, and best practices
- **Cross-account access** - Roles for multi-account architectures
- **Security services** - KMS, Secrets Manager, and Parameter Store
- **Best practices** - Least privilege, MFA, key rotation

| Concept | What It Solves |
|---------|---------------|
| **IAM Users** | Individual accountability |
| **IAM Groups** | Scalable permission management |
| **IAM Roles** | Secure service-to-service access |
| **IAM Policies** | Fine-grained access control |
| **MFA** | Protection against credential theft |
| **KMS** | Encryption key management |
| **Secrets Manager** | Secure credential storage |

## The Architecture We're Building

:::floating:right:2/3
```mermaid
graph TB
    subgraph "Secure PetTracker Architecture"
        Root[Root Account<br/>MFA + Emergency Only]

        subgraph "IAM Users"
            Alex[alex<br/>Developer]
            Maya[maya<br/>Frontend]
            Sam[sam<br/>DevOps]
        end

        subgraph "IAM Groups"
            DevGroup[Developers]
            OpsGroup[DevOps]
        end

        subgraph "IAM Roles"
            LambdaRole[Lambda Execution]
            EC2Role[EC2 Instance]
        end

        subgraph "Security Services"
            KMS[KMS Keys]
            SM[Secrets Manager]
            PS[Parameter Store]
        end

        Alex --> DevGroup
        Maya --> DevGroup
        Sam --> OpsGroup

        LambdaRole --> KMS
        LambdaRole --> SM
    end
```

By chapter end, PetTracker will have:
- Individual IAM users with MFA
- Group-based permission management
- Service roles for Lambda and EC2
- Encrypted secrets in Secrets Manager
- Audit logging via CloudTrail
:::

## Why This Matters for the Exam

The DVA-C02 exam **heavily** tests IAM. Expect:

- **15-20% of questions** involve IAM directly
- **Policy evaluation** scenarios
- **Cross-account access** patterns
- **Service role** configuration
- **Security best practices**

| Topic | What the Exam Asks |
|-------|-------------------|
| **Policy Evaluation** | Explicit deny vs implicit deny |
| **Roles vs Users** | When to use each |
| **Cross-Account** | Trust policies and assume role |
| **Service Roles** | Lambda, EC2, ECS permissions |
| **Resource Policies** | S3 bucket policies, KMS key policies |
| **Security Tools** | KMS, Secrets Manager, Parameter Store |

## Meet the Team

Throughout this chapter:

- **Alex** - Developer learning security the hard way
- **Jordan** - Security consultant who's seen every mistake
- **Sam** - DevOps mentor helping with implementation
- **Maya** - Frontend developer who needs limited AWS access
- **Elena** - CTO who gets involved when security matters

## Chapter Roadmap

1. **Alex's Challenge** - The security audit wake-up call
2. **IAM Fundamentals** - Users, groups, and the root account
3. **IAM Users and Groups** - Individual identities and organization
4. **IAM Policies Deep Dive** - JSON structure and evaluation logic
5. **IAM Roles** - Temporary credentials and cross-account access
6. **Resource-Based Policies** - S3, KMS, and service policies
7. **Security Best Practices** - MFA, least privilege, and key rotation
8. **KMS** - Encryption key management
9. **Secrets Manager** - Secure credential storage
10. **Parameter Store** - Configuration management
11. **CloudTrail** - Audit logging and compliance
12. **Alex's Solution** - The fully secured PetTracker account

---

## The Before and After

```mermaid
graph TB
    subgraph "Before: Dangerous"
        B1[Root Account Daily Use]
        B2[Shared Credentials]
        B3[Keys in GitHub]
        B4[No MFA]
        B5[No Audit Trail]
    end
```

```mermaid
graph TB
    subgraph "After: Secure"
        A1[Individual Users]
        A2[Role-Based Access]
        A3[Secrets in Vault]
        A4[MFA Everywhere]
        A5[Full CloudTrail]
    end
```

---

*Ready to learn how to secure your AWS account properly? Let's start with understanding the IAM fundamentals and why the root account should scare you.*

---
*v2.0*
