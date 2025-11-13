---
name: ga4-bigquery
description: Complete guide to GA4 BigQuery export including setup, schema documentation, SQL query patterns, and data analysis. Use when exporting GA4 data to BigQuery, writing SQL queries for GA4 data, analyzing event-level data, working with nested/repeated fields (UNNEST), or building custom reports from raw data. Covers BigQuery linking, events_* tables, SQL patterns, and performance optimization.
---

# GA4 BigQuery Export and Analysis

## Overview

GA4 BigQuery export provides raw, event-level data access for advanced analysis, custom reporting, machine learning, and long-term data warehousing.

## When to Use This Skill

Invoke this skill when:

- Exporting GA4 raw data to BigQuery
- Writing SQL queries for GA4 event data
- Analyzing unsampled event-level data
- Working with nested/repeated fields using UNNEST
- Building custom reports beyond GA4 UI limits
- Creating attribution models with raw data
- Performing user journey analysis across all events
- Integrating GA4 data with other data sources
- Building machine learning models on GA4 data
- Analyzing historical data beyond GA4 retention limits
- Optimizing BigQuery query performance
- Working with events_* table schema
- Extracting event parameters from nested structures

## Core Capabilities

### BigQuery Export Setup

**Requirements:**
- GA4 property (standard or 360)
- Google Cloud project
- BigQuery API enabled
- Appropriate permissions

**Setup Steps:**

1. **Create Google Cloud Project:**
   - Go to console.cloud.google.com
   - Create new project or select existing
   - Enable BigQuery API

2. **Link GA4 to BigQuery:**
   - GA4 Admin → Product Links → BigQuery Links
   - Click "Link"
   - Choose Google Cloud project
   - Select dataset location (US, EU, etc.)
   - Configure export:
     - **Daily:** Complete export once per day (~9AM property timezone)
     - **Streaming:** Real-time export (360 only)
   - Click "Next"
   - Confirm setup

**Export Options:**
- **Daily Export:** Free for standard GA4, once per day
- **Streaming Export:** GA4 360 only, near real-time
- **Include Advertising IDs:** Optional, for Ads integration

**Data Availability:**
- Daily tables: ~24 hours after day ends
- Intraday tables: ~3 updates per day
- Streaming: Minutes after event collection (360)

### BigQuery Table Structure

**Table Naming:**
- `project.dataset.events_YYYYMMDD` - Daily export
- `project.dataset.events_intraday_YYYYMMDD` - Intraday (partial day)
- `project.dataset.events_*` - Wildcard for all dates

**Key Schema Fields:**

**Event Fields:**
- `event_date`: YYYYMMDD format (STRING)
- `event_timestamp`: Microseconds since epoch (INTEGER)
- `event_name`: Event name (STRING)
- `event_params`: Event parameters (RECORD, REPEATED)
- `event_value_in_usd`: Event value in USD (FLOAT)

**User Fields:**
- `user_id`: User ID if set (STRING)
- `user_pseudo_id`: Anonymous user ID (STRING)
- `user_properties`: User properties (RECORD, REPEATED)
- `user_first_touch_timestamp`: First visit timestamp (INTEGER)

**Device Fields:**
- `device.category`: desktop, mobile, tablet
- `device.operating_system`: Windows, iOS, Android
- `device.browser`: Chrome, Safari, etc.

**Geo Fields:**
- `geo.country`: Country name
- `geo.region`: State/region
- `geo.city`: City name

**Traffic Source Fields:**
- `traffic_source.source`: Source (google, direct)
- `traffic_source.medium`: Medium (organic, cpc)
- `traffic_source.name`: Campaign name

**E-commerce Fields:**
- `ecommerce.transaction_id`: Transaction ID (STRING)
- `ecommerce.purchase_revenue_in_usd`: Purchase revenue (FLOAT)
- `items`: Items array (RECORD, REPEATED)

### Basic SQL Query Patterns

#### Query 1: Event Count by Name

```sql
SELECT
  event_name,
  COUNT(*) as event_count
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  event_name
ORDER BY
  event_count DESC
```

#### Query 2: Extract Event Parameters

```sql
SELECT
  event_date,
  event_name,
  user_pseudo_id,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page_location,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title') as page_title
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'page_view'
LIMIT 1000
```

#### Query 3: Purchase Analysis

```sql
SELECT
  event_date,
  COUNT(DISTINCT user_pseudo_id) as purchasers,
  COUNT(DISTINCT ecommerce.transaction_id) as transactions,
  SUM(ecommerce.purchase_revenue_in_usd) as total_revenue,
  AVG(ecommerce.purchase_revenue_in_usd) as avg_order_value
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'purchase'
  AND ecommerce.transaction_id IS NOT NULL
GROUP BY
  event_date
ORDER BY
  event_date
```

#### Query 4: UNNEST Items Array

```sql
SELECT
  event_date,
  item.item_name,
  item.item_category,
  SUM(item.quantity) as total_quantity,
  SUM(item.item_revenue_in_usd) as total_revenue
FROM
  `project.dataset.events_*`,
  UNNEST(items) as item
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'purchase'
GROUP BY
  event_date,
  item.item_name,
  item.item_category
ORDER BY
  total_revenue DESC
```

### Advanced Query Patterns

#### User Journey Analysis

```sql
WITH user_events AS (
  SELECT
    user_pseudo_id,
    event_timestamp,
    event_name,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page_location
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX = '20250115'
)
SELECT
  user_pseudo_id,
  ARRAY_AGG(
    STRUCT(event_name, page_location, event_timestamp)
    ORDER BY event_timestamp
  ) as event_sequence
FROM
  user_events
GROUP BY
  user_pseudo_id
LIMIT 100
```

#### Session Attribution

```sql
SELECT
  event_date,
  traffic_source.source,
  traffic_source.medium,
  traffic_source.name as campaign,
  COUNT(DISTINCT user_pseudo_id) as users,
  COUNT(DISTINCT CONCAT(user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id'))) as sessions
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  event_date,
  traffic_source.source,
  traffic_source.medium,
  traffic_source.name
ORDER BY
  sessions DESC
```

#### Helper Functions

```sql
-- Create reusable functions for parameter extraction
CREATE TEMP FUNCTION GetParamString(params ANY TYPE, target_key STRING)
RETURNS STRING
AS (
  (SELECT value.string_value FROM UNNEST(params) WHERE key = target_key)
);

CREATE TEMP FUNCTION GetParamInt(params ANY TYPE, target_key STRING)
RETURNS INT64
AS (
  (SELECT value.int_value FROM UNNEST(params) WHERE key = target_key)
);

-- Use in query
SELECT
  event_date,
  GetParamString(event_params, 'page_location') as page_location,
  GetParamInt(event_params, 'engagement_time_msec') as engagement_time
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
```

### Query Optimization

**Best Practices:**

1. **Use _TABLE_SUFFIX Filtering:**
```sql
WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
```
NOT:
```sql
WHERE event_date BETWEEN '20250101' AND '20250131'
```

2. **Filter on Clustered Columns:**
GA4 tables clustered by `event_name` and `event_timestamp`:
```sql
WHERE event_name IN ('page_view', 'purchase')
```

3. **Select Specific Columns:**
```sql
SELECT event_name, user_pseudo_id, event_timestamp
```
NOT:
```sql
SELECT *
```

4. **Limit UNNEST Operations:**
```sql
-- Good: inline UNNEST
(SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location')

-- Avoid: full UNNEST in FROM
FROM table, UNNEST(event_params) as param
WHERE param.key = 'page_location'
```

5. **Use LIMIT During Development:**
```sql
LIMIT 1000  -- Test query first
```

### Cost Management

**BigQuery Pricing:**
- **Storage:** ~$0.02/GB/month
- **Queries:** ~$5/TB scanned
- **Streaming inserts:** ~$0.05/GB (360 only)

**Reducing Costs:**
- Partition by date using _TABLE_SUFFIX
- Select only needed columns
- Use LIMIT for testing
- Create materialized views for frequent queries
- Set up cost alerts in Google Cloud

**Free Tier:**
- 10 GB storage free/month
- 1 TB queries free/month

### Data Retention

**GA4 Export Retention:**
- Standard GA4: 2 months or 14 months (Admin setting)
- BigQuery: Unlimited (until manually deleted)
- Set table expiration if needed (optional)

**Setting Expiration:**
```sql
ALTER TABLE `project.dataset.events_20250101`
SET OPTIONS (
  expiration_timestamp=TIMESTAMP "2026-01-01 00:00:00 UTC"
)
```

### Common Use Cases

**1. Unsampled Reporting:**
- GA4 UI may sample large datasets
- BigQuery = full, unsampled data
- Use for accurate reporting

**2. Custom Attribution:**
- Access full user journey
- Build custom attribution models
- Credit touchpoints as needed

**3. Data Integration:**
- Join GA4 with CRM data
- Combine with product catalog
- Enrich with external sources

**4. Machine Learning:**
- Export to ML tools
- Predict churn, LTV, conversions
- Train custom models

**5. Long-term Analysis:**
- Historical analysis beyond GA4 limits
- Year-over-year comparisons
- Trend analysis

## Integration with Other Skills

- **ga4-setup** - Initial property setup before BigQuery export
- **ga4-recommended-events** - Event structure in BigQuery tables
- **ga4-custom-events** - Custom event parameters in BigQuery
- **ga4-custom-dimensions** - Custom dimensions in event_params
- **ga4-reporting** - Comparing BigQuery vs GA4 UI reports
- **ga4-measurement-protocol** - Server-side events in BigQuery

## References

- **references/bigquery-setup-complete.md** - Step-by-step BigQuery linking
- **references/schema-reference.md** - Complete table schema documentation
- **references/sql-patterns.md** - Common SQL query patterns and examples
- **references/optimization-guide.md** - Performance and cost optimization

## Quick Reference

**Table Names:**
- Daily: `events_YYYYMMDD`
- Intraday: `events_intraday_YYYYMMDD`
- Wildcard: `events_*`

**Filter by Date:**
```sql
WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
```

**Extract Parameter:**
```sql
(SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'param_name')
```

**UNNEST Items:**
```sql
FROM table, UNNEST(items) as item
```

**Costs:**
- Storage: $0.02/GB/month
- Queries: $5/TB scanned
