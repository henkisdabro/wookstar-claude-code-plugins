# Google Tag Manager - Triggers

## Overview

Triggers define when tags should fire in Google Tag Manager. They are the "when" component of the Tag-Trigger-Variable system that powers GTM implementations.

**What Triggers Do:**

- Control when tags execute
- Evaluate conditions based on page events and user interactions
- Filter tag firing using conditions and variables
- Support multiple events types (page views, clicks, form submissions, custom events)

## Regular Expressions in Triggers (RE2 Format)

**CRITICAL:** Google Tag Manager uses **RE2 (GoLang regex)** format, NOT standard JavaScript/PCRE regex.

### RE2 vs Standard Regex

**NOT Supported in RE2:**

- ❌ Backreferences: `\1`, `\2`, `\g{name}`
- ❌ Lookahead assertions: `(?=...)`, `(?!...)`
- ❌ Lookbehind assertions: `(?<=...)`, `(?<!...)`
- ❌ Conditional expressions: `(?(condition)yes|no)`
- ❌ Possessive quantifiers: `*+`, `++`

**Supported in RE2:**

- ✅ Character classes: `[abc]`, `[^abc]`, `[a-z]`
- ✅ Quantifiers: `*`, `+`, `?`, `{n,m}`
- ✅ Anchors: `^`, `$`, `\A`, `\z`
- ✅ Perl character classes: `\d`, `\w`, `\s`
- ✅ Groups: `(...)`, `(?:...)` (non-capturing)
- ✅ Named groups: `(?P<name>...)`
- ✅ Alternation: `|`
- ✅ Case-insensitive flag: `(?i)`

### Common RE2 Patterns for Triggers

**Match Page URLs:**

```regex
# Exact match
^https://example\.com/page$

# Contains specific path
/checkout/

# Query parameter present
\?utm_source=

# Multiple domains
^https://(www\.)?example\.(com|net)

# Product pages (ends with digits)
/product/\d+$

# Any subdomain
^https://[^.]+\.example\.com/
```

**Match Click URLs:**

```regex
# PDF downloads
\.pdf$

# External links (not your domain)
^https?://(?!example\.com)

# Telephone links
^tel:

# Email links
^mailto:

# File downloads
\.(pdf|docx?|xlsx?|zip)$
```

**Match Form IDs and Classes:**

```regex
# Form ID starts with "contact"
^contact

# Form class contains "newsletter"
newsletter

# Multiple form IDs
^(contact-form|signup-form|subscribe)$
```

**Case-Insensitive Matching:**

```regex
# Case-insensitive flag at start
(?i)^/checkout

# Matches: /checkout, /Checkout, /CHECKOUT
(?i)\.pdf$

# Matches: .pdf, .PDF, .Pdf
```

**Path Matching:**

```regex
# Blog posts with year/month/day structure
^/blog/\d{4}/\d{2}/\d{2}/

# Category pages with optional subcategory
^/category/[\w-]+(/[\w-]+)?$

# User profile pages
^/user/[^/]+$

# API endpoints
^/api/v\d+/
```

**See Also:**

- [Best Practices - Regular Expressions in GTM](./best-practices.md#regular-expressions-in-google-tag-manager-re2-format) for RE2 guidelines
- Complete RE2 syntax: `.claude/skills/gtm-core/gtm-core/references/google-rew-regular-expressions-syntax.txt`

## Trigger Basics

### How Triggers Work

1. **Event occurs** - User action or page state change
2. **Trigger evaluates** - GTM checks trigger conditions
3. **Conditions match** - All filters evaluate to true
4. **Tag fires** - Associated tag executes

### Trigger Components

- **Trigger Type** - Defines the event (Page View, Click, Custom Event, etc.)
- **Trigger Conditions** - Filters that must match for trigger to fire
- **Operator** - How to compare values (equals, contains, matches regex, etc.)
- **Value** - The expected value to match against

### Trigger Evaluation

Triggers evaluate on each GTM event:

```
Event: gtm.dom
  → Check all triggers for event type "DOM Ready"
  → Evaluate each trigger's conditions
  → Fire matching tags
```

### Multiple Conditions (AND Logic)

When a trigger has multiple conditions, ALL must be true:

```
Condition 1: Page Path contains /checkout
AND
Condition 2: Referrer contains google.com
AND
Condition 3: Cookie - user_type - equals - premium

All three conditions must match for trigger to fire
```

### Some/All Pages or Elements

Many triggers offer "Some" or "All" options:

**All Pages:**
- Fires on every page
- No additional conditions

**Some Pages:**
- Fires only when conditions match
- Requires at least one filter condition

**Example:**

```
Trigger Type: Page View
This trigger fires on: Some Page Views
  Page Path contains /products/
  AND
  Page Hostname equals www.example.com
```

## Trigger Types

### Pageview Triggers

#### Page View

Fires when GTM container loads on a page.

**Event:** `gtm.js`

**Common Use Cases:**

- Fire tags on all pages
- Track specific page views
- Initialize analytics configuration

**Configuration:**

```
Trigger Type: Page View
This trigger fires on: All Pages
```

or

```
Trigger Type: Page View
This trigger fires on: Some Page Views
  Page Path contains /products/
```

**Examples:**

```
Name: Pageview - All Pages
Type: Page View
Fires on: All Pages
Use: Fire GA4 Config tag everywhere
```

```
Name: Pageview - Thank You Pages
Type: Page View
Fires on: Some Page Views
  Page Path matches RegEx: /(thank-you|confirmation|success)
Use: Fire conversion tags
```

```
Name: Pageview - Product Category
Type: Page View
Fires on: Some Page Views
  Page Path starts with /category/
  AND Page Path does not contain /admin/
Use: Track category page views
```

#### DOM Ready

Fires when the DOM (Document Object Model) is fully constructed but before all resources load.

**Event:** `gtm.dom`

**Timing:** After DOM built, before images/stylesheets fully loaded

**Common Use Cases:**

- Access DOM elements before page fully renders
- Set up event listeners
- Modify page content early
- Better performance than Window Loaded for tags that don't need full page load

**Configuration:**

```
Trigger Type: DOM Ready
This trigger fires on: All Pages
```

**Example:**

```
Name: DOM Ready - All Pages
Type: DOM Ready
Fires on: All Pages
Use: Initialize chat widget before page fully loads
```

**Timeline:**

```
1. GTM Container Loads → Page View (gtm.js)
2. DOM Constructed → DOM Ready (gtm.dom)
3. All Resources Loaded → Window Loaded (gtm.load)
```

#### Window Loaded

Fires when the page is fully loaded, including all resources (images, scripts, stylesheets).

**Event:** `gtm.load`

**Timing:** After all page resources completely loaded

**Common Use Cases:**

- Tags that need complete page context
- Performance measurements (load time)
- Tags that shouldn't impact page speed
- Third-party widgets that depend on full page load

**Configuration:**

```
Trigger Type: Window Loaded
This trigger fires on: All Pages
```

**Example:**

```
Name: Window Loaded - Home Page
Type: Window Loaded
Fires on: Some Page Views
  Page Path equals /
Use: Fire non-critical tags after page fully loads
```

**When to Use Each Pageview Trigger:**

| Trigger Type | Use When | Performance Impact |
|-------------|----------|-------------------|
| Page View | Need tag to fire immediately | Low |
| DOM Ready | Need DOM access, don't need resources | Medium |
| Window Loaded | Need full page context, non-critical tags | High (delayed) |

### Click Triggers

#### All Elements

Fires when user clicks any element on the page.

**Event:** `gtm.click`

**Common Use Cases:**

- Track button clicks
- Track link clicks
- Track custom element interactions
- Track clicks on dynamically generated elements

**Built-in Click Variables:**

- `{{Click Element}}` - The clicked DOM element
- `{{Click Classes}}` - CSS classes of clicked element
- `{{Click ID}}` - ID attribute of clicked element
- `{{Click Target}}` - Target attribute value
- `{{Click URL}}` - href attribute (for links)
- `{{Click Text}}` - Text content of clicked element

**Configuration:**

```
Trigger Type: All Elements
This trigger fires on: Some Clicks
  Click Text equals Sign Up
```

**Examples:**

```
Name: Click - CTA Buttons
Type: All Elements
Fires on: Some Clicks
  Click Classes contains cta-button
Use: Track call-to-action button clicks
```

```
Name: Click - Add to Cart
Type: All Elements
Fires on: Some Clicks
  Click ID equals add-to-cart-btn
Use: Track add to cart events
```

```
Name: Click - Outbound Links
Type: All Elements
Fires on: Some Clicks
  Click URL does not contain example.com
  AND Click URL matches RegEx: ^https?://
Use: Track external link clicks
```

```
Name: Click - Download PDFs
Type: All Elements
Fires on: Some Clicks
  Click URL matches RegEx: \.pdf$
Use: Track PDF downloads
```

**Enable Click Variables:**

Variables → Configure Built-In Variables → Clicks

#### Just Links

Fires only when user clicks links (`<a>` tags with `href` attribute).

**Event:** `gtm.linkClick`

**Optimized for:** Link tracking with automatic wait time for tag to fire before navigation

**Wait for Tags:** GTM waits up to 2 seconds for tags to fire before following link

**Common Use Cases:**

- Track navigation links
- Track external links
- Track file downloads
- Outbound link tracking

**Configuration:**

```
Trigger Type: Just Links
This trigger fires on: Some Link Clicks
  Click URL contains example.com
Wait for Tags: 2000 milliseconds
Check Validation: false
```

**Examples:**

```
Name: Click - External Links
Type: Just Links
Fires on: Some Link Clicks
  Click URL does not contain {{Page Hostname}}
  AND Click URL matches RegEx: ^https?://
Use: Track clicks to external websites
```

```
Name: Click - Email Links
Type: Just Links
Fires on: Some Link Clicks
  Click URL starts with mailto:
Use: Track email link clicks
```

```
Name: Click - Phone Links
Type: Just Links
Fires on: Some Link Clicks
  Click URL starts with tel:
Use: Track phone number clicks
```

```
Name: Click - File Downloads
Type: Just Links
Fires on: Some Link Clicks
  Click URL matches RegEx: \.(pdf|docx?|xlsx?|zip|csv)$
Use: Track file download clicks
```

**Settings:**

- **Wait for Tags:** Max time (ms) to wait before following link (default: 2000ms)
- **Check Validation:** Wait for form validation before firing (default: false)
- **Enable when:** Additional conditions for trigger to be active

**All Elements vs Just Links:**

| Feature | All Elements | Just Links |
|---------|-------------|------------|
| Fires on | Any element | Only `<a>` tags |
| Wait for tags | No | Yes (prevents navigation) |
| Performance | Lower (all clicks) | Better (links only) |
| Use for | Buttons, divs, any element | Navigation, downloads |

### User Engagement Triggers

#### Element Visibility

Fires when a specific element becomes visible in the viewport.

**Event:** `gtm.elementVisibility`

**Common Use Cases:**

- Track ad impressions
- Track scroll-to-content
- Lazy load tracking
- Measure content engagement

**Configuration:**

```
Trigger Type: Element Visibility
Selection Method: ID / CSS Selector
Element ID: featured-product
  OR
Element Selector: .product-card

When to fire this trigger:
  ☑ Once per page
  ☐ Once per element
  ☐ Every time an element appears on screen

Minimum Percent Visible: 50%
Minimum On-Screen Duration: 1000 milliseconds

This trigger fires on: All Pages
```

**Examples:**

```
Name: Visibility - Hero Banner
Type: Element Visibility
Element ID: hero-banner
Fires when: Once per page
Percent Visible: 50%
On-Screen Duration: 2000ms
Use: Track hero banner impressions
```

```
Name: Visibility - Product Cards
Type: Element Visibility
Element Selector: .product-card
Fires when: Once per element
Percent Visible: 75%
On-Screen Duration: 500ms
Fires on: Some Pages
  Page Path contains /products/
Use: Track which products users view
```

**Advanced Options:**

- **Observe DOM changes** - Track dynamically added elements
- **Advanced matching** - Multiple selectors using CSS

**Built-in Variables:**

Enable Element Visibility variables:
- `{{Percent Visible}}` - Percentage of element visible
- `{{On-Screen Duration}}` - How long visible (ms)

#### Form Submission

Fires when a user submits a form.

**Event:** `gtm.formSubmit`

**Common Use Cases:**

- Track form submissions
- Track lead generation
- Track newsletter signups
- Fire conversion tags

**Configuration:**

```
Trigger Type: Form Submission
This trigger fires on: All Forms
  OR
This trigger fires on: Some Forms
  Form ID equals contact-form

Enable when:
  (optional conditions)

Wait for Tags: 2000 milliseconds
Check Validation: True
```

**Examples:**

```
Name: Form Submit - Contact Form
Type: Form Submission
Fires on: Some Forms
  Form ID equals contact-form
  OR Form Classes contains contact-form
Check Validation: True
Use: Track contact form submissions
```

```
Name: Form Submit - Newsletter Signup
Type: Form Submission
Fires on: Some Forms
  Form ID matches RegEx: (newsletter|subscribe)
Use: Track newsletter signups
```

```
Name: Form Submit - All Forms
Type: Form Submission
Fires on: All Forms
Check Validation: True
Except:
  Form ID equals search-form (handled separately)
Use: Track all form submissions except search
```

**Settings:**

- **Wait for Tags:** Time to wait for tags before form submits (default: 2000ms)
- **Check Validation:** Only fire if form passes HTML5 validation (recommended: true)

**Built-in Form Variables:**

Enable in Variables → Configure:
- `{{Form ID}}` - Form's ID attribute
- `{{Form Classes}}` - Form's CSS classes
- `{{Form Target}}` - Form's target attribute
- `{{Form URL}}` - Form's action URL
- `{{Form Text}}` - Text content within form

**Important:** Never capture form field values containing PII (emails, names, phone numbers).

#### Scroll Depth

Fires when user scrolls to specific depths on a page.

**Event:** `gtm.scrollDepth`

**Common Use Cases:**

- Measure content engagement
- Track how far users scroll
- Identify drop-off points
- Understand content consumption

**Configuration:**

```
Trigger Type: Scroll Depth

Vertical Scroll Depths:
  Percentages: 25, 50, 75, 90, 100
  OR
  Pixels: 500, 1000, 2000

This trigger fires on: All Pages
  OR
This trigger fires on: Some Pages
  Page Path contains /blog/
```

**Examples:**

```
Name: Scroll Depth - Blog Posts
Type: Scroll Depth
Percentages: 25, 50, 75, 100
Fires on: Some Pages
  Page Path starts with /blog/
Use: Measure blog post engagement
```

```
Name: Scroll Depth - Home Page
Type: Scroll Depth
Percentages: 10, 25, 50, 75, 90
Fires on: Some Pages
  Page Path equals /
Use: Track homepage scroll behavior
```

```
Name: Scroll Depth - Long Form Content
Type: Scroll Depth
Pixels: 1000, 2000, 3000, 4000
Fires on: Some Pages
  Page Path contains /guides/
Use: Track reading depth on long guides
```

**Built-in Scroll Variables:**

Enable Scroll Depth variables:
- `{{Scroll Depth Threshold}}` - The threshold that was reached (e.g., "75")
- `{{Scroll Depth Units}}` - "percent" or "pixels"
- `{{Scroll Direction}}` - "vertical" or "horizontal"

**Best Practices:**

- Don't track too many thresholds (max 5-7)
- Use percentages for responsive design
- Consider page length when setting thresholds
- Combine with time on page for engagement metrics

#### YouTube Video

Fires when users interact with embedded YouTube videos.

**Event:** `gtm.video`

**Requires:** YouTube video embedded via iframe

**Common Use Cases:**

- Track video starts
- Track video completion
- Measure video engagement
- Track video progress

**Configuration:**

```
Trigger Type: YouTube Video
Capture: Start, Complete, Pause, Seeking, Buffering, Progress

Add JavaScript API support to all HTML5 videos: ☑

Progress Threshold (%): 10, 25, 50, 75, 90

This trigger fires on: Some Videos
  Video URL contains product-demo
```

**Examples:**

```
Name: Video - All Interactions
Type: YouTube Video
Capture:
  ☑ Start
  ☑ Complete
  ☑ Pause
  ☑ Progress
Progress: 25, 50, 75
Fires on: All Videos
Use: Track all video engagement
```

```
Name: Video - Product Demo Complete
Type: YouTube Video
Capture:
  ☑ Complete
Fires on: Some Videos
  Video URL contains product-demo
  OR Video Title contains Product Demo
Use: Track product demo completion
```

**Built-in Video Variables:**

Enable Video variables:
- `{{Video Status}}` - start, pause, complete, progress, etc.
- `{{Video URL}}` - YouTube video URL
- `{{Video Title}}` - Video title from YouTube
- `{{Video Duration}}` - Total video length (seconds)
- `{{Video Current Time}}` - Playback position (seconds)
- `{{Video Percent}}` - Percentage watched
- `{{Video Provider}}` - "youtube"
- `{{Video Visible}}` - true/false if video in viewport

**Supported Video Events:**

- **Start** - Video playback begins
- **Complete** - Video finishes
- **Pause** - User pauses video
- **Seeking** - User scrubs to different time
- **Buffering** - Video buffering
- **Progress** - Reaches progress thresholds

### Other Triggers

#### Custom Event

Fires when a specific custom event is pushed to the data layer.

**Event:** Custom event name from `dataLayer.push()`

**Common Use Cases:**

- Track business events (purchase, signup, login)
- Track SPA (Single Page App) page views
- Track custom user interactions
- Integrate with custom application logic

**Configuration:**

```
Trigger Type: Custom Event
Event name: purchase

Use regex matching: ☐

This trigger fires on: All Custom Events
  OR
This trigger fires on: Some Custom Events
  {{Transaction Value}} greater than 100
```

**Data Layer Push:**

```javascript
// Push custom event to data layer
dataLayer.push({
  'event': 'purchase',
  'transactionId': 'T12345',
  'transactionTotal': 99.99,
  'transactionProducts': [
    {
      'sku': 'PROD-001',
      'name': 'Product Name',
      'price': 99.99,
      'quantity': 1
    }
  ]
});
```

**Examples:**

```
Name: Custom Event - purchase
Type: Custom Event
Event name: purchase
Fires on: All Custom Events
Use: Fire conversion tags on purchase
```

```
Name: Custom Event - High Value Purchase
Type: Custom Event
Event name: purchase
Fires on: Some Custom Events
  {{DLV - Transaction Total}} greater than 500
Use: Track high-value purchases separately
```

```
Name: Custom Event - Virtual Pageview
Type: Custom Event
Event name: virtualPageview
Use: Track SPA navigation
```

```
Name: Custom Event - User Login
Type: Custom Event
Event name: user_login
Fires on: Some Custom Events
  {{DLV - User Type}} equals premium
Use: Track premium user logins
```

**Regex Matching:**

```
Event name: (purchase|transaction|order)
Use regex matching: ☑

Matches: purchase, transaction, or order events
```

**Best Practices:**

- Use consistent, descriptive event names
- Use snake_case naming: `user_signup`, `add_to_cart`
- Document all custom events
- Push event first in data layer object

#### Timer

Fires at specified time intervals.

**Event:** `gtm.timer`

**Common Use Cases:**

- Track engaged time on page
- Send heartbeat events
- Track video watch time
- Measure time to conversion

**Configuration:**

```
Trigger Type: Timer
Event Name: engagement_timer (custom name for this timer)
Interval: 30000 milliseconds (30 seconds)
Limit: 10 times

This trigger fires on: All Pages
  OR
This trigger fires on: Some Pages
  Page Path contains /article/
```

**Examples:**

```
Name: Timer - Engagement Heartbeat
Type: Timer
Event Name: engagement_timer
Interval: 30000 (30 seconds)
Limit: 20
Fires on: All Pages
Use: Track engaged time on site
```

```
Name: Timer - Article Reading Time
Type: Timer
Event Name: article_timer
Interval: 15000 (15 seconds)
Limit: 40
Fires on: Some Pages
  Page Path starts with /blog/
  OR Page Path starts with /articles/
Use: Measure article reading time
```

**Built-in Timer Variables:**

- `{{Timer Interval}}` - Configured interval (ms)
- `{{Event}}` - Will equal the Event Name you configured

**Calculating Elapsed Time:**

Combine with Custom JavaScript variable:

```javascript
function() {
  var interval = {{Timer Interval}};
  var limit = 20; // Your configured limit

  // Calculate elapsed time
  return interval * limit / 1000; // Returns seconds
}
```

**Settings:**

- **Event Name** - Custom name to identify this timer
- **Interval** - Time between fires (milliseconds)
- **Limit** - Max number of times to fire (blank = unlimited)

#### History Change

Fires when the URL changes without a full page reload (Single Page Applications).

**Event:** `gtm.historyChange`

**Common Use Cases:**

- Track SPA (Single Page App) navigation
- Track AJAX page transitions
- Track URL hash changes
- Track pushState/replaceState events

**Configuration:**

```
Trigger Type: History Change

This trigger fires on: All History Changes
  OR
This trigger fires on: Some History Changes
  Page Path contains /app/
```

**Examples:**

```
Name: History Change - SPA Navigation
Type: History Change
Fires on: All History Changes
Use: Track virtual pageviews in React/Vue/Angular apps
```

```
Name: History Change - App Section
Type: History Change
Fires on: Some History Changes
  Page Path starts with /app/
  AND Page Path does not contain /app/admin/
Use: Track navigation within app section
```

**When URLs Change:**

The trigger fires when:
- `history.pushState()` is called
- `history.replaceState()` is called
- Hash changes (`#section`)
- Back/forward browser navigation (within SPA)

**Common Implementation:**

```javascript
// In your SPA, after route change:
dataLayer.push({
  'event': 'virtualPageview',
  'pagePath': '/new-page',
  'pageTitle': 'New Page Title'
});
```

**Built-in Variables:**

Standard page variables update automatically:
- `{{Page URL}}`
- `{{Page Path}}`
- `{{Page Hostname}}`

#### JavaScript Error

Fires when JavaScript errors occur on the page.

**Event:** `gtm.jsError`

**Common Use Cases:**

- Track JavaScript errors
- Monitor site health
- Debug issues in production
- Send errors to error tracking tools

**Configuration:**

```
Trigger Type: JavaScript Error

This trigger fires on: All Errors
  OR
This trigger fires on: Some Errors
  Error Message does not contain "Non-critical warning"
```

**Examples:**

```
Name: JavaScript Error - All Errors
Type: JavaScript Error
Fires on: All Errors
Use: Track all JavaScript errors
```

```
Name: JavaScript Error - Critical Only
Type: JavaScript Error
Fires on: Some Errors
  Error Message does not contain "Warning"
  AND Error URL equals {{Page URL}}
Use: Track only critical errors from own code
```

**Built-in Error Variables:**

Enable Error variables:
- `{{Error Message}}` - The error message text
- `{{Error URL}}` - URL where error occurred
- `{{Error Line}}` - Line number in source file
- `{{Debug Mode}}` - true/false if GTM in debug mode

**Example Error Tracking Tag:**

```
Tag: GA4 - Event - JavaScript Error
Event Name: javascript_error
Event Parameters:
  error_message: {{Error Message}}
  error_url: {{Error URL}}
  error_line: {{Error Line}}
  page_url: {{Page URL}}
Trigger: JavaScript Error - All Errors
```

**Filtering Noise:**

Common errors to exclude:

```
Error Message does not contain "ResizeObserver loop limit exceeded"
Error Message does not contain "Script error."
Error Message does not contain "Non-Error promise rejection captured"
Error URL equals {{Page URL}} (exclude third-party script errors)
```

## Trigger Configuration

### Trigger Conditions and Filters

Triggers use conditions to determine when to fire. Conditions compare a variable to a value using an operator.

**Condition Structure:**

```
[Variable] [Operator] [Value]
```

**Example:**

```
{{Page Path}} contains /checkout
```

### Filter Operators

#### String Operators

**equals**
- Exact match (case-sensitive)
- Example: `{{Click ID}} equals submit-btn`

**does not equal**
- Not an exact match
- Example: `{{Page Hostname}} does not equal localhost`

**contains**
- Value contains substring
- Example: `{{Page URL}} contains /product/`

**does not contain**
- Value doesn't contain substring
- Example: `{{Click URL}} does not contain example.com`

**starts with**
- Value begins with string
- Example: `{{Page Path}} starts with /blog/`

**ends with**
- Value ends with string
- Example: `{{Click URL}} ends with .pdf`

**matches RegEx**
- Value matches RE2 regular expression
- Example: `{{Page Path}} matches RegEx ^/category/\d+$`
- **IMPORTANT:** Uses RE2 format (see section above)

**matches RegEx (ignore case)**
- Case-insensitive regex match
- Example: `{{Click URL}} matches RegEx (ignore case) \.pdf$`
- Matches: .pdf, .PDF, .Pdf

#### Numeric Operators

**equals**
- Numeric equality
- Example: `{{DLV - Cart Items}} equals 3`

**does not equal**
- Numeric inequality
- Example: `{{Random Number}} does not equal 0`

**less than**
- Value < number
- Example: `{{DLV - Transaction Value}} less than 50`

**less than or equal to**
- Value <= number
- Example: `{{Scroll Depth Threshold}} less than or equal to 50`

**greater than**
- Value > number
- Example: `{{DLV - Product Price}} greater than 100`

**greater than or equal to**
- Value >= number
- Example: `{{Video Percent}} greater than or equal to 75`

#### Boolean Operators

**is true**
- Variable evaluates to true
- Example: `{{Cookie - user_logged_in}} is true`

**is false**
- Variable evaluates to false
- Example: `{{Cookie - consent_given}} is false`

#### Existence Operators

**is defined**
- Variable has a value (not undefined/null)
- Example: `{{DLV - User ID}} is defined`

**is not defined**
- Variable is undefined/null/empty
- Example: `{{Cookie - returning_visitor}} is not defined`

### Using RE2 Regex in Triggers

Regular expressions enable powerful pattern matching in triggers.

**URL Matching Examples:**

```
# Match checkout pages
{{Page Path}} matches RegEx: ^/checkout

# Match product pages with SKU
{{Page Path}} matches RegEx: ^/product/[A-Z0-9-]+$

# Match blog posts with date structure
{{Page URL}} matches RegEx: /blog/\d{4}/\d{2}/\d{2}/

# Match any subdomain
{{Page Hostname}} matches RegEx: ^[^.]+\.example\.com$

# Match query parameter presence
{{Page URL}} matches RegEx: [?&]utm_source=

# Match multiple page types
{{Page Path}} matches RegEx: ^/(checkout|cart|payment)
```

**Click URL Matching:**

```
# External links (not your domain)
{{Click URL}} matches RegEx: ^https?://(?!example\.com)

# File downloads
{{Click URL}} matches RegEx: \.(pdf|docx?|xlsx?|zip|csv)(\?|$)

# Email links
{{Click URL}} matches RegEx: ^mailto:[\w.+-]+@[\w.-]+\.\w{2,}$

# Phone links
{{Click URL}} matches RegEx: ^tel:\+?[\d\s\-()]+$

# Anchor links (same page)
{{Click URL}} matches RegEx: ^#[^/]
```

**Element ID/Class Matching:**

```
# Button IDs starting with "btn-"
{{Click ID}} matches RegEx: ^btn-

# Classes containing "cta" or "call-to-action"
{{Click Classes}} matches RegEx: (cta|call-to-action)

# Form IDs matching pattern
{{Form ID}} matches RegEx: ^(contact|signup|newsletter)-form$
```

**Text Content Matching:**

```
# Case-insensitive "buy now" or "purchase"
{{Click Text}} matches RegEx (ignore case): (buy now|purchase)

# Numbers in click text
{{Click Text}} matches RegEx: \d+

# Specific patterns
{{Click Text}} matches RegEx: ^(Sign Up|Subscribe|Join)$
```

**Common Regex Patterns:**

```regex
# Match digits
\d+

# Match word characters
\w+

# Match optional whitespace
\s*

# Match URL path segment
/[\w-]+

# Match query parameter
[?&]param=([^&]+)

# Match file extension
\.(ext1|ext2|ext3)$

# Case-insensitive
(?i)pattern

# Start of string
^pattern

# End of string
pattern$

# Optional group
(pattern)?

# Multiple occurrences
pattern{2,5}
```

### Multiple Conditions (AND/OR Logic)

**AND Logic (within a trigger):**

All conditions must match:

```
Trigger: Pageview - Product Category Pages
Type: Page View
Fires on: Some Page Views
  {{Page Path}} starts with /category/
  AND {{Page Path}} does not contain /admin/
  AND {{Cookie - user_type}} equals customer
```

All three conditions must be true.

**OR Logic (multiple triggers):**

Create separate triggers for OR logic:

```
Tag: GA4 - Event - Conversion

Firing Triggers:
  - Custom Event - purchase
  - Custom Event - transaction
  - Custom Event - order_complete

Tag fires if ANY trigger matches (OR logic)
```

**Complex Logic:**

Combine AND within triggers, OR across triggers:

```
Trigger 1: High Value Purchase
  {{Custom Event}} equals purchase
  AND {{DLV - Transaction Value}} greater than 500

Trigger 2: Premium User Purchase
  {{Custom Event}} equals purchase
  AND {{DLV - User Type}} equals premium

Tag fires on: (Trigger 1) OR (Trigger 2)
```

### Built-in Variables for Triggers

Enable built-in variables in Variables → Configure:

**Page Variables:**
- `{{Page URL}}` - Full page URL
- `{{Page Hostname}}` - example.com
- `{{Page Path}}` - /category/products
- `{{Referrer}}` - Previous page URL

**Click Variables:**
- `{{Click Element}}` - Clicked DOM element
- `{{Click Classes}}` - Element CSS classes
- `{{Click ID}}` - Element ID
- `{{Click URL}}` - Link href
- `{{Click Text}}` - Element text content

**Form Variables:**
- `{{Form Element}}` - Form DOM element
- `{{Form Classes}}` - Form CSS classes
- `{{Form ID}}` - Form ID
- `{{Form URL}}` - Form action URL
- `{{Form Text}}` - Form text content

**Utility Variables:**
- `{{Container ID}}` - GTM container ID
- `{{Random Number}}` - Random 0-2147483647
- `{{Environment Name}}` - Live/Preview/Latest

## Advanced Trigger Concepts

### Trigger Groups

Combine multiple triggers to create complex firing logic.

**Trigger Group:**

Create a trigger group in GTM interface to:
- Require ALL triggers in group (AND logic across triggers)
- Simplify complex conditions

**Use Case:**

Fire tag only when user is logged in AND on checkout page AND cart value > $50

### Trigger Firing Limits

Some triggers support limits:

**Timer Trigger:**
- Limit: Maximum number of times to fire

**Element Visibility:**
- Once per page
- Once per element
- Every time element appears

### Auto-Event Variables

Many triggers create auto-event variables:

**Click Triggers:**
- Automatically populate Click variables

**Form Triggers:**
- Automatically populate Form variables

**Video Triggers:**
- Automatically populate Video variables

**Scroll Triggers:**
- Automatically populate Scroll variables

Enable these in Variables → Configure Built-In Variables.

### Event Callbacks

Execute code after tag fires using `eventCallback`:

```javascript
dataLayer.push({
  'event': 'purchase',
  'transactionId': 'T12345',
  'eventCallback': function() {
    // Execute after tags fire
    console.log('Purchase tags fired');
    // Redirect user
    window.location.href = '/thank-you';
  },
  'eventTimeout': 2000
});
```

## Best Practices

### Trigger Naming Conventions

Use consistent, descriptive naming:

```
[Type] - [Condition] - [Description]
```

**Examples:**

- `Pageview - All Pages`
- `Pageview - Product Pages`
- `Click - CTA Buttons`
- `Click - External Links`
- `Custom Event - purchase`
- `Form Submit - Contact Form`
- `Scroll Depth - Blog Posts`
- `Timer - Engagement Tracking`

### Testing Triggers

**Preview Mode:**

1. Enable Preview in GTM
2. Navigate to test page
3. Perform action (click, scroll, etc.)
4. Check "Tags Fired" in debug panel
5. Verify trigger conditions in debug panel

**Debug Checklist:**

- [ ] Trigger fires at correct time
- [ ] All conditions evaluate correctly
- [ ] Variables populate with expected values
- [ ] No false positives (unwanted firing)
- [ ] No false negatives (should fire but doesn't)

### Debugging Trigger Issues

**Trigger Not Firing:**

1. Check trigger conditions - are they too restrictive?
2. Verify built-in variables are enabled
3. Check data layer for custom events
4. Review trigger type matches event
5. Check for blocking triggers on tag

**Trigger Firing Too Often:**

1. Add more specific conditions
2. Use "Once per page/element" for visibility triggers
3. Add filters to exclude unwanted pages
4. Check for duplicate triggers

**Variables Not Populating:**

1. Enable built-in variables in Variables section
2. Check variable names match exactly (case-sensitive)
3. Verify data layer structure for DLV
4. Check timing - is data available when trigger fires?

### Performance Considerations

**Minimize Click Listeners:**

- Use "Just Links" for link tracking (more efficient than "All Elements")
- Add specific conditions to reduce evaluation overhead
- Don't track all clicks indiscriminately

**Optimize Scroll Depth:**

- Limit scroll thresholds (5-7 maximum)
- Only enable on relevant pages
- Use percentages for responsive design

**Timer Triggers:**

- Use reasonable intervals (not < 5 seconds)
- Set limits to prevent infinite firing
- Only enable on necessary pages

**Element Visibility:**

- Use specific selectors (ID preferred over class)
- Enable "Observe DOM changes" only when needed
- Limit to relevant pages

## Resources

### Official Documentation

- [GTM Triggers Overview](https://support.google.com/tagmanager/topic/7679108)
- [Trigger Types Reference](https://support.google.com/tagmanager/answer/7679319)
- [Auto-Event Variables](https://support.google.com/tagmanager/answer/7679316)
- [RE2 Syntax Reference](https://github.com/google/re2/wiki/Syntax)

### Related GTM Skills

- [GTM Tags](./tags.md) - Comprehensive tag documentation
- [GTM Variables](./variables.md) - Variable types and configuration
- [GTM Data Layer](../../gtm-datalayer/gtm-datalayer/references/datalayer-fundamentals.md) - Data layer implementation
- [GTM Best Practices](./best-practices.md) - Naming, organization, regex usage

### Tools

- [Regex101](https://regex101.com/) - Test regex patterns (select "Golang" for RE2)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)
- [Google Tag Assistant](https://tagassistant.google.com/)

### Community

- [GTM Community Forum](https://support.google.com/tagmanager/community)
- [Simo Ahava's Blog](https://www.simoahava.com/)
- [Analytics Mania](https://www.analyticsmania.com/)
- [MeasureSchool](https://measureschool.com/)
