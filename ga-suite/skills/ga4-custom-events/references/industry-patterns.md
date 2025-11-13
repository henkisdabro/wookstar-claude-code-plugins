# GA4 Custom Events: Industry-Specific Patterns

## Complete Industry Event Catalogs

### SaaS (Software as a Service)

#### Core SaaS Events

**Free Trial & Conversion:**
```javascript
// User initiates free trial
gtag('event', 'trial_start', {
  'trial_plan': 'professional',
  'trial_days': 30,
  'utm_source': 'landing_page',
  'utm_medium': 'organic'
});

// User converts trial to paid
gtag('event', 'trial_conversion', {
  'trial_plan': 'professional',
  'paid_plan': 'professional_annual',
  'trial_duration_days': 28,
  'feature_used': 'advanced_reporting',
  'conversion_value': 999
});

// User lets trial expire
gtag('event', 'trial_expired', {
  'trial_plan': 'professional',
  'trial_days_used': 15,
  'reason_not_converted': 'price_too_high'
});
```

**Feature Adoption & Usage:**
```javascript
// User discovers premium feature
gtag('event', 'feature_discover', {
  'feature_name': 'team_collaboration',
  'feature_category': 'premium',
  'discovery_source': 'help_article'
});

// User activates premium feature
gtag('event', 'feature_enable', {
  'feature_name': 'team_collaboration',
  'feature_category': 'premium',
  'current_plan': 'professional'
});

// User first uses premium feature
gtag('event', 'feature_first_use', {
  'feature_name': 'team_collaboration',
  'success': true,
  'time_to_first_use_hours': 3
});
```

**Account & Subscription Management:**
```javascript
// User upgrades subscription
gtag('event', 'subscription_upgrade', {
  'from_plan': 'starter',
  'to_plan': 'professional',
  'upgrade_value': 50,
  'reason': 'more_users_needed'
});

// User downgrades subscription
gtag('event', 'subscription_downgrade', {
  'from_plan': 'professional',
  'to_plan': 'starter',
  'refund_amount': 50,
  'reason': 'reduced_usage'
});

// User pauses/cancels subscription
gtag('event', 'subscription_cancel', {
  'plan': 'professional',
  'tenure_months': 12,
  'reason': 'switching_competitor'
});

// User adds team member/seat
gtag('event', 'seat_add', {
  'current_seats': 5,
  'new_seats': 6,
  'cost_per_seat': 10
});
```

**Engagement & Activation:**
```javascript
// User invites teammate
gtag('event', 'team_invite_send', {
  'invitees_count': 2,
  'email_domains': 'acme.com',
  'invite_source': 'onboarding'
});

// User completes onboarding
gtag('event', 'onboarding_complete', {
  'onboarding_duration_minutes': 45,
  'steps_completed': 8,
  'data_imported': true
});

// User creates first report
gtag('event', 'first_report_created', {
  'report_type': 'marketing_dashboard',
  'days_to_first_report': 2
});
```

**Integration & Extensions:**
```javascript
// User connects third-party integration
gtag('event', 'integration_connect', {
  'integration_name': 'slack',
  'integration_category': 'communication',
  'reason': 'team_notifications'
});

// User uses API
gtag('event', 'api_first_call', {
  'api_endpoint': 'reports_v4',
  'api_auth_type': 'oauth',
  'user_type': 'developer'
});
```

**Support & Feedback:**
```javascript
// User opens support ticket
gtag('event', 'support_ticket_open', {
  'ticket_category': 'billing',
  'severity': 'medium',
  'user_plan': 'professional'
});

// User submits feature request
gtag('event', 'feature_request_submit', {
  'requested_feature': 'custom_branding',
  'use_case': 'white_label_solution'
});
```

#### SaaS Event User Properties

Set these user-level properties:
```javascript
gtag('set', {
  'subscription_plan': 'professional',
  'subscription_status': 'active',
  'monthly_recurring_revenue': 99,
  'subscription_created_date': '2023-11-10',
  'user_role': 'admin',
  'company_size': 'mid-market',
  'use_case': 'marketing_analytics',
  'feature_tier': 'professional',
  'integration_count': 3,
  'onboarding_complete': true
});
```

---

### E-commerce / Retail

#### Product Discovery Events

```javascript
// User performs product search
gtag('event', 'product_search', {
  'search_term': 'running shoes',
  'search_results_count': 45,
  'filters_applied': ['size', 'brand', 'price']
});

// User applies product filter
gtag('event', 'product_filter_apply', {
  'filter_type': 'price',
  'filter_value': '50-100',
  'filtered_results_count': 12
});

// User views product list
gtag('event', 'product_list_view', {
  'list_name': 'summer_sale',
  'list_category': 'apparel',
  'products_visible': 20
});

// User reads product review
gtag('event', 'product_review_view', {
  'product_id': 'SHOE_001',
  'review_rating': 4,
  'review_helpful_count': 15,
  'reviewer_verified_buyer': true
});

// User submits product review
gtag('event', 'product_review_submit', {
  'product_id': 'SHOE_001',
  'review_rating': 5,
  'review_length': 250,
  'includes_photo': true
});
```

#### Purchase Journey Events

```javascript
// User views shopping cart
gtag('event', 'cart_view', {
  'items_count': 3,
  'cart_value': 150,
  'last_modified_minutes_ago': 5
});

// User updates cart
gtag('event', 'cart_update', {
  'action': 'quantity_increase',
  'product_id': 'SHOE_001',
  'quantity_before': 1,
  'quantity_after': 2
});

// User starts checkout
gtag('event', 'checkout_start', {
  'items_count': 2,
  'cart_value': 99.98,
  'estimated_shipping': 10,
  'coupon_applied': false
});

// User selects shipping method
gtag('event', 'shipping_select', {
  'shipping_method': 'express',
  'shipping_cost': 25,
  'delivery_days': 2
});

// User enters payment information
gtag('event', 'payment_info_enter', {
  'payment_method': 'credit_card',
  'billing_same_as_shipping': true,
  'save_payment_method': true
});

// User completes purchase
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
  'value': 134.98,
  'currency': 'USD',
  'tax': 10.00,
  'shipping': 10.00,
  'coupon': 'SAVE10',
  'items': [
    {
      'item_id': 'SHOE_001',
      'item_name': 'Running Shoe Pro',
      'item_category': 'Apparel/Shoes',
      'item_brand': 'SportBrand',
      'item_variant': 'Blue/Size 10',
      'price': 119.99,
      'quantity': 1
    }
  ]
});
```

#### Post-Purchase Events

```javascript
// User initiates return
gtag('event', 'return_initiate', {
  'transaction_id': 'TXN_12345',
  'return_item_count': 1,
  'return_reason': 'wrong_size'
});

// User requests refund
gtag('event', 'refund_request', {
  'transaction_id': 'TXN_12345',
  'refund_amount': 119.99,
  'refund_reason': 'product_quality'
});

// User views order tracking
gtag('event', 'order_tracking_view', {
  'transaction_id': 'TXN_12345',
  'days_since_order': 2,
  'current_status': 'in_transit'
});

// User receives order
gtag('event', 'order_delivered', {
  'transaction_id': 'TXN_12345',
  'delivery_time_days': 3
});
```

#### Loyalty & Engagement

```javascript
// User joins loyalty program
gtag('event', 'loyalty_join', {
  'program_name': 'VIP Rewards',
  'tier': 'silver',
  'referral_code': 'REF_ABC123'
});

// User adds to wishlist
gtag('event', 'wishlist_add', {
  'product_id': 'SHOE_002',
  'wishlist_size': 8,
  'item_in_stock': true
});

// User receives and opens email
gtag('event', 'email_campaign_open', {
  'campaign_name': 'summer_sale_2024',
  'email_type': 'promotional',
  'click_count': 2
});

// User makes repeat purchase
gtag('event', 'repeat_purchase', {
  'repeat_purchase_number': 3,
  'days_since_last_purchase': 45,
  'customer_lifetime_value': 450
});
```

#### E-commerce User Properties

```javascript
gtag('set', {
  'customer_value': 'high',
  'purchase_frequency': 'monthly',
  'average_order_value': 150,
  'customer_lifetime_value': 3000,
  'loyalty_tier': 'gold',
  'preferred_category': 'shoes',
  'total_purchases': 15,
  'last_purchase_days_ago': 30
});
```

---

### Education / EdTech

#### Enrollment & Course Events

```javascript
// User enrolls in course
gtag('event', 'course_enroll', {
  'course_id': 'PYTHON_101',
  'course_name': 'Python Fundamentals',
  'instructor_id': 'INSTR_001',
  'course_price': 99,
  'course_level': 'beginner',
  'payment_method': 'credit_card'
});

// User starts course
gtag('event', 'course_start', {
  'course_id': 'PYTHON_101',
  'enrollment_to_start_days': 2
});

// User completes course
gtag('event', 'course_complete', {
  'course_id': 'PYTHON_101',
  'course_completion_percent': 100,
  'days_to_completion': 30,
  'final_score': 92
});

// User drops course
gtag('event', 'course_drop', {
  'course_id': 'PYTHON_101',
  'completion_percent': 45,
  'reason': 'time_constraints'
});
```

#### Learning Activities

```javascript
// User completes lesson
gtag('event', 'lesson_complete', {
  'course_id': 'PYTHON_101',
  'lesson_id': 'LESSON_005',
  'lesson_title': 'Functions and Loops',
  'time_spent_minutes': 45,
  'lesson_completion_percent': 100
});

// User takes quiz
gtag('event', 'quiz_submit', {
  'course_id': 'PYTHON_101',
  'quiz_id': 'QUIZ_003',
  'quiz_title': 'Module 3 Assessment',
  'questions_correct': 8,
  'questions_total': 10,
  'quiz_score_percent': 80,
  'attempts': 2
});

// User watches video lesson
gtag('event', 'video_watch', {
  'course_id': 'PYTHON_101',
  'video_id': 'VID_001',
  'video_title': 'Introduction to Functions',
  'video_duration_minutes': 12,
  'watch_time_minutes': 11,
  'playback_speed': '1.0x',
  'replays': 1
});

// User downloads resource
gtag('event', 'course_resource_download', {
  'course_id': 'PYTHON_101',
  'resource_type': 'code_files',
  'resource_size_mb': 25
});

// User accesses discussion forum
gtag('event', 'forum_post_create', {
  'course_id': 'PYTHON_101',
  'post_category': 'technical_question',
  'post_upvotes_received': 3
});
```

#### Progress & Achievements

```javascript
// User earns certificate
gtag('event', 'certificate_earn', {
  'course_id': 'PYTHON_101',
  'certificate_type': 'completion',
  'final_grade': 'A',
  'certificate_sharable': true
});

// User earns badge
gtag('event', 'badge_unlock', {
  'badge_name': 'Quick Learner',
  'badge_type': 'achievement',
  'criteria_met': 'complete_3_courses_in_month'
});

// User reaches learning milestone
gtag('event', 'learning_milestone_reach', {
  'milestone_name': 'proficiency_level_2',
  'courses_completed': 3,
  'total_learning_hours': 50
});
```

#### Education User Properties

```javascript
gtag('set', {
  'student_tier': 'premium',
  'total_courses_enrolled': 5,
  'total_courses_completed': 3,
  'average_course_rating': 4.5,
  'total_learning_hours': 50,
  'specialization': 'python_development',
  'progress_percent': 60
});
```

---

### Media & Publishing

#### Content Consumption

```javascript
// User views article
gtag('event', 'article_view', {
  'article_id': 'ART_001',
  'article_title': 'GA4 Complete Guide',
  'article_category': 'analytics',
  'article_author': 'John Doe',
  'publication_date': '2024-11-01',
  'article_word_count': 5000
});

// User reaches scroll depth
gtag('event', 'article_scroll_depth', {
  'article_id': 'ART_001',
  'scroll_depth_percent': 75,
  'time_on_page_seconds': 300
});

// User reads entire article
gtag('event', 'article_read_complete', {
  'article_id': 'ART_001',
  'reading_time_seconds': 1200,
  'estimated_reading_time_seconds': 1500
});

// User watches video
gtag('event', 'video_watch_start', {
  'video_id': 'VID_001',
  'video_title': 'GA4 Tutorial',
  'video_duration_minutes': 15,
  'video_category': 'tutorial'
});

// User listens to podcast
gtag('event', 'podcast_listen', {
  'episode_id': 'EP_123',
  'episode_title': 'Analytics Trends 2024',
  'listen_time_minutes': 45,
  'listened_to_end': true
});
```

#### Engagement & Interaction

```javascript
// User shares content
gtag('event', 'content_share', {
  'content_id': 'ART_001',
  'content_type': 'article',
  'share_method': 'email'
});

// User comments on content
gtag('event', 'content_comment', {
  'content_id': 'ART_001',
  'comment_length': 250,
  'comment_helpful_votes': 5
});

// User likes/claps content
gtag('event', 'content_engage', {
  'content_id': 'ART_001',
  'engagement_type': 'like',
  'engagement_value': 1
});

// User bookmarks content
gtag('event', 'content_bookmark', {
  'content_id': 'ART_001',
  'content_type': 'article',
  'bookmark_folder': 'analytics'
});
```

#### Subscription & Monetization

```javascript
// User subscribes to newsletter
gtag('event', 'newsletter_subscribe', {
  'newsletter_name': 'Weekly Analytics',
  'subscription_frequency': 'weekly',
  'email_validated': true
});

// User upgrades to premium
gtag('event', 'paywall_cross', {
  'article_id': 'ART_001',
  'paywall_type': 'subscription',
  'conversion_value': 99
});

// User purchases single article
gtag('event', 'article_purchase', {
  'article_id': 'ART_001',
  'purchase_price': 4.99,
  'currency': 'USD'
});

// User renews subscription
gtag('event', 'subscription_renew', {
  'subscription_plan': 'annual',
  'renewal_value': 99,
  'tenure_years': 2
});
```

#### Media User Properties

```javascript
gtag('set', {
  'subscriber_status': 'premium',
  'subscription_plan': 'annual',
  'favorite_categories': 'analytics,marketing',
  'total_articles_read': 45,
  'average_article_completion': 0.75,
  'engagement_level': 'high'
});
```

---

## Cross-Industry Event Patterns

### Common to All Industries

**User Registration & Authentication:**
```javascript
gtag('event', 'user_signup', {
  'signup_method': 'email',
  'email_verified': true,
  'signup_source': 'landing_page'
});

gtag('event', 'user_login', {
  'login_method': 'password',
  'login_platform': 'web'
});
```

**Account Management:**
```javascript
gtag('event', 'profile_update', {
  'fields_updated': 3,
  'completion_percent': 100
});

gtag('event', 'preference_change', {
  'preference_type': 'language',
  'new_value': 'spanish'
});
```

**Help & Support:**
```javascript
gtag('event', 'help_search', {
  'search_query': 'how to export data',
  'results_count': 5
});

gtag('event', 'live_chat_start', {
  'chat_topic': 'billing',
  'wait_time_seconds': 30
});
```

---

## Custom Event Templates by Use Case

### Sign-Up Funnel Tracking
```javascript
gtag('event', 'signup_step_1_view');      // Email input
gtag('event', 'signup_step_2_view');      // Password
gtag('event', 'signup_complete');         // Confirmation
```

### Feature Adoption Funnel
```javascript
gtag('event', 'feature_discover');   // See feature
gtag('event', 'feature_enable');     // Turn on
gtag('event', 'feature_use');        // Actually use
gtag('event', 'feature_value_realize');  // Sees benefit
```

### Conversion Value Path
```javascript
gtag('event', 'awareness_content_view');   // Top of funnel
gtag('event', 'consideration_comparison');  // Middle
gtag('event', 'decision_contact');          // Bottom
gtag('event', 'purchase');                   // Conversion
```
