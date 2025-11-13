# GA4 Custom Event Naming Conventions Guide

## Complete Reference for Event Naming Strategy

### Core Naming Rules

**Rule 1: Use snake_case**
```
✅ Correct: video_tutorial_watched
❌ Wrong: VideoTutorialWatched, video-tutorial-watched
```

**Rule 2: Maximum 40 Characters**
```
✅ Correct: product_demo_request_submitted (34 chars)
❌ Wrong: product_demo_request_submitted_by_enterprise_user (57 chars)
```

**Rule 3: Start with Action Verb When Possible**
```
✅ Correct: file_downloaded, calculator_used, video_started
❌ Wrong: download_file, use_calculator, start_video
```

**Rule 4: Be Descriptive to Business Context**
```
✅ Correct: api_key_generated, subscription_upgraded, refund_requested
❌ Wrong: action, event, click, data
```

**Rule 5: Maintain Consistency**
```
✅ Correct: Always "video_completed" (never video_done, video_finished)
❌ Wrong: Mixing "cart_abandoned", "cartAbandoned", "cart_left"
```

---

## Naming Framework: [Action]_[Object]_[Context]

### Pattern Breakdown

**Action:** What the user is doing
- `view`, `create`, `update`, `delete`, `submit`, `download`, `watch`, `listen`
- `click`, `scroll`, `hover`, `focus`, `select`, `open`, `close`
- `start`, `complete`, `pause`, `resume`, `skip`, `error`
- `upgrade`, `downgrade`, `cancel`, `refund`, `return`

**Object:** What entity is being acted upon
- `video`, `article`, `product`, `course`, `trial`, `subscription`
- `button`, `form`, `popup`, `modal`, `notification`
- `cart`, `order`, `invoice`, `receipt`, `account`
- `dashboard`, `report`, `export`, `import`, `setting`

**Context:** Qualifier or category (optional)
- `_free`, `_premium`, `_enterprise`, `_trial`
- `_mobile`, `_desktop`, `_tablet`
- `_email`, `_social`, `_referral`
- `_failed`, `_success`, `_error`, `_retry`

### Framework Examples

**E-commerce Context:**
- `product_view` (user viewed product)
- `product_compare_viewed` (comparison page opened)
- `add_to_cart` (item added to shopping cart)
- `wishlist_add` (item added to saved list)
- `review_submit` (product review posted)
- `add_to_cart_mobile` (mobile-specific cart action)

**SaaS Context:**
- `trial_start` (free trial activated)
- `trial_end` (trial period ended)
- `feature_unlock` (premium feature accessed)
- `api_key_create` (authentication token generated)
- `integration_connect` (third-party service linked)
- `upgrade_click` (upgrade button clicked)

**Content Context:**
- `video_start` (video playback began)
- `video_complete` (video finished)
- `article_read` (article fully read)
- `podcast_skip` (podcast episode skipped)
- `download_start` (resource download initiated)
- `whitepaper_request` (lead magnet requested)

**SaaS Trial Context:**
- `trial_signup` (trial account created)
- `trial_feature_use` (premium feature tested during trial)
- `trial_extend` (trial period extended)
- `trial_convert` (trial upgraded to paid)
- `trial_abandon` (trial left unused)

---

## Industry Naming Patterns

### SaaS Specific

**Onboarding & Activation:**
- `onboarding_start`, `onboarding_step_completed`, `onboarding_complete`
- `welcome_tour_start`, `tutorial_lesson_completed`
- `first_data_entry`, `first_report_generated`

**Feature Engagement:**
- `feature_discover`, `feature_explore`, `feature_adopt`
- `integration_setup`, `integration_test`, `integration_activate`
- `api_call_success`, `api_error_encountered`

**Monetization:**
- `upgrade_modal_view`, `upgrade_click`, `upgrade_complete`
- `plan_comparison_view`, `pricing_page_visit`
- `subscription_pause`, `subscription_resume`, `subscription_cancel`

**Support & Help:**
- `help_article_search`, `help_article_view`, `help_article_helpful`
- `support_ticket_open`, `support_chat_start`
- `feature_request_submit`, `bug_report_submit`

### Education Specific

**Course Engagement:**
- `course_enroll`, `course_start`, `course_complete`
- `lesson_view`, `lesson_complete`, `lesson_retry`
- `quiz_attempt`, `quiz_submit`, `quiz_pass`

**Learning Progress:**
- `certificate_earn`, `badge_unlock`, `milestone_reach`
- `study_streak_start`, `study_streak_end`
- `resource_download`, `note_create`, `bookmark_add`

**Social & Collaboration:**
- `discussion_post_create`, `discussion_reply`, `discussion_helpful_vote`
- `peer_review_submit`, `study_group_join`

### Media/Publishing Specific

**Content Consumption:**
- `article_read_start`, `article_read_complete`, `article_scroll_depth_100`
- `video_play`, `video_pause`, `video_quality_change`
- `podcast_episode_start`, `podcast_episode_complete`

**Engagement:**
- `content_share`, `content_comment`, `content_like`
- `newsletter_signup`, `newsletter_open`, `newsletter_click`
- `bookmark_save`, `bookmark_view`, `bookmark_share`

**Creator Features:**
- `draft_create`, `article_publish`, `video_upload`
- `monetization_enable`, `subscriber_only_content_publish`

### E-commerce Specific

**Product Discovery:**
- `search_submit`, `filter_apply`, `sort_change`
- `category_view`, `subcategory_view`
- `product_review_read`, `product_rating_view`

**Purchase Journey:**
- `product_add_to_cart`, `cart_view`, `cart_update_quantity`
- `checkout_start`, `shipping_option_select`, `payment_method_select`
- `apply_coupon`, `coupon_remove`, `gift_card_apply`

**Post-Purchase:**
- `order_confirmation_view`, `order_tracking_click`
- `product_return_initiate`, `refund_request_submit`

---

## Naming Checklist

Before finalizing custom event names:

- [ ] Event name is snake_case (lowercase, underscores)
- [ ] Event name is under 40 characters
- [ ] Event name is action-oriented (verb first when possible)
- [ ] Event name is specific to business domain
- [ ] Event name is consistent with existing naming scheme
- [ ] Event name doesn't duplicate a recommended event
- [ ] Event name would be understandable to business stakeholders
- [ ] Event name could be documented without parameters
- [ ] Event is documented in team's event dictionary
- [ ] Event follows organization's naming standards

---

## Anti-Pattern Examples to Avoid

### Generic Names
```
❌ Bad: click, event, action, user_action, interaction
✅ Good: button_click, demo_button_click, video_play_click
```

### Vague Names
```
❌ Bad: data, info, tracking, send, request
✅ Good: customer_data_export, form_submit_request, contact_email_send
```

### Inconsistent Names
```
❌ Bad: "user_signup", "registerUser", "SignUp", "sign_up_completed"
✅ Good: Always "user_signup" (consistent)
```

### Over-specific Names
```
❌ Bad: "user_clicked_blue_button_in_hero_section_on_homepage_on_mobile"
✅ Good: "hero_cta_click" or "homepage_cta_click"
```

### Parameters in Event Names
```
❌ Bad: "video_watched_hd", "trial_signup_30day", "user_from_google"
✅ Good: "video_watched" with parameter video_quality="hd"
```

---

## Implementation Examples

### Example 1: Complete Naming Decision

**Business Goal:** Track when users request product demo

**Naming Process:**
1. Action: request, submit
2. Object: demo, product_demo
3. Context: (none needed, already specific)

**Decision:** `demo_request` or `demo_request_submit`?
- `demo_request` (28 chars) - Better: action is implied in "request"
- Final name: `demo_request`

### Example 2: SaaS Feature Adoption

**Business Goal:** Track when users enable an integration

**Naming Process:**
1. Action: enable, activate, setup, connect
2. Object: integration
3. Context: integration type

**Decision:** `integration_enabled` or `integration_setup_complete`?
- `integration_enabled` (21 chars) - Clean and action-oriented
- Final name: `integration_enabled`
- Parameter: `integration_type` (e.g., "slack", "zapier")

### Example 3: Educational Progress

**Business Goal:** Track when students complete quiz

**Naming Process:**
1. Action: submit, complete, finish
2. Object: quiz
3. Context: (optional: pass/fail)

**Decision:** `quiz_submit` or `quiz_complete`?
- `quiz_submit` (11 chars) - User action
- Final name: `quiz_submit`
- Parameter: `quiz_result` (e.g., "pass", "fail"), `score` (numeric)

---

## Team Naming Standards (Template)

Document your organization's naming conventions:

```
Event Naming Standard
====================

Format: [action]_[object]_[context]

Actions Used: create, update, delete, view, submit, download, upload, upload, share
Objects: product, course, video, article, user, team, workspace, settings
Context: Optional qualifiers like _mobile, _free, _premium, _failed

Examples Approved:
- product_view
- course_enroll
- quiz_submit
- integration_enabled
- support_ticket_create

Examples Not Approved:
- user_action
- click_event
- data_send
```
