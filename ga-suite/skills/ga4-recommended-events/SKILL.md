---
name: ga4-recommended-events
description: Complete guide to implementing Google-defined recommended events in GA4 including purchase, add_to_cart, login, sign_up, and full ecommerce journey. Use when implementing ecommerce tracking, tracking user authentication, implementing conversion events, working with the items array, or setting up standard event tracking. Covers all recommended events with required parameters, items array structure, and gtag.js/GTM implementation examples. Includes purchase events, add_to_cart tracking, checkout funnel events, and items array structure for ecommerce transactions. Works with .js, .jsx, and GTM container implementations.
---

# GA4 Recommended Events

## Overview

GA4 provides a set of recommended event names and parameter structures defined by Google for consistency across analytics implementations. These standardized events enable key features like ecommerce reports, conversion modeling, and Google Ads integration. Recommended events follow best practices and are compatible with all GA4 features, making them the preferred approach for standard user interactions.

## When to Use This Skill

Invoke this skill when:

- Implementing ecommerce purchase tracking (purchase, add_to_cart, begin_checkout)
- Tracking user authentication events (login, sign_up)
- Setting up conversion events aligned with business objectives
- Structuring the items array for product-level tracking
- Building complete checkout funnel tracking (view_item → purchase)
- Implementing monetization events (add_to_cart, refund, add_payment_info)
- Configuring engagement events (search, view_promotion, select_item)
- Working with gtag.js or GTM to send events to GA4
- Migrating from custom events to recommended events
- Validating event parameter structures against GA4 specifications

## Core Capabilities

### Recommended Events Categories

GA4 organizes recommended events into three main categories:

**Engagement Events:**
- `login` - User authentication (with method parameter)
- `sign_up` - New account creation (with method parameter)
- `search` - Site search performed (search_term parameter)
- `view_item` - Product page viewed (items array)
- `view_item_list` - Product list viewed (items array)
- `select_item` - Item selected from list (items array)
- `view_promotion` - Promotion/offer displayed (promotion_id, promotion_name)
- `select_promotion` - Promotion clicked (promotion_id, promotion_name)

**Monetization Events (Ecommerce):**
- `add_to_cart` - Item added to cart (items array required)
- `remove_from_cart` - Item removed from cart (items array)
- `view_cart` - Shopping cart viewed (items array)
- `begin_checkout` - Checkout initiated (items array, value, currency)
- `add_shipping_info` - Shipping method selected (shipping_tier parameter)
- `add_payment_info` - Payment method added (payment_type parameter)
- `purchase` - Transaction completed (transaction_id, value, currency, items)
- `refund` - Purchase refunded (transaction_id, value, items)
- `add_to_wishlist` - Item added to wishlist (items array)

**Other Recommended Events:**
- `generate_lead` - Lead generated (value, currency optional)
- `select_content` - Content selected (content_type, item_id)
- `share` - Content shared (method, content_type)

### Items Array Structure

The items array is critical for ecommerce tracking. Each item object can contain:

**Required (at least one):**
- `item_id` - Product SKU or unique identifier
- `item_name` - Product display name

**Highly Recommended:**
- `price` - Individual unit price
- `quantity` - Number of units
- `item_category` - Primary product category

**Optional:**
- `item_brand`, `item_variant`, `coupon`, `discount`
- `item_category2` through `item_category5` - Hierarchical categories
- `item_list_id`, `item_list_name` - List identifiers
- `affiliation`, `location_id`, `index` - Additional context

### Purchase Event Implementation

The purchase event is the most important recommended event. Structure includes:

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',      // Required: unique per purchase
  'value': 299.99,                     // Recommended: total value
  'currency': 'USD',                   // Recommended: currency code
  'tax': 20.00,                        // Optional: tax amount
  'shipping': 10.00,                   // Optional: shipping cost
  'coupon': 'SUMMER20',                // Optional: discount code
  'affiliation': 'Online Store',       // Optional: store name
  'items': [                           // Recommended: product details
    {
      'item_id': 'SKU_001',
      'item_name': 'Product Name',
      'item_category': 'Electronics',
      'price': 99.99,
      'quantity': 2
    }
  ]
});
```

### Complete Ecommerce Journey

Implement tracking across the full customer journey:

1. **View Item** - User browses product
2. **Add to Cart** - Item added (capture cart value)
3. **Begin Checkout** - Checkout started (critical funnel point)
4. **Add Shipping Info** - Shipping method selected
5. **Add Payment Info** - Payment information entered
6. **Purchase** - Transaction completed (most important)

### GTM Implementation

In Google Tag Manager, recommended events are configured as:

1. Create GA4 Event Tag
2. Select "Google Tag" tag type
3. Enter GA4 Measurement ID
4. Set Event Name (e.g., "purchase")
5. Map event parameters to data layer variables
6. Configure triggers to fire on relevant actions

## References

- **references/recommended-events-complete.md** - Full catalog of all recommended events with parameter specifications
- **references/ecommerce-events-guide.md** - Complete ecommerce implementation patterns
- **references/items-array-reference.md** - Items array structure, validation, and examples
- **references/implementation-examples.md** - Real-world gtag.js and GTM code examples
- **references/engagement-events.md** - Login, sign_up, search, and view events

## Integration with Other Skills

- **ga4-events-fundamentals** - Understand event architecture, scopes, and parameters before implementing recommended events
- **ga4-gtag-implementation** - Sending recommended events via gtag.js without GTM
- **ga4-custom-events** - Creating custom events beyond recommended ones for business-specific tracking
- **ga4-debugview** - Testing and validating recommended event implementations before launch
- **ga4-gtm-integration** - Configuring recommended events through Google Tag Manager
- **ga4-custom-dimensions** - Registering event parameters as custom dimensions for reporting

## Quick Reference

**Most Important Events:**
- `purchase` - Revenue tracking (highest priority)
- `add_to_cart` - Conversion funnel
- `begin_checkout` - Funnel abandonment
- `login` / `sign_up` - User authentication

**Critical Rules:**
- Always include `transaction_id` in purchase events (unique per transaction)
- Use `currency` parameter for monetary events (USD, EUR, etc.)
- Structure items array consistently across all ecommerce events
- Register custom item parameters as custom dimensions to use in reports
- Include at least `item_id` or `item_name` in items array (required)

**Testing Approach:**
- Enable DebugView to verify event firing
- Check parameter values match specifications
- Validate items array structure with valid data
- Test complete checkout flow before production launch
