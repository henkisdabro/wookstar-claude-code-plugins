# GTM API Overview

**Sources**:
- https://developers.google.com/tag-platform/tag-manager/api/v2
- https://developers.google.com/tag-platform/tag-manager/api/v2/devguide

**Last Updated**: 2025-01-09

## Overview

The Google Tag Manager API provides programmatic access to Google Tag Manager configuration data for authorized users. With this API, you can automate common tag management tasks, including creating containers, managing tags, triggers, variables, and publishing container versions.

## Why Use the GTM API

**Benefits:**
- **Automation**: Automate repetitive tasks like creating similar tags across containers
- **Scalability**: Manage multiple containers programmatically
- **Integration**: Integrate GTM with your existing workflows and tools
- **Version Control**: Implement custom version control and deployment workflows
- **Bulk Operations**: Create, update, or delete resources in bulk

**Common Use Cases:**
- Deploying standard tag configurations across multiple containers
- Implementing custom approval workflows
- Syncing GTM configurations with external systems
- Creating automated testing for tag configurations
- Building custom GTM management interfaces

## API Capabilities

The GTM API allows you to manage:

- **Accounts**: Access and list GTM accounts
- **Containers**: Create, read, update containers
- **Workspaces**: Manage draft configurations
- **Tags**: Create and configure tags programmatically
- **Triggers**: Set up firing conditions
- **Variables**: Define data sources
- **Folders**: Organize container elements
- **Built-in Variables**: Enable/disable built-in variables
- **Versions**: Create, publish, and manage versions
- **Environments**: Configure staging environments
- **User Permissions**: Manage account and container access

## Authentication

The GTM API uses **OAuth 2.0** for authentication and authorization.

### OAuth 2.0 Scopes

Choose the appropriate scope based on your needs:

```
https://www.googleapis.com/auth/tagmanager.readonly
Read-only access to all GTM data

https://www.googleapis.com/auth/tagmanager.edit.containers
Edit access to container configurations

https://www.googleapis.com/auth/tagmanager.delete.containers
Permission to delete containers

https://www.googleapis.com/auth/tagmanager.edit.containerversions
Create and modify container versions

https://www.googleapis.com/auth/tagmanager.publish
Publish container versions

https://www.googleapis.com/auth/tagmanager.manage.users
Manage user permissions

https://www.googleapis.com/auth/tagmanager.manage.accounts
Full account access
```

### Setup Steps

1. **Create a Project** in Google Cloud Console
2. **Enable the GTM API** for your project
3. **Create OAuth 2.0 Credentials**:
   - For web apps: OAuth 2.0 Client ID
   - For server apps: Service Account
4. **Download credentials** JSON file
5. **Implement OAuth flow** in your application

### Python Example

```python
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Define scopes
scopes = ['https://www.googleapis.com/auth/tagmanager.edit.containers']

# Create service
service = build('tagmanager', 'v2', credentials=credentials)
```

### JavaScript Example

```javascript
const CLIENT_ID = 'YOUR_CLIENT_ID';
const SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.edit.containers'
];

gapi.client.load('tagmanager', 'v2', () => {
  // API loaded
});
```

## API Resources and Hierarchy

GTM API follows a hierarchical structure:

```
Account (accounts/123456)
  └─ Container (accounts/123456/containers/7890)
      └─ Workspace (accounts/123456/containers/7890/workspaces/1)
          ├─ Tags
          ├─ Triggers
          ├─ Variables
          └─ Folders
      └─ Versions
      └─ Environments
```

## Common Operations

### List Containers

```python
# Python
account_path = 'accounts/123456'
containers = service.accounts().containers().list(
    parent=account_path
).execute()

for container in containers.get('container', []):
    print(f"Container: {container['name']} ({container['containerId']})")
```

```javascript
// JavaScript
const request = gapi.client.tagmanager.accounts.containers.list({
  parent: 'accounts/123456'
});

request.execute((response) => {
  response.container.forEach((container) => {
    console.log(`Container: ${container.name} (${container.containerId})`);
  });
});
```

### Create a Workspace

```python
# Python
container_path = 'accounts/123456/containers/7890'
workspace = service.accounts().containers().workspaces().create(
    parent=container_path,
    body={'name': 'API Workspace', 'description': 'Created via API'}
).execute()
```

### Create a Tag

```python
# Python
workspace_path = 'accounts/123456/containers/7890/workspaces/1'

ga4_tag = {
    'name': 'GA4 Config Tag',
    'type': 'gaawe',  # GA4 Configuration tag type
    'parameter': [
        {'key': 'measurementId', 'type': 'template', 'value': 'G-XXXXXXXXXX'}
    ]
}

tag = service.accounts().containers().workspaces().tags().create(
    parent=workspace_path,
    body=ga4_tag
).execute()
```

### Create a Trigger

```python
# Python
pageview_trigger = {
    'name': 'All Pages',
    'type': 'PAGEVIEW'
}

trigger = service.accounts().containers().workspaces().triggers().create(
    parent=workspace_path,
    body=pageview_trigger
).execute()
```

### Link Tag to Trigger

```python
# Python
tag_path = 'accounts/123456/containers/7890/workspaces/1/tags/5'

# Get existing tag
tag = service.accounts().containers().workspaces().tags().get(
    path=tag_path
).execute()

# Add trigger ID
tag['firingTriggerId'] = [trigger['triggerId']]

# Update tag
updated_tag = service.accounts().containers().workspaces().tags().update(
    path=tag_path,
    body=tag
).execute()
```

### Create and Publish Version

```python
# Python
workspace_path = 'accounts/123456/containers/7890/workspaces/1'

# Create version
version = service.accounts().containers().workspaces().create_version(
    path=workspace_path,
    body={'name': 'Version 1', 'notes': 'Initial setup'}
).execute()

# Publish version
published = service.accounts().containers().versions().publish(
    path=version['containerVersion']['path']
).execute()
```

## API Patterns

### Pagination

Some list operations return paginated results:

```python
# Python
def list_all_tags(service, workspace_path):
    tags = []
    page_token = None

    while True:
        response = service.accounts().containers().workspaces().tags().list(
            parent=workspace_path,
            pageToken=page_token
        ).execute()

        tags.extend(response.get('tag', []))
        page_token = response.get('nextPageToken')

        if not page_token:
            break

    return tags
```

### Error Handling

```python
# Python
from googleapiclient.errors import HttpError

try:
    tag = service.accounts().containers().workspaces().tags().create(
        parent=workspace_path,
        body=tag_data
    ).execute()
except HttpError as error:
    if error.resp.status == 409:
        print("Tag already exists")
    elif error.resp.status == 403:
        print("Permission denied")
    else:
        print(f"An error occurred: {error}")
```

### Rate Limiting

The API has the following quotas (default):
- **Queries per day**: 1,000 (can be increased)
- **Queries per 100 seconds**: 100

Implement retry logic with exponential backoff:

```python
# Python
import time
from googleapiclient.errors import HttpError

def api_call_with_retry(func, max_retries=5):
    for attempt in range(max_retries):
        try:
            return func()
        except HttpError as error:
            if error.resp.status == 429:  # Rate limit exceeded
                wait_time = 2 ** attempt  # Exponential backoff
                time.sleep(wait_time)
            else:
                raise

    raise Exception("Max retries exceeded")
```

## Resource Paths

All API operations use resource paths:

```
Account:    accounts/{account_id}
Container:  accounts/{account_id}/containers/{container_id}
Workspace:  accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}
Tag:        accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}/tags/{tag_id}
```

Use paths from API responses rather than constructing them manually when possible.

## Best Practices

### 1. Use Workspaces

Always work within a workspace:
- Create a new workspace for API changes
- Make changes in the workspace
- Create and publish a version when ready
- Don't modify the default workspace

### 2. Test Before Production

```python
# Create test workspace
test_workspace = service.accounts().containers().workspaces().create(
    parent=container_path,
    body={'name': 'API Test', 'description': 'Testing API changes'}
).execute()

# Make changes
# Test thoroughly
# Create version if satisfied
# Delete workspace if not needed
```

### 3. Version Everything

Always create versions with meaningful notes:

```python
version = service.accounts().containers().workspaces().create_version(
    path=workspace_path,
    body={
        'name': 'Release 2.3.0',
        'notes': 'Added GA4 ecommerce tracking\n- Purchase event\n- Product views\n- Add to cart'
    }
).execute()
```

### 4. Handle Permissions

Check user permissions before operations:

```python
try:
    containers = service.accounts().containers().list(
        parent='accounts/123456'
    ).execute()
except HttpError as error:
    if error.resp.status == 403:
        print("User lacks permission to access this account")
```

### 5. Use Batch Requests

For multiple operations, use batch requests:

```python
from googleapiclient.http import BatchHttpRequest

def callback(request_id, response, exception):
    if exception:
        print(f"Error: {exception}")
    else:
        print(f"Created: {response['name']}")

batch = service.new_batch_http_request(callback=callback)

for tag_data in tags_to_create:
    batch.add(service.accounts().containers().workspaces().tags().create(
        parent=workspace_path,
        body=tag_data
    ))

batch.execute()
```

## Example: Complete Workflow

```python
# 1. List accounts
accounts = service.accounts().list().execute()
account_path = accounts['account'][0]['path']

# 2. Find container
containers = service.accounts().containers().list(parent=account_path).execute()
container = next(c for c in containers['container'] if c['name'] == 'My Site')
container_path = container['path']

# 3. Create workspace
workspace = service.accounts().containers().workspaces().create(
    parent=container_path,
    body={'name': 'API Changes', 'description': 'Automated setup'}
).execute()
workspace_path = workspace['path']

# 4. Create trigger
trigger = service.accounts().containers().workspaces().triggers().create(
    parent=workspace_path,
    body={'name': 'All Pages', 'type': 'PAGEVIEW'}
).execute()

# 5. Create tag
tag = service.accounts().containers().workspaces().tags().create(
    parent=workspace_path,
    body={
        'name': 'GA4 Config',
        'type': 'gaawe',
        'parameter': [{'key': 'measurementId', 'type': 'template', 'value': 'G-XXXXXX'}],
        'firingTriggerId': [trigger['triggerId']]
    }
).execute()

# 6. Create and publish version
version = service.accounts().containers().workspaces().create_version(
    path=workspace_path,
    body={'name': 'API Setup', 'notes': 'Automated GA4 configuration'}
).execute()

published = service.accounts().containers().versions().publish(
    path=version['containerVersion']['path']
).execute()

print(f"Published version: {published['containerVersion']['containerVersionId']}")
```

## Limitations

- **No direct data layer access**: API manages configuration, not runtime data
- **No real-time testing**: Use Preview mode in GTM UI for testing
- **Version publishing is final**: Cannot unpublish, only publish new versions
- **Rate limits apply**: Be mindful of quota limits
- **Some features unavailable**: Certain GTM features may not be available via API

## Resources

- [GTM API Reference](https://developers.google.com/tag-platform/tag-manager/api/v2/reference)
- [GTM API Developer Guide](https://developers.google.com/tag-platform/tag-manager/api/v2/devguide)
- [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Python Client Library](https://github.com/googleapis/google-api-python-client)
- [JavaScript Client Library](https://github.com/google/google-api-javascript-client)
- [Tag Dictionary Reference](https://developers.google.com/tag-platform/tag-manager/api/v2/tag-dictionary-reference)
- [Variable Dictionary Reference](https://developers.google.com/tag-platform/tag-manager/api/v2/variable-dictionary-reference)
