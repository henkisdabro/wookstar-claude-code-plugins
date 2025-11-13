---
name: ga4-user-tracking
description: Complete guide to User ID implementation, user properties, and cross-device tracking in GA4. Use when implementing User ID for authenticated users, setting user properties, enabling cross-device tracking, configuring Reporting Identity, or tracking user attributes. Covers gtag('set') for user properties, User ID setup, cross-domain tracking, and user data management.
---

# GA4 User ID and Cross-Device Tracking

## Overview

User ID enables cross-device tracking for authenticated users and user properties allow tracking custom user attributes across all events.

## When to Use This Skill

Invoke this skill when:

- Implementing User ID for logged-in users
- Setting up cross-device tracking
- Configuring user properties for custom attributes
- Setting Reporting Identity options
- Tracking user lifecycle across devices
- Implementing authentication-based analytics
- Setting user-scoped custom dimensions
- Working with gtag.js user property commands
- Debugging user identification issues
- Implementing cross-domain tracking with User ID
- Analyzing user journeys across multiple devices

## Core Capabilities

### User ID Implementation

**What is User ID:**
- Persistent identifier for authenticated users
- Enables cross-device tracking
- Requires explicit user opt-in
- Must not contain PII (hash if needed)

**Implementation Methods:**

**Method 1: gtag.js**

```javascript
// Set User ID when user logs in
gtag('config', 'G-XXXXXXXXXX', {
  'user_id': 'USER_12345'
});

// Or use gtag('set')
gtag('set', 'user_id', 'USER_12345');
```

**Method 2: GTM (Data Layer)**

```javascript
// Push User ID to dataLayer
dataLayer.push({
  'user_id': 'USER_12345'
});
```

**In GTM:**
1. Create Data Layer Variable: `user_id`
2. In GA4 Configuration tag, add parameter:
   - Parameter: `user_id`
   - Value: `{{DL - User ID}}`

**Method 3: Measurement Protocol**

```json
{
  "client_id": "client_123",
  "user_id": "USER_12345",
  "events": [...]
}
```

**Best Practices:**
- Set when user logs in
- Clear when user logs out: `gtag('set', 'user_id', null)`
- Use internal IDs (not emails)
- Hash sensitive IDs
- Document User ID policy

### Reporting Identity

**Path:** Admin → Data Settings → Data Collection → Reporting Identity

**Options:**

1. **Blended (Recommended)**
   - Uses User ID when available
   - Falls back to device ID + Google signals
   - Most complete user view

2. **Observed**
   - Uses User ID and device ID only
   - No Google signals
   - More privacy-focused

3. **Device-based**
   - Uses only device ID (client_id)
   - No cross-device tracking
   - Most restrictive

**Recommendation:** Use "Blended" for most comprehensive tracking

### User Properties

**What are User Properties:**
- Custom attributes set at user level
- Persist across all events
- Max 25 properties per property
- Property names ≤24 characters
- Values ≤36 characters

**Setting User Properties:**

**gtag.js:**

```javascript
gtag('set', 'user_properties', {
  'user_tier': 'premium',
  'account_age_days': 365,
  'preferred_category': 'electronics'
});
```

**GTM (Data Layer):**

```javascript
dataLayer.push({
  'user_properties': {
    'user_tier': 'premium',
    'account_age_days': 365
  }
});
```

**Measurement Protocol:**

```json
{
  "client_id": "client_123",
  "user_properties": {
    "user_tier": {
      "value": "premium"
    },
    "account_age_days": {
      "value": 365
    }
  },
  "events": [...]
}
```

**Common User Properties:**

- `user_tier`: "free", "premium", "enterprise"
- `signup_date`: "2024-01-15"
- `subscription_status`: "active", "trial", "cancelled"
- `customer_ltv`: Lifetime value bucket
- `industry`: User's industry
- `company_size`: Employee count range
- `interests`: Comma-separated interests

**Avoid PII:**
- ❌ `email`, `name`, `phone_number`, `address`
- ✅ `email_domain`, `first_name_initial`, `user_segment`

### Custom Dimensions for Users

**Creating User-Scoped Custom Dimension:**

1. **Admin → Custom Definitions → Custom Dimensions**
2. Click **Create custom dimension**
3. **Dimension name:** User Tier
4. **Scope:** User
5. **User property:** `user_tier`
6. Save

**Using in Reports:**
- Add as dimension in Explorations
- Filter/segment by custom dimension
- Analyze user cohorts

### Cross-Device Tracking

**Requirements:**
- User ID implemented
- Google signals enabled (for Blended identity)
- Users opt in to personalization

**How it Works:**
1. User visits on mobile (logged in) → `user_id` set
2. User visits on desktop (logged in) → same `user_id`
3. GA4 stitches sessions together
4. Reports show unified user journey

**Verifying Cross-Device:**
1. Enable DebugView
2. Log in on Device 1 with `debug_mode=true`
3. Note `user_id` parameter in events
4. Log in on Device 2 with same account
5. Verify same `user_id` in events
6. Check reports for unified sessions

### Cross-Domain Tracking

**Setup for User ID Across Domains:**

**gtag.js Configuration:**

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'linker': {
    'domains': ['example.com', 'shop.example.com', 'blog.example.com']
  }
});
```

**What This Does:**
- Passes client_id between domains via URL parameter
- Preserves user_id if set
- Maintains session continuity

**GTM Setup:**
1. In GA4 Configuration tag
2. Expand **Configuration Settings**
3. Add parameter:
   - `linker`: `{"domains": ["example.com", "shop.example.com"]}`

**Testing:**
1. Visit domain1.com
2. Click link to domain2.com
3. Verify `_gl` parameter in URL
4. Check session continues in GA4

### User Data Deletion

**Deleting User Data by User ID:**

**Path:** Admin → Data Deletion Requests

**Process:**
1. Click **Create deletion request**
2. Select parameter: User ID
3. Enter User ID to delete
4. Choose deletion scope (all data or date range)
5. Submit request

**Processing:**
- Takes ~72 hours to complete
- Deletes all events for that User ID
- Cannot be undone

**Use Cases:**
- GDPR/CCPA compliance requests
- User account deletion
- Data cleanup

### Testing User ID

**Workflow:**

1. **Implement User ID** (gtag or GTM)
2. **Enable DebugView**
3. **Test Login:**
   - Before login: Check events have only `client_id`
   - After login: Verify `user_id` appears in event details
4. **Test Logout:**
   - After logout: Verify `user_id` cleared/null
5. **Test Cross-Device:**
   - Login on Device 1
   - Login on Device 2 with same account
   - Verify same `user_id`

**DebugView Verification:**
- Click any event
- Expand event details
- Check "User ID" field populated

**Reports Verification:**
- Wait 24-48 hours
- Admin → DebugView or Realtime
- Check user count vs sessions
- Lower user count = User ID working (same user, multiple sessions)

## Integration with Other Skills

- **ga4-setup** - Initial property setup for User ID
- **ga4-gtag-implementation** - Implementing User ID via gtag.js
- **ga4-gtm-integration** - Implementing User ID via GTM
- **ga4-custom-dimensions** - Creating user-scoped dimensions
- **ga4-audiences** - Building audiences based on User ID
- **ga4-privacy-compliance** - User data deletion and compliance
- **ga4-debugview** - Testing User ID implementation

## References

- **references/user-id-implementation.md** - Complete User ID setup guide
- **references/user-properties-guide.md** - User properties reference and examples
- **references/cross-device-tracking.md** - Cross-device implementation and testing
- **references/reporting-identity.md** - Reporting identity options explained

## Quick Reference

**Set User ID (gtag.js):**
```javascript
gtag('config', 'G-XXXXXXXXXX', {'user_id': 'USER_123'});
```

**Set User Properties (gtag.js):**
```javascript
gtag('set', 'user_properties', {
  'user_tier': 'premium'
});
```

**Clear User ID (gtag.js):**
```javascript
gtag('set', 'user_id', null);
```

**Limits:**
- 25 user properties per property
- User property name ≤24 characters
- User property value ≤36 characters
- User ID must not contain PII
