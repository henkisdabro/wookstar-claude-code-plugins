# gtag.js Installation Guide

**Version:** GA4 (2025)
**Audience:** Developers implementing direct GA4 tracking
**Prerequisite:** GA4 property and web data stream created

---

## Overview

This guide provides complete step-by-step instructions for installing gtag.js tracking code on websites, including verification, troubleshooting, and platform-specific considerations.

---

## Prerequisites Checklist

Before installation, ensure:

- [ ] GA4 property created in Google Analytics
- [ ] Web data stream configured for your website
- [ ] Measurement ID obtained (format: `G-XXXXXXXXXX`)
- [ ] Access to website HTML source code or header/footer sections
- [ ] Ability to edit `<head>` section of web pages

---

## Step 1: Obtain Measurement ID

### Navigate to GA4 Data Streams

1. Log in to Google Analytics (analytics.google.com)
2. Navigate to **Admin** (gear icon, bottom left)
3. In **Property** column → **Data collection and modification** → **Data Streams**
4. Click on your **Web** data stream

### Copy Measurement ID

**Location:** Under "Stream details" section
**Format:** `G-XXXXXXXXXX` (10 alphanumeric characters after G-)
**Example:** `G-3K8Y9Z2L4M`

**Note:** Each data stream has a unique Measurement ID. Verify you're copying from the correct stream.

---

## Step 2: Copy Installation Code

### Option A: Copy from GA4 Interface

1. In Data Stream details → Click **"View tag instructions"**
2. Select **"Install manually"**
3. Copy entire code snippet (both `<script>` tags)

### Option B: Use Template Below

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

**Replace:** `G-XXXXXXXXXX` with your actual Measurement ID (appears twice)

---

## Step 3: Install Code on Website

### Placement: Critical Rule

**MUST:** Place immediately after opening `<head>` tag
**BEFORE:** All other scripts (except meta tags)
**REASON:** Ensures tracking initializes before any user interactions

### Correct Placement

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My Website</title>

  <!-- Google tag (gtag.js) - PLACE HERE -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <!-- End Google tag -->

  <!-- Other scripts below -->
  <link rel="stylesheet" href="styles.css">
  <script src="other-script.js"></script>
</head>
<body>
  <!-- Page content -->
</body>
</html>
```

### Install on All Pages

**Important:** gtag snippet must be on EVERY page you want to track

**Methods:**
- **Template-based sites:** Add to header template/include file
- **WordPress:** Add to theme's `header.php` or use plugin
- **Static sites:** Add to each HTML file
- **React/Vue/Angular:** Add to `index.html` or document head

---

## Step 4: Verification

### Method 1: Google Tag Assistant (Recommended)

**Chrome Extension:**
1. Install "Google Tag Assistant" from Chrome Web Store
2. Visit your website
3. Click extension icon
4. Look for: "Google Analytics: GA4" tag
5. Status should be: "Working" (green checkmark)

### Method 2: GA4 Realtime Reports

**In Google Analytics:**
1. Navigate to **Reports** → **Realtime**
2. Visit your website in another browser tab
3. Within 30 seconds, should see:
   - Active users: 1+
   - Event count by Event name: `page_view`, `session_start`, `first_visit`
4. Geographic data showing your location

**If no data:** Wait 2-3 minutes and refresh Realtime report

### Method 3: Browser Developer Console

**Chrome DevTools:**
1. Open website
2. Press F12 (or Cmd+Opt+I on Mac)
3. Go to **Network** tab
4. Filter by "google-analytics"
5. Refresh page
6. Look for requests to `https://www.google-analytics.com/g/collect`
7. Status should be: `204` (success)

**Check Request Payload:**
- Click on collect request
- View **Payload** tab
- Verify `en` (event name) = `page_view`
- Verify `tid` (tracking ID) = your Measurement ID

### Method 4: DebugView (Advanced)

**Enable Debug Mode:**
1. Install "Google Analytics Debugger" Chrome extension
2. Enable extension
3. Visit your website
4. In GA4: **Admin** → **DebugView**
5. Select your device from dropdown
6. View real-time events with full parameter details

**Events to Verify:**
- `session_start`
- `first_visit` (if first time visiting)
- `page_view`
- `user_engagement`

---

## Step 5: Test Enhanced Measurement (Optional)

If Enhanced Measurement enabled in GA4 Data Streams:

### Test Scroll Tracking
1. Visit long page
2. Scroll to 90% depth
3. Verify `scroll` event in Realtime or DebugView

### Test Outbound Click
1. Click link to external website
2. Verify `click` event with `outbound: true`

### Test File Download
1. Click link to PDF, XLSX, or other file
2. Verify `file_download` event

### Test Form Interaction
1. Interact with form field
2. Verify `form_start` event
3. Submit form
4. Verify `form_submit` event

---

## Platform-Specific Installation

### WordPress

**Method 1: Header/Footer Plugin**
1. Install "Insert Headers and Footers" plugin
2. Go to **Settings** → **Insert Headers and Footers**
3. Paste gtag snippet in "Scripts in Header" section
4. Save changes

**Method 2: Theme Functions**
1. Edit `functions.php` in child theme
2. Add:
```php
function add_ga4_tracking() {
  ?>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <?php
}
add_action('wp_head', 'add_ga4_tracking', 1);
```

**Method 3: GA4 Plugin**
- Install "GA4 WordPress Plugin" or similar
- Follow plugin configuration wizard

### Shopify

**Installation:**
1. Shopify Admin → **Online Store** → **Themes**
2. Click **Actions** → **Edit code**
3. Find `theme.liquid` file
4. Locate `<head>` tag
5. Paste gtag snippet immediately after `<head>`
6. Save

**Alternative:**
1. **Settings** → **Checkout**
2. Scroll to "Additional Scripts"
3. Paste gtag snippet (works only on checkout pages)

### Wix

**Installation:**
1. Wix Editor → Click **Settings** (gear icon)
2. **Tracking & Analytics** → **+ New Tool** → **Custom**
3. Paste gtag snippet
4. Set to load on "All Pages"
5. Save and publish

### Squarespace

**Installation:**
1. **Settings** → **Advanced** → **Code Injection**
2. Paste gtag snippet in **Header** section
3. Save

### React (Create React App)

**Installation:**
1. Edit `public/index.html`
2. Add gtag snippet to `<head>` section
3. For dynamic page tracking:

```javascript
// In App.js or routing component
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  return (
    // Your app
  );
}
```

### Next.js

**Installation:**
1. Create `_document.js` in `pages/` directory:

```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

2. For page tracking in `_app.js`:

```javascript
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('event', 'page_view', {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
```

### Vue.js

**Installation:**
1. Edit `public/index.html`
2. Add gtag snippet to `<head>`
3. For router tracking:

```javascript
// In router/index.js or main.js
import router from './router';

router.afterEach((to, from) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: to.meta.title || document.title
    });
  }
});
```

### Angular

**Installation:**
1. Edit `src/index.html`
2. Add gtag snippet to `<head>`
3. Create tracking service:

```typescript
// analytics.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
      });
    });
  }
}
```

---

## Troubleshooting

### No Data in GA4 Realtime

**Check:**
- [ ] Measurement ID correct (verify both occurrences)
- [ ] Code installed on all pages
- [ ] Code in `<head>` section, before other scripts
- [ ] No JavaScript errors (check browser console)
- [ ] Ad blockers disabled (can block GA4)
- [ ] Browser cache cleared

**Test:**
- Open website in incognito/private browsing
- Check Network tab for requests to google-analytics.com
- Verify status code 204 (success)

### Data Only in DebugView, Not in Reports

**Normal:** This is expected behavior
**Reason:** Standard reports have 24-48 hour processing delay
**Solution:** Use Realtime reports to verify current data

### Duplicate Events

**Cause:** Multiple gtag snippets on page
**Check:**
- Multiple installations in header/footer
- Plugin + manual installation
- Template includes gtag snippet twice

**Solution:** Remove all but one gtag implementation

### Events Firing Multiple Times

**Cause:** Single-page application re-running initialization
**Solution:**
- Initialize gtag only once
- Call `gtag('event')` on route changes, not `gtag('config')`

### Custom Events Not Appearing

**Cause:** Custom parameters not registered as custom dimensions
**Solution:**
1. Admin → Data Display → Custom Definitions
2. Create Custom Dimension
3. Map parameter name exactly (case-sensitive)
4. Wait 24-48 hours for data

---

## Post-Installation Checklist

- [ ] gtag snippet installed in `<head>` of all pages
- [ ] Measurement ID verified and correct
- [ ] Google Tag Assistant shows "Working" status
- [ ] Realtime report shows active users
- [ ] `page_view`, `session_start`, `first_visit` events firing
- [ ] Enhanced Measurement events enabled and verified (if applicable)
- [ ] No JavaScript console errors
- [ ] No duplicate event tracking
- [ ] DebugView accessible and showing events
- [ ] Custom events tested (if implemented)

---

## Next Steps

After successful installation:

1. **Configure Enhanced Measurement**
   - Admin → Data Streams → Web Stream → Enhanced measurement
   - Enable desired automatic events

2. **Implement Custom Events**
   - Add gtag('event') calls for business-specific tracking
   - Refer to ga4-recommended-events skill for best practices

3. **Set Up Custom Dimensions**
   - Register custom parameters in GA4 Admin
   - Wait 24-48 hours for data to populate

4. **Configure Data Retention**
   - Admin → Data Settings → Data Retention
   - Set to 14 months (recommended)

5. **Review Privacy Settings**
   - Implement Consent Mode if required
   - Configure data sharing settings

---

## Additional Resources

**GA4 Skills:**
- **ga4-setup** - Initial property configuration
- **ga4-events-fundamentals** - Understanding event structure
- **ga4-recommended-events** - Implementing standard events
- **ga4-debugview** - Advanced testing and validation

**Official Documentation:**
- Google Tag Platform: developers.google.com/tag-platform/gtagjs
- GA4 Setup Guide: developers.google.com/analytics/devguides/collection/ga4

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Maintained By:** GA4 Skills Repository
