# Engagement Events Reference

## Non-Ecommerce Recommended Events

This reference covers recommended events for user engagement tracking beyond ecommerce transactions.

---

## Authentication Events

### login

**Purpose:** Track user login/authentication

**Parameters:**
- `method` (required) - Authentication method used

**Authentication Methods:**
- `email` - Email and password
- `phone` - Phone number verification
- `social` - Social network login
- `google` - Google Sign-in
- `facebook` - Facebook Login
- `apple` - Apple Sign-in
- `microsoft` - Microsoft/Office 365
- `saml` - SAML enterprise login
- `fingerprint` - Biometric authentication
- `password` - Password-only
- `sso` - Single sign-on

**Implementation:**
```javascript
gtag('event', 'login', {
  'method': 'google'
});
```

**Different Authentication Methods:**
```javascript
// Social login
gtag('event', 'login', {
  'method': 'facebook'
});

// Enterprise SSO
gtag('event', 'login', {
  'method': 'saml'
});

// Biometric
gtag('event', 'login', {
  'method': 'fingerprint'
});
```

**Reporting Use:**
- User authentication tracking
- Auth method effectiveness
- Login success/failure analysis
- Funnel starting point

---

### sign_up

**Purpose:** Track new account creation

**Parameters:**
- `method` (required) - Registration method

**Registration Methods:**
- `email` - Email registration
- `phone` - Phone registration
- `social` - Social signup
- `google` - Google signup
- `facebook` - Facebook signup
- `apple` - Apple ID signup
- `in_app` - Mobile app signup
- `api` - Programmatic signup

**Implementation:**
```javascript
gtag('event', 'sign_up', {
  'method': 'email'
});
```

**Alternative Signup Methods:**
```javascript
// Social network signup
gtag('event', 'sign_up', {
  'method': 'apple'
});

// In-app registration
gtag('event', 'sign_up', {
  'method': 'in_app'
});
```

**Reporting Use:**
- New user acquisition
- Registration method performance
- Signup funnel analysis
- Revenue attribution from signups

---

## Content Engagement Events

### search

**Purpose:** Track site/app search functionality

**Parameters:**
- `search_term` (required) - What user searched for

**Implementation:**
```javascript
document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var searchTerm = document.getElementById('search-input').value;

  gtag('event', 'search', {
    'search_term': searchTerm
  });

  // Perform search
  performSearch(searchTerm);
});
```

**Advanced Implementation:**
```javascript
// Track search with result count
gtag('event', 'search', {
  'search_term': 'blue shoes',
  'search_results_count': 42  // Custom parameter
});
```

**Reporting Use:**
- Popular search terms
- Search-to-purchase analysis
- Search effectiveness
- Missing products (failed searches)

**Best Practices:**
- Send before results load (immediate)
- Don't include user input errors
- Standardize term formatting (lowercase)

---

### view_item

**Purpose:** User views product/content detail

**Parameters:**
- `items` (required) - Array with item_id and item_name
- `value` (recommended) - Item price
- `currency` (recommended) - Currency code

*See "items-array-reference.md" for complete details*

---

### view_item_list

**Purpose:** User views collection/search results/category

**Parameters:**
- `items` (required) - Array of products
- `item_list_id` (recommended) - List identifier
- `item_list_name` (recommended) - List name

**Implementation:**
```javascript
// On category page load
gtag('event', 'view_item_list', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'item_category': 'Electronics'
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Product B',
      'item_category': 'Electronics'
    }
  ],
  'item_list_id': 'category_electronics',
  'item_list_name': 'Electronics Category'
});
```

**List Types:**
- Category browse
- Search results
- Featured/homepage
- Recommendations
- Related products
- Best sellers
- New arrivals

---

### select_item

**Purpose:** User selects item from list

**Parameters:**
- `items` (required) - Selected item(s)
- `item_list_id` (optional) - List identifier
- `item_list_name` (optional) - List name

**Implementation:**
```javascript
document.querySelectorAll('.product-link').forEach(function(link) {
  link.addEventListener('click', function() {
    var itemId = this.getAttribute('data-item-id');
    var itemName = this.getAttribute('data-item-name');

    gtag('event', 'select_item', {
      'items': [{
        'item_id': itemId,
        'item_name': itemName,
        'item_list_name': 'Search Results'
      }]
    });
  });
});
```

**Reporting Use:**
- Click-through rate from lists
- Product popularity
- List effectiveness
- Search result performance

---

## Promotion Events

### view_promotion

**Purpose:** Promotional banner/offer displayed

**Parameters:**
- `promotion_id` (recommended) - Promotion identifier
- `promotion_name` (recommended) - Promotion name

**Implementation:**
```javascript
// On promotion banner visible
gtag('event', 'view_promotion', {
  'promotion_id': 'SUMMER_SALE_2024',
  'promotion_name': '50% Off Summer Sale'
});
```

**Reporting Use:**
- Promotion impressions
- Banner effectiveness
- Which promotions drive traffic

---

### select_promotion

**Purpose:** User clicks promotion

**Parameters:**
- `promotion_id` (recommended) - Promotion identifier
- `promotion_name` (recommended) - Promotion name

**Implementation:**
```javascript
document.querySelector('.promotion-banner').addEventListener('click', function() {
  gtag('event', 'select_promotion', {
    'promotion_id': 'SUMMER_SALE_2024',
    'promotion_name': '50% Off Summer Sale'
  });

  // Navigate to sale
  window.location.href = '/sale';
});
```

**Reporting Use:**
- Promotion click rates
- Promotion-to-purchase funnel
- CTR by promotion type

---

## Sharing and Social Events

### share

**Purpose:** User shares content

**Parameters:**
- `method` (optional) - Share method
- `content_type` (optional) - Type of content
- `item_id` (optional) - Content identifier

**Share Methods:**
- `email`
- `facebook`
- `twitter`
- `whatsapp`
- `sms`
- `copy_link`
- `print`
- `native` (iOS share sheet)

**Implementation:**
```javascript
// Email share
document.getElementById('email-share-btn').addEventListener('click', function() {
  gtag('event', 'share', {
    'method': 'email',
    'content_type': 'product',
    'item_id': 'SKU_123'
  });
});

// Social share
document.getElementById('facebook-share-btn').addEventListener('click', function() {
  gtag('event', 'share', {
    'method': 'facebook',
    'content_type': 'article',
    'item_id': 'article_456'
  });
});
```

**Reporting Use:**
- Content virality
- Share method preferences
- Shared content performance

---

### join_group

**Purpose:** User joins group/team/community

**Parameters:**
- `group_id` (optional) - Group identifier

**Implementation:**
```javascript
gtag('event', 'join_group', {
  'group_id': 'premium_members'
});
```

---

## Interaction Events

### select_content

**Purpose:** User selects specific content

**Parameters:**
- `content_type` (optional) - Content type
- `item_id` (optional) - Content identifier

**Content Types:**
- `product`
- `article`
- `video`
- `audio`
- `image`
- `document`
- `app`
- `game`
- `course`
- `lesson`

**Implementation:**
```javascript
// Video selection
gtag('event', 'select_content', {
  'content_type': 'video',
  'item_id': 'video_123'
});

// Article selection
gtag('event', 'select_content', {
  'content_type': 'article',
  'item_id': 'article_456'
});

// Course lesson
gtag('event', 'select_content', {
  'content_type': 'lesson',
  'item_id': 'lesson_789'
});
```

**Reporting Use:**
- Content popularity
- Content engagement patterns
- Most viewed content

---

## Lead Generation Events

### generate_lead

**Purpose:** Track lead generation (form submission, quote request, etc.)

**Parameters:**
- `value` (optional) - Estimated lead value
- `currency` (optional) - Currency code

**Implementation:**
```javascript
// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function() {
  gtag('event', 'generate_lead', {
    'value': 0,  // No monetary value
    'currency': 'USD'
  });
});

// Demo request (estimate value)
gtag('event', 'generate_lead', {
  'value': 500.00,  // Estimated annual value
  'currency': 'USD'
});

// Enterprise trial (higher value)
gtag('event', 'generate_lead', {
  'value': 5000.00,
  'currency': 'USD'
});
```

**Lead Types:**
- Contact form
- Demo request
- Consultation booking
- Newsletter signup
- Free trial
- Quote request
- Job application
- Event registration

**Reporting Use:**
- Lead generation funnel
- Lead value attribution
- Form effectiveness
- Lead source comparison

---

## Measurement Guidelines

### When to Send Events

**Immediate Trigger:**
- User action completes (click, form submit)
- Content becomes visible (on page load)
- User selects item

**Don't Wait For:**
- Backend confirmation
- Page navigation
- API response (unless critical)

**Implementation Pattern:**
```javascript
// ❌ WRONG: Wait for confirmation
function handleAction() {
  performAction().then(function() {
    gtag('event', 'some_event');  // Too late
  });
}

// ✅ CORRECT: Fire immediately
function handleAction() {
  gtag('event', 'some_event');    // Fire now
  performAction();                 // Then execute
}
```

---

### Event Parameter Summary

| Event | Required Params | Recommended Params | Optional |
|-------|---|---|---|
| login | method | - | - |
| sign_up | method | - | - |
| search | search_term | - | - |
| view_item | items | value, currency | - |
| view_item_list | items | item_list_id, item_list_name | - |
| select_item | items | item_list_id, item_list_name | - |
| view_promotion | - | promotion_id, promotion_name | - |
| select_promotion | - | promotion_id, promotion_name | - |
| share | - | method, content_type, item_id | - |
| generate_lead | - | value, currency | - |
| select_content | - | content_type, item_id | - |

---

## Testing Engagement Events

**Use DebugView to Verify:**

1. **Login Event**
   - Check `method` parameter populated
   - Verify on successful authentication

2. **Search Event**
   - Confirm `search_term` is present
   - Check on form submission

3. **View Item**
   - Verify items array structure
   - Check price and currency

4. **Content Selection**
   - Ensure item_id or content_type present
   - Verify on user click

**Debug Checklist:**
```
✓ Event fires at correct time
✓ Parameters match specifications
✓ Parameter values are accurate
✓ Event name spelled correctly
✓ No duplicate events
✓ Values are appropriate data type
```
