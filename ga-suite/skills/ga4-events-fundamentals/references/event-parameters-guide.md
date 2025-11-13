# Event Parameters Complete Guide

## Overview

Event parameters provide context and detail about user interactions in GA4. Understanding parameter structure, limits, and best practices is essential for effective event tracking.

## What Are Event Parameters?

**Definition:** Additional data points attached to events that provide context about user actions.

**Structure:**
```javascript
gtag('event', 'event_name', {
  'parameter_name_1': 'value',
  'parameter_name_2': 123,
  'parameter_name_3': true
});
```

## Parameter Types

### 1. Automatically Collected Parameters

Parameters GA4 collects without additional configuration.

#### Web Stream Standard Parameters

**Page Parameters:**
- `page_location` - Full page URL (max 1000 chars)
- `page_referrer` - Previous page URL (max 420 chars)
- `page_title` - Page title from `<title>` tag (max 300 chars)

**User/Device Parameters:**
- `language` - Browser language (e.g., en-us)
- `screen_resolution` - Device screen size (e.g., 1920x1080)
- `client_id` - Anonymous user identifier

**Engagement Parameters:**
- `engagement_time_msec` - Time engaged in milliseconds
- `session_id` - Current session identifier
- `session_number` - Count of sessions for user

#### App Stream Standard Parameters

- `app_version` - Current application version
- `firebase_screen_id` - Unique screen identifier
- `firebase_screen_class` - Screen class name
- `platform` - iOS or Android

### 2. Enhanced Measurement Parameters

Parameters automatically collected with enhanced measurement events.

#### Scroll Event Parameters
- `engagement_time_msec` - Time engaged before scroll

#### Click Event Parameters
- `link_classes` - CSS classes on link
- `link_domain` - Destination domain
- `link_id` - Element ID
- `link_url` - Full destination URL
- `outbound` - true (for outbound links)

#### File Download Parameters
- `file_extension` - File type (.pdf, .xlsx)
- `file_name` - Name of file
- `link_classes` - CSS classes
- `link_id` - Element ID
- `link_text` - Link text
- `link_url` - Download URL

#### Video Engagement Parameters
- `video_title` - YouTube video title
- `video_url` - YouTube video URL
- `video_duration` - Total length (seconds)
- `video_current_time` - Playback position
- `video_percent` - Milestone reached (10, 25, 50, 75)
- `video_provider` - youtube.com
- `visible` - Viewport visibility (true/false)

#### Form Interaction Parameters
- `form_id` - HTML form ID
- `form_name` - HTML form name
- `form_destination` - Form action URL
- `form_submit_text` - Submit button text

#### Search Parameters
- `search_term` - User's search query
- `unique_search_term` - First occurrence flag

### 3. Recommended Event Parameters

Standardized parameters for Google-defined recommended events.

#### Authentication Parameters

**login event:**
- `method` - Authentication method (email, google, facebook, phone)

**sign_up event:**
- `method` - Registration method (email, google, facebook)

#### Ecommerce Parameters

**Required for purchase event:**
- `transaction_id` - Unique transaction identifier (CRITICAL - must be unique)
- `value` - Total transaction value (numeric)
- `currency` - ISO 4217 currency code (USD, EUR, GBP)

**Recommended for purchase:**
- `tax` - Tax amount (numeric)
- `shipping` - Shipping cost (numeric)
- `items` - Array of product objects (see Items Array section)
- `coupon` - Coupon code applied (string)
- `affiliation` - Store/affiliate name (string)

**Item-level parameters (in items array):**
- `item_id` - Product SKU/ID
- `item_name` - Product name
- `price` - Unit price
- `quantity` - Number of units
- `item_category` - Primary category
- `item_category2` through `item_category5` - Hierarchical categories
- `item_brand` - Brand name
- `item_variant` - Size, color, variant
- `coupon` - Item-level coupon
- `discount` - Discount amount
- `affiliation` - Store name
- `index` - Position in list (0-based)
- `item_list_id` - List identifier
- `item_list_name` - List name
- `location_id` - Physical location ID

#### Search Parameters
- `search_term` - User's search query

#### Content Selection Parameters
- `content_type` - Type of content (article, video, product)
- `item_id` - Content identifier

#### Promotion Parameters
- `promotion_id` - Promotion identifier
- `promotion_name` - Promotion name
- `creative_name` - Creative asset name
- `creative_slot` - Position (banner_slot_1)

### 4. Custom Parameters

Business-specific parameters created for custom events.

**Examples:**

```javascript
// Video tutorial tracking
gtag('event', 'video_tutorial_watched', {
  'tutorial_id': 'VID_123',
  'tutorial_name': 'GA4 Basics',
  'tutorial_duration': 1200,  // seconds
  'completion_percent': 100,
  'difficulty_level': 'beginner',
  'language': 'en'
});

// SaaS feature usage
gtag('event', 'feature_activated', {
  'feature_name': 'advanced_reporting',
  'feature_tier': 'enterprise',
  'activation_source': 'settings_page',
  'first_time_use': true
});

// E-learning course
gtag('event', 'course_enrollment', {
  'course_id': 'COURSE_101',
  'course_name': 'Advanced Analytics',
  'instructor': 'John Doe',
  'price': 99.99,
  'currency': 'USD',
  'level': 'advanced',
  'enrollment_method': 'direct'
});
```

## Parameter Limits and Constraints

### Critical Limits

| Limit Type | Standard GA4 | GA4 360 |
|------------|-------------|---------|
| Parameters per event | 25 | 25 |
| Event-scoped custom dimensions | 50 | 125 |
| User-scoped custom dimensions | 25 | 100 |
| Item-scoped custom dimensions | 10 | 25 |

### Character Limits

| Element | Maximum Characters |
|---------|-------------------|
| Parameter name | 40 |
| Parameter value (standard) | 100 |
| `page_title` parameter | 300 |
| `page_referrer` parameter | 420 |
| `page_location` parameter | 1000 |

### Data Type Constraints

**Supported Types:**
- String (text)
- Number (integer or float)
- Boolean (true/false)
- Array (for items parameter)

**Not Supported:**
- Objects (except items array)
- Nested objects
- Functions
- Null values (use for clearing only)

## Parameter Naming Conventions

### Best Practices

**DO:**
- Use snake_case (lowercase with underscores)
- Be descriptive but concise
- Use consistent naming across events
- Keep under 40 characters

**DON'T:**
- Use spaces or special characters
- Use camelCase or PascalCase
- Use generic names (param1, value, data)
- Include personally identifiable information (PII)

### Naming Patterns

**Recommended Patterns:**

```
[object]_[attribute]
Examples: product_id, user_tier, video_duration

[action]_[attribute]
Examples: purchase_value, scroll_depth, form_name

[category]_[subcategory]_[attribute]
Examples: ecommerce_item_price, video_completion_percent
```

### Reserved Parameter Names

GA4 reserves certain parameter names. Avoid using these for custom parameters:

- `client_id`
- `session_id`
- `session_number`
- `page_location`
- `page_referrer`
- `page_title`
- `language`
- `screen_resolution`
- All recommended event parameter names (transaction_id, value, currency, etc.)

## Items Array Structure

### Overview

The `items` parameter is a special array structure for ecommerce events containing product information.

### Required Fields

At minimum, each item must have:
- `item_id` OR `item_name` (at least one required)

### Complete Item Object

```javascript
{
  // Required (at least one)
  'item_id': 'SKU_12345',
  'item_name': 'Stan and Friends Tee',

  // Highly Recommended
  'price': 10.01,
  'quantity': 3,
  'item_category': 'Apparel',

  // Optional but Useful
  'item_brand': 'Google',
  'item_variant': 'green',
  'item_category2': 'Adult',
  'item_category3': 'Shirts',
  'item_category4': 'Crew',
  'item_category5': 'Short sleeve',

  // Ecommerce Context
  'affiliation': 'Google Merchandise Store',
  'coupon': 'SUMMER_FUN',
  'discount': 2.22,
  'index': 0,
  'item_list_id': 'related_products',
  'item_list_name': 'Related Products',
  'location_id': 'L_12345',

  // Custom Item Parameters
  'item_color': 'green',
  'item_size': 'large',
  'supplier': 'Vendor_A'
}
```

### Items Array Limits

- Maximum 27 items per event
- Maximum 10 item-scoped custom dimensions per property (standard GA4)
- Maximum 25 item-scoped custom dimensions per property (GA4 360)

### Items Array Example

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
  'value': 142.52,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'price': 49.99,
      'quantity': 2,
      'item_category': 'Electronics'
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Product B',
      'price': 29.99,
      'quantity': 1,
      'item_category': 'Accessories'
    }
  ]
});
```

## Parameter Value Formatting

### Currency Values

**Format:** Numeric (not string)

```javascript
// ✅ CORRECT
'value': 99.99,
'currency': 'USD'

// ❌ WRONG
'value': '$99.99',
'currency': '$'
```

**ISO 4217 Currency Codes:**
- USD - US Dollar
- EUR - Euro
- GBP - British Pound
- JPY - Japanese Yen
- CAD - Canadian Dollar
- AUD - Australian Dollar
- CHF - Swiss Franc

### Boolean Values

**Format:** true/false (not string)

```javascript
// ✅ CORRECT
'first_time_user': true,
'promotional_email_opt_in': false

// ❌ WRONG
'first_time_user': 'true',
'promotional_email_opt_in': 'false'
```

### Numeric Values

**Format:** Number (integer or float)

```javascript
// ✅ CORRECT
'quantity': 5,
'duration_seconds': 120,
'rating': 4.5

// ❌ WRONG
'quantity': '5',
'duration_seconds': '120',
'rating': '4.5'
```

### String Values

**Format:** Text within character limits

```javascript
// ✅ CORRECT
'product_name': 'Blue Widget',
'category': 'Widgets',
'description': 'High-quality blue widget'

// ⚠️ WARNING - Will be truncated
'very_long_description': 'This is an extremely long description that exceeds the 100 character limit and will be truncated in GA4 reports which may cause data loss'
```

## Parameter Scopes

Parameters have different scopes determining their application. See **references/parameter-scopes.md** for complete details.

### Quick Reference

**Event Scope:**
Applies to single event occurrence.
Example: `button_name`, `form_id`, `video_title`

**User Scope:**
Applies to all events from user across sessions.
Example: `subscription_tier`, `customer_segment`, `account_type`

**Item Scope:**
Applies to products in ecommerce items array.
Example: `item_color`, `item_size`, `supplier_name`

## Registering Parameters as Custom Dimensions

### Why Register

Custom parameters won't appear in GA4 reports until registered as custom dimensions.

### Registration Process

1. **Send Parameter in Event:**
```javascript
gtag('event', 'video_watched', {
  'video_quality': 'hd',  // Custom parameter
  'video_duration': 300
});
```

2. **Navigate to GA4 Admin:**
Admin → Data Display → Custom Definitions

3. **Create Custom Dimension:**
- Dimension Name: "Video Quality"
- Scope: Event
- Event Parameter: "video_quality"
- Description: "Quality setting of watched videos"
- Click Save

4. **Wait 24-48 Hours:**
Data will populate in reports after processing delay

### Registration Best Practices

**DO:**
- Use descriptive dimension names (appear in reports)
- Match parameter name exactly (case-sensitive)
- Choose correct scope
- Plan dimensions before hitting quota limits
- Document all custom dimensions

**DON'T:**
- Register high-cardinality parameters (unique IDs, timestamps)
- Use dimension names with special characters
- Change scope after creation (not possible)
- Expect immediate data (24-48hr delay)
- Register parameters you won't analyze

## Common Parameter Mistakes

### 1. Missing Currency Parameter

```javascript
// ❌ WRONG - Missing currency
gtag('event', 'purchase', {
  'transaction_id': 'TXN_123',
  'value': 99.99
});

// ✅ CORRECT
gtag('event', 'purchase', {
  'transaction_id': 'TXN_123',
  'value': 99.99,
  'currency': 'USD'
});
```

### 2. Using Currency Symbols

```javascript
// ❌ WRONG - Currency symbol
'currency': '$'

// ✅ CORRECT - ISO code
'currency': 'USD'
```

### 3. Exceeding Parameter Limit

```javascript
// ❌ WRONG - 30 parameters (exceeds 25 limit)
gtag('event', 'custom_event', {
  'param_1': 'value1',
  'param_2': 'value2',
  // ... 28 more parameters
  'param_30': 'value30'  // This won't be collected
});
```

### 4. Parameter Name Too Long

```javascript
// ❌ WRONG - 52 characters
'this_is_a_very_long_parameter_name_that_exceeds_limit': 'value'

// ✅ CORRECT - 28 characters
'descriptive_param_name': 'value'
```

### 5. Sending PII

```javascript
// ❌ WRONG - Contains PII
gtag('event', 'form_submit', {
  'user_email': 'john@example.com',
  'user_phone': '555-1234',
  'user_name': 'John Doe'
});

// ✅ CORRECT - No PII
gtag('event', 'form_submit', {
  'email_domain': 'example.com',
  'form_type': 'contact',
  'form_location': 'footer'
});
```

### 6. Wrong Data Types

```javascript
// ❌ WRONG - Numeric values as strings
'quantity': '5',
'price': '99.99',
'in_stock': 'true'

// ✅ CORRECT - Proper types
'quantity': 5,
'price': 99.99,
'in_stock': true
```

## Parameter Testing Checklist

Before deploying event parameters:

- [ ] Parameter names follow snake_case convention
- [ ] Parameter names are under 40 characters
- [ ] Parameter values are under 100 characters (or applicable limit)
- [ ] Total parameters per event ≤ 25
- [ ] Correct data types used (number, string, boolean)
- [ ] Currency uses ISO codes (not symbols)
- [ ] No PII included in parameters
- [ ] Parameters visible in DebugView
- [ ] Custom parameters registered as custom dimensions (if needed)
- [ ] Scope correctly assigned (event/user/item)
- [ ] Documentation created for custom parameters

## Advanced Parameter Patterns

### Conditional Parameters

```javascript
// Only include parameter if value exists
const eventParams = {
  'event_category': 'engagement'
};

if (couponCode) {
  eventParams.coupon = couponCode;
}

if (userTier) {
  eventParams.user_tier = userTier;
}

gtag('event', 'purchase', eventParams);
```

### Dynamic Parameter Values

```javascript
// Calculate parameter values dynamically
gtag('event', 'video_complete', {
  'video_id': videoId,
  'video_duration': Math.round(duration),
  'completion_time': Date.now(),
  'engagement_rate': Math.round((watchedTime / totalTime) * 100)
});
```

### Merging Parameter Objects

```javascript
// Combine multiple parameter sources
const baseParams = {
  'event_category': 'ecommerce',
  'currency': 'USD'
};

const productParams = {
  'product_id': 'SKU_123',
  'product_name': 'Widget',
  'price': 29.99
};

gtag('event', 'view_item', {
  ...baseParams,
  ...productParams
});
```

## Parameter Debugging

### Using DebugView

1. Enable debug mode (Google Analytics Debugger extension)
2. Navigate to Admin → DebugView
3. Trigger event
4. Click event in left panel
5. Inspect parameters in right panel

**What to Check:**
- All expected parameters present
- Parameter names correct (case-sensitive)
- Parameter values correct type and format
- No truncation of values
- Parameters within limits (≤25)

### Common DebugView Issues

| What You See | Problem | Solution |
|-------------|---------|----------|
| Parameter missing | Not sent in event | Check event code |
| Parameter value wrong | Incorrect data source | Verify variable/value |
| Parameter truncated | Exceeds character limit | Shorten value |
| Too many parameters | >25 sent | Reduce parameter count |
| Parameter not in reports | Not registered as dimension | Register in Admin |

## Additional Resources

- Official GA4 Event Parameters: https://support.google.com/analytics/answer/9267735
- Custom Dimensions Guide: https://support.google.com/analytics/answer/10075209
- Items Array Reference: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
