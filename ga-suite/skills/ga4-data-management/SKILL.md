---
name: ga4-data-management
description: Expert guidance for GA4 Admin settings including data retention, filters, user access, and property configuration. Use when configuring data retention settings, creating data filters (internal traffic), managing user permissions, setting up property settings, or configuring Data Collection settings. Covers Admin UI navigation, filter creation, user roles, and property configuration.
---

# GA4 Data Management and Admin Settings

## Overview

GA4 Admin settings control data retention, filters, user access, property configuration, and data collection parameters.

## When to Use This Skill

Invoke this skill when:

- Configuring data retention periods
- Creating data filters (internal traffic, developer traffic)
- Managing user access and permissions
- Setting up property timezone and currency
- Configuring data collection settings
- Creating internal traffic filters by IP
- Managing Google Signals data collection
- Setting up data deletion schedules
- Configuring cross-domain measurement
- Managing property and user settings
- Controlling data streams and measurement
- Setting up enhanced measurement

## Core Capabilities

### Accessing Admin Settings

**Path:** GA4 Property → Admin (bottom-left gear icon)

**Structure:**
- **Account Column:** Account-level settings
- **Property Column:** Property-level settings

### Data Settings

**Path:** Admin → Data Settings (Property column)

#### Data Retention

**Path:** Admin → Data Settings → Data Retention

**Options:**
- **2 months** (default)
- **14 months**

**What it Controls:**
- User-level and event-level data in Explorations
- Older data automatically deleted
- Does NOT affect standard reports (kept longer)

**Reset User Data on New Activity:**
- **ON:** Retention timer resets when user returns
- **OFF:** Data deleted based on original collection date

**Recommendation:**
- Standard sites: 2 months
- E-commerce/High-value: 14 months
- Export to BigQuery for unlimited retention

#### Data Collection

**Path:** Admin → Data Settings → Data Collection

**Google Signals:**
- **Enable** for demographics, interests, cross-device
- Requires user opt-in for personalization
- Impacts data thresholds in reports

**User-Provided Data:**
- Mark if collecting email, address, phone
- Required for certain Google Ads features
- Impacts policy compliance

### Data Filters

**Path:** Admin → Data Settings → Data Filters

**Purpose:** Exclude internal traffic, developer testing, unwanted referrals

**Filter Types:**
1. **Internal Traffic** - Exclude office/employee traffic
2. **Developer Traffic** - Exclude staging/development
3. **Unwanted Referrals** - Exclude payment processors, etc.

#### Creating Internal Traffic Filter

**Steps:**

1. **Admin → Data Settings → Data Filters**
2. Click **Create Filter**
3. **Filter name:** "Internal Traffic - Office IP"
4. **Filter type:** Internal Traffic
5. **IP address:**
   - **Match type:** IP address equals, begins with, contains
   - **IP address:** Enter office IP(s)
6. **Filter state:**
   - **Testing:** Preview filtered traffic (doesn't exclude)
   - **Active:** Actively filters data
7. Save

**Testing Filter:**
1. Set filter to "Testing"
2. Visit website from office IP
3. Admin → DebugView
4. Check events have `traffic_type = internal`
5. If correct, set filter to "Active"

**Multiple IPs:**
Use "contains" or create multiple filters for different IP ranges.

### User Management

**Path:** Admin → Property Access Management (Property column)

**Roles:**

1. **Viewer**
   - View reports
   - Create Explorations
   - No configuration changes

2. **Analyst**
   - All Viewer permissions
   - Create audiences, custom dimensions
   - Create annotations
   - Cannot modify property settings

3. **Marketer**
   - All Analyst permissions
   - Manage audiences
   - Link Google Ads
   - Cannot access Admin settings

4. **Editor**
   - All permissions except user management
   - Modify property settings
   - Create/edit filters, events
   - Cannot add users

5. **Administrator**
   - Full access to everything
   - Manage users and permissions
   - Delete property

**Adding Users:**

1. **Property Access Management → Add**
2. Enter email address
3. Select role
4. Add optional message
5. Click **Add**

**Best Practices:**
- Principle of least privilege
- Regular access audits
- Remove users when leaving team
- Use service accounts for integrations

### Property Settings

**Path:** Admin → Property Settings (Property column)

**Key Settings:**

**Property Details:**
- **Property name:** Descriptive name
- **Property ID:** Numeric ID (read-only)
- **Reporting Time Zone:** Affects date boundaries in reports
- **Currency:** Default currency for revenue

**Changing Timezone:**
- Affects FUTURE data only
- Historical data keeps old timezone
- Carefully plan before changing

**Industry Category:**
- Used for benchmarking
- Does not affect data collection

### Data Streams

**Path:** Admin → Data Streams (Property column)

**Managing Streams:**

**Web Data Stream Settings:**
1. Click stream name
2. **Stream details:**
   - Stream name
   - Stream URL
   - Measurement ID
   - Stream ID

**Enhanced Measurement:**
- Page views (automatic)
- Scrolls
- Outbound clicks
- Site search
- Video engagement
- File downloads
- Form interactions

**Toggle Individual Events:**
- Enable/disable each enhanced measurement event
- Configure conditions (e.g., search query parameter)

**Measurement Protocol API Secrets:**
- Create secrets for server-side tracking
- Manage existing secrets
- Delete compromised secrets

### Events Settings

**Path:** Admin → Events (Property column)

**Create Event:**
- Modify existing events
- Create new events from existing
- Add/modify parameters

**Example: Create Event**
1. **Create Event**
2. **Event name:** "conversion_click"
3. **Matching conditions:**
   - event_name = "click"
   - click_id contains "convert"
4. Save

**Mark as Key Event:**
- Previously "Conversions"
- Path: Admin → Events
- Toggle "Mark as key event" for important events

### Conversions (Key Events)

**Path:** Admin → Key Events (previously Conversions)

**Marking Events as Key Events:**
1. Event must have fired at least once
2. Toggle "Mark as key event" next to event name
3. Event appears in conversions reports

**Default Key Events:**
- purchase
- first_visit
- session_start (if enabled)

**Custom Key Events:**
- Any event can be marked
- Max 30 key events per property
- Affects Ads optimization

### Custom Definitions

**Path:** Admin → Custom Definitions (Property column)

**Create Custom Dimensions:**
1. **Create custom dimension**
2. **Dimension name:** Display name
3. **Scope:** Event or User
4. **Event/User parameter:** Parameter name from events
5. Save

**Create Custom Metrics:**
1. **Create custom metric**
2. **Metric name:** Display name
3. **Scope:** Event
4. **Unit of measurement:** Standard, currency, distance, time
5. **Event parameter:** Parameter name
6. Save

**Limits:**
- 50 custom dimensions (event-scoped)
- 25 custom dimensions (user-scoped)
- 50 custom metrics (event-scoped)

### Product Links

**Path:** Admin → Product Links (Property column)

**Available Links:**
- **Google Ads Links:** Connect Ads accounts for remarketing, conversions
- **Search Ads 360 Links:** SA360 integration
- **Display & Video 360 Links:** DV360 integration
- **BigQuery Links:** Export raw data
- **AdSense Links:** AdSense revenue tracking

**Linking Google Ads:**
1. **Google Ads Links → Link**
2. Choose Ads account
3. Enable options:
   - Personalized advertising
   - Auto-tagging
4. Confirm link

### DebugView

**Path:** Admin → DebugView

**Purpose:**
- Real-time event debugging
- View events from debug-enabled devices
- Check parameters and user properties

**Enable Debug Mode:**
- Browser extension
- URL parameter: `?debug_mode=true`
- gtag config: `debug_mode: true`

## Integration with Other Skills

- **ga4-setup** - Initial property and data stream configuration
- **ga4-custom-dimensions** - Creating custom dimensions
- **ga4-user-tracking** - User access and User ID configuration
- **ga4-audiences** - Audience management in Admin
- **ga4-debugview** - Using DebugView for testing
- **ga4-privacy-compliance** - Data retention and deletion
- **ga4-bigquery** - BigQuery link setup

## References

- **references/admin-complete-guide.md** - Complete Admin UI walkthrough
- **references/data-filters-guide.md** - Creating and managing data filters
- **references/user-permissions.md** - User roles and permissions reference
- **references/property-settings.md** - Property configuration options

## Quick Reference

**Data Retention:**
- Default: 2 months
- Max: 14 months
- For longer: Export to BigQuery

**User Roles:**
- Viewer: View only
- Analyst: View + create
- Marketer: View + create + Ads
- Editor: All except user management
- Administrator: Full access

**Custom Dimensions Limits:**
- Event-scoped: 50
- User-scoped: 25

**Custom Metrics Limit:**
- Event-scoped: 50

**Key Events Limit:**
- 30 per property
