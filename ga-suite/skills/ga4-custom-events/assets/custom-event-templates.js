/**
 * GA4 Custom Event Templates
 * Ready-to-use implementations for common business scenarios
 * Modify event names and parameters to match your business logic
 */

// ============================================================================
// SAAS EVENT TEMPLATES
// ============================================================================

/**
 * SaaS Free Trial Signup
 * Track when user initiates a free trial
 */
function trackTrialSignup(planType, source) {
  gtag('event', 'trial_signup', {
    'trial_plan': planType,              // 'professional', 'enterprise'
    'trial_days': 30,
    'source': source,                    // 'landing_page', 'email', 'ad'
    'campaign': getUTMParameter('utm_campaign')
  });
}

/**
 * SaaS Trial to Paid Conversion
 * Track when trial user converts to paid subscription
 */
function trackTrialConversion(trialPlan, paidPlan, conversionValue) {
  gtag('event', 'trial_conversion', {
    'trial_plan': trialPlan,
    'paid_plan': paidPlan,
    'conversion_value': conversionValue,
    'trial_duration_days': calculateTrialDays(),
    'most_used_feature': getMostUsedFeature()
  });

  // Also set as user property
  gtag('set', {
    'subscription_plan': paidPlan,
    'subscription_status': 'active'
  });
}

/**
 * SaaS Feature Adoption
 * Track when user enables/activates a premium feature
 */
function trackFeatureAdoption(featureName, featureCategory) {
  gtag('event', 'feature_enable', {
    'feature_name': featureName,         // 'team_collaboration', 'api_access'
    'feature_category': featureCategory, // 'premium', 'beta', 'advanced'
    'user_plan': getCurrentUserPlan(),
    'days_since_signup': calculateDaysSinceSignup(),
    'discovery_method': 'settings'       // 'settings', 'email', 'notification'
  });

  // Track as user property if persistent feature
  gtag('set', {
    'features_enabled': incrementFeatureCount()
  });
}

/**
 * SaaS Subscription Upgrade
 * Track plan upgrades
 */
function trackSubscriptionUpgrade(fromPlan, toPlan) {
  const priceIncrease = calculatePriceIncrease(fromPlan, toPlan);

  gtag('event', 'subscription_upgrade', {
    'from_plan': fromPlan,
    'to_plan': toPlan,
    'upgrade_value': priceIncrease,
    'currency': 'USD',
    'customer_tenure_months': getCustomerTenure()
  });

  // Update user property
  gtag('set', {
    'subscription_plan': toPlan,
    'monthly_recurring_revenue': getPlanPrice(toPlan)
  });
}

/**
 * SaaS Subscription Cancellation
 * Track when user cancels subscription
 */
function trackSubscriptionCancel(plan, reason) {
  gtag('event', 'subscription_cancel', {
    'plan': plan,
    'reason': reason,                    // 'too_expensive', 'not_using', 'switching'
    'tenure_months': getCustomerTenure(),
    'mrr': getMRR(),
    'ltv': getCustomerLTV()
  });

  // Update user property
  gtag('set', {
    'subscription_status': 'cancelled'
  });
}

// ============================================================================
// E-COMMERCE EVENT TEMPLATES
// ============================================================================

/**
 * Product View
 * Track when user views product page
 */
function trackProductView(productId, productName, price, category) {
  gtag('event', 'view_item', {
    'items': [
      {
        'item_id': productId,
        'item_name': productName,
        'price': price,
        'item_category': category,
        'item_variant': getProductVariant(),
        'item_brand': getProductBrand()
      }
    ],
    'value': price,
    'currency': 'USD',
    'source_page': getCurrentPage()
  });
}

/**
 * Add to Cart
 * Track when user adds product to shopping cart
 */
function trackAddToCart(productId, productName, quantity, price) {
  gtag('event', 'add_to_cart', {
    'items': [
      {
        'item_id': productId,
        'item_name': productName,
        'quantity': quantity,
        'price': price,
        'item_category': getProductCategory(productId)
      }
    ],
    'value': price * quantity,
    'currency': 'USD'
  });
}

/**
 * Begin Checkout
 * Track when user starts checkout process
 */
function trackBeginCheckout(items, cartValue) {
  gtag('event', 'begin_checkout', {
    'items': items.map(item => ({
      'item_id': item.id,
      'item_name': item.name,
      'quantity': item.quantity,
      'price': item.price
    })),
    'value': cartValue,
    'currency': 'USD',
    'coupon_applied': hasCoupon()
  });
}

/**
 * Purchase Event
 * Track completed purchase
 */
function trackPurchase(transactionId, items, total, tax, shipping, coupon) {
  gtag('event', 'purchase', {
    'transaction_id': transactionId,
    'affiliation': getStoreName(),
    'value': total,
    'currency': 'USD',
    'tax': tax,
    'shipping': shipping,
    'coupon': coupon,
    'items': items.map(item => ({
      'item_id': item.id,
      'item_name': item.name,
      'item_category': item.category,
      'item_brand': item.brand,
      'price': item.price,
      'quantity': item.quantity
    }))
  });

  // Update user properties
  gtag('set', {
    'purchase_count': incrementPurchaseCount(),
    'customer_lifetime_value': updateLTV(),
    'last_purchase_date': getCurrentDate()
  });
}

/**
 * Product Review Submission
 * Track when user submits product review
 */
function trackProductReview(productId, rating, reviewLength) {
  gtag('event', 'product_review_submit', {
    'product_id': productId,
    'rating': rating,                    // 1-5 stars
    'review_length': reviewLength,       // character count
    'verified_purchase': isVerifiedPurchase()
  });
}

// ============================================================================
// EDUCATION/LEARNING EVENT TEMPLATES
// ============================================================================

/**
 * Course Enrollment
 * Track when user enrolls in a course
 */
function trackCourseEnroll(courseId, courseName, price) {
  gtag('event', 'course_enroll', {
    'course_id': courseId,
    'course_name': courseName,
    'course_level': getCourseLevel(courseId),
    'price': price,
    'currency': 'USD',
    'enrollment_method': 'direct'        // 'direct', 'subscription', 'free'
  });

  // Update user property
  gtag('set', {
    'courses_enrolled': incrementEnrolledCount(),
    'total_spent_on_courses': updateCoursesSpent(price)
  });
}

/**
 * Lesson Completion
 * Track when user finishes a lesson
 */
function trackLessonComplete(courseId, lessonId, timeSpentMinutes, score) {
  gtag('event', 'lesson_complete', {
    'course_id': courseId,
    'lesson_id': lessonId,
    'lesson_title': getLessonTitle(lessonId),
    'time_spent_minutes': timeSpentMinutes,
    'completion_score': score,           // percentage or points
    'is_required': isRequiredLesson(lessonId)
  });
}

/**
 * Quiz Submission
 * Track when user submits quiz
 */
function trackQuizSubmit(courseId, quizId, correctAnswers, totalQuestions, score) {
  gtag('event', 'quiz_submit', {
    'course_id': courseId,
    'quiz_id': quizId,
    'questions_correct': correctAnswers,
    'questions_total': totalQuestions,
    'score_percent': Math.round((correctAnswers / totalQuestions) * 100),
    'attempts': getQuizAttemptCount(),
    'passed': score >= getPassingScore()
  });
}

/**
 * Certificate Earned
 * Track when user earns course certificate
 */
function trackCertificateEarn(courseId, certificateType, finalScore) {
  gtag('event', 'certificate_earn', {
    'course_id': courseId,
    'certificate_type': certificateType,  // 'completion', 'achievement'
    'final_score': finalScore,
    'days_to_completion': calculateDaysToCompletion(),
    'shared_socially': false              // will update if shared later
  });

  // Update user property
  gtag('set', {
    'certificates_earned': incrementCertificateCount(),
    'total_learning_hours': updateTotalHours()
  });
}

// ============================================================================
// CONTENT/MEDIA EVENT TEMPLATES
// ============================================================================

/**
 * Article/Blog Post View
 * Track when user reads article
 */
function trackArticleView(articleId, articleTitle, category, authorId) {
  gtag('event', 'article_view', {
    'article_id': articleId,
    'article_title': articleTitle,
    'article_category': category,
    'author_id': authorId,
    'article_word_count': getArticleWordCount(),
    'publication_date': getArticleDate()
  });
}

/**
 * Article Read Complete
 * Track when user reads entire article
 */
function trackArticleReadComplete(articleId, timeOnPageSeconds) {
  gtag('event', 'article_read_complete', {
    'article_id': articleId,
    'time_on_page_seconds': timeOnPageSeconds,
    'estimated_reading_time_seconds': getEstimatedReadingTime(articleId),
    'reading_efficiency': calculateReadingEfficiency(timeOnPageSeconds)
  });
}

/**
 * Video Watch Start
 * Track when user starts watching video
 */
function trackVideoStart(videoId, videoTitle, duration, category) {
  gtag('event', 'video_start', {
    'video_id': videoId,
    'video_title': videoTitle,
    'video_duration_seconds': duration,
    'video_category': category
  });
}

/**
 * Video Complete
 * Track when user completes video
 */
function trackVideoComplete(videoId, watchTimeSeconds, duration) {
  const completionPercent = Math.round((watchTimeSeconds / duration) * 100);

  gtag('event', 'video_complete', {
    'video_id': videoId,
    'watch_time_seconds': watchTimeSeconds,
    'video_duration_seconds': duration,
    'completion_percent': completionPercent,
    'quality_watched': getPlaybackQuality(),
    'watch_count': incrementVideoWatchCount()
  });
}

/**
 * Content Share
 * Track when user shares content
 */
function trackContentShare(contentId, contentType, method) {
  gtag('event', 'content_share', {
    'content_id': contentId,
    'content_type': contentType,         // 'article', 'video', 'resource'
    'share_method': method,              // 'email', 'twitter', 'facebook', 'linkedin'
    'timestamp': getCurrentTime()
  });
}

/**
 * Newsletter Signup
 * Track when user subscribes to newsletter
 */
function trackNewsletterSignup(category, frequency) {
  gtag('event', 'newsletter_subscribe', {
    'newsletter_category': category,     // 'weekly_digest', 'industry_news'
    'frequency': frequency,              // 'daily', 'weekly', 'monthly'
    'email_validated': true,
    'signup_source': getSignupSource()   // 'exit_intent', 'footer', 'sidebar'
  });

  // Update user property
  gtag('set', {
    'newsletter_subscribed': true,
    'newsletter_categories': category
  });
}

// ============================================================================
// SUPPORT/HELP EVENT TEMPLATES
// ============================================================================

/**
 * Support Ticket Created
 * Track when user opens support ticket
 */
function trackSupportTicket(category, severity, userPlan) {
  gtag('event', 'support_ticket_create', {
    'ticket_category': category,         // 'billing', 'technical', 'feature_request'
    'severity': severity,                // 'low', 'medium', 'high', 'critical'
    'user_plan': userPlan,
    'response_time_expectation': 'within_24_hours'
  });
}

/**
 * Help Article View
 * Track when user searches for help
 */
function trackHelpSearch(searchTerm, resultsCount, articleClicked) {
  gtag('event', 'help_search', {
    'search_term': searchTerm,
    'search_results_count': resultsCount,
    'article_clicked': articleClicked,
    'search_category': 'knowledge_base'  // 'knowledge_base', 'faq', 'documentation'
  });
}

/**
 * Feature Request Submitted
 * Track when user requests new feature
 */
function trackFeatureRequest(featureName, useCase) {
  gtag('event', 'feature_request_submit', {
    'requested_feature': featureName,
    'use_case': useCase,
    'upvote_count': 1
  });
}

// ============================================================================
// SIGNUP/AUTHENTICATION EVENT TEMPLATES
// ============================================================================

/**
 * User Signup
 * Track account creation
 */
function trackUserSignup(signupMethod, source) {
  gtag('event', 'user_signup', {
    'signup_method': signupMethod,       // 'email', 'google', 'facebook', 'github'
    'signup_source': source,             // 'landing_page', 'app', 'email'
    'email_verified': false              // Will update when verified
  });

  // Set user properties
  gtag('set', {
    'signup_date': getCurrentDate(),
    'signup_method': signupMethod,
    'email_verified': false
  });
}

/**
 * Email Verification
 * Track when user verifies email
 */
function trackEmailVerified() {
  gtag('event', 'email_verified', {
    'verification_method': 'email_link', // 'email_link', 'sms_code', 'oauth'
    'time_to_verify_minutes': calculateMinutesSinceSignup()
  });

  // Update user property
  gtag('set', {
    'email_verified': true
  });
}

/**
 * User Login
 * Track when user logs in
 */
function trackUserLogin(loginMethod, isFirstLogin) {
  gtag('event', 'user_login', {
    'login_method': loginMethod,         // 'password', 'sso', 'social'
    'is_first_login': isFirstLogin,
    'platform': getPlatform()            // 'web', 'mobile', 'desktop'
  });
}

// ============================================================================
// ACCOUNT MANAGEMENT EVENT TEMPLATES
// ============================================================================

/**
 * Profile Completion
 * Track user profile progress
 */
function trackProfileComplete(completionPercent, fieldsUpdated) {
  gtag('event', 'profile_complete', {
    'completion_percent': completionPercent,
    'fields_updated': fieldsUpdated,
    'has_profile_photo': hasProfilePhoto(),
    'has_bio': hasBio()
  });

  if (completionPercent === 100) {
    gtag('set', {
      'profile_complete': true
    });
  }
}

/**
 * Settings Changed
 * Track when user changes account settings
 */
function trackSettingsChange(settingType, newValue) {
  gtag('event', 'settings_change', {
    'setting_type': settingType,         // 'language', 'timezone', 'notifications'
    'new_value': newValue,
    'previous_value': getPreviousValue(settingType)
  });
}

/**
 * Payment Method Added
 * Track when user adds payment method
 */
function trackPaymentMethodAdd(paymentType) {
  gtag('event', 'payment_method_add', {
    'payment_type': paymentType,         // 'credit_card', 'paypal', 'bank_transfer'
    'payment_methods_count': incrementPaymentMethodCount(),
    'is_default': false
  });
}

// ============================================================================
// HELPER FUNCTIONS (Replace with your actual implementation)
// ============================================================================

function getUTMParameter(param) {
  const url = new URLSearchParams(window.location.search);
  return url.get(param) || '';
}

function getCurrentUserPlan() {
  // Get from your user data/API
  return localStorage.getItem('userPlan') || 'free';
}

function calculateTrialDays() {
  // Calculate days from trial start to now
  const trialStart = new Date(localStorage.getItem('trialStartDate'));
  return Math.floor((new Date() - trialStart) / (1000 * 60 * 60 * 24));
}

function getMostUsedFeature() {
  // Get from your analytics/tracking
  return 'reporting';
}

function getCustomerTenure() {
  // Get from your database
  return parseInt(localStorage.getItem('customerTenureMonths')) || 0;
}

function calculateDaysSinceSignup() {
  const signupDate = new Date(localStorage.getItem('signupDate'));
  return Math.floor((new Date() - signupDate) / (1000 * 60 * 60 * 24));
}

function getCurrentPage() {
  return window.location.pathname;
}

function getProductCategory(productId) {
  // Get from your product database
  return 'electronics';
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function getCurrentTime() {
  return new Date().toISOString();
}

function getPlatform() {
  return /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'mobile' : 'web';
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    trackTrialSignup,
    trackTrialConversion,
    trackFeatureAdoption,
    trackSubscriptionUpgrade,
    trackSubscriptionCancel,
    trackProductView,
    trackAddToCart,
    trackBeginCheckout,
    trackPurchase,
    trackCourseEnroll,
    trackLessonComplete,
    trackVideoStart,
    trackVideoComplete,
    trackNewsletterSignup,
    trackUserSignup,
    trackUserLogin,
    trackProfileComplete,
    trackSettingsChange
  };
}
