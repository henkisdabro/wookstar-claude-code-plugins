# GA4 BigQuery SQL Query Cookbook

## Helper Functions (Use at Start of Queries)

```sql
-- String parameter extraction
CREATE TEMP FUNCTION GetParam(params ANY TYPE, key STRING)
RETURNS STRING AS (
  (SELECT value.string_value FROM UNNEST(params) WHERE key = key)
);

-- Integer parameter extraction
CREATE TEMP FUNCTION GetParamInt(params ANY TYPE, key STRING)
RETURNS INT64 AS (
  (SELECT value.int_value FROM UNNEST(params) WHERE key = key)
);

-- Float parameter extraction
CREATE TEMP FUNCTION GetParamFloat(params ANY TYPE, key STRING)
RETURNS FLOAT64 AS (
  (SELECT value.float_value FROM UNNEST(params) WHERE key = key)
);

-- Get any parameter type (returns as string)
CREATE TEMP FUNCTION GetParamAny(params ANY TYPE, key STRING)
RETURNS STRING AS (
  (SELECT COALESCE(
    value.string_value,
    CAST(value.int_value AS STRING),
    CAST(value.float_value AS STRING),
    CAST(value.double_value AS STRING)
  ) FROM UNNEST(params) WHERE key = key)
);
```

## Basic Queries

### 1. Daily Active Users

```sql
SELECT
  event_date,
  COUNT(DISTINCT user_pseudo_id) as active_users
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  event_date
ORDER BY
  event_date
```

### 2. Top Pages by Views

```sql
SELECT
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page_location,
  COUNT(*) as page_views,
  COUNT(DISTINCT user_pseudo_id) as unique_users
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'page_view'
GROUP BY
  page_location
ORDER BY
  page_views DESC
LIMIT 20
```

### 3. Session Count by Source/Medium

```sql
SELECT
  traffic_source.source,
  traffic_source.medium,
  COUNT(DISTINCT CONCAT(user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id')
  )) as sessions,
  COUNT(DISTINCT user_pseudo_id) as users
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  traffic_source.source,
  traffic_source.medium
ORDER BY
  sessions DESC
```

## E-commerce Queries

### 4. Revenue by Date

```sql
SELECT
  event_date,
  COUNT(DISTINCT ecommerce.transaction_id) as transactions,
  COUNT(DISTINCT user_pseudo_id) as purchasers,
  SUM(ecommerce.purchase_revenue_in_usd) as revenue,
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

### 5. Top Selling Products

```sql
SELECT
  item.item_name,
  item.item_category,
  SUM(item.quantity) as units_sold,
  SUM(item.item_revenue_in_usd) as total_revenue,
  COUNT(DISTINCT ecommerce.transaction_id) as transactions
FROM
  `project.dataset.events_*`,
  UNNEST(items) as item
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'purchase'
GROUP BY
  item.item_name,
  item.item_category
ORDER BY
  total_revenue DESC
LIMIT 20
```

### 6. Conversion Funnel Analysis

```sql
WITH funnel AS (
  SELECT
    user_pseudo_id,
    MAX(IF(event_name = 'view_item_list', 1, 0)) as viewed_list,
    MAX(IF(event_name = 'view_item', 1, 0)) as viewed_item,
    MAX(IF(event_name = 'add_to_cart', 1, 0)) as added_cart,
    MAX(IF(event_name = 'begin_checkout', 1, 0)) as began_checkout,
    MAX(IF(event_name = 'purchase', 1, 0)) as purchased
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  GROUP BY
    user_pseudo_id
)
SELECT
  SUM(viewed_list) as step1_viewed_list,
  SUM(viewed_item) as step2_viewed_item,
  SUM(added_cart) as step3_added_cart,
  SUM(began_checkout) as step4_began_checkout,
  SUM(purchased) as step5_purchased,
  -- Conversion rates
  ROUND(SUM(viewed_item) / SUM(viewed_list) * 100, 2) as pct_list_to_item,
  ROUND(SUM(added_cart) / SUM(viewed_item) * 100, 2) as pct_item_to_cart,
  ROUND(SUM(began_checkout) / SUM(added_cart) * 100, 2) as pct_cart_to_checkout,
  ROUND(SUM(purchased) / SUM(began_checkout) * 100, 2) as pct_checkout_to_purchase,
  ROUND(SUM(purchased) / SUM(viewed_list) * 100, 2) as overall_conversion_rate
FROM
  funnel
```

### 7. Cart Abandonment Rate

```sql
SELECT
  event_date,
  COUNT(DISTINCT IF(event_name = 'add_to_cart', user_pseudo_id, NULL)) as users_added_cart,
  COUNT(DISTINCT IF(event_name = 'purchase', user_pseudo_id, NULL)) as users_purchased,
  ROUND((1 - COUNT(DISTINCT IF(event_name = 'purchase', user_pseudo_id, NULL)) /
    COUNT(DISTINCT IF(event_name = 'add_to_cart', user_pseudo_id, NULL))) * 100, 2) as abandonment_rate_pct
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name IN ('add_to_cart', 'purchase')
GROUP BY
  event_date
ORDER BY
  event_date
```

## User Behavior Queries

### 8. User Journey (Event Sequence)

```sql
SELECT
  user_pseudo_id,
  ARRAY_AGG(
    STRUCT(
      event_timestamp,
      event_name,
      (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page
    )
    ORDER BY event_timestamp
  ) as journey
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX = '20250115'
  AND user_pseudo_id = 'USER_ID_HERE'
GROUP BY
  user_pseudo_id
```

### 9. Session Duration Distribution

```sql
WITH sessions AS (
  SELECT
    CONCAT(user_pseudo_id, '-',
      (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id')
    ) as session_id,
    MAX(event_timestamp) - MIN(event_timestamp) as session_duration_micros
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  GROUP BY
    session_id
)
SELECT
  CASE
    WHEN session_duration_micros < 10000000 THEN '0-10 sec'
    WHEN session_duration_micros < 30000000 THEN '10-30 sec'
    WHEN session_duration_micros < 60000000 THEN '30-60 sec'
    WHEN session_duration_micros < 180000000 THEN '1-3 min'
    WHEN session_duration_micros < 600000000 THEN '3-10 min'
    ELSE '10+ min'
  END as duration_bucket,
  COUNT(*) as session_count
FROM
  sessions
GROUP BY
  duration_bucket
ORDER BY
  MIN(session_duration_micros)
```

### 10. New vs Returning Users

```sql
WITH first_visits AS (
  SELECT
    user_pseudo_id,
    MIN(event_timestamp) as first_visit_timestamp
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20240101' AND '20250131'
  GROUP BY
    user_pseudo_id
)
SELECT
  event_date,
  COUNT(DISTINCT IF(TIMESTAMP_MICROS(event_timestamp) = TIMESTAMP_MICROS(fv.first_visit_timestamp),
    e.user_pseudo_id, NULL)) as new_users,
  COUNT(DISTINCT IF(TIMESTAMP_MICROS(event_timestamp) > TIMESTAMP_MICROS(fv.first_visit_timestamp),
    e.user_pseudo_id, NULL)) as returning_users
FROM
  `project.dataset.events_*` e
LEFT JOIN
  first_visits fv
ON
  e.user_pseudo_id = fv.user_pseudo_id
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  event_date
ORDER BY
  event_date
```

## Attribution Queries

### 11. First Touch Attribution

```sql
WITH first_touch AS (
  SELECT
    user_pseudo_id,
    ARRAY_AGG(
      STRUCT(
        traffic_source.source,
        traffic_source.medium,
        traffic_source.name as campaign
      )
      ORDER BY event_timestamp LIMIT 1
    )[OFFSET(0)] as first_source
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
    AND traffic_source.source IS NOT NULL
  GROUP BY
    user_pseudo_id
),
purchases AS (
  SELECT
    user_pseudo_id,
    COUNT(DISTINCT ecommerce.transaction_id) as purchases,
    SUM(ecommerce.purchase_revenue_in_usd) as revenue
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
    AND event_name = 'purchase'
  GROUP BY
    user_pseudo_id
)
SELECT
  ft.first_source.source,
  ft.first_source.medium,
  ft.first_source.campaign,
  COUNT(DISTINCT ft.user_pseudo_id) as users,
  SUM(p.purchases) as total_purchases,
  SUM(p.revenue) as total_revenue
FROM
  first_touch ft
LEFT JOIN
  purchases p
ON
  ft.user_pseudo_id = p.user_pseudo_id
GROUP BY
  ft.first_source.source,
  ft.first_source.medium,
  ft.first_source.campaign
ORDER BY
  total_revenue DESC
```

### 12. Last Touch Attribution

```sql
WITH last_touch AS (
  SELECT
    ecommerce.transaction_id,
    ARRAY_AGG(
      STRUCT(
        traffic_source.source,
        traffic_source.medium
      )
      ORDER BY event_timestamp DESC LIMIT 1
    )[OFFSET(0)] as last_source,
    SUM(ecommerce.purchase_revenue_in_usd) as revenue
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
    AND event_name = 'purchase'
  GROUP BY
    ecommerce.transaction_id
)
SELECT
  last_source.source,
  last_source.medium,
  COUNT(DISTINCT transaction_id) as conversions,
  SUM(revenue) as total_revenue
FROM
  last_touch
GROUP BY
  last_source.source,
  last_source.medium
ORDER BY
  total_revenue DESC
```

## Device and Technology

### 13. Device Category Performance

```sql
SELECT
  device.category as device_category,
  COUNT(DISTINCT user_pseudo_id) as users,
  COUNT(DISTINCT CONCAT(user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id')
  )) as sessions,
  COUNTIF(event_name = 'purchase') as purchases,
  SUM(IF(event_name = 'purchase', ecommerce.purchase_revenue_in_usd, 0)) as revenue,
  ROUND(COUNTIF(event_name = 'purchase') / COUNT(DISTINCT CONCAT(user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id')
  )) * 100, 2) as conversion_rate_pct
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  device.category
ORDER BY
  users DESC
```

### 14. Browser and OS Analysis

```sql
SELECT
  device.browser,
  device.operating_system,
  COUNT(DISTINCT user_pseudo_id) as users,
  AVG((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'engagement_time_msec')) / 1000 as avg_engagement_sec
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'user_engagement'
GROUP BY
  device.browser,
  device.operating_system
HAVING
  users > 100
ORDER BY
  users DESC
```

## Cohort and Retention

### 15. Weekly Cohort Retention

```sql
WITH cohorts AS (
  SELECT
    user_pseudo_id,
    FORMAT_DATE('%Y-W%V', PARSE_DATE('%Y%m%d', MIN(event_date))) as cohort_week
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  GROUP BY
    user_pseudo_id
),
activity AS (
  SELECT
    user_pseudo_id,
    FORMAT_DATE('%Y-W%V', PARSE_DATE('%Y%m%d', event_date)) as activity_week
  FROM
    `project.dataset.events_*`
  WHERE
    _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  GROUP BY
    user_pseudo_id,
    activity_week
)
SELECT
  c.cohort_week,
  a.activity_week,
  COUNT(DISTINCT c.user_pseudo_id) as cohort_size,
  COUNT(DISTINCT a.user_pseudo_id) as active_users,
  ROUND(COUNT(DISTINCT a.user_pseudo_id) / COUNT(DISTINCT c.user_pseudo_id) * 100, 2) as retention_pct
FROM
  cohorts c
LEFT JOIN
  activity a
ON
  c.user_pseudo_id = a.user_pseudo_id
GROUP BY
  c.cohort_week,
  a.activity_week
ORDER BY
  c.cohort_week,
  a.activity_week
```

## Custom Dimensions and Parameters

### 16. Query Custom Event Parameters

```sql
SELECT
  event_name,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'custom_parameter') as custom_value,
  COUNT(*) as event_count
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  AND event_name = 'custom_event'
GROUP BY
  event_name,
  custom_value
ORDER BY
  event_count DESC
```

### 17. User Properties Analysis

```sql
SELECT
  (SELECT value.string_value FROM UNNEST(user_properties) WHERE key = 'user_tier') as user_tier,
  COUNT(DISTINCT user_pseudo_id) as users,
  SUM(IF(event_name = 'purchase', ecommerce.purchase_revenue_in_usd, 0)) as total_revenue,
  SUM(IF(event_name = 'purchase', ecommerce.purchase_revenue_in_usd, 0)) /
    COUNT(DISTINCT user_pseudo_id) as revenue_per_user
FROM
  `project.dataset.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  user_tier
ORDER BY
  total_revenue DESC
```

## Performance Tips

1. **Always use _TABLE_SUFFIX filtering** (not event_date)
2. **Filter on clustered columns** (event_name, event_timestamp)
3. **Select only needed columns**
4. **Use LIMIT during development**
5. **Create helper functions** for repeated UNNEST operations
6. **Avoid SELECT *** unless necessary
7. **Use materialized views** for frequently run queries
8. **Monitor query costs** in BigQuery console
