# GA4 Event Design Framework

## Comprehensive Guide to Custom Event Architecture

### Event Design Philosophy

Custom events should answer business questions:
- **What action** is the user taking?
- **Why does it matter** to the business?
- **What context** makes it meaningful?
- **How will it be analyzed**?

Effective events provide actionable insights about user behavior, feature adoption, and business metrics.

---

## Event Discovery Process

### Step 1: Identify Business Goals

List objectives that matter to the business:
- User acquisition and activation
- Feature adoption and engagement
- Conversion and monetization
- Retention and churn prevention
- Support and satisfaction

### Step 2: Map User Actions to Goals

Connect specific user behaviors to each business goal:

| Business Goal | User Action | Event Needed |
|---------------|------------|--------------|
| Feature adoption | User explores premium feature | `feature_explore` |
| Conversion | User upgrades from trial | `upgrade_start` |
| Retention | User invites teammates | `user_invite_send` |
| Support | User opens help article | `help_article_view` |
| Churn prevention | User pauses subscription | `subscription_pause` |

### Step 3: Determine Required Context

For each action, identify what context makes analysis meaningful:

**Example: Feature Adoption**
```
Event: feature_explore
Context needed:
  - feature_name: Which feature?
  - feature_category: Premium, beta, experimental?
  - source: Where did they find it? (help, notification, suggestion)
  - result: Did they stay on feature?
```

### Step 4: Design Event Structure

Finalize event name and parameters:

```javascript
gtag('event', 'feature_explore', {
  'feature_name': 'advanced_reporting',
  'feature_category': 'premium',
  'discovery_source': 'help_article',
  'user_tier': 'free'
});
```

---

## Parameter Scoping Strategy

GA4 uses three scopes. Choose correctly:

### Event-Scoped Parameters (Single Event)

**Use When:** Data is specific to this event occurrence

Examples:
- `button_clicked` event: which button_name?
- `video_watched` event: which video_title?
- `form_submit` event: which form_name, form_destination?

```javascript
gtag('event', 'video_watched', {
  'video_title': 'GA4 Fundamentals',        // Event-scoped
  'video_duration': 600,                    // Event-scoped
  'completion_percent': 100                 // Event-scoped
});
```

**Registration:** Event-Scoped Custom Dimension in Admin

### User-Scoped Parameters (User Properties)

**Use When:** Data applies to ALL events from user

Examples:
- subscription tier (free, pro, enterprise)
- company size (startup, mid-market, enterprise)
- customer segment (high-value, at-risk, churned)
- geographic region (EMEA, APAC, Americas)

```javascript
gtag('set', {
  'subscription_tier': 'premium',           // User-scoped
  'customer_segment': 'high_value',         // User-scoped
  'onboarding_complete': true               // User-scoped
});
```

**When to Use:** Set once, applies to all subsequent events

**Registration:** User-Scoped Custom Dimension in Admin

### Item-Scoped Parameters (Ecommerce Items)

**Use When:** Data applies to individual products in transaction

Only used with items array in ecommerce events.

```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Premium Widget',
      'item_color': 'blue',                 // Item-scoped
      'supplier': 'Vendor A',               // Item-scoped
      'quantity': 2,
      'price': 49.99
    }
  ]
});
```

---

## Parameter Design Best Practices

### Rule 1: Keep Parameters Meaningful

```
✅ Good:
gtag('event', 'trial_start', {
  'trial_days': 30,
  'trial_plan': 'professional',
  'source_utm': 'google_ads'
});

❌ Bad:
gtag('event', 'trial_start', {
  'random_id': '12345',
  'session_date': '2024-11-10',
  'browser': 'Chrome'  // These are auto-collected
});
```

### Rule 2: Use Consistent Values

```
✅ Good:
Always use 'free', 'pro', 'enterprise'
(case consistent, lowercase)

❌ Bad:
Mix of 'free', 'Free', 'FREE', 'standard'
(inconsistent capitalization)
```

### Rule 3: Avoid High-Cardinality Parameters

```
✅ Good:
'plan_type': 'pro'  (5 possible values)

❌ Bad:
'user_email': 'user@example.com'  (millions of values)
'session_id': '12345abc...'  (unique per session)
```

### Rule 4: Store IDs as Parameters, Not in Event Name

```
✅ Good:
gtag('event', 'video_watched', {
  'video_id': 'VID_12345',
  'video_title': 'Learning GA4'
});

❌ Bad:
gtag('event', 'video_watched_VID_12345')
gtag('event', 'video_watched_learning_ga4')
```

### Rule 5: Use Numeric Types for Metrics

```
✅ Good:
'price': 99.99  (number)
'quantity': 5   (integer)
'duration_seconds': 1200  (integer)

❌ Bad:
'price': '$99.99'  (string with currency)
'quantity': 'five'  (string)
'duration': '20 minutes'  (string)
```

---

## Event Documentation Template

Document every custom event:

```markdown
### Event: demo_request

**Description:** User requests product demonstration

**When Fired:**
- User clicks "Request Demo" button on pricing page
- User submits demo request form

**Parameters:**
| Parameter | Type | Values | Purpose |
|-----------|------|--------|---------|
| demo_type | string | walkthrough, personalized | Type of demo requested |
| industry | string | tech, finance, healthcare | User's industry |
| company_size | string | startup, mid-market, enterprise | Company size |
| source | string | pricing_page, landing_page, email | Where request originated |

**Implementation:**
- gtag.js: Yes
- GTM: Yes
- Measurement Protocol: Yes

**Custom Dimension:** Yes (demo_type, industry, company_size as event-scoped)

**Frequency:** ~50-100 per month (estimated)

**Related Events:** demo_attend, demo_skip, upgrade_after_demo
```

---

## Parameter Validation

### Type Validation

Ensure parameters use correct types:

```javascript
// ✅ Correct types
gtag('event', 'purchase', {
  'value': 99.99,              // Number
  'currency': 'USD',           // String
  'quantity': 3,               // Integer
  'is_gift': true,             // Boolean
  'items': [...]               // Array
});

// ❌ Wrong types
gtag('event', 'purchase', {
  'value': '99.99',            // String instead of number
  'quantity': '3',             // String instead of integer
  'is_gift': 'true'            // String instead of boolean
});
```

### Value Length Validation

```javascript
// ✅ Good (under limits)
gtag('event', 'form_submit', {
  'form_name': 'Contact Form',      // OK (14 chars)
  'company_name': 'Acme Corp',      // OK (9 chars)
  'email_body': 'Long message...'   // OK (100 chars max)
});

// ❌ Bad (too long)
gtag('event', 'form_submit', {
  'form_description': '...[200 chars]...'  // Exceeds 100 char limit
});
```

---

## Complex Event Examples

### Example 1: Video Engagement Tracking

```javascript
gtag('event', 'video_engagement', {
  'video_id': 'VID_2024_001',
  'video_title': 'GA4 Advanced Features',
  'video_duration': 1200,          // seconds
  'time_watched': 845,             // seconds
  'completion_percent': 70,
  'quality_selected': 'hd',
  'interaction_type': 'pause',     // pause, seek, quality_change, fullscreen
  'engagement_score': 8            // 1-10 scale
});
```

### Example 2: SaaS Onboarding Tracking

```javascript
gtag('event', 'onboarding_step_complete', {
  'step_number': 3,
  'step_name': 'team_invite',
  'total_steps': 5,
  'time_on_step': 245,             // seconds
  'users_invited': 2,
  'skip_attempted': false
});

// User-level context
gtag('set', {
  'onboarding_progress': 'step_3_of_5',
  'onboarding_started_date': '2024-11-10'
});
```

### Example 3: E-commerce Product Discovery

```javascript
gtag('event', 'product_discovery_complete', {
  'discovery_method': 'search',    // search, recommendation, browse, email
  'search_term': 'running shoes',
  'filters_applied': 3,
  'results_viewed': 24,
  'products_liked': 5,
  'add_to_cart_from_discovery': 2
});
```

---

## Event Consolidation vs Proliferation

### When to Consolidate Events

**Use one event with parameters instead of multiple events:**

```
❌ Too many events:
  - button_click_signin
  - button_click_signup
  - button_click_demo
  - button_click_contact

✅ One consolidated event:
  - button_click (with parameter: button_name)
```

### When to Separate Events

**Create separate events for distinct user journeys:**

```
✅ Separate events (correct):
  - feature_explore (user discovered feature)
  - feature_adopt (user started using feature)
  - feature_abandon (user stopped using feature)

❌ One event (not enough context):
  - feature_interaction (ambiguous: explore or use?)
```

### Decision Rule

- **Same event type + just different context**: Use parameters
- **Different action sequences or business flows**: Use separate events
- **Different analysis needs**: Consider separate events

---

## Event Limits and Quotas

### Standard GA4 Property Limits
- Maximum event names: 500 event types per property
- Maximum 25 parameters per event
- Parameter name: 40 characters max
- Parameter value: 100 characters max (with exceptions)

### Custom Dimension Limits
- Event-scoped: 50 per property
- User-scoped: 25 per property
- Item-scoped: 10 per property

### Planning for Scale

When designing events, consider:
1. How many unique custom events will be needed?
2. What parameters will each event require?
3. How many custom dimensions are needed?
4. What's the growth trajectory?

If approaching limits, prioritize:
- Events that directly impact business decisions
- Parameters that enable key analyses
- Dimensions needed for audience segmentation
