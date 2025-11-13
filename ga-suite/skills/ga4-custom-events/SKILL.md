---
name: ga4-custom-events
description: Expert guidance for creating business-specific custom events in GA4 beyond recommended events. Use when implementing custom tracking for unique business needs, creating industry-specific events (SaaS, education, media), defining custom event parameters, or tracking actions not covered by recommended events. Covers event naming conventions (snake_case, max 40 chars), parameter design, and implementation in gtag.js, GTM, and Measurement Protocol.
---

# GA4 Custom Events

## Overview

Create business-specific custom events in Google Analytics 4 for tracking user interactions beyond Google's recommended events. Custom events enable measurement of unique business goals, industry-specific actions, and contextual behaviors that directly impact business outcomes. Master event naming conventions, parameter design strategies, and implementation across gtag.js, Google Tag Manager, and Measurement Protocol.

## When to Use This Skill

Invoke this skill when:
- Creating custom event tracking for unique business actions
- Designing event structure for SaaS, education, media, or specialized industries
- Defining custom parameters and establishing naming conventions
- Implementing custom events in gtag.js, GTM, or server-side
- Registering custom parameters as custom dimensions
- Building comprehensive event tracking strategy for business goals
- Troubleshooting why custom events aren't appearing in GA4

## Core Capabilities

### Event Naming Conventions

Follow these principles for custom event names:

**Format & Constraints:**
- Use snake_case (lowercase with underscores): `video_tutorial_watched`, `demo_requested`
- Maximum 40 characters total length
- Action-oriented: start with verb when possible
- Descriptive and business-specific: avoid generic names like "event1", "click", "data"
- Consistent across implementation: same event name everywhere

**Naming Framework:**
```
[Action]_[Object]_[Context]
```

Examples:
- `product_comparison_viewed` (user compared products)
- `pricing_calculator_used` (engaged with pricing tool)
- `whitepaper_downloaded` (downloaded resource)
- `trial_signup_completed` (completed trial signup)
- `support_ticket_created` (created support issue)

**Anti-patterns (avoid):**
- Generic: `click`, `event`, `action`, `interaction`
- Numbered: `event1`, `event2`, `custom_event_123`
- Vague: `data_sent`, `tracking`, `user_action`
- Inconsistent: mixing `video_watched`, `videoWatched`, `VideoWatched`

### Event Parameter Design

**Parameter Strategy:**

Identify what context makes the event meaningful:

1. **Identify the action:** What user behavior are you measuring?
2. **Determine context:** What information would help analyze this action?
3. **Define parameters:** Which data points provide that context?
4. **Establish constraints:** Each parameter <100 characters

**Good Parameter Examples:**

For `course_enrollment`:
```
course_id: "COURSE_101"
course_name: "Advanced GA4"
instructor: "John Doe"
price: 99.99
currency: "USD"
level: "advanced"
```

For `support_ticket_created`:
```
ticket_type: "bug_report"
product: "mobile_app"
severity: "high"
resolution_time_expected: 24
department: "engineering"
```

**Parameter Limits:**
- Maximum 25 parameters per event
- Parameter names: 40 characters maximum
- Parameter values: 100 characters maximum (exceptions: page_location 1000)
- Use string, integer, or float types

### Industry-Specific Patterns

**SaaS Events:**
- `trial_started`, `trial_ended`, `upgrade_initiated`, `plan_downgraded`
- Include: plan_type, feature_count, estimated_value

**Education Events:**
- `lesson_completed`, `quiz_submitted`, `certificate_earned`
- Include: subject, difficulty_level, score_percentage

**E-commerce Events:**
- Beyond `purchase`: `product_compared`, `review_submitted`, `wishlist_added`
- Include: product_category, competitor_product, star_rating

**Media Events:**
- `article_shared`, `video_watched`, `podcast_episode_completed`
- Include: content_type, duration, engagement_percentage

### Implementation Across Platforms

**gtag.js Implementation:**
```javascript
gtag('event', 'demo_requested', {
  'demo_type': 'product_walkthrough',
  'industry': 'technology',
  'company_size': 'enterprise',
  'email_domain': 'company.com'
});
```

**GTM Data Layer Implementation:**
```javascript
dataLayer.push({
  'event': 'demo_requested',
  'demo_type': 'product_walkthrough',
  'industry': 'technology'
});
```

**Measurement Protocol (Server-Side):**
```python
event_data = {
  "client_id": "123.456",
  "events": [{
    "name": "demo_requested",
    "params": {
      "demo_type": "product_walkthrough",
      "industry": "technology"
    }
  }]
}
```

### Registration as Custom Dimensions

Custom parameters won't appear in GA4 reports until registered:

1. Send parameter in event (any platform)
2. Admin → Data Display → Custom Definitions → Create Custom Dimension
3. Configure: Dimension Name, Scope (Event/User/Item), Event Parameter (exact name)
4. Save and wait 24-48 hours for data to populate

## References

- **references/naming-conventions-guide.md** - Complete naming conventions, patterns, and examples
- **references/event-design-framework.md** - Event architecture, parameter scoping, and design workflows
- **references/industry-patterns.md** - Industry-specific events for SaaS, education, media, ecommerce
- **references/parameter-strategy.md** - Parameter design, validation, and best practices

## Integration with Other Skills

- **ga4-events-fundamentals** - Understanding GA4 event architecture and scopes (prerequisite)
- **ga4-recommended-events** - Recommended events that complement custom events
- **ga4-gtag-implementation** - Implementing custom events via gtag.js
- **ga4-gtm-integration** - Implementing custom events via Google Tag Manager
- **ga4-measurement-protocol** - Server-side custom event implementation
- **ga4-custom-dimensions** - Registering custom parameters as reportable dimensions
- **ga4-debugview** - Testing and validating custom events before production
