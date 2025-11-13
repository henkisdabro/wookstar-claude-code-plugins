# Event Types Complete Reference

## Overview

GA4 uses four distinct event categories, each serving a specific purpose in the measurement architecture. Understanding these categories is essential for implementing comprehensive tracking.

## Event Category 1: Automatically Collected Events

### Definition

Events that fire automatically when GA4 tracking code is installed, requiring no additional configuration.

### Core Automatic Events

#### session_start

**Trigger:** User session begins

**Platform:** Web and App

**Parameters (automatic):**
- `page_location` - Current page URL
- `page_referrer` - Previous page URL
- `ga_session_id` - Session identifier
- `ga_session_number` - Session count for user

**Use Case:** Session tracking, session-based metrics

---

#### first_visit

**Trigger:** User's first visit to website or app

**Platform:** Web and App

**Parameters (automatic):**
- All standard page parameters
- `first_visit_time` - Timestamp of first visit

**Use Case:** New user acquisition tracking, user lifecycle analysis

---

#### user_engagement

**Trigger:** App in foreground OR webpage in focus for 1+ second

**Platform:** Web and App

**Parameters (automatic):**
- `engagement_time_msec` - Time engaged in milliseconds

**Use Case:** Engagement metrics, active time tracking

**Important:** This is how GA4 measures "engaged sessions"

---

#### page_view (when enhanced measurement enabled)

**Trigger:** Page loads

**Platform:** Web only

**Parameters (automatic):**
- `page_location` - Full page URL
- `page_referrer` - Previous page URL
- `page_title` - Page title from `<title>` tag
- `engagement_time_msec` - Time on page

**Use Case:** Page tracking, content analysis

**Note:** Also part of Enhanced Measurement but listed here for completeness

---

### App-Only Automatic Events

#### first_open

**Trigger:** App launched after installation

**Platform:** App only

**Parameters (automatic):**
- `previous_app_version` - Version before update (if applicable)

**Use Case:** App install tracking, version migration analysis

---

## Event Category 2: Enhanced Measurement Events

### Definition

Automatically tracked interactions that can be toggled on/off in GA4 Admin settings (Data Streams → Web Stream → Enhanced measurement).

### Configuration Location

Admin → Data Collection and Modification → Data Streams → [Select Web Stream] → Enhanced measurement (gear icon)

### Enhanced Measurement Events

#### page_view

**Trigger:** Page loads OR history state changes (SPA navigation)

**Toggle:** On/Off

**Parameters:**
- `page_location` - Current URL
- `page_referrer` - Previous URL
- `page_title` - Page title
- `engagement_time_msec` - Time engaged

**Use Case:** Page tracking for both traditional and single-page applications

---

#### scroll

**Trigger:** User scrolls to 90% of page vertical depth

**Toggle:** On/Off

**Parameters:**
- `engagement_time_msec` - Time engaged before scroll

**Limitation:** Only 90% depth tracked (not customizable in enhanced measurement)

**Custom Implementation:** For multiple thresholds (25%, 50%, 75%, 90%), implement custom scroll tracking via GTM

---

#### click (Outbound Links)

**Trigger:** Click on link leading to different domain

**Toggle:** On/Off

**Parameters:**
- `link_classes` - CSS classes on link element
- `link_domain` - Destination domain
- `link_id` - Element ID
- `link_url` - Full destination URL
- `outbound` - true (identifies as outbound click)

**Use Case:** External link tracking, content engagement analysis

---

#### file_download

**Trigger:** Click on link to common file extensions

**Toggle:** On/Off

**Tracked Extensions:**
- pdf, xlsx, docx, txt, rtf, csv, xls, ppt, pptx
- 7z, pkg, rar, gz, zip, avi, mov, mp4, mpeg, wmv, midi, mp3, wav, wma

**Parameters:**
- `file_extension` - File type (.pdf, .xlsx, etc.)
- `file_name` - Name of downloaded file
- `link_classes` - CSS classes
- `link_id` - Element ID
- `link_text` - Link text
- `link_url` - Download URL

**Use Case:** Content download tracking, resource engagement

---

#### view_search_results

**Trigger:** URL query parameter detected indicating site search

**Toggle:** On/Off (with configuration)

**Configuration:** Specify search query parameter name (default: q, s, search, query)

**Parameters:**
- `search_term` - User's search query
- `unique_search_term` - First occurrence flag

**Use Case:** Site search analysis, content discoverability

---

#### video_start

**Trigger:** YouTube embedded video starts playing

**Toggle:** On/Off (Video engagement setting)

**Requirements:** YouTube video with JS API enabled

**Parameters:**
- `video_title` - YouTube video title
- `video_url` - YouTube video URL
- `video_duration` - Total video length (seconds)
- `video_current_time` - Playback position
- `video_provider` - youtube.com
- `visible` - true/false (viewport visibility)

**Use Case:** Video engagement tracking

---

#### video_progress

**Trigger:** Video reaches 10%, 25%, 50%, 75% completion

**Toggle:** On/Off (Video engagement setting)

**Parameters:**
- `video_title`
- `video_url`
- `video_duration`
- `video_current_time`
- `video_percent` - Milestone reached (10, 25, 50, 75)
- `video_provider` - youtube.com
- `visible` - Viewport visibility

**Use Case:** Video completion funnel analysis

---

#### video_complete

**Trigger:** Video playback reaches 100%

**Toggle:** On/Off (Video engagement setting)

**Parameters:**
- `video_title`
- `video_url`
- `video_duration`
- `video_current_time`
- `video_provider`
- `visible`

**Use Case:** Video completion tracking

---

#### form_start

**Trigger:** User first interacts with form in session

**Toggle:** On/Off (Form interactions setting)

**Parameters:**
- `form_id` - HTML form ID attribute
- `form_name` - HTML form name attribute
- `form_destination` - Form action URL

**Use Case:** Form engagement tracking, conversion funnel

**Limitation:** Fires once per session (not per form submission)

---

#### form_submit

**Trigger:** Form submitted

**Toggle:** On/Off (Form interactions setting)

**Parameters:**
- `form_id`
- `form_name`
- `form_destination`
- `form_submit_text` - Submit button text

**Use Case:** Form conversion tracking, lead generation

---

## Event Category 3: Recommended Events

### Definition

Google-defined event names with standardized parameter structures. Using these ensures compatibility with GA4 features, Google Ads integration, and industry benchmarking.

### Why Use Recommended Events

**Benefits:**
- Enable standard reports (Ecommerce reports, Purchase funnel)
- Required for conversion modeling
- Compatible with Google Ads
- Audience building support
- Industry benchmarking

### Engagement Recommended Events

#### login

**When to Fire:** User successfully authenticates

**Required Parameters:** None

**Recommended Parameters:**
- `method` - Authentication method (email, google, facebook, phone)

**Implementation Example:**
```javascript
gtag('event', 'login', {
  'method': 'email'
});
```

---

#### sign_up

**When to Fire:** New user account created

**Required Parameters:** None

**Recommended Parameters:**
- `method` - Registration method (email, google, facebook)

**Implementation Example:**
```javascript
gtag('event', 'sign_up', {
  'method': 'google'
});
```

---

#### search

**When to Fire:** User performs site search

**Required Parameters:** None

**Recommended Parameters:**
- `search_term` - User's search query

**Implementation Example:**
```javascript
gtag('event', 'search', {
  'search_term': 'blue widgets'
});
```

---

#### select_content

**When to Fire:** User selects content item

**Required Parameters:** None

**Recommended Parameters:**
- `content_type` - Type of content (article, video, product)
- `item_id` - Content identifier

**Implementation Example:**
```javascript
gtag('event', 'select_content', {
  'content_type': 'article',
  'item_id': 'A123'
});
```

---

### Monetization Recommended Events

#### view_item

**When to Fire:** Product page viewed

**Required Parameters:**
- `items` - Array with at least `item_id` OR `item_name`

**Recommended Parameters:**
- `value` - Item value
- `currency` - ISO currency code (USD, EUR, GBP)

**Implementation Example:**
```javascript
gtag('event', 'view_item', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',
      'item_category': 'Apparel',
      'price': 29.99,
      'quantity': 1
    }
  ],
  'value': 29.99,
  'currency': 'USD'
});
```

---

#### add_to_cart

**When to Fire:** Item added to shopping cart

**Required Parameters:**
- `items` - Array of product objects

**Recommended Parameters:**
- `value` - Cart value
- `currency` - ISO currency code

**Implementation Example:**
```javascript
gtag('event', 'add_to_cart', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',
      'price': 29.99,
      'quantity': 1
    }
  ],
  'value': 29.99,
  'currency': 'USD'
});
```

---

#### remove_from_cart

**When to Fire:** Item removed from cart

**Required Parameters:**
- `items` - Array with removed product

**Recommended Parameters:**
- `value` - Value of removed items
- `currency` - ISO currency code

---

#### view_cart

**When to Fire:** Shopping cart viewed

**Required Parameters:**
- `items` - Array of cart contents

**Recommended Parameters:**
- `value` - Total cart value
- `currency` - ISO currency code

---

#### begin_checkout

**When to Fire:** Checkout process initiated

**Required Parameters:**
- `items` - Array of products in cart
- `value` - Total transaction value
- `currency` - ISO currency code

**Recommended Parameters:**
- `coupon` - Coupon code applied

**Implementation Example:**
```javascript
gtag('event', 'begin_checkout', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',
      'price': 29.99,
      'quantity': 2
    }
  ],
  'value': 59.98,
  'currency': 'USD',
  'coupon': 'SUMMER10'
});
```

---

#### add_payment_info

**When to Fire:** Payment information entered

**Required Parameters:** None

**Recommended Parameters:**
- `payment_type` - Payment method (credit_card, paypal, gift_card)
- `items` - Array of products
- `value` - Transaction value
- `currency` - ISO currency code

---

#### add_shipping_info

**When to Fire:** Shipping method selected

**Required Parameters:** None

**Recommended Parameters:**
- `shipping_tier` - Shipping option (ground, overnight, express)
- `value` - Transaction value
- `currency` - ISO currency code
- `items` - Array of products

---

#### purchase

**When to Fire:** Purchase completed (transaction finalized)

**Required Parameters:**
- `transaction_id` - Unique transaction identifier
- `value` - Total revenue
- `currency` - ISO currency code

**Recommended Parameters:**
- `tax` - Tax amount
- `shipping` - Shipping cost
- `items` - Array of purchased products
- `coupon` - Coupon code
- `affiliation` - Store/affiliate name

**Implementation Example:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
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
    }
  ]
});
```

**CRITICAL:** Mark as Key Event in GA4 Admin for conversion tracking

---

#### refund

**When to Fire:** Purchase refunded

**Required Parameters:**
- `transaction_id` - Original transaction ID

**Recommended Parameters:**
- `value` - Refund amount
- `currency` - ISO currency code
- `items` - Array of refunded items

---

### Other Recommended Events

#### generate_lead

**When to Fire:** Lead generated (form submission, contact request)

**Parameters:**
- `value` - Estimated lead value
- `currency` - ISO currency code

---

#### view_promotion

**When to Fire:** Promotion/banner displayed

**Parameters:**
- `promotion_id` - Promotion identifier
- `promotion_name` - Promotion name
- `items` - Featured products (optional)

---

#### select_promotion

**When to Fire:** User clicks promotion

**Parameters:**
- `promotion_id`
- `promotion_name`
- `items` - Featured products

---

## Event Category 4: Custom Events

### Definition

Business-specific events created for unique tracking requirements not covered by recommended events.

### When to Create Custom Events

Create custom events when:
- No recommended event fits your use case
- Tracking unique business processes
- Measuring proprietary features
- Tracking non-standard user interactions

### Custom Event Examples by Industry

#### SaaS / Software

```javascript
// Feature usage
gtag('event', 'feature_activated', {
  'feature_name': 'advanced_analytics',
  'user_tier': 'enterprise',
  'trial_status': 'active'
});

// Product tour
gtag('event', 'product_tour_completed', {
  'tour_name': 'onboarding_v2',
  'completion_time_seconds': 180,
  'steps_completed': 7
});
```

#### Education / E-Learning

```javascript
// Course enrollment
gtag('event', 'course_enrollment', {
  'course_id': 'GA4_101',
  'course_name': 'GA4 Fundamentals',
  'instructor': 'John Doe',
  'price': 99.99,
  'currency': 'USD',
  'level': 'beginner'
});

// Lesson completion
gtag('event', 'lesson_completed', {
  'course_id': 'GA4_101',
  'lesson_id': 'lesson_3',
  'lesson_title': 'Event Tracking',
  'time_spent_minutes': 15
});
```

#### Media / Content

```javascript
// Article engagement
gtag('event', 'article_read_complete', {
  'article_id': 'A123',
  'article_title': 'GA4 Guide',
  'category': 'analytics',
  'author': 'Jane Smith',
  'word_count': 2500,
  'time_to_read_minutes': 10
});

// Content sharing
gtag('event', 'content_shared', {
  'content_type': 'article',
  'content_id': 'A123',
  'share_method': 'twitter',
  'share_location': 'article_footer'
});
```

#### Finance / Banking

```javascript
// Account actions
gtag('event', 'account_created', {
  'account_type': 'checking',
  'method': 'online',
  'branch_location': 'none'
});

// Calculator usage
gtag('event', 'loan_calculator_used', {
  'calculator_type': 'mortgage',
  'loan_amount': 250000,
  'loan_term_years': 30,
  'interest_rate': 3.5
});
```

### Custom Event Best Practices

**DO:**
- Use descriptive, action-oriented names
- Follow snake_case naming convention
- Keep names under 40 characters
- Include relevant context in parameters
- Document all custom events
- Test in DebugView before production

**DON'T:**
- Use generic names (event1, custom_event, data)
- Exceed 500 unique event names per property
- Send PII (personally identifiable information)
- Create custom events when recommended events exist
- Use spaces or special characters in names
- Forget to register parameters as custom dimensions

### Custom Event Planning Template

```
Event Name: [action]_[object]_[context]
Purpose: [Business goal]
When to Fire: [User action trigger]
Parameters:
  - parameter_1: [description] (scope: event/user/item)
  - parameter_2: [description] (scope: event/user/item)
Expected Volume: [events per day/week]
Custom Dimensions Needed: [Yes/No]
Key Event: [Yes/No]
```

---

## Event Category Comparison

| Category | Configuration Required | Code Required | Customizable | Use Case |
|----------|----------------------|---------------|--------------|----------|
| **Automatic** | No | No | No | Core session tracking |
| **Enhanced Measurement** | Toggle on/off | No | Limited | Common web interactions |
| **Recommended** | No | Yes | Parameters only | Standard business events |
| **Custom** | No | Yes | Fully | Unique business needs |

---

## Event Implementation Checklist

For each event implementation:

- [ ] Event name follows snake_case convention
- [ ] Event name is under 40 characters
- [ ] Using recommended event if available
- [ ] All required parameters included
- [ ] Parameter names are under 40 characters
- [ ] Parameter values under 100 characters (or applicable limit)
- [ ] Maximum 25 parameters per event
- [ ] Parameters have correct scope (event/user/item)
- [ ] Tested in DebugView
- [ ] Custom parameters registered as custom dimensions (if needed)
- [ ] Event marked as Key Event if conversion (if applicable)
- [ ] Documentation created for custom events

---

## Additional Resources

- Official GA4 Events Documentation: https://support.google.com/analytics/answer/9322688
- Recommended Events Reference: https://support.google.com/analytics/answer/9267735
- Enhanced Measurement: https://support.google.com/analytics/answer/9216061
