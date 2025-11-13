---
name: ga4-custom-dimensions
description: Expert guidance for creating and managing Google Analytics 4 custom dimensions and metrics including event-scoped, user-scoped, and item-scoped dimensions with proper registration and scoping. Use when registering custom parameters as custom dimensions, understanding scope differences (event vs user vs item), creating custom dimensions in GA4 Admin, troubleshooting why custom dimensions aren't appearing in reports, working with custom metrics, implementing calculated metrics, or managing dimension limits (25 user-scoped, 50 event-scoped in standard GA4).
---

# GA4 Custom Dimensions

## Overview

Custom dimensions and metrics enable transformation of event parameters into reportable fields in GA4. This skill covers the complete workflow: sending parameters in events, registering them as dimensions, selecting correct scopes, and troubleshooting missing data.

All custom parameters remain invisible in GA4 reports until registered as custom dimensions. Registration requires understanding three scope types (event, user, item), following naming conventions, and accounting for the 24-48 hour processing delay.

## When to Use This Skill

Invoke this skill when:
- Registering custom event parameters as event-scoped dimensions
- Setting up user properties as user-scoped custom dimensions
- Creating item-scoped dimensions for ecommerce tracking
- Implementing custom metrics for numerical tracking
- Building calculated metrics from existing metrics
- Troubleshooting why custom parameters don't appear in reports
- Planning dimension strategy within account limits (50 event/25 user/10 item)
- Understanding scope differences for specific business needs
- Dealing with the 24-48 hour data population delay

## Core Concepts: Understanding Scopes

GA4 uses three **scopes** that determine what data the parameter applies to:

### Event Scope (Single Event Only)

**Applies To:** Individual event occurrence
**Lifespan:** That specific event only
**Use:** Event-specific information

Event-scoped dimensions track data unique to each event. Once registered, they appear only for that event type in reports.

```javascript
gtag('event', 'button_click', {
  'button_name': 'Subscribe',        // Event-scoped
  'button_location': 'header',       // Event-scoped
  'button_id': 'btn_subscribe_01'    // Event-scoped
});
```

**Examples:** Which form was submitted? What video was watched? Which page in sequence? Which button was clicked?

### User Scope (All User Events)

**Applies To:** All events from that user
**Lifespan:** Session persistence (until cleared)
**Use:** User attributes that persist

User-scoped dimensions (user properties) apply to every event from that user during the session. Set once, they persist across multiple events.

```javascript
gtag('set', {
  'subscription_tier': 'premium',         // User-scoped
  'customer_lifetime_value': 5000,        // User-scoped
  'preferred_language': 'en'              // User-scoped
});
```

**Examples:** What subscription level? What's customer lifetime value? What language preference? What company size?

### Item Scope (Product-Level Data)

**Applies To:** Individual items in ecommerce events
**Lifespan:** That transaction only
**Use:** Product-specific information

Item-scoped dimensions apply only to products in purchase, add_to_cart, and related ecommerce events.

```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',
      'item_color': 'blue',         // Item-scoped
      'item_size': 'large',         // Item-scoped
      'supplier': 'Vendor A'        // Item-scoped
    }
  ]
});
```

**Examples:** Which color was purchased? What size items sell best? Which supplier's products? Product quality rating?

## Registration Workflow

### Step 1: Send Parameter in Event Code

Send the parameter in either gtag.js event call, gtag('set') for user properties, or in items array:

```javascript
// Event parameter
gtag('event', 'watch_video', {
  'video_duration': 1200,
  'video_quality': 'hd'
});

// User parameter
gtag('set', {
  'customer_segment': 'enterprise'
});

// Item parameter
gtag('event', 'purchase', {
  'items': [{
    'item_id': 'SKU_123',
    'supplier': 'Vendor A'  // NEW parameter
  }]
});
```

### Step 2: Verify in DebugView

Before registration, confirm the parameter appears in DebugView:

1. Go to Admin → DebugView
2. Enable Google Analytics Debugger Chrome extension
3. Trigger the event that sends parameter
4. See parameter in DebugView event details
5. Note exact parameter name (case-sensitive)

### Step 3: Register as Custom Dimension

Navigate to Admin → Data Display → Custom Definitions:

1. Click "Create Custom Dimension"
2. Fill form:
   - **Dimension Name:** Human-friendly name (appears in reports, e.g., "Video Quality")
   - **Scope:** Select Event, User, or Item
   - **Event Parameter:** Exact parameter name from code (case-sensitive, e.g., "video_quality")
   - **Description:** Optional notes
3. Click Save

### Step 4: Wait for Data Population

**Critical:** Custom dimensions don't appear in reports immediately. Wait 24-48 hours for:
- Historical data retroactively processed
- New incoming data to populate
- Dimension to appear in dimension selectors

Do not create duplicate dimensions while waiting.

### Step 5: Use in Reports

After 24-48 hours, access custom dimensions:
- Standard Reports: Add custom dimension as column
- Explorations: Select from Dimension picker
- Filters/Segments: Filter by custom dimension values
- Google Ads: Export for audience building (if linked)

## Dimension Limits & Quotas

Standard GA4 Property limits:
- **User-scoped:** 25 custom dimensions
- **Event-scoped:** 50 custom dimensions
- **Item-scoped:** 10 custom dimensions
- **Custom metrics:** 50
- **Calculated metrics:** 5

GA4 360 properties have higher limits (100 user, 125 event, 25 item). Plan dimensions strategically.

## Custom Metrics Implementation

### Standard Custom Metrics

Create metrics for numerical tracking:

```javascript
gtag('event', 'video_watched', {
  'video_title': 'GA4 Tutorial',
  'minutes_watched': 45,      // METRIC
  'completion_rate': 85       // METRIC
});
```

Register in Custom Definitions:
1. Click "Create Custom Metric"
2. Metric Name: "Minutes Watched"
3. Type: Standard
4. Measurement Unit: Minutes (optional)
5. Event Parameter: "minutes_watched"
6. Save and wait 24-48 hours

### Calculated Metrics

Create metrics derived from mathematical operations on existing metrics:

```
Calculated Metric: "Revenue per User"
= revenue / users

Calculated Metric: "Conversion Rate"
= conversions / sessions * 100
```

Create in Custom Definitions:
1. Click "Create Custom Metric"
2. Metric Name: "Revenue per User"
3. Type: Calculated
4. Formula: `revenue / users`
5. Save (no processing delay)

## Common Troubleshooting

**Custom dimension doesn't appear after 48 hours:**
- Verify parameter name matches exactly (case-sensitive)
- Confirm new events are actually sending parameter
- Check DebugView to see current events with parameter
- Ensure scope selection was correct
- Not all parameter values may appear if threshold not met

**Parameter appears in DebugView but not in reports:**
- Normal during first 24-48 hours
- Check Realtime reports first (available sooner)
- Verify at least 1000 events with that parameter for visibility
- Low-traffic parameters may not appear

**Dimension quota exceeded:**
- Standard GA4: Maximum 50 event-scoped dimensions
- Plan which dimensions are essential
- Delete unused dimensions if needed
- Consider GA4 360 for higher limits

**Multiple users show same custom dimension value:**
- For user-scoped: Expected (applies to all user events)
- For event-scoped: Normal if multiple events send same value
- For item-scoped: Normal across products

## Integration with Other Skills

- **ga4-events-fundamentals** - Understand event structure and parameter basics
- **ga4-custom-events** - Create parameters to register as dimensions
- **ga4-user-tracking** - User properties (user-scoped dimensions)
- **ga4-reporting** - Use custom dimensions in standard reports and explorations

## References

- **references/scopes-complete-guide.md** - Detailed scope examples and decision framework
- **references/dimension-registration-steps.md** - Step-by-step Admin UI walkthrough
- **references/custom-metrics-guide.md** - Standard and calculated metrics
- **references/dimension-limits-quotas.md** - Account limits and best practices
- **references/dimension-troubleshooting.md** - Solutions for common issues

## Quick Reference

**Scope Selection Matrix:**
- Event-specific data → Event scope
- User attributes → User scope
- Product data in ecommerce → Item scope

**Registration Process:**
1. Send parameter in event code
2. Verify in DebugView
3. Admin → Custom Definitions → Create
4. Wait 24-48 hours
5. Use in reports

**Parameter Limits:**
- Parameter name: 40 characters max
- Parameter value: 100 characters max (exceptions: page_location 1000, page_title 300)
- Parameters per event: 25 max
- Items array max: 27 items
