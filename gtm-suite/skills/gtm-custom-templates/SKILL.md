---
name: gtm-custom-templates
description: Expert guidance for building Google Tag Manager custom templates using sandboxed JavaScript. Use when creating custom tag templates, custom variable templates, server-side client templates, converting regular JavaScript to sandboxed JS, debugging template code, writing template tests, publishing to the Community Template Gallery, working with .tpl template files, or using sandboxed JavaScript APIs like require(), sendPixel, injectScript, and other GTM template APIs.
---

# GTM Custom Templates Builder

## Overview

This skill provides comprehensive expertise for building Google Tag Manager custom templates using sandboxed JavaScript. Master template structure, sandboxed JavaScript APIs, permissions, testing, and publishing to the Community Template Gallery.

## When to Use This Skill

Invoke this skill when:
- Building a custom tag template for a third-party service
- Creating a custom variable template for complex data manipulation
- Developing server-side client templates
- Converting regular JavaScript to sandboxed JavaScript
- Debugging sandboxed JavaScript API errors
- Understanding template permissions and security
- Writing tests for custom templates
- Publishing templates to the Community Template Gallery
- Troubleshooting "undefined is not a function" errors in templates
- Implementing HTTP requests, pixel firing, or script injection in templates

## Sandboxed JavaScript Fundamentals

### What is Sandboxed JavaScript?

Sandboxed JavaScript is a restricted subset of JavaScript used in GTM custom templates. It provides security by limiting what code can execute while offering safe APIs for common operations.

**Key Differences from Regular JavaScript:**
- No direct DOM access
- No window/document object
- No eval() or Function()
- No arbitrary HTTP requests
- Must use require() to import APIs
- All operations require explicit permissions

### Basic Template Structure

```javascript
// Import required APIs
const sendPixel = require('sendPixel');
const logToConsole = require('logToConsole');
const encodeUriComponent = require('encodeUriComponent');

// Access template configuration
const endpoint = data.endpoint;
const eventName = data.eventName;

// Execute template logic
const url = endpoint + '?event=' + encodeUriComponent(eventName);
sendPixel(url, data.gtmOnSuccess, data.gtmOnFailure);
```

## Building Tag Templates

### Tag Template Workflow

1. **Define Template Info**
   - Template type (TAG)
   - Display name and description
   - Categories and branding
   - Container contexts (WEB, SERVER, etc.)

2. **Configure Template Parameters**
   - Add fields for user configuration
   - Set field types (TEXT, SELECT, CHECKBOX, etc.)
   - Define validation rules
   - Set default values

3. **Write Sandboxed JavaScript Code**
   - Require necessary APIs
   - Access data from template fields
   - Implement tag logic
   - Call gtmOnSuccess/gtmOnFailure

4. **Set Permissions**
   - Configure required permissions
   - Specify allowed URLs, cookies, etc.
   - Minimize permission scope

5. **Write Tests**
   - Test successful execution
   - Test error handling
   - Test edge cases

### Common Tag Template Patterns

**Simple Pixel Tag:**
```javascript
const sendPixel = require('sendPixel');
const encodeUriComponent = require('encodeUriComponent');

const pixelUrl = data.pixelUrl +
  '?id=' + encodeUriComponent(data.pixelId) +
  '&event=' + encodeUriComponent(data.eventName);

sendPixel(pixelUrl, data.gtmOnSuccess, data.gtmOnFailure);
```

**HTTP Request Tag:**
```javascript
const sendHttpRequest = require('sendHttpRequest');
const JSON = require('JSON');

const postBody = JSON.stringify({
  event: data.eventName,
  userId: data.userId
});

const options = {
  headers: {'Content-Type': 'application/json'},
  method: 'POST'
};

sendHttpRequest(data.endpoint, options, postBody)
  .then(data.gtmOnSuccess)
  .catch(data.gtmOnFailure);
```

**Script Injection Tag:**
```javascript
const injectScript = require('injectScript');
const queryPermission = require('queryPermission');

const url = 'https://example.com/script.js';

if (queryPermission('inject_script', url)) {
  injectScript(url, data.gtmOnSuccess, data.gtmOnFailure);
} else {
  data.gtmOnFailure();
}
```

## Building Variable Templates

### Variable Template Basics

Variable templates return a value that can be used in other GTM configurations.

**Cookie Variable:**
```javascript
const getCookieValues = require('getCookieValues');

const cookieName = data.cookieName;
const cookies = getCookieValues(cookieName);

if (cookies && cookies.length > 0) {
  return cookies[0];
}

return data.defaultValue || '';
```

**LocalStorage Variable:**
```javascript
const localStorage = require('localStorage');

const key = data.storageKey;
const value = localStorage.getItem(key);

return value || data.defaultValue;
```

**Custom JavaScript Variable:**
```javascript
const makeTableMap = require('makeTableMap');
const makeNumber = require('makeNumber');

// Convert table to lookup map
const lookupTable = makeTableMap(data.table, 'key', 'value');

// Perform lookup
const inputValue = data.inputVariable;
return lookupTable[inputValue] || data.defaultValue;
```

## Sandboxed JavaScript API Reference

### Commonly Used APIs

**Data Type Conversion:**
```javascript
const makeInteger = require('makeInteger');
const makeNumber = require('makeNumber');
const makeString = require('makeString');

const num = makeNumber('123.45'); // 123.45
const int = makeInteger('123.45'); // 123
const str = makeString(123); // '123'
```

**Network APIs:**
```javascript
const sendPixel = require('sendPixel');
const sendHttpRequest = require('sendHttpRequest');
const injectScript = require('injectScript');

// Pixel
sendPixel(url, onSuccess, onFailure);

// HTTP Request
sendHttpRequest(url, options, body)
  .then(onSuccess)
  .catch(onFailure);

// Script injection
injectScript(url, onSuccess, onFailure);
```

**Storage APIs:**
```javascript
const getCookieValues = require('getCookieValues');
const setCookie = require('setCookie');
const localStorage = require('localStorage');

// Cookies
const cookies = getCookieValues('cookieName');
setCookie('name', 'value', {
  domain: 'example.com',
  path: '/',
  'max-age': 3600
});

// LocalStorage
const value = localStorage.getItem('key');
localStorage.setItem('key', 'value');
```

**Utility APIs:**
```javascript
const encodeUri = require('encodeUri');
const encodeUriComponent = require('encodeUriComponent');
const decodeUri = require('decodeUri');
const decodeUriComponent = require('decodeUriComponent');
const JSON = require('JSON');
const Math = require('Math');
const Object = require('Object');

// URL encoding
const encoded = encodeUriComponent('hello world');

// JSON
const obj = JSON.parse('{"key":"value"}');
const str = JSON.stringify({key: 'value'});

// Math
const random = Math.random();
const rounded = Math.round(3.7);
```

**DOM APIs (Limited):**
```javascript
const callInWindow = require('callInWindow');
const copyFromWindow = require('copyFromWindow');

// Call window function
callInWindow('functionName', arg1, arg2);

// Copy from window
const gaData = copyFromWindow('ga');
```

## Permissions System

### Understanding Permissions

Every API requires explicit permission configuration. Permissions define what URLs, cookies, or data the template can access.

**sendPixel Permission:**
```json
{
  "instance": {
    "key": {"publicId": "send_pixel", "versionId": "1"},
    "param": [{
      "key": "allowedUrls",
      "value": {"type": 1, "string": "specific"},
      "list": [
        {"type": 1, "string": "https://example.com/*"}
      ]
    }]
  }
}
```

**get_cookies Permission:**
```json
{
  "instance": {
    "key": {"publicId": "get_cookies", "versionId": "1"},
    "param": [{
      "key": "cookieAccess",
      "value": {"type": 1, "string": "specific"},
      "list": [
        {"type": 1, "string": "session_id"},
        {"type": 1, "string": "user_*"}
      ]
    }]
  }
}
```

**Best Practice:** Use the most restrictive permissions possible. Avoid "any" when you can specify exact URLs or cookie names.

## Template Testing

### Writing Tests

```javascript
// Test successful execution
scenarios:
- name: Tag fires successfully
  code: |-
    const mockData = {
      endpoint: 'https://example.com/api',
      eventName: 'test_event'
    };

    runCode(mockData);

    assertApi('gtmOnSuccess').wasCalled();
    assertApi('sendHttpRequest').wasCalledWith(
      'https://example.com/api',
      assertThat.objectContaining({method: 'POST'})
    );
```

### Test Mocking

```javascript
// Mock API returns
mock('getCookieValues', (name) => {
  if (name === 'session_id') {
    return ['abc123'];
  }
  return [];
});

// Test with mock
const mockData = {cookieName: 'session_id'};
let result = runCode(mockData);

assertThat(result).isEqualTo('abc123');
```

## Common Patterns and Solutions

### Converting Regular JS to Sandboxed JS

❌ **Regular JavaScript (won't work):**
```javascript
// Direct DOM access
document.getElementById('element');

// Direct window access
window.dataLayer.push({});

// XMLHttpRequest
const xhr = new XMLHttpRequest();
```

✅ **Sandboxed JavaScript (will work):**
```javascript
// Use callInWindow
const callInWindow = require('callInWindow');
callInWindow('dataLayer.push', {event: 'custom'});

// Use sendHttpRequest
const sendHttpRequest = require('sendHttpRequest');
sendHttpRequest(url, {method: 'GET'})
  .then(data.gtmOnSuccess)
  .catch(data.gtmOnFailure);
```

### Error Handling

```javascript
const sendHttpRequest = require('sendHttpRequest');
const logToConsole = require('logToConsole');

sendHttpRequest(data.endpoint)
  .then(response => {
    logToConsole('Success:', response);
    data.gtmOnSuccess();
  })
  .catch(error => {
    logToConsole('Error:', error);
    data.gtmOnFailure();
  });
```

### Data Validation

```javascript
const makeNumber = require('makeNumber');
const getType = require('getType');

// Validate input
if (getType(data.value) === 'undefined') {
  data.gtmOnFailure();
  return;
}

// Convert and validate
const numValue = makeNumber(data.value);
if (numValue === undefined) {
  logToConsole('Invalid number');
  data.gtmOnFailure();
  return;
}

// Continue with valid data
data.gtmOnSuccess();
```

## Template Field Configuration

### Common Field Types

```javascript
// Text input
{
  "type": "TEXT",
  "name": "apiKey",
  "displayName": "API Key",
  "simpleValueType": true,
  "valueValidators": [
    {"type": "NON_EMPTY"},
    {"type": "REGEX", "args": ["^[a-zA-Z0-9]{32}$"]}
  ]
}

// Select dropdown
{
  "type": "SELECT",
  "name": "eventType",
  "displayName": "Event Type",
  "selectItems": [
    {"value": "pageview", "displayValue": "Pageview"},
    {"value": "event", "displayValue": "Event"}
  ],
  "simpleValueType": true
}

// Checkbox
{
  "type": "CHECKBOX",
  "name": "enableDebug",
  "checkboxText": "Enable Debug Logging",
  "simpleValueType": true,
  "defaultValue": false
}

// Group
{
  "type": "GROUP",
  "name": "advancedSettings",
  "displayName": "Advanced Settings",
  "groupStyle": "ZIPPY_CLOSED",
  "subParams": [
    // Nested fields here
  ]
}
```

## Publishing to Community Template Gallery

1. **Complete Template Info**
   - Descriptive name and description
   - Appropriate categories
   - Brand information
   - Thumbnail image (optional)

2. **Add Comprehensive Tests**
   - Test all major code paths
   - Test error handling
   - Test edge cases

3. **Document Template**
   - Clear field descriptions
   - Help text for complex fields
   - Notes section with usage instructions

4. **Submit for Review**
   - Export template from GTM
   - Submit to Community Template Gallery
   - Address reviewer feedback

## Template Boilerplates

This skill includes ready-to-use template boilerplates:

- **assets/tag-template-boilerplate.tpl** - Complete tag template structure
- **assets/variable-template-boilerplate.tpl** - Complete variable template structure

Copy these files and customize for your specific use case.

## References

This skill includes comprehensive reference documentation:

- **references/sandboxed-javascript-api.md** - Complete API reference
- **references/custom-templates-guide.md** - Simo Ahava's comprehensive guide
- **references/template-testing.md** - Testing documentation and patterns
- **references/template-examples.md** - Real-world template examples

Search references for specific APIs:
```bash
grep -r "sendHttpRequest" references/
grep -r "permissions" references/
grep -r "testing" references/
```

## Integration with Other Skills

- **gtm-general** - Understanding GTM concepts and architecture
- **gtm-setup** - Testing templates in GTM containers
- **gtm-tags** - Understanding tag structure for tag templates
- **gtm-variables** - Understanding variable structure for variable templates
- **gtm-datalayer** - Templates that interact with data layer
- **gtm-debugging** - Testing and debugging custom templates
- **gtm-api** - Programmatic template management

## Quick Reference

**Import API:** `const apiName = require('apiName');`

**Success/Failure:** Always call `data.gtmOnSuccess()` or `data.gtmOnFailure()`

**Permissions:** Every API requires explicit permission configuration

**Testing:** Use `runCode(mockData)` and assertions

**Debugging:** Use `logToConsole()` with debug environment permission
