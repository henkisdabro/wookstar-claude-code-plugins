# Event Naming Conventions Best Practices

## Overview

Consistent, descriptive event naming is essential for maintainable GA4 implementations. This guide provides comprehensive best practices, patterns, and examples for naming events and parameters.

## Core Naming Principles

### 1. Use snake_case

**Format:** lowercase_with_underscores

```javascript
// ✅ CORRECT
'button_click'
'form_submit'
'video_tutorial_watched'
'pricing_calculator_used'

// ❌ WRONG
'buttonClick'           // camelCase
'ButtonClick'           // PascalCase
'button-click'          // kebab-case
'BUTTON_CLICK'          // UPPERCASE
'button click'          // spaces
```

**Why snake_case:**
- GA4 standard convention
- Consistent with Google-recommended events
- Readable and parseable
- Works across all platforms

---

### 2. Be Descriptive and Action-Oriented

**Pattern:** Start with verb (action) when possible

```javascript
// ✅ CORRECT - Descriptive, action-oriented
'video_tutorial_started'
'whitepaper_downloaded'
'demo_request_submitted'
'pricing_tier_selected'
'account_upgrade_completed'

// ❌ WRONG - Too generic or vague
'video'
'download'
'form'
'click'
'event'
```

---

### 3. Keep Under 40 Characters

**Limit:** Maximum 40 characters for event names

```javascript
// ✅ CORRECT - 38 characters
'enterprise_demo_scheduling_completed'

// ⚠️ WARNING - 48 characters (too long)
'enterprise_customer_onboarding_demo_scheduling_completed'

// ✅ BETTER - Abbreviated to 35 characters
'enterprise_demo_onboarding_complete'
```

**Character Count Check:**
```javascript
'video_tutorial_watched'.length  // 22 characters ✅
'very_long_descriptive_event_name_exceeding_limits'.length  // 50 characters ❌
```

---

### 4. Avoid Reserved Names

**Don't Use:** Google-reserved automatic and recommended event names for custom events

```javascript
// ❌ WRONG - Using reserved recommended event names
'login'         // Reserved
'sign_up'       // Reserved
'purchase'      // Reserved
'page_view'     // Reserved

// ✅ CORRECT - Custom variations when needed
'custom_login_attempt'
'trial_signup_completed'
'demo_purchase_simulation'
'virtual_page_view'
```

**Reserved Event Names to Avoid:**
- All automatically collected events (session_start, first_visit, user_engagement)
- All enhanced measurement events (scroll, click, file_download, video_start, etc.)
- All recommended events (login, sign_up, purchase, add_to_cart, etc.)

---

### 5. Be Consistent Across Implementation

**Maintain Consistency:**
- Use same naming pattern throughout site/app
- Document naming conventions
- Share with team
- Create naming reference guide

```javascript
// ✅ CORRECT - Consistent pattern
'video_tutorial_started'
'video_tutorial_paused'
'video_tutorial_completed'

// ❌ WRONG - Inconsistent pattern
'videoTutorialStarted'      // Different case
'video_tutorial_paused'     // Consistent
'VideoTutorialComplete'     // Different case, missing 'd'
```

---

## Event Naming Patterns

### Pattern 1: [action]_[object]

**Structure:** verb_noun

**Examples:**
```javascript
'button_clicked'
'form_submitted'
'video_started'
'file_downloaded'
'account_created'
'payment_completed'
'newsletter_subscribed'
```

**Use When:** Simple, single-action events

---

### Pattern 2: [object]_[action]

**Structure:** noun_verb

**Examples:**
```javascript
'cart_abandoned'
'product_viewed'
'coupon_applied'
'search_performed'
'filter_applied'
'wishlist_added'
```

**Use When:** Object-focused tracking

---

### Pattern 3: [action]_[object]_[context]

**Structure:** verb_noun_descriptor

**Examples:**
```javascript
'video_tutorial_started'
'demo_request_submitted'
'pricing_calculator_opened'
'trial_signup_completed'
'whitepaper_pdf_downloaded'
'enterprise_demo_scheduled'
```

**Use When:** Need additional context for clarity

---

### Pattern 4: [object]_[attribute]_[action]

**Structure:** noun_descriptor_verb

**Examples:**
```javascript
'free_trial_started'
'premium_tier_selected'
'annual_plan_purchased'
'mobile_app_downloaded'
'beta_feature_activated'
```

**Use When:** Attribute is critical to event meaning

---

### Pattern 5: [category]_[object]_[action]

**Structure:** category_noun_verb

**Examples:**
```javascript
'ecommerce_checkout_started'
'ecommerce_payment_failed'
'content_article_shared'
'content_video_completed'
'account_password_reset'
'account_email_verified'
```

**Use When:** Organizing events by category

---

## Industry-Specific Naming Examples

### SaaS / Software

```javascript
// Feature Usage
'feature_activated'
'feature_trial_started'
'feature_upgrade_clicked'
'feature_limit_reached'

// Onboarding
'onboarding_started'
'onboarding_step_completed'
'onboarding_skipped'
'onboarding_completed'

// Account Management
'account_upgraded'
'account_downgraded'
'account_cancelled'
'account_reactivated'

// Product Tours
'product_tour_started'
'product_tour_step_viewed'
'product_tour_completed'
'product_tour_dismissed'

// Collaboration
'team_member_invited'
'workspace_created'
'document_shared'
'comment_posted'
```

---

### E-Commerce

```javascript
// Product Discovery
'product_search_performed'
'product_filter_applied'
'product_sort_changed'
'category_browsed'

// Product Interaction
'product_image_zoomed'
'product_variant_selected'
'product_size_chart_viewed'
'product_review_read'

// Cart & Checkout
'cart_item_added'
'cart_item_removed'
'cart_viewed'
'checkout_started'
'checkout_step_completed'
'promo_code_applied'

// Post-Purchase
'order_confirmed'
'review_submitted'
'product_returned'
'subscription_renewed'
```

---

### Education / E-Learning

```javascript
// Course Discovery
'course_search_performed'
'course_preview_watched'
'course_syllabus_viewed'
'instructor_profile_viewed'

// Enrollment
'course_enrolled'
'course_trial_started'
'course_purchased'
'bundle_selected'

// Learning Progress
'lesson_started'
'lesson_completed'
'quiz_attempted'
'quiz_passed'
'certificate_earned'

// Engagement
'discussion_post_created'
'question_asked'
'resource_downloaded'
'video_lecture_watched'
```

---

### Media / Publishing

```javascript
// Content Consumption
'article_opened'
'article_read_complete'
'gallery_image_viewed'
'video_started'
'podcast_played'

// Engagement
'article_shared'
'article_bookmarked'
'comment_posted'
'author_followed'

// Subscription
'paywall_encountered'
'subscription_modal_viewed'
'free_trial_started'
'subscription_purchased'

// Navigation
'category_selected'
'related_article_clicked'
'search_performed'
'navigation_used'
```

---

### Financial Services

```javascript
// Account Actions
'account_application_started'
'account_opened'
'account_verified'
'account_linked'

// Transactions
'transfer_initiated'
'payment_scheduled'
'bill_paid'
'investment_made'

// Tools & Calculators
'loan_calculator_used'
'retirement_planner_opened'
'budget_tool_accessed'
'rate_comparison_viewed'

// Security
'two_factor_enabled'
'security_question_set'
'password_changed'
'device_authorized'
```

---

### Healthcare

```javascript
// Appointments
'appointment_scheduled'
'appointment_rescheduled'
'appointment_cancelled'
'telehealth_started'

// Patient Portal
'test_results_viewed'
'prescription_refill_requested'
'medical_record_downloaded'
'message_sent_to_provider'

// Information
'symptom_checker_used'
'provider_search_performed'
'insurance_verified'
'health_article_read'
```

---

## Parameter Naming Conventions

### General Rules

**Same Conventions as Events:**
- Use snake_case
- Keep under 40 characters
- Be descriptive
- Avoid reserved names
- Be consistent

### Parameter Naming Patterns

#### Pattern 1: [object]_[attribute]

```javascript
'video_duration'
'video_title'
'video_quality'

'button_name'
'button_location'
'button_id'

'form_name'
'form_type'
'form_destination'

'product_id'
'product_name'
'product_category'
```

#### Pattern 2: [context]_[measurement]

```javascript
'completion_percent'
'scroll_depth'
'engagement_time'
'page_views'
'time_spent_seconds'
```

#### Pattern 3: [category]_[object]_[attribute]

```javascript
'ecommerce_item_price'
'ecommerce_item_quantity'
'user_subscription_tier'
'user_account_age'
'content_article_word_count'
```

---

## Common Naming Mistakes

### Mistake 1: Too Generic

```javascript
// ❌ WRONG - Too generic
'click'
'event'
'action'
'data'
'custom_event'

// ✅ CORRECT - Specific and descriptive
'cta_button_clicked'
'form_submit_completed'
'video_play_started'
'filter_applied'
'search_performed'
```

---

### Mistake 2: Inconsistent Naming

```javascript
// ❌ WRONG - Inconsistent pattern
'videoStarted'           // camelCase
'video_paused'           // snake_case
'VideoPaused'            // PascalCase
'video-completed'        // kebab-case

// ✅ CORRECT - Consistent snake_case
'video_started'
'video_paused'
'video_resumed'
'video_completed'
```

---

### Mistake 3: Using Abbreviations

```javascript
// ❌ WRONG - Unclear abbreviations
'btn_clk'
'frm_sub'
'vid_cmpltd'
'usr_rgstr'

// ✅ CORRECT - Full words
'button_clicked'
'form_submitted'
'video_completed'
'user_registered'
```

**Exception:** Well-known abbreviations are acceptable
```javascript
// ✅ ACCEPTABLE - Common abbreviations
'pdf_downloaded'         // PDF is standard
'cta_clicked'            // CTA = Call To Action
'url_shared'             // URL is standard
'id_verified'            // ID is standard
```

---

### Mistake 4: Including Dynamic Data

```javascript
// ❌ WRONG - Dynamic data in event name
'product_SKU123_viewed'
'user_john_logged_in'
'page_pricing_viewed'

// ✅ CORRECT - Dynamic data in parameters
gtag('event', 'product_viewed', {
  'product_id': 'SKU123'
});

gtag('event', 'user_logged_in', {
  'user_name': 'john'
});

gtag('event', 'page_viewed', {
  'page_type': 'pricing'
});
```

---

### Mistake 5: Too Long

```javascript
// ❌ WRONG - 64 characters (exceeds 40 limit)
'enterprise_customer_onboarding_demo_scheduling_request_completed'

// ✅ CORRECT - 35 characters
'enterprise_demo_scheduled'

// Alternative approach - use parameters for detail
gtag('event', 'demo_scheduled', {
  'customer_tier': 'enterprise',
  'demo_type': 'onboarding',
  'request_status': 'completed'
});
```

---

## Event Naming Checklist

Before finalizing event names:

- [ ] Uses snake_case (lowercase with underscores)
- [ ] Under 40 characters
- [ ] Descriptive and action-oriented
- [ ] Doesn't conflict with reserved Google event names
- [ ] Consistent with other event names in implementation
- [ ] No abbreviations (unless standard like PDF, URL)
- [ ] No dynamic data in name (use parameters instead)
- [ ] No spaces or special characters
- [ ] Documented in event tracking plan
- [ ] Reviewed by team for clarity

---

## Documentation Template

### Event Documentation Format

```
Event Name: [event_name]
Description: [What this event tracks]
When to Fire: [User action or trigger]
Pattern Used: [action_object, object_action, etc.]
Category: [engagement, conversion, navigation, etc.]

Parameters:
  - parameter_1: [description] (type: string/number/boolean)
  - parameter_2: [description] (type: string/number/boolean)

Example Implementation:
gtag('event', 'event_name', {
  'parameter_1': 'value',
  'parameter_2': 123
});

Expected Volume: [events per day/week/month]
Key Event: [Yes/No]
Custom Dimensions Needed: [Yes/No - list if yes]
```

### Example Documentation

```
Event Name: video_tutorial_completed
Description: User completes watching a video tutorial
When to Fire: Video reaches 100% completion
Pattern Used: object_action_completed
Category: engagement

Parameters:
  - video_id: Unique video identifier (type: string)
  - video_title: Title of video (type: string)
  - video_duration: Length in seconds (type: number)
  - completion_time: Seconds to complete (type: number)
  - video_category: Tutorial category (type: string)

Example Implementation:
gtag('event', 'video_tutorial_completed', {
  'video_id': 'VID_123',
  'video_title': 'GA4 Fundamentals',
  'video_duration': 1200,
  'completion_time': 1180,
  'video_category': 'analytics'
});

Expected Volume: 500 events/week
Key Event: Yes
Custom Dimensions Needed:
  - video_category (event-scoped)
  - video_duration (metric)
```

---

## Event Taxonomy Example

### Organizing Events by Category

```
Engagement Events:
├── video_started
├── video_paused
├── video_completed
├── article_read
├── article_shared
└── comment_posted

Conversion Events:
├── lead_generated
├── trial_started
├── subscription_purchased
├── account_upgraded
└── demo_requested

Navigation Events:
├── menu_opened
├── search_performed
├── filter_applied
├── category_selected
└── page_scrolled

Feature Usage Events:
├── feature_activated
├── tool_opened
├── calculator_used
├── export_generated
└── settings_changed

Error Events:
├── form_validation_failed
├── payment_declined
├── upload_failed
├── session_timeout
└── error_encountered
```

---

## Naming Convention Quick Reference

| Element | Format | Example | Max Length |
|---------|--------|---------|------------|
| **Event Name** | snake_case | `video_tutorial_watched` | 40 chars |
| **Parameter Name** | snake_case | `video_duration` | 40 chars |
| **Parameter Value (string)** | Any | `HD Quality` | 100 chars* |
| **Currency Code** | ISO 4217 | `USD` | 3 chars |
| **Boolean Value** | true/false | `true` | N/A |

*Exceptions: page_title (300), page_referrer (420), page_location (1000)

---

## Testing Event Names

### DebugView Validation

1. Enable Google Analytics Debugger extension
2. Navigate to Admin → DebugView
3. Trigger event
4. Verify:
   - Event name appears correctly
   - Event name is not truncated
   - Event name follows convention
   - Parameters are attached

### Common DebugView Issues

| What You See | Problem | Solution |
|-------------|---------|----------|
| Event name truncated | >40 characters | Shorten name |
| Event name capitalized wrong | Wrong case used | Use snake_case |
| Event not firing | Name typo | Check implementation |
| Multiple similar events | Inconsistent naming | Standardize |

---

## Additional Resources

- Google Analytics Event Naming: https://support.google.com/analytics/answer/9322688
- Recommended Events: https://support.google.com/analytics/answer/9267735
- Event Limits: https://support.google.com/analytics/answer/9267744
