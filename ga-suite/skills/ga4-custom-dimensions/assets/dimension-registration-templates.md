# Custom Dimension Registration Templates

Copy and customize these templates for your custom dimensions registration.

---

## Template 1: Event-Scoped Dimension - Form Tracking

### Code Implementation

```javascript
// On form submit event
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    // Get form details
    const formName = this.getAttribute('name') || this.getAttribute('id');
    const formId = this.getAttribute('id');

    // Send to GA4
    gtag('event', 'form_submit', {
      'form_name': formName,
      'form_id': formId,
      'form_destination': this.getAttribute('action')
    });
  });
});
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Form Name
- **Scope:** Event
- **Event Parameter:** form_name
- **Description:** Name of form submitted (contact, newsletter, demo request, etc)

**Dimension 2:**
- **Dimension Name:** Form ID
- **Scope:** Event
- **Event Parameter:** form_id
- **Description:** HTML ID attribute of submitted form

**Dimension 3:**
- **Dimension Name:** Form Destination
- **Scope:** Event
- **Event Parameter:** form_destination
- **Description:** Form submission destination URL or page

### Expected Report Output

```
Form Name                   Form Submissions    Avg. Engagement Time
================================================================
Contact Form                        245                 42 seconds
Newsletter Signup                   189                 15 seconds
Demo Request                        78                  85 seconds
Product Inquiry                     156                 38 seconds
```

---

## Template 2: User-Scoped Dimension - Customer Tier

### Code Implementation

```javascript
// After user login/authentication
function setUserProperties(user) {
  // Determine subscription tier
  let tier = 'free';
  if (user.isPaidSubscriber) {
    tier = user.premiumTier || 'pro';
  }

  gtag('set', {
    'subscription_tier': tier,
    'customer_id': user.id || 'guest',
    'account_age_days': Math.floor(
      (new Date() - new Date(user.createdDate)) / (1000 * 60 * 60 * 24)
    )
  });
}

// Call on page load if logged in
if (window.currentUser) {
  setUserProperties(window.currentUser);
}
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Subscription Tier
- **Scope:** User
- **User Property:** subscription_tier
- **Description:** User's plan type: free, pro, enterprise, trial

**Dimension 2:**
- **Dimension Name:** Customer ID
- **Scope:** User
- **User Property:** customer_id
- **Description:** Internal customer identifier (hashed)

**Dimension 3:**
- **Dimension Name:** Account Age (Days)
- **Scope:** User
- **User Property:** account_age_days
- **Description:** Days since account creation

### Expected Report Output

```
Subscription Tier    Users    Avg. Sessions    Revenue
======================================================
Free                 2,450           1.8       $0
Pro                  890             5.2       $8,900
Enterprise           34              12.1      $45,000
Trial                156             3.2       $0
```

---

## Template 3: Item-Scoped Dimension - Product Color

### Code Implementation

```javascript
// On purchase event
function trackPurchase(order) {
  const items = order.products.map(product => ({
    'item_id': product.sku,
    'item_name': product.name,
    'price': product.price,
    'quantity': product.quantity,
    'item_category': product.category,
    // CUSTOM ITEM-SCOPED DIMENSION
    'item_color': product.color || 'not_specified'
  }));

  gtag('event', 'purchase', {
    'transaction_id': order.id,
    'value': order.total,
    'currency': 'USD',
    'items': items
  });
}
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Item Color
- **Scope:** Item
- **Event Parameter:** item_color
- **Description:** Color variant of product (red, blue, green, black, etc)

### Expected Report Output

```
Item Color    Items Purchased    Revenue      Avg. Price
=========================================================
Blue                  1,234      $45,987         $37.28
Black                  987       $38,976         $39.45
Red                    654       $23,456         $35.88
Green                  432       $16,789         $38.86
Not Specified          123        $4,567         $37.14
```

---

## Template 4: Event-Scoped Dimension - Video Quality

### Code Implementation

```javascript
// For video player that tracks quality changes
class VideoPlayer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.videoTitle = this.container.getAttribute('data-video-title');
    this.currentQuality = 'auto';

    // Track when quality changes
    this.setupQualityTracking();
  }

  setupQualityTracking() {
    this.container.addEventListener('qualitychange', (e) => {
      this.currentQuality = e.detail.quality;

      gtag('event', 'video_quality_change', {
        'video_title': this.videoTitle,
        'new_quality': this.currentQuality
      });
    });
  }

  onVideoComplete() {
    gtag('event', 'video_complete', {
      'video_title': this.videoTitle,
      'video_quality': this.currentQuality,
      'watch_time_minutes': Math.floor(this.duration / 60),
      'completion_percentage': 100
    });
  }
}

// Initialize
const player = new VideoPlayer('video-player');
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Video Quality
- **Scope:** Event
- **Event Parameter:** video_quality
- **Description:** Video quality setting (auto, 360p, 480p, 720p, 1080p)

**Dimension 2:**
- **Dimension Name:** New Quality
- **Scope:** Event
- **Event Parameter:** new_quality
- **Description:** Quality selected after quality change event

### Expected Report Output

```
Video Quality    Video Completes    Avg. Watch Time    Completion %
==================================================================
1080p                    345            18 minutes            92%
720p                     289            16 minutes            88%
480p                     156            14 minutes            76%
360p                      89            10 minutes            62%
Auto                     421            17 minutes            85%
```

---

## Template 5: User-Scoped Dimension - Company Type

### Code Implementation

```javascript
// After user signup/login with company info
function setCompanyProperties(company) {
  let companyType = 'unknown';

  if (company.employees < 10) {
    companyType = 'micro';
  } else if (company.employees < 50) {
    companyType = 'small';
  } else if (company.employees < 500) {
    companyType = 'medium';
  } else {
    companyType = 'enterprise';
  }

  gtag('set', {
    'company_type': companyType,
    'company_size': company.employees,
    'industry': company.industry || 'other'
  });
}

// Usage
if (window.userData && window.userData.company) {
  setCompanyProperties(window.userData.company);
}
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Company Type
- **Scope:** User
- **User Property:** company_type
- **Description:** Company size category (micro, small, medium, enterprise)

**Dimension 2:**
- **Dimension Name:** Company Size (Employees)
- **Scope:** User
- **User Property:** company_size
- **Description:** Number of employees

**Dimension 3:**
- **Dimension Name:** Industry
- **Scope:** User
- **User Property:** industry
- **Description:** Company industry classification

### Expected Report Output

```
Company Type    Users    Conversions    Avg. Deal Size
====================================================
Enterprise        45            34            $45,000
Medium           156            89            $12,500
Small            234            156            $4,200
Micro            567            123            $1,500
Unknown          198             45            $2,800
```

---

## Template 6: Item-Scoped Dimension - Product Supplier

### Code Implementation

```javascript
// Ecommerce inventory tracking with supplier info
function trackAddToCart(product) {
  gtag('event', 'add_to_cart', {
    'items': [{
      'item_id': product.sku,
      'item_name': product.name,
      'price': product.price,
      'quantity': product.quantity,
      'item_category': product.category,
      // CUSTOM ITEM-SCOPED DIMENSION
      'supplier': product.supplier || 'internal',
      'warehouse': product.warehouseLocation || 'us_east'
    }],
    'value': product.price * product.quantity,
    'currency': 'USD'
  });
}
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Item Supplier
- **Scope:** Item
- **Event Parameter:** supplier
- **Description:** Supplier/vendor of product (Vendor A, Vendor B, Internal, Dropship)

**Dimension 2:**
- **Dimension Name:** Warehouse Location
- **Scope:** Item
- **Event Parameter:** warehouse
- **Description:** Warehouse location for item (us_east, us_west, eu, asia)

### Expected Report Output

```
Supplier        Items in Cart    Carts    Conversion Rate
========================================================
Vendor A              2,345        567           45%
Vendor B              1,876        412           38%
Internal                987        298           52%
Dropship               654         156           27%
```

---

## Template 7: Event-Scoped Dimension - Button Click

### Code Implementation

```javascript
// CTA button tracking across page
function trackButtonClicks() {
  document.querySelectorAll('[data-track-button]').forEach(button => {
    button.addEventListener('click', function(e) {
      // Extract button information
      const buttonName = this.getAttribute('data-button-name') ||
                        this.innerText.trim() ||
                        'unknown_button';
      const buttonLocation = this.getAttribute('data-location') ||
                            'unknown_location';
      const destination = this.getAttribute('href') ||
                         this.getAttribute('data-destination') ||
                         '(none)';

      gtag('event', 'button_click', {
        'button_name': buttonName,
        'button_location': buttonLocation,
        'destination': destination
      });
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', trackButtonClicks);
```

### Admin Registration Details

**Dimension 1:**
- **Dimension Name:** Button Name
- **Scope:** Event
- **Event Parameter:** button_name
- **Description:** Text/label of clicked button

**Dimension 2:**
- **Dimension Name:** Button Location
- **Scope:** Event
- **Event Parameter:** button_location
- **Description:** Position on page (hero, sidebar, footer, etc)

**Dimension 3:**
- **Dimension Name:** Destination
- **Scope:** Event
- **Event Parameter:** destination
- **Description:** Where button leads (URL or action)

### Expected Report Output

```
Button Name        Button Location    Clicks    Conversion %
===========================================================
Sign Up Now        Hero Section         1,234          8.5%
Learn More         Middle Section         789          5.2%
Get Started        Footer                 456          12.1%
Free Trial         Sidebar               678          9.8%
Contact Us         Header                 345          15.3%
```

---

## Template 8: Documentation Template for Each Dimension

**Print this for every custom dimension and keep in shared documentation:**

```
═══════════════════════════════════════════════════════════
CUSTOM DIMENSION DOCUMENTATION

Dimension Name: [NAME]
Registered: [DATE]
Status: [ACTIVE/DEPRECATED]

BASIC INFORMATION
─────────────────
GA4 Dimension Name: [Display name in reports]
Parameter Name: [Name in code]
Scope: [Event / User / Item]
Description: [What it tracks]

IMPLEMENTATION
──────────────
Owner/Creator: [Person name]
Code Location: [File path]
Event Name(s): [Which events send this parameter]
Approximate Events/Month: [Volume estimate]

BUSINESS CONTEXT
────────────────
Purpose: [Why we track this]
Business Impact: [How it's used]
Teams Using: [Marketing, Product, Analytics, etc.]
Report Location: [Which reports show this]

DATA QUALITY
────────────
Data Starts: [Date dimension was activated]
Current Status: [Actively used / Occasionally used / Dormant]
Data Quality Issues: [Any known issues]

DEPENDENCIES
─────────────
Related Dimensions: [Other dimensions it works with]
Related Events: [Which events send this]
Related Metrics: [Any related metrics]

NOTES
─────
[Any additional context]

═══════════════════════════════════════════════════════════
```

---

## Quick Copy-Paste: Implementation Checklist

```markdown
## Custom Dimension Implementation Checklist

### Pre-Implementation
- [ ] Dimension name approved by team
- [ ] Parameter name finalized
- [ ] Scope decided (Event/User/Item)
- [ ] Code location identified
- [ ] Documentation drafted

### Implementation
- [ ] Parameter added to event code
- [ ] Code deployed to development
- [ ] Code tested in development
- [ ] Code deployed to production
- [ ] Code monitoring in place

### Verification
- [ ] Parameter appears in DebugView
- [ ] Parameter name matches registration (case-sensitive)
- [ ] Parameter values are accurate
- [ ] Dimension created in Admin
- [ ] Wait 24-48 hours for data population

### Post-Implementation
- [ ] Dimension appears in reports
- [ ] Data accuracy verified
- [ ] Team documentation updated
- [ ] Dashboards created (if applicable)
- [ ] Team training completed
- [ ] Added to dimension inventory
- [ ] Quarterly review scheduled

### Notes
[Any issues or observations]
```

---

## Template: GA4 Dimension Inventory Spreadsheet

**Use this to track all dimensions:**

| Dimension Name | Parameter Name | Scope | Event | Owner | Status | Created | Notes |
|---|---|---|---|---|---|---|---|
| Form Name | form_name | Event | form_submit | John | Active | 2024-09 | Core tracking |
| Button Name | button_name | Event | button_click | Sarah | Active | 2024-09 | Updated Sept |
| Subscription Tier | subscription_tier | User | all | Mike | Active | 2024-08 | Critical |
| Video Quality | video_quality | Event | video_watch | Jane | Active | 2024-10 | New tracking |
| Item Color | item_color | Item | purchase | Alex | Active | 2024-09 | Ecommerce |
| Test Param | test_parameter | Event | test_event | Dev | Deprecated | 2024-11 | Delete after 11/20 |

**Columns to include:**
- Dimension Name (display name)
- Parameter Name (code name)
- Scope (Event/User/Item)
- Event (which event sends it)
- Owner (who created)
- Status (Active/Deprecated/Test)
- Created (date)
- Last Modified (date)
- Notes (any details)
- Quota Usage (which quota it counts toward)

