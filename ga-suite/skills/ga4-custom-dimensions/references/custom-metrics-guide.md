# Custom Metrics & Calculated Metrics Complete Guide

## Understanding GA4 Metrics

**Metrics** in GA4 are measurements or counts of user activity. They answer "How much?" or "How many?" questions.

**Built-in GA4 Metrics (Examples):**
- users
- sessions
- events
- pageViews
- revenue
- conversions

**Custom Metrics** extend GA4 with business-specific numerical tracking.

---

## Standard Custom Metrics

### What Are Custom Metrics?

Custom metrics track numerical values associated with events. Unlike custom dimensions (which are categorical), metrics are numbers that aggregate and calculate.

**Use custom metrics for:**
- Quantities (items purchased, users in queue)
- Durations (video watch time, form fill time)
- Ratings (user satisfaction score, product rating)
- Percentages (completion rate, engagement rate)
- Monetary values (order value, customer lifetime value)
- Any numerical KPI

### Custom Metric Implementation

**Step 1: Send Numerical Parameter in Event**

```javascript
// Video completion tracking
gtag('event', 'video_watched', {
  'video_title': 'GA4 Basics',
  'video_duration': 1200,      // seconds - METRIC
  'minutes_watched': 18,        // METRIC
  'completion_percentage': 85   // METRIC
});

// E-commerce order tracking
gtag('event', 'purchase', {
  'transaction_id': 'TXN_123',
  'items': [...]
  // Note: 'value' parameter in purchase is auto-metric
  'avg_item_price': 45.50,     // METRIC
  'discount_amount': 15.00     // METRIC
});

// Form completion tracking
gtag('event', 'form_submit', {
  'form_name': 'contact',
  'form_fields_filled': 8,     // METRIC
  'time_to_submit': 120,       // seconds - METRIC
  'form_abandonment_rate': 0   // METRIC
});
```

**Important:** Send as numerical values, not strings.

```javascript
// CORRECT
'duration': 120        // Number

// WRONG
'duration': '120'      // String - will be treated as dimension
'duration': '120s'     // String - invalid
```

### Step 2: Verify in DebugView

1. GA4 Admin → DebugView
2. Trigger event with metric parameter
3. Click event in left panel
4. See parameter in event details
5. Confirm value is numerical

**DebugView Example:**

```
Event: video_watched

Parameters:
  - video_title: "GA4 Basics"
  - video_duration: 1200
  - minutes_watched: 18
  - completion_percentage: 85
```

### Step 3: Register Custom Metric

1. Admin → Data Display → Custom Definitions
2. Click **"Create Custom Metric"** button
3. Fill the form:

| Field | Entry | Example |
|-------|-------|---------|
| Metric Name | Display name | "Video Duration (seconds)" |
| Type | Select "Standard" | Standard |
| Measurement Unit | (Optional) unit for reporting | "seconds" |
| Event Parameter | Parameter name | "video_duration" |
| Description | What it tracks | "Length of video watched in seconds" |

4. Click **Save**
5. Wait 24-48 hours for data population

### Step 4: Use in Reports

After 24-48 hours:

1. Analytics → Reports → Explorations
2. Create Free-form Exploration
3. Drag dimensions and metrics to canvas
4. Add "Video Duration (seconds)" metric
5. Analyze average, sum, or other aggregations

**Example Report:**

```
Video Title              Average Duration  Total Views
====================================================
GA4 Basics              900 seconds       250
Advanced Analytics      1800 seconds      180
Debugging Guide         450 seconds       320
```

---

## Calculated Metrics

### What Are Calculated Metrics?

Calculated metrics are derived metrics created from mathematical formulas using existing metrics. They don't require new event implementation - only calculation.

**Use calculated metrics for:**
- Ratios (revenue per user, conversion rate)
- Differences (abandonment = views - purchases)
- Complex formulas (LTV, efficiency scores)
- Normalized metrics (revenue per session)

### Calculated Metric Examples

**Example 1: Revenue Per User**

```
Name: Revenue per User
Formula: revenue / users
Result: Shows how much revenue each user generates
```

**Example 2: Conversion Rate**

```
Name: Conversion Rate %
Formula: (conversions / sessions) * 100
Result: Percentage of sessions with conversion
```

**Example 3: Bounce Rate (Inverse)**

```
Name: Engagement Rate
Formula: (engagedSessions / sessions) * 100
Result: Percentage of engaged sessions
```

**Example 4: Add-to-Cart Rate**

```
Name: Add to Cart Rate
Formula: add_to_cart / view_item
Result: How many cart adds vs product views
```

**Example 5: Revenue Per Customer**

```
Name: Average Order Value
Formula: totalRevenue / transactions
Result: Average amount per transaction
```

### Available Metrics in Formulas

Standard GA4 metrics available for calculated metrics:

**User Metrics:**
- `users` - Total unique users
- `newUsers` - First-time users
- `activeUsers` - Users with engagement/conversion

**Session Metrics:**
- `sessions` - Total sessions
- `sessionsPerUser` - Average sessions per user
- `engagementRate` - Engaged sessions percentage

**Event Metrics:**
- `eventCount` - Total events
- `engagements` - Engaged sessions
- `engagementDuration` - Total engagement time seconds

**Conversion Metrics:**
- `conversions` - Key event count
- `conversionValue` - Total key event value

**Ecommerce Metrics:**
- `purchaseRevenue` - Total revenue
- `transactions` - Number of purchases
- `itemsViewed` - Total products viewed
- `itemsPurchased` - Total items sold

**Custom Metrics:**
- Any custom metric created

### Calculated Metric Formula Syntax

**Basic Operators:**

```
Addition:        metric1 + metric2
Subtraction:     metric1 - metric2
Multiplication:  metric1 * metric2
Division:        metric1 / metric2
Parentheses:     (metric1 + metric2) / metric3
```

**Example Formulas:**

```
// Simple division
revenue / users

// Multiplication
revenue * 100

// Complex formula with parentheses
(conversions / sessions) * 100

// Multi-step calculation
(purchaseRevenue - cost) / transactions

// Using custom metrics
custom_metric_1 / custom_metric_2
```

### Creating Calculated Metric: Step-by-Step

**Scenario: Create "Revenue Per Session" Metric**

1. Admin → Data Display → Custom Definitions

2. Click **"Create Custom Metric"** button

3. Fill form:

| Field | Entry |
|-------|-------|
| Metric Name | "Revenue per Session" |
| Type | Select **Calculated** |
| Formula | `revenue / sessions` |

4. Click **Save**

5. **Calculated metrics populate immediately** (no 24-48 hour wait)

6. Use in reports right away

### Using Calculated Metric in Reports

1. Analytics → Reports → Explorations
2. Create Free-form Exploration
3. Add dimensions
4. Add metrics (including new calculated metric)
5. View results

**Example Report Using "Revenue per Session":**

```
Traffic Source          Revenue per Session
============================================
google / organic        $15.50
direct / (none)         $8.20
facebook / referral     $12.00
```

---

## Metric Type Comparison

### Standard Metrics vs Calculated Metrics

| Aspect | Standard | Calculated |
|--------|----------|-----------|
| Implementation | Requires event code | No code needed |
| Delay | 24-48 hours | Immediate |
| Data Source | Event parameters | Existing metrics |
| Updates | As new events arrive | Real-time calculation |
| Example | `video_duration` | `revenue / users` |
| Quota | 50 per property | 5 per property |

### When to Use Each Type

**Use Standard Custom Metric when:**
- Tracking new numerical data
- Need to capture value at event time
- Value must be sent from client/server

**Use Calculated Metric when:**
- Combining existing metrics
- Want ratio or percentage
- Mathematical derivation from existing data

---

## Practical Custom Metrics Examples

### Example 1: Video Analytics Metrics

**Standard Custom Metrics:**

```javascript
gtag('event', 'video_watched', {
  'video_title': 'GA4 101',
  'video_duration_seconds': 1200,      // Custom metric
  'minutes_watched': 18,                // Custom metric
  'completion_percentage': 85           // Custom metric
});
```

**Admin Registration:**
1. Metric: "Video Duration (seconds)" = video_duration_seconds
2. Metric: "Minutes Watched" = minutes_watched
3. Metric: "Completion %" = completion_percentage

**Calculated Metrics:**

```
Name: Video Watch Rate
Formula: (minutes_watched / video_duration_seconds) * 100
Result: Percentage of video watched
```

### Example 2: SaaS Trial Conversion Metrics

**Standard Custom Metrics:**

```javascript
gtag('event', 'trial_signup', {
  'trial_length_days': 14,              // Custom metric
  'users_on_team': 3,                   // Custom metric
  'data_imported_count': 5              // Custom metric
});

gtag('event', 'trial_to_paid', {
  'days_on_trial': 7,                   // Custom metric
  'upsell_offer_price': 99.99           // Custom metric
});
```

**Admin Registration:**
- Metric: "Trial Length (days)"
- Metric: "Team Size"
- Metric: "Data Imported"
- Metric: "Trial Duration (days)"
- Metric: "Offer Price ($)"

**Calculated Metrics:**

```
Name: Trial to Paid Rate
Formula: trial_to_paid / trial_signup

Name: Average Trial Length
Formula: trial_length_days / trial_signup

Name: Revenue per Trial
Formula: (upsell_offer_price * trial_to_paid) / trial_signup
```

### Example 3: E-commerce Metrics

**Standard Custom Metrics:**

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_123',
  'value': 299.99,
  'num_items': 3,                       // Custom metric
  'discount_amount': 30.00,             // Custom metric
  'profit_margin': 0.40                 // Custom metric
});
```

**Admin Registration:**
- Metric: "Items per Order"
- Metric: "Discount Amount ($)"
- Metric: "Profit Margin %"

**Calculated Metrics:**

```
Name: Average Item Price
Formula: revenue / num_items

Name: Revenue After Discount
Formula: revenue - discount_amount

Name: Gross Profit
Formula: revenue * profit_margin
```

---

## Metric Limits & Quotas

### Standard GA4 Property Limits

- **Standard Custom Metrics:** 50 maximum
- **Calculated Metrics:** 5 maximum
- **Total available:** 50 standard + 5 calculated

### GA4 360 Property Limits

- **Standard Custom Metrics:** 125 maximum
- **Calculated Metrics:** 50 maximum
- **Total available:** 125 standard + 50 calculated

### Quota Management Strategy

**Prioritize metrics by importance:**

1. **Essential** (create immediately)
   - Key business KPIs
   - Required for dashboards
   - Regulatory/compliance metrics

2. **Important** (create if quota allows)
   - Nice-to-have analyses
   - Supporting metrics
   - Team requested metrics

3. **Nice-to-have** (create last)
   - Exploratory metrics
   - Lower priority analysis

---

## Best Practices for Custom Metrics

### Naming Conventions

**Good names:**
- "Video Duration (seconds)"
- "Form Fill Time (seconds)"
- "Revenue per Session"
- "Customer Lifetime Value ($)"
- "Engagement Score"

**Poor names:**
- "metric1"
- "data"
- "value"
- "custom"

### Implementation Best Practices

**DO:**
- ✅ Send as numbers, not strings
- ✅ Use consistent units (always seconds, always dollars)
- ✅ Document what each metric represents
- ✅ Plan metrics before implementation
- ✅ Register only metrics actually used
- ✅ Include unit in metric name if applicable

**DON'T:**
- ❌ Send metric as string ("120" instead of 120)
- ❌ Mix units (seconds in one event, minutes in another)
- ❌ Create too many similar metrics
- ❌ Register metrics without team agreement
- ❌ Use high-cardinality metrics (too many values)

### Metric Value Ranges

**Recommended ranges:**

- Quantities: 0-1000000
- Percentages: 0-100
- Monetary: -999999 to 999999
- Time (seconds): 0-86400 (24 hours)
- Ratings: 0-10 or 1-5

**Avoid:**
- Negative values (usually)
- Extreme outliers (data quality issues)
- Non-numerical data (use dimensions instead)

---

## Troubleshooting Custom Metrics

### Metric Doesn't Appear in Reports After 48 Hours

**Troubleshooting:**

1. **Verify code sends numerical value**
   - Check DebugView
   - Value must be a number, not string
   - Example: 120 (not "120")

2. **Check metric name case**
   - DebugView shows exact case
   - Match exactly when registering

3. **Confirm quota not exceeded**
   - Standard metrics: Under 50?
   - Calculated metrics: Under 5?
   - Delete unused metrics if over quota

4. **Check minimum traffic threshold**
   - Events with metric need to fire
   - If no events: Metric won't populate
   - Verify code deployed and live

### Metric Shows Wrong Values

**Likely cause:** Parameter values not numbers

```javascript
// WRONG - values are strings
gtag('event', 'video_watched', {
  'duration': '120'        // String
});

// CORRECT - values are numbers
gtag('event', 'video_watched', {
  'duration': 120          // Number
});
```

### Calculated Metric Formula Error

**Error message:** "Invalid formula syntax"

**Check:**
- Metric names spelled correctly
- Formula uses `/`, `*`, `+`, `-` only
- Parentheses balanced
- No special characters

```javascript
// WRONG
(revenue / users) + %     // % not allowed

// CORRECT
(revenue / users) * 100   // Use * 100 for percentage
```

---

## Advanced: Multi-Step Metrics

### Chain Calculations

Create multiple calculated metrics that build on each other:

**Step 1: Create basic metrics**
- revenue / sessions = "Revenue per Session"

**Step 2: Create metrics using other calculated metrics**
- revenue_per_session * users = "Revenue Per User"

**Metric Dependency Example:**

```
Step 1: Sessions with Purchase = purchase_events (standard metric)

Step 2: Purchase Rate = purchase_events / sessions (calculated)

Step 3: Revenue Per Converting Session =
        revenue / purchase_events (calculated)

Step 4: Revenue Per All Sessions =
        revenue / sessions (calculated)
```

### Using Custom Metrics in Audiences

Custom metrics can be used in audience conditions (GA4 360 only):

```
Audience: "High-Value Customers"
Condition: customer_lifetime_value > 1000 (custom metric)
```

---

## Metric Comparison Reference

### All Available Metric Types

| Metric Type | Created How | Updated | Quota |
|-------------|-----------|---------|-------|
| Built-in | GA4 default | Real-time | N/A |
| Standard Custom | Event code | After 24-48hrs | 50 |
| Calculated | Formula | Real-time | 5 |

### Summary Table

| Scenario | Use This | Why |
|----------|----------|-----|
| Tracking video duration | Standard Custom Metric | Requires code implementation |
| Calculating revenue/user | Calculated Metric | Derive from existing metrics |
| Counting form submissions | Built-in (conversions) | Already exists |
| Measuring engagement score | Calculated Metric | Formula from user_engagement |
| Tracking items in cart | Standard Custom Metric | New event parameter needed |

