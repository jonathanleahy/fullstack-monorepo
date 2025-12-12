# IAM Users and Groups

## Alex's Team Structure Challenge

Now that Alex understands IAM basics, it's time to implement proper user management. PetTracker's team is small but growing:

- **Alex** - Full-stack developer, needs broad access
- **Maya** - Frontend developer, mainly needs S3 and CloudFront
- **Sam** - DevOps engineer, needs deployment and infrastructure access
- **Jordan** - Security consultant, needs read-only audit access
- **CI/CD Pipeline** - Automated deployments (not a person!)

"Each of these needs different levels of access," Jordan explains. "Let's set this up properly."

## Creating IAM Users

### Console Access vs Programmatic Access

```mermaid
graph LR
    subgraph "Access Types"
        Console[Console Access<br/>Username + Password]
        Programmatic[Programmatic Access<br/>Access Key + Secret Key]
    end

    subgraph "Use Cases"
        Human[Human Users] --> Console
        Human --> Programmatic
        Machine[Applications/CI-CD] --> Programmatic
    end
```

### Creating a User with CLI

```bash
# Create user
aws iam create-user --user-name maya

# Enable console access (for humans)
aws iam create-login-profile \
    --user-name maya \
    --password "ChangeMe123!" \
    --password-reset-required

# Create access keys (for programmatic access)
aws iam create-access-key --user-name maya

# Output - SAVE THESE SECURELY!
{
    "AccessKey": {
        "UserName": "maya",
        "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
        "Status": "Active",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    }
}
```

### Alex's Mistake: Sharing Credentials

Alex creates an access key and Slacks it to Maya. Jordan sees this and intervenes:

```
❌ WRONG:
Alex: "Hey Maya, here's your access key: AKIA... and secret: wJal..."
Maya: "Thanks! *saves to Notes app*"
```

```
✓ RIGHT:
1. Create user with console access
2. Set temporary password with reset required
3. User logs in and creates OWN access keys
4. User enables MFA themselves
```

"Never share credentials through chat, email, or any communication channel," Jordan warns. "Have each person create their own."

## Creating and Using Groups

Groups make permission management scalable:

```bash
# Create groups for different roles
aws iam create-group --group-name Developers
aws iam create-group --group-name DevOps
aws iam create-group --group-name SecurityAudit
aws iam create-group --group-name ReadOnly

# Add users to groups
aws iam add-user-to-group --user-name alex --group-name Developers
aws iam add-user-to-group --user-name maya --group-name Developers
aws iam add-user-to-group --user-name sam --group-name DevOps
aws iam add-user-to-group --user-name jordan --group-name SecurityAudit
```

### Group-Based Permission Model

```mermaid
graph TB
    subgraph "Groups"
        Dev[Developers]
        DevOps[DevOps]
        Audit[SecurityAudit]
    end

    subgraph "Users"
        Alex[alex]
        Maya[maya]
        Sam[sam]
        Jordan[jordan]
    end

    subgraph "Policies"
        DevPolicy[DeveloperPolicy<br/>Lambda, DynamoDB, S3]
        DevOpsPolicy[DevOpsPolicy<br/>EC2, CloudFormation, IAM]
        AuditPolicy[SecurityAuditPolicy<br/>ReadOnly + CloudTrail]
    end

    Alex --> Dev
    Maya --> Dev
    Sam --> DevOps
    Jordan --> Audit

    DevPolicy --> Dev
    DevOpsPolicy --> DevOps
    AuditPolicy --> Audit
```

### Why Groups Matter

Alex asks, "Can't I just attach policies directly to users?"

Jordan explains with a scenario:

```
Scenario: New developer joins (Carlos)

WITHOUT Groups:
1. Find what policies Alex has
2. Find what policies Maya has
3. Compare, decide which Carlos needs
4. Attach 5 policies individually
5. Time: 30 minutes
6. Risk: Forget a policy, inconsistent access

WITH Groups:
1. aws iam add-user-to-group --user-name carlos --group-name Developers
2. Time: 10 seconds
3. Risk: None - Carlos gets exactly what other developers have
```

## User Policies vs Group Policies

You can attach policies at multiple levels:

```mermaid
graph TD
    User[IAM User] -->|Direct attachment| UserPolicy[User Policy]
    User -->|Group membership| Group[IAM Group]
    Group -->|Group attachment| GroupPolicy[Group Policy]

    UserPolicy -->|Evaluated| Final[Effective Permissions]
    GroupPolicy -->|Evaluated| Final

    style Final fill:#9f9
```

**Best practice:**
- Attach policies to GROUPS, not users
- Use user-level policies only for exceptions

### Example: Maya's Special S3 Access

Maya needs extra access to a specific bucket that other developers don't need:

```bash
# Group policy (all developers get this)
# Attached to Developers group

# User-specific policy (only Maya)
aws iam put-user-policy \
    --user-name maya \
    --policy-name MayaExtraS3Access \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::pettracker-frontend-assets",
                "arn:aws:s3:::pettracker-frontend-assets/*"
            ]
        }]
    }'
```

## Password Policies

Alex sets up a password policy for the account:

```bash
aws iam update-account-password-policy \
    --minimum-password-length 14 \
    --require-symbols \
    --require-numbers \
    --require-uppercase-characters \
    --require-lowercase-characters \
    --allow-users-to-change-password \
    --max-password-age 90 \
    --password-reuse-prevention 12 \
    --hard-expiry
```

**Password Policy Options:**

| Option | Recommended Value | Why |
|--------|------------------|-----|
| Minimum length | 14+ characters | Longer = stronger |
| Require symbols | Yes | More entropy |
| Require numbers | Yes | More entropy |
| Require uppercase | Yes | More entropy |
| Require lowercase | Yes | More entropy |
| Max age | 90 days | Balance security/usability |
| Reuse prevention | 12 | Prevent cycling passwords |
| Allow self-change | Yes | User autonomy |

## Managing Access Keys

### Access Key Best Practices

```mermaid
flowchart TD
    Create[Create Access Key] --> Use[Use for programmatic access]
    Use --> Rotate{90 days old?}
    Rotate -->|Yes| New[Create new key]
    New --> Test[Test new key works]
    Test --> Disable[Disable old key]
    Disable --> Wait[Wait 24-48 hours]
    Wait --> Delete[Delete old key]
    Rotate -->|No| Use
```

### Listing and Managing Keys

```bash
# List access keys for a user
aws iam list-access-keys --user-name maya

# Check when keys were last used
aws iam get-access-key-last-used --access-key-id AKIAEXAMPLE

# Deactivate a key (don't delete yet - might still be in use!)
aws iam update-access-key \
    --user-name maya \
    --access-key-id AKIAEXAMPLE \
    --status Inactive

# Delete a key (only after confirming nothing uses it)
aws iam delete-access-key \
    --user-name maya \
    --access-key-id AKIAEXAMPLE
```

### Alex's Key Rotation Script

```bash
#!/bin/bash
# rotate-keys.sh - Automated key rotation

USER=$1
OLD_KEY=$(aws iam list-access-keys --user-name $USER \
    --query 'AccessKeyMetadata[0].AccessKeyId' --output text)

echo "Current key: $OLD_KEY"

# Create new key
echo "Creating new access key..."
NEW_KEY=$(aws iam create-access-key --user-name $USER)

echo "New key created. Update your credentials, then run:"
echo "aws iam update-access-key --user-name $USER --access-key-id $OLD_KEY --status Inactive"
echo ""
echo "After 48 hours, delete old key:"
echo "aws iam delete-access-key --user-name $USER --access-key-id $OLD_KEY"
```

## Service Accounts: The CI/CD User

For the CI/CD pipeline, Alex creates a dedicated user:

```bash
# Create service account (no console access needed)
aws iam create-user --user-name cicd-pipeline

# Create access key
aws iam create-access-key --user-name cicd-pipeline

# Attach specific policy (not admin!)
aws iam attach-user-policy \
    --user-name cicd-pipeline \
    --policy-arn arn:aws:iam::123456789012:policy/CICDDeploymentPolicy
```

**Important:** Service accounts should:
- Have NO console access
- Have minimal required permissions
- Have keys rotated regularly
- Be audited frequently

## Listing and Auditing Users

```bash
# List all users
aws iam list-users --query 'Users[*].[UserName,CreateDate]' --output table

# Get detailed user info
aws iam get-user --user-name maya

# List user's groups
aws iam list-groups-for-user --user-name maya

# List user's attached policies
aws iam list-attached-user-policies --user-name maya

# List user's inline policies
aws iam list-user-policies --user-name maya

# Check MFA status
aws iam list-mfa-devices --user-name maya
```

### Audit Script

Jordan shares an audit script:

```bash
#!/bin/bash
# audit-users.sh - IAM User Audit

echo "=== IAM User Audit ==="
echo ""

for user in $(aws iam list-users --query 'Users[*].UserName' --output text); do
    echo "User: $user"

    # Check MFA
    mfa=$(aws iam list-mfa-devices --user-name $user --query 'MFADevices' --output text)
    if [ -z "$mfa" ]; then
        echo "  ⚠️  MFA: NOT ENABLED"
    else
        echo "  ✓ MFA: Enabled"
    fi

    # Check access keys
    keys=$(aws iam list-access-keys --user-name $user \
        --query 'AccessKeyMetadata[*].[AccessKeyId,CreateDate,Status]' --output text)
    echo "  Access Keys:"
    if [ -z "$keys" ]; then
        echo "    None"
    else
        echo "$keys" | while read keyid created status; do
            age=$(( ($(date +%s) - $(date -d "$created" +%s)) / 86400 ))
            if [ $age -gt 90 ]; then
                echo "    ⚠️  $keyid - $age days old ($status)"
            else
                echo "    ✓ $keyid - $age days old ($status)"
            fi
        done
    fi

    # Check groups
    groups=$(aws iam list-groups-for-user --user-name $user \
        --query 'Groups[*].GroupName' --output text)
    echo "  Groups: $groups"
    echo ""
done
```

## Exam Tips

**For DVA-C02:**

1. **Users** have long-term credentials (password + access keys)
2. **Groups** simplify permission management
3. **Attach policies to groups**, not individual users
4. Users can belong to **multiple groups**
5. Groups **cannot be nested**
6. Access keys should be **rotated regularly**
7. Service accounts need **minimal permissions**

**Common exam scenarios:**

> "New developer needs same access as existing developers..."
> → Add user to the same IAM Group

> "How to enforce strong passwords?"
> → Configure IAM Password Policy

> "Application needs programmatic access..."
> → Create IAM User with access keys (or better: use IAM Role)

## Key Takeaways

1. **Each person gets their own IAM user** - no sharing!
2. **Use groups** to manage permissions at scale
3. **Password policies** enforce security standards
4. **Access keys** need regular rotation (every 90 days)
5. **Service accounts** need minimal, specific permissions
6. **Audit regularly** - use scripts to check for issues

---

*Next: Alex dives into IAM Policies - the JSON documents that define what users can actually do.*

---
*v2.0*
