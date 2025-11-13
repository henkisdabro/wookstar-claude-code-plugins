# Parameter Scopes Complete Guide

## Overview

GA4 uses three distinct scopes that determine how parameters are applied and analyzed: Event scope, User scope, and Item scope. Understanding scopes is critical for proper data collection and reporting.

## What is Scope?

**Definition:** Scope determines what data the parameter applies to and how long it persists.

**Three Scopes:**
1. **Event Scope** - Applies to single event occurrence
2. **User Scope** - Applies to all events from that user
3. **Item Scope** - Applies to products in ecommerce events

## Event Scope (Event-Scoped Parameters)

### Definition

Event-scoped parameters apply only to the specific event they're sent with. They describe what happened in that particular interaction.

### Characteristics

**Lifespan:** Single event only

**Persistence:** Does not carry over to other events

**Use For:** Event-specific details and context

### Common Use Cases

**User Actions:**
- Button clicks (which button, where)
- Form submissions (which form, form type)
- Video interactions (video title, duration, quality)
- Link clicks (link URL, link text, destination)

**Content:**
- Page information (current page, previous page)
- Search queries (search term)
- Filter selections (category, price range)

**Engagement:**
- Scroll depth (percentage)
- Time spent (duration)
- Completion status (percent complete)

### Event-Scoped Examples

#### Example 1: Button Click

```javascript
gtag('event', 'button_click', {
  'button_name': 'Subscribe Now',      // Event-scoped
  'button_location': 'header',         // Event-scoped
  'button_id': 'btn_subscribe_01',     // Event-scoped
  'target_page': '/pricing'            // Event-scoped
});
```

**Why Event-Scoped:**
- Only applies to this specific button click
- Different button clicks will have different values
- Describes this particular interaction

#### Example 2: Form Submission

```javascript
gtag('event', 'form_submit', {
  'form_id': 'contact-form-v2',       // Event-scoped
  'form_name': 'Contact Us',          // Event-scoped
  'form_type': 'lead_generation',     // Event-scoped
  'form_destination': '/thank-you',   // Event-scoped
  'fields_completed': 5               // Event-scoped
});
```

**Why Event-Scoped:**
- Specific to this form submission
- Next form submission may have different form_id, form_name
- Describes details of this event only

#### Example 3: Video Engagement

```javascript
gtag('event', 'video_complete', {
  'video_id': 'VID_123',              // Event-scoped
  'video_title': 'GA4 Tutorial',      // Event-scoped
  'video_duration': 1200,             // Event-scoped (seconds)
  'video_quality': 'hd',              // Event-scoped
  'completion_percent': 100,          // Event-scoped
  'watch_time_seconds': 1150          // Event-scoped
});
```

**Why Event-Scoped:**
- Describes this specific video watch event
- Each video_complete event has different video details
- Time-specific data for this viewing

### Registering Event-Scoped Custom Dimensions

**Process:**

1. **Send Parameter in Event:**
```javascript
gtag('event', 'custom_event', {
  'custom_parameter': 'value'  // Event-scoped
});
```

2. **Navigate to GA4 Admin:**
Admin → Data Display → Custom Definitions

3. **Create Custom Dimension:**
- **Dimension Name:** "Custom Parameter Name"
- **Scope:** **Event** ← Select Event
- **Event Parameter:** "custom_parameter"
- Description: What this parameter tracks
- Click Save

4. **Wait 24-48 hours for data population**

### Event Scope Limits

**Standard GA4:**
- 50 event-scoped custom dimensions per property

**GA4 360:**
- 125 event-scoped custom dimensions per property

---

## User Scope (User-Scoped Parameters / User Properties)

### Definition

User-scoped parameters (user properties) apply to all events from a specific user. They describe attributes of the user that persist across sessions.

### Characteristics

**Lifespan:** All user events until changed or cleared

**Persistence:** Carries over to all subsequent events from that user

**Use For:** User attributes, demographics, membership status, preferences

### Common Use Cases

**User Attributes:**
- Subscription tier (free, pro, enterprise)
- Customer segment (new, returning, vip)
- Account type (individual, business, enterprise)
- Membership status (trial, active, expired)

**User Behavior:**
- Customer lifetime value
- Years as customer
- Purchase frequency
- Engagement level

**User Preferences:**
- Preferred language
- Communication preferences
- Theme preference (light/dark)
- Notification settings

### User-Scoped Examples

#### Example 1: User Subscription Tier

```javascript
// Set once after login or tier change
gtag('set', {
  'subscription_tier': 'premium',     // User-scoped
  'account_type': 'business',         // User-scoped
  'years_customer': 3                 // User-scoped
});

// Now ALL subsequent events include these properties
gtag('event', 'page_view');           // Includes subscription_tier
gtag('event', 'button_click');        // Includes subscription_tier
gtag('event', 'purchase');            // Includes subscription_tier
```

**Why User-Scoped:**
- Applies to this user across all interactions
- Persists across multiple events and sessions
- Describes who the user is, not what they did

#### Example 2: Customer Segmentation

```javascript
gtag('set', {
  'customer_segment': 'high_value',        // User-scoped
  'customer_lifetime_value': 5000,         // User-scoped
  'first_purchase_date': '2023-01-15',     // User-scoped
  'preferred_category': 'electronics'      // User-scoped
});
```

**Why User-Scoped:**
- Attributes of the user that don't change per event
- Used for segmentation across all user actions
- Describes user characteristics

#### Example 3: User Preferences

```javascript
gtag('set', {
  'preferred_language': 'en',              // User-scoped
  'theme_preference': 'dark',              // User-scoped
  'email_opt_in': true,                    // User-scoped
  'notification_enabled': true             // User-scoped
});
```

**Why User-Scoped:**
- Settings that apply to all user interactions
- Persist across sessions
- Help understand user behavior patterns

### User ID (Special User Property)

**Implementation:**

```javascript
// After user login
gtag('set', {
  'user_id': 'user_12345'  // Special user-scoped identifier
});

// On logout - MUST set to null
gtag('set', {
  'user_id': null  // NOT empty string ""
});
```

**Purpose:**
- Cross-device tracking
- Cross-session tracking
- User journey analysis

**Requirements:**
- Must be unique per user
- Must be persistent (same across devices/sessions)
- Cannot be PII (no email addresses, names)
- Must clear on logout (set to null)

### Registering User-Scoped Custom Dimensions

**Process:**

1. **Send User Property:**
```javascript
gtag('set', {
  'custom_user_property': 'value'  // User-scoped
});
```

2. **Navigate to GA4 Admin:**
Admin → Data Display → Custom Definitions

3. **Create Custom Dimension:**
- **Dimension Name:** "Custom User Property Name"
- **Scope:** **User** ← Select User
- **User Property:** "custom_user_property"
- Description: What this property represents
- Click Save

4. **Wait 24-48 hours for data population**

### User Scope Limits

**Standard GA4:**
- 25 user-scoped custom dimensions per property

**GA4 360:**
- 100 user-scoped custom dimensions per property

### User Scope Best Practices

**DO:**
- Set user properties after user identification (login, registration)
- Use for attributes that rarely change
- Clear user_id on logout (set to null)
- Use consistent values (always "premium", not "Premium" or "PREMIUM")

**DON'T:**
- Send PII (personally identifiable information)
- Use for event-specific data
- Change user properties frequently (not event-by-event)
- Exceed property limits (plan carefully)

---

## Item Scope (Item-Scoped Parameters)

### Definition

Item-scoped parameters apply to individual products in ecommerce events. They describe product-specific attributes.

### Characteristics

**Lifespan:** That transaction/ecommerce event only

**Persistence:** Applies to items in items array

**Use For:** Product-level details in ecommerce tracking

### Common Use Cases

**Product Attributes:**
- Product color, size, variant
- Product category, subcategory
- Product brand, manufacturer
- Product SKU, UPC

**Product Details:**
- Supplier/vendor information
- Warehouse location
- Stock status
- Product rating/reviews

**Product Pricing:**
- Individual price
- Discount applied
- Coupon used
- Margin/cost

### Item-Scoped Examples

#### Example 1: Product Purchase with Item Details

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
  'value': 142.52,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',

      // Standard item parameters
      'price': 29.99,
      'quantity': 2,
      'item_category': 'Apparel',
      'item_brand': 'Brand A',

      // Item-scoped custom parameters
      'item_color': 'blue',           // Item-scoped
      'item_size': 'large',           // Item-scoped
      'supplier': 'Vendor_XYZ',       // Item-scoped
      'warehouse_location': 'US-WEST' // Item-scoped
    },
    {
      'item_id': 'SKU_124',
      'item_name': 'Red Shoes',
      'price': 82.54,
      'quantity': 1,

      // Different item-scoped values for this product
      'item_color': 'red',            // Item-scoped
      'item_size': '10',              // Item-scoped
      'supplier': 'Vendor_ABC',       // Item-scoped
      'warehouse_location': 'US-EAST' // Item-scoped
    }
  ]
});
```

**Why Item-Scoped:**
- Each product has different color, size, supplier
- Attributes specific to individual items in cart
- Enables product-level analysis

#### Example 2: Custom Product Attributes

```javascript
gtag('event', 'add_to_cart', {
  'currency': 'USD',
  'value': 199.99,
  'items': [
    {
      'item_id': 'LAPTOP_001',
      'item_name': 'Gaming Laptop',
      'price': 199.99,
      'quantity': 1,

      // Custom item-scoped parameters
      'processor': 'Intel i7',        // Item-scoped
      'ram_gb': 16,                   // Item-scoped
      'storage_type': 'SSD',          // Item-scoped
      'screen_size_inches': 15.6,     // Item-scoped
      'condition': 'new',             // Item-scoped
      'warranty_years': 2             // Item-scoped
    }
  ]
});
```

**Why Item-Scoped:**
- Product specifications unique to this item
- Enables filtering/analysis by product attributes
- Helps understand what drives purchases

### Registering Item-Scoped Custom Dimensions

**Process:**

1. **Send Item Parameter in Items Array:**
```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Product',
      'custom_item_param': 'value'  // Item-scoped
    }
  ]
});
```

2. **Navigate to GA4 Admin:**
Admin → Data Display → Custom Definitions

3. **Create Custom Dimension:**
- **Dimension Name:** "Custom Item Attribute"
- **Scope:** **Item** ← Select Item
- **Event Parameter:** "custom_item_param"
- Description: What item attribute this tracks
- Click Save

4. **Wait 24-48 hours for data population**

### Item Scope Limits

**Standard GA4:**
- 10 item-scoped custom dimensions per property
- Maximum 27 items per event

**GA4 360:**
- 25 item-scoped custom dimensions per property
- Maximum 27 items per event

### Item Scope Best Practices

**DO:**
- Use for product-specific attributes
- Include in all ecommerce events (view_item, add_to_cart, purchase)
- Be consistent with parameter names across items
- Use for analysis/filtering products

**DON'T:**
- Exceed 27 items per event
- Use for user-level data (use user scope instead)
- Use for event-level data (use event scope instead)
- Forget to register item parameters as item-scoped dimensions

---

## Scope Comparison Table

| Aspect | Event Scope | User Scope | Item Scope |
|--------|------------|------------|------------|
| **Applies To** | Single event | All user events | Products in items array |
| **Lifespan** | One event | All sessions | One transaction |
| **Persistence** | No | Yes (until changed) | No |
| **Use Case** | Event details | User attributes | Product details |
| **Examples** | button_name, form_id | subscription_tier, user_type | item_color, item_size |
| **Max Dimensions (Standard)** | 50 | 25 | 10 |
| **Max Dimensions (GA4 360)** | 125 | 100 | 25 |
| **Set Method** | gtag('event', ...) | gtag('set', ...) | items array |

---

## Choosing the Right Scope

### Decision Framework

**Ask these questions:**

1. **Does this data describe the USER?**
   - Examples: subscription_tier, customer_segment, years_customer
   - **Scope:** User
   - **Why:** Attribute of who the user is

2. **Does this data describe the EVENT/ACTION?**
   - Examples: button_name, form_id, video_title
   - **Scope:** Event
   - **Why:** Specific to this interaction

3. **Does this data describe a PRODUCT?**
   - Examples: item_color, item_size, supplier
   - **Scope:** Item
   - **Why:** Product-level detail in ecommerce

### Scope Selection Examples

#### Example 1: Form Tracking

```javascript
gtag('event', 'form_submit', {
  // Event-scoped (describes THIS form submission)
  'form_id': 'contact-form',
  'form_type': 'lead_generation',
  'form_location': 'footer',

  // User-scoped (describes WHO submitted)
  'user_tier': 'premium',  // Set via gtag('set')
  'account_age_days': 365  // Set via gtag('set')
});
```

#### Example 2: Ecommerce Purchase

```javascript
gtag('event', 'purchase', {
  // Event-scoped (describes THIS transaction)
  'transaction_id': 'TXN_123',
  'value': 99.99,
  'currency': 'USD',
  'payment_method': 'credit_card',

  // User-scoped (WHO made purchase) - set separately
  // gtag('set', {'customer_lifetime_value': 5000})

  // Item-scoped (WHAT was purchased)
  'items': [
    {
      'item_id': 'SKU_123',
      'item_color': 'blue',  // Item-scoped
      'item_size': 'large'   // Item-scoped
    }
  ]
});
```

#### Example 3: Video Tracking

```javascript
// User property (set once)
gtag('set', {
  'user_subscription': 'premium'  // User-scoped
});

// Video event
gtag('event', 'video_complete', {
  // Event-scoped (describes THIS video watch)
  'video_id': 'VID_123',
  'video_title': 'GA4 Tutorial',
  'video_duration': 1200,
  'completion_percent': 100
});
```

---

## Common Scope Mistakes

### Mistake 1: Using Event Scope for User Attributes

```javascript
// ❌ WRONG - subscription_tier sent as event parameter
gtag('event', 'page_view', {
  'subscription_tier': 'premium'  // Will only apply to this event
});

// ✅ CORRECT - subscription_tier as user property
gtag('set', {
  'subscription_tier': 'premium'  // Applies to all events
});
```

### Mistake 2: Using User Scope for Event Details

```javascript
// ❌ WRONG - button_name as user property
gtag('set', {
  'button_name': 'Subscribe'  // Will apply to ALL events (incorrect)
});

// ✅ CORRECT - button_name as event parameter
gtag('event', 'button_click', {
  'button_name': 'Subscribe'  // Only applies to this click
});
```

### Mistake 3: Not Using Item Scope for Products

```javascript
// ❌ WRONG - product color as event parameter
gtag('event', 'purchase', {
  'product_color': 'blue'  // Can't handle multiple products
});

// ✅ CORRECT - product color in items array
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_color': 'blue'  // Item-scoped, handles multiple products
    }
  ]
});
```

### Mistake 4: Changing Scope After Registration

**Problem:** Cannot change scope after custom dimension is registered

```
Created dimension with Event scope
↓
Realize it should be User scope
↓
Cannot change scope
↓
Must create NEW dimension
```

**Solution:** Plan scopes carefully before registering dimensions

---

## Scope Planning Checklist

Before implementing parameters:

- [ ] Identify all parameters to collect
- [ ] Determine scope for each parameter (event/user/item)
- [ ] Verify scope choice with decision framework
- [ ] Plan custom dimension registrations
- [ ] Check against scope limits (50 event, 25 user, 10 item)
- [ ] Document parameter scope decisions
- [ ] Test in DebugView before production
- [ ] Register dimensions with correct scope
- [ ] Verify data in reports after 24-48 hours

---

## Advanced Scope Patterns

### Pattern 1: Combining Scopes for Rich Context

```javascript
// 1. Set user properties (User scope)
gtag('set', {
  'user_tier': 'enterprise',
  'customer_segment': 'high_value'
});

// 2. Fire event with event parameters (Event scope)
gtag('event', 'purchase', {
  'payment_method': 'invoice',      // Event scope
  'purchase_channel': 'phone',      // Event scope

  'items': [
    {
      'item_id': 'SKU_123',
      'item_color': 'blue',         // Item scope
      'supplier': 'Vendor_A'        // Item scope
    }
  ]
});

// Result: Event has all three scopes of context
```

### Pattern 2: Dynamic User Property Updates

```javascript
// Update user property based on action
function updateUserEngagement(action) {
  const engagementLevels = {
    'page_view': 'low',
    'form_submit': 'medium',
    'purchase': 'high'
  };

  gtag('set', {
    'engagement_level': engagementLevels[action]
  });
}

// Call when engagement level changes
updateUserEngagement('purchase');
```

### Pattern 3: Item Scope with Custom Calculations

```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_123',
      'price': 100,
      'quantity': 2,

      // Calculated item-scoped parameters
      'profit_margin': calculateMargin(100, 60),  // 40%
      'stock_status': getStockStatus('SKU_123'), // 'in_stock'
      'popularity_rank': getRank('SKU_123')       // 5
    }
  ]
});
```

---

## Additional Resources

- Official GA4 Scopes Documentation: https://support.google.com/analytics/answer/11396839
- Custom Dimensions Guide: https://support.google.com/analytics/answer/10075209
- User Properties: https://support.google.com/analytics/answer/9355671
