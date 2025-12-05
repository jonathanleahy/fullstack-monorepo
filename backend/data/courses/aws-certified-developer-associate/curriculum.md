# AWS Certified Developer Associate - Full Curriculum

## Course Description

This comprehensive course prepares you for the AWS Certified Developer Associate (DVA-C02) exam. You'll learn to develop, deploy, and debug cloud-based applications using AWS services, with hands-on experience across all major exam domains.

**Follow Alex's Journey:** Throughout this course, you'll follow Alex, a developer building "PetTracker" - a startup that helps pet owners track their pets' health, location, and activities. As Alex's startup grows from a simple idea to a production-ready application serving thousands of users, you'll learn exactly how and why each AWS service fits into real-world architecture decisions.

By the end of this course, you'll have the knowledge and practical skills to pass the certification exam and build production-ready applications on AWS.

---

## Chapter 0: AWS Fundamentals and Developer Tools

**Overview:** Get started with AWS fundamentals and the essential developer tools you'll use throughout your AWS journey.

**Alex's Story:** Alex has a great idea for PetTracker but has never used AWS before. In this chapter, Alex sets up their AWS account, learns to navigate the console, and configures their development environment.

**What You'll Learn:**
- Understand AWS global infrastructure and core concepts
- Set up and configure the AWS CLI and SDKs
- Navigate the AWS Management Console effectively

### Sub-chapters:

1. **AWS Global Infrastructure** - Regions, Availability Zones, and Edge Locations
2. **AWS CLI Deep Dive** - Installation, configuration, and common commands
3. **AWS SDKs** - Using SDKs in Python, Node.js, and Java
4. **CloudShell and Cloud9** - Browser-based development environments
5. **AWS Documentation and Support** - Finding help and best practices

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 1: IAM and Security Fundamentals

**Overview:** Master AWS Identity and Access Management - the foundation of security on AWS.

**Alex's Story:** Alex realizes they've been using their root account for everything (dangerous!). Time to set up proper IAM users, roles, and policies to secure PetTracker from day one.

**What You'll Learn:**
- Create and manage IAM users, groups, and roles
- Write effective IAM policies
- Implement security best practices

### Sub-chapters:

1. **IAM Fundamentals** - Users, groups, and the root account
2. **IAM Policies Deep Dive** - JSON policy structure and evaluation logic
3. **IAM Roles and Federation** - Cross-account access and identity federation
4. **Security Best Practices** - MFA, credential rotation, and least privilege
5. **AWS Security Services Overview** - KMS, Secrets Manager, and Parameter Store

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 2: EC2 Fundamentals

**Overview:** Learn the foundational compute service that powers millions of applications.

**Alex's Story:** PetTracker needs a server! Alex launches their first EC2 instance to host a simple API, learning about instance types, AMIs, and how to SSH into their server.

**What You'll Learn:**
- Launch and manage EC2 instances
- Understand instance types and pricing models
- Configure security groups and key pairs

### Sub-chapters:

1. **EC2 Core Concepts** - Instance types, AMIs, and launch configurations
2. **EC2 Networking** - Security groups, Elastic IPs, and ENIs
3. **EC2 Storage Options** - EBS volumes, instance store, and snapshots
4. **EC2 Pricing Models** - On-Demand, Reserved, Spot, and Savings Plans
5. **EC2 Advanced Features** - Placement groups, hibernation, and metadata

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 3: Elastic Beanstalk

**Overview:** Simplify deployment with AWS's Platform-as-a-Service offering.

**Alex's Story:** Manually configuring EC2 instances is tedious. Alex discovers Elastic Beanstalk and deploys PetTracker's web app with just a few clicks, including auto-scaling and load balancing.

**What You'll Learn:**
- Deploy applications using Elastic Beanstalk
- Configure environments and platforms
- Manage deployments and rollbacks

### Sub-chapters:

1. **Elastic Beanstalk Fundamentals** - Platforms, environments, and deployment
2. **Environment Configuration** - Environment variables, scaling, and load balancing
3. **Deployment Strategies** - All-at-once, rolling, and blue/green deployments
4. **Configuration Files** - .ebextensions and platform hooks
5. **Elastic Beanstalk CLI** - EB CLI commands and workflows

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 4: S3 Storage

**Overview:** Master object storage with Amazon S3 - the backbone of AWS storage.

**Alex's Story:** PetTracker users want to upload photos of their pets. Alex implements S3 for image storage, learning about buckets, permissions, and how to serve images efficiently.

**What You'll Learn:**
- Create and configure S3 buckets
- Implement S3 security and encryption
- Optimize storage costs with lifecycle policies

### Sub-chapters:

1. **S3 Fundamentals** - Buckets, objects, and storage classes
2. **S3 Security** - Bucket policies, ACLs, and access points
3. **S3 Versioning and Replication** - Version control and cross-region replication
4. **S3 Lifecycle Policies** - Automated transitions and expiration
5. **S3 Performance** - Transfer acceleration, multipart uploads, and byte-range fetches

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 5: CloudFront CDN

**Overview:** Deliver content globally with low latency using AWS's content delivery network.

**Alex's Story:** Users in Australia complain that pet images load slowly. Alex sets up CloudFront to cache content at edge locations worldwide, dramatically improving load times.

**What You'll Learn:**
- Set up CloudFront distributions
- Configure origins and cache behaviors
- Implement signed URLs and cookies

### Sub-chapters:

1. **CloudFront Fundamentals** - Distributions, origins, and edge locations
2. **Cache Behaviors** - Path patterns, TTLs, and cache policies
3. **CloudFront Security** - HTTPS, signed URLs, and OAI/OAC
4. **CloudFront with S3** - Static website hosting and private content
5. **CloudFront Optimization** - Compression, Lambda@Edge, and real-time logs

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 6: DynamoDB

**Overview:** Deep dive into AWS's fully managed NoSQL database service.

**Alex's Story:** PetTracker's relational database struggles with the schema flexibility needed for different pet types. Alex migrates to DynamoDB for its scalability and flexible data model.

**What You'll Learn:**
- Design effective DynamoDB tables
- Implement efficient queries and scans
- Optimize performance and cost

### Sub-chapters:

1. **DynamoDB Fundamentals** - Tables, items, and attributes
2. **Primary Keys and Indexes** - Partition keys, sort keys, GSIs, and LSIs
3. **Reading and Writing Data** - GetItem, PutItem, Query, Scan, and BatchOperations
4. **DynamoDB Streams and TTL** - Event-driven architectures and data expiration
5. **DynamoDB Advanced** - Transactions, DAX, and global tables

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 7: Lambda Fundamentals

**Overview:** Introduction to serverless computing with AWS Lambda.

**Alex's Story:** Alex is tired of managing EC2 instances. They refactor PetTracker's image processing to Lambda functions that run only when needed, slashing costs dramatically.

**What You'll Learn:**
- Create and deploy Lambda functions
- Understand the Lambda execution model
- Configure function settings and permissions

### Sub-chapters:

1. **Lambda Core Concepts** - Functions, handlers, and the execution environment
2. **Lambda Configuration** - Memory, timeout, and environment variables
3. **Lambda Permissions** - Execution roles and resource-based policies
4. **Lambda Packaging** - Deployment packages and container images
5. **Lambda Layers** - Sharing code and dependencies across functions

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 8: Lambda Advanced

**Overview:** Master advanced Lambda patterns and integrations.

**Alex's Story:** PetTracker's Lambda functions are working, but cold starts are affecting user experience. Alex learns optimization techniques and implements provisioned concurrency for critical paths.

**What You'll Learn:**
- Handle errors and implement retries
- Optimize cold starts and performance
- Implement Lambda destinations and DLQs

### Sub-chapters:

1. **Lambda Event Sources** - Synchronous, asynchronous, and polling invocations
2. **Lambda Error Handling** - Retries, DLQs, and destinations
3. **Lambda Performance** - Cold starts, provisioned concurrency, and SnapStart
4. **Lambda with VPC** - Accessing private resources securely
5. **Lambda Best Practices** - Idempotency, logging, and cost optimization

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 9: API Gateway

**Overview:** Build and manage APIs with Amazon API Gateway.

**Alex's Story:** PetTracker needs a proper REST API for mobile apps. Alex builds it with API Gateway, implementing authentication, rate limiting, and request validation.

**What You'll Learn:**
- Create REST and HTTP APIs
- Implement request/response transformations
- Configure authentication and throttling

### Sub-chapters:

1. **API Gateway Fundamentals** - REST APIs, resources, and methods
2. **API Gateway Integration** - Lambda proxy, HTTP proxy, and mock integrations
3. **API Gateway Security** - API keys, usage plans, and authorizers
4. **Request/Response Handling** - Mapping templates and models
5. **API Gateway Deployment** - Stages, canary releases, and versioning

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 10: Step Functions

**Overview:** Orchestrate complex workflows with AWS Step Functions.

**Alex's Story:** PetTracker's pet adoption process involves multiple steps: verification, background check, payment, and notification. Alex uses Step Functions to orchestrate this workflow reliably.

**What You'll Learn:**
- Design state machines for complex workflows
- Handle errors and retries
- Implement parallel and choice states

### Sub-chapters:

1. **Step Functions Fundamentals** - State machines and the Amazon States Language
2. **State Types** - Task, Choice, Parallel, Map, and Wait states
3. **Error Handling** - Catch, Retry, and fallback patterns
4. **Step Functions Integrations** - Direct AWS service integrations
5. **Step Functions Patterns** - Saga pattern, human approval, and long-running workflows

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 11: SQS and SNS

**Overview:** Implement messaging patterns with SQS and SNS.

**Alex's Story:** PetTracker's notification system is unreliable - sometimes emails are lost during traffic spikes. Alex implements SQS queues and SNS topics to decouple and reliably deliver notifications.

**What You'll Learn:**
- Implement message queuing with SQS
- Set up pub/sub messaging with SNS
- Design decoupled architectures

### Sub-chapters:

1. **SQS Fundamentals** - Standard and FIFO queues
2. **SQS Advanced** - Visibility timeout, DLQs, and long polling
3. **SNS Fundamentals** - Topics, subscriptions, and message filtering
4. **SNS Advanced** - Fan-out patterns and mobile push notifications
5. **SQS and SNS Patterns** - Decoupling patterns and message processing

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 12: Kinesis

**Overview:** Stream and process real-time data with Amazon Kinesis.

**Alex's Story:** PetTracker adds GPS collars for real-time pet tracking. Alex uses Kinesis to ingest thousands of location updates per second and process them in real-time.

**What You'll Learn:**
- Stream data with Kinesis Data Streams
- Deliver data with Kinesis Data Firehose
- Process streaming data in real-time

### Sub-chapters:

1. **Kinesis Data Streams** - Shards, producers, and consumers
2. **Kinesis Client Library** - Checkpointing and parallel processing
3. **Kinesis Data Firehose** - Delivery streams and transformations
4. **Kinesis Data Analytics** - SQL queries on streaming data
5. **Kinesis vs SQS** - When to use each service

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 13: EventBridge

**Overview:** Build event-driven architectures with Amazon EventBridge.

**Alex's Story:** PetTracker's services need to communicate without tight coupling. Alex implements EventBridge to route events between services, enabling features like "notify me when my pet leaves the safe zone."

**What You'll Learn:**
- Create event buses and rules
- Design event-driven architectures
- Integrate with SaaS applications

### Sub-chapters:

1. **EventBridge Fundamentals** - Event buses, rules, and targets
2. **Event Patterns** - Matching and filtering events
3. **EventBridge Schema Registry** - Schema discovery and code generation
4. **EventBridge Scheduler** - Scheduled and recurring tasks
5. **EventBridge Pipes** - Point-to-point integrations

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 14: Containers (ECS, ECR, EKS)

**Overview:** Deploy and manage containerized applications on AWS.

**Alex's Story:** PetTracker's ML model for pet breed identification is too complex for Lambda. Alex containerizes it and deploys to ECS with Fargate for serverless container management.

**What You'll Learn:**
- Store container images in ECR
- Deploy containers with ECS and Fargate
- Understand Kubernetes on AWS with EKS

### Sub-chapters:

1. **Container Fundamentals** - Docker basics and container concepts
2. **ECR** - Container registry, image management, and security scanning
3. **ECS Fundamentals** - Task definitions, services, and clusters
4. **ECS with Fargate** - Serverless container deployment
5. **EKS Overview** - Kubernetes on AWS and when to use it

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 15: Cognito and Application Security

**Overview:** Implement authentication and authorization with Amazon Cognito.

**Alex's Story:** PetTracker needs user authentication for both the web app and mobile apps. Alex implements Cognito for sign-up, sign-in, and social login, plus fine-grained access control.

**What You'll Learn:**
- Create user pools for authentication
- Configure identity pools for AWS access
- Implement OAuth 2.0 and social login

### Sub-chapters:

1. **Cognito User Pools** - User directory and authentication
2. **Cognito Identity Pools** - Federated identities and AWS credentials
3. **Cognito Security** - MFA, password policies, and custom auth flows
4. **Cognito with API Gateway** - JWT authorizers and access control
5. **Cognito Advanced** - Custom triggers, hosted UI, and migration

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 16: CloudFormation and SAM

**Overview:** Infrastructure as Code with CloudFormation and the Serverless Application Model.

**Alex's Story:** Alex's team is growing, and manually setting up AWS resources for each developer is unsustainable. They adopt CloudFormation and SAM to define PetTracker's infrastructure as code.

**What You'll Learn:**
- Write CloudFormation templates
- Deploy serverless apps with SAM
- Manage stacks and change sets

### Sub-chapters:

1. **CloudFormation Fundamentals** - Templates, stacks, and resources
2. **CloudFormation Features** - Parameters, mappings, and conditions
3. **CloudFormation Functions** - Intrinsic functions and references
4. **SAM Fundamentals** - Serverless application model basics
5. **SAM Advanced** - Local testing, deployment pipelines, and layers

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 17: ElastiCache and RDS

**Overview:** Database caching and relational database services on AWS.

**Alex's Story:** PetTracker's DynamoDB queries are fast, but the pet feed algorithm hits the database repeatedly with the same queries. Alex adds ElastiCache to cache results and explores RDS for analytics.

**What You'll Learn:**
- Implement caching with ElastiCache
- Choose between Redis and Memcached
- Understand RDS and Aurora basics

### Sub-chapters:

1. **ElastiCache Fundamentals** - Redis vs Memcached
2. **ElastiCache Patterns** - Caching strategies and session management
3. **RDS Fundamentals** - Database engines, instances, and Multi-AZ
4. **RDS Security** - Encryption, IAM authentication, and VPC
5. **Aurora Overview** - Aurora MySQL, PostgreSQL, and Serverless

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 18: CloudWatch and X-Ray

**Overview:** Monitor and observe your applications with CloudWatch and X-Ray.

**Alex's Story:** PetTracker is live, but Alex has no visibility into what's happening. They implement CloudWatch for metrics and alarms, and X-Ray to trace requests through the distributed system.

**What You'll Learn:**
- Collect metrics and create dashboards
- Set up alarms and notifications
- Trace distributed applications

### Sub-chapters:

1. **CloudWatch Metrics** - Standard metrics, custom metrics, and dimensions
2. **CloudWatch Logs** - Log groups, streams, and insights
3. **CloudWatch Alarms** - Thresholds, actions, and composite alarms
4. **X-Ray Fundamentals** - Tracing, segments, and service maps
5. **X-Ray Advanced** - Annotations, sampling rules, and insights

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 19: CI/CD Pipeline

**Overview:** Implement continuous integration and delivery pipelines on AWS.

**Alex's Story:** PetTracker's deployment process is manual and error-prone. Alex builds a complete CI/CD pipeline that automatically tests, builds, and deploys code to production safely.

**What You'll Learn:**
- Set up CI/CD with CodePipeline, CodeBuild, and CodeDeploy
- Implement deployment strategies
- Automate testing and quality gates

### Sub-chapters:

1. **CodeCommit** - Git repositories on AWS
2. **CodeBuild** - Build automation and buildspec files
3. **CodeDeploy** - Deployment strategies and appspec files
4. **CodePipeline** - Orchestrating the complete pipeline
5. **CodeArtifact and CodeGuru** - Package management and code reviews

**Chapter Quiz:** 5 questions testing comprehension

---

## Chapter 20: Exam Preparation and Best Practices

**Overview:** Final preparation for the AWS Certified Developer Associate exam.

**Alex's Story:** PetTracker is thriving, and Alex reflects on the journey from a simple idea to a production-ready AWS application. Now it's time to validate that knowledge with the certification.

**What You'll Learn:**
- Review all exam domains
- Apply developer best practices
- Take practice exams with confidence

### Sub-chapters:

1. **Exam Overview** - Format, domains, and scoring
2. **Domain Review: Development** - Key services and concepts
3. **Domain Review: Security and Deployment** - IAM, CI/CD, and infrastructure
4. **Domain Review: Troubleshooting** - Debugging and optimization
5. **Practice Questions and Strategies** - Tips for exam day

**Chapter Quiz:** 10 questions (comprehensive final review)

---

## What You'll Build with Alex

Throughout this course, you'll see PetTracker evolve:

| Chapter | PetTracker Feature | AWS Services Used |
|---------|-------------------|-------------------|
| 0-1 | Project setup, security foundations | IAM, CLI, SDK |
| 2-3 | First deployment | EC2, Elastic Beanstalk |
| 4-5 | Pet photo uploads | S3, CloudFront |
| 6 | Flexible pet data | DynamoDB |
| 7-8 | Image processing | Lambda |
| 9-10 | Mobile API, adoption workflow | API Gateway, Step Functions |
| 11-13 | Notifications, GPS tracking, events | SQS, SNS, Kinesis, EventBridge |
| 14 | ML breed identification | ECS, Fargate |
| 15 | User authentication | Cognito |
| 16 | Infrastructure as code | CloudFormation, SAM |
| 17 | Performance caching | ElastiCache |
| 18 | Monitoring and tracing | CloudWatch, X-Ray |
| 19 | Automated deployments | CodePipeline, CodeBuild, CodeDeploy |
| 20 | Certification ready! | All services |

## Certificate of Completion

Upon completing all 20 chapters and passing all quizzes, you'll receive a certificate of completion. Combined with adequate practice, you'll be ready to take and pass the AWS Certified Developer Associate exam.

---

**Total Course Content:**
- 20 Chapters
- 240 Sub-chapters (12 per chapter)
- 20 Chapter Quizzes
- 60-70 Hours of Content
- 500+ Practice Questions
- Lifetime Access

---

## Content Structure Specification

### Chapter Structure

Each chapter follows a consistent structure:

```
lessons/
└── {chapter-number}-{chapter-slug}/
    ├── content.md           # Chapter introduction and overview
    ├── lesson.json          # Chapter metadata with sublesson definitions
    ├── quiz.json            # Chapter quiz questions (10 questions)
    └── sublessons/
        ├── 00/content.md    # Alex's Challenge (story intro)
        ├── 01/content.md    # Technical lesson 1
        ├── 02/content.md    # Technical lesson 2
        ├── ...
        ├── 10/content.md    # Technical lesson 10
        └── 11/content.md    # Alex's Solution (chapter summary)
```

### lesson.json Specification

Each chapter's `lesson.json` MUST include sublesson metadata with titles:

```json
{
  "id": "{chapter-number}-{chapter-slug}",
  "title": "Chapter Title",
  "slug": "chapter-slug",
  "description": "Chapter description...",
  "order": {chapter-number},
  "estimatedMinutes": 180-240,
  "objectives": ["objective 1", "objective 2", ...],
  "keywords": ["keyword1", "keyword2", ...],
  "sublessons": [
    {
      "id": "00-alexs-challenge",
      "title": "Alex's Challenge: {Problem Description}",
      "order": 0
    },
    {
      "id": "01-{topic-slug}",
      "title": "{Topic Title}",
      "order": 1
    },
    ...
    {
      "id": "11-chapter-summary",
      "title": "Alex's Solution: {Solution Description}",
      "order": 11
    }
  ]
}
```

### Sublesson Title Requirements

1. **Sublesson 00**: Always "Alex's Challenge: {Problem}" - introduces the chapter problem
2. **Sublessons 01-10**: Technical topic titles - clear, concise, descriptive
3. **Sublesson 11**: Always "Alex's Solution: {Solution}" - summarizes the chapter

### Content Requirements

Each sublesson content.md should include:

1. **H1 Title** matching the sublesson title from lesson.json
2. **Story Context** - How this relates to Alex and PetTracker
3. **Technical Content** - Concepts, code examples, diagrams
4. **Mermaid Diagrams** - Visual architecture and flow diagrams
5. **Code Examples** - Working AWS CLI, SDK, or config examples
6. **Exam Tips** - DVA-C02 exam-relevant highlights
7. **Key Takeaways** - Summary points

### Quiz Specification

**Quizzes are defined at the chapter level only**, not at the sublesson level. Each chapter's `quiz.json` contains 10 questions that test comprehension across all 12 sublessons of that chapter.

**Quiz Structure:**
- **Location**: `lessons/{chapter}/quiz.json` (chapter level only)
- **Sublessons do NOT have quizzes** - they contain teaching content
- **Chapter quiz tests all sublesson content** from that chapter
- **Random question selection**: The UI can select a random subset for each attempt

```json
{
  "questions": [
    {
      "id": "{chapter-slug}-q{n}",
      "type": "multiple_choice",
      "question": "Question text...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why this answer is correct...",
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

**Quiz Design Guidelines:**
- 10 questions per chapter covering content from sublessons 00-11
- Mix of difficulty: 3 easy, 5 medium, 2 hard
- Each question should reference specific concepts from the chapter
- Explanations should reinforce learning and reference the sublesson topic
- Questions should be DVA-C02 exam-style (scenario-based)

### Character Cast

The course features recurring characters:

- **Alex** - Protagonist, junior developer building PetTracker
- **Sam** - DevOps mentor, guides Alex on infrastructure
- **Jordan** - Security consultant, advises on security best practices
- **Maya** - Frontend developer, collaborates on user-facing features
- **Marcus** - SRE, helps with monitoring and reliability
- **Elena** - CTO, provides architectural guidance
- **Finance Team** - Challenges cost decisions
