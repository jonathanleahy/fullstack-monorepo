# Security Best Practices

## Jordan's Security Checklist

Jordan provides Alex with a comprehensive security checklist. "These aren't optional nice-to-haves," Jordan says. "These are the baseline for any production system."

## The Security Foundation

```mermaid
mindmap
    root((Security Best Practices))
        Identity
            MFA everywhere
            No root usage
            Individual users
            Least privilege
        Credentials
            Rotate keys
            Use roles
            No hardcoding
            Secrets Manager
        Monitoring
            CloudTrail
            Config Rules
            Access Analyzer
            GuardDuty
        Network
            VPC isolation
            Security groups
            NACLs
            PrivateLink
```

## Best Practice 1: Multi-Factor Authentication (MFA)

### Enable MFA on All Users

```bash
# Check who has MFA
aws iam generate-credential-report
aws iam get-credential-report --output text --query 'Content' | base64 -d | grep -E "user|mfa_active"

# List users without MFA
aws iam list-users --query 'Users[*].UserName' --output text | \
while read user; do
    mfa=$(aws iam list-mfa-devices --user-name $user --query 'MFADevices' --output text)
    if [ -z "$mfa" ]; then
        echo "NO MFA: $user"
    fi
done
```

### Enforce MFA with Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowViewAccountInfo",
            "Effect": "Allow",
            "Action": [
                "iam:GetAccountPasswordPolicy",
                "iam:ListVirtualMFADevices"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AllowManageOwnMFA",
            "Effect": "Allow",
            "Action": [
                "iam:CreateVirtualMFADevice",
                "iam:EnableMFADevice",
                "iam:ResyncMFADevice"
            ],
            "Resource": [
                "arn:aws:iam::*:mfa/${aws:username}",
                "arn:aws:iam::*:user/${aws:username}"
            ]
        },
        {
            "Sid": "DenyAllExceptListedIfNoMFA",
            "Effect": "Deny",
            "NotAction": [
                "iam:CreateVirtualMFADevice",
                "iam:EnableMFADevice",
                "iam:GetUser",
                "iam:ListMFADevices",
                "iam:ListVirtualMFADevices",
                "iam:ResyncMFADevice",
                "sts:GetSessionToken"
            ],
            "Resource": "*",
            "Condition": {
                "BoolIfExists": {
                    "aws:MultiFactorAuthPresent": "false"
                }
            }
        }
    ]
}
```

This policy forces users to set up MFA before they can do anything else!

## Best Practice 2: Least Privilege

### Start Restrictive, Expand as Needed

```mermaid
graph LR
    subgraph "Wrong Approach"
        Admin[Admin Access] --> Restrict[Try to restrict later]
        Restrict --> Hard[Hard to do!]
    end

    subgraph "Right Approach"
        Minimal[Minimal Access] --> Expand[Expand when needed]
        Expand --> Documented[Changes documented]
    end

    style Admin fill:#f99
    style Minimal fill:#9f9
```

### Use IAM Access Analyzer

```bash
# Enable Access Analyzer
aws accessanalyzer create-analyzer \
    --analyzer-name PetTrackerAnalyzer \
    --type ACCOUNT

# List findings (external access)
aws accessanalyzer list-findings \
    --analyzer-arn arn:aws:access-analyzer:us-east-1:123456789012:analyzer/PetTrackerAnalyzer

# Generate policy based on activity
aws accessanalyzer start-policy-generation \
    --policy-generation-details '{
        "principalArn": "arn:aws:iam::123456789012:role/MyRole"
    }'
```

### Policy Generation from CloudTrail

Use Access Analyzer to generate least-privilege policies based on actual usage:

```bash
# After role has been used for 30+ days
aws accessanalyzer get-generated-policy \
    --job-id abc123-def456

# Returns policy based on ACTUAL actions used
# Much better than guessing!
```

## Best Practice 3: Credential Rotation

### Access Key Rotation

```bash
#!/bin/bash
# rotate-access-keys.sh

USER=$1
MAX_AGE=90

echo "Checking access keys for $USER..."

aws iam list-access-keys --user-name $USER \
    --query 'AccessKeyMetadata[*].[AccessKeyId,CreateDate]' --output text | \
while read key_id create_date; do
    age=$(( ($(date +%s) - $(date -d "$create_date" +%s)) / 86400 ))

    if [ $age -gt $MAX_AGE ]; then
        echo "⚠️  Key $key_id is $age days old - ROTATION NEEDED"
    else
        echo "✓ Key $key_id is $age days old"
    fi
done
```

### Automated Rotation with Lambda

```python
import boto3
from datetime import datetime, timezone

def lambda_handler(event, context):
    iam = boto3.client('iam')
    sns = boto3.client('sns')

    users = iam.list_users()['Users']

    for user in users:
        keys = iam.list_access_keys(UserName=user['UserName'])

        for key in keys['AccessKeyMetadata']:
            age = (datetime.now(timezone.utc) - key['CreateDate']).days

            if age > 80:  # Warn at 80 days
                sns.publish(
                    TopicArn='arn:aws:sns:us-east-1:123456789012:security-alerts',
                    Subject=f"Access Key Rotation Warning: {user['UserName']}",
                    Message=f"Access key {key['AccessKeyId']} is {age} days old. Please rotate."
                )

            if age > 90:  # Disable at 90 days
                iam.update_access_key(
                    UserName=user['UserName'],
                    AccessKeyId=key['AccessKeyId'],
                    Status='Inactive'
                )
```

## Best Practice 4: No Hardcoded Credentials

### What NOT to Do

```python
# ❌ NEVER DO THIS
AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)
```

### What TO Do

```python
# ✅ Let SDK handle credentials
import boto3

# Uses credential chain automatically
client = boto3.client('s3')

# In Lambda: Uses execution role
# On EC2: Uses instance profile
# Locally: Uses ~/.aws/credentials or env vars
```

### Pre-commit Hook to Catch Secrets

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/awslabs/git-secrets
    rev: master
    hooks:
      - id: git-secrets

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
```

## Best Practice 5: Enable CloudTrail

```bash
# Create CloudTrail for all regions
aws cloudtrail create-trail \
    --name PetTracker-Audit \
    --s3-bucket-name pettracker-cloudtrail-logs \
    --is-multi-region-trail \
    --enable-log-file-validation

# Start logging
aws cloudtrail start-logging --name PetTracker-Audit

# Verify
aws cloudtrail describe-trails
```

### Query CloudTrail for Security Events

```bash
# Find all IAM changes
aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=EventSource,AttributeValue=iam.amazonaws.com \
    --max-results 20

# Find console logins
aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=EventName,AttributeValue=ConsoleLogin

# Find root account usage
aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=Username,AttributeValue=root
```

## Best Practice 6: Use Tags for Access Control

### Tag-Based Access Control (ABAC)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "ec2:ResourceTag/Environment": "${aws:PrincipalTag/Environment}"
                }
            }
        }
    ]
}
```

This allows users to only manage instances that match their Environment tag!

### Enforcing Tags

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Deny",
        "Action": "ec2:RunInstances",
        "Resource": "arn:aws:ec2:*:*:instance/*",
        "Condition": {
            "Null": {
                "aws:RequestTag/Owner": "true"
            }
        }
    }]
}
```

## Best Practice 7: Regular Security Audits

### IAM Credential Report

```bash
# Generate credential report
aws iam generate-credential-report

# Wait a few seconds, then download
aws iam get-credential-report \
    --query 'Content' --output text | base64 -d > credential-report.csv

# Check for issues
cat credential-report.csv | csvtool col 1,4,5,8,9 - | column -t -s,
# Shows: user, password_enabled, mfa_active, access_key_1_active, access_key_1_last_rotated
```

### Alex's Weekly Security Check Script

```bash
#!/bin/bash
# security-audit.sh

echo "=== PetTracker Security Audit ==="
echo "Date: $(date)"
echo ""

echo "1. Users without MFA:"
aws iam list-users --query 'Users[*].UserName' --output text | \
while read user; do
    mfa=$(aws iam list-mfa-devices --user-name $user --query 'MFADevices' --output text)
    [ -z "$mfa" ] && echo "   - $user"
done
echo ""

echo "2. Old access keys (>90 days):"
aws iam list-users --query 'Users[*].UserName' --output text | \
while read user; do
    aws iam list-access-keys --user-name $user \
        --query 'AccessKeyMetadata[?Status==`Active`].[UserName,AccessKeyId,CreateDate]' \
        --output text
done | while read user key date; do
    age=$(( ($(date +%s) - $(date -d "$date" +%s)) / 86400 ))
    [ $age -gt 90 ] && echo "   - $user: $key ($age days)"
done
echo ""

echo "3. Unused credentials (>30 days):"
aws iam get-credential-report --query 'Content' --output text | \
    base64 -d | tail -n +2 | \
    awk -F',' '$5=="true" && $11!="N/A" && $11!="no_information" {
        cmd="date -d \""$11"\" +%s 2>/dev/null"
        cmd | getline last_used
        close(cmd)
        age=int((systime()-last_used)/86400)
        if(age>30) print "   - "$1": last used "age" days ago"
    }'
echo ""

echo "4. Root account activity (last 7 days):"
aws cloudtrail lookup-events \
    --lookup-attributes AttributeKey=Username,AttributeValue=root \
    --start-time $(date -d '7 days ago' +%s) \
    --query 'Events[*].[EventTime,EventName]' --output text | head -10
echo ""

echo "5. Access Analyzer findings:"
aws accessanalyzer list-findings \
    --analyzer-arn arn:aws:access-analyzer:us-east-1:123456789012:analyzer/PetTrackerAnalyzer \
    --query 'findings[*].[resourceType,resource,status]' --output table

echo ""
echo "=== Audit Complete ==="
```

## Security Best Practices Summary

| Practice | Priority | Implementation |
|----------|----------|----------------|
| MFA on all users | CRITICAL | Policy enforcement |
| No root account usage | CRITICAL | Lock root, enable MFA |
| Least privilege | HIGH | Access Analyzer |
| Credential rotation | HIGH | 90-day policy |
| No hardcoded secrets | HIGH | Secrets Manager |
| CloudTrail enabled | HIGH | All regions |
| Access Analyzer | MEDIUM | Weekly review |
| Tag-based controls | MEDIUM | ABAC policies |
| Regular audits | MEDIUM | Weekly script |

## Exam Tips

**For DVA-C02:**

1. **MFA** should be enabled for all users, especially root
2. **Least privilege** - start minimal, expand as needed
3. **Rotate credentials** every 90 days
4. **CloudTrail** for audit logging
5. **Access Analyzer** finds external access
6. **Never hardcode credentials** in code

**Common scenarios:**

> "How to ensure users set up MFA?"
> → Use MFA enforcement policy

> "How to find unused permissions?"
> → Use IAM Access Analyzer policy generation

> "How to audit IAM changes?"
> → Enable CloudTrail, query for IAM events

## Key Takeaways

1. **MFA everywhere** - Non-negotiable for security
2. **Least privilege** - Grant minimum required permissions
3. **Rotate credentials** - 90 days max for access keys
4. **Never hardcode** - Use roles and Secrets Manager
5. **Audit regularly** - CloudTrail, Access Analyzer, credential reports
6. **Tag everything** - Enables ABAC and cost tracking

---

*Next: Alex learns about KMS and encryption to protect PetTracker data.*

---
*v2.0*
