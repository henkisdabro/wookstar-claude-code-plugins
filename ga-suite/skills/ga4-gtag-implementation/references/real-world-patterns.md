# Real-World gtag.js Implementation Patterns

**Version:** GA4 (2025)
**Focus:** Production-ready code examples for common tracking scenarios
**Audience:** Developers implementing GA4 tracking

---

## Overview

This document provides battle-tested implementation patterns for common tracking scenarios. All examples are production-ready and include error handling, edge case management, and performance optimizations.

---

## Pattern 1: Form Submission Tracking

### Basic Contact Form

**Scenario:** Track contact form submissions with form details

```html
<form id="contact-form" action="/submit" method="POST">
  <input type="email" name="email" id="email" required>
  <input type="text" name="company" id="company" required>
  <select name="inquiry-type" id="inquiry-type">
    <option value="sales">Sales</option>
    <option value="support">Support</option>
    <option value="other">Other</option>
  </select>
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();  // Prevent immediate submission

  // Gather form data
  const email = document.getElementById('email').value;
  const company = document.getElementById('company').value;
  const inquiryType = document.getElementById('inquiry-type').value;

  // Extract email domain
  const emailDomain = email.split('@')[1];

  // Send GA4 event
  gtag('event', 'form_submit', {
    'form_name': 'Contact Form',
    'form_id': 'contact-form',
    'form_destination': '/thank-you',
    'inquiry_type': inquiryType,
    'email_domain': emailDomain,  // Not PII - just domain
    'company_provided': company ? 'yes' : 'no'
  });

  // Small delay ensures event is sent
  setTimeout(() => {
    this.submit();
  }, 100);
});
</script>
```

### Multi-Step Form with Progress Tracking

**Scenario:** Track progression through multi-step form

```javascript
// Track form step completion
function trackFormStep(stepNumber, stepName) {
  gtag('event', 'form_step_complete', {
    'form_name': 'Registration Form',
    'step_number': stepNumber,
    'step_name': stepName,
    'total_steps': 4
  });
}

// Track form abandonment
window.addEventListener('beforeunload', function(e) {
  const currentStep = getCurrentFormStep();  // Your function
  if (currentStep < 4) {  // Not completed
    gtag('event', 'form_abandoned', {
      'form_name': 'Registration Form',
      'abandoned_at_step': currentStep,
      'total_steps': 4
    });
  }
});

// Usage
document.getElementById('step1-next').addEventListener('click', function() {
  trackFormStep(1, 'Personal Info');
});

document.getElementById('step2-next').addEventListener('click', function() {
  trackFormStep(2, 'Company Info');
});
```

---

## Pattern 2: Ecommerce Product Tracking

### Product Page View

**Scenario:** Track product page views with full product details

```javascript
// Get product data from page (common patterns)
const productData = {
  id: document.querySelector('[data-product-id]')?.textContent,
  name: document.querySelector('.product-title')?.textContent,
  price: parseFloat(document.querySelector('.product-price')?.textContent.replace(/[^0-9.]/g, '')),
  category: document.querySelector('[data-category]')?.textContent,
  brand: document.querySelector('[data-brand]')?.textContent,
  variant: document.querySelector('.variant-selected')?.textContent
};

// Validate data exists
if (productData.id && productData.name) {
  gtag('event', 'view_item', {
    'items': [{
      'item_id': productData.id,
      'item_name': productData.name,
      'item_category': productData.category || 'Unknown',
      'item_brand': productData.brand || '',
      'item_variant': productData.variant || '',
      'price': productData.price || 0,
      'quantity': 1
    }],
    'value': productData.price || 0,
    'currency': 'USD'
  });
}
```

### Add to Cart Tracking

**Scenario:** Track add to cart with quantity and variant selection

```javascript
function trackAddToCart(productId, productName, quantity, price, variant) {
  // Validate required fields
  if (!productId || !productName) {
    console.warn('Missing required product data for add_to_cart event');
    return;
  }

  gtag('event', 'add_to_cart', {
    'items': [{
      'item_id': productId,
      'item_name': productName,
      'item_variant': variant || '',
      'price': price || 0,
      'quantity': quantity || 1
    }],
    'value': (price || 0) * (quantity || 1),
    'currency': 'USD'
  });
}

// Usage with Add to Cart button
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
  const product = getProductDetails();  // Your function to get product data
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  trackAddToCart(
    product.id,
    product.name,
    quantity,
    product.price,
    product.variant
  );
});
```

### Complete Purchase Tracking

**Scenario:** Track purchase on order confirmation page

```javascript
// On order confirmation page - get data from page or backend
const orderData = {
  transactionId: document.querySelector('[data-transaction-id]')?.textContent,
  totalValue: parseFloat(document.querySelector('[data-total]')?.textContent.replace(/[^0-9.]/g, '')),
  tax: parseFloat(document.querySelector('[data-tax]')?.textContent.replace(/[^0-9.]/g, '')),
  shipping: parseFloat(document.querySelector('[data-shipping]')?.textContent.replace(/[^0-9.]/g, '')),
  couponCode: document.querySelector('[data-coupon]')?.textContent || ''
};

// Get purchased items from data attributes or JavaScript object
const purchasedItems = [];
document.querySelectorAll('[data-order-item]').forEach(function(item) {
  purchasedItems.push({
    'item_id': item.getAttribute('data-item-id'),
    'item_name': item.getAttribute('data-item-name'),
    'price': parseFloat(item.getAttribute('data-item-price')),
    'quantity': parseInt(item.getAttribute('data-item-quantity')),
    'item_category': item.getAttribute('data-item-category') || ''
  });
});

// Send purchase event (only if transaction ID exists)
if (orderData.transactionId && purchasedItems.length > 0) {
  gtag('event', 'purchase', {
    'transaction_id': orderData.transactionId,
    'affiliation': 'Online Store',
    'value': orderData.totalValue,
    'currency': 'USD',
    'tax': orderData.tax || 0,
    'shipping': orderData.shipping || 0,
    'coupon': orderData.couponCode,
    'items': purchasedItems
  });
}
```

### Begin Checkout Tracking

**Scenario:** Track when user starts checkout process

```javascript
// On checkout page load or when checkout button clicked
function trackBeginCheckout(cartItems, cartTotal, coupon) {
  const items = cartItems.map(item => ({
    'item_id': item.id,
    'item_name': item.name,
    'price': item.price,
    'quantity': item.quantity,
    'item_category': item.category || ''
  }));

  gtag('event', 'begin_checkout', {
    'items': items,
    'value': cartTotal,
    'currency': 'USD',
    'coupon': coupon || ''
  });
}

// Usage on checkout page load
window.addEventListener('DOMContentLoaded', function() {
  const cart = getCartContents();  // Your function
  if (cart && cart.items.length > 0) {
    trackBeginCheckout(cart.items, cart.total, cart.couponCode);
  }
});
```

---

## Pattern 3: User Authentication Tracking

### Login Event

**Scenario:** Track successful user login with method

```javascript
function trackLogin(userId, loginMethod) {
  // Set User ID (important for cross-device tracking)
  gtag('set', {
    'user_id': 'user_' + userId
  });

  // Send login event
  gtag('event', 'login', {
    'method': loginMethod  // 'email', 'google', 'facebook', etc.
  });
}

// Usage after successful authentication
// Example: Email/password login
loginWithEmail(email, password).then(user => {
  trackLogin(user.id, 'email');
  redirectToAccount();
});

// Example: Google OAuth
signInWithGoogle().then(user => {
  trackLogin(user.id, 'google');
  redirectToAccount();
});
```

### Sign Up Event

**Scenario:** Track new user registration

```javascript
function trackSignUp(userId, signUpMethod, userTier) {
  // Set User ID
  gtag('set', {
    'user_id': 'user_' + userId
  });

  // Set user properties
  gtag('set', {
    'subscription_tier': userTier || 'free',
    'signup_date': new Date().toISOString().split('T')[0]
  });

  // Send sign_up event
  gtag('event', 'sign_up', {
    'method': signUpMethod  // 'email', 'social'
  });
}

// Usage after successful registration
registerUser(userData).then(user => {
  trackSignUp(user.id, 'email', user.tier);
  showWelcomeMessage();
});
```

### Logout Event

**Scenario:** Clear User ID and track logout

```javascript
function trackLogout() {
  // Send custom logout event
  gtag('event', 'logout');

  // CRITICAL: Clear User ID with null (not empty string)
  gtag('set', {
    'user_id': null
  });

  // Also clear any user properties
  gtag('set', {
    'subscription_tier': null,
    'customer_segment': null
  });
}

// Usage on logout button click
document.getElementById('logout-btn').addEventListener('click', function() {
  trackLogout();
  performLogout();  // Your logout function
});
```

---

## Pattern 4: Single-Page Application (SPA) Tracking

### React Router Page Tracking

**Scenario:** Track page views in React SPA

```javascript
// In App.js or routing component
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Send page_view on route change
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  return (
    <Router>
      {/* Your routes */}
    </Router>
  );
}
```

### Vue Router Page Tracking

**Scenario:** Track page views in Vue SPA

```javascript
// In router/index.js
import router from './router';

router.afterEach((to, from) => {
  // Send page_view after navigation
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: to.meta.title || document.title,
      page_location: window.location.href
    });
  }
});
```

### Virtual Page View Pattern

**Scenario:** Track modal/overlay views as virtual pages

```javascript
function trackVirtualPageView(virtualPath, virtualTitle) {
  gtag('event', 'page_view', {
    page_path: virtualPath,
    page_title: virtualTitle,
    page_location: window.location.href + virtualPath
  });
}

// Usage when opening modal
function openPricingModal() {
  showModal('pricing-modal');  // Your function
  trackVirtualPageView('/virtual/pricing-modal', 'Pricing Details');
}

// Usage when changing tab
document.querySelectorAll('.tab-link').forEach(tab => {
  tab.addEventListener('click', function() {
    const tabName = this.getAttribute('data-tab');
    trackVirtualPageView('/virtual/tab-' + tabName, 'Tab: ' + tabName);
  });
});
```

---

## Pattern 5: Video Engagement Tracking

### YouTube Video Tracking

**Scenario:** Track YouTube video engagement (start, progress, complete)

```javascript
// For embedded YouTube videos with JS API
let player;
let videoTracked = {
  started: false,
  progress25: false,
  progress50: false,
  progress75: false,
  completed: false
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    videoId: 'VIDEO_ID',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  const videoData = player.getVideoData();
  const videoTitle = videoData.title;
  const videoDuration = player.getDuration();

  // Video started
  if (event.data === YT.PlayerState.PLAYING && !videoTracked.started) {
    gtag('event', 'video_start', {
      'video_title': videoTitle,
      'video_provider': 'youtube',
      'video_duration': Math.round(videoDuration)
    });
    videoTracked.started = true;

    // Set up progress tracking
    startProgressTracking();
  }

  // Video ended
  if (event.data === YT.PlayerState.ENDED && !videoTracked.completed) {
    gtag('event', 'video_complete', {
      'video_title': videoTitle,
      'video_provider': 'youtube',
      'video_percent': 100
    });
    videoTracked.completed = true;
  }
}

function startProgressTracking() {
  const checkProgress = setInterval(() => {
    if (!player || player.getPlayerState() !== YT.PlayerState.PLAYING) {
      clearInterval(checkProgress);
      return;
    }

    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const percent = (currentTime / duration) * 100;
    const videoTitle = player.getVideoData().title;

    // Track 25% milestone
    if (percent >= 25 && !videoTracked.progress25) {
      gtag('event', 'video_progress', {
        'video_title': videoTitle,
        'video_provider': 'youtube',
        'video_percent': 25
      });
      videoTracked.progress25 = true;
    }

    // Track 50% milestone
    if (percent >= 50 && !videoTracked.progress50) {
      gtag('event', 'video_progress', {
        'video_title': videoTitle,
        'video_provider': 'youtube',
        'video_percent': 50
      });
      videoTracked.progress50 = true;
    }

    // Track 75% milestone
    if (percent >= 75 && !videoTracked.progress75) {
      gtag('event', 'video_progress', {
        'video_title': videoTitle,
        'video_provider': 'youtube',
        'video_percent': 75
      });
      videoTracked.progress75 = true;
    }
  }, 1000);
}
```

### HTML5 Video Tracking

**Scenario:** Track native HTML5 video engagement

```javascript
const video = document.getElementById('my-video');
const videoTracked = {
  started: false,
  progress25: false,
  progress50: false,
  progress75: false,
  completed: false
};

// Video started
video.addEventListener('play', function() {
  if (!videoTracked.started) {
    gtag('event', 'video_start', {
      'video_title': this.getAttribute('data-video-title') || 'Untitled Video',
      'video_provider': 'html5',
      'video_duration': Math.round(this.duration)
    });
    videoTracked.started = true;
  }
});

// Track progress
video.addEventListener('timeupdate', function() {
  const percent = (this.currentTime / this.duration) * 100;
  const videoTitle = this.getAttribute('data-video-title') || 'Untitled Video';

  if (percent >= 25 && !videoTracked.progress25) {
    gtag('event', 'video_progress', {
      'video_title': videoTitle,
      'video_provider': 'html5',
      'video_percent': 25
    });
    videoTracked.progress25 = true;
  }

  if (percent >= 50 && !videoTracked.progress50) {
    gtag('event', 'video_progress', {
      'video_title': videoTitle,
      'video_provider': 'html5',
      'video_percent': 50
    });
    videoTracked.progress50 = true;
  }

  if (percent >= 75 && !videoTracked.progress75) {
    gtag('event', 'video_progress', {
      'video_title': videoTitle,
      'video_provider': 'html5',
      'video_percent': 75
    });
    videoTracked.progress75 = true;
  }
});

// Video completed
video.addEventListener('ended', function() {
  if (!videoTracked.completed) {
    gtag('event', 'video_complete', {
      'video_title': this.getAttribute('data-video-title') || 'Untitled Video',
      'video_provider': 'html5',
      'video_percent': 100
    });
    videoTracked.completed = true;
  }
});
```

---

## Pattern 6: Search Tracking

### Site Search Tracking

**Scenario:** Track internal site search queries and results

```javascript
// Track search when performed
function trackSearch(searchTerm, numberOfResults) {
  gtag('event', 'search', {
    'search_term': searchTerm,
    'number_of_results': numberOfResults || 0
  });
}

// Usage with search form
document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const searchTerm = document.getElementById('search-input').value;
  performSearch(searchTerm).then(results => {
    trackSearch(searchTerm, results.length);
    displayResults(results);
  });
});

// Track search result click
function trackSearchResultClick(searchTerm, resultPosition, resultTitle) {
  gtag('event', 'select_content', {
    'content_type': 'search_result',
    'search_term': searchTerm,
    'content_position': resultPosition,
    'content_title': resultTitle
  });
}

// Usage
document.querySelectorAll('.search-result').forEach((result, index) => {
  result.addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value;
    const resultTitle = this.querySelector('.result-title').textContent;
    trackSearchResultClick(searchTerm, index + 1, resultTitle);
  });
});
```

---

## Pattern 7: Engagement Tracking

### Scroll Depth Tracking (Custom)

**Scenario:** Track custom scroll milestones beyond Enhanced Measurement

```javascript
const scrollTracked = {
  25: false,
  50: false,
  75: false,
  90: false
};

window.addEventListener('scroll', debounce(function() {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

  Object.keys(scrollTracked).forEach(threshold => {
    if (scrollPercent >= parseInt(threshold) && !scrollTracked[threshold]) {
      gtag('event', 'scroll_milestone', {
        'scroll_depth': parseInt(threshold),
        'page_path': window.location.pathname
      });
      scrollTracked[threshold] = true;
    }
  });
}, 500));

// Debounce function to limit event firing
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}
```

### Time on Page Tracking

**Scenario:** Track engaged time on page

```javascript
let engagementStartTime = Date.now();
let totalEngagementTime = 0;
let isEngaged = true;

// Track engagement time when user leaves page
window.addEventListener('beforeunload', function() {
  if (isEngaged) {
    totalEngagementTime += Date.now() - engagementStartTime;
  }

  const timeOnPage = Math.round(totalEngagementTime / 1000);  // Convert to seconds

  if (timeOnPage > 0) {
    gtag('event', 'page_engagement', {
      'engagement_time': timeOnPage,
      'page_path': window.location.pathname
    });
  }
});

// Pause tracking when page not visible
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    if (isEngaged) {
      totalEngagementTime += Date.now() - engagementStartTime;
      isEngaged = false;
    }
  } else {
    isEngaged = true;
    engagementStartTime = Date.now();
  }
});
```

---

## Pattern 8: Error Tracking

### JavaScript Error Tracking

**Scenario:** Track client-side JavaScript errors

```javascript
window.addEventListener('error', function(event) {
  gtag('event', 'exception', {
    'description': event.message,
    'fatal': false,
    'error_location': event.filename + ':' + event.lineno + ':' + event.colno
  });
});

// Track unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  gtag('event', 'exception', {
    'description': 'Unhandled Promise: ' + event.reason,
    'fatal': false
  });
});
```

---

## Best Practices for All Patterns

**1. Validate Data Before Tracking**
```javascript
if (productId && productName) {
  gtag('event', 'view_item', { ... });
} else {
  console.warn('Missing required product data');
}
```

**2. Handle Async Operations**
```javascript
// For operations that redirect/navigate
setTimeout(() => {
  window.location.href = '/redirect';
}, 100);
```

**3. Debounce High-Frequency Events**
```javascript
const trackScrollDebounced = debounce(() => {
  gtag('event', 'scroll_milestone', { ... });
}, 500);
```

**4. Use Consistent Naming**
```javascript
// Good: snake_case, descriptive
'form_submit', 'video_complete', 'product_view'

// Bad: inconsistent, unclear
'formSubmit', 'videoEnd', 'pv'
```

**5. Include Context Parameters**
```javascript
gtag('event', 'button_click', {
  'button_name': 'Subscribe',
  'button_location': 'header',  // Context
  'user_authenticated': isLoggedIn() ? 'yes' : 'no'  // Context
});
```

---

## Common Pitfalls to Avoid

❌ **Calling gtag() before initialization**
✅ Always check `if (window.gtag)` before calling

❌ **Using empty string to clear User ID**
✅ Always use `null`: `gtag('set', {'user_id': null})`

❌ **Sending PII in parameters**
✅ Extract domain from email, use hashed IDs

❌ **Not handling errors**
✅ Wrap in try-catch, validate data

❌ **Tracking every scroll or mouse move**
✅ Debounce, use meaningful milestones

---

**Document Version:** 1.0
**Last Updated:** November 2025
**Maintained By:** GA4 Skills Repository
