# Sandboxed JavaScript API Reference

This is the complete Sandboxed JavaScript API reference for Google Tag Manager custom templates. These APIs enable you to build powerful custom templates while maintaining security and performance standards.

Source: https://developers.google.com/tag-platform/tag-manager/templates/api

## API Categories

### Core APIs

These APIs work with sandboxed JavaScript to build custom templates in Google Tag Manager.

#### Consent Management

- **addConsentListener(consentType, listener)** → void
  - Registers a listener function to execute when the state of the specified consent type changes.

- **isConsentGranted(consentType)** → boolean
  - Returns true if the specified consent type is granted.

- **setDefaultConsentState(consentSettings)** → void
  - Pushes a default consent update to the data layer.

- **updateConsentState(consentSettings)** → void
  - Pushes a consent update to the data layer.

#### Event Handling

- **addEventCallback(callback)** → void
  - Allows you to register a callback function that will be invoked at the end of an event.

- **callLater(function)** → void
  - Schedules a call to a function to occur asynchronously.

#### Window and Global Object Access

- **aliasInWindow(toPath, fromPath)** → boolean
  - Lets you create an alias (e.g. window.foo = window.bar).

- **callInWindow(pathToFunction, args)** → *
  - Allows you to call functions from a path off the window object, in a policy-controlled way.

- **copyFromWindow(key)** → *
  - Copies a variable from window object.

- **setInWindow(key, value, overrideExisting)** → boolean
  - Sets the given value in window at the given key.

#### Queue and Array Creation

- **createArgumentsQueue(fnKey, arrayKey)** → function
  - Creates a queue that is populated with argument objects, in support of tag solutions that require it.

- **createQueue(arrayKey)** → function
  - Creates an array in window and returns a function that will push values onto that array.

#### URI and Encoding

- **decodeUri(encoded_uri)** → string
  - Decodes any encoded characters in the provided URI.

- **decodeUriComponent(encoded_uri_component)** → string
  - Decodes any encoded characters in the provided URI component.

- **encodeUri(uri)** → string
  - Returns an encoded Uniform Resource Identifier (URI) by escaping special characters.

- **encodeUriComponent(str)** → string
  - Returns an encoded Uniform Resource Identifier (URI) by escaping special characters.

- **fromBase64(base64EncodedString)** → string
  - Lets you decode strings from their base64 representation.

- **toBase64(input)** → string
  - Lets you encode a string into a base64 representation.

#### Utility Functions

- **generateRandom(min, max)** → number
  - Returns a random number (integer) within the given range.

- **getContainerVersion()** → object
  - Returns an object containing data about the current container.

- **getType(value)** → string
  - Returns a string describing the given value's type.

- **logToConsole(obj1, obj2, ...)** → void
  - Logs arguments to the browser console.

- **makeInteger(value)** → number
  - Converts the given value to a number (integer).

- **makeNumber(value)** → number
  - Converts the given value to a number.

- **makeString(value)** → string
  - Returns the given value as a string.

- **makeTableMap(tableObj, keyColumnName, valueColumnName)** → object
  - Converts a simple table object with two columns to a Map.

- **queryPermission(permission, functionArgs)** → boolean
  - Query the allowed and narrowed permissions.

- **require(name)** → function
  - Imports a built-in function by name.

#### Data Layer Access

- **copyFromDataLayer(key, dataLayerVersion)** → *
  - Returns the value currently assigned to the given key in the data layer.

- **gtagSet(object)** → void
  - Pushes a gtag set command to the data layer.

#### Cookie Management

- **getCookieValues(name, decode)** → array
  - Returns the values of all cookies with the given name.

- **setCookie(name, value, options, encode)** → void
  - Sets or deletes the cookie with the specified name, value, and options.

#### URL and Query Parameters

- **getQueryParameters(queryKey, retrieveAll)** → *
  - Returns the first or all of the parameters for the current URL's queryKey.

- **getUrl(component)** → string
  - Returns a string that represents all or a portion of the current URL.

- **parseUrl(url)** → object
  - Returns an object that contains all of a given URL's component parts.

- **getReferrerUrl(component)** → string
  - Reads the document object for the referrer and returns a string that represents a portion of the referrer.

- **getReferrerQueryParameters(queryKey, retrieveAll)** → *
  - Acts the same way as getQueryParameters, except it acts on the referrer instead of the current URL.

#### Time Management

- **getTimestamp()** → number
  - Returns a number that represents the current time in milliseconds since Unix epoch.

- **getTimestampMillis()** → number
  - Returns a number that represents the current time in milliseconds since Unix epoch.

#### Network and Injection

- **injectHiddenIframe(url, onSuccess)** → void
  - Adds an invisible iframe to the page.

- **injectScript(url, onSuccess, onFailure, cacheToken)** → void
  - Adds a script tag to the page to load the given URL asynchronously.

- **sendPixel(url, onSuccess, onFailure)** → void
  - Makes a GET request to a specified URL endpoint.

- **sha256(input, onSuccess, onFailure, options)** → void
  - Calculates the SHA-256 digest of the input.

#### Document Reading

- **readCharacterSet()** → string
  - Returns the value of document.characterSet.

- **readTitle()** → string
  - Returns the value of document.title.

- **readAnalyticsStorage(cookieOptions)** → object
  - Retrieves the data stored for analytics and returns an object with client_id and sessions.

#### Built-in Objects

- **JSON** → object
  - Returns an object that provides JSON functions.

- **Math** → object
  - An object providing Math functions.

- **Object** → object
  - Returns an object that provides Object methods.

- **localStorage** → object
  - Returns an object with methods for accessing local storage.

- **templateStorage** → object
  - Returns an object with methods for accessing template storage.

---

### Test APIs

These APIs work with sandboxed JavaScript tests to build tests for custom templates in Google Tag Manager.

#### Assertions and Validation

- **assertApi(apiName)** → object
  - Returns a matcher object that can be used to fluently make assertions about the given API.

- **assertThat(actual, opt_message)** → object
  - Returns an object that can be used to fluently make assertions about a subject's value.

- **fail(opt_message)** → void
  - Immediately fails the current test and prints the given message, if supplied.

#### Mocking

- **mock(apiName, returnValue)** → void
  - Allows you to override the behavior of Sandboxed APIs.

- **mockObject(apiName, objectMock)** → void
  - Lets you override the behavior of Sandboxed APIs that return an object.

#### Test Execution

- **runCode(data)** → *
  - Runs the code for the template in the current test environment.

---

## API Summary

**Total Core APIs**: 49 functions across 13 categories
**Total Test APIs**: 6 functions across 3 categories
**Total APIs**: 55 functions

### Core API Categories
1. Consent Management (4 functions)
2. Event Handling (2 functions)
3. Window and Global Object Access (4 functions)
4. Queue and Array Creation (2 functions)
5. URI and Encoding (6 functions)
6. Utility Functions (8 functions)
7. Data Layer Access (2 functions)
8. Cookie Management (2 functions)
9. URL and Query Parameters (5 functions)
10. Time Management (2 functions)
11. Network and Injection (4 functions)
12. Document Reading (3 functions)
13. Built-in Objects (5 functions)

### Test API Categories
1. Assertions and Validation (3 functions)
2. Mocking (2 functions)
3. Test Execution (1 function)

---

## Usage Examples

### Working with the Data Layer
```javascript
// Get a value from the data layer
var userId = copyFromDataLayer('userId');

// Push a gtag set command
gtagSet({
  'event': 'page_view',
  'page_title': readTitle()
});
```

### Managing Cookies
```javascript
// Get cookie values
var cookieValues = getCookieValues('tracking_id', true);

// Set a cookie
setCookie('my_cookie', 'value123', {
  'domain': 'example.com',
  'path': '/',
  'max-age': 86400
});
```

### Working with URLs
```javascript
// Get URL components
var hostname = getUrl('hostname');
var pathname = getUrl('pathname');
var queryString = getUrl('query');

// Parse a URL
var urlParts = parseUrl('https://example.com/page?param=value');

// Get query parameters
var userParam = getQueryParameters('user_id', false);
```

### Async Operations
```javascript
// Inject a script
injectScript('https://example.com/tracker.js', function() {
  logToConsole('Script loaded successfully');
}, function() {
  logToConsole('Script failed to load');
});

// Send a pixel
sendPixel('https://example.com/track?event=purchase', function() {
  logToConsole('Pixel sent');
}, function() {
  logToConsole('Pixel failed');
});

// Calculate SHA-256
sha256('input_string', function(result) {
  logToConsole('SHA-256: ' + result);
}, function() {
  logToConsole('Hash calculation failed');
});
```

### Consent Management
```javascript
// Check if consent is granted
if (isConsentGranted('analytics_storage')) {
  // Proceed with analytics
}

// Add a consent listener
addConsentListener('analytics_storage', function() {
  logToConsole('Consent state changed');
});

// Update consent
updateConsentState({
  'analytics_storage': 'granted',
  'ad_storage': 'denied'
});
```

### Testing Custom Templates
```javascript
// Mock an API
mock('sendPixel', undefined);

// Assert API behavior
assertApi('sendPixel').wasCalled();

// Run template code with test data
var result = runCode({
  'event': 'test_event',
  'user_id': '12345'
});
```

---

## Reference

- **Official Documentation**: https://developers.google.com/tag-platform/tag-manager/templates/api
- **Google Tag Manager**: https://tagmanager.google.com
- **GTM Custom Templates Guide**: https://developers.google.com/tag-platform/tag-manager/templates/guide
