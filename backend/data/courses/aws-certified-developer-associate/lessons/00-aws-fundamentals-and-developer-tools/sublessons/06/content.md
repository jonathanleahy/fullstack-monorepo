# Essential AWS CLI Commands

## Alex Meets Sam: The DevOps Mentor

Alex is struggling with the CLI when a colleague walks by. **Sam**, a senior DevOps engineer with 8 years of AWS experience, notices the frustration.

"You look like I did in 2016," Sam laughs. "Want me to show you the commands that'll save your life?"

Alex grabs a notebook. This is going to be good.

## Sam's Essential CLI Commands

### "The Big Four" - Commands You'll Use Daily

```bash
# 1. Who am I?
aws sts get-caller-identity

# 2. What's in my S3?
aws s3 ls

# 3. What's running in EC2?
aws ec2 describe-instances

# 4. What Lambda functions do I have?
aws lambda list-functions
```

"Memorize these," Sam says. "You'll type them a hundred times."

## S3 Commands: The Most Used

```bash
# List buckets
aws s3 ls

# List contents of a bucket
aws s3 ls s3://pettracker-images/

# List with details
aws s3 ls s3://pettracker-images/ --recursive --human-readable

# Copy file to S3
aws s3 cp photo.jpg s3://pettracker-images/photos/

# Copy from S3 to local
aws s3 cp s3://pettracker-images/photos/photo.jpg ./

# Sync directories (like rsync)
aws s3 sync ./uploads s3://pettracker-images/uploads/

# Sync with delete (careful!)
aws s3 sync ./uploads s3://pettracker-images/uploads/ --delete

# Create bucket
aws s3 mb s3://pettracker-new-bucket

# Delete empty bucket
aws s3 rb s3://pettracker-old-bucket

# Delete bucket and contents (DANGEROUS)
aws s3 rb s3://pettracker-old-bucket --force
```

### Alex's First Cost Scare

"Let me tell you about my $400 mistake," Sam says, leaning back.

"I ran `aws s3 sync` on a 50GB folder without checking first. Problem was, I'd set up S3 Transfer Acceleration and a CloudFront invalidation trigger. The sync ran, triggered millions of invalidations, and I got a bill for $400 the next day."

Alex's eyes widen.

"Always do a dry-run first," Sam advises:

```bash
# Preview what will happen (doesn't actually copy)
aws s3 sync ./uploads s3://pettracker-images/ --dryrun

# Output:
# (dryrun) upload: uploads/file1.jpg to s3://pettracker-images/file1.jpg
# (dryrun) upload: uploads/file2.jpg to s3://pettracker-images/file2.jpg
# ...50 files to upload

# Now you know what will happen before doing it!
```

## EC2 Commands

```bash
# List all instances
aws ec2 describe-instances

# List running instances only
aws ec2 describe-instances \
    --filters "Name=instance-state-name,Values=running"

# Get specific fields (using --query)
aws ec2 describe-instances \
    --query 'Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]' \
    --output table

# Start an instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0

# Stop an instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate (DELETE) an instance
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

### Sam's Query Tips

"The `--query` parameter is JMESPath syntax. Learn it and you'll feel like a wizard."

```bash
# Get just instance IDs
aws ec2 describe-instances \
    --query 'Reservations[*].Instances[*].InstanceId' \
    --output text

# Filter and format in one command
aws ec2 describe-instances \
    --filters "Name=tag:Environment,Values=production" \
    --query 'Reservations[*].Instances[*].[InstanceId,PrivateIpAddress,Tags[?Key==`Name`].Value|[0]]' \
    --output table

# Output:
# ------------------------------------------------
# |              DescribeInstances              |
# +---------------------+---------------+--------+
# |  i-abc123           |  10.0.1.45   | web-01 |
# |  i-def456           |  10.0.1.46   | web-02 |
# +---------------------+---------------+--------+
```

## Lambda Commands

```bash
# List functions
aws lambda list-functions

# Get function details
aws lambda get-function --function-name pettracker-api

# Invoke a function
aws lambda invoke \
    --function-name pettracker-api \
    --payload '{"action": "test"}' \
    response.json

# View the response
cat response.json

# Update function code
aws lambda update-function-code \
    --function-name pettracker-api \
    --zip-file fileb://function.zip

# View logs (last 5 minutes)
aws logs tail /aws/lambda/pettracker-api --since 5m

# Follow logs in real-time
aws logs tail /aws/lambda/pettracker-api --follow
```

## DynamoDB Commands

```bash
# List tables
aws dynamodb list-tables

# Describe a table
aws dynamodb describe-table --table-name PetTracker-Pets

# Put an item
aws dynamodb put-item \
    --table-name PetTracker-Pets \
    --item '{"PetId": {"S": "pet-001"}, "Name": {"S": "Buddy"}, "Type": {"S": "Dog"}}'

# Get an item
aws dynamodb get-item \
    --table-name PetTracker-Pets \
    --key '{"PetId": {"S": "pet-001"}}'

# Query items
aws dynamodb query \
    --table-name PetTracker-Pets \
    --key-condition-expression "PetId = :id" \
    --expression-attribute-values '{":id": {"S": "pet-001"}}'

# Scan all items (use carefully - reads entire table!)
aws dynamodb scan --table-name PetTracker-Pets
```

## CloudWatch Logs Commands

```bash
# List log groups
aws logs describe-log-groups

# Get log streams
aws logs describe-log-streams \
    --log-group-name /aws/lambda/pettracker-api

# Get log events
aws logs get-log-events \
    --log-group-name /aws/lambda/pettracker-api \
    --log-stream-name '2024/01/15/[$LATEST]abc123'

# The modern way: logs tail (much easier!)
aws logs tail /aws/lambda/pettracker-api --since 1h
aws logs tail /aws/lambda/pettracker-api --follow
```

## IAM Commands

```bash
# List users
aws iam list-users

# List roles
aws iam list-roles

# Get current user's policies
aws iam list-attached-user-policies --user-name alex

# Get role policies
aws iam list-attached-role-policies --role-name pettracker-lambda-role

# Simulate policy (check if action is allowed)
aws iam simulate-principal-policy \
    --policy-source-arn arn:aws:iam::123456789012:user/alex \
    --action-names s3:GetObject \
    --resource-arns arn:aws:s3:::pettracker-images/*
```

## The Power of JMESPath Queries

Sam shows Alex some advanced queries:

```bash
# Get all security groups with open SSH (0.0.0.0/0 on port 22)
aws ec2 describe-security-groups \
    --query 'SecurityGroups[?IpPermissions[?FromPort==`22` && IpRanges[?CidrIp==`0.0.0.0/0`]]].[GroupId,GroupName]' \
    --output table

# Find all Lambda functions larger than 10MB
aws lambda list-functions \
    --query 'Functions[?CodeSize>`10485760`].[FunctionName,CodeSize]' \
    --output table

# Get all unencrypted S3 buckets
aws s3api list-buckets --query 'Buckets[*].Name' --output text | \
    xargs -I {} aws s3api get-bucket-encryption --bucket {} 2>&1 | \
    grep -B1 "ServerSideEncryptionConfigurationNotFoundError"
```

## Creating Aliases

"I'm lazy," Sam admits. "So I create aliases for everything."

```bash
# Add to ~/.bashrc or ~/.zshrc

# Identity check
alias aws-whoami='aws sts get-caller-identity'

# Quick S3 listing
alias s3ls='aws s3 ls'

# EC2 running instances
alias ec2ls='aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" --query "Reservations[*].Instances[*].[InstanceId,InstanceType,PublicIpAddress,Tags[?Key==\`Name\`].Value|[0]]" --output table'

# Lambda functions
alias lambdals='aws lambda list-functions --query "Functions[*].[FunctionName,Runtime,MemorySize]" --output table'

# Follow Lambda logs
lambdalogs() {
    aws logs tail "/aws/lambda/$1" --follow
}

# Usage: lambdalogs pettracker-api
```

## Handling Large Outputs: Pagination

"Some commands return a LOT of data," Sam warns.

```bash
# This might return thousands of objects
aws s3api list-objects-v2 --bucket pettracker-images

# Use pagination
aws s3api list-objects-v2 --bucket pettracker-images --max-items 100

# Get next page with token
aws s3api list-objects-v2 --bucket pettracker-images \
    --starting-token eyJDb250aW51YXRpb25Ub2tlbiI6...

# Or let CLI handle it automatically
aws s3api list-objects-v2 --bucket pettracker-images --no-paginate
```

## Error Handling in Scripts

```bash
#!/bin/bash
# Good practice: check for errors

# Set strict mode
set -euo pipefail

# Function to check AWS credentials
check_aws() {
    if ! aws sts get-caller-identity &>/dev/null; then
        echo "ERROR: AWS credentials not configured"
        exit 1
    fi
}

# Function with error handling
deploy_lambda() {
    local function_name=$1
    local zip_file=$2

    echo "Deploying $function_name..."

    if aws lambda update-function-code \
        --function-name "$function_name" \
        --zip-file "fileb://$zip_file" \
        --output text \
        --query 'FunctionArn'; then
        echo "✓ Deployment successful"
    else
        echo "✗ Deployment failed"
        return 1
    fi
}

# Main
check_aws
deploy_lambda "pettracker-api" "function.zip"
```

## Exam Tips

**For DVA-C02:**

1. Know basic S3 CLI commands (`cp`, `sync`, `ls`, `mb`, `rb`)
2. Understand `--query` parameter for filtering output
3. Know how to invoke Lambda functions via CLI
4. Understand pagination for large result sets
5. Know common troubleshooting commands

**Exam scenarios:**

> "How to copy files from local to S3 preserving directory structure?"
> → `aws s3 sync ./local-folder s3://bucket/prefix/`

> "How to test a Lambda function from the command line?"
> → `aws lambda invoke --function-name name --payload '{}' output.json`

## Hands-On Challenge

Try these commands in your account:

```bash
# 1. Check your identity
aws sts get-caller-identity

# 2. List your S3 buckets
aws s3 ls

# 3. Create a test bucket (use unique name)
aws s3 mb s3://your-unique-test-bucket-name

# 4. Upload a file
echo "test" > test.txt
aws s3 cp test.txt s3://your-unique-test-bucket-name/

# 5. Verify upload
aws s3 ls s3://your-unique-test-bucket-name/

# 6. Clean up
aws s3 rb s3://your-unique-test-bucket-name --force
```

## Key Takeaways

1. **Master the basics**: `s3`, `ec2`, `lambda`, and `sts` commands
2. **Use `--query`** to filter output with JMESPath
3. **Always `--dryrun`** before destructive operations
4. **Create aliases** for frequently used commands
5. **Handle pagination** for large datasets
6. **Use `aws logs tail --follow`** for real-time debugging

---

*Next: Alex explores the AWS SDKs and learns to integrate AWS into application code.*

---
*v2.0*
