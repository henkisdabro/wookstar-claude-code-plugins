# GA4 Property Creation Guide

Complete step-by-step guide for creating Google Analytics 4 accounts, properties, and data streams.

## Account Hierarchy

GA4 uses a three-level hierarchy:

```
Google Account (Login credentials)
└── Analytics Account (Container for properties)
    └── GA4 Property (Analytics container for website/app)
        └── Data Stream (Platform-specific: Web, iOS, Android)
            └── Events & Parameters
```

## Understanding the Hierarchy

### Level 1: Google Account
- Your Gmail/Google Workspace login
- Required to access Google Analytics
- Can own multiple Analytics accounts
- No configuration needed (use existing account)

### Level 2: Analytics Account
- Container for organizing properties
- Typically one per business or organization
- Limit: Up to 2,000 properties per account
- Shared settings: data sharing, account-level users, change history

### Level 3: GA4 Property
- Container for a specific website, app, or business unit
- Can have multiple data streams
- Property-specific settings: timezone, currency, industry, objectives
- Limit: 2,000 properties per account

### Level 4: Data Stream
- Tracks specific platform (web, iOS, or Android)
- Each stream has unique Measurement ID (G-XXXXXXXXXX)
- Limit: Up to 1,000 data streams per property

## Creating an Analytics Account

### When to Create a New Account

Create a new Analytics account when:

- Starting analytics for a new organization
- Separating client work (agencies)
- Requiring distinct permission boundaries
- Organizationally separating business units

### Account Creation Steps

1. Navigate to https://analytics.google.com
2. Click "Start measuring" or Admin → Create Account
3. Enter account name (e.g., "Acme Corporation")
4. Configure account data sharing settings:
   - Google products & services (recommended: enabled)
   - Benchmarking (recommended: enabled)
   - Technical support (recommended: enabled)
   - Account specialists (optional)
5. Click "Next" to proceed to property creation

### Account Data Sharing Settings

**Google Products & Services**:
- Shares data to improve Google products
- Enables product recommendations

**Benchmarking**:
- Allows comparison with industry peers
- Anonymously shares data for aggregate reports

**Technical Support**:
- Google support can access account for troubleshooting
- Recommended for faster issue resolution

**Account Specialists**:
- Share with Google account managers
- Only relevant if you have dedicated account rep

## Creating a GA4 Property

### Property Details

**Step 1: Property Name**

Enter a descriptive property name:
- Use clear naming: "Main Website", "Mobile App", "E-commerce Site"
- Include environment if applicable: "Production Website" vs "Test Website"
- Keep under 100 characters

**Step 2: Reporting Time Zone**

Select your primary business timezone:
- Used for day boundaries in reports
- Example: "United States - Pacific Time"
- **Critical**: Cannot be changed retroactively affects historical data
- Choose carefully based on where business operates

**Step 3: Currency**

Select reporting currency:
- Used for revenue and monetary value reporting
- Example: "US Dollar (USD)" or "Euro (EUR)"
- All monetary values converted to this currency
- Can be changed later without affecting historical data

### Advanced Settings

**Step 4: Industry Category (Optional)**

Select relevant industry:
- Automotive
- Business & Industrial Markets
- Finance
- Healthcare
- Technology
- Travel
- Real Estate
- And more...

**Purpose**: Influences default reports and recommendations

**Step 5: Business Size (Optional)**

Select company size:
- Small (1-100 employees)
- Medium (100-500 employees)
- Large (500+ employees)

### Business Objectives

**Step 6: Select Objectives**

Choose objectives that match business goals:

**Option 1: Get baseline reports**
- Default reports for all businesses
- Choose if unsure or want standard setup
- Recommended for first-time GA4 users

**Option 2: Examine user behavior**
- User engagement and retention reports
- Path exploration tools

**Option 3: Measure customer actions**
- Conversion tracking emphasis
- Ecommerce-focused reports

**Option 4: Get insights on customers**
- Demographics and interests
- Requires Google Signals

**Option 5: Improve marketing ROI**
- Advertising and attribution reports
- Google Ads integration

**Note**: Can select multiple objectives; influences default reporting UI

### Accepting Terms

**Step 7: Review and Accept**

- Google Analytics Terms of Service
- Data Processing Amendment (GDPR)
- Country-specific terms if applicable

Read and check acceptance boxes, then click "Create"

## Property Settings Configuration

After property creation, configure additional settings:

### Navigate to Property Settings

1. Admin → Property → Property Settings
2. Review and adjust:
   - Property name (can change later)
   - Industry category
   - Time zone (CRITICAL - choose correctly first time)
   - Currency (can change)
   - Property ID (read-only, format: properties/XXXXXXXXXX)

### Enable Google Signals (Optional)

**Location**: Admin → Data Settings → Data Collection

**Purpose**:
- Collect demographics (age, gender)
- Enable cross-device tracking
- Requires users signed into Google accounts

**Requirements**:
- User consent for ad personalization
- Compliance with privacy regulations

**Enable Steps**:
1. Admin → Data Settings → Data Collection
2. Click "Get Started" under Google Signals
3. Review requirements
4. Click "Activate"

**Impact**:
- Demographics & interests reports available
- Cross-device user tracking
- Enhanced audience building

### Configure Data Retention

**Location**: Admin → Data Settings → Data Retention

**Options**:
- 2 months (default)
- 14 months (recommended for most)
- 26 months (GA4 360 only)
- 38 months (GA4 360 only)
- 50 months (GA4 360 only)

**What's Affected**:
- User-level data in Explorations
- Event-level data in Explorations
- User Explorer report

**Not Affected**:
- Standard reports (aggregated data retained indefinitely)
- Conversion data
- Audience data

**Recommendation**: Set to 14 months for year-over-year analysis

### Reset User Data on New Activity

**Toggle Option**: ON or OFF

**ON (Default)**:
- Retention timer resets with each new event from user
- User data persists as long as user remains active

**OFF**:
- Data deleted after retention period regardless of activity
- Use for stricter privacy compliance

## Property Best Practices

### Naming Conventions

Use consistent, descriptive names:

**Good Examples**:
- "Acme Corp - Production Website"
- "Acme Corp - iOS App"
- "Acme Corp - Test Environment"

**Bad Examples**:
- "Website 1"
- "Test"
- "Property123"

### Environment Separation

**Create Separate Properties For**:
- Production website/app
- Staging/test environment
- Development environment

**Why**: Prevents test data from polluting production analytics

### Property Organization

**Single Business**:
- One property per major digital property (website, app)
- Multiple data streams within property for subdomains

**Multiple Businesses/Clients**:
- Separate Analytics accounts for each
- Or separate properties within agency account

### Documentation

**Document for Each Property**:
- Property ID and name
- Measurement IDs for all data streams
- Timezone and currency selections
- Business objectives chosen
- Setup date and responsible person
- Installation method used

## Common Property Creation Issues

### Issue: Cannot Create Property

**Causes**:
- Reached 2,000 property limit
- Insufficient permissions
- Account suspended

**Solutions**:
- Delete unused properties
- Request Admin access from account owner
- Contact Google support for suspension issues

### Issue: Wrong Timezone Selected

**Problem**: Cannot change timezone after creation

**Solutions**:
- Delete and recreate property (if just created)
- Export data and create new property (if has historical data)
- Accept timezone and use data studio for reporting in different timezone

### Issue: Don't Know Which Industry Category

**Solution**: Choose "Other" or most relevant category
- Not critical for functionality
- Can be changed later
- Only affects suggested reports

### Issue: Multiple Properties vs Multiple Data Streams

**Decision Framework**:

**Use Multiple Data Streams (Same Property)** when:
- Same business entity
- Want combined reporting
- Example: main site + blog subdomain

**Use Multiple Properties** when:
- Different business entities
- Different permission requirements
- Test vs production
- Example: separate brands, client sites

## Next Steps After Property Creation

1. **Create Data Stream** (see data-streams-configuration.md)
2. **Install Tracking Code** (see installation-methods.md)
3. **Verify Installation** (see verification-checklist.md)
4. **Configure Enhanced Measurement**
5. **Set up Internal Traffic Filters**
6. **Create First Custom Events**

## Additional Resources

- Official Google: GA4 Property Setup
- Official Google: Account Structure Best Practices
- Official Google: Data Retention Settings
