/**
 * GA4 Event Structure Examples
 *
 * Comprehensive code examples for all four event categories:
 * 1. Automatically Collected Events
 * 2. Enhanced Measurement Events
 * 3. Recommended Events
 * 4. Custom Events
 *
 * Note: These examples assume gtag.js is already installed on the page.
 */

// ============================================================================
// CATEGORY 1: AUTOMATICALLY COLLECTED EVENTS
// ============================================================================
// These fire automatically when GA4 is installed - no code needed
// Listed here for reference only

/*
Automatic Events (No implementation needed):
- session_start
- first_visit
- user_engagement
- page_view (when enhanced measurement enabled)
*/

// ============================================================================
// CATEGORY 2: ENHANCED MEASUREMENT EVENTS
// ============================================================================
// These are configured in GA4 Admin (Data Streams → Enhanced measurement)
// Toggle on/off for automatic collection

/*
Enhanced Measurement Events (Configured in GA4 Admin):
- page_view
- scroll
- click (outbound links)
- file_download
- video_start, video_progress, video_complete
- view_search_results
- form_start, form_submit

Enable in: Admin → Data Streams → Web Stream → Enhanced measurement (gear icon)
*/

// ============================================================================
// CATEGORY 3: RECOMMENDED EVENTS
// ============================================================================

// ----------------------------------------------------------------------------
// Engagement Events
// ----------------------------------------------------------------------------

// Login Event
gtag('event', 'login', {
  'method': 'google'  // or 'email', 'facebook', 'phone'
});

// Sign Up Event
gtag('event', 'sign_up', {
  'method': 'email'  // or 'google', 'facebook'
});

// Search Event
gtag('event', 'search', {
  'search_term': 'blue widgets'
});

// Select Content
gtag('event', 'select_content', {
  'content_type': 'article',
  'item_id': 'A123'
});

// Share Event
gtag('event', 'share', {
  'method': 'twitter',
  'content_type': 'article',
  'item_id': 'A123'
});

// ----------------------------------------------------------------------------
// Ecommerce Recommended Events
// ----------------------------------------------------------------------------

// View Item (Product Page)
gtag('event', 'view_item', {
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_category2': 'Adult',
      'item_category3': 'Shirts',
      'item_category4': 'Crew',
      'item_category5': 'Short sleeve',
      'item_list_id': 'related_products',
      'item_list_name': 'Related Products',
      'item_variant': 'green',
      'location_id': 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      'price': 10.01,
      'quantity': 3
    }
  ],
  'currency': 'USD',
  'value': 30.03
});

// View Item List (Product Listing Page)
gtag('event', 'view_item_list', {
  'item_list_id': 'related_products',
  'item_list_name': 'Related products',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_list_id': 'related_products',
      'item_list_name': 'Related Products',
      'item_variant': 'green',
      'location_id': 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Select Item (Item Clicked from List)
gtag('event', 'select_item', {
  'item_list_id': 'related_products',
  'item_list_name': 'Related products',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'index': 0
    }
  ]
});

// Add to Wishlist
gtag('event', 'add_to_wishlist', {
  'currency': 'USD',
  'value': 30.03,
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Add to Cart
gtag('event', 'add_to_cart', {
  'currency': 'USD',
  'value': 30.03,
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Remove from Cart
gtag('event', 'remove_from_cart', {
  'currency': 'USD',
  'value': 10.01,
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 1
    }
  ]
});

// View Cart
gtag('event', 'view_cart', {
  'currency': 'USD',
  'value': 30.03,
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Begin Checkout
gtag('event', 'begin_checkout', {
  'currency': 'USD',
  'value': 30.03,
  'coupon': 'SUMMER_FUN',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Add Shipping Info
gtag('event', 'add_shipping_info', {
  'currency': 'USD',
  'value': 30.03,
  'coupon': 'SUMMER_FUN',
  'shipping_tier': 'Ground',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Add Payment Info
gtag('event', 'add_payment_info', {
  'currency': 'USD',
  'value': 30.03,
  'coupon': 'SUMMER_FUN',
  'payment_type': 'Credit Card',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Purchase (MOST IMPORTANT)
gtag('event', 'purchase', {
  'transaction_id': 'T_12345',
  'affiliation': 'Google Merchandise Store',
  'value': 142.52,
  'tax': 10.00,
  'shipping': 5.00,
  'currency': 'USD',
  'coupon': 'SUMMER_SALE',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_category2': 'Adult',
      'item_category3': 'Shirts',
      'item_category4': 'Crew',
      'item_category5': 'Short sleeve',
      'item_list_id': 'related_products',
      'item_list_name': 'Related Products',
      'item_variant': 'green',
      'location_id': 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      'price': 10.01,
      'quantity': 3
    },
    {
      'item_id': 'SKU_12346',
      'item_name': 'Google Grey Women\'s Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 3.33,
      'index': 1,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_category2': 'Adult',
      'item_category3': 'Shirts',
      'item_category4': 'Crew',
      'item_category5': 'Short sleeve',
      'item_list_id': 'related_products',
      'item_list_name': 'Related Products',
      'item_variant': 'gray',
      'location_id': 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      'price': 20.99,
      'quantity': 2
    }
  ]
});

// Refund
gtag('event', 'refund', {
  'transaction_id': 'T_12345',
  'value': 30.03,
  'tax': 4.90,
  'shipping': 5.99,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// ----------------------------------------------------------------------------
// Promotion Events
// ----------------------------------------------------------------------------

// View Promotion
gtag('event', 'view_promotion', {
  'creative_name': 'Summer Banner',
  'creative_slot': 'featured_app_1',
  'promotion_id': 'P_12345',
  'promotion_name': 'Summer Sale',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// Select Promotion
gtag('event', 'select_promotion', {
  'creative_name': 'Summer Banner',
  'creative_slot': 'featured_app_1',
  'promotion_id': 'P_12345',
  'promotion_name': 'Summer Sale',
  'items': [
    {
      'item_id': 'SKU_12345',
      'item_name': 'Stan and Friends Tee',
      'affiliation': 'Google Merchandise Store',
      'coupon': 'SUMMER_FUN',
      'discount': 2.22,
      'index': 0,
      'item_brand': 'Google',
      'item_category': 'Apparel',
      'item_variant': 'green',
      'price': 10.01,
      'quantity': 3
    }
  ]
});

// ----------------------------------------------------------------------------
// Other Recommended Events
// ----------------------------------------------------------------------------

// Generate Lead
gtag('event', 'generate_lead', {
  'value': 99.99,
  'currency': 'USD'
});

// ============================================================================
// CATEGORY 4: CUSTOM EVENTS
// ============================================================================

// ----------------------------------------------------------------------------
// SaaS / Software Examples
// ----------------------------------------------------------------------------

// Feature Activation
gtag('event', 'feature_activated', {
  'feature_name': 'advanced_analytics',
  'feature_tier': 'enterprise',
  'activation_source': 'settings_page',
  'first_time_use': true
});

// Product Tour Completion
gtag('event', 'product_tour_completed', {
  'tour_name': 'onboarding_v2',
  'tour_version': '2.1',
  'completion_time_seconds': 180,
  'steps_completed': 7,
  'steps_skipped': 2
});

// Trial Signup
gtag('event', 'trial_started', {
  'plan_type': 'professional',
  'trial_duration_days': 14,
  'source': 'landing_page',
  'variation': 'b'
});

// Account Upgrade
gtag('event', 'account_upgraded', {
  'previous_tier': 'basic',
  'new_tier': 'premium',
  'upgrade_value': 99.99,
  'currency': 'USD',
  'billing_frequency': 'monthly'
});

// ----------------------------------------------------------------------------
// E-Learning Examples
// ----------------------------------------------------------------------------

// Course Enrollment
gtag('event', 'course_enrollment', {
  'course_id': 'GA4_101',
  'course_name': 'GA4 Fundamentals',
  'instructor': 'John Doe',
  'price': 99.99,
  'currency': 'USD',
  'level': 'beginner',
  'enrollment_method': 'direct'
});

// Lesson Completion
gtag('event', 'lesson_completed', {
  'course_id': 'GA4_101',
  'lesson_id': 'lesson_3',
  'lesson_title': 'Event Tracking Basics',
  'time_spent_minutes': 15,
  'quiz_score': 85,
  'attempts': 1
});

// Certificate Earned
gtag('event', 'certificate_earned', {
  'course_id': 'GA4_101',
  'course_name': 'GA4 Fundamentals',
  'completion_date': '2025-11-10',
  'final_score': 92,
  'certificate_id': 'CERT_12345'
});

// ----------------------------------------------------------------------------
// Media / Publishing Examples
// ----------------------------------------------------------------------------

// Article Read Complete
gtag('event', 'article_read_complete', {
  'article_id': 'A123',
  'article_title': 'Complete GA4 Guide',
  'category': 'analytics',
  'author': 'Jane Smith',
  'word_count': 2500,
  'time_to_read_minutes': 10,
  'scroll_depth_percent': 100
});

// Content Shared
gtag('event', 'content_shared', {
  'content_type': 'article',
  'content_id': 'A123',
  'content_title': 'Complete GA4 Guide',
  'share_method': 'twitter',
  'share_location': 'article_footer'
});

// Newsletter Subscription
gtag('event', 'newsletter_subscribed', {
  'newsletter_type': 'weekly',
  'subscription_source': 'article_inline',
  'article_id': 'A123',
  'email_domain': 'gmail.com'
});

// ----------------------------------------------------------------------------
// E-Commerce Examples (Custom Beyond Recommended)
// ----------------------------------------------------------------------------

// Product Comparison
gtag('event', 'product_comparison_viewed', {
  'comparison_type': 'feature_matrix',
  'products_compared': 3,
  'product_ids': 'SKU_123,SKU_124,SKU_125',
  'category': 'electronics'
});

// Wishlist Shared
gtag('event', 'wishlist_shared', {
  'wishlist_id': 'WL_123',
  'item_count': 5,
  'share_method': 'email',
  'total_value': 499.95,
  'currency': 'USD'
});

// Size Chart Viewed
gtag('event', 'size_chart_viewed', {
  'product_id': 'SKU_123',
  'product_name': 'Blue T-Shirt',
  'category': 'apparel',
  'view_location': 'product_page'
});

// ----------------------------------------------------------------------------
// Video Tracking Examples (Custom)
// ----------------------------------------------------------------------------

// Video Tutorial Watched
gtag('event', 'video_tutorial_watched', {
  'video_id': 'VID_123',
  'video_title': 'GA4 Event Tracking',
  'video_duration': 1200,
  'completion_percent': 100,
  'difficulty_level': 'beginner',
  'category': 'analytics',
  'language': 'en',
  'watch_time_seconds': 1180
});

// Video Quality Changed
gtag('event', 'video_quality_changed', {
  'video_id': 'VID_123',
  'previous_quality': 'sd',
  'new_quality': 'hd',
  'auto_switched': false,
  'playback_time_seconds': 120
});

// ----------------------------------------------------------------------------
// Form Tracking Examples (Custom)
// ----------------------------------------------------------------------------

// Multi-Step Form Progress
gtag('event', 'form_step_completed', {
  'form_id': 'registration_form',
  'form_name': 'Account Registration',
  'step_number': 2,
  'step_name': 'contact_information',
  'total_steps': 4,
  'time_on_step_seconds': 45
});

// Form Field Interaction
gtag('event', 'form_field_focused', {
  'form_id': 'contact_form',
  'field_name': 'email',
  'field_type': 'email',
  'field_required': true,
  'field_position': 2
});

// Form Validation Error
gtag('event', 'form_validation_error', {
  'form_id': 'contact_form',
  'error_field': 'email',
  'error_type': 'invalid_format',
  'error_message': 'Please enter a valid email address'
});

// ----------------------------------------------------------------------------
// Calculator / Tool Examples
// ----------------------------------------------------------------------------

// Calculator Used
gtag('event', 'calculator_used', {
  'calculator_type': 'roi',
  'calculator_name': 'ROI Calculator',
  'inputs_entered': 5,
  'calculation_performed': true,
  'result_value': 15000
});

// Pricing Calculator
gtag('event', 'pricing_calculator_used', {
  'plan_selected': 'enterprise',
  'users_count': 50,
  'billing_frequency': 'annual',
  'calculated_price': 4999.99,
  'currency': 'USD'
});

// ----------------------------------------------------------------------------
// Error Tracking Examples
// ----------------------------------------------------------------------------

// Error Encountered
gtag('event', 'error_encountered', {
  'error_type': 'api_error',
  'error_code': '500',
  'error_message': 'Internal Server Error',
  'error_page': '/checkout',
  'user_action': 'submit_payment'
});

// Payment Failed
gtag('event', 'payment_failed', {
  'payment_method': 'credit_card',
  'failure_reason': 'insufficient_funds',
  'transaction_value': 99.99,
  'currency': 'USD',
  'retry_available': true
});

// ============================================================================
// ADVANCED PATTERNS
// ============================================================================

// ----------------------------------------------------------------------------
// Dynamic Parameter Population
// ----------------------------------------------------------------------------

// Get product data from page
function trackProductView() {
  const productId = document.querySelector('[data-product-id]').textContent;
  const productName = document.querySelector('.product-title').textContent;
  const productPrice = parseFloat(document.querySelector('.product-price').textContent);

  gtag('event', 'view_item', {
    'items': [{
      'item_id': productId,
      'item_name': productName,
      'price': productPrice,
      'item_category': 'Electronics',
      'quantity': 1
    }],
    'value': productPrice,
    'currency': 'USD'
  });
}

// ----------------------------------------------------------------------------
// Event with Conditional Parameters
// ----------------------------------------------------------------------------

function trackCheckout(userTier, couponCode) {
  const eventParams = {
    'items': getCartItems(),
    'value': getCartTotal(),
    'currency': 'USD'
  };

  // Add optional parameters if they exist
  if (userTier) {
    eventParams.user_tier = userTier;
  }

  if (couponCode) {
    eventParams.coupon = couponCode;
  }

  gtag('event', 'begin_checkout', eventParams);
}

// ----------------------------------------------------------------------------
// Event with Calculated Parameters
// ----------------------------------------------------------------------------

function trackVideoComplete(videoElement) {
  const duration = videoElement.duration;
  const watchedTime = videoElement.currentTime;
  const completionPercent = Math.round((watchedTime / duration) * 100);

  gtag('event', 'video_complete', {
    'video_id': videoElement.id,
    'video_duration': Math.round(duration),
    'watch_time_seconds': Math.round(watchedTime),
    'completion_percent': completionPercent,
    'engagement_rate': completionPercent
  });
}

// ----------------------------------------------------------------------------
// User Property Setting
// ----------------------------------------------------------------------------

// Set user properties (user-scoped)
function setUserProperties(userId, userTier, accountAge) {
  gtag('set', {
    'user_id': userId,
    'subscription_tier': userTier,
    'account_age_days': accountAge,
    'account_status': 'active'
  });
}

// Clear user properties on logout
function clearUserProperties() {
  gtag('set', {
    'user_id': null  // MUST be null, not empty string
  });
}

// ----------------------------------------------------------------------------
// Event Callback (for SPAs)
// ----------------------------------------------------------------------------

function trackFormSubmitAndNavigate(destination) {
  gtag('event', 'form_submit', {
    'form_id': 'contact-form',
    'form_destination': destination,
    'eventCallback': function() {
      // Navigate after event is sent
      window.location.href = destination;
    },
    'eventTimeout': 2000  // Timeout fallback
  });
}

// ============================================================================
// DEBUGGING EXAMPLES
// ============================================================================

// Enable debug mode for testing
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});

// Or for specific events
gtag('event', 'test_event', {
  'test_parameter': 'test_value',
  'debug_mode': true
});

// ============================================================================
// NOTES & BEST PRACTICES
// ============================================================================

/*
Best Practices:
1. Use snake_case for event and parameter names
2. Keep event names under 40 characters
3. Keep parameter names under 40 characters
4. Keep parameter values under 100 characters (exceptions noted)
5. Maximum 25 parameters per event
6. Use ISO currency codes (USD, EUR, GBP) not symbols ($)
7. Send numeric values as numbers, not strings
8. Test in DebugView before deploying to production
9. Register custom parameters as custom dimensions in GA4 Admin
10. Document all custom events in tracking plan

Common Mistakes to Avoid:
1. Missing currency parameter on value events
2. Using $ instead of USD for currency
3. Exceeding 25 parameters per event
4. Sending PII (personally identifiable information)
5. Using generic event names (click, event, data)
6. Not testing in DebugView
7. Forgetting to register custom dimensions

Character Limits:
- Event name: 40 characters
- Parameter name: 40 characters
- Parameter value: 100 characters (standard)
- page_title: 300 characters
- page_referrer: 420 characters
- page_location: 1000 characters
*/
