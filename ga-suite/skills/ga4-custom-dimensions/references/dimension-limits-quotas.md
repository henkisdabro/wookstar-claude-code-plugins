# GA4 Dimension Limits, Quotas & Planning Guide

## Standard GA4 Property Quotas

### Dimension Quotas

| Scope Type | Limit | GA4 360 Limit |
|------------|-------|---------------|
| Event-scoped custom dimensions | 50 | 125 |
| User-scoped custom dimensions | 25 | 100 |
| Item-scoped custom dimensions | 10 | 25 |

### Metric Quotas

| Metric Type | Limit | GA4 360 Limit |
|-------------|-------|---------------|
| Standard custom metrics | 50 | 125 |
| Calculated metrics | 5 | 50 |

### Total Dimension Budget

**Standard GA4:**
- Maximum total: 50 + 25 + 10 = 85 custom dimensions

**GA4 360:**
- Maximum total: 125 + 100 + 25 = 250 custom dimensions

---

## Understanding Quota Impacts

### Event-Scoped Dimensions (50 Max in Standard GA4)

**Typical usage distribution:**

```
High priority (essential):     5-10 dimensions
Medium priority (important):   10-15 dimensions
Low priority (nice-to-have):   5-10 dimensions
Testing/experimental:          5-10 dimensions
Unused/deprecated:             5-10 dimensions
Total:                         30-55 dimensions (likely over quota)
```

### User-Scoped Dimensions (25 Max in Standard GA4)

**Typical usage distribution:**

```
Subscription/plan tier:  1 dimension
Customer segment:        1 dimension
Account status:          1 dimension
Company characteristics: 3-5 dimensions
Behavioral attributes:   3-5 dimensions
Preferences:             3-5 dimensions
Unused/deprecated:       3-5 dimensions
Total:                   15-25 dimensions (likely at/near quota)
```

### Item-Scoped Dimensions (10 Max in Standard GA4)

**Typical usage distribution:**

```
Color/variant:     1-2 dimensions
Size:              1 dimension
Material/fabric:   1 dimension
Supplier/vendor:   1 dimension
Quality tier:      1 dimension
Unused/test:       2-3 dimensions
Total:             8-10 dimensions (likely at quota)
```

---

## Quota Management Strategy

### When You Hit Quota

**Immediate:**
1. Stop creating new dimensions temporarily
2. Audit existing dimensions for unused ones
3. Delete low-priority/test dimensions
4. Document deletions

**Medium-term:**
1. Consolidate similar dimensions
2. Archive less-used dimensions (delete then document)
3. Consider GA4 360 upgrade if quota consistently exceeded

**Long-term:**
1. Plan which dimensions are truly essential
2. Establish dimension governance policies
3. Regular quarterly reviews of dimension usage

### Prioritization Framework

**Tier 1: Keep (Essential)**
- ✓ Required for critical business reports
- ✓ Used by multiple teams
- ✓ Part of regulatory/compliance reporting
- ✓ Cannot be replaced by built-in dimensions

**Tier 2: Keep (Important)**
- ✓ Used regularly in analysis
- ✓ Part of team dashboards
- ✓ Supports strategic decisions
- ✓ Actively send data (not dormant)

**Tier 3: Review (Optional)**
- ? Used occasionally
- ? Experimental in nature
- ? Data doesn't appear in reports
- ? Can be replicated from other data

**Tier 4: Delete (Candidates)**
- ✗ Never used in reports
- ✗ Data not being sent (implementation missing)
- ✗ Duplicate of existing dimension
- ✗ Test/experimental dimension
- ✗ Parameter no longer tracked

### Audit Checklist

Run quarterly to identify deletable dimensions:

```
For each dimension, check:

[ ] Has data in reports?
    NO → Candidate for deletion

[ ] Used by any teams?
    NO → Candidate for deletion

[ ] Parameter still being sent?
    NO → Candidate for deletion

[ ] Duplicate of another dimension?
    YES → Delete duplicate

[ ] Actively analyzed?
    NO → Candidate for deletion
```

---

## Parameter Limits (Not Quota-Based)

These are separate from dimension quotas - they apply to all events:

### Event Parameter Limits

| Aspect | Limit | Notes |
|--------|-------|-------|
| Parameters per event | 25 max | Total count of all parameters |
| Parameter name length | 40 characters | Cannot be longer |
| String parameter value | 100 characters | Most parameters |
| page_title value | 300 characters | Special exception |
| page_referrer value | 420 characters | Special exception |
| page_location value | 1000 characters | Special exception |

### Items Array Limits

| Aspect | Limit | Notes |
|--------|-------|-------|
| Items per event | 27 max | Maximum products in one transaction |
| Item parameters | 10+ available | Predefined + custom |
| Item parameter value | 100 characters | Standard limits apply |

### User Property Limits

| Aspect | Limit | Notes |
|--------|-------|-------|
| User properties per user | 100 max | Total count across all |
| Property name length | 40 characters | Cannot be longer |
| Property value length | 100 characters | Standard limits |

---

## Quota Warnings & Enforcement

### Before Hitting Quota

**GA4 provides warnings:**
- No explicit warning currently (as of 2024)
- Monitor quota usage in Admin → Custom Definitions
- List shows all dimensions with counts

### When At Quota

**Behavior:**
- Cannot create new dimension of that scope
- Error message: Cannot proceed
- Must delete existing dimension first

### When Over Quota (Impossible)

**By design:** GA4 prevents exceeding quota
- Will not let you create if would exceed
- Must delete first

---

## Capacity Planning Worksheet

Use this worksheet to plan dimensions before implementation:

### Event-Scoped Dimensions Planning

```
Total quota: 50 (Standard GA4) / 125 (GA4 360)

Category 1: Form Tracking
  [ ] form_name
  [ ] form_id
  [ ] form_type
  Subtotal: 3

Category 2: Button/Link Tracking
  [ ] button_name
  [ ] link_destination
  [ ] link_type
  Subtotal: 3

Category 3: Video Tracking
  [ ] video_title
  [ ] video_quality
  [ ] video_category
  Subtotal: 3

Category 4: Error Tracking
  [ ] error_type
  [ ] error_code
  Subtotal: 2

Category 5: [Your Category]
  [ ] dimension_name
  Subtotal: X

TOTAL PLANNED: 11+ dimensions
QUOTA AVAILABLE: 50
BUFFER REMAINING: 39
```

### User-Scoped Dimensions Planning

```
Total quota: 25 (Standard GA4) / 100 (GA4 360)

Category 1: Subscription/Tier
  [ ] subscription_tier
  [ ] trial_status
  Subtotal: 2

Category 2: Customer Type
  [ ] customer_segment
  [ ] customer_type
  Subtotal: 2

Category 3: Account Status
  [ ] account_status
  [ ] account_age
  Subtotal: 2

Category 4: Company Information
  [ ] company_size
  [ ] industry
  [ ] company_country
  Subtotal: 3

Category 5: Preferences
  [ ] preferred_language
  [ ] communication_preference
  Subtotal: 2

Category 6: [Your Category]
  [ ] property_name
  Subtotal: X

TOTAL PLANNED: 11+ dimensions
QUOTA AVAILABLE: 25
BUFFER REMAINING: 14
```

### Item-Scoped Dimensions Planning

```
Total quota: 10 (Standard GA4) / 25 (GA4 360)

Category 1: Product Attributes
  [ ] item_color
  [ ] item_size
  Subtotal: 2

Category 2: Supplier/Source
  [ ] supplier
  [ ] warehouse_location
  Subtotal: 2

Category 3: Product Quality
  [ ] quality_tier
  Subtotal: 1

Category 4: [Your Category]
  [ ] property_name
  Subtotal: X

TOTAL PLANNED: 5+ dimensions
QUOTA AVAILABLE: 10
BUFFER REMAINING: 5
```

---

## Optimization Strategies

### Strategy 1: Consolidation

**Instead of:** 3 separate dimensions (button_text, button_id, button_type)

**Use:** 1 dimension (button_identifier = "type_id_text")

**Benefit:** Saves 2 dimensions, still trackable

### Strategy 2: Hierarchy Reduction

**Instead of:** item_category, item_subcategory, item_subsubcategory (3 dimensions)

**Use:** Built-in item_category (predefined) + custom item_category2 (predefined)

**Benefit:** Saves 1 dimension using pre-built fields

### Strategy 3: Metric instead of Dimension

**Instead of:** Dimension "video_watch_percentage"

**Use:** Metric minutes_watched (numeric) + Formula

**Benefit:** Dimensions for categorization, metrics for calculation

### Strategy 4: Segment in Exploration

**Instead of:** User-scoped dimension "cohort_type"

**Use:** Build temporary segment in Exploration for analysis

**Benefit:** Saves dimension quota, still enables analysis

---

## GA4 360 Considerations

### When to Upgrade to GA4 360

**Quota benefits:**
- 2.5x more event-scoped dimensions (50 → 125)
- 4x more user-scoped dimensions (25 → 100)
- 2.5x more item-scoped dimensions (10 → 25)

**Other GA4 360 benefits:**
- Increased custom metric quotas
- Extended data retention (up to 50 months)
- Advanced features (data-driven attribution by default)
- Data import capabilities
- Streaming BigQuery export
- Advanced support

**When quota-only upgrade makes sense:**
- More than 85 total dimensions needed
- Multiple teams each needing own dimensions
- Complex ecommerce tracking (20+ item attributes)
- Enterprise with many business units

---

## Common Quota Mistakes to Avoid

### Mistake 1: Creating Similar Dimensions

```
❌ WRONG:
  - button_name
  - button_text
  - button_label
  (These are the same thing!)

✓ CORRECT:
  - button_name
  (Use consistently)
```

**Prevention:** Establish naming standards before implementation

### Mistake 2: Creating Dimensions for Unique Values

```
❌ WRONG:
  - user_email (millions of unique values)
  - session_id (unique per session)
  - timestamp (continuous values)
  (High cardinality, not useful for analysis)

✓ CORRECT:
  - user_tier (few values)
  - user_region (manageable values)
  - signup_month (grouped time)
```

**Prevention:** Only dimensions with <100 unique values

### Mistake 3: Not Deleting Test Dimensions

```
❌ WRONG:
  - test_dimension
  - temp_parameter
  - dev_test
  - debugging_param
  (Wastes quota)

✓ CORRECT:
  - Delete test dimensions after verification
  - Use separate test GA4 property
```

**Prevention:** Track test vs. production dimensions

### Mistake 4: Creating Redundant Dimensions

```
❌ WRONG:
  - page_title (already built-in!)
  - device_category (already built-in!)
  - user_id (use User ID feature instead)

✓ CORRECT:
  - Review built-in dimensions first
  - Only create custom when necessary
```

**Prevention:** Audit built-in dimensions before creating custom

---

## Quota Governance Policy (Template)

Organizations should establish policies:

### Dimension Creation Policy

**Before Creation:**
1. Business justification required
2. Dimensions reviewed by analytics lead
3. Check if built-in dimension exists
4. Verify quota available
5. Document in shared list

**After Creation:**
1. Register properly (scope, naming)
2. Implement in code
3. Verify in DebugView
4. Document in team wiki
5. Add to dashboard/report

### Dimension Review Schedule

**Quarterly Review (Every 3 months):**
1. List all custom dimensions
2. Check which have data
3. Check which are used
4. Mark for deletion if unused
5. Archive documentation

**Annual Audit (Every 12 months):**
1. Complete dimensions review
2. Consolidation opportunities
3. Quota forecasting
4. GA4 360 evaluation
5. Update governance policy

### Naming Standards

**All Event-Scoped Dimensions:**
- Format: `[action]_[object]`
- Examples: `button_name`, `form_id`, `video_title`

**All User-Scoped Dimensions:**
- Format: `[attribute]` or `user_[attribute]`
- Examples: `subscription_tier`, `customer_segment`

**All Item-Scoped Dimensions:**
- Format: `item_[attribute]`
- Examples: `item_color`, `item_size`

---

## Quota Tracking Template

Keep this updated to monitor quota usage:

### Event-Scoped Tracking

```
Date: 2024-11-10
Total Created: 35 / 50

High Priority (Keep):
  - form_name (active)
  - button_name (active)
  - error_type (active)
  - page_section (active)
  Subtotal: 4

Medium Priority (Keep):
  - video_title (light use)
  - link_type (monthly analysis)
  Subtotal: 2

Low Priority (Review):
  - test_param (no data)
  - old_tracking (deprecated)
  - experimental_dimension (unused)
  Subtotal: 3

Deletion Candidates: 3
Recommended Action: Delete 3, keep 32

Next Review: 2025-02-10 (Quarterly)
```

### User-Scoped Tracking

```
Date: 2024-11-10
Total Created: 22 / 25

In Use:
  - subscription_tier (critical)
  - customer_segment (critical)
  - account_status (important)
  - company_size (important)
  - industry (important)
  - preferred_language (used)
  - loyalty_status (used)
  Subtotal: 7

Unused/Deprecated:
  - old_tier_system (no data)
  - test_property (testing only)
  Subtotal: 2

Buffer Remaining: 3
Recommendation: Delete old_tier_system, keep others

Next Review: 2025-02-10
```

---

## Summary: Quick Decision Matrix

**Need to create a custom dimension? Use this:**

| Question | Yes | No |
|----------|-----|-----|
| Is it essential for business reporting? | Keep | Consider deletion |
| Is there a built-in dimension for this? | Use built-in | Create custom |
| Is there quota available? | Create | Delete other first |
| Will it have <100 unique values? | Proceed | Rethink approach |
| Is it for event-specific context? | Event scope | Use different scope |
| Is it for all user events? | User scope | Use different scope |
| Is it for products? | Item scope | Use different scope |
| Do we have team consensus? | Create | Get approval first |

