---
name: gtm-variables
description: Expert guidance for configuring Google Tag Manager variables including built-in variables (Page URL, Page Path, Referrer, Click variables, Form variables), data layer variables, custom JavaScript variables, first-party cookies, lookup tables, regex tables, constant variables, URL variables, DOM element variables, auto-event variables, container variables, and user-defined variables. Use when creating variables, configuring data layer variables, writing custom JavaScript variables, parsing URLs, reading cookies, setting up lookup tables, extracting values from DOM elements, debugging variable values, or working with variable formatting and transformations.
---

# GTM Variables Configuration

## Overview
Expert guidance for configuring all types of variables in Google Tag Manager that capture, store, and reuse dynamic values across tags and triggers.

## When to Use This Skill
Invoke this skill when:
- Creating or configuring GTM variables
- Setting up data layer variables
- Writing custom JavaScript variables
- Working with built-in variables
- Parsing URL parameters or components
- Reading first-party cookies
- Creating lookup tables or regex tables
- Extracting values from DOM elements
- Setting up constant values
- Debugging variable values in Preview mode
- Formatting or transforming variable data
- Optimizing variable performance

## Built-in Variables

Built-in variables are pre-configured by GTM. Enable them in Variables → Configure:

### Page Variables
- **Page URL** - Full URL of current page
- **Page Hostname** - Domain name
- **Page Path** - Path portion of URL (after domain)
- **Referrer** - Previous page URL
- **Random Number** - Random number for cache busting

### Click Variables
(Enable when using click triggers)
- **Click Element** - Clicked DOM element
- **Click Classes** - CSS classes of clicked element
- **Click ID** - ID attribute of clicked element
- **Click Target** - Target attribute of clicked link
- **Click URL** - href of clicked link
- **Click Text** - Text content of clicked element

### Form Variables
(Enable when using form triggers)
- **Form Element** - Submitted form DOM element
- **Form Classes** - CSS classes of form
- **Form ID** - ID attribute of form
- **Form Target** - Target attribute of form
- **Form URL** - Action URL of form
- **Form Text** - Text content of form

### Error Variables
(Enable for JavaScript error tracking)
- **Error Message** - JavaScript error message
- **Error URL** - URL where error occurred
- **Error Line** - Line number of error
- **Debug Mode** - Whether Preview mode is active

### Video Variables
(Enable for YouTube video tracking)
- **Video Provider** - Video platform (YouTube)
- **Video Status** - Play state (start, pause, complete)
- **Video URL** - URL of video
- **Video Title** - Title of video
- **Video Duration** - Length of video
- **Video Current Time** - Playback position
- **Video Percent** - Percentage watched

### Scroll Variables
- **Scroll Depth Threshold** - Percentage depth reached
- **Scroll Depth Units** - Pixels or percentage
- **Scroll Direction** - Vertical or horizontal

### Container Variables
- **Container ID** - GTM container ID
- **Container Version** - Published container version
- **Environment Name** - Environment (Live, Preview, etc.)

### History Variables
- **New History Fragment** - New URL fragment after history change
- **Old History Fragment** - Previous URL fragment
- **New History State** - New history state object
- **Old History State** - Previous history state

## User-Defined Variables

Create custom variables in Variables → New:

### Data Layer Variable
Most common variable type for accessing data layer values.

**Configuration:**
- **Data Layer Variable Name**: Path to value in data layer
  - Use dot notation: `ecommerce.purchase.transaction_id`
  - Use bracket notation for arrays: `products.0.name`
- **Data Layer Version**: Usually "Version 2"
- **Default Value**: Fallback if variable not found

**Example:**
```javascript
// Data Layer:
dataLayer.push({
  'event': 'purchase',
  'userId': '12345',
  'ecommerce': {
    'transaction_id': 'T_12345',
    'value': 99.99
  }
});

// Variables:
userId → "12345"
ecommerce.transaction_id → "T_12345"
ecommerce.value → 99.99
```

### Custom JavaScript Variable
Execute JavaScript to return dynamic values.

**Best Practices:**
- Keep code simple and fast
- Always return a value
- Use for complex logic not possible with other variable types
- Avoid DOM manipulation (read-only)
- Test thoroughly

**Example:**
```javascript
function() {
  // Get current date
  return new Date().toISOString();
}
```

```javascript
function() {
  // Get query parameter
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('utm_campaign') || 'direct';
}
```

```javascript
function() {
  // Format price
  var price = {{DL - Price}}; // Reference another variable
  return '$' + parseFloat(price).toFixed(2);
}
```

### First-Party Cookie
Read cookie values from the browser.

**Configuration:**
- **Cookie Name**: Name of cookie to read
- **URL Decode**: Decode URI-encoded values
- **Default Value**: Return if cookie not found

**Example:**
- Cookie Name: `_ga` → Read Google Analytics cookie
- Cookie Name: `user_consent` → Read custom consent cookie

### Constant
Store static values to reuse across tags.

**Use Cases:**
- GA4 Measurement ID
- Google Ads Conversion ID
- API keys (if not sensitive)
- Common parameter values

**Example:**
- Constant: `G-XXXXXXXXXX` (GA4 Measurement ID)
- Constant: `AW-123456789` (Google Ads ID)

### URL Variable
Parse components from current page URL or custom URL.

**Component Types:**
- Full URL
- Protocol
- Hostname
- Port
- Path
- Query
- Fragment
- Specific Query Parameter

**Example:**
URL: `https://example.com/products?category=shoes&sale=true#top`

- Component: Hostname → `example.com`
- Component: Path → `/products`
- Component: Query → `category=shoes&sale=true`
- Component: Query Key `category` → `shoes`
- Component: Fragment → `top`

### Lookup Table
Map input values to output values (like a switch statement).

**Configuration:**
- **Input Variable**: Variable to check
- **Lookup Table**: Input → Output mappings
- **Default Value**: Return if no match

**Example:**
Input: {{Page Path}}
| Input | Output |
|-------|--------|
| / | homepage |
| /products | product_listing |
| /checkout | checkout |
Default: other

### RegEx Table
Similar to Lookup Table but uses Regular Expressions for pattern matching.

**Configuration:**
- **Input Variable**: Variable to check
- **Pattern Table**: RegEx patterns → Output values
- **Default Value**: Return if no match

**Example:**
Input: {{Page Path}}
| Pattern | Output |
|---------|--------|
| ^/$ | homepage |
| ^/products/.* | product_page |
| ^/blog/.* | blog_post |
| ^/checkout | checkout |
Default: other

### DOM Element
Extract values from page elements using CSS selectors.

**Configuration:**
- **Selection Method**: CSS Selector or Element ID
- **Selector**: CSS selector or ID
- **Attribute Name**: Which attribute to get (blank = text content)

**Examples:**
- Selector: `h1` → Get first H1 text
- Selector: `#product-price`, Attribute: `data-price` → Get price from data attribute
- Selector: `.user-email` → Get email element text

### Auto-Event Variable
Access properties of auto-events (clicks, forms, etc.).

**Variable Type**: Select specific auto-event property
- Click Element, Click Classes, Click ID, etc.
- Form Element, Form Classes, Form ID, etc.

These are usually just enabled as built-in variables instead.

### Custom Event Variable
Access event parameters from enhanced measurement or custom events.

**Configuration:**
- **Event Parameter**: Name of parameter to capture
- Works with GA4 events

### Google Sheets Variable
(Available in GTM web containers)
Fetch values from Google Sheets.

**Use Cases:**
- Dynamic lookup tables
- A/B test configurations
- Feature flags

### HTTP Referrer
Get the referrer URL (same as built-in Referrer variable, but user-defined for custom formatting).

### JavaScript Variable
Access global JavaScript variables.

**Configuration:**
- **Global Variable Name**: Name of window variable
- Use dot notation for nested properties

**Example:**
- Global Variable Name: `dataLayer` → Access data layer array
- Global Variable Name: `user.email` → Access window.user.email

## Common Workflows

### Create Data Layer Variable
1. Variables → New → Data Layer Variable
2. Set Data Layer Variable Name (e.g., `userId`)
3. Set Default Value (optional)
4. Save with clear name: `DL - User ID`
5. Test in Preview mode → Variables tab

### Create Custom JavaScript Variable
1. Variables → New → Custom JavaScript
2. Write function that returns value:
   ```javascript
   function() {
     return /* your logic */;
   }
   ```
3. Test return value in Preview mode
4. Save with clear name: `CJS - Description`

### Create Lookup Table
1. Variables → New → Lookup Table
2. Select Input Variable
3. Add Input → Output mappings
4. Set Default Value
5. Test with various inputs in Preview mode
6. Save with clear name: `LUT - Description`

### Parse URL Parameter
1. Variables → New → URL
2. Component Type: Query
3. Query Key: parameter name (e.g., `utm_source`)
4. Default Value: `(direct)` or other fallback
5. Save as: `URL - UTM Source`

### Read Cookie Value
1. Variables → New → 1st Party Cookie
2. Cookie Name: cookie to read
3. Enable URL Decode if needed
4. Set Default Value if cookie might not exist
5. Save as: `Cookie - Name`

## Best Practices

### Variable Naming
Use consistent prefix format: `[Type] - [Description]`

Examples:
- `DL - User ID` (Data Layer)
- `CJS - Format Price` (Custom JavaScript)
- `URL - UTM Campaign` (URL)
- `Cookie - Session ID` (First-Party Cookie)
- `Constant - GA4 ID` (Constant)
- `LUT - Page Type` (Lookup Table)

### Performance Optimization
- Prefer built-in variables over custom JavaScript
- Prefer data layer variables over DOM scraping
- Keep custom JavaScript simple and fast
- Avoid DOM queries in custom JavaScript when possible
- Cache complex calculations in data layer instead
- Remove unused variables regularly

### Common Pitfalls
- **Undefined variables**: Check spelling, data layer structure, timing
- **Empty values**: Set meaningful default values
- **Variable not updating**: Ensure data layer push happens before variable read
- **Performance issues**: Avoid complex DOM queries in custom JS variables

### Data Layer Best Practices
- Push data to data layer before GTM fires
- Use consistent data layer structure
- Document data layer schema
- Validate data layer in Preview mode
- See **gtm-datalayer** skill for advanced patterns

## References
- **references/variables.md** - Comprehensive variable configuration guide with all variable types and advanced patterns
- **references/google-rew-regular-expressions-syntax.txt** - RegEx syntax for regex tables

Search reference files for specific topics:
```bash
grep -r "Data Layer Variable" references/
grep -r "Custom JavaScript" references/
grep -r "Lookup Table" references/
```

## Integration with Other Skills
- **gtm-tags** - Use variables in tag configuration
- **gtm-triggers** - Use variables in trigger conditions
- **gtm-datalayer** - Implement data layer for data layer variables
- **gtm-debugging** - Debug variable values in Preview mode
- **gtm-setup** - Enable built-in variables
- **gtm-best-practices** - Variable naming conventions and optimization

## Quick Reference

### Variable Type Selection Guide
- **From data layer**: Data Layer Variable
- **From URL**: URL Variable
- **From cookie**: 1st Party Cookie
- **From page element**: DOM Element Variable
- **Static value**: Constant
- **Complex logic**: Custom JavaScript
- **Value mapping**: Lookup Table or RegEx Table
- **Auto-event data**: Built-in Variables (enable them)

### Common Custom JavaScript Patterns
```javascript
// Get current timestamp
function() {
  return Date.now();
}

// Get query parameter
function() {
  var params = new URLSearchParams(window.location.search);
  return params.get('campaign') || 'none';
}

// Format currency
function() {
  var value = {{DL - Price}};
  return '$' + parseFloat(value).toFixed(2);
}

// Get array length
function() {
  var items = {{DL - Cart Items}} || [];
  return items.length;
}
```

### Debugging Checklist
- [ ] Variable name matches data layer path exactly
- [ ] Data layer push happens before variable is read
- [ ] Default value is set for optional variables
- [ ] Built-in variables are enabled
- [ ] Testing in Preview mode → Variables tab
- [ ] Checking variable value at right event
