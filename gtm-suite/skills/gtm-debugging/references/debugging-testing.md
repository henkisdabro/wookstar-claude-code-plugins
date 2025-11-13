# Google Tag Manager - Debugging and Testing

**Sources**:
- https://support.google.com/tagmanager/answer/6107056
- https://developers.google.com/tag-platform/tag-manager/server-side/debug

**Last Updated**: 2025-01-09

## Overview

Testing and debugging are critical components of any Google Tag Manager implementation. GTM provides comprehensive tools to help you verify that tags fire correctly, triggers activate as expected, and data flows accurately to your analytics platforms.

## Preview Mode

Preview mode (formerly called Debug mode) allows you to test your GTM container configuration before publishing it to production. When enabled, you can browse your website with the unpublished container draft and see exactly how tags behave.

### Enabling Preview Mode

1. **Navigate to GTM** at https://tagmanager.google.com
2. **Open your container** workspace
3. **Click "Preview"** in the top right corner
4. **Tag Assistant launches** in a new tab
5. **Enter your website URL**
6. **Optional**: Uncheck "Include debug signal in the URL" if it breaks your site
7. **Click "Connect"**
8. **Your website opens** in a new window with "Connected" indicator
9. **Return to Tag Assistant** and click "Continue"

The debug interface appears, showing detailed information about tag firing, triggers, variables, and the data layer.

### Tag Assistant Companion

Installing the [Tag Assistant Companion Chrome extension](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm) improves the preview experience by opening your website in a new tab instead of a popup window.

### Previewing Older Versions

To test a previously published version:

1. Go to **Versions** in your workspace navigation
2. Find the version to preview
3. Click **More Actions** (three dots)
4. Select **Preview**

## Using the Debug Interface

### Interface Overview

The debug interface consists of several key areas:

- **Summary Panel**: Overview of the current event and tag firing status
- **Tags Panel**: Lists which tags fired and which didn't
- **Data Layer Panel**: Shows the data layer state and events
- **Variables Panel**: Displays variable values for the current event
- **Errors Panel**: Lists JavaScript errors and tag failures

### Summary View

Shows a timeline of events as you interact with your website:

```
Container Loaded
   Page View
   DOM Ready
   Window Loaded
   Click (Button)
   Custom Event (form_submit)
```

Click any event to see:
- Which tags fired
- Which triggers activated
- Current data layer state
- Variable values at that moment

### Tags View

**Tags Fired:**
- Green indicators show successfully fired tags
- Red indicators show failed tags
- Number shows how many times the tag fired
- Click a tag to see:
  - Tag configuration
  - Triggering conditions
  - Blocking triggers
  - Execution order

**Tags Not Fired:**
- Shows tags that didn't fire for this event
- Click to see why (trigger conditions not met, blocking triggers, etc.)

### Data Layer View

Displays the data layer's state:

```javascript
{
  "gtm.start": 1704844800000,
  "event": "gtm.js",
  "gtm.uniqueEventId": 1
}
```

Shows:
- All pushes to the data layer
- Current state of the data layer
- Event sequence
- Custom data layer variables

### Variables View

Lists all variables and their current values:

| Variable Name | Value | Type |
|--------------|-------|------|
| Page URL | https://example.com/products | Built-in |
| Page Path | /products | Built-in |
| Product Name | Blue Widget | Data Layer Variable |
| User ID | 12345 | Data Layer Variable |

Helps verify:
- Variables resolve to expected values
- Data layer variables capture correct data
- Custom JavaScript variables execute properly

### Errors View

Shows JavaScript errors and tag execution failures:

```
Tag: GA4 Event - Purchase
Error: sendBeacon failed - network error

Tag: Facebook Pixel
Error: fbq is not defined
```

Critical for identifying:
- Missing vendor libraries
- JavaScript syntax errors
- Network failures
- Configuration issues

## Sharing Preview Mode

### Share with Colleagues

To let others view your debug session:

1. **In Tag Assistant**, click **More Actions** (three dots)
2. **Select "Share"**
3. **Enter your website domain**
4. **Copy the preview URL**
5. **Send to colleagues**

The recipient can:
- Connect to your site in preview mode
- View the Tag Assistant debug interface
- See the same container draft you're testing

**Note**: The preview URL is temporary and expires after the debug session ends.

### Share Specific Versions

From the Versions tab:

1. Click **More Actions** on any version
2. Select **Share Preview**
3. Enter target website domain
4. Copy and share the preview URL

## Debugging Common Scenarios

### Tag Not Firing

**Checklist:**

1. **Check the trigger**
   - Is the trigger configured correctly?
   - Are the trigger conditions being met?
   - Check trigger variables resolve correctly

2. **Check for blocking triggers**
   - Does the tag have any exception/blocking triggers?
   - Are those triggers inadvertently activating?

3. **Check tag priority/sequencing**
   - Does another tag need to fire first?
   - Is tag sequencing configured correctly?

4. **Check the data layer**
   - Is required data present when trigger evaluates?
   - Are data layer variables returning expected values?

### Trigger Not Activating

**Debugging Steps:**

1. **Verify trigger conditions**
   ```
   Example: Click trigger on CSS selector
   - Check selector syntax
   - Verify element exists on page
   - Test with simpler selector
   ```

2. **Check built-in variables**
   - Are required built-in variables enabled?
   - Click Variables > Configure
   - Enable missing variables

3. **Test variable values**
   - Check Variables panel
   - Verify trigger conditions match actual values
   - Look for type mismatches (string vs number)

### Variable Returning Undefined

**Common Causes:**

1. **Data layer variable not found**
   ```javascript
   // Data layer:
   { "product_name": "Widget" }

   // Variable configured as:
   productName  // Wrong - case sensitive!

   // Should be:
   product_name  // Correct
   ```

2. **Timing issue**
   - Data pushed after tag fires
   - Use Custom Event trigger to wait for data

3. **Incorrect data layer version**
   - Check Data Layer Version setting
   - Version 2 vs Version 1 syntax differs

### Data Layer Issues

**Debug Pattern:**

```javascript
// In browser console, inspect data layer
console.log(window.dataLayer);

// Check for specific event
window.dataLayer.filter(item => item.event === 'purchase');

// Watch for new pushes
var originalPush = window.dataLayer.push;
window.dataLayer.push = function() {
  console.log('DataLayer push:', arguments[0]);
  return originalPush.apply(this, arguments);
};
```

### JavaScript Errors

**Investigation Steps:**

1. **Check browser console** (F12 > Console)
2. **Look for errors** before tag execution
3. **Verify vendor scripts** load correctly
4. **Check for conflicts** between tags
5. **Test with tags disabled** one at a time

## Server-Side Debugging

For server-side GTM containers, the debug interface differs:

### Server Preview Layout

**Left Panel**: Incoming HTTP requests
```
collect?v=2&tid=G-XXXXXX&en=page_view...
  └─ page_view
  └─ scroll
  └─ add_to_cart
```

**Right Panel Tabs**:
- Request
- Tags
- Variables
- Event Data
- Console

### Request Tab

**Client Box**: Shows which client claimed the request

**Incoming HTTP Request**: Full request details
- Headers
- Query parameters
- Request body
- Should match what's in Chrome Network tab

**Outgoing HTTP Requests**: Requests sent to vendors
- Tag that generated the request
- Request details (URL, headers, body)
- HTTP response from vendor
- Status code and response body

### Debugging Server Tags

**Tags Fired**:
- Success/failure status
- Number of times fired
- Click to see:
  - Tag properties
  - Outgoing HTTP requests
  - Firing triggers

**Tags Not Fired**:
- Available tags that didn't fire
- Reason they didn't fire

### Server Variables

Shows:
- Variable type
- Return type
- Current value

Example:
```
var_screen_resolution: "1536x864"
var_user_agent: "Mozilla/5.0..."
var_client_id: "123456.789012"
```

### Event Data Tab

Full event data object:
```json
{
  "event_name": "purchase",
  "value": 129.99,
  "currency": "USD",
  "transaction_id": "T_12345",
  "items": [...]
}
```

This data populates variable values.

### Server Console

Shows errors from fired tags:
```
Tag: GA4 Server Tag
Error: Invalid endpoint URL

Tag: Facebook Conversions API
Error: HTTP 401 - Invalid access token
```

## Testing Workflows

### Pre-Publishing Checklist

Before publishing any container version:

- [ ] Enable preview mode
- [ ] Test on all key pages:
  - [ ] Homepage
  - [ ] Product pages
  - [ ] Category pages
  - [ ] Cart/checkout
  - [ ] Confirmation page
- [ ] Verify all critical tags fire
- [ ] Check data layer on each page
- [ ] Test all conversion events
- [ ] Verify cross-domain tracking
- [ ] Test with ad blockers disabled and enabled
- [ ] Check mobile experience (responsive design mode)
- [ ] Verify no JavaScript errors
- [ ] Confirm data in vendor platforms (GA4, Ads, etc.)

### Testing Different Environments

Use GTM Environments for staged testing:

1. **Development Environment**
   - Test unstable/experimental changes
   - Break things without consequence
   - Rapid iteration

2. **Staging Environment**
   - Test on staging server
   - QA team validation
   - Stakeholder review

3. **Production Environment**
   - Live site
   - Real user data
   - Careful change management

### Cross-Domain Testing

When testing cross-domain tracking:

1. **Enable preview** on primary domain
2. **Navigate to secondary** domain
3. **Verify preview mode** persists
4. **Check data layer** for linker parameters
5. **Confirm client IDs** match across domains

### Version Comparison

Compare container versions:

1. Go to **Versions**
2. Select two versions
3. Click **Compare**
4. Review differences:
   - Tags added/removed/modified
   - Trigger changes
   - Variable updates

## Browser Developer Tools

### Network Tab

Monitor tag requests:

1. **Open DevTools** (F12)
2. **Go to Network tab**
3. **Filter**: "analytics", "gtm", "google-analytics"
4. **Trigger events** on your site
5. **Inspect requests**:
   - Check parameters sent
   - Verify timing
   - Look for errors (red status codes)

### Console Tab

Monitor JavaScript execution:

```javascript
// Check GTM loaded
console.log(google_tag_manager);

// Check dataLayer
console.log(dataLayer);

// Monitor events
dataLayer.push = new Proxy(dataLayer.push, {
  apply: function(target, thisArg, args) {
    console.log('DataLayer event:', args[0]);
    return target.apply(thisArg, args);
  }
});
```

### Application Tab

Inspect cookies:

1. **Open Application tab**
2. **Go to Cookies**
3. **Select your domain**
4. **Check for**:
   - `_ga` (GA client ID)
   - `_gid` (GA session ID)
   - Custom cookies

## GA4 DebugView

For GA4-specific debugging:

1. **Enable debug mode** in GTM:
   ```javascript
   // Add to data layer
   window.dataLayer.push({
     'debug_mode': true
   });
   ```

2. **Or use Chrome extension**: Google Analytics Debugger

3. **Open GA4 DebugView**:
   - Go to GA4 property
   - Navigate to Configure > DebugView
   - See real-time events from your debug session

4. **Verify in DebugView**:
   - Events appear immediately
   - Parameters are correct
   - Event sequence matches expectations

## Common Debugging Patterns

### Test Ecommerce Flow

```javascript
// 1. View item list
dataLayer.push({
  event: 'view_item_list',
  ecommerce: { items: [...] }
});

// 2. Add to cart
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: { items: [...] }
});

// 3. Purchase
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T_12345',
    value: 129.99,
    items: [...]
  }
});

// Verify each step in Preview Mode
```

### Test Conditional Logic

```javascript
// Test trigger with conditions
if ({{Page Path}} contains '/products/') {
  // Should fire: Product View tag
  // Should not fire: Homepage tag
}

// Verify in Variables panel
```

### Test Tag Sequencing

```javascript
// Tag A must fire before Tag B
// Tag A: Setup Tag
//   - No sequencing

// Tag B: Cleanup Tag
//   - Setup Tag: Tag A
//   - Firing: After Tag A

// Verify firing order in Summary panel
```

## Troubleshooting Tips

### Clear Browser Cache

Sometimes old container versions cache:
```
1. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. Clear cache completely
3. Close and reopen preview mode
```

### Check Container Version

Verify correct container loads:
```javascript
// In console:
google_tag_manager['GTM-XXXXX'].dataLayer.get('gtm.version')
```

### Verify Container ID

Ensure correct container on page:
```html
<!-- Check page source for -->
<script>
(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXX');
</script>
```

### Multiple Containers

If multiple containers exist:
- Each fires independently
- Check all containers in preview
- Avoid duplicate tags across containers

## Best Practices

### Testing Best Practices

1. **Test before publishing** - Always use preview mode
2. **Test on real pages** - Not just homepage
3. **Test user journeys** - Complete flows, not just individual pages
4. **Document your tests** - Use version notes
5. **Get peer review** - Have colleagues review in preview mode
6. **Test with real data** - Use production-like scenarios

### Debugging Best Practices

1. **Start simple** - Test one thing at a time
2. **Check the basics first** - Is GTM loading? Is the tag enabled?
3. **Use the data layer** - Don't rely on page scraping
4. **Log everything** - Use version notes to document changes
5. **Keep containers clean** - Remove unused tags/triggers/variables

### Documentation

When testing, document:

```
Version: 123
Changes:
- Added GA4 purchase event
- Modified product click trigger
- Updated checkout flow

Tests Performed:
- ✅ Purchase event fires on confirmation page
- ✅ Product clicks tracked correctly
- ✅ Checkout funnel complete
- ❌ Cross-domain tracking issue on subdomain (to fix)

Tested By: Henrik
Date: 2025-01-09
```

## Exit Preview Mode

To stop debugging:

1. **Click X** in Tag Assistant debug interface
2. **Click "Stop debugging"** on Tag Assistant page
3. **Close preview window**

Preview mode only affects your browser - regular visitors don't see the debug interface.

## Resources

- [GTM Preview and Debug Containers](https://support.google.com/tagmanager/answer/6107056)
- [Preview and Debug Server Containers](https://developers.google.com/tag-platform/tag-manager/server-side/debug)
- [Tag Assistant](https://support.google.com/tagassistant/answer/10039345)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [GTM Troubleshooting](https://support.google.com/tagmanager/topic/9002003)
