# Complete Recommended Events Catalog

## All Recommended Events Reference

This is the complete catalog of all Google-recommended event names with required and optional parameters.

---

## ENGAGEMENT EVENTS

### login

**Purpose:** User successfully authenticates

**Parameters:**
- `method` (required) - Authentication method used
  - Values: email, phone, social, google, facebook, etc.

**Example:**
```javascript
gtag('event', 'login', {
  'method': 'google'
});
```

**Use Cases:**
- User logs in with email/password
- User authenticates with social provider
- Two-factor authentication completed

---

### sign_up

**Purpose:** New user account created

**Parameters:**
- `method` (required) - Registration method
  - Values: email, social, phone, etc.

**Example:**
```javascript
gtag('event', 'sign_up', {
  'method': 'email'
});
```

**Use Cases:**
- User completes registration form
- User creates account via social provider
- App installs and creates account

---

### view_item

**Purpose:** User views product detail page

**Parameters:**
- `items` (required) - Array of product objects with item_id and item_name
- `value` (recommended) - Total item price
- `currency` (recommended) - Currency code (USD, EUR, GBP)

**Example:**
```javascript
gtag('event', 'view_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product Name',
    'item_category': 'Electronics',
    'price': 99.99
  }],
  'value': 99.99,
  'currency': 'USD'
});
```

**Reporting Impact:**
- Enables "Items" report
- Feeds conversion modeling
- Product-level analysis

---

### view_item_list

**Purpose:** User views product list/search results

**Parameters:**
- `items` (required) - Array of products
- `item_list_id` (optional) - List identifier (e.g., "search_results")
- `item_list_name` (optional) - List name (e.g., "Search Results for Shoes")

**Example:**
```javascript
gtag('event', 'view_item_list', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'item_category': 'Shoes'
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Product B',
      'item_category': 'Shoes'
    }
  ],
  'item_list_name': 'Search Results'
});
```

---

### select_item

**Purpose:** User selects item from list

**Parameters:**
- `items` (required) - Selected item(s)
- `item_list_id` (optional) - List identifier
- `item_list_name` (optional) - List name

**Example:**
```javascript
gtag('event', 'select_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Selected Product',
    'item_list_name': 'Related Products'
  }]
});
```

---

### search

**Purpose:** User performs site search

**Parameters:**
- `search_term` (required) - What user searched for

**Example:**
```javascript
gtag('event', 'search', {
  'search_term': 'blue shoes'
});
```

**Reporting Impact:**
- Search terms report
- Search-to-purchase analysis

---

### view_promotion

**Purpose:** Promotional banner/offer displayed to user

**Parameters:**
- `promotion_id` (recommended) - Promotion identifier
- `promotion_name` (recommended) - Promotion display name

**Example:**
```javascript
gtag('event', 'view_promotion', {
  'promotion_id': 'PROMO_2024_SUMMER',
  'promotion_name': 'Summer Sale - 50% Off'
});
```

---

### select_promotion

**Purpose:** User clicks/selects promotion

**Parameters:**
- `promotion_id` (recommended) - Promotion identifier
- `promotion_name` (recommended) - Promotion name

**Example:**
```javascript
gtag('event', 'select_promotion', {
  'promotion_id': 'PROMO_2024_SUMMER',
  'promotion_name': 'Summer Sale - 50% Off'
});
```

**Reporting Impact:**
- Promotion performance
- Promotion-to-purchase funnel

---

## MONETIZATION EVENTS (ECOMMERCE)

### add_to_cart

**Purpose:** Item added to shopping cart

**Parameters:**
- `items` (required) - Product(s) added
- `value` (recommended) - Total value of items
- `currency` (recommended) - Currency code

**Example:**
```javascript
gtag('event', 'add_to_cart', {
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product Name',
    'price': 99.99,
    'quantity': 1
  }],
  'value': 99.99,
  'currency': 'USD'
});
```

**Reporting Impact:**
- Cart funnel analysis
- Add-to-cart rate metrics

---

### remove_from_cart

**Purpose:** Item removed from cart

**Parameters:**
- `items` (required) - Product(s) removed
- `value` (recommended) - Total value of removed items
- `currency` (recommended) - Currency code

**Example:**
```javascript
gtag('event', 'remove_from_cart', {
  'items': [{
    'item_id': 'SKU_123',
    'price': 99.99
  }],
  'value': 99.99,
  'currency': 'USD'
});
```

---

### view_cart

**Purpose:** User views shopping cart

**Parameters:**
- `items` (required) - Items in cart
- `value` (recommended) - Total cart value
- `currency` (recommended) - Currency code

**Example:**
```javascript
gtag('event', 'view_cart', {
  'items': [{...}, {...}],
  'value': 299.98,
  'currency': 'USD'
});
```

---

### begin_checkout

**Purpose:** User starts checkout process (CRITICAL EVENT)

**Parameters:**
- `items` (required) - Products being purchased
- `value` (required) - Total checkout value
- `currency` (required) - Currency code
- `coupon` (optional) - Discount code applied

**Example:**
```javascript
gtag('event', 'begin_checkout', {
  'items': [{...}, {...}],
  'value': 329.98,
  'currency': 'USD',
  'coupon': 'SUMMER20'
});
```

**Reporting Impact:**
- Most important funnel metric
- Checkout abandonment analysis
- Conversion modeling baseline

---

### add_shipping_info

**Purpose:** User selects shipping method

**Parameters:**
- `items` (required) - Products being shipped
- `shipping_tier` (recommended) - Shipping option selected
  - Values: standard, express, overnight, pickup, etc.
- `value` (recommended) - Total value
- `currency` (recommended) - Currency code
- `coupon` (optional) - Applied coupon

**Example:**
```javascript
gtag('event', 'add_shipping_info', {
  'items': [{...}, {...}],
  'shipping_tier': 'express',
  'value': 329.98,
  'currency': 'USD'
});
```

---

### add_payment_info

**Purpose:** User enters payment information

**Parameters:**
- `payment_type` (recommended) - Payment method
  - Values: credit_card, debit_card, paypal, apple_pay, google_pay, etc.
- `items` (optional) - Products being paid for
- `value` (optional) - Total value
- `currency` (optional) - Currency code
- `coupon` (optional) - Applied coupon

**Example:**
```javascript
gtag('event', 'add_payment_info', {
  'payment_type': 'credit_card',
  'items': [{...}, {...}],
  'value': 329.98,
  'currency': 'USD'
});
```

---

### purchase

**Purpose:** Purchase/transaction completed (MOST IMPORTANT EVENT)

**Parameters:**
- `transaction_id` (required) - Unique transaction identifier
- `value` (recommended) - Total transaction value
- `currency` (recommended) - Currency code (ISO 4217)
- `tax` (optional) - Tax amount
- `shipping` (optional) - Shipping cost
- `coupon` (optional) - Discount code
- `affiliation` (optional) - Store/vendor name
- `items` (recommended) - Products purchased

**Example:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345678',
  'affiliation': 'Online Store',
  'value': 329.98,
  'currency': 'USD',
  'tax': 24.99,
  'shipping': 15.00,
  'coupon': 'SUMMER20',
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product A',
    'price': 99.99,
    'quantity': 2,
    'item_category': 'Electronics'
  }, {
    'item_id': 'SKU_124',
    'item_name': 'Product B',
    'price': 130.00,
    'quantity': 1
  }]
});
```

**Critical Rules:**
- `transaction_id` MUST be unique per purchase
- MUST NOT be reused across different transactions
- MUST be consistent across all touchpoints (GTM, backend, etc.)

**Reporting Impact:**
- Revenue tracking
- Ecommerce conversion reports
- Attribution modeling
- Google Ads conversion tracking
- GA4 Key Event (marked by default)

---

### refund

**Purpose:** Purchase refund processed

**Parameters:**
- `transaction_id` (required) - Original transaction ID
- `value` (required) - Refund amount
- `currency` (required) - Currency code
- `items` (optional) - Refunded products

**Example:**
```javascript
gtag('event', 'refund', {
  'transaction_id': 'TXN_12345678',
  'value': 99.99,
  'currency': 'USD',
  'items': [{
    'item_id': 'SKU_123',
    'quantity': 1
  }]
});
```

---

### add_to_wishlist

**Purpose:** Item added to wishlist

**Parameters:**
- `items` (required) - Product(s) wishlisted
- `value` (optional) - Total value
- `currency` (optional) - Currency code

**Example:**
```javascript
gtag('event', 'add_to_wishlist', {
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product Name',
    'price': 99.99
  }],
  'value': 99.99,
  'currency': 'USD'
});
```

---

## OTHER RECOMMENDED EVENTS

### generate_lead

**Purpose:** Lead generated (form submission, demo request, etc.)

**Parameters:**
- `value` (optional) - Lead value estimate
- `currency` (optional) - Currency code

**Example:**
```javascript
gtag('event', 'generate_lead', {
  'value': 50.00,
  'currency': 'USD'
});
```

**Use Cases:**
- Contact form submission
- Demo request
- Free trial signup
- Newsletter subscription

---

### select_content

**Purpose:** User selects content

**Parameters:**
- `content_type` (optional) - Type of content (video, article, product, etc.)
- `item_id` (optional) - Content identifier

**Example:**
```javascript
gtag('event', 'select_content', {
  'content_type': 'video',
  'item_id': 'video_123'
});
```

---

### share

**Purpose:** Content shared

**Parameters:**
- `method` (optional) - Share method (email, social, link, etc.)
- `content_type` (optional) - Type of content shared
- `item_id` (optional) - Content identifier

**Example:**
```javascript
gtag('event', 'share', {
  'method': 'email',
  'content_type': 'article',
  'item_id': 'article_456'
});
```

---

### join_group

**Purpose:** User joins group/team

**Parameters:**
- `group_id` (optional) - Group identifier

**Example:**
```javascript
gtag('event', 'join_group', {
  'group_id': 'team_123'
});
```

---

## Event Parameter Limits

**Global Limits (All Events):**
- Maximum 25 parameters per event
- Parameter name: 40 characters max
- Parameter value: 100 characters max
  - Exceptions:
    - page_title: 300 characters
    - page_referrer: 420 characters
    - page_location: 1000 characters

**Items Array Limits:**
- Maximum 27 items per event
- Each item: up to 25 parameters

---

## Best Practices

1. **Consistency:** Use exact recommended event names (case-sensitive, lowercase)
2. **Parameter Coverage:** Include all "recommended" parameters when applicable
3. **Currency:** Always include currency for monetary events (USD, EUR, GBP, etc.)
4. **Transaction ID:** Generate unique, non-reusable transaction IDs for purchases
5. **Testing:** Verify events in DebugView before production launch
6. **Items Array:** Always include item_id OR item_name (at least one required)
7. **Value Accuracy:** Ensure value parameters match actual transaction amounts
