---
name: ga4-reporting
description: Comprehensive guide to GA4 standard reports, Explorations, and data analysis including report customization, exploration types, and data interpretation. Use when analyzing GA4 data, creating custom reports, working with Explorations (Funnel, Path, Cohort), building segments, or extracting insights. Covers report types, exploration techniques, custom dimensions in reports, and analysis patterns.
---

# GA4 Reporting and Data Analysis

## Overview

GA4 provides standard reports for common metrics and Explorations for advanced analysis, segmentation, and custom reporting.

## When to Use This Skill

Invoke this skill when:

- Analyzing website or app performance in GA4
- Creating custom reports and explorations
- Building funnel analysis for conversion paths
- Analyzing user paths and behavior flow
- Creating cohort analyses for retention
- Segmenting users for comparison
- Extracting insights from GA4 data
- Building custom exploration reports
- Analyzing e-commerce performance
- Creating user lifetime value reports
- Working with custom dimensions in reports
- Analyzing traffic sources and campaigns
- Building attribution reports
- Analyzing audience overlap

## Core Capabilities

### Standard Reports

**Path:** Reports (left navigation)

**Report Categories:**

1. **Realtime**
   - Active users (last 30 minutes)
   - Real-time events
   - Current conversions
   - Traffic sources

2. **Life Cycle Reports:**

   **Acquisition:**
   - User acquisition (first touch)
   - Traffic acquisition (session level)
   - Channels, sources, campaigns

   **Engagement:**
   - Events (all event activity)
   - Conversions (key events)
   - Pages and screens
   - Landing pages

   **Monetization:**
   - E-commerce purchases
   - Publisher ads (AdSense)
   - In-app purchases
   - Revenue metrics

   **Retention:**
   - User engagement over time
   - Cohort analysis
   - User retention
   - Lifetime value

3. **User Reports:**

   **Demographics:**
   - Age, gender (requires Google Signals)
   - Country, city, language

   **Tech:**
   - Browser, device, OS
   - Screen resolution
   - App version

**Customizing Standard Reports:**
- Add secondary dimensions
- Apply filters
- Change date range
- Compare date periods
- Download as CSV/PDF

### Explorations

**Path:** Explore (left navigation)

**Exploration Types:**

#### 1. Free Form Exploration

**Purpose:** Flexible custom reports with drag-and-drop interface

**Key Components:**
- **Dimensions:** User attributes (country, device, etc.)
- **Metrics:** Quantitative measures (users, sessions, revenue)
- **Rows:** Primary dimension
- **Columns:** Secondary dimension (optional)
- **Values:** Metrics to display
- **Filters:** Limit data shown
- **Segments:** Compare user groups

**Example Use:**
- Create custom traffic source report
- Analyze product performance
- Build custom conversion report

#### 2. Funnel Exploration

**Purpose:** Analyze conversion funnels and drop-off points

**Setup:**
1. **Add steps:**
   - Step 1: page_view (homepage)
   - Step 2: view_item
   - Step 3: add_to_cart
   - Step 4: begin_checkout
   - Step 5: purchase

2. **Configure:**
   - **Funnel type:** Closed (must complete steps in order) or Open
   - **Step conditions:** Event + parameter filters

3. **Analyze:**
   - Completion rate for each step
   - Drop-off percentage
   - Elapsed time between steps

**Example Insights:**
- 60% drop-off from cart to checkout
- Average 2 minutes from view to purchase
- Mobile users drop off more at checkout

#### 3. Path Exploration

**Purpose:** Visualize user journeys and navigation paths

**Types:**
- **Starting point:** Paths beginning with specific event/page
- **Ending point:** Paths ending with specific event/page
- **Path exploration:** See all paths

**Setup:**
1. Choose starting or ending point
2. Select event or page
3. View visualization:
   - Node size = traffic volume
   - Arrows = path direction
   - Numbers = user count

**Example Insights:**
- Most common path to checkout
- Where users go after homepage
- Navigation patterns before purchase

#### 4. Segment Overlap

**Purpose:** Compare and analyze audience overlap

**Setup:**
1. Add 2-3 segments
2. View Venn diagram showing:
   - Unique users in each segment
   - Overlapping users
   - Total reach

**Example:**
- Compare "Purchasers" vs "Newsletter Subscribers"
- Find overlap between mobile and desktop users
- Analyze "High Value" vs "Frequent Visitors"

#### 5. Cohort Exploration

**Purpose:** Analyze user retention over time

**Setup:**
1. **Cohort:** User grouping (by acquisition date)
2. **Cohort granularity:** Daily, weekly, monthly
3. **Metrics:** Sessions, revenue, events per user
4. **Time period:** Days/weeks/months since cohort start

**Example Insights:**
- Week 1 retention: 40%
- Week 4 retention: 15%
- Revenue per cohort over 8 weeks

#### 6. User Exploration

**Purpose:** Analyze individual user behavior

**Setup:**
1. Add user identifier (user_pseudo_id or user_id)
2. View user details:
   - All events fired
   - Event parameters
   - Device, location
   - Session timeline

**Use Cases:**
- Debug specific user issues
- Understand power user behavior
- Investigate unusual patterns

#### 7. User Lifetime

**Purpose:** Analyze user value over lifetime

**Setup:**
1. **Dimensions:** Acquisition source, campaign, etc.
2. **Metrics:** Lifetime value, revenue, sessions
3. **Time period:** Lifetime duration

**Example Insights:**
- Organic users: $125 LTV
- Paid users: $85 LTV
- Average lifetime: 180 days

### Segments

**Creating Segments:**

**Path:** Explorations → Create new segment

**Segment Types:**
- **User segment:** Users matching conditions
- **Session segment:** Sessions matching conditions
- **Event segment:** Events matching conditions

**Conditions:**
- Demographics (country, age, gender)
- Technology (device, browser)
- Acquisition (source, medium, campaign)
- Behavior (events, conversions)
- E-commerce (purchasers, revenue)
- Custom dimensions/metrics

**Example Segments:**

**High-Value Purchasers:**
```
Users where:
- totalRevenue > 500
- purchaseCount >= 3
```

**Mobile Converters:**
```
Sessions where:
- deviceCategory = mobile
- keyEvent: purchase
```

**Engaged Users:**
```
Users where:
- sessionCount >= 5
- avgEngagementTime > 120 seconds
```

### Comparisons

**Purpose:** Compare metrics across dimensions or segments

**Creating Comparison:**
1. In report, click **Add comparison**
2. Choose dimension or segment
3. Select values to compare

**Example:**
- Compare desktop vs mobile
- Compare US vs UK traffic
- Compare this month vs last month

**Visualization:**
- Side-by-side metrics
- Color-coded lines in charts
- Percentage differences

### Report Customization

**Adding Dimensions:**
- Click "+" in dimension row
- Select from available dimensions
- Custom dimensions appear if configured

**Changing Date Range:**
- Top-right date selector
- Preset ranges (Last 7 days, Last 30 days)
- Custom ranges
- Date comparisons

**Applying Filters:**
- Click "Add filter"
- Choose dimension
- Set condition (equals, contains, etc.)
- Enter value

**Saving Reports:**
- Explorations auto-save
- Share link to Exploration with team
- Export as PDF or Google Sheets

### Key Metrics

**User Metrics:**
- **Total Users:** All users in period
- **New Users:** First-time visitors
- **Active Users:** Users with engagement
- **DAU/WAU/MAU:** Daily/Weekly/Monthly active users

**Engagement Metrics:**
- **Sessions:** Count of sessions
- **Average Engagement Time:** Time actively engaged
- **Engagement Rate:** % of engaged sessions
- **Events per Session:** Average event count

**Conversion Metrics:**
- **Conversions:** Key event count
- **Conversion Rate:** % of sessions with conversion
- **Total Revenue:** Sum of revenue
- **ARPPU:** Average revenue per paying user

**E-commerce Metrics:**
- **Purchase Revenue:** Revenue from purchases
- **Transactions:** Purchase event count
- **Average Purchase Revenue:** Revenue per transaction
- **Items Viewed/Added/Purchased:** Counts

### Attribution

**Path:** Advertising → Attribution

**Models:**
- **Data-driven:** ML-based credit assignment
- **Last click:** Full credit to last interaction
- **First click:** Full credit to first interaction
- **Linear:** Equal credit to all touchpoints
- **Time decay:** More credit to recent interactions
- **Position-based:** More credit to first and last

**Comparing Models:**
- View conversions by channel under different models
- Understand impact of attribution choice
- Optimize marketing spend

### Analysis Tips

**Finding Insights:**

1. **Start broad:**
   - Review standard reports
   - Identify anomalies or trends

2. **Drill down:**
   - Add secondary dimensions
   - Apply filters for specific segments

3. **Use Explorations:**
   - Build funnel for conversion paths
   - Create cohorts for retention analysis
   - Segment users for comparison

4. **Export and share:**
   - Download reports
   - Share Exploration links
   - Schedule email reports (Looker Studio)

**Common Analyses:**

**Conversion Funnel:**
- Identify drop-off points
- Optimize low-performing steps
- A/B test improvements

**Traffic Source Performance:**
- Which sources drive most conversions?
- Cost per acquisition by channel
- ROI by campaign

**User Retention:**
- What % return after first visit?
- How long do users remain active?
- Which acquisition sources have best retention?

**Product Performance:**
- Which products viewed most?
- What's conversion rate by product?
- Which products have highest revenue?

## Integration with Other Skills

- **ga4-setup** - Initial property setup for reporting
- **ga4-custom-dimensions** - Using custom dimensions in reports
- **ga4-audiences** - Building audiences from analysis
- **ga4-bigquery** - Advanced analysis beyond GA4 UI
- **ga4-data-management** - Data retention and filters
- **ga4-user-tracking** - User ID in reports and segments

## References

- **references/standard-reports-guide.md** - Complete standard reports reference
- **references/explorations-complete.md** - All exploration types with examples
- **references/segments-guide.md** - Creating and using segments
- **references/analysis-patterns.md** - Common analysis workflows

## Quick Reference

**Exploration Types:**
- Free Form: Custom flexible reports
- Funnel: Conversion path analysis
- Path: User journey visualization
- Segment Overlap: Audience comparison
- Cohort: Retention analysis
- User: Individual user behavior
- User Lifetime: LTV analysis

**Segment Scopes:**
- User: Users matching conditions
- Session: Sessions matching conditions
- Event: Events matching conditions

**Report Limits:**
- Explorations: 200 per property
- Shared Explorations: 50 per user
- Segments: 100 per Exploration
