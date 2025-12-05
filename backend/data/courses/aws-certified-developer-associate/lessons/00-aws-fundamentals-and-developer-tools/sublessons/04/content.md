# AWS CLI Installation and Setup

## Alex's Console Fatigue

After a week of clicking through the AWS Console, Alex is frustrated:

- Creating an S3 bucket: 7 clicks, 3 pages
- Checking EC2 status: Navigate to EC2, find instance, click, scroll
- Deploying a Lambda: Upload zip, configure, test, repeat

"There must be a faster way," Alex thinks. "Real developers can't be clicking buttons all day!"

Then Alex discovers the **AWS Command Line Interface (CLI)**.

## What is the AWS CLI?

The AWS CLI is a unified tool to manage AWS services from your terminal:

```bash
# Instead of clicking through the console...
aws s3 mb s3://pettracker-images  # Create bucket in 1 command!

# Check EC2 instances
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'

# Deploy Lambda function
aws lambda update-function-code --function-name pettracker-api --zip-file fileb://function.zip
```

```mermaid
graph LR
    Dev[Developer] --> CLI[AWS CLI]
    CLI --> API[AWS APIs]
    API --> S3[(S3)]
    API --> EC2[EC2]
    API --> Lambda[Lambda]
    API --> More[200+ Services]
```

## Installing the AWS CLI

### On macOS

```bash
# Using Homebrew (recommended)
brew install awscli

# Or download the installer
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Verify installation
aws --version
# aws-cli/2.15.0 Python/3.11.6 Darwin/23.0.0
```

### On Linux

```bash
# Download and install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify
aws --version
```

### On Windows

```powershell
# Download MSI installer from AWS website
# Or use winget
winget install Amazon.AWSCLI

# Verify in PowerShell
aws --version
```

## Alex's First CLI Mistake

Excited, Alex runs a command immediately:

```bash
$ aws s3 ls

Unable to locate credentials. You can configure credentials by running "aws configure".
```

"Right," Alex realizes, "I need to tell AWS who I am!"

## Creating Access Keys

Before configuring the CLI, Alex needs access keys:

```mermaid
sequenceDiagram
    participant Alex
    participant Console as AWS Console
    participant IAM as IAM Service

    Alex->>Console: Navigate to IAM
    Console->>IAM: Open Users section
    Alex->>IAM: Select user
    Alex->>IAM: Security credentials tab
    Alex->>IAM: Create access key
    IAM->>Alex: Access Key ID + Secret Access Key
    Note over Alex: Save these securely!<br/>You won't see the secret again!
```

### Step-by-Step in Console

1. Go to IAM → Users → Your Username
2. Click "Security credentials" tab
3. Click "Create access key"
4. Choose "Command Line Interface (CLI)"
5. Download the CSV or copy the credentials

**Important:** The secret access key is shown only once!

### Alex's Security Mistake (Avoided!)

Alex almost created access keys for the root account. Bad idea!

```
❌ ROOT ACCOUNT ACCESS KEYS
- Full access to everything
- Can't be restricted
- Huge security risk

✓ IAM USER ACCESS KEYS
- Limited by IAM policies
- Can be rotated
- Auditable
```

## Configuring the AWS CLI

Now Alex can configure the CLI:

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

### What This Creates

```bash
# Two files are created:

# ~/.aws/credentials (stores your keys)
$ cat ~/.aws/credentials
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# ~/.aws/config (stores preferences)
$ cat ~/.aws/config
[default]
region = us-east-1
output = json
```

## Testing the Configuration

Alex tests if everything works:

```bash
# Who am I?
$ aws sts get-caller-identity
{
    "UserId": "AIDAEXAMPLEID",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/alex"
}

# List S3 buckets
$ aws s3 ls
2024-01-15 10:30:00 pettracker-images
2024-01-15 11:45:00 pettracker-logs

# It works!
```

## Output Formats

Alex experiments with different output formats:

### JSON (default)
```bash
$ aws ec2 describe-regions --output json
{
    "Regions": [
        {
            "RegionName": "us-east-1",
            "Endpoint": "ec2.us-east-1.amazonaws.com"
        }
    ]
}
```

### Table (human-readable)
```bash
$ aws ec2 describe-regions --output table
------------------------------------------
|            DescribeRegions             |
+----------------------------------------+
||              Regions                 ||
|+----------------+---------------------+|
||   RegionName   |      Endpoint       ||
|+----------------+---------------------+|
||   us-east-1    | ec2.us-east-1...    ||
|+----------------+---------------------+|
```

### Text (scriptable)
```bash
$ aws ec2 describe-regions --output text
REGIONS ec2.us-east-1.amazonaws.com us-east-1
REGIONS ec2.us-west-2.amazonaws.com us-west-2
```

### YAML
```bash
$ aws ec2 describe-regions --output yaml
Regions:
  - Endpoint: ec2.us-east-1.amazonaws.com
    RegionName: us-east-1
```

## CLI Configuration Hierarchy

Alex discovers that CLI settings can come from multiple places:

```mermaid
graph TD
    A[Command Line Options] -->|Highest Priority| Final[Final Value]
    B[Environment Variables] --> Final
    C[~/.aws/credentials] --> Final
    D[~/.aws/config] --> Final
    E[Container Credentials] --> Final
    F[Instance Profile] -->|Lowest Priority| Final
```

**Priority order:**
1. `--region us-west-2` (command line)
2. `AWS_DEFAULT_REGION=us-west-2` (environment)
3. `region = us-east-1` (config file)
4. EC2 instance metadata (on EC2)

## Environment Variables

Alex learns to use environment variables for flexibility:

```bash
# Set region for current session
export AWS_DEFAULT_REGION=us-west-2

# Override profile
export AWS_PROFILE=production

# Temporary credentials (useful in CI/CD)
export AWS_ACCESS_KEY_ID=AKIAEXAMPLE
export AWS_SECRET_ACCESS_KEY=secretkey
export AWS_SESSION_TOKEN=sessiontoken  # For temporary credentials

# Disable SSL verification (not recommended for production)
export AWS_CA_BUNDLE=/path/to/ca-bundle.crt
```

## Alex's Productivity Boost

After learning the CLI, Alex compares workflows:

### Creating an S3 Bucket

**Console:** ~2 minutes, 7 clicks
```
Navigate → S3 → Create bucket → Name → Region → Settings → Create
```

**CLI:** ~5 seconds
```bash
aws s3 mb s3://pettracker-uploads
```

### Checking Lambda Logs

**Console:** ~1 minute, navigate to CloudWatch, find log group, scroll
```
Navigate → Lambda → Function → Monitor → CloudWatch Logs → Stream
```

**CLI:** ~10 seconds
```bash
aws logs tail /aws/lambda/pettracker-api --follow
```

## Security Best Practices Alex Learned

```mermaid
graph TB
    subgraph "DO ✓"
        A[Use IAM user keys, not root]
        B[Rotate keys regularly]
        C[Use temporary credentials when possible]
        D[Store keys in ~/.aws/credentials]
    end

    subgraph "DON'T ✗"
        E[Commit keys to git]
        F[Share keys between team members]
        G[Use root account keys]
        H[Leave old keys active]
    end
```

### Git Ignore for AWS Credentials

```bash
# Add to .gitignore
.aws/
*.pem
*.key
credentials
```

## Exam Tips

**For the DVA-C02:**

1. Know the credentials file location: `~/.aws/credentials`
2. Know the config file location: `~/.aws/config`
3. Understand the credential resolution order
4. Environment variables override config files
5. On EC2, prefer instance profiles over access keys

**Common exam scenarios:**

> "Developer needs CLI access on their laptop..."
> → Run `aws configure` with IAM user access keys

> "Application on EC2 needs AWS access..."
> → Use instance profile (IAM role), not access keys

> "How to use different credentials for different environments?"
> → Use named profiles

## Hands-On Challenge

Try these commands:

```bash
# Verify your identity
aws sts get-caller-identity

# List your current region
aws configure get region

# Test S3 access
aws s3 ls

# Get help for any command
aws s3 help
aws ec2 describe-instances help
```

## Key Takeaways

1. **AWS CLI** is essential for efficient AWS development
2. Never use root account access keys
3. Store credentials in `~/.aws/credentials`
4. Use `aws configure` for initial setup
5. Environment variables override config files
6. Different output formats for different needs (json, table, text, yaml)

---

*Next: Alex learns about CLI profiles and how to manage multiple AWS accounts.*
