# Python SDK (Boto3) Deep Dive

## Alex Builds the First PetTracker Feature

Armed with SDK knowledge, Alex starts coding PetTracker's first real feature: uploading pet photos. But first, a proper development setup is needed.

## Setting Up Boto3

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install boto3
pip install boto3

# For type hints (optional but helpful)
pip install boto3-stubs[s3,dynamodb,lambda]
```

## Client vs Resource: The Two APIs

Boto3 provides two interfaces to AWS services:

### Client API (Low-Level)

```python
import boto3

# Client provides 1:1 mapping to AWS API operations
s3_client = boto3.client('s3')

# Responses are dictionaries
response = s3_client.list_buckets()
for bucket in response['Buckets']:
    print(bucket['Name'])  # Access via dictionary keys
```

### Resource API (High-Level)

```python
import boto3

# Resource provides object-oriented interface
s3_resource = boto3.resource('s3')

# Resources are objects with methods and attributes
for bucket in s3_resource.buckets.all():
    print(bucket.name)  # Access via attributes
```

### When to Use Each

| Use Client When | Use Resource When |
|-----------------|-------------------|
| Need all API features | Want cleaner, OOP code |
| Working with new services | Working with S3, EC2, DynamoDB |
| Need precise control | Want simpler iterations |
| Resource doesn't support it | Code readability matters |

**Note:** Not all services have Resource APIs. When in doubt, use Client.

## Alex's Photo Upload Feature

### The Requirements

1. Upload pet photos to S3
2. Generate thumbnails
3. Store metadata in DynamoDB
4. Return a signed URL for viewing

### Implementation

```python
# pettracker/services/photo_service.py
import boto3
import uuid
from datetime import datetime
from botocore.exceptions import ClientError

class PhotoService:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.dynamodb = boto3.resource('dynamodb')
        self.bucket_name = 'pettracker-images'
        self.table = self.dynamodb.Table('PetTracker-Photos')

    def upload_photo(self, pet_id: str, file_data: bytes, content_type: str) -> dict:
        """Upload a pet photo and store metadata."""
        photo_id = str(uuid.uuid4())
        key = f"photos/{pet_id}/{photo_id}.jpg"

        try:
            # Upload to S3
            self.s3.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=file_data,
                ContentType=content_type,
                Metadata={
                    'pet_id': pet_id,
                    'uploaded_at': datetime.utcnow().isoformat()
                }
            )

            # Store metadata in DynamoDB
            self.table.put_item(Item={
                'PhotoId': photo_id,
                'PetId': pet_id,
                'S3Key': key,
                'ContentType': content_type,
                'UploadedAt': datetime.utcnow().isoformat(),
                'Status': 'active'
            })

            # Generate signed URL for viewing
            url = self.get_signed_url(key)

            return {
                'photo_id': photo_id,
                'url': url,
                'status': 'uploaded'
            }

        except ClientError as e:
            raise PhotoUploadError(f"Failed to upload photo: {e}")

    def get_signed_url(self, key: str, expiration: int = 3600) -> str:
        """Generate a pre-signed URL for viewing a photo."""
        return self.s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket_name, 'Key': key},
            ExpiresIn=expiration
        )

    def get_pet_photos(self, pet_id: str) -> list:
        """Get all photos for a pet."""
        response = self.table.query(
            IndexName='PetId-index',
            KeyConditionExpression='PetId = :pid',
            ExpressionAttributeValues={':pid': pet_id}
        )
        return response.get('Items', [])
```

## Alex's First Bug: The Timeout

Alex tests the upload feature, but large photos fail:

```python
# ERROR: ReadTimeoutError: Read timed out after 60 seconds
```

**The Fix:** Configure timeouts properly

```python
from botocore.config import Config

config = Config(
    connect_timeout=5,      # Connection timeout
    read_timeout=300,       # Read timeout (5 minutes for large files)
    retries={
        'max_attempts': 3,
        'mode': 'adaptive'
    }
)

s3 = boto3.client('s3', config=config)
```

## Working with DynamoDB

Alex needs to store pet data:

```python
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
import json

class PetService:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('PetTracker-Pets')

    def create_pet(self, owner_id: str, pet_data: dict) -> dict:
        """Create a new pet record."""
        pet_id = str(uuid.uuid4())

        item = {
            'PetId': pet_id,
            'OwnerId': owner_id,
            'Name': pet_data['name'],
            'Type': pet_data['type'],  # dog, cat, etc.
            'Breed': pet_data.get('breed', 'Unknown'),
            'BirthDate': pet_data.get('birth_date'),
            'Weight': Decimal(str(pet_data.get('weight', 0))),  # DynamoDB needs Decimal
            'CreatedAt': datetime.utcnow().isoformat(),
            'Status': 'active'
        }

        self.table.put_item(Item=item)
        return item

    def get_pet(self, pet_id: str) -> dict:
        """Get a pet by ID."""
        response = self.table.get_item(Key={'PetId': pet_id})
        return response.get('Item')

    def get_owner_pets(self, owner_id: str) -> list:
        """Get all pets for an owner."""
        response = self.table.query(
            IndexName='OwnerId-index',
            KeyConditionExpression=Key('OwnerId').eq(owner_id),
            FilterExpression=Attr('Status').eq('active')
        )
        return response.get('Items', [])

    def update_pet(self, pet_id: str, updates: dict) -> dict:
        """Update pet attributes."""
        update_expr = 'SET '
        expr_values = {}
        expr_names = {}

        for key, value in updates.items():
            safe_key = f'#{key}'
            expr_names[safe_key] = key
            expr_values[f':{key}'] = value
            update_expr += f'{safe_key} = :{key}, '

        update_expr = update_expr.rstrip(', ')

        response = self.table.update_item(
            Key={'PetId': pet_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values,
            ReturnValues='ALL_NEW'
        )
        return response.get('Attributes')

    def delete_pet(self, pet_id: str) -> None:
        """Soft delete a pet."""
        self.update_pet(pet_id, {'Status': 'deleted'})
```

## Alex Learns About the Decimal Issue

Alex tries to store a pet's weight:

```python
pet_service.create_pet('owner-1', {
    'name': 'Buddy',
    'type': 'dog',
    'weight': 25.5  # This will FAIL!
})

# TypeError: Float types are not supported. Use Decimal types instead.
```

**The Problem:** DynamoDB doesn't accept Python floats.

**The Solution:** Use Decimal and a helper:

```python
from decimal import Decimal
import json

class DecimalEncoder(json.JSONEncoder):
    """Helper to convert Decimals back to floats for JSON."""
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

def convert_floats_to_decimal(obj):
    """Convert floats to Decimals for DynamoDB."""
    if isinstance(obj, float):
        return Decimal(str(obj))
    elif isinstance(obj, dict):
        return {k: convert_floats_to_decimal(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_floats_to_decimal(v) for v in obj]
    return obj

# Usage
pet_data = convert_floats_to_decimal({
    'name': 'Buddy',
    'weight': 25.5  # Will become Decimal('25.5')
})
```

## Pagination: Alex's Next Challenge

Alex's query returns only 100 pets for a popular user:

```python
# Problem: Only getting first page of results
def get_all_pets_wrong(self, owner_id: str) -> list:
    response = self.table.query(
        IndexName='OwnerId-index',
        KeyConditionExpression=Key('OwnerId').eq(owner_id)
    )
    return response.get('Items', [])  # Only first page!
```

**The Fix:** Handle pagination

```python
def get_all_pets(self, owner_id: str) -> list:
    """Get ALL pets with pagination handling."""
    items = []
    last_key = None

    while True:
        if last_key:
            response = self.table.query(
                IndexName='OwnerId-index',
                KeyConditionExpression=Key('OwnerId').eq(owner_id),
                ExclusiveStartKey=last_key
            )
        else:
            response = self.table.query(
                IndexName='OwnerId-index',
                KeyConditionExpression=Key('OwnerId').eq(owner_id)
            )

        items.extend(response.get('Items', []))

        last_key = response.get('LastEvaluatedKey')
        if not last_key:
            break

    return items

# Or use the paginator (cleaner)
def get_all_pets_paginator(self, owner_id: str) -> list:
    """Get all pets using paginator."""
    paginator = self.dynamodb.meta.client.get_paginator('query')

    items = []
    for page in paginator.paginate(
        TableName='PetTracker-Pets',
        IndexName='OwnerId-index',
        KeyConditionExpression='OwnerId = :oid',
        ExpressionAttributeValues={':oid': owner_id}
    ):
        items.extend(page.get('Items', []))

    return items
```

## Session Management

For better performance, Alex learns to reuse sessions:

```python
# Creating a session (reusable)
session = boto3.Session(
    region_name='us-east-1',
    profile_name='development'  # Optional: use specific profile
)

# Create clients from session (shares connection pool)
s3 = session.client('s3')
dynamodb = session.resource('dynamodb')

# For Lambda: create clients outside handler
# They persist across invocations (warm starts)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PetTracker-Pets')

def lambda_handler(event, context):
    # Reuse the table object
    response = table.get_item(Key={'PetId': event['pet_id']})
    return response.get('Item')
```

## Testing with Moto

Alex writes tests using moto (mock AWS):

```python
# pip install moto

import pytest
from moto import mock_s3, mock_dynamodb
import boto3

@mock_s3
def test_upload_photo():
    # Setup mock S3
    s3 = boto3.client('s3', region_name='us-east-1')
    s3.create_bucket(Bucket='pettracker-images')

    # Test your code
    from pettracker.services.photo_service import PhotoService
    service = PhotoService()

    result = service.upload_photo(
        pet_id='pet-123',
        file_data=b'fake image data',
        content_type='image/jpeg'
    )

    assert result['status'] == 'uploaded'
    assert 'url' in result

@mock_dynamodb
def test_create_pet():
    # Setup mock DynamoDB
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    dynamodb.create_table(
        TableName='PetTracker-Pets',
        KeySchema=[{'AttributeName': 'PetId', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'PetId', 'AttributeType': 'S'}],
        BillingMode='PAY_PER_REQUEST'
    )

    # Test your code
    from pettracker.services.pet_service import PetService
    service = PetService()

    result = service.create_pet('owner-1', {
        'name': 'Buddy',
        'type': 'dog'
    })

    assert result['Name'] == 'Buddy'
```

## Exam Tips

**For DVA-C02:**

1. Know the difference between Client and Resource APIs
2. Understand credential resolution (never hardcode!)
3. Know how to handle pagination
4. Understand DynamoDB's Decimal requirement
5. Know how to generate pre-signed URLs

**Common scenarios:**

> "How to upload a file to S3 with metadata?"
> → Use `put_object` with `Metadata` parameter

> "How to get all items from a DynamoDB query?"
> → Handle pagination with `LastEvaluatedKey` or use paginator

> "How to allow temporary access to an S3 object?"
> → Generate pre-signed URL

## Key Takeaways

1. **Client API** for full control, **Resource API** for cleaner code
2. **Handle pagination** - queries can return partial results
3. **Use Decimal** for DynamoDB numbers
4. **Configure timeouts** appropriately for your use case
5. **Reuse sessions and clients** for performance
6. **Test with moto** for unit testing

---

*Next: Alex discovers CloudShell and Cloud9 for browser-based development.*
