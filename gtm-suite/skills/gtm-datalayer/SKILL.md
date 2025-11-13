---
name: gtm-datalayer
description: Expert guidance for implementing the GTM data layer including structure, events, e-commerce tracking, SPA patterns, and best practices. Use when designing data layer architecture, implementing tracking events, setting up e-commerce data, debugging data layer issues, migrating to GA4 data layer patterns, working with dataLayer.push syntax, implementing data layers in React, Vue, Angular, or Next.js applications, or working with .js, .jsx, or .tsx files containing ecommerce objects.
---

# GTM Data Layer Expert

## Overview

This skill provides comprehensive expertise for implementing and managing the Google Tag Manager data layer, the foundational data structure that powers GTM implementations. Use this skill for data layer architecture, event tracking patterns, e-commerce implementation, single-page application (SPA) strategies, and data layer best practices.

## When to Use This Skill

Invoke this skill when:
- Designing data layer architecture for a website or app
- Implementing custom events and event tracking
- Setting up e-commerce tracking (GA4 or enhanced e-commerce)
- Building data layer for single-page applications (React, Vue, Angular)
- Debugging data layer issues or undefined variables
- Migrating from Universal Analytics to GA4 data layer schema
- Establishing data layer naming conventions and standards
- Creating data layer documentation
- Validating data layer implementation
- Troubleshooting timing or data quality issues

## Data Layer Fundamentals

### What is the Data Layer?

The data layer is a JavaScript object that temporarily stores data before passing it to GTM. It acts as a structured data repository that separates your website's data from your tag management implementation.

**Basic Structure:**
```javascript
window.dataLayer = window.dataLayer || [];
```

### Data Layer Initialization

Always initialize the data layer BEFORE the GTM container snippet:

```javascript
<!-- Data Layer -->
<script>
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    'page_type': 'homepage',
    'user_logged_in': true,
    'user_id': 'user123'
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){...GTM snippet...})</script>
```

### Pushing to the Data Layer

Use `dataLayer.push()` to add data:

```javascript
// Basic push
dataLayer.push({
  'event': 'custom_event',
  'event_category': 'engagement',
  'event_label': 'button_click'
});

// E-commerce push
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.99,
    'currency': 'USD',
    'items': [
      {
        'item_id': 'SKU123',
        'item_name': 'Product Name',
        'price': 99.99,
        'quantity': 1
      }
    ]
  }
});
```

## Common Data Layer Patterns

### Page Metadata

```javascript
dataLayer.push({
  'page_type': 'product',
  'page_category': 'electronics',
  'page_language': 'en',
  'page_region': 'US'
});
```

### User Information

```javascript
dataLayer.push({
  'user_id': 'hashed_user_id',  // Never use PII!
  'user_logged_in': true,
  'user_type': 'premium',
  'user_ltv_segment': 'high'
});
```

### Custom Events

```javascript
// Form submission
dataLayer.push({
  'event': 'form_submission',
  'form_id': 'contact_form',
  'form_name': 'Contact Us'
});

// Video interaction
dataLayer.push({
  'event': 'video_progress',
  'video_title': 'Product Demo',
  'video_percent': 50
});

// Search
dataLayer.push({
  'event': 'search',
  'search_term': 'running shoes',
  'search_results': 42
});
```

### Error Tracking

```javascript
dataLayer.push({
  'event': 'error',
  'error_type': '404',
  'error_message': 'Page not found',
  'error_url': window.location.href
});
```

## E-commerce Data Layer

### GA4 E-commerce Events

**View Item List:**
```javascript
dataLayer.push({
  'event': 'view_item_list',
  'ecommerce': {
    'items': [
      {
        'item_id': 'SKU123',
        'item_name': 'Product Name',
        'item_brand': 'Brand',
        'item_category': 'Category',
        'price': 29.99,
        'quantity': 1
      }
    ]
  }
});
```

**Add to Cart:**
```javascript
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'currency': 'USD',
    'value': 29.99,
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
```

**Purchase:**
```javascript
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.99,
    'tax': 8.00,
    'shipping': 5.00,
    'currency': 'USD',
    'items': [
      {
        'item_id': 'SKU123',
        'item_name': 'Product Name',
        'item_brand': 'Brand',
        'item_category': 'Electronics',
        'price': 29.99,
        'quantity': 3
      }
    ]
  }
});
```

### E-commerce Implementation Workflow

1. **Product Listing Pages**: Push `view_item_list` with all visible products
2. **Product Clicks**: Push `select_item` when user clicks product
3. **Product Detail Pages**: Push `view_item` for the viewed product
4. **Add to Cart**: Push `add_to_cart` when item added
5. **Checkout Steps**: Push `begin_checkout`, `add_shipping_info`, `add_payment_info`
6. **Purchase**: Push `purchase` on order confirmation page

## Single-Page Application (SPA) Data Layer

### Virtual Pageview Pattern

```javascript
// On route change in React/Vue/Angular
function trackVirtualPageview(pageData) {
  // Clear previous page data
  dataLayer.push({
    page_title: undefined,
    page_type: undefined,
    page_category: undefined
  });

  // Push new page data
  dataLayer.push({
    'event': 'virtual_pageview',
    'page_title': pageData.title,
    'page_location': pageData.url,
    'page_type': pageData.type
  });
}
```

### React Example

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    dataLayer.push({
      'event': 'virtual_pageview',
      'page_path': location.pathname,
      'page_title': document.title
    });
  }, [location]);
}
```

### Next.js Example

```javascript
// pages/_app.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      dataLayer.push({
        'event': 'virtual_pageview',
        'page_path': url,
        'page_title': document.title
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

## Data Layer Best Practices

### Naming Conventions

✅ **Good:**
```javascript
dataLayer.push({
  'event': 'form_submit',
  'form_id': 'contact_form',
  'user_logged_in': true
});
```

❌ **Bad:**
```javascript
dataLayer.push({
  'event': 'formSubmit',  // Inconsistent casing
  'FormID': 'contact_form',  // PascalCase
  'logged in': true  // Spaces
});
```

**Conventions:**
- Use snake_case for consistency
- Use descriptive names
- Avoid abbreviations unless standard
- Be consistent across all properties

### Data Structure

**Flat structure for simple data:**
```javascript
dataLayer.push({
  'event': 'custom_event',
  'event_category': 'engagement',
  'event_action': 'click',
  'event_label': 'cta_button'
});
```

**Nested structure for complex data:**
```javascript
dataLayer.push({
  'event': 'product_view',
  'product': {
    'id': 'SKU123',
    'name': 'Product Name',
    'price': 29.99,
    'category': 'Electronics'
  }
});
```

### Timing Considerations

1. Initialize data layer BEFORE GTM snippet
2. Push critical page data before GTM loads
3. Push event-specific data when events occur
4. For SPAs, handle route changes properly
5. Consider async data loading

### Security and Privacy

**❌ NEVER include PII in data layer:**
```javascript
// BAD - Do not do this!
dataLayer.push({
  'user_email': 'user@example.com',
  'user_name': 'John Doe',
  'credit_card': '1234-5678-9012-3456'
});
```

**✅ Use hashed or anonymized IDs:**
```javascript
// GOOD
dataLayer.push({
  'user_id': 'hashed_user_id_123abc',
  'user_segment': 'premium'
});
```

### Data Quality

- Always validate required fields exist
- Use consistent data types (string, number, boolean)
- Provide default values when appropriate
- Handle null/undefined gracefully
- Test thoroughly across user journeys

## Debugging Data Layer

### Browser Console Inspection

```javascript
// View entire data layer
console.log(window.dataLayer);

// View specific push
dataLayer.push({
  'event': 'test_event',
  'test_data': 'value'
});
console.log(dataLayer[dataLayer.length - 1]);

// Watch for pushes
const originalPush = dataLayer.push;
dataLayer.push = function() {
  console.log('DataLayer push:', arguments[0]);
  return originalPush.apply(dataLayer, arguments);
};
```

### GTM Preview Mode

1. Enter Preview mode in GTM
2. Navigate to your site
3. Click on any event in Summary
4. View "Data Layer" tab
5. Inspect all pushed values

### Common Issues

**Undefined Variable:**
- Check data layer path (dot notation)
- Verify timing (pushed before tag fires?)
- Check for typos in variable names

**Data Not Persisting:**
- Data layer is event-based, not state-based
- Variables don't persist across pages (unless SPAs)
- Must re-push data on each page load

**Timing Issues:**
- Ensure data layer initialized before GTM
- Check async loading issues
- Verify event fires before tag needs data

## References

This skill includes comprehensive reference documentation:

- **references/datalayer-fundamentals.md** - Data layer basics, syntax, and implementation
- **references/ecommerce-datalayer.md** - Complete e-commerce event patterns
- **references/spa-datalayer.md** - Single-page application implementation
- **references/datalayer-best-practices.md** - Naming, structure, security, testing

Search reference files for specific patterns:
```bash
grep -r "purchase" references/
grep -r "React" references/
grep -r "consent" references/
```

## Integration with Other Skills
## Integration with Other Skills

- **gtm-general** - General GTM guidance and concepts
- **gtm-setup** - GTM container setup and installation
- **gtm-tags** - Configure tags that use data layer variables
- **gtm-triggers** - Set up custom event triggers from data layer
- **gtm-variables** - Create data layer variables to access values
- **gtm-debugging** - Debug data layer implementation issues
- **gtm-custom-templates** - Build custom templates that read data layer
- **gtm-api** - Programmatic data layer documentation export
- **gtm-best-practices** - Data layer naming and structure best practices

## Quick Reference
## Quick Reference

**Initialize:** `window.dataLayer = window.dataLayer || [];`

**Push Event:** `dataLayer.push({'event': 'event_name', 'key': 'value'});`

**Clear Variable:** `dataLayer.push({'variable_name': undefined});`

**E-commerce:** Always use GA4 schema with `ecommerce` object

**SPAs:** Clear previous data and push virtual pageviews

**Security:** Never push PII - use hashed IDs only
