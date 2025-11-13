# Custom Template Examples

<!-- To be populated with practical examples -->

## Tag Template Examples

### Simple Pixel Tag Template

```javascript
// Code section
const sendPixel = require('sendPixel');
const encodeUriComponent = require('encodeUriComponent');
const getUrl = require('getUrl');

const pixelUrl = 'https://example.com/pixel?'
  + 'page=' + encodeUriComponent(getUrl())
  + '&event=' + encodeUriComponent(data.eventName);

sendPixel(pixelUrl, data.gtmOnSuccess, data.gtmOnFailure);
```

### HTTP Request Tag Template

```javascript
// Code section
const sendHttpRequest = require('sendHttpRequest');
const JSON = require('JSON');

const postBody = JSON.stringify({
  event: data.eventName,
  userId: data.userId,
  timestamp: Date.now()
});

const options = {
  headers: {'Content-Type': 'application/json'},
  method: 'POST',
};

sendHttpRequest(data.endpoint, options, postBody)
  .then(data.gtmOnSuccess)
  .catch(data.gtmOnFailure);
```

## Variable Template Examples

### Cookie Variable Template

```javascript
// Code section
const getCookieValues = require('getCookieValues');
const cookieName = data.cookieName;
const cookies = getCookieValues(cookieName);

if (cookies.length > 0) {
  return cookies[0];
}

return data.defaultValue;
```

### LocalStorage Variable Template

```javascript
// Code section
const localStorage = require('localStorage');
const key = data.localStorageKey;

return localStorage.getItem(key) || data.defaultValue;
```

### Custom JavaScript Function Variable

```javascript
// Code section
const makeTableMap = require('makeTableMap');
const lookupTable = makeTableMap(data.tableInput, 'input', 'output');

const inputValue = data.inputVariable;
return lookupTable[inputValue] || data.defaultValue;
```

## Common Patterns

### Error Handling

```javascript
const sendHttpRequest = require('sendHttpRequest');
const logToConsole = require('logToConsole');

sendHttpRequest(url, options)
  .then(response => {
    logToConsole('Success:', response);
    data.gtmOnSuccess();
  })
  .catch(error => {
    logToConsole('Error:', error);
    data.gtmOnFailure();
  });
```

### Conditional Logic

```javascript
const getType = require('getType');

if (getType(data.value) === 'undefined') {
  return data.defaultValue;
}

if (data.value > 0) {
  return 'positive';
} else if (data.value < 0) {
  return 'negative';
} else {
  return 'zero';
}
```

### Data Validation

```javascript
const makeNumber = require('makeNumber');
const makeString = require('makeString');

// Validate and convert input
const numericValue = makeNumber(data.inputValue);

if (numericValue === undefined) {
  logToConsole('Invalid numeric input');
  data.gtmOnFailure();
  return;
}

// Continue with validated value
const result = numericValue * 2;
data.gtmOnSuccess();
```

## Placeholder for Additional Examples

This file will be enhanced with:
- Server-side client template examples
- Complex permission configurations
- Field validation patterns
- Real-world use cases
- Community template patterns

**Status**: ⚠️ To be enhanced with documentation extraction
