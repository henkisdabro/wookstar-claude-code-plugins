# Google Tag Manager - Variables

## Overview

Variables in Google Tag Manager are placeholders that store and retrieve values. They are the "what" component of the Tag-Trigger-Variable system, providing dynamic data to tags and triggers.

**What Variables Do:**

- Store dynamic values (page URL, click text, user data)
- Read from data layer
- Execute JavaScript to compute values
- Retrieve cookie values
- Provide reusable values across tags
- Enable conditional tag firing in triggers

## Technical Constraints

### JavaScript Variables (ES5 Requirement)

**CRITICAL:** Custom JavaScript Variables in GTM require **ECMAScript 5 (ES5)** syntax, NOT modern ES6+.

**ES6 Features NOT Supported:**

```javascript
// ❌ WILL FAIL - ES6 syntax
const myVar = 'value';
let count = 0;
const arrow = () => 'result';
const template = `Hello ${name}`;
const {property} = object;
const [first, second] = array;

// ✅ CORRECT - ES5 syntax
var myVar = 'value';
var count = 0;
var regularFunc = function() { return 'result'; };
var concatenated = 'Hello ' + name;
var property = object.property;
var first = array[0];
var second = array[1];
```

**Custom JavaScript variables must:**
- Use `var` for declarations
- Use `function() {}` syntax (not arrow functions)
- Use string concatenation (not template literals)
- Use bracket/dot notation (not destructuring)
- Return a value

**See Also:** [Best Practices - JavaScript in GTM](./best-practices.md#javascript-in-google-tag-manager-es5-requirement)

### Regex Table Variables (RE2 Format)

**CRITICAL:** Regex Table variables use **RE2 (GoLang regex)** format, NOT standard JavaScript regex.

**NOT Supported in RE2:**
- ❌ Backreferences: `\1`, `\2`
- ❌ Lookahead: `(?=...)`
- ❌ Lookbehind: `(?<=...)`

**Supported in RE2:**
- ✅ Character classes: `[abc]`, `\d`, `\w`
- ✅ Quantifiers: `*`, `+`, `?`, `{n,m}`
- ✅ Anchors: `^`, `$`
- ✅ Alternation: `|`
- ✅ Groups: `(...)`
- ✅ Case-insensitive: `(?i)`

**Example Regex Table:**

```
Input Variable: {{Page Path}}

Pattern              | Output
---------------------|--------
^/products/          | product
^/category/          | category
^/blog/\d{4}/        | blog_post
(?i)checkout         | checkout (case-insensitive)
```

**See Also:**
- [Best Practices - Regular Expressions](./best-practices.md#regular-expressions-in-google-tag-manager-re2-format)
- Complete RE2 syntax: `.claude/skills/gtm-core/gtm-core/references/google-rew-regular-expressions-syntax.txt`

## Variable Basics

### How Variables Work

Variables in GTM are referenced using double curly braces: `{{Variable Name}}`

**Example:**

```
Tag Configuration:
  Measurement ID: {{Constant - GA4 Measurement ID}}
  User ID: {{DLV - User ID}}
  Page URL: {{Page URL}}

Trigger Configuration:
  Condition: {{Page Path}} contains /checkout
```

### Variable Types

GTM has two main categories of variables:

1. **Built-in Variables** - Predefined variables provided by GTM
2. **User-Defined Variables** - Custom variables you create

### Variable Resolution

When a tag fires, GTM resolves all variable references:

```
1. Tag fires
2. GTM finds {{Variable Name}} references
3. Variable evaluates and returns value
4. Value replaces {{Variable Name}} in tag
5. Tag sends data to platform
```

### Variable Naming Syntax

Variables are referenced with double curly braces:

```javascript
{{Variable Name}}
```

**Case-Sensitive:** `{{Page URL}}` ≠ `{{page url}}`

**Spaces Allowed:** `{{DLV - User ID}}` is valid

**Common Prefixes:**
- `DLV` - Data Layer Variable
- `JS` - Custom JavaScript
- `Constant` - Constant value
- `1P Cookie` - First Party Cookie
- `URL` - URL variable

## Built-in Variables

Built-in variables are predefined by GTM and automatically capture common page and event data.

### Enabling Built-in Variables

Variables → Configure Built-In Variables → Check boxes to enable

**Recommended to enable:**
- Page variables (URL, Path, Hostname, Referrer)
- Click variables (Element, ID, Classes, URL, Text)
- Container variables (Container ID, Version)

### Page Variables

**{{Page URL}}**
- Full page URL including protocol, domain, path, query
- Example: `https://example.com/products?id=123`

**{{Page Hostname}}**
- Domain name only
- Example: `example.com` or `www.example.com`

**{{Page Path}}**
- URL path without domain or query string
- Example: `/products/category/item`

**{{Referrer}}**
- URL of previous page
- Example: `https://google.com/search?q=example`

**{{Page Fragment}}**
- URL hash/fragment
- Example: `section-1` from `page.html#section-1`

### Click Variables

**{{Click Element}}**
- The DOM element that was clicked
- Returns: Element object

**{{Click ID}}**
- ID attribute of clicked element
- Example: `submit-button`

**{{Click Classes}}**
- CSS classes of clicked element
- Example: `btn btn-primary cta`

**{{Click URL}}**
- href attribute of clicked link
- Example: `https://example.com/page` or `mailto:email@example.com`

**{{Click Text}}**
- Text content of clicked element
- Example: `Sign Up Now`

**{{Click Target}}**
- Target attribute of clicked link
- Example: `_blank`, `_self`

### Form Variables

**{{Form Element}}**
- The form DOM element
- Returns: Form element object

**{{Form ID}}**
- ID attribute of form
- Example: `contact-form`

**{{Form Classes}}**
- CSS classes of form
- Example: `contact-form newsletter-signup`

**{{Form URL}}**
- Action URL of form
- Example: `/submit-contact`

**{{Form Text}}**
- Text content within form
- Example: Combined text from labels and buttons

**Important:** Never capture actual form field values containing PII.

### Video Variables

**{{Video Status}}**
- Current video status
- Values: `start`, `pause`, `complete`, `progress`, `seek`, `buffering`

**{{Video URL}}**
- YouTube video URL
- Example: `https://www.youtube.com/watch?v=VIDEO_ID`

**{{Video Title}}**
- Video title from YouTube
- Example: `Product Demo Video`

**{{Video Duration}}**
- Total video length in seconds
- Example: `180`

**{{Video Current Time}}**
- Current playback position in seconds
- Example: `45`

**{{Video Percent}}**
- Percentage of video watched
- Example: `25`

**{{Video Provider}}**
- Video platform
- Example: `youtube`

**{{Video Visible}}**
- Whether video is in viewport
- Values: `true` or `false`

### Scroll Variables

**{{Scroll Depth Threshold}}**
- The scroll threshold reached
- Example: `75` (from 75% threshold)

**{{Scroll Depth Units}}**
- Unit type of threshold
- Values: `percent` or `pixels`

**{{Scroll Direction}}**
- Scroll direction
- Values: `vertical` or `horizontal`

### Visibility Variables

**{{Percent Visible}}**
- Percentage of element visible in viewport
- Example: `50`

**{{On-Screen Duration}}**
- Duration element was visible (milliseconds)
- Example: `2000`

### Error Variables

**{{Error Message}}**
- JavaScript error message
- Example: `Uncaught TypeError: Cannot read property 'x' of undefined`

**{{Error URL}}**
- URL where error occurred
- Example: `https://example.com/script.js`

**{{Error Line}}**
- Line number in source file
- Example: `42`

### Utility Variables

**{{Container ID}}**
- GTM container ID
- Example: `GTM-XXXXXX`

**{{Container Version}}**
- Published container version number
- Example: `12`

**{{Debug Mode}}**
- Whether GTM is in debug/preview mode
- Values: `true` or `false`

**{{Random Number}}**
- Random integer 0 to 2147483647
- Use for: Cache busting, sampling

**{{Environment Name}}**
- Current GTM environment
- Values: `Live`, `Latest`, `Environment Name`

**{{HTML ID}}**
- ID attribute of GTM container element
- Example: `gtm-container`

## User-Defined Variable Types

Create custom variables to extend GTM functionality.

### Data Layer Variable

Reads values from the data layer.

**Purpose:**
- Access data pushed to data layer
- Read ecommerce data
- Retrieve custom event data
- Get user information

**Configuration:**

```
Variable Type: Data Layer Variable
Data Layer Variable Name: userId
  (reads from dataLayer.userId)

Data Layer Version: Version 2
Set Default Value: (optional)
  Default Value: unknown
```

**Data Layer Structure:**

```javascript
dataLayer.push({
  'userId': '12345',
  'userType': 'premium',
  'pageCategory': 'product',
  'ecommerce': {
    'currency': 'USD',
    'value': 99.99
  }
});
```

**Variable Examples:**

```
Name: DLV - User ID
Data Layer Variable Name: userId
Returns: "12345"

Name: DLV - User Type
Data Layer Variable Name: userType
Returns: "premium"

Name: DLV - Currency
Data Layer Variable Name: ecommerce.currency
Returns: "USD"

Name: DLV - Transaction Value
Data Layer Variable Name: ecommerce.value
Returns: 99.99
```

**Nested Values:**

Use dot notation for nested objects:

```javascript
dataLayer.push({
  'user': {
    'id': '12345',
    'preferences': {
      'newsletter': true
    }
  }
});

// Variable Configuration:
Data Layer Variable Name: user.id
Returns: "12345"

Data Layer Variable Name: user.preferences.newsletter
Returns: true
```

**Array Access:**

Use array index notation:

```javascript
dataLayer.push({
  'products': [
    {'id': 'SKU001', 'name': 'Product 1'},
    {'id': 'SKU002', 'name': 'Product 2'}
  ]
});

// Variable Configuration:
Data Layer Variable Name: products.0.id
Returns: "SKU001"

Data Layer Variable Name: products.1.name
Returns: "Product 2"
```

**Default Values:**

Set a fallback value when data layer variable is undefined:

```
Variable Type: Data Layer Variable
Data Layer Variable Name: userId
Set Default Value: ✓
  Default Value: not-logged-in
```

### Custom JavaScript Variable

Executes JavaScript code to compute and return a value.

**IMPORTANT:** Must use ES5 JavaScript syntax (see section above).

**Purpose:**
- Perform calculations
- Transform data
- Combine multiple variables
- Conditional logic
- Access DOM elements
- Parse strings

**Configuration:**

```
Variable Type: Custom JavaScript
Custom JavaScript:
  function() {
    // ES5 JavaScript only
    var result = 'computed value';
    return result;
  }
```

**Examples:**

**Simple Transformation:**

```javascript
function() {
  var pagePath = {{Page Path}};
  return pagePath.toLowerCase();
}
```

**Calculation:**

```javascript
function() {
  var price = {{DLV - Product Price}};
  var quantity = {{DLV - Quantity}};
  return price * quantity;
}
```

**Conditional Logic:**

```javascript
function() {
  var userType = {{DLV - User Type}};

  if (userType === 'premium') {
    return 'high-value';
  } else if (userType === 'standard') {
    return 'medium-value';
  } else {
    return 'low-value';
  }
}
```

**String Manipulation:**

```javascript
function() {
  var pageUrl = {{Page URL}};

  // Extract query parameter
  var match = pageUrl.match(/[?&]utm_source=([^&]+)/);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return 'direct';
}
```

**Array Operations:**

```javascript
function() {
  var products = {{DLV - Products}};

  if (!products || !products.length) {
    return 0;
  }

  var total = 0;
  for (var i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }

  return total.toFixed(2);
}
```

**Date/Time:**

```javascript
function() {
  var now = new Date();

  // Format: YYYY-MM-DD
  var year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var day = ('0' + now.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
}
```

**DOM Access:**

```javascript
function() {
  var element = document.querySelector('.product-sku');

  if (element) {
    return element.textContent.trim();
  }

  return 'not-found';
}
```

**Combining Variables:**

```javascript
function() {
  var category = {{DLV - Category}};
  var subcategory = {{DLV - Subcategory}};

  return category + ' > ' + subcategory;
}
```

**Error Handling:**

```javascript
function() {
  try {
    var data = {{DLV - Complex Data}};
    return data.property.nestedProperty;
  } catch (e) {
    return 'error';
  }
}
```

**Best Practices:**
- Always return a value
- Handle undefined/null cases
- Use try/catch for risky operations
- Keep code simple and readable
- Test thoroughly in Preview mode
- Use ES5 syntax only

### First-Party Cookie

Reads value from a first-party cookie.

**Purpose:**
- Access cookie values
- Read user preferences
- Get session data
- Retrieve stored identifiers

**Configuration:**

```
Variable Type: First-Party Cookie
Cookie Name: user_id
  (case-sensitive, exact cookie name)

URI-decode cookie: ✓ (recommended)
Format Value: Text / Lowercase / Uppercase / None
```

**Examples:**

```
Name: 1P Cookie - User ID
Cookie Name: user_id
Returns: Value of user_id cookie

Name: 1P Cookie - Session ID
Cookie Name: _session_id
Returns: Session identifier

Name: 1P Cookie - Consent
Cookie Name: cookie_consent
Returns: "accepted" or "denied"
```

**Cookie Path and Domain:**

GTM reads cookies accessible to the current page based on:
- Cookie domain (`.example.com` vs `www.example.com`)
- Cookie path (`/` vs `/products/`)

**URI Decoding:**

Enable "URI-decode cookie" to decode URL-encoded values:

```
Cookie Value: hello%20world
With URI-decode: hello world
Without URI-decode: hello%20world
```

**Use Cases:**

```javascript
// Check if user is logged in
Trigger Condition: {{1P Cookie - user_logged_in}} equals true

// Segment by user type
Tag Parameter: user_segment = {{1P Cookie - user_segment}}

// Exclude internal traffic
Blocking Trigger: {{1P Cookie - internal_user}} equals true
```

### JavaScript Variable

Reads value from a global JavaScript variable.

**Purpose:**
- Access window-level variables
- Read values from other scripts
- Get application state
- Access third-party SDKs

**Configuration:**

```
Variable Type: JavaScript Variable
Global Variable Name: myGlobalVar
  (reads from window.myGlobalVar)
```

**Examples:**

```
Name: JS Var - Google Analytics ID
Global Variable Name: ga.q
Returns: GA queue

Name: JS Var - App Version
Global Variable Name: app.version
Returns: Application version number

Name: JS Var - User Object
Global Variable Name: currentUser
Returns: User object from application
```

**Nested Properties:**

Access nested object properties:

```javascript
// Global object:
window.appConfig = {
  environment: 'production',
  features: {
    chatEnabled: true
  }
};

// Variable Configuration:
Global Variable Name: appConfig.environment
Returns: "production"

Global Variable Name: appConfig.features.chatEnabled
Returns: true
```

**Difference from Custom JavaScript:**

| Feature | JavaScript Variable | Custom JavaScript |
|---------|---------------------|-------------------|
| Purpose | Read existing global variable | Execute code to compute value |
| Syntax | Variable name only | Full function |
| Code execution | No | Yes |
| Use when | Variable already exists | Need to process/calculate |

### URL Variable

Extracts components from a URL.

**Purpose:**
- Parse URL components
- Extract query parameters
- Get specific URL parts
- Clean URLs for reporting

**Configuration:**

```
Variable Type: URL
Component Type: URL / Protocol / Hostname / Path / Query / Fragment / Port
Query Key: (if Component Type = Query)
```

**Component Types:**

**URL** - Full URL
```
Input: https://example.com/products?id=123#reviews
Output: https://example.com/products?id=123#reviews
```

**Protocol**
```
Input: https://example.com/page
Output: https:
```

**Hostname**
```
Input: https://www.example.com/page
Output: www.example.com
```

**Port**
```
Input: https://example.com:8080/page
Output: 8080
```

**Path**
```
Input: https://example.com/products/category
Output: /products/category
```

**Query**
```
Input: https://example.com/page?utm_source=google&utm_medium=cpc
Component: Query
Output: utm_source=google&utm_medium=cpc
```

**Query (Specific Key)**
```
Input: https://example.com/page?utm_source=google&id=123
Component: Query
Query Key: utm_source
Output: google
```

**Fragment**
```
Input: https://example.com/page#section-2
Output: section-2
```

**Examples:**

```
Name: URL - UTM Source
Component Type: Query
Query Key: utm_source
Returns: Value of utm_source parameter

Name: URL - Product ID
Component Type: Query
Query Key: product_id
Returns: Product ID from query string

Name: URL - Current Path
Component Type: Path
Returns: /category/products

Name: URL - Referrer Hostname
Component Type: Hostname
Returns: Hostname of referrer
```

### Regex Table Variable

Maps input values to output values using regular expressions.

**IMPORTANT:** Uses RE2 regex format (see section above).

**Purpose:**
- Pattern matching and transformation
- Map URLs to page types
- Categorize pages
- Clean/normalize data

**Configuration:**

```
Variable Type: Regex Table
Input Variable: {{Page Path}}
Set Default Value: (optional)
  Default Value: other

Pattern          | Output
-----------------|--------
^/products/      | product
^/category/      | category
^/blog/          | blog
^/$              | home
```

**Pattern Matching:**

Patterns are evaluated in order, first match wins.

**Examples:**

**Page Type Classification:**

```
Input Variable: {{Page Path}}

Pattern                  | Output
-------------------------|------------
^/$                      | home
^/products/[^/]+$        | product_detail
^/products/              | product_list
^/category/              | category
^/checkout/              | checkout
^/cart                   | cart
^/blog/\d{4}/            | blog_post
^/about                  | about
```

**URL Cleaning:**

```
Input Variable: {{Page URL}}

Pattern                      | Output
-----------------------------|---------------------------
\?.*$                        |  (removes query string)
#.*$                         |  (removes fragment)
```

**Campaign Source Mapping:**

```
Input Variable: {{URL - UTM Source}}

Pattern          | Output
-----------------|--------
^google$         | paid_search
^facebook$       | social
^email           | email
^newsletter      | email
.*               | other
```

**RE2 Regex Examples:**

```regex
# Exact match
^/checkout$

# Starts with
^/products/

# Contains
blog

# Ends with
\.pdf$

# Digits
\d+

# Word characters
[\w-]+

# Optional group
(/subcategory)?

# Multiple options
^/(checkout|cart|payment)

# Case-insensitive
(?i)pdf
```

**Default Value:**

Set a fallback when no pattern matches:

```
Set Default Value: ✓
  Default Value: uncategorized
```

### Lookup Table Variable

Maps exact input values to output values.

**Purpose:**
- Simple key-value mapping
- Exact match transformation
- No regex needed

**Configuration:**

```
Variable Type: Lookup Table
Input Variable: {{DLV - User Type}}
Set Default Value: (optional)
  Default Value: unknown

Input      | Output
-----------|----------
premium    | high
standard   | medium
basic      | low
trial      | trial
```

**Examples:**

**User Tier Mapping:**

```
Input Variable: {{DLV - User Type}}

Input          | Output
---------------|------------
enterprise     | tier_1
business       | tier_2
professional   | tier_3
starter        | tier_4
Default Value: tier_5
```

**Currency Symbol:**

```
Input Variable: {{DLV - Currency}}

Input  | Output
-------|--------
USD    | $
EUR    | €
GBP    | £
JPY    | ¥
Default Value: $
```

**Page Type Mapping:**

```
Input Variable: {{Page Hostname}}

Input                  | Output
-----------------------|--------
www.example.com        | main_site
shop.example.com       | shop
blog.example.com       | blog
support.example.com    | support
Default Value: unknown
```

**When to Use:**

- **Lookup Table** - Exact string matches, simple mapping
- **Regex Table** - Pattern matching, complex rules, RE2 regex

### Constant Variable

Stores a fixed value.

**Purpose:**
- Store IDs and tokens
- Reusable configuration values
- Easy updates across container

**Configuration:**

```
Variable Type: Constant
Value: G-XXXXXXXXXX
```

**Examples:**

```
Name: Constant - GA4 Measurement ID
Value: G-XXXXXXXXXX
Use: In GA4 Configuration Tag

Name: Constant - Google Ads Conversion ID
Value: AW-123456789
Use: In Google Ads tags

Name: Constant - Environment
Value: production
Use: Conditional logic

Name: Constant - Tracking Enabled
Value: true
Use: Enable/disable tracking
```

**Benefits:**

- **Single source of truth** - Update once, applies everywhere
- **Easy migration** - Change IDs in one place
- **Clarity** - Descriptive variable names vs hardcoded IDs

**Example Usage:**

```
Instead of:
  Measurement ID: G-XXXXXXXXXX (hardcoded in 10 tags)

Use:
  Measurement ID: {{Constant - GA4 Measurement ID}}
  (update constant once, affects all tags)
```

### Custom Event Variable

Returns the name of the current event.

**Purpose:**
- Get event name in tags
- Conditional logic based on event
- Debug event tracking

**Configuration:**

```
Variable Type: Custom Event
(no additional configuration)
```

**Returns:**

Current event name from data layer or GTM:

```javascript
dataLayer.push({'event': 'purchase'});
// {{Event}} returns: "purchase"

// Page load
// {{Event}} returns: "gtm.js"

// DOM Ready
// {{Event}} returns: "gtm.dom"

// Click
// {{Event}} returns: "gtm.click"
```

**Use Cases:**

```
Tag Configuration:
  Event Name: {{Event}}
  (sends current event name as parameter)

Custom JavaScript:
  var event = {{Event}};
  if (event === 'purchase') {
    return 'conversion';
  }

Trigger Condition:
  {{Event}} equals virtualPageview
```

### Element Visibility Variable

Stores visibility information for elements.

**Purpose:**
- Access visibility metrics
- Track how visible elements are
- Measure engagement

**Configuration:**

```
Variable Type: Element Visibility
(automatically available with Element Visibility trigger)
```

**Available Variables:**

- `{{Percent Visible}}` - Percentage of element visible (0-100)
- `{{On-Screen Duration}}` - Time visible in milliseconds

**Use with Element Visibility Trigger:**

```
Trigger: Element Visibility
Element ID: featured-product
Minimum Percent Visible: 50%

Tag fires with variables:
  {{Percent Visible}} = 75 (example)
  {{On-Screen Duration}} = 2500 (example)
```

### Auto-Event Variable

Returns values from auto-event triggers.

**Purpose:**
- Access event-specific data
- Get click, form, scroll data
- Reference auto-event values

**Examples:**

**Click Variables:**
- `{{Click Element}}`
- `{{Click ID}}`
- `{{Click Classes}}`
- `{{Click URL}}`
- `{{Click Text}}`

**Form Variables:**
- `{{Form Element}}`
- `{{Form ID}}`
- `{{Form Classes}}`
- `{{Form URL}}`

**Scroll Variables:**
- `{{Scroll Depth Threshold}}`
- `{{Scroll Depth Units}}`

**Video Variables:**
- `{{Video Status}}`
- `{{Video URL}}`
- `{{Video Percent}}`

Enable in Variables → Configure Built-In Variables

### HTTP Referrer Variable

Extracts components from the referrer URL.

**Purpose:**
- Parse referrer URL
- Extract referrer domain
- Get referrer query parameters
- Track traffic sources

**Configuration:**

```
Variable Type: HTTP Referrer
Component Type: URL / Protocol / Hostname / Path / Query / Fragment / Port
Query Key: (if Component Type = Query)
```

**Examples:**

```
Name: HTTP Referrer - Hostname
Component Type: Hostname
Returns: google.com

Name: HTTP Referrer - Search Query
Component Type: Query
Query Key: q
Returns: Search query from Google
```

**Use Cases:**

```
Trigger Condition:
  {{HTTP Referrer - Hostname}} contains google
  (fire on traffic from Google)

Tag Parameter:
  referrer_domain = {{HTTP Referrer - Hostname}}
  (send referrer domain to analytics)
```

### DOM Element Variable

Extracts data from DOM elements using CSS selectors.

**Purpose:**
- Read text from page elements
- Get attribute values
- Access dynamic page content
- Extract structured data

**Configuration:**

```
Variable Type: DOM Element
Selection Method: CSS Selector / ID
Element Selector: .product-price
  OR
Element ID: product-sku

Attribute Name: (optional)
  data-product-id
  href
  src
  etc.
```

**Examples:**

**Extract Text Content:**

```
Name: DOM - Product Price
Selection Method: CSS Selector
Element Selector: .product-price
Returns: "$99.99"
```

**Extract Attribute:**

```
Name: DOM - Product SKU
Selection Method: ID
Element ID: product-info
Attribute Name: data-sku
Returns: "PROD-12345"
```

**Extract href:**

```
Name: DOM - Canonical URL
Selection Method: CSS Selector
Element Selector: link[rel="canonical"]
Attribute Name: href
Returns: Canonical URL
```

**Use Cases:**

```javascript
// Product page tracking
dataLayer.push({
  'event': 'product_view',
  'productSku': {{DOM - Product SKU}},
  'productPrice': {{DOM - Product Price}}
});

// Dynamic content
Trigger Condition:
  {{DOM - Element Text}} contains "In Stock"
```

**Important:**
- Element must exist when variable evaluates
- Returns first matching element
- Returns empty if element not found

## Variable Configuration

### Creating Variables

1. **Variables → New**
2. **Click variable configuration area**
3. **Choose variable type**
4. **Configure settings**
5. **Name variable** (use consistent naming convention)
6. **Save**

### Variable Formatting

Some variables offer formatting options:

**Text Transformations:**
- Lowercase
- Uppercase
- No formatting

**URI Decoding:**
- Decode URI-encoded values
- Useful for cookies and URLs

**Strip www:**
- Remove "www." from hostnames

### Variable Default Values

Set fallback values when variable is undefined:

```
Data Layer Variable:
  Set Default Value: ✓
  Default Value: not-set
```

**When to use:**
- Prevent undefined values in tags
- Ensure clean data
- Avoid empty parameters

### Variable Version History

GTM tracks variable changes:

**View History:**
Variables → Select Variable → Versions tab

**Compare Versions:**
- See what changed
- Restore previous version
- Audit trail

## Advanced Variable Concepts

### Variable Macros

Variables can reference other variables:

```
Custom JavaScript Variable:
function() {
  var path = {{Page Path}};
  var category = {{DLV - Category}};

  return path + ' | ' + category;
}

Returns: "/products/item | electronics"
```

### Nested Variables

Variables within variables:

```
Lookup Table:
Input Variable: {{DLV - User Type}}

Input      | Output
-----------|---------------------------
premium    | {{Constant - Premium ID}}
standard   | {{Constant - Standard ID}}
```

### Variable Precedence

When multiple data layer pushes contain the same key:

```javascript
// Initial push
dataLayer.push({'category': 'electronics'});

// Later push
dataLayer.push({'category': 'computers'});

// {{DLV - Category}} returns: "computers" (latest value)
```

**Data Layer Version 2** merges objects:

```javascript
dataLayer.push({
  'user': {
    'id': '123',
    'type': 'premium'
  }
});

dataLayer.push({
  'user': {
    'name': 'John'
  }
});

// Result (merged):
user: {
  id: '123',
  type: 'premium',
  name: 'John'
}
```

### Undefined Variable Handling

When a variable is undefined:

**In Tags:**
- GTM may send empty string ""
- Or literal "undefined"
- Set default values to control behavior

**In Triggers:**
- Undefined ≠ empty string
- Use "is defined" / "is not defined" operators
- Check existence before comparing values

**Best Practice:**

```
Trigger Condition:
  {{DLV - User ID}} is defined
  AND
  {{DLV - User ID}} does not equal ""
```

### Variable Caching

GTM caches variable values during tag firing:

**Within single event:**
- Variable evaluates once
- Same value used across all tags for that event

**Across events:**
- Variables re-evaluate for each new event

**Example:**

```javascript
// Event 1
dataLayer.push({'event': 'pageview', 'value': 100});
// {{DLV - Value}} = 100 for all tags firing on this event

// Event 2
dataLayer.push({'event': 'click', 'value': 200});
// {{DLV - Value}} = 200 for all tags firing on this event
```

## Best Practices

### Variable Naming Conventions

Use consistent, descriptive naming:

```
[Type Prefix] - [Purpose]
```

**Examples:**

- `DLV - User ID` (Data Layer Variable)
- `JS - Page Category` (Custom JavaScript)
- `Constant - GA4 Measurement ID`
- `1P Cookie - Session ID` (First Party Cookie)
- `URL - UTM Source` (URL Variable)
- `Regex Table - Page Type`
- `Lookup - User Tier`

**Type Prefixes:**

```
DLV       - Data Layer Variable
JS        - Custom JavaScript
Constant  - Constant
1P Cookie - First Party Cookie
URL       - URL Variable
HTTP Ref  - HTTP Referrer
DOM       - DOM Element
```

### When to Use Constants vs Variables

**Use Constant when:**
- Value never changes (IDs, tokens)
- Same value across all instances
- Easy updates needed

**Use Data Layer Variable when:**
- Value changes per page/event
- Dynamic user data
- Custom event data

**Use Custom JavaScript when:**
- Need to compute value
- Transform or combine data
- Complex logic required

### Performance Optimization

**Minimize Custom JavaScript:**
- Use built-in variables when possible
- Keep code simple and fast
- Avoid heavy DOM manipulation
- Cache results when appropriate

**Data Layer Best Practices:**
- Push data before GTM container loads
- Use consistent naming
- Structure data logically
- Don't push PII

**Variable Efficiency:**
- Reuse constants across container
- Don't create duplicate variables
- Regular cleanup of unused variables

### Debugging Variables

**Preview Mode:**

1. Enable Preview
2. Navigate to page
3. Select event in debug panel
4. Click "Variables" tab
5. See all variable values for that event

**Console Debugging:**

```javascript
// Check data layer
console.log(dataLayer);

// Check specific variable in GTM object
console.log(google_tag_manager['GTM-XXXXXX'].dataLayer.get('variableName'));
```

**Common Issues:**

**Variable is undefined:**
- Data not in data layer yet
- Typo in variable name
- Data layer push after GTM evaluated

**Variable has wrong value:**
- Data layer structure mismatch
- Timing issue (evaluated too early/late)
- Cached old value

**Variable not updating:**
- Data layer not pushing new value
- Variable caching within event
- Need to use Custom Event to re-evaluate

## Resources

### Official Documentation

- [GTM Variables Guide](https://support.google.com/tagmanager/topic/7182737)
- [Built-in Variables Reference](https://support.google.com/tagmanager/answer/7182738)
- [Data Layer Variables](https://developers.google.com/tag-platform/tag-manager/web/datalayer)
- [Custom JavaScript Variables](https://support.google.com/tagmanager/answer/7683362)

### Related GTM Skills

- [GTM Tags](./tags.md) - Comprehensive tag documentation
- [GTM Triggers](./triggers.md) - Trigger types and configuration
- [GTM Data Layer](../../gtm-datalayer/gtm-datalayer/references/datalayer-fundamentals.md) - Data layer implementation
- [GTM Best Practices](./best-practices.md) - Naming, ES5, RE2 regex

### Tools

- [Babel REPL](https://babeljs.io/repl) - ES6 to ES5 transpilation
- [Regex101](https://regex101.com/) - Test regex (select "Golang" for RE2)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)
- [Data Layer Inspector Chrome Extension](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke)

### Community

- [GTM Community Forum](https://support.google.com/tagmanager/community)
- [Simo Ahava's Blog](https://www.simoahava.com/)
- [Analytics Mania](https://www.analyticsmania.com/)
- [MeasureSchool](https://measureschool.com/)
