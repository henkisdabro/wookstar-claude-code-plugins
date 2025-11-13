/**
 * GA4 gtag.js Common Implementation Patterns
 *
 * Version: 1.0
 * Last Updated: November 2025
 * Maintained By: GA4 Skills Repository
 *
 * This file contains production-ready gtag.js patterns for common tracking scenarios.
 * Copy and adapt these patterns to your specific needs.
 *
 * PREREQUISITES:
 * - gtag.js snippet installed in <head> section
 * - Measurement ID configured
 * - Custom parameters registered as custom dimensions in GA4 Admin
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit event firing frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safe gtag event wrapper with error handling
 * @param {string} eventName - GA4 event name
 * @param {object} eventParams - Event parameters
 */
function safeGtagEvent(eventName, eventParams = {}) {
  try {
    if (window.gtag && typeof window.gtag === 'function') {
      gtag('event', eventName, eventParams);
    } else {
      console.warn('gtag not loaded');
    }
  } catch (error) {
    console.error('gtag error:', error);
  }
}

// ============================================
// PATTERN 1: FORM TRACKING
// ============================================

/**
 * Track form submission with form details
 * @param {HTMLFormElement} formElement - The form element
 * @param {object} options - Additional tracking options
 */
function trackFormSubmit(formElement, options = {}) {
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
      form_name: options.formName || formElement.getAttribute('name') || 'Unnamed Form',
      form_id: formElement.id || '',
      form_destination: formElement.getAttribute('action') || ''
    };

    // Extract email domain if email field exists (not PII)
    const emailField = formElement.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      formData.email_domain = emailField.value.split('@')[1];
    }

    // Add custom parameters
    if (options.customParams) {
      Object.assign(formData, options.customParams);
    }

    // Send event
    safeGtagEvent('form_submit', formData);

    // Submit form after short delay
    setTimeout(() => {
      formElement.submit();
    }, options.delay || 100);
  });
}

// Usage Example:
/*
trackFormSubmit(document.getElementById('contact-form'), {
  formName: 'Contact Form',
  customParams: {
    form_type: 'lead_generation'
  }
});
*/

// ============================================
// PATTERN 2: ECOMMERCE TRACKING
// ============================================

/**
 * Track product view
 * @param {object} product - Product details
 */
function trackProductView(product) {
  if (!product.id && !product.name) {
    console.warn('Product ID or name required for view_item event');
    return;
  }

  safeGtagEvent('view_item', {
    items: [{
      item_id: product.id || '',
      item_name: product.name || '',
      item_category: product.category || '',
      item_brand: product.brand || '',
      item_variant: product.variant || '',
      price: product.price || 0,
      quantity: 1
    }],
    value: product.price || 0,
    currency: product.currency || 'USD'
  });
}

/**
 * Track add to cart
 * @param {object} product - Product details
 * @param {number} quantity - Quantity added
 */
function trackAddToCart(product, quantity = 1) {
  if (!product.id && !product.name) {
    console.warn('Product ID or name required for add_to_cart event');
    return;
  }

  const itemValue = (product.price || 0) * quantity;

  safeGtagEvent('add_to_cart', {
    items: [{
      item_id: product.id || '',
      item_name: product.name || '',
      price: product.price || 0,
      quantity: quantity
    }],
    value: itemValue,
    currency: product.currency || 'USD'
  });
}

/**
 * Track purchase completion
 * @param {object} transaction - Transaction details
 * @param {array} items - Array of purchased items
 */
function trackPurchase(transaction, items) {
  if (!transaction.transaction_id) {
    console.error('transaction_id required for purchase event');
    return;
  }

  if (!items || items.length === 0) {
    console.warn('No items in purchase event');
    return;
  }

  safeGtagEvent('purchase', {
    transaction_id: transaction.transaction_id,
    affiliation: transaction.affiliation || '',
    value: transaction.value,
    currency: transaction.currency || 'USD',
    tax: transaction.tax || 0,
    shipping: transaction.shipping || 0,
    coupon: transaction.coupon || '',
    items: items.map(item => ({
      item_id: item.id || '',
      item_name: item.name || '',
      price: item.price || 0,
      quantity: item.quantity || 1,
      item_category: item.category || ''
    }))
  });
}

/**
 * Track begin checkout
 * @param {array} cartItems - Array of cart items
 * @param {number} cartTotal - Total cart value
 * @param {string} coupon - Applied coupon code
 */
function trackBeginCheckout(cartItems, cartTotal, coupon = '') {
  const items = cartItems.map(item => ({
    item_id: item.id || '',
    item_name: item.name || '',
    price: item.price || 0,
    quantity: item.quantity || 1
  }));

  safeGtagEvent('begin_checkout', {
    items: items,
    value: cartTotal,
    currency: 'USD',
    coupon: coupon
  });
}

// Usage Example:
/*
trackProductView({
  id: 'SKU_123',
  name: 'Premium Widget',
  category: 'Widgets',
  price: 99.99
});

trackAddToCart({
  id: 'SKU_123',
  name: 'Premium Widget',
  price: 99.99
}, 2);

trackPurchase(
  {
    transaction_id: 'TXN_' + Date.now(),
    value: 129.98,
    tax: 10.00,
    shipping: 5.00,
    coupon: 'SAVE10'
  },
  [
    { id: 'SKU_123', name: 'Product A', price: 99.99, quantity: 1 },
    { id: 'SKU_456', name: 'Product B', price: 29.99, quantity: 1 }
  ]
);
*/

// ============================================
// PATTERN 3: USER AUTHENTICATION
// ============================================

/**
 * Track user login
 * @param {string} userId - User ID (not PII)
 * @param {string} loginMethod - Login method (email, google, facebook, etc.)
 */
function trackLogin(userId, loginMethod) {
  if (!userId) {
    console.warn('User ID required for login tracking');
    return;
  }

  // Set User ID for cross-device tracking
  gtag('set', {
    user_id: 'user_' + userId
  });

  // Send login event
  safeGtagEvent('login', {
    method: loginMethod
  });
}

/**
 * Track user sign up
 * @param {string} userId - User ID (not PII)
 * @param {string} signUpMethod - Sign up method
 * @param {object} userProperties - User properties to set
 */
function trackSignUp(userId, signUpMethod, userProperties = {}) {
  if (!userId) {
    console.warn('User ID required for sign_up tracking');
    return;
  }

  // Set User ID
  gtag('set', {
    user_id: 'user_' + userId
  });

  // Set user properties
  if (Object.keys(userProperties).length > 0) {
    gtag('set', userProperties);
  }

  // Send sign_up event
  safeGtagEvent('sign_up', {
    method: signUpMethod
  });
}

/**
 * Track user logout
 */
function trackLogout() {
  // Send logout event
  safeGtagEvent('logout');

  // CRITICAL: Clear User ID with null (not empty string)
  gtag('set', {
    user_id: null
  });
}

// Usage Example:
/*
// After successful login
trackLogin('12345', 'email');

// After successful registration
trackSignUp('12345', 'email', {
  subscription_tier: 'premium',
  signup_date: new Date().toISOString().split('T')[0]
});

// On logout
trackLogout();
*/

// ============================================
// PATTERN 4: BUTTON & LINK TRACKING
// ============================================

/**
 * Track button clicks
 * @param {string} selector - CSS selector for buttons
 * @param {function} getEventData - Function to extract event data from button
 */
function trackButtonClicks(selector, getEventData) {
  document.querySelectorAll(selector).forEach(button => {
    button.addEventListener('click', function() {
      const eventData = getEventData(this);
      safeGtagEvent('button_click', eventData);
    });
  });
}

/**
 * Track outbound link clicks
 * @param {string} selector - CSS selector for links
 */
function trackOutboundLinks(selector = 'a[href^="http"]') {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.href;
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(href).hostname;

      // Only track external links
      if (linkDomain !== currentDomain) {
        e.preventDefault();

        safeGtagEvent('click', {
          link_url: href,
          link_domain: linkDomain,
          outbound: true
        });

        // Navigate after short delay
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
    });
  });
}

// Usage Example:
/*
trackButtonClicks('.cta-button', function(button) {
  return {
    button_name: button.textContent,
    button_id: button.id,
    button_location: 'homepage'
  };
});

trackOutboundLinks('a[href^="http"]');
*/

// ============================================
// PATTERN 5: SCROLL DEPTH TRACKING
// ============================================

/**
 * Track scroll depth milestones
 * @param {array} milestones - Array of scroll depth percentages to track
 */
function trackScrollDepth(milestones = [25, 50, 75, 90]) {
  const scrollTracked = {};
  milestones.forEach(m => scrollTracked[m] = false);

  const trackScroll = debounce(function() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !scrollTracked[milestone]) {
        safeGtagEvent('scroll_milestone', {
          scroll_depth: milestone,
          page_path: window.location.pathname
        });
        scrollTracked[milestone] = true;
      }
    });
  }, 500);

  window.addEventListener('scroll', trackScroll);
}

// Usage Example:
/*
trackScrollDepth([25, 50, 75, 90]);
*/

// ============================================
// PATTERN 6: VIDEO TRACKING (HTML5)
// ============================================

/**
 * Track HTML5 video engagement
 * @param {string} selector - CSS selector for video elements
 */
function trackVideoEngagement(selector = 'video') {
  document.querySelectorAll(selector).forEach(video => {
    const tracked = {
      started: false,
      progress25: false,
      progress50: false,
      progress75: false,
      completed: false
    };

    const videoTitle = video.getAttribute('data-video-title') || 'Untitled Video';

    // Video started
    video.addEventListener('play', function() {
      if (!tracked.started) {
        safeGtagEvent('video_start', {
          video_title: videoTitle,
          video_provider: 'html5',
          video_duration: Math.round(this.duration)
        });
        tracked.started = true;
      }
    });

    // Track progress
    video.addEventListener('timeupdate', function() {
      const percent = (this.currentTime / this.duration) * 100;

      if (percent >= 25 && !tracked.progress25) {
        safeGtagEvent('video_progress', {
          video_title: videoTitle,
          video_provider: 'html5',
          video_percent: 25
        });
        tracked.progress25 = true;
      }

      if (percent >= 50 && !tracked.progress50) {
        safeGtagEvent('video_progress', {
          video_title: videoTitle,
          video_provider: 'html5',
          video_percent: 50
        });
        tracked.progress50 = true;
      }

      if (percent >= 75 && !tracked.progress75) {
        safeGtagEvent('video_progress', {
          video_title: videoTitle,
          video_provider: 'html5',
          video_percent: 75
        });
        tracked.progress75 = true;
      }
    });

    // Video completed
    video.addEventListener('ended', function() {
      if (!tracked.completed) {
        safeGtagEvent('video_complete', {
          video_title: videoTitle,
          video_provider: 'html5',
          video_percent: 100
        });
        tracked.completed = true;
      }
    });
  });
}

// Usage Example:
/*
trackVideoEngagement('video[data-track]');
*/

// ============================================
// PATTERN 7: SEARCH TRACKING
// ============================================

/**
 * Track site search
 * @param {HTMLFormElement} formElement - Search form element
 * @param {string} inputSelector - CSS selector for search input
 */
function trackSiteSearch(formElement, inputSelector = '[type="search"]') {
  formElement.addEventListener('submit', function(e) {
    const searchInput = this.querySelector(inputSelector);
    const searchTerm = searchInput ? searchInput.value : '';

    if (searchTerm) {
      safeGtagEvent('search', {
        search_term: searchTerm
      });
    }
  });
}

/**
 * Track search result click
 * @param {string} selector - CSS selector for search result items
 * @param {function} getResultData - Function to extract result data
 */
function trackSearchResultClicks(selector, getResultData) {
  document.querySelectorAll(selector).forEach((result, index) => {
    result.addEventListener('click', function() {
      const resultData = getResultData(this, index);
      safeGtagEvent('select_content', {
        content_type: 'search_result',
        ...resultData
      });
    });
  });
}

// Usage Example:
/*
trackSiteSearch(document.getElementById('search-form'));

trackSearchResultClicks('.search-result', function(element, index) {
  return {
    content_title: element.querySelector('.result-title').textContent,
    content_position: index + 1,
    search_term: document.getElementById('search-input').value
  };
});
*/

// ============================================
// PATTERN 8: ERROR TRACKING
// ============================================

/**
 * Track JavaScript errors
 */
function trackJavaScriptErrors() {
  // Track runtime errors
  window.addEventListener('error', function(event) {
    safeGtagEvent('exception', {
      description: event.message,
      fatal: false,
      error_location: event.filename + ':' + event.lineno + ':' + event.colno
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    safeGtagEvent('exception', {
      description: 'Unhandled Promise: ' + event.reason,
      fatal: false
    });
  });
}

// Usage Example:
/*
trackJavaScriptErrors();
*/

// ============================================
// PATTERN 9: SINGLE-PAGE APPLICATION (SPA)
// ============================================

/**
 * Track SPA page views (vanilla JS / history API)
 * Call this function whenever route changes in your SPA
 * @param {string} pagePath - New page path
 * @param {string} pageTitle - New page title
 */
function trackSPAPageView(pagePath, pageTitle) {
  safeGtagEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href
  });
}

/**
 * Auto-track SPA navigation using History API
 */
function setupSPATracking() {
  // Track initial page view
  trackSPAPageView(window.location.pathname, document.title);

  // Override pushState
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    trackSPAPageView(window.location.pathname, document.title);
  };

  // Override replaceState
  const originalReplaceState = history.replaceState;
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    trackSPAPageView(window.location.pathname, document.title);
  };

  // Track back/forward navigation
  window.addEventListener('popstate', function() {
    trackSPAPageView(window.location.pathname, document.title);
  });
}

// Usage Example:
/*
// Manual tracking
trackSPAPageView('/products/123', 'Product Details');

// Auto tracking
setupSPATracking();
*/

// ============================================
// PATTERN 10: CUSTOM USER PROPERTIES
// ============================================

/**
 * Set user properties
 * @param {object} properties - User properties to set
 */
function setUserProperties(properties) {
  if (typeof properties === 'object' && properties !== null) {
    gtag('set', properties);
  }
}

/**
 * Clear user properties
 * @param {array} propertyNames - Array of property names to clear
 */
function clearUserProperties(propertyNames) {
  const clearObj = {};
  propertyNames.forEach(name => {
    clearObj[name] = null;
  });
  gtag('set', clearObj);
}

// Usage Example:
/*
setUserProperties({
  subscription_tier: 'premium',
  customer_segment: 'enterprise',
  account_age_days: 365
});

clearUserProperties(['subscription_tier', 'customer_segment']);
*/

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all tracking patterns
 * Uncomment and customize as needed
 */
function initializeTracking() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTracking);
  } else {
    setupTracking();
  }
}

function setupTracking() {
  // Uncomment patterns you want to use:

  // trackJavaScriptErrors();
  // trackScrollDepth();
  // trackVideoEngagement('video');
  // trackOutboundLinks();
  // setupSPATracking();

  // Custom tracking setups
  // trackFormSubmit(document.getElementById('contact-form'), {
  //   formName: 'Contact Form'
  // });

  // trackButtonClicks('.cta-button', function(button) {
  //   return {
  //     button_name: button.textContent,
  //     button_id: button.id
  //   };
  // });
}

// Auto-initialize if this script is loaded
// Comment out if you want manual initialization
// initializeTracking();

/**
 * =================================================================
 * GA4 gtag.js Common Implementation Patterns
 * =================================================================
 *
 * VERSION: 1.0
 * LAST UPDATED: November 2025
 * MAINTAINED BY: GA4 Skills Repository
 *
 * USAGE:
 * 1. Include this file after gtag.js snippet
 * 2. Uncomment patterns you need in initializeTracking()
 * 3. Customize selectors and parameters
 * 4. Test with GA4 DebugView
 *
 * IMPORTANT NOTES:
 * - All patterns include error handling
 * - Custom parameters must be registered as custom dimensions in GA4 Admin
 * - Test thoroughly with DebugView before production
 * - Debounce high-frequency events (scroll, mouse move)
 *
 * RELATED SKILLS:
 * - ga4-setup
 * - ga4-events-fundamentals
 * - ga4-recommended-events
 * - ga4-debugview
 *
 * =================================================================
 */
