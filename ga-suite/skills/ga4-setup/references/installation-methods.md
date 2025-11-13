# GA4 Installation Methods Complete Guide

Comprehensive guide covering all three GA4 installation methods with code examples and platform-specific instructions.

## Installation Method Comparison

### Quick Decision Matrix

| Method | Best For | Technical Level | Flexibility | Maintenance |
|--------|----------|----------------|-------------|-------------|
| **CMS Plugin** | WordPress, Shopify, Wix | Beginner | Low | Low effort |
| **gtag.js** | Developers, custom sites | Intermediate | Medium | Code changes |
| **Google Tag Manager** | Most websites, teams | Beginner-Advanced | High | No code changes |

### When to Use Each Method

**Use CMS Plugin When**:
- Using popular CMS (WordPress, Shopify, Wix, Squarespace)
- Want click-and-configure setup
- No technical expertise required
- Single tracking platform (GA4 only)

**Use gtag.js When**:
- Have code access to website
- Only need Google products (GA4, Google Ads)
- Want lightweight implementation
- Comfortable editing HTML/JavaScript

**Use Google Tag Manager When**:
- Need multiple tracking tags
- Want flexibility without code changes
- Team collaboration required
- Need testing/version control
- Plan to add more tags later
- **Recommended for 90% of websites**

## Method 1: CMS Plugin Installation

### WordPress Installation

**Recommended Plugins**:
- **Site Kit by Google** (Official Google plugin)
- **GA Google Analytics** (MonsterInsights)
- **ExactMetrics** (formerly GoogleAnalytics by Yoast)
- **Insert Headers and Footers** (manual code injection)

#### Site Kit by Google (Recommended)

**Step 1: Install Plugin**

1. WordPress Admin → Plugins → Add New
2. Search "Site Kit by Google"
3. Click "Install Now"
4. Click "Activate"

**Step 2: Connect Google Account**

1. Site Kit → Start Setup
2. Sign in with Google Account (must have GA4 access)
3. Allow Site Kit permissions

**Step 3: Configure Analytics**

1. Site Kit will detect existing GA4 properties
2. Select property to connect, or create new
3. If creating new:
   - Enter website URL
   - Select timezone
   - Confirm settings
4. Activate Analytics module

**Step 4: Verify Installation**

1. Site Kit dashboard shows Analytics data
2. Check GA4 Realtime reports
3. Confirm events appearing

**Benefits**:
- Official Google plugin
- Automatic updates
- Shows data in WordPress dashboard
- Easy setup wizard

#### MonsterInsights/ExactMetrics

**Installation**:
1. Install plugin from WordPress repository
2. Activate plugin
3. Run setup wizard
4. Connect Google Account
5. Select GA4 property
6. Configure tracking options

**Features**:
- Enhanced ecommerce tracking (premium)
- Form tracking
- User-friendly dashboard
- Popular posts widget

### Shopify Installation

**Native Integration (Recommended)**:

**Step 1: Access Settings**

1. Shopify Admin → Settings
2. Click "Customer events"

**Step 2: Add GA4**

1. Click "Add custom pixel"
2. Select "Google Analytics 4"
3. Enter Measurement ID (G-XXXXXXXXXX)
4. Name pixel (e.g., "GA4 Tracking")
5. Save

**Step 3: Verify**

1. Preview store
2. Check GA4 DebugView
3. Confirm page views and events

**Manual Installation (Advanced)**:

**Step 1: Access Theme Code**

1. Online Store → Themes
2. Actions → Edit code
3. Open `theme.liquid`

**Step 2: Add gtag.js**

Insert before `</head>`:

```liquid
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Step 3: Save and Publish**

### Wix Installation

**Step 1: Access Tracking & Analytics**

1. Wix Dashboard → Settings
2. Marketing & SEO → Marketing Integrations
3. Google Analytics

**Step 2: Connect GA4**

1. Click "Connect"
2. Choose "Connect to existing account"
3. Sign in to Google
4. Select GA4 property
5. Click "Connect"

**Step 3: Configure Settings**

1. Enable "Track events"
2. Select events to track
3. Save settings

**Alternative: Manual Installation**

1. Settings → Custom Code
2. Add code to "Header"
3. Paste gtag.js snippet
4. Apply to all pages

### Squarespace Installation

**Step 1: Access Analytics**

1. Settings → Analytics
2. Google Analytics

**Step 2: Add Measurement ID**

1. Select "Google Analytics 4"
2. Enter Measurement ID
3. Save

**Step 3: Additional Tracking**

1. Settings → Advanced → Code Injection
2. Add custom event tracking if needed

## Method 2: gtag.js Direct Installation

### Overview

gtag.js (Google Tag) is JavaScript library for implementing GA4 directly without tag management system.

### Full Installation Code

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Placement Requirements

**Location**: `<head>` section of HTML

**Position**:
- Immediately after `<head>` opening tag
- Before all other scripts (except meta tags)
- Above any custom gtag() calls

**Complete HTML Example**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>

  <!-- Google tag (gtag.js) - MUST BE FIRST -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Other scripts after gtag -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

### Configuration Options

**Basic Configuration**:
```javascript
gtag('config', 'G-XXXXXXXXXX');
```

**With Additional Settings**:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'page_title': 'Custom Page Title',
  'page_location': 'https://example.com/custom-url',
  'send_page_view': true,  // Default: true
  'allow_google_signals': true,  // For demographics
  'allow_ad_personalization_signals': true
});
```

### Custom Event Tracking

**Simple Event**:
```javascript
gtag('event', 'button_click', {
  'button_name': 'Subscribe',
  'button_location': 'header'
});
```

**Purchase Event**:
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
  'value': 99.99,
  'currency': 'USD',
  'tax': 5.00,
  'shipping': 10.00,
  'items': [
    {
      'item_id': 'SKU_123',
      'item_name': 'Product Name',
      'price': 99.99,
      'quantity': 1
    }
  ]
});
```

### Common Implementation Patterns

**Track Button Click**:
```html
<button onclick="trackButtonClick()">Subscribe</button>

<script>
function trackButtonClick() {
  gtag('event', 'button_click', {
    'button_name': 'Subscribe',
    'button_location': 'homepage_hero'
  });
}
</script>
```

**Track Form Submission**:
```html
<form id="contact-form" onsubmit="trackFormSubmit(event)">
  <input type="email" name="email" required>
  <button type="submit">Submit</button>
</form>

<script>
function trackFormSubmit(e) {
  e.preventDefault();

  gtag('event', 'form_submit', {
    'form_name': 'Contact Form',
    'form_id': 'contact-form'
  });

  // Submit form after tracking
  setTimeout(() => {
    e.target.submit();
  }, 100);
}
</script>
```

### Multiple GA4 Properties

**Track to Multiple Properties**:
```javascript
// First property
gtag('config', 'G-XXXXXXXXXX');

// Second property
gtag('config', 'G-YYYYYYYYYY');

// Events automatically sent to both
gtag('event', 'purchase', {
  'value': 99.99,
  'currency': 'USD'
});
```

## Method 3: Google Tag Manager Installation

### Overview

GTM provides centralized tag management with no code changes for updates. Recommended for most implementations.

### Prerequisites

**Required**:
- GTM container created at tagmanager.google.com
- Container ID (format: GTM-XXXXXXX)
- Admin/Editor access to GTM container

### GTM Container Installation

**Step 1: Get Container Code**

1. Log in to tagmanager.google.com
2. Open your container
3. Click container ID (GTM-XXXXXXX) at top
4. Copy both code snippets

**Step 2: Install on Website**

**Snippet 1: Head Section**

Place immediately after `<head>`:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

**Snippet 2: Body Section**

Place immediately after `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**Complete HTML Example**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
  <!-- End Google Tag Manager -->
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- Your content -->
</body>
</html>
```

### GA4 Configuration Tag Setup

**Step 1: Create GA4 Configuration Tag**

1. GTM Workspace → Tags → New
2. Click "Tag Configuration"
3. Select "Google Tag"
4. Enter GA4 Measurement ID in "Tag ID" field
5. Configure settings (optional):
   - Configuration settings
   - Fields to set

**Step 2: Set Trigger**

1. Click "Triggering"
2. Select "Initialization - All Pages"
3. Save tag

**Tag Name**: "GA4 - Configuration" or "GA4 - Base Tag"

**Tag Configuration**:
```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Configuration Settings:
  - Allow Google Signals: true (optional)
  - Allow ad personalization signals: true (optional)
```

**Step 3: Test in Preview Mode**

1. Click "Preview" (top-right)
2. Connect to your website
3. Verify tag fires on Initialization
4. Check GA4 DebugView for events

**Step 4: Publish**

1. Click "Submit" (top-right)
2. Enter version name: "GA4 Initial Setup"
3. Add description
4. Click "Publish"

### GA4 Event Tag Setup

**Create Custom Event Tag**:

1. Tags → New
2. Tag Configuration → Google Tag
3. Tag ID: G-XXXXXXXXXX
4. Event Name: "button_click"
5. Event Parameters:
   - Parameter: button_name → Value: {{Click Text}}
   - Parameter: button_location → Value: "header"
6. Triggering: Click trigger
7. Save tag

### GTM Best Practices

**Tag Naming**:
- Use prefix: "GA4 - "
- Examples: "GA4 - Configuration", "GA4 - Purchase", "GA4 - Form Submit"

**Container Organization**:
- Folder for GA4 tags
- Folder for GA4 variables
- Clear naming conventions

**Testing Before Publishing**:
- Always use Preview mode
- Test all triggers
- Verify event parameters
- Check DebugView

## Installation Verification (All Methods)

### Quick Verification Steps

**Step 1: Enable Google Analytics Debugger**

1. Install "Google Analytics Debugger" Chrome extension
2. Enable extension
3. Visit your website

**Step 2: Check DebugView**

1. GA4 Property → Admin → DebugView
2. Select your device from dropdown
3. Confirm events appearing:
   - session_start
   - first_visit (if new user)
   - page_view

**Step 3: Check Realtime Reports**

1. GA4 Property → Reports → Realtime
2. Confirm showing 1+ active users
3. Verify events by name

**Step 4: Verify Event Parameters**

1. DebugView → Click event
2. Review parameters panel
3. Confirm all expected parameters present

## Troubleshooting Installation

### No Data Appearing

**Checklist**:
- [ ] Correct Measurement ID (G-XXXXXXXXXX)?
- [ ] Code in correct location (`<head>` for gtag/GTM)?
- [ ] Website published/live?
- [ ] Tracking code on all pages?
- [ ] Ad blockers disabled for testing?
- [ ] Waited 24 hours? (DebugView is instant, reports delayed)

**Solutions**:
1. Verify Measurement ID matches Data Stream
2. Check browser console for errors
3. Use Tag Assistant to diagnose
4. Test in incognito mode
5. Check if ad blocker blocking

### Data Only in DebugView

**Cause**: Debug mode parameter enabled

**Solution**:
- Remove `debug_mode: true` from events
- Disable Google Analytics Debugger extension
- GTM: Exit Preview mode
- Wait 24-48 hours for standard reports

### Duplicate Events

**Cause**: Multiple tracking implementations

**Solutions**:
1. Check for both gtag.js AND GTM (remove one)
2. Check for plugin AND manual code (remove one)
3. Verify not tracking to same ID twice
4. Check theme and plugins for conflicts

### Wrong Data Stream

**Symptoms**: Events appear but in wrong property/stream

**Solution**:
1. Verify Measurement ID
2. Check Data Streams list
3. Confirm using correct ID for platform
4. Update code with correct ID

## Migration from Universal Analytics

### Running Both UA and GA4

**Recommended**: Run both during transition period

**Implementation**:

**If using gtag.js**:
```html
<!-- Universal Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
  gtag('config', 'G-XXXXXXXXXX');  // GA4
</script>
```

**If using GTM**:
1. Keep existing UA tag
2. Add new GA4 Configuration tag
3. Both fire simultaneously
4. No conflicts between UA and GA4

## Additional Resources

- Official Google: Installation Guide
- Official Google: Verify Installation
- See verification-checklist.md for detailed testing procedures
- See ga4-gtm-integration skill for advanced GTM configurations
