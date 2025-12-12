# The Problem in Detail: Manual Event Integration Hell

## What the Main Page Introduced

The main page explained the fundamental difference: **with SQS, publishers decide where messages go; with EventBridge, consumers decide what they want.** It also showed that without EventBridge, you end up managing multiple integration patterns - S3 triggers, DynamoDB Streams, API Gateway webhooks - each forcing the publisher to know about every consumer.

Now let's see the REAL code and experience what this "publisher owns the routing" pain looks like at 2 AM.

## Going Deeper

In this sub-chapter, we'll explore:
1. **Complete infrastructure code** for each integration type
2. **A real debugging scenario** - tracing an event through 5 services
3. **The cost of late filtering** - Lambda invocations that do nothing
4. **Adding a new subscriber** - the deployment dance
5. **The monitoring nightmare** - where to look when things break

---

## The Full Infrastructure: What You're Actually Managing

### Integration 1: S3 → Lambda

**CloudFormation (or CDK):**

```yaml
Resources:
  PhotoBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: pettracker-photos
      NotificationConfiguration:
        LambdaConfigurations:
          - Event: s3:ObjectCreated:*
            Function: !GetAtt ProcessPhotoFunction.Arn
            Filter:
              S3Key:
                Rules:
                  - Name: prefix
                    Value: uploads/
                  - Name: suffix
                    Value: .jpg

  ProcessPhotoFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: process-photo
      Runtime: python3.11
      Handler: index.handler
      Code:
        ZipFile: |
          def handler(event, context):
              # Even with S3 filters, we still get events we don't want
              for record in event['Records']:
                  key = record['s3']['object']['key']
                  size = record['s3']['object']['size']

                  # S3 can't filter by size - we do it here
                  if size < 10000:  # Skip files under 10KB
                      print(f"Skipping small file: {key}")
                      return

                  # S3 can't filter by content type - we do it here
                  if 'thumbnail' in key:
                      print(f"Skipping thumbnail: {key}")
                      return

                  # NOW we can actually process
                  process_photo(key)

  LambdaInvokePermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref ProcessPhotoFunction
      Action: lambda:InvokeFunction
      Principal: s3.amazonaws.com
      SourceArn: !GetAtt PhotoBucket.Arn
```

**The pain points:**
- S3 filters only support prefix/suffix, not size or content type
- Lambda runs for EVERY matching event, then filters in code
- Permission management between S3 and Lambda is brittle

### Integration 2: DynamoDB Streams → Lambda

```yaml
Resources:
  PetsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: pets
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES
      # ... other properties

  ProcessStreamFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: process-pet-changes
      Runtime: python3.11
      Handler: index.handler
      Code:
        ZipFile: |
          def handler(event, context):
              for record in event['Records']:
                  event_name = record['eventName']  # INSERT, MODIFY, REMOVE

                  # We only care about INSERTS, but we get everything
                  if event_name != 'INSERT':
                      return

                  new_image = record['dynamodb']['NewImage']
                  # DynamoDB format is weird - need to unwrap
                  pet_id = new_image['petId']['S']
                  user_id = new_image['userId']['S']

                  # Now process...

  StreamEventSourceMapping:
    Type: AWS::Lambda::EventSourceMapping
    Properties:
      EventSourceArn: !GetAtt PetsTable.StreamArn
      FunctionName: !Ref ProcessStreamFunction
      StartingPosition: TRIM_HORIZON
      BatchSize: 100
      MaximumBatchingWindowInSeconds: 5
      FilterCriteria:  # Added in 2022, but limited
        Filters:
          - Pattern: '{"eventName": ["INSERT"]}'
```

**The pain points:**
- Different configuration format than S3
- DynamoDB record format requires transformation
- FilterCriteria exists but is limited compared to EventBridge
- Stream records expire after 24 hours - can't replay

### Integration 3: Stripe Webhooks → API Gateway → Lambda

```yaml
Resources:
  WebhookApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: stripe-webhook-api

  WebhookResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref WebhookApi
      ParentId: !GetAtt WebhookApi.RootResourceId
      PathPart: stripe

  WebhookMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref WebhookApi
      ResourceId: !Ref WebhookResource
      HttpMethod: POST
      AuthorizationType: NONE
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${StripeWebhookFunction.Arn}/invocations

  StripeWebhookFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: handle-stripe-webhook
      Runtime: python3.11
      Handler: index.handler
      Environment:
        Variables:
          STRIPE_WEBHOOK_SECRET: !Ref StripeSecretParameter
      Code:
        ZipFile: |
          import stripe
          import os
          import json

          def handler(event, context):
              # Stripe signature verification
              payload = event['body']
              sig_header = event['headers'].get('Stripe-Signature')
              webhook_secret = os.environ['STRIPE_WEBHOOK_SECRET']

              try:
                  stripe_event = stripe.Webhook.construct_event(
                      payload, sig_header, webhook_secret
                  )
              except ValueError:
                  return {'statusCode': 400, 'body': 'Invalid payload'}
              except stripe.error.SignatureVerificationError:
                  return {'statusCode': 400, 'body': 'Invalid signature'}

              # Handle the event
              if stripe_event['type'] == 'payment_intent.succeeded':
                  payment_intent = stripe_event['data']['object']
                  handle_successful_payment(payment_intent)
              elif stripe_event['type'] == 'customer.subscription.deleted':
                  subscription = stripe_event['data']['object']
                  handle_subscription_cancelled(subscription)
              # ... 20 more event types

              return {'statusCode': 200, 'body': 'Success'}
```

**The pain points:**
- Full API Gateway setup for each third-party service
- Custom signature verification per service
- Lambda handles ALL webhook types, filters in code
- Different error handling, retries, authentication per service

---

## The 2 AM Debugging Session: A True Story

Alex's phone buzzed at 2:47 AM. PagerDuty alert: "Subscription status not updating."

The Stripe dashboard showed payments going through. But PetTracker showed users as "unpaid."

**Step 1: Check API Gateway logs**

```
POST /stripe 200 42ms
POST /stripe 200 38ms
POST /stripe 200 45ms
```

Webhook Lambda is responding 200. That's good... or is it?

**Step 2: Check Stripe Webhook Lambda logs**

```
START RequestId: abc-123
Event type: payment_intent.succeeded
Processing payment for user: user-456
Writing to DynamoDB...
END RequestId: abc-123 Duration: 127ms
```

Lambda processed it. Wrote to DynamoDB. So far so good.

**Step 3: Check DynamoDB Streams Lambda logs**

```
START RequestId: def-456
Records received: 1
Event type: MODIFY
Skipping - not an INSERT
END RequestId: def-456 Duration: 15ms
```

Wait. It's a MODIFY, not INSERT. The payment Lambda is *updating* an existing record, not creating one. The Streams Lambda only processes INSERTs.

**Step 4: But wait, who's the consumer?**

Alex digs deeper. The Streams Lambda publishes to SNS:

```
START RequestId: ghi-789
Publishing to SNS topic: subscription-updates
END RequestId: ghi-789 Duration: 89ms
```

**Step 5: Check SNS topic**

The SNS topic has three subscribers:
- SQS queue for billing
- Lambda for email notifications
- HTTP endpoint for analytics (third-party)

**Step 6: Check the SQS queue**

```bash
aws sqs get-queue-attributes \
  --queue-url https://sqs.../subscription-updates \
  --attribute-names ApproximateNumberOfMessages
```

Queue has 5,000 messages. Consumer isn't running?

**Step 7: Check the billing Lambda**

```
Error: AccessDenied - User is not authorized to perform sqs:ReceiveMessage
```

Someone changed IAM permissions two weeks ago. The Lambda hasn't been able to read from the queue since then. Messages piled up. Silent failure.

**The path:** Stripe → API Gateway → Lambda → DynamoDB → Streams → Lambda → SNS → SQS → Lambda (broken)

**Five hops. Three hours to diagnose. The fix: one IAM policy change.**

---

## The Cost of Late Filtering

Let's do the math on filtering in Lambda code vs. filtering before invocation.

**Scenario:** S3 bucket receives 100,000 uploads per day. Only 10% are photos needing processing.

**Without pre-filtering:**
- 100,000 Lambda invocations
- Each invocation: ~100ms to check and reject
- Cost: 100,000 × 128MB × 100ms = $0.21/day = **$76.65/year**
- Plus: polluted metrics, noisy logs

**With EventBridge filtering:**
- 10,000 Lambda invocations (only matching events)
- Each invocation: actual processing
- Cost: 10,000 × 128MB × 500ms = **$0.10/day** = **$36.50/year**
- Plus: clean metrics, focused logs

That's **52% savings** just by filtering before invocation. And the real cost isn't dollars - it's the cognitive overhead of noisy dashboards and logs filled with no-ops.

---

## Adding a New Subscriber: The Deployment Dance

Marketing wants real-time analytics on user signups. Here's what that looks like without EventBridge:

**Step 1:** Find where signup events are published

"Where do signup events go?"
"Uh... let me check. The signup Lambda writes to DynamoDB, then there's a Stream that triggers another Lambda that... actually I'm not sure where they end up."

**Step 2:** Modify the publisher

```python
# signup_lambda.py
def handler(event, context):
    create_user(event)

    # ADD: Publish to SNS for marketing
    sns.publish(
        TopicArn='arn:aws:sns:...:user-events',
        Message=json.dumps(event),
        MessageAttributes={
            'event_type': {'DataType': 'String', 'StringValue': 'signup'}
        }
    )
```

**Step 3:** Create infrastructure for the new consumer

```yaml
MarketingQueue:
  Type: AWS::SQS::Queue
  Properties:
    QueueName: marketing-signups

MarketingSubscription:
  Type: AWS::SNS::Subscription
  Properties:
    TopicArn: !Ref UserEventsTopic
    Protocol: sqs
    Endpoint: !GetAtt MarketingQueue.Arn
    FilterPolicy:
      event_type: [signup]
```

**Step 4:** Deploy everything

- Deploy the modified Lambda
- Deploy the new SQS queue
- Deploy the SNS subscription
- Deploy the marketing team's consumer Lambda
- Hope nothing breaks in between

**Step 5:** Test and pray

Production traffic starts flowing. Does it work? Check logs. Check metrics. Cross fingers.

**Time to add one subscriber:** 2-4 hours of work, plus deployment risk.

---

## The Monitoring Nightmare

When events flow through multiple services, where do you look?

```mermaid
graph LR
    A[S3] --> B[Lambda 1]
    B --> C[DynamoDB]
    C --> D[Streams]
    D --> E[Lambda 2]
    E --> F[SNS]
    F --> G[SQS]
    G --> H[Lambda 3]

    style A fill:#ff9
    style B fill:#9f9
    style C fill:#99f
    style D fill:#f9f
    style E fill:#9f9
    style F fill:#f99
    style G fill:#9ff
    style H fill:#9f9
```

**Dashboards you need:**
1. S3 request metrics
2. Lambda 1 metrics + logs
3. DynamoDB write capacity
4. DynamoDB Streams iterator age
5. Lambda 2 metrics + logs
6. SNS delivery metrics
7. SQS queue depth + age
8. Lambda 3 metrics + logs

**Eight different places** to check when something goes wrong. No unified view of "what events are flowing and where are they going."

---

## Did You Know?

**Did you know?** DynamoDB Streams have a 24-hour retention period. If your consumer falls behind, old events disappear forever. There's no replay.

**Here's something interesting:** SNS message filtering (FilterPolicy) was added in 2018, but it only supports simple attribute matching - not the nested JSON patterns that EventBridge provides.

**One more thing:** API Gateway has a 29-second timeout. If your webhook handler takes longer (complex processing, downstream timeouts), you'll return 504 to the caller - and Stripe will retry, causing duplicates.

---

## Exam Tips

**Key points for DVA-C02:**

1. **DynamoDB Streams vs EventBridge**: Streams are for change data capture; EventBridge is for event routing
2. **S3 event notifications**: Limited filtering (prefix/suffix only)
3. **API Gateway timeout**: 29 seconds max - use async patterns for long processing

**Common exam patterns:**

> "A company needs to process events from multiple sources with different filtering requirements..."
> → EventBridge unifies sources with consistent pattern matching

> "DynamoDB Stream consumer is falling behind..."
> → Increase Lambda concurrency, or use EventBridge Pipes with batching

---

## Key Takeaways

- **Multiple integration patterns** = multiple debugging paths, multiple configs to learn
- **Late filtering** = wasted Lambda invocations and noisy metrics
- **Adding subscribers** requires publisher changes, deployments, coordination
- **Debugging** means checking 5+ different services and log groups
- **The real cost** isn't money - it's complexity and time

---

*Next: **EventBridge Architecture** - Now that you've felt the pain, let's see how EventBridge solves each of these problems at an architectural level.*


---
*v1.0*
