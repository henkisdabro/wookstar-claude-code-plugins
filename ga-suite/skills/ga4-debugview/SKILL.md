---
name: ga4-debugview
description: Comprehensive guide to testing and validating GA4 implementation using DebugView, Preview mode, and real-time monitoring. Use when verifying GA4 tracking, troubleshooting events not firing, validating event parameters, testing GTM implementations, checking DebugView data, or debugging implementation issues. Covers enabling debug mode, reading DebugView interface, common validation patterns, and troubleshooting workflows.
---

# GA4 DebugView Testing and Validation

## Overview

DebugView is GA4's real-time debugging tool for validating implementation, testing events, and troubleshooting tracking issues before data appears in standard reports.

## When to Use This Skill

Invoke this skill when:

- Testing new GA4 implementation or tracking changes
- Verifying events fire correctly with expected parameters
- Troubleshooting events not appearing in GA4
- Validating GTM tag configurations before publishing
- Checking event parameter values and data types
- Testing e-commerce tracking implementation
- Debugging duplicate or missing events
- Verifying custom dimensions and user properties
- Testing cross-device tracking with User ID
- Validating consent mode implementation
- Confirming measurement protocol server-side events

## Core Capabilities

### Enabling DebugView

**Method 1: Browser Extension (Recommended)**

1. Install **Google Analytics Debugger** Chrome extension
2. Navigate to your website
3. Events automatically appear in DebugView

**Method 2: URL Parameter**

Add `?debug_mode=true` to URL:
```
https://yourwebsite.com?debug_mode=true
```

**Method 3: gtag.js Configuration**

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});
```

**Method 4: GTM Configuration**

In GA4 Configuration tag, add parameter:
- Parameter: `debug_mode`
- Value: `true`

### Accessing DebugView

**Steps:**
1. Open GA4 property
2. Navigate to **Admin** (bottom-left)
3. Click **DebugView** (under Property column)
4. View real-time debug events

**Requirements:**
- Debug mode enabled on website
- Events sent within last 30 minutes
- Active user session

### DebugView Interface

**Main Sections:**

**1. Device Stream (Left Panel)**
- Shows active debug sessions
- Displays device type and identifier
- Lists user_pseudo_id or user_id
- Shows session timing

**2. Event Stream (Center Panel)**
- Real-time event list
- Event names and timestamps
- Event count per event type
- Event selection for details

**3. Event Details (Right Panel)**
- Selected event parameters
- User properties
- Event timestamp
- Device and session information

### Reading Event Data

**Event Card Shows:**
- **Event Name:** (e.g., `page_view`, `purchase`, `button_click`)
- **Timestamp:** When event fired
- **Event Parameters:** All parameters sent with event
- **User Properties:** Set at user level
- **Event Count:** Number of times this event fired in session

**Example Event:**
```
Event: purchase
Timestamp: 14:23:45
Parameters:
  transaction_id: "T_12345"
  value: 99.99
  currency: "USD"
  items: [Array with 2 items]
User Properties:
  user_tier: "premium"
```

### Validating Events

**Page View Validation:**

**Expected Events:**
1. `first_visit` (new users only)
2. `session_start` (new sessions)
3. `page_view` (every page)

**Check:**
- `page_location` parameter (full URL)
- `page_title` parameter (page title)
- `page_referrer` (previous page)

**Purchase Event Validation:**

**Required Parameters:**
- `transaction_id` (unique ID)
- `value` (number, total revenue)
- `currency` (3-letter ISO code)
- `items` (array of products)

**Check:**
- All parameters present
- Correct data types (number vs string)
- Items array structure correct
- No duplicate transaction_id

**Custom Event Validation:**

**Check:**
- Event name follows naming conventions (lowercase, underscores)
- Event name ≤40 characters
- Event parameters are descriptive
- Parameter values are correct types
- Custom parameters appear (not just default)

### Common Validation Patterns

**E-commerce Flow:**

1. **view_item_list** → Items array populated
2. **select_item** → Item ID and name present
3. **view_item** → Item details correct
4. **add_to_cart** → Items, value, currency present
5. **begin_checkout** → Items and value present
6. **purchase** → All required parameters, unique transaction_id

**Form Tracking:**

1. User loads page → `page_view`
2. User starts form → `form_start` (if tracked)
3. User submits form → `form_submit`
4. Parameters: `form_name`, `form_id`, `form_destination`

**Video Tracking:**

1. `video_start` → video_title, video_id
2. `video_progress` → video_percent (25, 50, 75)
3. `video_complete` → video_percent: 100

### Troubleshooting with DebugView

**Issue: Events Not Appearing**

**Checks:**
1. Debug mode enabled?
2. Correct GA4 property selected?
3. Events sent in last 30 minutes?
4. Measurement ID correct?
5. Browser blocking GA4 (ad blockers)?

**Issue: Missing Parameters**

**Checks:**
1. Parameter name spelled correctly?
2. Data layer includes parameter?
3. GTM variable populated?
4. Parameter value not empty/undefined?

**Issue: Wrong Parameter Values**

**Checks:**
1. Data type correct (string vs number)?
2. Variable mapping correct in GTM?
3. JavaScript providing correct value?
4. Encoding issues (special characters)?

**Issue: Duplicate Events**

**Checks:**
1. Multiple tags firing for same event?
2. Both gtag.js and GTM installed?
3. Trigger firing multiple times?
4. Event pushed to data layer twice?

### Testing Workflows

**Workflow 1: New Implementation Test**

1. Enable debug mode
2. Open DebugView
3. Load website page
4. Verify automatic events:
   - `session_start`
   - `page_view`
   - `first_visit` (if new user)
5. Navigate to second page
6. Verify `page_view` fires again
7. Check parameters correct on all events

**Workflow 2: Custom Event Test**

1. Enable debug mode
2. Open DebugView
3. Trigger custom event (click button, submit form)
4. Verify event appears with correct name
5. Check all expected parameters present
6. Verify parameter values correct
7. Check data types (number vs string)

**Workflow 3: E-commerce Test**

1. Enable debug mode
2. Complete purchase flow
3. Verify each step fires correct event
4. Check items array structure:
   - `item_id` present
   - `item_name` present
   - `price` is number
   - `quantity` is integer
5. Verify `purchase` event has unique `transaction_id`
6. Check `value` matches cart total

**Workflow 4: GTM Integration Test**

1. Enable GTM Preview mode
2. Enable debug mode
3. Trigger GTM tag
4. Verify in GTM Preview:
   - Tag fires
   - Variables populated
5. Verify in DebugView:
   - Event appears
   - Parameters match GTM
6. Cross-reference both tools

### User Properties Testing

**Set User Properties:**

```javascript
gtag('set', 'user_properties', {
  'user_tier': 'premium',
  'account_age_days': 365
});
```

**Verify in DebugView:**
1. Click any event in stream
2. Scroll to **User Properties** section
3. Verify properties appear:
   - `user_tier`: "premium"
   - `account_age_days`: "365"
4. Check properties persist across events

### Testing Best Practices

**Before Launch:**
- Test all critical events (purchase, sign_up, etc.)
- Verify parameters on multiple browsers
- Test on mobile devices
- Check events in incognito/private mode
- Verify with multiple user types (new/returning)

**During Development:**
- Test each new tag/event immediately
- Use DebugView alongside GTM Preview
- Document expected vs actual behavior
- Share DebugView screenshots with team

**After Launch:**
- Monitor DebugView for first 30 minutes
- Check for unexpected duplicate events
- Verify event volumes match expectations
- Confirm events appear in standard reports (24-48 hours)

## Integration with Other Skills

- **ga4-setup** - Initial property setup before testing
- **ga4-gtag-implementation** - Testing gtag.js implementation
- **ga4-gtm-integration** - Testing GTM implementation (use Preview + DebugView together)
- **ga4-recommended-events** - Validating recommended event structures
- **ga4-custom-events** - Testing custom event implementations
- **ga4-measurement-protocol** - Validating server-side events
- **ga4-user-tracking** - Testing User ID and user properties
- **ga4-privacy-compliance** - Verifying consent mode implementation

## References

- **references/debugview-interface-complete.md** - Detailed DebugView UI walkthrough
- **references/validation-checklists.md** - Event-specific validation checklists
- **references/troubleshooting-guide.md** - Common issues and solutions
- **references/testing-workflows.md** - Step-by-step testing procedures
- **references/ecommerce-validation.md** - E-commerce event testing guide

## Quick Reference

**Enable Debug Mode:**
- Chrome extension: Google Analytics Debugger (easiest)
- URL parameter: `?debug_mode=true`
- gtag.js: `debug_mode: true`
- GTM: Add debug_mode parameter to Configuration tag

**Access DebugView:**
Admin → DebugView

**Key Checks:**
- Event names ≤40 characters, lowercase, underscores
- Required parameters present
- Correct data types (string, number, array)
- No PII in parameters
- Unique transaction_id for purchases
- Items array properly formatted for e-commerce
