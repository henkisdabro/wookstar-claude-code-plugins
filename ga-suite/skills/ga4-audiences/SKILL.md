---
name: ga4-audiences
description: Expert guidance for creating and managing audiences and segments in GA4 for analysis, remarketing, and personalization. Use when building user segments, creating remarketing audiences, setting up Google Ads audiences, working with audience conditions, or analyzing user cohorts. Covers predefined audiences, custom audience creation, audience triggers, minimum sizes, and audience export.
---

# GA4 Audiences and Segmentation

## Overview

Audiences in GA4 allow creation of user segments for analysis, remarketing, and personalization based on dimensions, metrics, and events.

## When to Use This Skill

Invoke this skill when:

- Creating custom audiences for remarketing campaigns
- Building user segments for analysis
- Setting up Google Ads audiences for targeting
- Defining audience conditions based on user behavior
- Creating purchase audiences for ROAS tracking
- Building engagement-based audiences
- Setting up audience triggers for real-time actions
- Exporting audiences to Google Ads or DV360
- Analyzing user cohorts and segments
- Creating lookalike audiences
- Working with predictive audiences (purchase/churn probability)
- Segmenting users by custom dimensions or parameters

## Core Capabilities

### Accessing Audiences

**Path:** Admin → Audiences (under Property column)

**Key Sections:**
- **Audience List:** All created audiences
- **Audience Details:** Membership counts, conditions
- **Create New:** Build custom audiences

### Predefined Audiences

GA4 includes template audiences:

1. **Purchasers** - Users who completed purchase event (last 30 days)
2. **All Users** - All users in selected timeframe
3. **Recent Users** - Users active in last 7 days
4. **New Users** - First-time visitors
5. **Returning Users** - Repeat visitors

**Activating Predefined Audiences:**
1. Click "Create Audience"
2. Select suggested template
3. Customize conditions if needed
4. Save audience

### Creating Custom Audiences

**Steps:**

1. **Admin → Audiences → New Audience**
2. **Choose method:**
   - Start from scratch
   - Use suggested audience as template
   - Create predictive audience

3. **Configure Audience:**
   - **Audience name:** Descriptive name (e.g., "High-Value Shoppers")
   - **Description:** Optional description
   - **Membership duration:** Days user stays in audience (1-540 days)

4. **Add Conditions:**
   - Dimension/metric filters
   - Event-based conditions
   - Sequence conditions

5. **Preview Audience Size**
6. **Save Audience**

### Audience Conditions

**Dimension Filters:**

- **User Scope:** city, country, device_category, platform
- **Event Scope:** event_name, page_location, item_id
- **Custom Dimensions:** Any custom dimensions configured

**Example:** `country == "United States" AND device_category == "mobile"`

**Metric Filters:**

- **Event Count:** Total events
- **Session Count:** Total sessions
- **Revenue:** Total revenue
- **Engagement Time:** Total engagement duration

**Example:** `totalRevenue > 100 AND sessionCount >= 3`

**Event Conditions:**

**Include users who:**
- Have triggered specific event
- Have NOT triggered event
- Triggered event with specific parameters

**Example:** Users who triggered `purchase` with `value > 50`

**Sequence Conditions:**

Build audiences based on event order:

**Example:** Users who:
1. Viewed product (`view_item`)
2. Then added to cart (`add_to_cart`)
3. But did NOT complete purchase (within 7 days)

**Membership Duration:**

**Range:** 1-540 days

**How it works:**
- User enters audience when conditions met
- Stays in audience for duration period
- Exits after duration expires (unless conditions still met)

**Best Practices:**
- **Short campaigns:** 7-30 days
- **Remarketing:** 30-90 days
- **Lifetime segments:** 540 days (max)

### Audience Triggers

**What are Triggers:**
Actions that fire when user enters audience

**Supported Triggers:**
- Send event to Google Analytics
- Create Google Ads remarketing list
- Send to Google Ads for targeting

**Setting Up Trigger:**
1. Create audience
2. In audience settings, add trigger
3. Configure action (event name, Ads account)
4. Save

**Use Cases:**
- Track when users become high-value
- Send conversion events to Ads
- Create real-time remarketing lists

### Exporting Audiences

**Destinations:**
- Google Ads (remarketing, targeting)
- Display & Video 360
- Search Ads 360

**Setup:**
1. **Admin → Product Links → Google Ads Links**
2. Link Google Ads account
3. In Audience, enable "Ads Personalization"
4. Audience appears in Google Ads within 24-48 hours

**Requirements:**
- Minimum 100 active users (EEA/UK: 1,000)
- Google signals enabled
- Ads personalization enabled

### Predictive Audiences

**Available Predictions:**
- **Purchase Probability:** Likelihood to purchase in next 7 days
- **Churn Probability:** Likelihood to not return in next 7 days
- **Revenue Prediction:** Expected 28-day revenue

**Requirements:**
- 1,000+ users triggering target event (last 28 days)
- Sufficient historical data for prediction model

**Creating Predictive Audience:**
1. Create New Audience
2. Choose "Predictive"
3. Select metric (purchase probability, etc.)
4. Set threshold (e.g., > 50% purchase probability)
5. Save

**Use Cases:**
- Target likely purchasers with ads
- Re-engage likely-to-churn users
- Focus high-revenue potential users

### Analyzing Audiences

**Viewing Audience Data:**

1. **Reports → Realtime:** Active users in audience
2. **Reports → User Acquisition:** How audience members were acquired
3. **Explorations → Segment Overlap:** Compare audiences
4. **Explorations → User Lifetime:** LTV of audience members

**Audience Metrics:**
- **Total Users:** Current members
- **New Users (Last 7/30 Days):** Recent additions
- **User Growth:** Trend over time

### Common Audience Examples

**High-Value Customers:**
```
Conditions:
- totalRevenue > 500 (lifetime)
- purchaseCount >= 3
Membership: 540 days
```

**Cart Abandoners:**
```
Sequence:
1. add_to_cart (within last 7 days)
2. Did NOT: purchase
Membership: 7 days
```

**Engaged Mobile Users:**
```
Conditions:
- deviceCategory == "mobile"
- sessionCount >= 5 (last 30 days)
- avgEngagementTime > 60 seconds
Membership: 30 days
```

**Product Category Viewers:**
```
Event Condition:
- view_item (last 30 days)
- item_category == "Electronics"
Membership: 30 days
```

**Geographic Segment:**
```
Conditions:
- country == "United States"
- region == "California"
Membership: 90 days
```

## Integration with Other Skills

- **ga4-setup** - Property configuration for audience creation
- **ga4-custom-dimensions** - Using custom dimensions in audience conditions
- **ga4-recommended-events** - Event-based audience building
- **ga4-user-tracking** - User ID audiences for cross-device
- **ga4-reporting** - Analyzing audience performance
- **ga4-data-management** - Managing audience settings and retention

## References

- **references/audience-creation-guide.md** - Complete audience setup walkthrough
- **references/audience-conditions.md** - All condition types and operators
- **references/predictive-audiences.md** - Predictive audience setup and use cases
- **references/audience-export.md** - Exporting to Google Ads and other platforms

## Quick Reference

**Minimum Audience Size for Export:**
- Standard: 100 active users
- EEA/UK: 1,000 active users

**Membership Duration:**
- Minimum: 1 day
- Maximum: 540 days

**Audience Limits:**
- Standard: 100 audiences per property
- 360: 400 audiences per property

**Export Destinations:**
- Google Ads
- Display & Video 360
- Search Ads 360
