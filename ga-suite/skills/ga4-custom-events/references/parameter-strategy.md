# GA4 Custom Event Parameters: Strategy & Best Practices

## Complete Parameter Planning Guide

### Parameter Selection Framework

#### Step 1: Identify Business Question

Define what the event reveals about user behavior:

```
Event: demo_request
Business Question: Which customer segments are interested in enterprise features?

Questions Answered:
- Is the user currently a customer? (customer_status)
- Which industry are they in? (industry)
- What size is their company? (company_size)
- How did they discover the demo? (discovery_source)
```

#### Step 2: Determine Required Context

List parameters that answer each question:

| Question | Parameter | Values |
|----------|-----------|--------|
| Customer status? | customer_status | lead, current, competitor |
| Industry? | industry | tech, finance, healthcare |
| Company size? | company_size | startup, mid-market, enterprise |
| Discovery source? | discovery_source | content, ad, partner, email |

#### Step 3: Validate Against Constraints

- Are there <25 parameters total?
- Is each parameter <100 characters?
- Can you analyze/segment by these parameters?
- Will these parameters have <100,000 unique values?

#### Step 4: Implement & Register

Send parameters in event, then register as custom dimensions in GA4 Admin.

---

## Parameter Types & Guidelines

### String Parameters

Use for categorical data with limited unique values:

```javascript
gtag('event', 'feature_adopt', {
  'feature_name': 'advanced_reporting',     // Good: ~10-50 unique
  'user_tier': 'professional',              // Good: 5 options max
  'source': 'in_app_suggestion',            // Good: ~10-20 options
  'user_email': 'john@example.com'          // BAD: millions of unique
});
```

**String Parameter Best Practices:**
- Keep values consistent (always lowercase: "free", not "Free")
- Use labels, not IDs when possible
- Avoid high-cardinality values (emails, URLs, timestamps)
- Maximum 100 characters per value

### Numeric Parameters

Use for quantifiable measurements:

```javascript
gtag('event', 'video_watched', {
  'video_duration': 1200,              // Seconds (integer)
  'watch_time': 900,                   // Seconds (integer)
  'completion_percent': 75,            // Percentage (0-100)
  'playback_speed': 1.25,              // Decimal (float)
  'rewatch_count': 2                   // Count (integer)
});
```

**Numeric Parameter Best Practices:**
- Use appropriate units (seconds, percentages, counts)
- Store as numbers, not strings ("120", not "2 minutes")
- Use integers for counts, floats for measurements
- Document units clearly

### Boolean Parameters

Use for binary on/off state:

```javascript
gtag('event', 'signup_complete', {
  'email_verified': true,
  'payment_method_saved': false,
  'opted_to_newsletter': true
});
```

**Boolean Parameter Best Practices:**
- Limited to true/false (or 0/1)
- Clear naming (is_*, has_*, enabled_)
- Only use when genuinely binary (not if 3+ states)

### Array/Object Parameters

Limited use - primarily for ecommerce items:

```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Shoe Pro',
      'price': 99.99,
      'quantity': 1
    }
  ]
});
```

**Array Parameter Best Practices:**
- Only for items in ecommerce context
- Each item = one product in transaction
- Maximum 27 items per event

---

## Parameter Naming Strategy

### Naming Convention

Use lowercase snake_case, descriptive names:

```javascript
// ✅ Good
gtag('event', 'feature_adopt', {
  'feature_name': 'advanced_reporting',
  'adoption_reason': 'team_request',
  'time_to_adopt_days': 3
});

// ❌ Bad
gtag('event', 'feature_adopt', {
  'fn': 'advanced_reporting',           // Too abbreviated
  'reason': 'team_request',             // Too generic
  'ttad': 3                             // Unclear abbreviation
});
```

### Common Parameter Names

Establish naming standards:

| Concept | Parameter Name | Type |
|---------|----------------|------|
| User identifier | user_id, customer_id | string |
| Product identifier | product_id, item_id | string |
| Product name | product_name, item_name | string |
| Category | category, item_category | string |
| Price | price, unit_price | number |
| Quantity | quantity | integer |
| Status | status, account_status | string |
| Type | type, event_type | string |
| Method | method, payment_method | string |
| Result | result, completion_status | string |
| Reason | reason, error_reason | string |
| Source | source, utm_source | string |
| Duration | duration_minutes, duration_seconds | integer |
| Percentage | percent_complete, completion_percent | integer |

### Avoid These Naming Patterns

```
❌ Avoid abbreviations: ttc → time_to_convert
❌ Avoid capitalization: ProductName → product_name
❌ Avoid spaces: "product name" → product_name
❌ Avoid special chars: product-name → product_name
❌ Avoid encoding IDs: user_123 → user_id with value "123"
❌ Avoid mixed naming: user_name + customerEmail → user_name + user_email
```

---

## Parameter Value Standards

### Categorical Values

```javascript
// Plan types (be consistent)
'plan': 'free'        // ✅
'plan': 'Free'        // ❌ Inconsistent case
'plan': 'starter'     // ✅
'plan': 'pro'         // ✅
'plan': 'PRO'         // ❌ Inconsistent case

// Status values
'status': 'active'
'status': 'inactive'
'status': 'pending'
'status': 'suspended'
```

### Time-Based Values

Never use timestamp parameters - use GA4 date automatically:

```javascript
// ❌ Wrong: timestamp parameters
gtag('event', 'purchase', {
  'purchase_date': '2024-11-10',     // NO - GA4 auto-collects
  'purchase_time': '14:30:00',       // NO - Use event timestamp
  'user_since': 1728518400           // NO - Use user property registration
});

// ✅ Right: relative time parameters
gtag('event', 'purchase', {
  'customer_tenure_months': 12,      // How long customer
  'time_to_purchase_days': 45,       // Days from signup to purchase
  'session_duration_minutes': 15     // Duration in this session
});
```

### Numeric Value Ranges

Standardize ranges for analysis:

```javascript
// ✅ Good: Consistent ranges
'company_size': 'startup',      // <50 people
'company_size': 'mid-market',   // 50-500 people
'company_size': 'enterprise',   // 500+ people

// ✅ Good: Specific numbers
'team_size': 5,
'message_length': 250,
'files_uploaded': 3

// ❌ Bad: Vague or inconsistent
'company_size': 'big',          // Too vague
'team_size': 'small',           // Should be number
```

---

## Parameter Documentation Template

Document parameters for team reference:

```markdown
## Event: demo_request

### Parameters

| Name | Type | Values | Purpose | Scoping |
|------|------|--------|---------|---------|
| demo_type | string | walkthrough, technical, sales | Type of demo | Event |
| industry | string | tech, finance, healthcare, etc. | User's industry | Event |
| company_size | string | startup, mid-market, enterprise | Company size | Event |
| current_customer | boolean | true, false | If already customer | Event |
| utm_source | string | landing_page, email, referral | Traffic source | Event |

### Rules
- demo_type is required
- company_size defaults to "unknown" if not provided
- Only send actual values, never null
```

---

## Common Parameter Mistakes & Solutions

### Mistake 1: High-Cardinality Parameters

```javascript
// ❌ Bad: Too many unique values
gtag('event', 'lead_create', {
  'email': 'john@example.com',          // Millions of values
  'company_domain': 'acme.com',         // Thousands of values
  'full_name': 'John Smith',            // Millions of values
  'phone': '555-1234'                   // Millions of values
});

// ✅ Good: Categorical values
gtag('event', 'lead_create', {
  'email_domain_category': 'company',   // Few: company, gmail, other
  'company_size': 'enterprise',         // Few: startup, mid, enterprise
  'lead_source': 'webinar',             // Few: webinar, form, trial
  'country': 'US'                       // Manageable: country codes
});
```

### Mistake 2: Data That Belongs in Custom Dimensions, Not Parameters

```javascript
// ❌ Bad: Event-specific data sent as parameter
gtag('event', 'page_view', {
  'subscription_tier': 'premium'        // This is user property
});

// ✅ Good: Send as user property
gtag('set', {
  'subscription_tier': 'premium'
});

gtag('event', 'page_view');
// subscription_tier automatically included
```

### Mistake 3: Redundant Parameters

```javascript
// ❌ Bad: Redundant - one is enough
gtag('event', 'purchase', {
  'product_id': 'SHOE_001',
  'product_id_sku': 'SHOE_001',
  'sku': 'SHOE_001'
});

// ✅ Good: Single consistent parameter
gtag('event', 'purchase', {
  'product_id': 'SHOE_001'
});
```

### Mistake 4: Forgetting to Register Custom Dimensions

```javascript
// ❌ Problem: Parameter sent but not registered
gtag('event', 'video_watched', {
  'video_quality': 'hd'        // Sent but not registered
});

// ✅ Solution: Register in GA4 Admin
// Admin > Data Display > Custom Definitions > Create Custom Dimension
// Dimension Name: Video Quality
// Scope: Event
// Event Parameter: video_quality
```

---

## Parameter Implementation Patterns

### Pattern 1: Optional Parameters

Some parameters only relevant in certain conditions:

```javascript
// Always sent
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'USD'
});

// Only if coupon applied
if (coupon_applied) {
  gtag('event', 'purchase', {
    'coupon': 'SAVE10',
    'discount_percent': 10
  });
}

// Only for high-value orders
if (value > 500) {
  gtag('event', 'purchase', {
    'high_value': true,
    'account_manager': 'jane_doe'
  });
}
```

### Pattern 2: Conditional Parameter Values

Parameter value depends on other data:

```javascript
// Determine user segment based on multiple factors
let customer_segment;
if (annual_spend > 50000) {
  customer_segment = 'vip';
} else if (annual_spend > 10000) {
  customer_segment = 'high_value';
} else if (annual_spend > 1000) {
  customer_segment = 'regular';
} else {
  customer_segment = 'free';
}

gtag('event', 'purchase', {
  'customer_segment': customer_segment,
  'annual_spend': annual_spend
});
```

### Pattern 3: Enriched Parameters

Add context by combining data sources:

```javascript
// Combine internal + external data
let utm_source = getURLParameter('utm_source');
let internal_campaign = getCampaignIdFromDB();
let marketing_channel = mapToChannel(utm_source);

gtag('event', 'signup_complete', {
  'utm_source': utm_source,          // Raw UTM param
  'internal_campaign': internal_campaign,  // From DB
  'marketing_channel': marketing_channel   // Derived/mapped
});
```

---

## Advanced Parameter Strategies

### Strategy 1: Parameter Hierarchies

Use structured parameter naming for related data:

```javascript
gtag('event', 'course_complete', {
  // Hierarchical structure
  'course_type': 'technical',          // Top level
  'course_subtype': 'python',          // Sub-category
  'course_level': 'advanced',          // Difficulty

  // Alternative: use compound parameter
  'course_id': 'PYTHON_ADV_101'        // ID encodes all info
});
```

### Strategy 2: Derived Parameters

Calculate parameters from other data:

```javascript
let time_to_purchase_days = (purchase_date - signup_date) / 86400000;
let engagement_score = calculate_engagement(activity_log);
let ltv_segment = classify_ltv(revenue_history);

gtag('event', 'first_purchase', {
  'time_to_purchase_days': Math.round(time_to_purchase_days),
  'engagement_score': engagement_score,      // 1-10
  'ltv_segment': ltv_segment                 // low, medium, high
});
```

### Strategy 3: Lookup Table Parameters

Map internal IDs to user-friendly values:

```javascript
// Define mapping
const feature_lookup = {
  'feat_001': 'team_collaboration',
  'feat_002': 'advanced_reporting',
  'feat_003': 'api_access'
};

let feature_id = getUserFeature();
gtag('event', 'feature_enable', {
  'feature_name': feature_lookup[feature_id],  // User-friendly
  'feature_id': feature_id                     // Internal ID
});
```

---

## Parameter Limits & Optimization

### GA4 Parameter Limits

| Limit | Value |
|-------|-------|
| Parameters per event | 25 maximum |
| Parameter name length | 40 characters maximum |
| Parameter value length | 100 characters maximum* |
| Custom dimension parameters | 50 event-scoped, 25 user-scoped |

*Exceptions: page_title (300), page_referrer (420), page_location (1000)

### Optimization Strategies

**When at Parameter Limit:**

1. **Consolidate Related Parameters:**
```javascript
// ❌ Many parameters
gtag('event', 'purchase', {
  'item_1_name': 'Shoe',
  'item_1_price': 99.99,
  'item_2_name': 'Shirt',
  'item_2_price': 29.99
});

// ✅ Use items array
gtag('event', 'purchase', {
  'items': [
    { 'item_name': 'Shoe', 'price': 99.99 },
    { 'item_name': 'Shirt', 'price': 29.99 }
  ]
});
```

2. **Use Compound Values:**
```javascript
// ❌ Many parameters
gtag('event', 'feature_adopt', {
  'feature_category': 'reporting',
  'feature_type': 'advanced',
  'feature_difficulty': 'high'
});

// ✅ Compound value
gtag('event', 'feature_adopt', {
  'feature_class': 'reporting_advanced_high'
});
```

3. **Move to User Properties:**
```javascript
// ❌ Repeat in every event
gtag('event', 'purchase', {
  'company_size': 'enterprise',
  'industry': 'finance'
});

// ✅ Set as user property
gtag('set', {
  'company_size': 'enterprise',
  'industry': 'finance'
});

gtag('event', 'purchase', {
  // user properties automatically included
});
```

---

## Parameter Testing & Validation

### Test Checklist

Before production deployment:

- [ ] All parameters sent are documented
- [ ] Parameter values are consistent (same values always)
- [ ] High-cardinality parameters removed or consolidated
- [ ] No PII (personally identifiable information) in parameters
- [ ] Parameter values don't exceed 100 characters
- [ ] Total parameters per event ≤25
- [ ] Custom dimensions registered in GA4 Admin
- [ ] DebugView shows correct parameter values
- [ ] 24-48 hours passed - data appears in reports
- [ ] Custom dimension values appear in report breakdowns

### Validation Script (JavaScript)

```javascript
function validateEventParameters(eventName, params) {
  // Check parameter count
  if (Object.keys(params).length > 25) {
    console.warn(`Event ${eventName} has >25 parameters`);
  }

  // Check parameter name length
  Object.keys(params).forEach(key => {
    if (key.length > 40) {
      console.warn(`Parameter name "${key}" exceeds 40 chars`);
    }

    // Check parameter value length
    const value = params[key];
    if (typeof value === 'string' && value.length > 100) {
      console.warn(`Parameter "${key}" value exceeds 100 chars`);
    }

    // Check for PII patterns
    if (value && typeof value === 'string') {
      if (value.includes('@') && value.includes('.')) {
        console.warn(`Parameter "${key}" may contain email`);
      }
      if (/\b\d{3}-\d{2}-\d{4}\b/.test(value)) {
        console.warn(`Parameter "${key}" may contain SSN`);
      }
    }
  });

  return true;
}

// Usage
validateEventParameters('purchase', {
  'value': 99.99,
  'currency': 'USD'
});
```
