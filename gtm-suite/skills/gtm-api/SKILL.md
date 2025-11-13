---
name: gtm-api
description: Expert guidance for Google Tag Manager REST API v2 including authentication, programmatic container management, automation scripts, bulk operations, and GTM configuration backup/export. Use when automating GTM operations, managing multiple containers, building GTM tools, syncing configurations, exporting GTM data programmatically, working with Python or Node.js GTM automation, or using service account JSON credentials. Requires google-api-python-client and google-auth packages for Python implementations.
---

# GTM API Automation

## Overview

This skill provides comprehensive expertise for the Google Tag Manager REST API v2, enabling programmatic management of GTM containers, tags, triggers, variables, and configurations.

## When to Use This Skill

Invoke this skill when:
- Automating GTM container management
- Building tools for GTM configuration backup/restore
- Syncing tags across multiple containers
- Bulk creating or updating tags, triggers, variables
- Exporting GTM configuration to JSON
- Migrating containers between accounts
- Programmatically publishing GTM versions
- Building custom GTM management dashboards
- Implementing GTM configuration as code
- Integrating GTM with CI/CD pipelines

## GTM API Basics

### Authentication

Use OAuth 2.0 with service accounts (recommended for automation):

```python
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/tagmanager.edit.containers']
SERVICE_ACCOUNT_FILE = 'service-account-key.json'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = build('tagmanager', 'v2', credentials=credentials)
```

### API Resource Hierarchy

```
Account → Container → Workspace → Tags/Triggers/Variables
```

## Common Operations

**List Containers:**
```python
containers = service.accounts().containers().list(
    parent='accounts/123456'
).execute()
```

**Create Tag:**
```python
tag_body = {
    'name': 'GA4 Event',
    'type': 'gaawe',
    'parameter': [
        {'key': 'eventName', 'value': 'click', 'type': 'template'}
    ],
    'firingTriggerId': ['trigger_id']
}

service.accounts().containers().workspaces().tags().create(
    parent=workspace_path, body=tag_body
).execute()
```

**Publish Version:**
```python
version = service.accounts().containers().workspaces().create_version(
    path=workspace_path,
    body={'name': 'API Version', 'description': 'Auto-deployed'}
).execute()

service.accounts().containers().versions().publish(
    path=version['containerVersion']['path']
).execute()
```

## Automation Patterns

### Backup Container

```python
def backup_container(workspace_path, output_file):
    tags = service.accounts().containers().workspaces().tags().list(
        parent=workspace_path
    ).execute()

    triggers = service.accounts().containers().workspaces().triggers().list(
        parent=workspace_path
    ).execute()

    variables = service.accounts().containers().workspaces().variables().list(
        parent=workspace_path
    ).execute()

    with open(output_file, 'w') as f:
        json.dump({
            'tags': tags.get('tag', []),
            'triggers': triggers.get('trigger', []),
            'variables': variables.get('variable', [])
        }, f, indent=2)
```

### Bulk Operations

```python
def disable_all_tags(workspace_path):
    tags = service.accounts().containers().workspaces().tags().list(
        parent=workspace_path
    ).execute()

    for tag in tags.get('tag', []):
        tag['paused'] = True
        service.accounts().containers().workspaces().tags().update(
            path=tag['path'], body=tag
        ).execute()
```

## Error Handling

```python
from googleapiclient.errors import HttpError

try:
    tag = service.accounts().containers().workspaces().tags().create(
        parent=workspace_path, body=tag_body
    ).execute()
except HttpError as error:
    if error.resp.status == 404:
        print("Resource not found")
    elif error.resp.status == 403:
        print("Permission denied")
```

## Best Practices

- Use service accounts for automation
- Implement rate limiting
- Always backup before modifications
- Test in workspaces before publishing
- Log all operations
- Handle errors gracefully
- Version control your configs

## References

- **references/api-overview.md** - Complete API reference

## Integration with Other Skills

- **gtm-general** - Understanding GTM concepts and architecture
- **gtm-tags** - Understanding tag structure for API operations
- **gtm-triggers** - Understanding trigger structure for API operations
- **gtm-variables** - Understanding variable structure for API operations
- **gtm-datalayer** - Creating data layer variables via API
- **gtm-custom-templates** - Managing templates programmatically
- **gtm-setup** - Container setup concepts for API automation

## Quick Reference

**Install:** `pip install google-api-python-client google-auth-oauthlib`

**List:** `.list(parent=parent_path)`

**Get:** `.get(path=resource_path)`

**Create:** `.create(parent=parent_path, body=resource_body)`

**Update:** `.update(path=resource_path, body=resource_body)`

**Publish:** `.create_version()` then `.publish()`
