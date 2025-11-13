# Google Tag Manager - Tags

## Overview

Tags are snippets of code or tracking pixels that send information from your website to third-party tools and platforms. In Google Tag Manager, tags are one of the three core components (Tags, Triggers, Variables) that make up your tracking implementation.

**What Tags Do:**

- Send data to analytics platforms (Google Analytics 4, Adobe Analytics)
- Track conversions for advertising platforms (Google Ads, Facebook, LinkedIn)
- Load third-party marketing and analytics scripts
- Execute custom JavaScript code
- Track custom events and user interactions

## JavaScript Constraint for Custom HTML Tags

**CRITICAL:** Google Tag Manager uses **ECMAScript 5 (ES5)** for JavaScript code in Custom HTML tags and Custom JavaScript variables, NOT modern ES6+.

### ES6 Features NOT Supported

```javascript
// ❌ WILL FAIL - ES6 syntax
const myVar = 'value';
let count = 0;
const arrow = () => console.log('test');
const template = `Hello ${name}`;
const [first, second] = array;
const {property} = object;

// ✅ CORRECT - ES5 syntax
var myVar = 'value';
var count = 0;
var regularFunc = function() { console.log('test'); };
var concatenated = 'Hello ' + name;
var first = array[0];
var second = array[1];
var property = object.property;
```

### Workarounds for Modern JavaScript

**Option 1: Transpilation (Recommended)**

Use [Babel](https://babeljs.io/repl) to convert ES6+ to ES5 before pasting into GTM.

**Option 2: text/gtmscript Tag**

```html
<script type="text/gtmscript">
  // Modern JavaScript here - GTM won't validate syntax
  const myModernCode = () => {
    // Your code
  };
</script>
```

**Caution:** No syntax validation in GTM UI, harder to debug, only use when necessary.

**See Also:** [Best Practices - JavaScript in GTM](./best-practices.md#javascript-in-google-tag-manager-es5-requirement) for detailed ES5 guidelines.

## Tag Basics

### How Tags Work

1. User visits a webpage with GTM container
2. GTM evaluates triggers to determine which tags should fire
3. Matching tags execute and send data to third-party platforms
4. Data is received by analytics/marketing tools

### Tag Lifecycle

```
Page Load → GTM Container Loads → Triggers Evaluate → Tags Fire → Data Sent
```

### Tag Components

- **Tag Type** - Defines what the tag does (GA4 Event, Custom HTML, etc.)
- **Tag Configuration** - Settings and parameters specific to the tag type
- **Triggering** - When the tag should fire (page view, click, custom event)
- **Advanced Settings** - Tag sequencing, firing options, consent settings

## Built-in Tag Types

GTM provides pre-configured tag templates for popular platforms. These are optimized, maintained by Google, and recommended over custom implementations.

### GA4 Configuration Tag

Sets up Google Analytics 4 tracking and defines default configuration for all GA4 events.

**Purpose:**
- Initialize GA4 on your site
- Set Measurement ID
- Configure default parameters
- Define user properties
- Configure enhanced measurement settings

**Configuration:**

```
Measurement ID: G-XXXXXXXXXX (use a Constant variable)
Configuration Settings:
  - send_page_view: true/false
  - Fields to Set: session_id, user_id, etc.
  - User Properties: user_type, membership_level, etc.
```

**Example:**

```
Tag Name: GA4 - Config - All Pages
Tag Type: Google Analytics: GA4 Configuration
Measurement ID: {{Constant - GA4 Measurement ID}}
Trigger: All Pages
```

**Best Practice:** Only ONE GA4 Configuration tag per Measurement ID. All GA4 Event tags reference this configuration.

### GA4 Event Tag

Sends individual events to Google Analytics 4.

**Purpose:**
- Track user interactions (button clicks, form submissions)
- Track custom events (purchases, sign-ups, video plays)
- Send additional event parameters

**Configuration:**

```
Configuration Tag: {{GA4 Configuration Tag}}
Event Name: purchase (recommended events) or custom_event_name
Event Parameters:
  - currency: USD
  - value: 99.99
  - transaction_id: T12345
  - items: [array of item objects]
```

**Recommended Events:**

- `purchase` - Completed transaction
- `add_to_cart` - Item added to cart
- `begin_checkout` - Checkout process started
- `generate_lead` - Lead form submitted
- `login` - User logged in
- `sign_up` - User registered
- `view_item` - Product page viewed

**Example:**

```javascript
// Custom HTML implementation (ES5)
<script type="text/gtmscript">
  dataLayer.push({
    'event': 'purchase',
    'ecommerce': {
      'transaction_id': '{{Transaction ID}}',
      'value': {{Purchase Value}},
      'currency': 'USD',
      'items': [
        {
          'item_id': 'SKU123',
          'item_name': 'Product Name',
          'price': 29.99,
          'quantity': 1
        }
      ]
    }
  });
</script>
```

### Google Ads Conversion Tracking

Tracks conversions for Google Ads campaigns.

**Purpose:**
- Track conversion actions (purchases, sign-ups, calls)
- Measure ad performance and ROI
- Enable conversion-based bidding

**Configuration:**

```
Conversion ID: AW-XXXXXXXXXX
Conversion Label: unique_conversion_label
Conversion Value: {{Transaction Value}} or fixed value
Currency Code: USD
Transaction ID: {{Order ID}} (for deduplication)
```

**Example:**

```
Tag Name: Google Ads - Conversion - Purchase
Conversion ID: AW-123456789
Conversion Label: abc123xyz
Conversion Value: {{DLV - Purchase Value}}
Currency Code: USD
Trigger: Custom Event - purchase
```

### Google Ads Remarketing

Creates audiences for Google Ads remarketing campaigns.

**Purpose:**
- Build remarketing audiences
- Track user behavior for ad targeting
- Send dynamic remarketing parameters

**Configuration:**

```
Conversion ID: AW-XXXXXXXXXX
Custom Parameters:
  - ecomm_prodid: product SKUs
  - ecomm_pagetype: home, product, cart, purchase
  - ecomm_totalvalue: cart/order value
```

### Floodlight Counter/Sales Tags

Tracks conversions and activities for Campaign Manager 360 and Display & Video 360.

**Counter Tag:**
- Tracks activities (page views, sign-ups)
- No transaction data

**Sales Tag:**
- Tracks revenue-generating actions
- Includes transaction value and order ID

**Configuration:**

```
Advertiser ID: 12345678
Group Tag String: group123
Activity Tag String: activity456
Counting Method: Standard/Unique/Per Session
Transaction Data (Sales only):
  - Revenue: {{Transaction Value}}
  - Order ID: {{Order ID}}
```

### Custom HTML Tag

Executes custom HTML and JavaScript code on your page.

**Purpose:**
- Implement third-party tracking pixels not available as built-in tags
- Execute custom JavaScript logic
- Load external scripts
- Modify page elements

**IMPORTANT:** Custom HTML tags require ES5 JavaScript syntax (see section above).

**Configuration:**

```html
<script type="text/gtmscript">
  // ES5 JavaScript only
  var myFunction = function() {
    var data = {{DLV - User Data}};

    // Send to third-party platform
    window.thirdPartyTracker = window.thirdPartyTracker || [];
    window.thirdPartyTracker.push({
      'event': 'custom_event',
      'data': data
    });
  };

  myFunction();
</script>
```

**Advanced HTML Options:**

- **Support document.write** - Enable for legacy scripts (not recommended)
- **Convert null and undefined** - Replace with empty strings in variable outputs

**Loading External Scripts:**

```html
<script type="text/gtmscript">
  (function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://example.com/tracking.js';
    document.head.appendChild(script);
  })();
</script>
```

**Security Best Practices:**

- Never use `eval()` with user input
- Validate external script sources
- Avoid `document.write()` when possible
- Review all custom code before deployment

### Custom Image Tag

Fires a tracking pixel (1x1 image) to a specified URL.

**Purpose:**
- Implement simple pixel-based tracking
- Track page views to external platforms
- Send data via URL parameters

**Configuration:**

```
Image URL: https://tracking.example.com/pixel.gif?event=pageview&page={{Page URL}}
Cache Buster: true (adds random number to prevent caching)
```

**Example:**

```
Tag Name: Custom Pixel - Third Party Tracker
Image URL: https://analytics.thirdparty.com/track?
  event=conversion
  &value={{Transaction Value}}
  &id={{Transaction ID}}
Trigger: Custom Event - purchase
```

**When to Use:**

- Third-party platform only provides pixel tracking
- Lightweight tracking without JavaScript
- Cross-domain tracking scenarios

### Conversion Linker Tag

Stores conversion click information in first-party cookies for improved conversion measurement.

**Purpose:**
- Improve conversion tracking accuracy
- Store click IDs in first-party cookies
- Enable cross-domain conversion tracking
- Support browser privacy restrictions

**Configuration:**

```
Link Domains: example.com, shop.example.com
```

**Best Practice:** Fire on All Pages before any conversion tracking tags.

**Example:**

```
Tag Name: Conversion Linker - All Pages
Tag Type: Conversion Linker
Trigger: All Pages
Tag Firing Options: Once per page
Tag Firing Priority: 100 (fire first)
```

### Additional Built-in Tag Types

**LinkedIn Insight Tag**
- Track conversions for LinkedIn Ads
- Build matched audiences

**Twitter Universal Website Tag**
- Track conversions for Twitter/X Ads
- Measure campaign performance

**Microsoft Advertising UET Tag**
- Universal Event Tracking for Microsoft Advertising
- Conversion and remarketing tracking

**TikTok Pixel**
- Track events for TikTok Ads
- Build custom audiences

**Hotjar Tracking Code**
- Heatmaps and session recording
- User behavior analytics

## Tag Configuration

### Tag Setup Process

1. **Choose Tag Type** - Select built-in tag or custom template
2. **Configure Tag Parameters** - Enter required settings (IDs, values, etc.)
3. **Set Up Triggering** - Define when tag should fire
4. **Configure Advanced Settings** (optional)
   - Tag sequencing
   - Firing options
   - Consent settings
   - Custom event name
5. **Save and Test** - Use Preview mode to verify

### Tag Parameters

Most tags require specific parameters:

**Common Parameters:**

- **Account/Container IDs** - Platform identifiers (GA4 Measurement ID, Ads Conversion ID)
- **Event Names** - Action being tracked
- **Event Parameters** - Additional context (value, currency, transaction_id)
- **User Data** - User properties or identifiers (never PII)

**Using Variables in Parameters:**

```
Measurement ID: {{Constant - GA4 Measurement ID}}
Event Name: {{Custom Event}}
Transaction Value: {{DLV - Purchase Value}}
Currency: {{DLV - Currency Code}}
```

### Advanced Settings

#### Tag Firing Options

**Once per page:**
- Tag fires only once, even if trigger fires multiple times
- Use for: Page view tags, configuration tags

**Once per event:**
- Tag fires once per unique event
- Use for: Tags that shouldn't duplicate

**Unlimited:**
- Tag fires every time trigger matches
- Use for: Click tracking, user interaction tags

#### Firing Priority

Controls the order in which tags fire when multiple tags have the same trigger.

```
Priority: 100 (higher numbers fire first)
Default: 0
```

**Use Cases:**

- Fire consent tag (priority 100) before analytics tags (priority 0)
- Load configuration tag before event tags
- Ensure data layer is ready before reading values

**Example:**

```
Priority 100: Consent Management Tag
Priority 50: GA4 Configuration Tag
Priority 25: Data Layer Preparation Tag
Priority 0: All other tags (default)
```

#### Tag Firing Schedule

Restrict when a tag can fire based on date/time.

```
Start Date: 2024-01-01 00:00
End Date: 2024-12-31 23:59
```

**Use Cases:**

- Seasonal campaign tracking
- Limited-time promotions
- A/B test windows
- Temporary tracking implementations

## Tag Firing

### How Tags Fire

Tags fire when ALL of the following conditions are met:

1. **Triggering condition matches** - At least one firing trigger evaluates to true
2. **No blocking triggers** - No exception triggers match
3. **Consent granted** (if consent settings configured)
4. **Tag schedule active** (if scheduling configured)

### Trigger Association

**Firing Triggers:**

Tags fire when these triggers match. You can have multiple firing triggers (OR logic).

```
Trigger 1: All Pages
OR
Trigger 2: Custom Event - purchase
```

**Blocking Triggers (Exceptions):**

Tags DON'T fire when these triggers match, even if a firing trigger matches.

```
Fire on: All Pages
EXCEPT: Page URL contains - /admin/
```

**Example Use Case:**

```
Tag: GA4 - Event - Page View
Firing Triggers:
  - All Pages
  - History Change
Blocking Triggers:
  - Page URL contains - /checkout/success (tracked separately)
  - Page URL matches RegEx - /admin|dashboard/
```

### Tag Evaluation Order

1. **All triggers evaluate** - GTM checks all triggers in the container
2. **Tag priority determines order** - Higher priority tags fire first
3. **Tag sequencing executes** - Setup tags fire before main tags
4. **Async vs sync loading** - Tags load according to configuration

## Tag Sequencing and Priorities

### Tag Sequencing

Force specific tags to fire in a defined order using tag sequencing.

**Setup Tag:**

Fires BEFORE the main tag.

```
Main Tag: GA4 - Event - Purchase
Setup Tag: Custom HTML - Prepare Data Layer
  → Setup tag completes BEFORE main tag fires
```

**Cleanup Tag:**

Fires AFTER the main tag completes.

```
Main Tag: Conversion Pixel - Purchase
Cleanup Tag: Custom HTML - Clear Transaction Data
  → Cleanup tag fires AFTER main tag completes
```

**Configuration:**

In tag's Advanced Settings:

```
Tag Sequencing:
  ☑ Fire a tag before [tag name] fires - setup tag
  ☑ Fire a tag after [tag name] fires - cleanup tag
```

**Use Cases:**

- Prepare data layer before reading values
- Wait for external library to load
- Clear sensitive data after sending
- Initialize configuration before events

**Example Implementation:**

```
Setup Tag:
  Name: Custom HTML - Load External Library
  HTML: <script>loadExternalLib();</script>
  Trigger: All Pages

Main Tag:
  Name: Custom - Third Party Event
  Tag Sequencing: Setup Tag → Custom HTML - Load External Library
  Trigger: Custom Event - user_action

Cleanup Tag:
  Name: Custom HTML - Log Success
  Tag Sequencing: Main Tag → Custom - Third Party Event
  Trigger: (inherited from main tag)
```

### Tag Firing Priority

**Default Priority:** 0

**Priority Range:** Any integer (negative to positive)

**Execution:** Higher numbers fire first

**Example Priority Scheme:**

```
Priority 100: Consent Management Platform
Priority 90: Conversion Linker
Priority 75: GA4 Configuration Tag
Priority 50: Data Layer Setup
Priority 25: Marketing/Advertising Tags
Priority 0: Standard Event Tags (default)
Priority -10: Debugging/Development Tags
```

**Best Practice:**

Only use priority when order matters. Most tags don't need custom priority.

## Blocking Triggers

Blocking triggers (exceptions) prevent a tag from firing even when a firing trigger matches.

### How Blocking Triggers Work

```
IF (Firing Trigger = TRUE) AND (Blocking Trigger = FALSE)
  THEN Tag Fires
ELSE
  Tag Does Not Fire
```

### Common Use Cases

**Exclude Admin Pages:**

```
Firing Trigger: All Pages
Blocking Trigger: Page URL contains - /admin
```

**Exclude Internal Traffic:**

```
Firing Trigger: All Pages
Blocking Trigger: IP Address equals - 203.0.113.0
```

**Exclude Test Environments:**

```
Firing Trigger: All Pages
Blocking Trigger: Page Hostname equals - dev.example.com
```

**Avoid Duplicate Tracking:**

```
Tag: GA4 - Event - Generic Button Click
Firing Trigger: Click - All Buttons
Blocking Trigger: Click Element ID equals - special-button
  (special button tracked with dedicated tag)
```

### Multiple Blocking Triggers

Multiple blocking triggers use OR logic:

```
Tag Fires IF:
  Firing Trigger = TRUE
  AND Blocking Trigger 1 = FALSE
  AND Blocking Trigger 2 = FALSE
```

**Example:**

```
Tag: GA4 - Event - Page View
Firing Trigger: All Pages
Blocking Triggers:
  - Page URL contains - /admin/
  - Page URL contains - /test/
  - Cookie - internal_user - equals - true
```

## Community Gallery Templates

The Community Template Gallery provides pre-built tag templates created by third-party vendors and developers.

### Benefits

- Quick implementation of third-party tools
- Vendor-maintained and updated
- Sandboxed for security
- No custom HTML required

### Popular Community Templates

- **Cookiebot** - Cookie consent management
- **OneTrust** - Privacy and consent management
- **Matomo Analytics** - Open-source analytics
- **Segment** - Customer data platform
- **Amplitude** - Product analytics
- **Mixpanel** - Product analytics
- **Heap** - Automatic event tracking
- **Clarity** - Microsoft user behavior analytics

### Using Community Templates

1. **Tags → New → Discover more tag types in the Community Template Gallery**
2. **Search for template by name or vendor**
3. **Review permissions and security**
4. **Add to workspace**
5. **Configure template parameters**
6. **Set up triggers**
7. **Test and publish**

### Template Security

Community templates run in a **sandboxed environment** with restricted permissions:

**Review before adding:**

- Required permissions (access to cookies, pixels, data layer)
- Privacy policy and data handling
- Vendor reputation and reviews
- Template documentation

**Permissions to watch for:**

- Accesses global variables
- Sends data to URLs
- Accesses cookies
- Reads from data layer

### Creating Custom Templates

You can create your own custom tag templates using the Template Editor.

**See:** `.claude/skills/gtm-custom-templates/` for comprehensive custom template documentation.

## Consent Settings

Google Consent Mode v2 allows tags to respect user consent preferences.

### Consent Types

- **ad_storage** - Advertising cookies and tracking
- **analytics_storage** - Analytics cookies
- **functionality_storage** - Functional cookies
- **personalization_storage** - Personalization cookies
- **security_storage** - Security-related cookies

### Tag Consent Configuration

In tag's Consent Settings:

```
Consent Overview:
  - No additional consent required
  - Require additional consent for tag to fire

If "Require additional consent":
  ☑ ad_storage
  ☑ analytics_storage

Tag fires only if: ad_storage = granted AND analytics_storage = granted
```

### Built-in Consent Behavior

**GA4 Tags:**
- Automatically respect analytics_storage consent
- Send pings when consent denied (consent mode)

**Google Ads Tags:**
- Automatically respect ad_storage consent
- Support conversion pings without cookies

### Consent Mode Implementation

```javascript
// Default consent state (before user choice)
<script type="text/gtmscript">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });
</script>

// Update consent after user choice
<script type="text/gtmscript">
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });
</script>
```

## Tag Testing and Debugging

### Preview Mode

**Enable Preview Mode:**

1. Click "Preview" in GTM interface
2. Enter website URL
3. Debug panel opens alongside website

**Debug Panel Sections:**

- **Summary** - Overview of page events
- **Tags** - Tags Fired, Tags Not Fired
- **Data Layer** - Current data layer state
- **Variables** - Variable values for selected event
- **Errors** - JavaScript errors and issues

### Verify Tag Firing

**In Preview Mode:**

1. Navigate to event (page view, click, etc.)
2. Check "Tags Fired" section
3. Click tag to see details
4. Verify tag configuration and variables

**In Receiving Platform:**

- **GA4** - Real-time reports, DebugView
- **Google Ads** - Conversion tracking status
- **Third-party platforms** - Platform-specific testing tools

### Common Tag Issues

**Tag Not Firing:**

- Trigger conditions not met
- Blocking trigger active
- Consent not granted
- Tag schedule not active
- Tag paused

**Tag Firing Multiple Times:**

- Trigger firing multiple times
- Missing "Once per page" firing option
- Data layer push in loop

**Wrong Data Sent:**

- Variable not populated
- Incorrect variable reference
- Data layer structure mismatch
- Typo in parameter name

### Browser Console Debugging

```javascript
// Check if GTM loaded
console.log(google_tag_manager);

// Check data layer
console.log(dataLayer);

// Enable GTM debug messages
localStorage.setItem('gtm.debug', true);
```

### Google Tag Assistant

Chrome extension for debugging tags:

- Install [Google Tag Assistant](https://tagassistant.google.com/)
- Visit your website
- Click extension icon
- Review tag firing and errors

## Best Practices

### Tag Naming Conventions

Use consistent, descriptive naming:

```
[Platform] - [Type] - [Purpose] - [Trigger Condition]
```

**Examples:**

- `GA4 - Config - All Pages`
- `GA4 - Event - Purchase - Thank You Page`
- `Google Ads - Conversion - Form Submit - Contact`
- `Facebook - Pixel - Page View - All Pages`
- `Custom HTML - Load Chat Widget - All Pages`

### Tag Organization

**Use Folders:**

```
├── Analytics
│   ├── GA4
│   └── Adobe Analytics
├── Advertising
│   ├── Google Ads
│   ├── Facebook
│   └── LinkedIn
├── Marketing
│   ├── Email Tracking
│   └── CRM Integration
└── Utilities
    ├── Consent Management
    └── Error Tracking
```

### Performance Optimization

**Prefer Built-in Tags:**

1. Built-in tags (GA4, Google Ads)
2. Community Gallery templates
3. Custom templates
4. Custom HTML (last resort)

**Minimize Tag Count:**

- Consolidate similar tags
- Use single configuration tag
- Remove unused tags
- Audit regularly

**Async Loading:**

- Keep GTM container async (default)
- Avoid document.write in custom HTML
- Load external scripts asynchronously

**Tag Timeout:**

- Set appropriate timeout in Container Settings (default: 2000ms)
- Prevents tags from blocking page indefinitely

### Security Best Practices

**Custom HTML Tags:**

- Review all code before deployment
- Never use `eval()` with user input
- Validate external script sources
- Avoid loading untrusted scripts

**Data Handling:**

- Never send PII (emails, names, addresses)
- Hash sensitive identifiers
- Respect user consent preferences
- Follow privacy regulations (GDPR, CCPA)

**Template Permissions:**

- Review community template permissions
- Grant minimum necessary access
- Verify vendor reputation
- Monitor template updates

### Testing Before Deployment

**Pre-Publish Checklist:**

- [ ] Preview mode testing completed
- [ ] All triggers fire correctly
- [ ] Data appears in receiving platforms
- [ ] No console errors
- [ ] Cross-browser testing done
- [ ] Mobile testing done
- [ ] Edge cases tested
- [ ] Team review completed

### Version Control

**Document Changes:**

```
Version: 2.1 - Add GA4 Enhanced Ecommerce

Changes:
- Added GA4 purchase event tag
- Updated data layer variables for ecommerce
- Fixed duplicate page view issue

Tags Added:
- GA4 - Event - Purchase - Thank You Page
- GA4 - Event - Add to Cart - Product Pages

Tags Modified:
- GA4 - Config - All Pages (added user properties)

Testing:
- Verified in GA4 DebugView
- Tested checkout flow end-to-end
- Confirmed data accuracy
```

**Regular Audits:**

- Monthly review of tag firing
- Quarterly cleanup of unused tags
- Annual comprehensive audit
- Remove test/development tags from production

## Resources

### Official Documentation

- [Google Tag Manager Developer Guide](https://developers.google.com/tag-platform/tag-manager)
- [GTM Help Center](https://support.google.com/tagmanager)
- [GA4 Tag Configuration](https://developers.google.com/tag-platform/gtagjs/reference/ga4-events)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/6331314)

### Related GTM Skills

- [GTM Triggers](./triggers.md) - Comprehensive trigger documentation
- [GTM Variables](./variables.md) - Variable types and configuration
- [GTM Data Layer](../../gtm-datalayer/gtm-datalayer/references/datalayer-fundamentals.md) - Data layer implementation
- [GTM Best Practices](./best-practices.md) - Naming, organization, security
- [Custom Templates](../../gtm-custom-templates/gtm-custom-templates/references/custom-templates-guide.md) - Creating custom tag templates

### Tools

- [Google Tag Assistant](https://tagassistant.google.com/)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [Babel REPL](https://babeljs.io/repl) - ES6 to ES5 transpilation
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)

### Community

- [GTM Community Forum](https://support.google.com/tagmanager/community)
- [Simo Ahava's Blog](https://www.simoahava.com/)
- [Analytics Mania](https://www.analyticsmania.com/)
- [MeasureSchool](https://measureschool.com/)
