# Pre-signed URLs

## The Access Problem

Alex needs to let users download their pet photos, but the bucket is private. Options:

1. **Make bucket public** - NO! Security nightmare
2. **Proxy through server** - Works but costly and slow
3. **Pre-signed URLs** - Perfect! Temporary, secure access

```mermaid
sequenceDiagram
    participant User
    participant App as Your App
    participant S3

    User->>App: Request photo
    App->>App: Generate pre-signed URL
    App->>User: Return pre-signed URL
    User->>S3: Direct download using URL
    S3->>User: Photo data
```

## What is a Pre-signed URL?

A URL that grants temporary access to an S3 object:

```
https://pettracker-images-prod.s3.amazonaws.com/photos/pet-001.jpg
?X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE/20240115/us-east-1/s3/aws4_request
&X-Amz-Date=20240115T000000Z
&X-Amz-Expires=3600
&X-Amz-SignedHeaders=host
&X-Amz-Signature=abc123...
```

**Key characteristics:**
- Works with private objects
- Expires after specified time
- Inherits permissions of creator
- Anyone with URL can access (until expiry)

## Generating Pre-signed URLs

### For Downloads (GET)

```python
import boto3

s3 = boto3.client('s3')

# Generate URL for download
url = s3.generate_presigned_url(
    'get_object',
    Params={
        'Bucket': 'pettracker-images-prod',
        'Key': 'photos/pet-001.jpg'
    },
    ExpiresIn=3600  # 1 hour
)

print(url)
# https://pettracker-images-prod.s3.amazonaws.com/photos/pet-001.jpg?X-Amz-...
```

### For Uploads (PUT)

```python
# Generate URL for upload
url = s3.generate_presigned_url(
    'put_object',
    Params={
        'Bucket': 'pettracker-images-prod',
        'Key': 'photos/pet-002.jpg',
        'ContentType': 'image/jpeg'
    },
    ExpiresIn=300  # 5 minutes
)

# Client uploads directly to S3
import requests
with open('pet-photo.jpg', 'rb') as f:
    response = requests.put(
        url,
        data=f,
        headers={'Content-Type': 'image/jpeg'}
    )
```

### Using AWS CLI

```bash
# Generate pre-signed URL
aws s3 presign s3://pettracker-images-prod/photos/pet-001.jpg \
    --expires-in 3600

# Output:
# https://pettracker-images-prod.s3.amazonaws.com/photos/pet-001.jpg?X-Amz-...
```

## Pre-signed POST

For browser-based uploads with more control:

```python
import boto3

s3 = boto3.client('s3')

# Generate pre-signed POST
post = s3.generate_presigned_post(
    Bucket='pettracker-images-prod',
    Key='uploads/${filename}',  # Dynamic filename
    Fields={
        'acl': 'private',
        'Content-Type': 'image/jpeg'
    },
    Conditions=[
        {'acl': 'private'},
        {'Content-Type': 'image/jpeg'},
        ['content-length-range', 0, 10485760],  # Max 10MB
        ['starts-with', '$key', 'uploads/']
    ],
    ExpiresIn=300
)

print(post)
# {
#     'url': 'https://pettracker-images-prod.s3.amazonaws.com/',
#     'fields': {
#         'key': 'uploads/${filename}',
#         'acl': 'private',
#         'Content-Type': 'image/jpeg',
#         'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
#         'X-Amz-Credential': '...',
#         'X-Amz-Date': '...',
#         'Policy': '...',
#         'X-Amz-Signature': '...'
#     }
# }
```

### HTML Form for POST Upload

```html
<form action="https://pettracker-images-prod.s3.amazonaws.com/"
      method="post"
      enctype="multipart/form-data">
    <input type="hidden" name="key" value="uploads/${filename}">
    <input type="hidden" name="acl" value="private">
    <input type="hidden" name="Content-Type" value="image/jpeg">
    <input type="hidden" name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256">
    <input type="hidden" name="X-Amz-Credential" value="...">
    <input type="hidden" name="X-Amz-Date" value="...">
    <input type="hidden" name="Policy" value="...">
    <input type="hidden" name="X-Amz-Signature" value="...">

    <input type="file" name="file" accept="image/jpeg">
    <button type="submit">Upload</button>
</form>
```

## Alex's Upload Service

```python
# presigned_service.py
import boto3
from datetime import datetime
import uuid

class S3PresignedService:
    def __init__(self, bucket_name):
        self.s3 = boto3.client('s3')
        self.bucket = bucket_name

    def get_download_url(self, key, expires_in=3600):
        """Generate URL for downloading an object"""
        return self.s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket, 'Key': key},
            ExpiresIn=expires_in
        )

    def get_upload_url(self, user_id, filename, content_type, expires_in=300):
        """Generate URL for uploading an object"""
        # Create unique key
        date_path = datetime.now().strftime('%Y/%m/%d')
        unique_id = str(uuid.uuid4())[:8]
        ext = filename.split('.')[-1].lower()
        key = f"uploads/{user_id}/{date_path}/{unique_id}.{ext}"

        url = self.s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': self.bucket,
                'Key': key,
                'ContentType': content_type
            },
            ExpiresIn=expires_in
        )

        return {
            'upload_url': url,
            'key': key,
            'expires_in': expires_in
        }

    def get_upload_form(self, user_id, max_size_mb=10):
        """Generate pre-signed POST for form upload"""
        date_path = datetime.now().strftime('%Y/%m/%d')
        key_prefix = f"uploads/{user_id}/{date_path}/"

        return self.s3.generate_presigned_post(
            Bucket=self.bucket,
            Key=key_prefix + '${filename}',
            Fields={
                'acl': 'private'
            },
            Conditions=[
                {'acl': 'private'},
                ['content-length-range', 0, max_size_mb * 1024 * 1024],
                ['starts-with', '$Content-Type', 'image/'],
                ['starts-with', '$key', key_prefix]
            ],
            ExpiresIn=300
        )

# Usage
service = S3PresignedService('pettracker-images-prod')

# For direct PUT upload
result = service.get_upload_url(
    user_id='user-123',
    filename='my-pet.jpg',
    content_type='image/jpeg'
)
print(f"Upload to: {result['upload_url']}")

# For form-based upload
form_data = service.get_upload_form('user-123')
print(f"Form action: {form_data['url']}")
```

## API Integration

```python
# api.py - Flask example
from flask import Flask, jsonify, request
from presigned_service import S3PresignedService

app = Flask(__name__)
s3_service = S3PresignedService('pettracker-images-prod')

@app.route('/api/images/upload-url', methods=['POST'])
def get_upload_url():
    """Get a pre-signed URL for uploading"""
    user_id = request.headers.get('X-User-ID')  # From auth
    data = request.json

    result = s3_service.get_upload_url(
        user_id=user_id,
        filename=data['filename'],
        content_type=data['content_type']
    )

    return jsonify(result)

@app.route('/api/images/<key>/download-url', methods='GET')
def get_download_url(key):
    """Get a pre-signed URL for downloading"""
    # Verify user has access to this image...

    url = s3_service.get_download_url(key)
    return jsonify({'url': url})
```

## Frontend Integration

```javascript
// React component example
async function uploadImage(file) {
    // Step 1: Get pre-signed URL from backend
    const response = await fetch('/api/images/upload-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId
        },
        body: JSON.stringify({
            filename: file.name,
            content_type: file.type
        })
    });

    const { upload_url, key } = await response.json();

    // Step 2: Upload directly to S3
    await fetch(upload_url, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type
        },
        body: file
    });

    // Step 3: Return the key for storage
    return key;
}
```

## Pre-signed URL Limitations

```mermaid
graph TB
    subgraph "Limitations"
        Perm[Inherits creator's permissions<br/>If role expires, URL fails]
        Time[Max expiry varies<br/>IAM: 36 hours<br/>STS: token duration]
        Single[One operation per URL<br/>GET or PUT, not both]
    end
```

| Credential Type | Max Expiry |
|----------------|------------|
| IAM User | 7 days |
| IAM Role (EC2) | 36 hours |
| STS Temporary | Token duration |

## Security Considerations

```python
# Good practices
def get_secure_download_url(user_id, image_key):
    # Verify ownership
    if not user_owns_image(user_id, image_key):
        raise PermissionError("Not your image")

    # Short expiry for downloads
    return s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket, 'Key': image_key},
        ExpiresIn=300  # 5 minutes is usually enough
    )

def get_secure_upload_url(user_id, content_type):
    # Validate content type
    allowed_types = ['image/jpeg', 'image/png', 'image/webp']
    if content_type not in allowed_types:
        raise ValueError("Invalid content type")

    # Generate key server-side (not from client!)
    key = generate_safe_key(user_id)

    return s3.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': bucket,
            'Key': key,
            'ContentType': content_type
        },
        ExpiresIn=300
    )
```

## Exam Tips

**For DVA-C02:**

1. **Pre-signed URLs** inherit creator's permissions
2. **Expiry limits** depend on credential type
3. **PUT URLs** require Content-Type header to match
4. **POST** allows multiple conditions and form uploads
5. **URL works** for anyone until expiry

**Common scenarios:**

> "Allow temporary access to private object..."
> → Generate pre-signed GET URL

> "Let users upload directly to S3..."
> → Generate pre-signed PUT or POST URL

> "Pre-signed URL stopped working..."
> → Creator's credentials may have expired

## Key Takeaways

1. **Pre-signed URLs** grant temporary access
2. **GET URLs** for downloads, **PUT/POST** for uploads
3. **Expiry time** varies by credential type
4. **Validate on server** - don't trust client inputs
5. **Short expiry** is more secure
6. **Perfect for** direct client-to-S3 operations

---

*Next: Alex learns about versioning and lifecycle rules.*
