# Audience Creation Examples and Use Cases

## E-commerce Audiences

### High-Value Customers

**Use Case:** Target users who have spent over $500 lifetime for VIP promotions

**Configuration:**
- **Scope:** User
- **Conditions:**
  - `totalRevenue` (lifetime) greater than 500
  - `purchaseCount` (lifetime) greater than or equal to 3
- **Membership Duration:** 540 days (maximum)
- **Export:** Google Ads for remarketing

**Trigger:**
- Send event: `high_value_user_entered` when user joins audience
- Use for: Custom marketing automation

### Cart Abandoners (Last 7 Days)

**Use Case:** Retarget users who added to cart but didn't purchase

**Configuration:**
- **Sequence:**
  1. User triggered `add_to_cart` (within last 7 days)
  2. Did NOT trigger `purchase` (within 7 days after cart add)
- **Membership Duration:** 7 days
- **Export:** Google Ads

**Variations:**
- High-value cart (value > $100)
- Multiple cart adds (2+ times)
- Specific product category

### Product Category Enthusiasts

**Use Case:** Users interested in specific product categories

**Configuration:**
- **Event Condition:**
  - Event: `view_item`
  - Parameter: `item_category` equals "Electronics"
  - Time period: Last 30 days
  - Minimum: 3 occurrences
- **Membership Duration:** 30 days

### Repeat Purchasers

**Use Case:** Users who have purchased multiple times

**Configuration:**
- **Conditions:**
  - `purchaseCount` (lifetime) greater than or equal to 2
  - Last purchase within 90 days
- **Membership Duration:** 180 days

## Engagement Audiences

### Highly Engaged Visitors

**Use Case:** Users who spend significant time on site

**Configuration:**
- **Conditions:**
  - `sessionCount` (last 30 days) greater than or equal to 5
  - `averageEngagementTimePerSession` greater than 60 seconds
  - `screenPageViewsPerSession` greater than 3
- **Membership Duration:** 30 days

### Video Watchers

**Use Case:** Users who engaged with video content

**Configuration:**
- **Event Condition:**
  - Event: `video_complete` OR `video_progress`
  - Time period: Last 30 days
- **Membership Duration:** 30 days

### Blog Readers

**Use Case:** Users who read blog content

**Configuration:**
- **Event Condition:**
  - Event: `page_view`
  - Parameter: `page_location` contains "/blog/"
  - Minimum occurrences: 3 (last 30 days)
- **Membership Duration:** 30 days

## Acquisition Audiences

### Organic Search Visitors

**Use Case:** Users from organic search for SEO analysis

**Configuration:**
- **Conditions:**
  - `firstUserSource` equals "google"
  - `firstUserMedium` equals "organic"
- **Membership Duration:** 90 days

### Paid Campaign Converters

**Use Case:** Users who converted from specific campaign

**Configuration:**
- **Conditions:**
  - `sessionSource` equals "google"
  - `sessionMedium` equals "cpc"
  - `sessionCampaignName` equals "summer_sale_2024"
  - Event: `purchase` (within campaign session)
- **Membership Duration:** 90 days

### Social Media Visitors

**Use Case:** Users from social platforms

**Configuration:**
- **Conditions:**
  - `sessionSource` in ["facebook", "instagram", "twitter", "linkedin"]
  - `sessionCount` greater than or equal to 2
- **Membership Duration:** 30 days

## Geographic and Demographic Audiences

### Local Market Audience

**Use Case:** Users in specific geographic area

**Configuration:**
- **Conditions:**
  - `country` equals "United States"
  - `region` equals "California"
  - `city` in ["Los Angeles", "San Francisco", "San Diego"]
- **Membership Duration:** 90 days

### Mobile Power Users

**Use Case:** Engaged mobile users

**Configuration:**
- **Conditions:**
  - `deviceCategory` equals "mobile"
  - `sessionCount` (last 30 days) greater than or equal to 10
  - `averageEngagementTime` greater than 120 seconds
- **Membership Duration:** 30 days

### Desktop Researchers

**Use Case:** Users who browse on desktop (potential B2B)

**Configuration:**
- **Conditions:**
  - `deviceCategory` equals "desktop"
  - `sessionDuration` greater than 300 seconds
  - `screenPageViewsPerSession` greater than 5
- **Membership Duration:** 30 days

## Behavioral Audiences

### Frequent Visitors (Not Converted)

**Use Case:** Engaged users who haven't purchased yet

**Configuration:**
- **Conditions:**
  - `sessionCount` (lifetime) greater than or equal to 5
  - `purchaseCount` (lifetime) equals 0
- **Membership Duration:** 60 days

### Product Comparison Shoppers

**Use Case:** Users viewing multiple products

**Configuration:**
- **Sequence:**
  1. `view_item` (at least 5 times in last 7 days)
  2. Did NOT `purchase`
- **Membership Duration:** 14 days

### Newsletter Subscribers

**Use Case:** Users who signed up for newsletter

**Configuration:**
- **Event Condition:**
  - Event: `sign_up` OR `newsletter_subscribe`
  - Time period: Last 180 days
- **Membership Duration:** 180 days

## Predictive Audiences

### Likely Purchasers (Next 7 Days)

**Use Case:** Target users with high purchase probability

**Configuration:**
- **Predictive Metric:** Purchase probability
- **Threshold:** Greater than 50%
- **Membership Duration:** 7 days
- **Requirements:** 1,000+ purchasers in last 28 days

### At-Risk of Churn

**Use Case:** Re-engage users likely to leave

**Configuration:**
- **Predictive Metric:** Churn probability
- **Threshold:** Greater than 60%
- **Membership Duration:** 14 days
- **Export:** Google Ads for retention campaigns

### High Revenue Potential

**Use Case:** Focus on users likely to generate revenue

**Configuration:**
- **Predictive Metric:** Predicted 28-day revenue
- **Threshold:** Greater than $100
- **Membership Duration:** 28 days

## Advanced Audiences

### Lookalike to Best Customers

**Use Case:** Find similar users to high-value customers (Google Ads Smart Bidding)

**Configuration:**
1. Create "Best Customers" audience:
   - `totalRevenue` greater than 1000
   - Export to Google Ads
2. In Google Ads:
   - Create Similar Audiences
   - Based on "Best Customers" list
   - Expansion size: 5-10%

### Cross-Sell Opportunity

**Use Case:** Users who bought Product A but not Product B

**Configuration:**
- **Sequence:**
  1. `purchase` with `item_id` equals "product_a"
  2. Did NOT `purchase` with `item_id` equals "product_b"
  3. Time window: Last 90 days
- **Membership Duration:** 90 days

### Abandoned Checkout

**Use Case:** Users who started but didn't complete checkout

**Configuration:**
- **Sequence:**
  1. `begin_checkout` (within last 3 days)
  2. Did NOT `purchase` (within 3 days after checkout)
- **Membership Duration:** 7 days
- **Export:** Google Ads for recovery campaigns

## Audience Combination Strategies

### Highly Engaged + Not Purchased

**Combine:**
- Audience 1: Highly Engaged (5+ sessions)
- Audience 2: Non-Purchasers (0 purchases)
- **Result:** Warm leads ready for conversion campaign

### Mobile + Cart Abandoners

**Combine:**
- Audience 1: Mobile Users
- Audience 2: Cart Abandoners
- **Result:** Mobile-optimized recovery campaigns

### Geographic + High Value

**Combine:**
- Audience 1: California Residents
- Audience 2: High-Value Customers
- **Result:** Regional VIP targeting

## Testing and Validation

**Minimum Viable Audience:**
- Wait 24-48 hours after creation
- Check audience size in Admin → Audiences
- Minimum 100 users (1,000 for EEA) for export

**Validation Steps:**
1. Create test audience with broad conditions
2. Verify users populate (check size after 24 hours)
3. Export to Google Ads test
4. Refine conditions based on size and performance

**A/B Testing Audiences:**
- Create variations of same concept
- Export both to Ads
- Compare performance
- Optimize based on results
