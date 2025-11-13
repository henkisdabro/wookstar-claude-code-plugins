---
name: ga4-gtag-implementation
description: Expert guidance for implementing GA4 using gtag.js directly on websites without Google Tag Manager. Use when implementing gtag.js tracking code, writing custom gtag() commands, setting up direct website tracking, working with gtag('event'), gtag('config'), or gtag('set') commands, or when GTM is not available. Covers .html, .js, .jsx files with gtag implementations and dataLayer integration.
---

# GA4 gtag.js Direct Implementation

## Overview

gtag.js (Google Tag) is the official JavaScript library for implementing Google Analytics 4 tracking directly on websites without Google Tag Manager. This skill provides comprehensive guidance for direct gtag.js implementation including installation, event tracking, user property management, and real-world integration patterns.

## When to Use This Skill

Invoke this skill when:
- Implementing GA4 tracking directly in website code
- Writing custom gtag() commands for event tracking
- Setting up GA4 without Google Tag Manager
- Configuring gtag('event') calls for custom tracking
- Implementing user properties with gtag('set')
- Troubleshooting gtag.js implementations
- Integrating gtag.js with JavaScript frameworks (React, Vue, Angular, Next.js)
- Working with .html, .js, .jsx, .tsx files containing gtag code
- Managing window.dataLayer programmatically

## Core gtag() Commands

### gtag('config') - Initialize GA4

Initializes Google Analytics 4 with the measurement ID and sets default configuration parameters.

**Basic Usage:**
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

**With Parameters:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'page_title': 'Custom Page Title',
  'page_location': window.location.href,
  'user_id': 'user_12345'
});
```

### gtag('event') - Send Events

Sends events to GA4 with optional parameters.

**Simple Event:**
```javascript
gtag('event', 'sign_up', {
  'method': 'email'
});
```

**Ecommerce Event:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_' + Date.now(),
  'value': 99.99,
  'currency': 'USD',
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product Name',
    'price': 99.99,
    'quantity': 1
  }]
});
```

### gtag('set') - Set User Properties

Sets user-level properties that persist across sessions.

**User ID:**
```javascript
// On login
gtag('set', {
  'user_id': 'user_' + userId
});

// On logout - MUST use null, never empty string
gtag('set', {
  'user_id': null
});
```

**Custom Properties:**
```javascript
gtag('set', {
  'subscription_tier': 'premium',
  'customer_segment': 'enterprise'
});
```

## Installation Quick Start

Place this snippet in the `<head>` section of every page, before all other scripts:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with the Measurement ID from GA4 Data Streams.

## Common Implementation Patterns

### Button Click Tracking
Track user interactions with specific buttons or links.

### Form Submission Tracking
Capture form submissions with custom event parameters.

### Page View Tracking
Override automatic page view tracking for single-page applications.

### Ecommerce Tracking
Implement purchase funnel tracking (view_item, add_to_cart, begin_checkout, purchase).

### User Authentication
Track login events and set User ID for cross-device tracking.

## Integration with Other Skills

- **ga4-setup** - Initial property setup required before implementing gtag.js
- **ga4-events-fundamentals** - Understand event structure and parameter concepts
- **ga4-recommended-events** - Implement recommended event names via gtag.js
- **ga4-custom-events** - Create custom events for business-specific tracking
- **ga4-debugview** - Test and validate gtag.js implementation
- **ga4-gtm-integration** - Alternative implementation method using Tag Manager

## References

Detailed documentation available in references directory:

- **references/gtag-commands-complete.md** - Complete gtag() command reference with all variants and parameters
- **references/installation-guide.md** - Step-by-step installation and verification process
- **references/real-world-patterns.md** - Production-ready examples for forms, ecommerce, authentication, SPAs
- **references/performance-optimization.md** - Best practices for async loading, batching, and performance

## Quick Reference

**Key Commands:**
- `gtag('js', new Date())` - Initialize library
- `gtag('config', 'G-ID')` - Configure GA4 property
- `gtag('event', 'name', {})` - Send event
- `gtag('set', {})` - Set user properties

**Critical Rules:**
- Place snippet in `<head>` before other scripts
- Use null (not empty string) to clear user properties
- Maximum 25 parameters per event
- Event names: 40 character limit, snake_case
- Custom parameters must be registered as custom dimensions in GA4 Admin

**Common Pitfalls:**
- gtag() called before initialization
- Multiple gtag snippets (causes duplicate events)
- Empty string "" instead of null for clearing User ID
- Missing currency parameter on purchase events
- Not registering custom parameters as dimensions

## Framework-Specific Considerations

**React/Next.js:** Use useEffect hooks for page view tracking in client components

**Vue.js:** Integrate gtag calls in Vue Router navigation guards

**Angular:** Implement tracking service and inject into components

**Single-Page Applications:** Manual page_view tracking required for route changes
