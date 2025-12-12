# The EB CLI

## Maya's Workflow

Alex watches Maya deploy:

```bash
$ cd pettracker-web
$ eb deploy
Creating application version archive "app-v48".
Uploading: [##################################################] 100% Done...
2024-01-15 14:30:15    INFO    Environment update is starting.
2024-01-15 14:30:45    INFO    Deploying new version to instances.
2024-01-15 14:31:30    INFO    New application version was deployed.

$ # Done! 75 seconds.
```

"That's it?" Alex asks. "No SSH, no manual steps?"

"That's the EB CLI magic," Maya smiles.

## Installing the EB CLI

```bash
# Using pip (recommended)
pip install awsebcli

# Using Homebrew (macOS)
brew install awsebcli

# Verify installation
eb --version
# EB CLI 3.20.x (Python 3.x)
```

## Initializing a Project

```bash
# Navigate to your project directory
cd pettracker-ml

# Initialize EB CLI
eb init

# Interactive prompts:
Select a default region
1) us-east-1 : US East (N. Virginia)
2) us-west-2 : US West (Oregon)
...
(default is 3): 1

Enter Application Name
(default is "pettracker-ml"): pettracker-ml

It appears you are using Python. Is this correct?
(Y/n): Y

Select a platform branch.
1) Python 3.9 running on 64bit Amazon Linux 2
2) Python 3.8 running on 64bit Amazon Linux 2
(default is 1): 1

Do you wish to continue with CodeCommit? (Y/n): n

Do you want to set up SSH for your instances?
(Y/n): Y

Select a keypair.
1) pettracker-key
2) [ Create new KeyPair ]
(default is 1): 1
```

### What eb init Creates

```bash
# Creates .elasticbeanstalk/config.yml
cat .elasticbeanstalk/config.yml

branch-defaults:
  main:
    environment: pettracker-ml-prod
global:
  application_name: pettracker-ml
  default_ec2_keyname: pettracker-key
  default_platform: Python 3.9 running on 64bit Amazon Linux 2
  default_region: us-east-1
  profile: default
```

## Essential EB CLI Commands

### Creating Environments

```bash
# Create environment with defaults
eb create pettracker-ml-staging

# Create with specific options
eb create pettracker-ml-prod \
    --instance-type c5.large \
    --scale 2 \
    --elb-type application \
    --vpc.id vpc-123456 \
    --vpc.elbsubnets subnet-public1,subnet-public2 \
    --vpc.ec2subnets subnet-private1,subnet-private2

# Create single-instance (no load balancer)
eb create pettracker-ml-dev --single
```

### Deploying

```bash
# Deploy to current environment
eb deploy

# Deploy to specific environment
eb deploy pettracker-ml-prod

# Deploy specific version
eb deploy --version v1.2.3

# Deploy with message
eb deploy --message "Fixed breed detection bug"

# Deploy with timeout
eb deploy --timeout 20  # 20 minutes
```

### Managing Environments

```bash
# List all environments
eb list
* pettracker-ml-prod
  pettracker-ml-staging

# Switch default environment
eb use pettracker-ml-staging

# Check status
eb status

# View environment info
eb status pettracker-ml-prod
Environment details for: pettracker-ml-prod
  Application name: pettracker-ml
  Region: us-east-1
  Deployed Version: v1.2.3
  Environment ID: e-abc123xyz
  Platform: 64bit Amazon Linux 2 v3.5.0 running Python 3.9
  CNAME: pettracker-ml-prod.us-east-1.elasticbeanstalk.com
  Health: Green
```

### Viewing Logs

```bash
# Get recent logs
eb logs

# Get all logs
eb logs --all

# Stream logs in real-time
eb logs --stream

# Get specific log file
eb logs --log-group /aws/elasticbeanstalk/pettracker-ml-prod/var/log/web.stdout.log
```

### SSH Access

```bash
# SSH into an instance
eb ssh

# SSH with specific key
eb ssh --keypairname pettracker-key

# Run command without interactive session
eb ssh --command "tail -100 /var/log/web.stdout.log"
```

### Health and Monitoring

```bash
# View environment health
eb health

# Watch health in real-time
eb health --refresh

# Sample output:
  instance-id     status     cause                        health
  i-abc123       Ok                                       Ok
  i-def456       Warning    High CPU                      Warning
  Overall        Warning    1 instance with warnings      Warning
```

### Configuration

```bash
# View current configuration
eb config

# Save configuration
eb config save pettracker-ml-prod --cfg prod-config

# Apply saved configuration
eb config --cfg prod-config

# Set environment variables
eb setenv MODEL_PATH=/var/app/current/model.h5 DEBUG=false

# Get environment variables
eb printenv
```

### Scaling

```bash
# Scale to specific instance count
eb scale 5

# Scale with options
eb scale 5 --timeout 10
```

### Opening in Browser

```bash
# Open environment URL
eb open

# Open specific environment
eb open pettracker-ml-staging
```

### Terminating

```bash
# Terminate environment (keeps application)
eb terminate pettracker-ml-dev

# Terminate without confirmation
eb terminate pettracker-ml-dev --force

# Terminate and delete application
eb terminate --all
```

## Alex's EB CLI Workflow

```bash
# Morning: Start work
cd pettracker-ml
eb status  # Check production health

# Development: Make changes
# ... edit code ...
git add .
git commit -m "Improve breed detection accuracy"

# Deploy to staging
eb use pettracker-ml-staging
eb deploy --message "Improve breed detection accuracy"

# Test staging
eb open
eb logs --stream  # Watch for errors

# Promote to production
eb use pettracker-ml-prod
eb deploy

# Monitor
eb health --refresh
```

## Advanced: eb deploy Options

```bash
# Deploy with specific deployment policy
eb deploy --staged  # Deploy staged changes only

# Deploy with version label
eb deploy --label v1.2.3

# Process for custom platform
eb deploy --process

# Wait for environment to be ready
eb deploy --timeout 30
```

## .ebignore File

Control what gets uploaded:

```bash
# .ebignore
# Similar to .gitignore, but for EB deployments

# Virtual environment
venv/
.venv/
__pycache__/

# IDE
.idea/
.vscode/
*.swp

# Tests
tests/
test_*.py

# Development files
*.md
Makefile
docker-compose.yml

# Large files not needed in deployment
docs/
*.log

# Sensitive files
.env
*.pem
```

## Saved Configurations

```bash
# Save current environment config
eb config save pettracker-ml-prod --cfg production-v1

# This creates .elasticbeanstalk/saved_configs/production-v1.cfg.yml

# List saved configs
ls .elasticbeanstalk/saved_configs/

# Apply to new environment
eb create pettracker-ml-staging --cfg production-v1

# Download from S3 (if someone else saved it)
eb config --cfg production-v1
```

### Sample Saved Configuration

```yaml
# .elasticbeanstalk/saved_configs/production-v1.cfg.yml
EnvironmentConfigurationMetadata:
  DateCreated: '1705329600000'
  DateModified: '1705329600000'
Platform:
  PlatformArn: arn:aws:elasticbeanstalk:us-east-1::platform/Python 3.9 running on 64bit Amazon Linux 2/3.5.0
OptionSettings:
  aws:autoscaling:asg:
    MaxSize: '10'
    MinSize: '2'
  aws:autoscaling:launchconfiguration:
    InstanceType: c5.large
  aws:elasticbeanstalk:environment:
    EnvironmentType: LoadBalanced
    LoadBalancerType: application
  aws:elasticbeanstalk:application:environment:
    MODEL_PATH: /var/app/current/model.h5
```

## EB CLI vs AWS CLI

| Task | EB CLI | AWS CLI |
|------|--------|---------|
| Deploy | `eb deploy` | Multiple commands |
| View logs | `eb logs` | `aws logs get-log-events` |
| SSH | `eb ssh` | Get IP, then ssh manually |
| Create env | `eb create` | Long JSON config |
| Health | `eb health` | API call + parsing |

**Use EB CLI** for day-to-day Beanstalk work.
**Use AWS CLI** for automation and scripting.

## Exam Tips

**For DVA-C02:**

1. **eb init** initializes project, doesn't create resources
2. **eb create** creates environment
3. **eb deploy** deploys to environment
4. **eb terminate** removes environment
5. **.ebignore** controls what's uploaded

**Common scenarios:**

> "Deploy application to Beanstalk..."
> → eb init, eb create, eb deploy

> "Check deployment logs for errors..."
> → eb logs --stream

> "Debug instance issues..."
> → eb ssh

## Key Takeaways

1. **EB CLI simplifies** Beanstalk operations dramatically
2. **eb init** sets up project configuration
3. **eb deploy** handles versioning, upload, and deployment
4. **eb logs** and **eb ssh** for troubleshooting
5. **Saved configurations** enable consistent environments
6. **.ebignore** controls deployment package contents

---

*Next: Alex learns about deployment strategies for zero-downtime updates.*

---
*v1.0*
