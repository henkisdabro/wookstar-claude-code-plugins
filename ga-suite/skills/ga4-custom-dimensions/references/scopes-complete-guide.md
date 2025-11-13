# Complete Guide to GA4 Dimension Scopes

## Scope Fundamentals

A **scope** in GA4 determines the range of applicability for a custom dimension:
- What it applies to (event, user, or product)
- How long it persists
- When and where it appears in reports

Understanding scope is critical because the same parameter name with different scopes creates completely different tracking behavior.

## Event Scope Deep Dive

### Definition

Event-scoped dimensions apply to a single event occurrence only. Once that event is recorded, the dimension value is tied exclusively to that event.

### Characteristics

- **Scope**: Single event only
- **Lifespan**: Duration of that one event
- **Persistence**: No carryover to other events
- **Reporting**: Appears only for that event type
- **Reusability**: Same dimension name can have different values across events
- **Quota**: 50 per standard GA4 property

### Implementation

**Basic event with event-scoped parameter:**

```javascript
gtag('event', 'form_submit', {
  'form_name': 'Contact Form',           // Event-scoped
  'form_id': 'contact-form-v2',          // Event-scoped
  'form_destination': '/thank-you',      // Event-scoped
  'form_field_count': 8                  // Event-scoped
});
```

**Each event sends these parameters independently:**

```javascript
// First form submission
gtag('event', 'form_submit', {
  'form_name': 'Contact Form'
});

// Later, different form submission
gtag('event', 'form_submit', {
  'form_name': 'Newsletter Signup'  // Different value, same event
});
```

### Use Cases

| Use Case | Parameter | Example |
|----------|-----------|---------|
| Which form? | form_name | "Contact", "Newsletter", "Demo Request" |
| Which video? | video_title | "GA4 Basics", "Advanced Analytics" |
| Which button? | button_name | "Subscribe", "Download", "Add to Cart" |
| Which search term? | search_query | "analytics", "reporting" |
| Which page? | page_section | "header", "sidebar", "footer" |
| Which error? | error_message | "404", "500", "timeout" |

### Admin Registration Example

**Creating "Form Name" Event-Scoped Dimension:**

1. Admin → Data Display → Custom Definitions
2. Click "Create Custom Dimension"
3. Dimension Name: "Form Name"
4. Scope: **Event** (select this)
5. Event Parameter: "form_name" (exact match from code)
6. Description: "Name of form submitted (contact, newsletter, etc)"
7. Save

**Result:** In reports, filter/analyze by "Form Name" dimension showing all form submissions

### Common Mistakes

**Mistake 1:** Using event-scoped dimension for persistent user data

```javascript
// WRONG: Event scope for user property
gtag('event', 'page_view', {
  'subscription_tier': 'premium'  // Should be user scope!
});
```

**Correct:** Use user scope for persistent attributes

```javascript
gtag('set', {
  'subscription_tier': 'premium'  // User scope - persists
});
```

**Mistake 2:** Sending same event-scoped dimension with every event

```javascript
// INEFFICIENT: Redundant in every event
gtag('event', 'page_view', {
  'user_location': 'New York'  // Repeating same value
});
gtag('event', 'button_click', {
  'user_location': 'New York'  // Same value repeated
});
```

**Better:** Use user scope instead

```javascript
gtag('set', {
  'user_location': 'New York'  // Set once, applies to all
});
```

---

## User Scope Deep Dive

### Definition

User-scoped dimensions (user properties) apply to all events from a user within a session. Set once, they persist across multiple events.

### Characteristics

- **Scope**: All events from that user
- **Lifespan**: User session (or until explicitly cleared)
- **Persistence**: Applies retroactively to events within session
- **Reporting**: Appears across all event types for that user
- **Reusability**: Can be used in audiences, segments, and filters
- **Quota**: 25 per standard GA4 property
- **Best for**: User attributes and customer characteristics

### Implementation

**Setting user properties once, applying to all events:**

```javascript
// User logs in - set properties once
gtag('set', {
  'subscription_tier': 'premium',
  'customer_id': 'CUST_12345',
  'years_customer': 5,
  'account_status': 'active',
  'preferred_language': 'en'
});

// All subsequent events automatically include these user properties
gtag('event', 'page_view');           // Includes user properties
gtag('event', 'button_click', {...}); // Includes user properties
gtag('event', 'purchase', {...});     // Includes user properties
```

### Predefined User Properties

GA4 automatically collects certain user properties without additional code:

```
language                Browser/app language
first_open_date        First app launch date
first_visit_date       First website visit date
ga_session_id          Current session ID
ga_session_number      Session count for user
```

### Use Cases

| Use Case | Property | Example Values |
|----------|----------|-----------------|
| Subscription level | subscription_tier | free, pro, enterprise |
| Customer segment | customer_segment | new, returning, vip |
| Account status | account_status | active, inactive, trial |
| Industry | industry | technology, finance, retail |
| Company size | company_size | small, medium, enterprise |
| Loyalty level | loyalty_status | bronze, silver, gold, platinum |
| Location | location | New York, London, Tokyo |
| Preferred language | preferred_language | en, es, fr, de |
| Revenue bracket | annual_revenue | 0-100k, 100k-1m, 1m+ |
| Tenure | years_customer | 1, 5, 10+ |

### Admin Registration Example

**Creating "Customer Segment" User-Scoped Dimension:**

1. Admin → Data Display → Custom Definitions
2. Click "Create Custom Dimension"
3. Dimension Name: "Customer Segment"
4. Scope: **User** (select this)
5. User Property: "customer_segment"
6. Description: "Customer type: new, returning, vip"
7. Save

**Result:** All events from that user labeled with their customer segment

### Clearing User Properties

User properties persist until explicitly cleared:

```javascript
// Clear single user property
gtag('set', {
  'subscription_tier': null  // Set to null to clear
});

// Clear on user logout
gtag('set', {
  'subscription_tier': null,
  'customer_id': null,
  'account_status': null
});
```

**Critical:** Always set to `null`, not empty string `""`. Empty string persists as a value.

### User Properties vs User ID

**User ID** (different from user properties):
- Enables cross-device and cross-session tracking
- Single identifier per user
- Set with `gtag('set', {'user_id': 'value'})`

**User Properties:**
- Multiple attributes about user
- Applied to all events from user
- Set with `gtag('set', {property: value})`

---

## Item Scope Deep Dive

### Definition

Item-scoped dimensions apply to individual products within ecommerce events (purchase, add_to_cart, view_item, etc.). Each product in the items array can have its own item-scoped dimension values.

### Characteristics

- **Scope**: Individual items in items array
- **Lifespan**: That transaction/event only
- **Persistence**: No carryover to future transactions
- **Reporting**: Product-level analysis in ecommerce reports
- **Quota**: 10 per standard GA4 property
- **Applies To**: purchase, add_to_cart, remove_from_cart, view_item, etc.
- **Array Structure**: Sits within items array objects

### Implementation

**Item-scoped parameters in items array:**

```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Blue T-Shirt',
      'price': 29.99,
      'quantity': 2,
      // ITEM-SCOPED CUSTOM DIMENSIONS:
      'item_color': 'blue',            // Which color?
      'item_size': 'large',            // Which size?
      'supplier': 'Vendor A',          // Which supplier?
      'warehouse_location': 'NY'       // Which warehouse?
    },
    {
      'item_id': 'SKU_124',
      'item_name': 'Gray Pants',
      'price': 49.99,
      'quantity': 1,
      // DIFFERENT VALUES for second item:
      'item_color': 'gray',            // Different color
      'item_size': 'medium',           // Different size
      'supplier': 'Vendor B',          // Different supplier
      'warehouse_location': 'LA'       // Different warehouse
    }
  ]
});
```

### Use Cases

| Use Case | Parameter | Example Values |
|----------|-----------|-----------------|
| Product color | item_color | red, blue, green, black |
| Product size | item_size | small, medium, large, xl |
| Supplier/vendor | supplier | "Vendor A", "Vendor B", "Internal" |
| Product quality tier | item_quality | standard, premium, luxury |
| Warehouse | warehouse_location | NY, LA, London, Tokyo |
| Product condition | condition | new, refurbished, used |
| Fabric type | fabric_type | cotton, polyester, silk |
| Season | season | spring, summer, fall, winter |
| Sustainability | eco_friendly | true, false |
| Gender/age | target_demographic | mens, womens, kids |

### Admin Registration Example

**Creating "Item Color" Item-Scoped Dimension:**

1. Admin → Data Display → Custom Definitions
2. Click "Create Custom Dimension"
3. Dimension Name: "Item Color"
4. Scope: **Item** (select this)
5. Event Parameter: "item_color"
6. Description: "Color variant of product"
7. Save

**Result:** Ecommerce reports can analyze "Which colors sell best?" by revenue, quantity, etc.

### Accessing Item-Scoped Data in Reports

Standard GA4 reports:
1. Analytics → Reports → Monetization → Items
2. See products with custom dimensions
3. Add "Item Color" dimension to table
4. Sort/filter by color

Explorations:
1. Analytics → Explore
2. Use Item-related dimensions and metrics
3. Create "Items by Color" report
4. Analyze revenue, quantity, performance by item dimension

### Complete Purchase Example

```javascript
// Complete purchase with all item types and item-scoped dimensions
gtag('event', 'purchase', {
  'transaction_id': 'TXN_' + Date.now(),
  'value': 189.97,
  'currency': 'USD',
  'items': [
    {
      // Standard fields (required)
      'item_id': 'SKU_SHIRT_BLUE_L',
      'item_name': 'Blue T-Shirt',
      'price': 29.99,
      'quantity': 2,

      // Google-recommended fields (highly recommended)
      'item_category': 'Apparel',
      'item_brand': 'My Brand',
      'item_variant': 'Blue/Large',

      // CUSTOM ITEM-SCOPED DIMENSIONS:
      'item_color': 'blue',
      'item_size': 'large',
      'supplier': 'Vendor A',
      'warehouse_location': 'New York'
    },
    {
      'item_id': 'SKU_PANTS_GRAY_M',
      'item_name': 'Gray Pants',
      'price': 49.99,
      'quantity': 2,
      'item_category': 'Apparel',
      'item_brand': 'My Brand',
      'item_variant': 'Gray/Medium',

      // CUSTOM ITEM-SCOPED DIMENSIONS (different values):
      'item_color': 'gray',
      'item_size': 'medium',
      'supplier': 'Vendor B',
      'warehouse_location': 'Los Angeles'
    }
  ]
});
```

---

## Scope Decision Framework

Use this framework to select correct scope:

### Decision Tree

**Is this data...**

1. **About a single event occurrence?**
   - YES → Use **Event scope**
   - Example: "Which button was clicked?" → button_name (event-scoped)

2. **About the user, applying to all their events?**
   - YES → Use **User scope**
   - Example: "What's user's subscription level?" → subscription_tier (user-scoped)

3. **About individual products in ecommerce events?**
   - YES → Use **Item scope**
   - Example: "Which color was purchased?" → item_color (item-scoped)

4. **About the same thing, but sometimes changes per event?**
   - YES → Use **Event scope** (not user scope)
   - Example: "user_location" might change per page_view event → event-scoped

### Scope Selection Matrix

| Question | Event | User | Item |
|----------|-------|------|------|
| Applies to single event only? | ✓ | ✗ | ✗ |
| Applies to all user events? | ✗ | ✓ | ✗ |
| Applies to products in purchase? | ✗ | ✗ | ✓ |
| Persists across sessions? | ✗ | ✓ | ✗ |
| Can have different values per event? | ✓ | ✗ | ✓ |
| Used for audience building? | Limited | ✓ | Limited |
| Used in conversion analysis? | ✓ | ✓ | ✓ |

## Scope Limits & Quotas

### Standard GA4 Property

- Event-scoped custom dimensions: 50 maximum
- User-scoped custom dimensions: 25 maximum
- Item-scoped custom dimensions: 10 maximum
- Total custom metrics: 50 maximum
- Total calculated metrics: 5 maximum

### GA4 360 Property

- Event-scoped custom dimensions: 125 maximum
- User-scoped custom dimensions: 100 maximum
- Item-scoped custom dimensions: 25 maximum
- Total custom metrics: 125 maximum
- Total calculated metrics: 50 maximum

### Choosing Which to Create

Prioritize by importance:

1. **Essential** - Required for business reporting (create first)
2. **Important** - Nice to have, but useful (create second)
3. **Nice-to-have** - Interesting but not critical (create if quota allows)

Example priority:

```
High Priority (Event):
  - form_name (which forms submitted)
  - error_type (what errors users encounter)
  - page_section (where on page interactions happen)

High Priority (User):
  - subscription_tier (critical for segmentation)
  - customer_segment (key for analysis)

High Priority (Item):
  - item_color (what colors sell)
  - item_size (what sizes convert)
```

---

## Common Scope Confusion Examples

### ❌ WRONG: Using Event Scope for User Data

```javascript
// INCORRECT - This repeats the same value in every event
gtag('event', 'page_view', {
  'subscription_tier': 'premium'  // Event scope
});

gtag('event', 'button_click', {
  'subscription_tier': 'premium'  // Repeated!
});

// Result: Bloated events, wasted parameters
```

### ✅ CORRECT: Using User Scope for User Data

```javascript
// CORRECT - Set once, applies to all events
gtag('set', {
  'subscription_tier': 'premium'  // User scope
});

gtag('event', 'page_view');       // Automatically includes subscription_tier
gtag('event', 'button_click', {}); // Automatically includes subscription_tier

// Result: Clean, efficient, applies everywhere
```

### ❌ WRONG: Using User Scope for Event Data

```javascript
// INCORRECT - "button_name" changes with every button click
gtag('set', {
  'button_name': 'Download'  // User scope - wrong!
});

gtag('event', 'button_click'); // Later click on different button
// Now it says all events came from "Download" button - wrong!
```

### ✅ CORRECT: Using Event Scope for Event Data

```javascript
// CORRECT - Each event captures its own button
gtag('event', 'button_click', {
  'button_name': 'Download'  // Event scope
});

gtag('event', 'button_click', {
  'button_name': 'Subscribe'  // Event scope - different value
});

// Result: Accurate, event-specific tracking
```

---

## Best Practices by Scope

### Event Scope Best Practices

- Name descriptively (button_name, form_id, video_title)
- Use for action-specific context
- Avoid for user-level attributes
- Can repeat across events with different values
- Useful for "What happened?" analysis

### User Scope Best Practices

- Name as attributes (subscription_tier, customer_segment, account_status)
- Use for persistent user characteristics
- Set early in session (after authentication)
- Clear on logout with `null`
- Never use empty string to clear
- Useful for "Who is this user?" analysis

### Item Scope Best Practices

- Use only in items array of ecommerce events
- Name as item properties (item_color, item_size)
- Keep values consistent across items
- Register in Admin as Item scope
- Useful for "What are we selling?" analysis

