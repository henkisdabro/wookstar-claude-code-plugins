# Data Layer for Single-Page Applications (SPAs)

**Source**: https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
**Last Updated**: 2025-01-09

## Overview

Single-Page Applications (SPAs) are websites that load an HTML document once and fetch additional content using JavaScript APIs. Unlike traditional multi-page applications, SPAs require special handling for tracking page views and user interactions because the browser doesn't reload the page when users navigate between different screens.

The key challenge with SPAs is that traditional page view tracking relies on full page loads, but in SPAs, navigation happens dynamically without triggering a new page load event.

## Why SPAs Require Special Treatment

### Traditional vs SPA Page Loads

**Traditional Website:**
- User clicks a link
- Browser requests a new HTML document
- Page fully reloads
- Analytics tags fire automatically on load

**Single-Page Application:**
- User clicks a link
- JavaScript updates the DOM
- URL may change (via History API)
- No page reload occurs
- Analytics tags don't automatically fire

### Key Measurement Goals

To accurately track SPAs, you need to:

1. **Count page views for each screen** a user interacts with
2. **Track the page referrer correctly** to trace the user journey
3. **Maintain proper event sequencing** as users navigate
4. **Clear previous page data** to avoid data carryover
5. **Update page-specific parameters** for each virtual page view

## Implementation Methods

### Method 1: Browser History Changes (Recommended)

Use this method if your SPA uses the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History), specifically the `pushState()` and `replaceState()` methods to update screens.

#### How It Works

GTM's **History Change trigger** listens for:
- Changes to the URL fragment (hash)
- Calls to `history.pushState()`
- Calls to `history.replaceState()`
- Browser back/forward button clicks (`popstate` event)

#### GTM Setup

1. **Enable Built-in History Variables** in GTM:
   - History Old URL Fragment
   - History New URL Fragment
   - History Old State
   - History New State
   - History Source (pushState, replaceState, popstate, or hashchange)

2. **Create a History Change Trigger:**
   - Go to Triggers > New
   - Choose "History Change" as trigger type
   - Configure any additional filters if needed
   - This trigger fires whenever the URL changes without a page reload

3. **Create a Virtual Page View Tag:**
   - Create a GA4 Event tag
   - Event Name: `page_view`
   - Set to fire on the History Change trigger
   - Configure page parameters (page_location, page_title, etc.)

#### Example Implementation

```javascript
// Your SPA framework (e.g., React Router) handles navigation
// It uses pushState internally:
history.pushState({ page: 'products' }, 'Products', '/products');

// GTM's History Change trigger automatically detects this
// and fires your configured tags
```

#### Data Layer Push Pattern

When using History Change triggers, push updated page data to the data layer:

```javascript
// Clear previous page data and push new page data
window.dataLayer.push({
  event: 'virtual_pageview',
  page_path: '/new-page',
  page_title: 'New Page Title',
  page_location: window.location.href,
  // Clear previous page-scoped variables
  previous_page_data: undefined,
  transaction_id: undefined  // Clear transaction-specific data
});
```

### Method 2: Custom Events

Use this method if your website uses the [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) object to render different screens, or if you need more control over when virtual page views fire.

#### How It Works

You manually push custom events to the data layer when screen changes occur, rather than relying on automatic History API detection.

#### Implementation

```javascript
// In your SPA's route change handler
function onRouteChange(newRoute) {
  // Update the DOM with new content
  updateContent(newRoute);

  // Push virtual pageview to data layer
  window.dataLayer.push({
    event: 'virtual_pageview',
    page_path: newRoute.path,
    page_title: newRoute.title,
    page_location: window.location.href
  });
}
```

#### GTM Setup

1. **Create a Custom Event Trigger:**
   - Go to Triggers > New
   - Choose "Custom Event" as trigger type
   - Event name: `virtual_pageview`

2. **Create Variables for Page Data:**
   - Data Layer Variable for `page_path`
   - Data Layer Variable for `page_title`
   - Data Layer Variable for `page_location`

3. **Create a GA4 Event Tag:**
   - Event Name: `page_view`
   - Add event parameters using the variables created above
   - Set to fire on the Custom Event trigger

## Data Layer Clearing Best Practices

### Why Clear Data

In SPAs, data persists in the data layer until explicitly cleared. This can cause:
- Transaction data appearing on non-transaction pages
- User data from one session bleeding into another
- Incorrect attribution of events to pages

### What to Clear

**Page-Scoped Data** (clear on every virtual pageview):
- `page_title`
- `page_path`
- `page_category`
- Custom page dimensions

**Event-Scoped Data** (clear after the event fires):
- `transaction_id`
- `ecommerce` objects
- Form submission data
- Click data

**Persistent Data** (keep across page views):
- `user_id`
- `user_type`
- Session-level dimensions

### Clearing Pattern

```javascript
// Pattern 1: Clear and set in separate pushes
dataLayer.push(function() {
  this.reset();  // Clear all data layer state
});

dataLayer.push({
  event: 'virtual_pageview',
  page_title: 'New Page',
  page_path: '/new-page'
});

// Pattern 2: Clear and set in one push (set to undefined)
dataLayer.push({
  event: 'virtual_pageview',
  // Clear previous values
  transaction_id: undefined,
  ecommerce: undefined,
  form_id: undefined,
  // Set new values
  page_title: 'New Page',
  page_path: '/new-page'
});
```

## Framework-Specific Implementation

### React with React Router

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Clear previous page data
    window.dataLayer.push({
      event: 'virtual_pageview',
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      // Clear event-scoped data
      transaction_id: undefined,
      ecommerce: undefined
    });
  }, [location]);

  return null;
}

export default Analytics;
```

### Vue.js with Vue Router

```javascript
// In your main.js or router configuration
import router from './router';

router.afterEach((to, from) => {
  window.dataLayer.push({
    event: 'virtual_pageview',
    page_path: to.path,
    page_title: to.meta.title || document.title,
    page_location: window.location.href,
    // Clear event-scoped data
    transaction_id: undefined,
    ecommerce: undefined
  });
});
```

### Angular with Angular Router

```typescript
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export class AppComponent {
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      window.dataLayer.push({
        event: 'virtual_pageview',
        page_path: event.urlAfterRedirects,
        page_title: document.title,
        page_location: window.location.href,
        // Clear event-scoped data
        transaction_id: undefined,
        ecommerce: undefined
      });
    });
  }
}
```

### Next.js

```javascript
// In pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer.push({
        event: 'virtual_pageview',
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
        // Clear event-scoped data
        transaction_id: undefined,
        ecommerce: undefined
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

## Testing and Debugging SPAs

### Preview Mode in GTM

1. **Enable Preview Mode** in your GTM container
2. Navigate through your SPA
3. Watch for:
   - History Change events firing
   - Custom Event triggers activating
   - Data layer state changes
   - Tag firing sequence

### Debug Console Checklist

For each virtual page view, verify:

- [ ] `page_view` event fires
- [ ] `page_location` updates correctly
- [ ] `page_title` reflects the new screen
- [ ] Previous page's `page_location` becomes current `page_referrer`
- [ ] Event-scoped data is cleared
- [ ] User/session data persists

### DebugView in GA4

1. **Enable Debug Mode** in GTM tags:
   ```javascript
   // Add to your data layer push
   window.dataLayer.push({
     event: 'virtual_pageview',
     debug_mode: true,
     // ... other parameters
   });
   ```

2. **Navigate through your SPA**

3. **Check in GA4 DebugView:**
   - Each screen change should create a new `page_view` event
   - Event parameters should update correctly
   - Event sequence should match user journey

### Common SPA Pitfalls

#### 1. Data Carryover

**Problem:** Transaction data appears on non-checkout pages

**Solution:**
```javascript
// Always clear ecommerce data after it's sent
dataLayer.push({
  event: 'purchase',
  ecommerce: { /* purchase data */ }
});

// On next page view, clear it
dataLayer.push({
  event: 'virtual_pageview',
  ecommerce: undefined,  // Explicitly clear
  transaction_id: undefined
});
```

#### 2. Missing Virtual Pageviews

**Problem:** Some navigation doesn't trigger page views

**Solution:** Ensure all route changes push to data layer, including:
- Back/forward button navigation
- Hash changes
- Modal/dialog state changes (if tracking as pages)

#### 3. Duplicate Page Views

**Problem:** Both real and virtual page views fire

**Solution:**
```javascript
// Block the initial page_view from GA4 Config tag
// Use a Pageview trigger with "Fire on DOM Ready" exception
// Or configure GA4 tag to not send page_view on initial load
```

#### 4. Incorrect Referrer

**Problem:** `page_referrer` doesn't reflect previous virtual page

**Solution:** GTM automatically handles this when using History Change triggers. For custom events, ensure you're not manually setting `page_referrer`.

## Advanced Patterns

### Conditional Virtual Pageviews

Only track certain route changes:

```javascript
function shouldTrackPageview(newRoute) {
  // Don't track hash-only changes
  if (newRoute.startsWith('#')) return false;

  // Don't track query parameter-only changes
  if (isSamePath(currentRoute, newRoute)) return false;

  return true;
}

if (shouldTrackPageview(newRoute)) {
  dataLayer.push({
    event: 'virtual_pageview',
    page_path: newRoute
  });
}
```

### Enhanced Virtual Pageview Data

Include additional context with virtual pageviews:

```javascript
dataLayer.push({
  event: 'virtual_pageview',
  page_path: '/products/category/shoes',
  page_title: 'Shoes - Products',
  page_location: window.location.href,
  // Additional context
  page_category: 'Products',
  page_subcategory: 'Shoes',
  content_group: 'Product Listing',
  user_journey_step: 'Browse',
  spa_route_type: 'category_page'
});
```

## Verification Checklist

Before deploying your SPA tracking:

- [ ] History Change trigger configured (if using History API)
- [ ] Custom Event trigger configured (if using custom events)
- [ ] Data Layer Variables created for page parameters
- [ ] GA4 Event tag configured with `page_view` event
- [ ] Initial page load tracked correctly
- [ ] All navigation types trigger virtual pageviews:
  - [ ] Forward navigation
  - [ ] Back button
  - [ ] Direct URL changes
  - [ ] Hash changes (if applicable)
- [ ] Data clearing implemented for:
  - [ ] Transaction data
  - [ ] Event-scoped variables
  - [ ] Page-scoped variables
- [ ] Tested in Preview Mode
- [ ] Verified in GA4 DebugView
- [ ] Event sequence matches user journey
- [ ] Page referrer updates correctly

## Resources

- [Google Analytics: Measure Single-Page Applications](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [GTM History Change Trigger](https://support.google.com/tagmanager/answer/7679322)
- [GTM Built-in Variables for Web](https://support.google.com/tagmanager/answer/7182738)
- [History API Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/History)
- [Single-Page Applications (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/SPA)
