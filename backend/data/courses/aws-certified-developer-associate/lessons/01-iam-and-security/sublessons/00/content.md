# Alex's Challenge: The Security Audit

## The Dreaded Email

It arrives on a Tuesday morning:

```
From: Jordan Chen <jordan@securityfirst.io>
To: Alex <alex@pettracker.com>
Subject: AWS Security Audit - Urgent Findings

Alex,

I've completed the preliminary review of your AWS account.
We need to talk. Immediately.

Findings Summary:
- CRITICAL: 3 issues
- HIGH: 7 issues
- MEDIUM: 12 issues

I'll be at your desk in 10 minutes.

Jordan
```

Alex's stomach drops.

## Jordan's Findings

Jordan arrives with a laptop and a concerned expression. "Let's go through this together."

### Critical Finding #1: Root Account Usage

```bash
$ aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=Username,AttributeValue=root \
    --max-results 10

# Result: 47 root account actions in the last 7 days 😱
```

"You've been using the root account for everything," Jordan says. "The root account has unlimited access to your entire AWS environment. It can delete everything, including all audit logs. It should NEVER be used for daily work."

### Critical Finding #2: Exposed Access Keys

Jordan pulls up a GitHub search:

```
Search: "AKIA" + "pettracker"

Results:
- pettracker/config.py - Line 45: AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
```

"Your access keys were committed to a public repository. They've probably been scraped by bots within minutes. We need to rotate these immediately."

Alex goes pale. "I thought that repo was private!"

"It wasn't. And even in private repos, you should never commit credentials."

### Critical Finding #3: Shared IAM User

```bash
$ aws iam list-users --query 'Users[*].[UserName,CreateDate]'

[
    ["admin-user", "2024-01-01"],
    ["alex", "2024-01-15"]
]

# Only 2 users, but 4 developers on the team
```

"You have one 'admin-user' being shared between multiple people. This means:
- No accountability (who did what?)
- Can't revoke access for one person
- Password shared insecurely (Slack? Email?)"

## The Damage Assessment

Jordan runs more checks:

```bash
# Check for MFA
$ aws iam list-users --query 'Users[*].UserName' --output text | \
  xargs -I {} aws iam list-mfa-devices --user-name {} \
  --query 'MFADevices[*].UserName'

# Result: Only "alex" has MFA
```

```bash
# Check for old access keys
$ aws iam list-access-keys --user-name admin-user \
  --query 'AccessKeyMetadata[*].[AccessKeyId,CreateDate,Status]'

[
    ["AKIAXXXXXXXX1234", "2024-01-01", "Active"],  # 11 months old!
    ["AKIAXXXXXXXX5678", "2024-03-15", "Active"]   # Multiple keys?
]
```

```bash
# Check IAM policies
$ aws iam list-attached-user-policies --user-name admin-user

{
    "AttachedPolicies": [
        {
            "PolicyName": "AdministratorAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/AdministratorAccess"
        }
    ]
}

# Everyone has FULL admin access! 😱
```

## The Reality Check

Jordan shows Alex a diagram of current state vs. best practice:

```mermaid
graph TB
    subgraph "Current State (BAD)"
        Root1[Root Account] -->|Daily Use| AWS1[All AWS Resources]
        Admin1[admin-user<br/>AdministratorAccess<br/>Shared by 3 people] --> AWS1
        Alex1[alex<br/>AdministratorAccess] --> AWS1
        Keys1[Access Keys in GitHub] --> AWS1
    end
```

```mermaid
graph TB
    subgraph "Best Practice (GOOD)"
        Root2[Root Account] -->|MFA + Emergency Only| Billing[Billing Only]

        subgraph "IAM Users with MFA"
            U1[alex<br/>Developer Role]
            U2[maya<br/>Frontend Role]
            U3[sam<br/>DevOps Role]
        end

        subgraph "IAM Roles"
            R1[Lambda Execution Role]
            R2[EC2 Instance Role]
            R3[Cross-Account Role]
        end

        U1 -->|Assume| R1
        U2 -->|Limited Access| S3[S3 Frontend Bucket]
        R1 --> DDB[DynamoDB]
        R2 --> S3
    end
```

## Alex's Questions

"Okay, I get that it's bad," Alex says. "But I have questions:

1. **Why not just use admin access?** It's easier, and I'm the only developer right now.
2. **What if I lock myself out?** Won't strict permissions cause problems?
3. **Isn't this overkill for a startup?**"

Jordan smiles. "These are exactly the questions that lead to security incidents. Let me explain why each of your assumptions is dangerous..."

### Why Not Admin Access?

"Imagine you accidentally run this command:"

```bash
# Oops, meant to delete ONE object, but forgot the key name
aws s3 rm s3://pettracker-production/ --recursive

# With admin access: ENTIRE BUCKET DELETED
# With proper permissions: Access Denied (saved by least privilege)
```

"Or worse, a compromised credential:"

```bash
# Attacker with your admin key
aws iam create-user --user-name backdoor
aws iam attach-user-policy --user-name backdoor \
    --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam create-access-key --user-name backdoor

# Now attacker has persistent access to EVERYTHING
```

### What If I Lock Myself Out?

"That's what the root account is for - emergency break-glass access. You lock the root account away with MFA, and only use it to:
- Reset passwords if IAM is misconfigured
- Close the account
- Change support plans
- A few other root-only actions"

### Isn't This Overkill?

"Let me tell you about a startup I worked with last year..."

## Jordan's War Story

"Small startup, three developers, 'we'll add security later' mindset. One morning, their entire AWS account was compromised.

The attack:
1. Developer committed keys to public repo
2. Bot scraped keys within 2 minutes
3. Attacker launched 500 GPU instances for crypto mining
4. $38,000 bill accumulated in 6 hours
5. Attacker deleted all their data as a 'thank you'

The startup didn't survive. Not because of the bill - AWS forgave most of it - but because they lost 6 months of development work and all customer data."

Alex swallows hard.

## The Remediation Plan

Jordan hands Alex a checklist:

```markdown
## Immediate Actions (Today)

- [ ] Rotate all exposed access keys
- [ ] Enable MFA on root account
- [ ] Stop using root account
- [ ] Create individual IAM users for each developer
- [ ] Remove AdministratorAccess from everyone

## This Week

- [ ] Implement least-privilege policies
- [ ] Set up IAM groups (Developers, DevOps, ReadOnly)
- [ ] Create service roles for Lambda, EC2
- [ ] Set up Secrets Manager for sensitive config
- [ ] Enable CloudTrail for audit logging

## This Month

- [ ] Implement cross-account strategy (dev/staging/prod)
- [ ] Set up AWS Organizations
- [ ] Implement SCPs (Service Control Policies)
- [ ] Security review of all IAM policies
```

## Your Challenge

As you follow Alex through this chapter, you'll learn to implement all these security controls properly. By the end, you'll have:

- A properly secured AWS account structure
- Understanding of IAM users, groups, roles, and policies
- Practical skills in writing least-privilege policies
- Knowledge of KMS, Secrets Manager, and Parameter Store
- Ability to pass the IAM sections of the DVA-C02 exam

## Key Takeaway

> **"Security is not a feature you add later. It's a foundation you build from the start. The longer you wait, the harder and riskier the remediation."**
>
> - Jordan Chen, Security Consultant

---

*Next: Alex learns the fundamentals of IAM and starts fixing these critical issues.*

---
*v1.0*
