---
name: ga4-gtm-integration
description: Expert guidance for implementing GA4 using Google Tag Manager including configuration tags, event tags, triggers, variables, and data layer integration. Use when setting up GA4 in GTM, creating GA4 event tags, configuring GTM triggers for GA4, working with GTM data layer for GA4 events, or debugging GTM-GA4 implementation. Covers GTM container setup, Google Tag configuration, Preview mode, and GTM best practices for GA4.
---

# GA4 Google Tag Manager Integration

## Overview

Google Tag Manager (GTM) provides a powerful, no-code approach to implementing Google Analytics 4 tracking. This skill covers complete GTM-GA4 integration, from initial configuration tags to advanced event tracking with data layer integration.

## When to Use This Skill

Invoke this skill when:

- Setting up GA4 tracking through Google Tag Manager
- Creating GA4 Configuration tags (base tracking)
- Building GA4 event tags for specific user actions
- Configuring triggers for GA4 events (clicks, forms, custom events)
- Implementing dataLayer.push() for custom event tracking
- Using GTM Preview mode for testing GA4 implementation
- Debugging GTM-GA4 tag firing issues
- Working with GTM container files (.json) for GA4
- Managing GA4 tracking without code changes to website
- Migrating from gtag.js to GTM implementation

## Core Capabilities

### GTM-GA4 Setup Fundamentals

**GA4 Configuration Tag (Base Tag)**

The GA4 Configuration tag initializes GA4 on all pages. Create this first:

1. **Tag Type:** Google Tag (formerly GA4 Configuration)
2. **Tag ID:** GA4 Measurement ID (G-XXXXXXXXXX)
3. **Trigger:** Initialization - All Pages
4. **Configuration Settings:** Optional global parameters
5. **Shared Event Settings:** Parameters sent with every event

**Key Configuration Options:**
- Allow Google Signals
- Allow ad personalization signals
- Send page view automatically (default: true)
- User ID (if using cross-device tracking)
- Custom user properties

### Creating GA4 Event Tags

**Event Tag Structure:**

1. **Tag Configuration:** Google Tag
2. **Tag ID:** Same GA4 Measurement ID
3. **Event Name:** Specific event (e.g., "button_click", "form_submit")
4. **Event Parameters:** Additional data for the event
5. **Triggering:** Specific trigger for when event fires

**Common Event Tag Examples:**

**Button Click Event:**
- Event Name: `button_click`
- Parameters: `button_name`, `button_location`, `button_id`
- Trigger: Click - All Elements (filter by button ID/class)

**Form Submission Event:**
- Event Name: `form_submit`
- Parameters: `form_name`, `form_id`, `form_destination`
- Trigger: Form Submission (filter by form ID)

**Purchase Event:**
- Event Name: `purchase`
- Parameters: `transaction_id`, `value`, `currency`, `items`
- Trigger: Custom Event (`dataLayer.push({event: 'purchase'})`)

### GTM Triggers for GA4

**Trigger Types for GA4 Events:**

**Page View Triggers:**
- All Pages
- Some Pages (filtered by URL, page path)
- DOM Ready
- Window Loaded

**Click Triggers:**
- All Elements
- Just Links
- Filter by Click ID, Class, URL, Text

**Form Triggers:**
- Form Submission
- Filter by Form ID, Class, URL

**Custom Event Triggers:**
- Custom Event name from dataLayer
- Example: `event: 'add_to_cart'`

**JavaScript Error:**
- Error Message tracking

**Scroll Depth:**
- Vertical Scroll Percentage

### GTM Variables for GA4

**Built-in Variables (Enable in Variables section):**

**Page Variables:**
- Page URL
- Page Hostname
- Page Path
- Referrer

**Click Variables:**
- Click Element
- Click Classes
- Click ID
- Click Text
- Click URL

**Form Variables:**
- Form Element
- Form Classes
- Form ID
- Form Text

**Data Layer Variables:**

Create variables to extract data from `dataLayer`:

**Variable Type:** Data Layer Variable
**Data Layer Variable Name:** Exact key name (e.g., `product_id`, `user_tier`)
**Usage:** Reference in event parameters as `{{DL - Product ID}}`

### Data Layer Integration

**What is the Data Layer?**

JavaScript object that holds structured data for GTM to access:

```javascript
window.dataLayer = window.dataLayer || [];
```

**Pushing Events to Data Layer:**

```javascript
dataLayer.push({
  'event': 'add_to_cart',
  'product_id': 'SKU_123',
  'product_name': 'Blue T-Shirt',
  'price': 29.99,
  'quantity': 1
});
```

**GTM listens for the `event` key** and fires corresponding Custom Event triggers.

**Event Parameters from Data Layer:**

In GTM event tag, map Data Layer Variables to event parameters:
- Parameter Name: `product_id`
- Value: `{{DL - Product ID}}`

### Testing with GTM Preview Mode

**Workflow:**

1. Click **Preview** in GTM workspace
2. Connect to website
3. **Tag Assistant** opens showing real-time tag activity
4. Interact with website elements
5. View in Tag Assistant:
   - Events fired
   - Tags triggered
   - Variables populated
   - Parameters sent to GA4

**Verification Checklist:**
- GA4 Configuration tag fires on all pages (Initialization trigger)
- Event tags fire when expected (correct triggers)
- Event names appear correctly
- Event parameters match Data Layer
- No duplicate tag firing
- Variables populate with correct values

### Publishing GTM Container

**Steps:**

1. Click **Submit** (top-right)
2. Enter **Version Name** (e.g., "GA4 Setup - November 2024")
3. Enter **Version Description** (what changed)
4. Click **Publish**
5. Changes go live immediately

## Integration with Other Skills

- **ga4-setup** - Initial GA4 property and data stream setup prerequisite
- **ga4-gtag-implementation** - Alternative implementation method without GTM
- **ga4-recommended-events** - Implementing specific Google-recommended events via GTM
- **ga4-custom-events** - Creating custom event tags for business-specific tracking
- **ga4-debugview** - Testing GTM implementation with GA4 DebugView
- **gtm-configuration** - General GTM tag/trigger/variable knowledge
- **gtm-datalayer** - Advanced data layer implementation patterns

## References

- **references/gtm-ga4-setup-complete.md** - Complete step-by-step GTM-GA4 setup walkthrough
- **references/gtm-tags-triggers-variables.md** - Comprehensive tag, trigger, and variable reference for GA4
- **references/gtm-data-layer-ga4.md** - Data layer implementation patterns for GA4 events
- **references/gtm-preview-debugging.md** - GTM Preview mode usage and troubleshooting
- **references/gtm-best-practices-ga4.md** - GTM-specific best practices for GA4 implementation

## Quick Reference

**GTM-GA4 Setup Order:**
1. Create GA4 Configuration tag (Initialization trigger)
2. Test with Preview mode
3. Create event tags for specific tracking
4. Create triggers for events
5. Create data layer variables (if needed)
6. Test with Preview mode
7. Publish container

**Common Issues:**
- **Tags not firing:** Check trigger conditions in Preview mode
- **Wrong parameter values:** Verify Data Layer Variable mapping
- **Duplicate events:** Remove duplicate GTM tags or gtag() calls
- **Measurement ID not recognized:** Copy exact ID from GA4 Data Streams
