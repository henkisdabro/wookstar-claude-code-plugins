---
name: ga4-events-fundamentals
description: Comprehensive guide to GA4 event architecture including automatically collected events, enhanced measurement, recommended events, and custom events. Use when understanding GA4 event structure, implementing event tracking, configuring event parameters, working with event scopes (event/user/item), or troubleshooting event collection. Covers event naming conventions, parameter limits (25 parameters, 40 char names), and the four event categories.
---

# GA4 Events Fundamentals

## Overview

Google Analytics 4 uses an event-based architecture where every user interaction is tracked as an event. Understanding GA4's event structure, parameter system, and scoping model is fundamental to successful implementation. This skill provides comprehensive guidance on the four event categories, parameter configuration, and best practices for event tracking.

## When to Use This Skill

Invoke this skill when:
- Learning GA4 event-based architecture fundamentals
- Understanding differences between event types (automatic, enhanced, recommended, custom)
- Implementing event tracking on websites or applications
- Configuring event parameters and understanding parameter limits
- Working with event scopes (event-scoped, user-scoped, item-scoped)
- Troubleshooting why events aren't firing correctly
- Analyzing event parameters in DebugView
- Planning event taxonomy and naming conventions
- Understanding parameter constraints (25 per event, 40 char names)
- Configuring enhanced measurement settings

## Core Capabilities

### Four Event Categories

**1. Automatically Collected Events**
Events that fire without additional configuration once GA4 is installed.

Core automatic events:
- `session_start` - User session begins
- `first_visit` - User's first visit to site
- `user_engagement` - Page in focus for 1+ second
- `page_view` - Page loads (when enhanced measurement enabled)

**2. Enhanced Measurement Events**
Automatically tracked interactions that can be toggled on/off in GA4 settings.

Configurable enhanced measurement events:
- `scroll` - User scrolls to 90% page depth
- `click` - Outbound link clicks
- `file_download` - Downloads of common file types
- `video_start`, `video_progress`, `video_complete` - YouTube video engagement
- `view_search_results` - Site search performed
- `form_start`, `form_submit` - Form interactions

**3. Recommended Events**
Google-defined event names with standardized parameters for consistency.

Key recommended events:
- `login` / `sign_up` - User authentication
- `purchase` - Ecommerce transaction (most critical)
- `add_to_cart` / `remove_from_cart` - Shopping cart actions
- `begin_checkout` - Checkout initiated
- `view_item` / `view_item_list` - Product views
- `search` - Site search
- `generate_lead` - Lead generation

**4. Custom Events**
Business-specific events created for unique tracking needs.

Examples:
- `video_tutorial_watched`
- `whitepaper_downloaded`
- `demo_requested`
- `pricing_calculator_used`

### Event Structure

Every GA4 event consists of:
- **Event name** (required) - Max 40 characters, snake_case
- **Event parameters** (optional) - Up to 25 parameters per event
- **Event timestamp** (automatic)
- **User information** (automatic)

### Parameter Scopes

**Event Scope**
Applies to single event occurrence. Use for event-specific data.
Example: button_name, form_id, video_title

**User Scope**
Applies to all events from that user. Use for user attributes.
Example: subscription_tier, customer_segment, loyalty_level

**Item Scope**
Applies to products in ecommerce events. Use for product data.
Example: item_color, item_size, supplier_name

### Event and Parameter Limits

Critical constraints:
- Maximum 500 distinct event names per property
- Maximum 25 parameters per event
- Event names: 40 character limit
- Parameter names: 40 character limit
- Parameter values: 100 character limit (exceptions: page_title 300, page_referrer 420, page_location 1000)
- Event-scoped custom dimensions: 50 per property (standard)
- User-scoped custom dimensions: 25 per property (standard)
- Item-scoped custom dimensions: 10 per property (standard)

## Event Naming Conventions

**Best Practices:**
- Use snake_case (lowercase with underscores)
- Be descriptive and action-oriented
- Start with verb when possible
- Keep under 40 characters
- Avoid generic names

**Pattern:**
```
[action]_[object]_[context]

Examples:
- video_tutorial_started
- whitepaper_downloaded
- demo_request_submitted
- pricing_calculator_used
```

**Avoid:**
- event1, event2, data, click (too generic)
- MyCustomEvent, customEvent (wrong case)
- very_long_descriptive_event_name_that_exceeds_limits (too long)

## Quick Reference

### Common Event Parameters
```
value - Monetary value
currency - ISO currency code (USD, EUR, GBP)
transaction_id - Unique transaction identifier
items - Array of product objects (ecommerce)
method - Login/signup method
search_term - User search query
```

### Accessing Event Data
- **DebugView:** Admin → DebugView (real-time event stream)
- **Realtime Reports:** Reports → Realtime (last 30 minutes)
- **Standard Reports:** Reports → Engagement → Events (24hr+ delay)

## Integration with Other Skills

- **ga4-setup** - Foundation prerequisite for GA4 installation
- **ga4-recommended-events** - Implementing specific recommended events with proper parameters
- **ga4-custom-events** - Creating custom events beyond fundamentals
- **ga4-custom-dimensions** - Registering event parameters as custom dimensions
- **ga4-gtag-implementation** - Implementing events via gtag.js
- **ga4-gtm-integration** - Implementing events via Google Tag Manager
- **ga4-debugview** - Verifying event firing and parameters

## References

Detailed documentation in references directory:

- **references/event-types-complete.md** - Comprehensive guide to all four event categories with examples
- **references/event-parameters-guide.md** - Complete event parameter reference and usage patterns
- **references/parameter-scopes.md** - Deep dive into event, user, and item scopes
- **references/event-naming-conventions.md** - Best practices and naming patterns with examples

Code examples available in assets directory:

- **assets/event-structure-examples.js** - Ready-to-use event implementation examples for all event types
