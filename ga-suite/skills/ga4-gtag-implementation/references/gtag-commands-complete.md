# gtag.js Complete Command Reference

**Version:** GA4 (2025)
**Source:** Google Analytics Developer Documentation
**Last Updated:** November 2025

---

## Overview

gtag.js provides four core commands for implementing Google Analytics 4 tracking. This reference documents all command variants with complete syntax, parameters, and examples.

---

## Core Commands

### 1. gtag('js', dateObject)

**Purpose:** Initialize gtag.js library with timestamp

**Syntax:**
```javascript
gtag('js', new Date());
```

**Parameters:**
- `dateObject` (Date) - Current timestamp

**Required:** Yes, appears once in base snippet
**Called:** Once per page load
**Position:** Immediately after gtag() function definition

**Example:**
```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());  // Initialize library
gtag('config', 'G-XXXXXXXXXX');  // Then configure
```

---

### 2. gtag('config', measurementId, configObject)

**Purpose:** Initialize and configure GA4 property with optional default parameters

**Syntax:**
```javascript
gtag('config', 'MEASUREMENT_ID');
gtag('config', 'MEASUREMENT_ID', configObject);
```

**Parameters:**

**measurementId** (string, required)
- Format: `G-XXXXXXXXXX`
- Example: `G-3K8Y9Z2L4M`
- Location: GA4 Admin → Data Streams → Web Stream

**configObject** (object, optional)
- Configuration parameters sent with all events from this tag

**Common Configuration Parameters:**

| Parameter | Type | Purpose | Example |
|-----------|------|---------|---------|
| `page_title` | string | Override page title | `'My Custom Title'` |
| `page_location` | string | Override page URL | `window.location.href` |
| `send_page_view` | boolean | Auto-send page_view | `true` (default) |
| `allow_google_signals` | boolean | Enable remarketing | `true` |
| `allow_ad_personalization_signals` | boolean | Ad personalization | `true` |
| `user_id` | string | Custom user ID | `'user_12345'` |
| `debug_mode` | boolean | Enable DebugView | `true` |

**Basic Example:**
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

**With Configuration:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'page_title': document.title,
  'page_location': window.location.href,
  'user_id': 'user_12345',
  'send_page_view': true,
  'allow_google_signals': true
});
```

**Disable Automatic Page View:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'send_page_view': false
});
// Then manually send page views in SPA:
gtag('event', 'page_view', {
  'page_title': 'New Page',
  'page_location': '/new-page'
});
```

**Multiple Properties:**
```javascript
// Track to multiple GA4 properties
gtag('config', 'G-PROPERTY-1');
gtag('config', 'G-PROPERTY-2');
```

---

### 3. gtag('event', eventName, eventParameters)

**Purpose:** Send an event to Google Analytics 4

**Syntax:**
```javascript
gtag('event', 'EVENT_NAME');
gtag('event', 'EVENT_NAME', eventParameters);
```

**Parameters:**

**eventName** (string, required)
- Maximum 40 characters
- snake_case convention
- Alphanumeric + underscores only
- Must start with alphabetic character
- Examples: `'purchase'`, `'sign_up'`, `'video_tutorial_watched'`

**eventParameters** (object, optional)
- Maximum 25 parameters per event
- Parameter names: 40 character limit
- Parameter values: 100 characters (exceptions: page_title 300, page_referrer 420, page_location 1000)

**Simple Event:**
```javascript
gtag('event', 'page_view');
```

**Event with Parameters:**
```javascript
gtag('event', 'button_click', {
  'button_name': 'Subscribe Now',
  'button_location': 'header',
  'button_id': 'btn_subscribe_01'
});
```

**Event with Value (Conversion):**
```javascript
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'USD',
  'transaction_id': 'TXN_' + Date.now()
});
```

---

## Event-Specific Commands

### login Event

**Purpose:** Track user authentication

**Syntax:**
```javascript
gtag('event', 'login', {
  'method': 'METHOD'
});
```

**Parameters:**
- `method` (string) - Authentication method: `'email'`, `'google'`, `'facebook'`, `'phone'`, `'social'`

**Example:**
```javascript
// After successful login
gtag('event', 'login', {
  'method': 'google'
});
```

---

### sign_up Event

**Purpose:** Track new user registration

**Syntax:**
```javascript
gtag('event', 'sign_up', {
  'method': 'METHOD'
});
```

**Parameters:**
- `method` (string) - Signup method: `'email'`, `'social'`

**Example:**
```javascript
gtag('event', 'sign_up', {
  'method': 'email'
});
```

---

### view_item Event

**Purpose:** Track product page view

**Syntax:**
```javascript
gtag('event', 'view_item', {
  'items': itemsArray,
  'value': number,
  'currency': 'CURRENCY_CODE'
});
```

**Required Parameters:**
- `items` (array) - Array of item objects

**Optional Parameters:**
- `value` (number) - Total value
- `currency` (string) - Currency code (ISO 4217)

**Example:**
```javascript
gtag('event', 'view_item', {
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Premium Widget',
      'item_category': 'Widgets',
      'item_brand': 'My Brand',
      'price': 49.99,
      'quantity': 1
    }
  ],
  'value': 49.99,
  'currency': 'USD'
});
```

---

### add_to_cart Event

**Purpose:** Track item added to shopping cart

**Syntax:**
```javascript
gtag('event', 'add_to_cart', {
  'items': itemsArray,
  'value': number,
  'currency': 'CURRENCY_CODE'
});
```

**Required Parameters:**
- `items` (array) - Array of item objects with at least `item_id` or `item_name`

**Optional Parameters:**
- `value` (number) - Total cart value
- `currency` (string) - Currency code

**Example:**
```javascript
gtag('event', 'add_to_cart', {
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Premium Widget',
      'price': 49.99,
      'quantity': 2
    }
  ],
  'value': 99.98,
  'currency': 'USD'
});
```

---

### begin_checkout Event

**Purpose:** Track checkout process initiation

**Syntax:**
```javascript
gtag('event', 'begin_checkout', {
  'items': itemsArray,
  'value': number,
  'currency': 'CURRENCY_CODE',
  'coupon': 'COUPON_CODE'
});
```

**Required Parameters:**
- `items` (array) - Array of items in cart
- `value` (number) - Total cart value
- `currency` (string) - Currency code

**Optional Parameters:**
- `coupon` (string) - Coupon code applied

**Example:**
```javascript
gtag('event', 'begin_checkout', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'price': 29.99,
      'quantity': 2
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Product B',
      'price': 39.99,
      'quantity': 1
    }
  ],
  'value': 99.97,
  'currency': 'USD',
  'coupon': 'SUMMER20'
});
```

---

### purchase Event

**Purpose:** Track completed transaction (most important ecommerce event)

**Syntax:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'UNIQUE_ID',
  'value': number,
  'currency': 'CURRENCY_CODE',
  'tax': number,
  'shipping': number,
  'coupon': 'COUPON_CODE',
  'items': itemsArray
});
```

**Required Parameters:**
- `transaction_id` (string) - Unique transaction identifier (prevents duplicate reporting)
- `value` (number) - Total transaction value
- `currency` (string) - Currency code (ISO 4217)

**Highly Recommended Parameters:**
- `items` (array) - Array of purchased items
- `tax` (number) - Tax amount
- `shipping` (number) - Shipping cost

**Optional Parameters:**
- `coupon` (string) - Transaction-level coupon
- `affiliation` (string) - Store/vendor name

**Complete Example:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_' + Date.now(),  // Unique ID
  'affiliation': 'Google Merchandise Store',
  'value': 142.52,
  'currency': 'USD',
  'tax': 10.00,
  'shipping': 5.00,
  'coupon': 'SUMMER_FUN',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_category2': 'Adult',
      'item_category3': 'Shirts',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    },
    {
      'item_id': 'SKU_67890',
      'item_name': 'Google Sunglasses',
      'item_brand': 'Google',
      'item_category': 'Accessories',
      'price': 99.99,
      'quantity': 1
    }
  ]
});
```

---

### 4. gtag('set', userProperties)

**Purpose:** Set user-level properties that persist across sessions

**Syntax:**
```javascript
gtag('set', userPropertiesObject);
```

**Parameters:**

**userPropertiesObject** (object)
- Key-value pairs of user properties
- Property names: 24 character limit
- Property values: 36 character limit
- Persist across sessions until cleared or user session ends

**User ID Example:**
```javascript
// After user login
gtag('set', {
  'user_id': 'user_' + userId
});

// CRITICAL: On logout - use null, NOT empty string
gtag('set', {
  'user_id': null  // Correct
});

// WRONG - do not use empty string
gtag('set', {
  'user_id': ''  // WRONG - will cause issues
});
```

**Custom User Properties:**
```javascript
gtag('set', {
  'subscription_tier': 'premium',
  'customer_lifetime_value': 5000,
  'years_customer': 3,
  'preferred_language': 'en',
  'account_type': 'business'
});
```

**Important Notes:**
- User properties must be registered as custom dimensions in GA4 Admin
- Properties persist for the user's session
- Clear with `null` value, never empty string `""`
- Changes may take 24-48 hours to appear in reports

---

## Items Array Complete Structure

The `items` array is used in ecommerce events (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`).

### Required Fields (at least one)

```javascript
{
  'item_id': 'SKU_123',     // OR
  'item_name': 'Product Name'
}
```

### Highly Recommended Fields

```javascript
{
  'item_id': 'SKU_123',
  'item_name': 'Product Name',
  'price': 99.99,
  'quantity': 1,
  'item_category': 'Electronics'
}
```

### All Available Fields

```javascript
{
  // Required (at least one)
  'item_id': 'SKU_123',
  'item_name': 'Product Name',

  // Highly Recommended
  'price': 99.99,
  'quantity': 1,
  'item_category': 'Electronics',

  // Categories (hierarchical)
  'item_category2': 'Computers',
  'item_category3': 'Laptops',
  'item_category4': 'Gaming',
  'item_category5': '17-inch',

  // Product Details
  'item_brand': 'Brand Name',
  'item_variant': 'Blue/Large',

  // Transaction Details
  'coupon': 'ITEM_COUPON',
  'discount': 10.00,
  'affiliation': 'Store Name',

  // List Details
  'index': 0,  // Position in list (0-based)
  'item_list_id': 'related_products',
  'item_list_name': 'Related Products',

  // Location
  'location_id': 'L_12345'
}
```

---

## Advanced Usage Patterns

### Conditional Event Firing

```javascript
// Only track for specific user groups
if (userRole === 'premium') {
  gtag('event', 'premium_feature_access', {
    'feature_name': 'Advanced Analytics'
  });
}
```

### Dynamic Parameter Population

```javascript
// Get data from page elements
const productId = document.querySelector('[data-product-id]').textContent;
const productName = document.querySelector('.product-title').textContent;
const productPrice = parseFloat(document.querySelector('.product-price').textContent);

gtag('event', 'view_item', {
  'items': [{
    'item_id': productId,
    'item_name': productName,
    'price': productPrice
  }]
});
```

### Delayed Event Tracking

```javascript
// Track after form submission completes
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  // Send event
  gtag('event', 'form_submit', {
    'form_name': 'Contact Form',
    'email_domain': formData.get('email').split('@')[1]
  });

  // Then submit form
  setTimeout(() => {
    this.submit();
  }, 100);
});
```

---

## Parameter Limits & Constraints

**Event Names:**
- Maximum 40 characters
- snake_case (lowercase with underscores)
- Alphanumeric + underscores only
- Must start with alphabetic character

**Parameter Names:**
- Maximum 40 characters
- Same naming rules as event names

**Parameter Values:**
- Standard: 100 characters
- Exception: `page_title` (300 chars)
- Exception: `page_referrer` (420 chars)
- Exception: `page_location` (1000 chars)

**Count Limits:**
- Maximum 25 parameters per event
- Maximum 200 items in items array
- Maximum 27 custom item parameters

**User Properties:**
- Property names: 24 characters
- Property values: 36 characters

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Events not firing | gtag() called before initialization | Verify gtag snippet loaded first |
| Duplicate events | Multiple gtag snippets | Remove duplicate implementations |
| User ID not persisting | Set to empty string `""` | Always use `null` to clear |
| Custom parameters missing | Not registered as dimensions | Register in GA4 Admin → Custom Definitions |
| Data delayed 24+ hours | Normal aggregation | Use DebugView for immediate validation |
| Items array errors | Missing required fields | Include `item_id` OR `item_name` |

---

## Best Practices

**DO:**
- ✅ Place gtag snippet in `<head>` before other scripts
- ✅ Use async attribute on script tag
- ✅ Validate events with DebugView before production
- ✅ Use descriptive event names (snake_case)
- ✅ Clear User ID with `null` on logout
- ✅ Include `transaction_id` in purchase events

**DON'T:**
- ❌ Call gtag() before initialization
- ❌ Use multiple gtag snippets on same page
- ❌ Use empty string to clear User ID (use `null`)
- ❌ Send PII in parameters
- ❌ Use generic event names (`'event1'`, `'click'`)
- ❌ Exceed parameter limits

---

## Version History

**November 2025:** Complete reference created from official Google documentation
**Updated:** Aligned with GA4 current specifications
**Source:** Google Tag Platform Documentation (developers.google.com/tag-platform)
