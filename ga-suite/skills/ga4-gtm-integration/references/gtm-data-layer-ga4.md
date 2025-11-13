# GTM Data Layer Implementation for GA4

## Data Layer Fundamentals

The **data layer** is a JavaScript object that acts as a bridge between your website and Google Tag Manager, holding structured data that GTM can access and send to GA4.

### Data Layer Structure

```javascript
window.dataLayer = window.dataLayer || [];
```

**Key Concepts:**
- Global JavaScript array
- Holds events and data
- GTM reads from this automatically
- Must exist BEFORE GTM container code

### Basic Data Layer Push

```javascript
dataLayer.push({
  'event': 'event_name',
  'parameter_key': 'parameter_value'
});
```

**Components:**
- `event`: Trigger name for GTM Custom Event triggers
- Additional keys: Data accessible via Data Layer Variables

## Event Tracking Patterns

### Pattern 1: Simple Event

**On Website:**

```javascript
dataLayer.push({
  'event': 'button_click',
  'button_name': 'Subscribe Now',
  'button_location': 'header'
});
```

**In GTM:**

1. Create Trigger:
   - Type: Custom Event
   - Event name: `button_click`

2. Create Variables:
   - Name: "DL - Button Name"
   - Type: Data Layer Variable
   - Variable Name: `button_name`

3. Create GA4 Tag:
   - Event Name: `button_click`
   - Parameters: `button_name` → `{{DL - Button Name}}`

### Pattern 2: E-commerce Event

**On Website:**

```javascript
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'items': [
      {
        'item_id': 'SKU_123',
        'item_name': 'Blue T-Shirt',
        'price': 29.99,
        'quantity': 1,
        'item_category': 'Apparel'
      }
    ],
    'value': 29.99,
    'currency': 'USD'
  }
});
```

**In GTM:**

1. Create Variable for items:
   - Name: "DL - Ecommerce Items"
   - Type: Data Layer Variable
   - Variable Name: `ecommerce.items`

2. Create GA4 Event Tag:
   - Event Name: `add_to_cart`
   - Parameters:
     - `items` → `{{DL - Ecommerce Items}}`
     - `value` → `{{DL - Ecommerce Value}}`
     - `currency` → `{{DL - Ecommerce Currency}}`

### Pattern 3: Purchase Event (Complete)

**On Website:**

```javascript
dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T_12345',
    'affiliation': 'Online Store',
    'value': 99.98,
    'currency': 'USD',
    'tax': 8.00,
    'shipping': 5.00,
    'coupon': 'SUMMER20',
    'items': [
      {
        'item_id': 'SKU_123',
        'item_name': 'Blue T-Shirt',
        'price': 29.99,
        'quantity': 2,
        'item_category': 'Apparel',
        'item_brand': 'MyBrand'
      },
      {
        'item_id': 'SKU_124',
        'item_name': 'Black Hat',
        'price': 20.00,
        'quantity': 2,
        'item_category': 'Accessories'
      }
    ]
  }
});
```

**In GTM:**

Create Data Layer Variables for:
- `ecommerce.transaction_id`
- `ecommerce.value`
- `ecommerce.currency`
- `ecommerce.tax`
- `ecommerce.shipping`
- `ecommerce.items`

Create GA4 Event Tag mapping all parameters.

### Pattern 4: Form Submission

**On Website:**

```javascript
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  dataLayer.push({
    'event': 'form_submit',
    'form_name': 'Contact Form',
    'form_id': 'contact-form',
    'form_destination': '/thank-you',
    'user_email_domain': document.getElementById('email').value.split('@')[1]
  });

  // Then submit form
  this.submit();
});
```

### Pattern 5: Video Tracking

**On Website:**

```javascript
// When video starts
dataLayer.push({
  'event': 'video_start',
  'video_title': 'Product Demo',
  'video_duration': 180,
  'video_id': 'demo_v1'
});

// When video completes
dataLayer.push({
  'event': 'video_complete',
  'video_title': 'Product Demo',
  'video_percent': 100,
  'video_id': 'demo_v1'
});
```

## Advanced Patterns

### Pattern 6: User Authentication

**On Login:**

```javascript
dataLayer.push({
  'event': 'login',
  'method': 'email',
  'user_id': 'user_12345',
  'user_tier': 'premium',
  'years_customer': 3
});
```

**On Logout:**

```javascript
dataLayer.push({
  'event': 'logout',
  'user_id': null  // Clear user ID
});
```

### Pattern 7: Page Data (For SPAs)

**On Route Change (Single Page Apps):**

```javascript
// React example
useEffect(() => {
  dataLayer.push({
    'event': 'virtual_page_view',
    'page_path': window.location.pathname,
    'page_title': document.title,
    'page_category': 'products'
  });
}, [location]);
```

### Pattern 8: Search Tracking

**On Search:**

```javascript
dataLayer.push({
  'event': 'search',
  'search_term': searchQuery,
  'search_results_count': resultsCount,
  'search_category': selectedCategory
});
```

## Data Layer Variable Types in GTM

### Type 1: Simple Data Layer Variable

**Configuration:**
- **Variable Type:** Data Layer Variable
- **Data Layer Variable Name:** `product_id`
- **Data Layer Version:** Version 2

**Usage:** `{{DL - Product ID}}`

### Type 2: Nested Object Access

**For Nested Data:**

```javascript
dataLayer.push({
  'ecommerce': {
    'value': 99.99,
    'items': [...]
  }
});
```

**Variable Configuration:**
- **Variable Name:** "DL - Ecommerce Value"
- **Type:** Data Layer Variable
- **Variable Name:** `ecommerce.value`

### Type 3: Array Access

**For Array Elements:**

```javascript
dataLayer.push({
  'items': [
    {'item_id': 'SKU_123'},
    {'item_id': 'SKU_124'}
  ]
});
```

**Variable for First Item:**
- **Variable Name:** `items.0.item_id` (first array element)

**Better:** Pass entire `items` array to GA4 event parameter

## Timing and Order

### Rule 1: Data Layer BEFORE GTM Container

```html
<script>
  window.dataLayer = window.dataLayer || [];
  // Can push initial page data here
  dataLayer.push({
    'page_type': 'product',
    'user_tier': 'premium'
  });
</script>

<!-- GTM Container Code -->
<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

### Rule 2: Event Push AFTER User Action

```javascript
// CORRECT
button.addEventListener('click', function() {
  dataLayer.push({
    'event': 'button_click',
    'button_name': 'Subscribe'
  });
});

// WRONG - Fires on page load before click
dataLayer.push({
  'event': 'button_click',
  'button_name': 'Subscribe'
});
```

### Rule 3: Clear ecommerce Before Push

**For E-commerce Events:**

```javascript
// Clear previous ecommerce data
dataLayer.push({ ecommerce: null });

// Push new ecommerce data
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'items': [...]
  }
});
```

**Why:** Prevents old ecommerce data from persisting

## SPA (Single Page Application) Patterns

### React Example

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Track virtual page view on route change
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'virtual_page_view',
      'page_path': location.pathname,
      'page_title': document.title
    });
  }, [location]);

  return <div>...</div>;
}
```

### Vue.js Example

```javascript
// In router/index.js
router.afterEach((to, from) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'event': 'virtual_page_view',
    'page_path': to.path,
    'page_title': to.meta.title || document.title
  });
});
```

## Debugging Data Layer

### Console Debugging

```javascript
// View entire data layer
console.log(window.dataLayer);

// View last event pushed
console.log(window.dataLayer[window.dataLayer.length - 1]);

// Listen for pushes
var originalPush = window.dataLayer.push;
window.dataLayer.push = function() {
  console.log('Data Layer Push:', arguments);
  return originalPush.apply(this, arguments);
};
```

### GTM Preview Mode

**Steps:**
1. Click Preview in GTM
2. Interact with website
3. Tag Assistant shows:
   - **Data Layer** tab with all pushed events
   - Event details and parameters
   - Values of variables at time of event

## Common Mistakes

### Mistake 1: Pushing Empty Events

```javascript
// BAD - No data
dataLayer.push({
  'event': 'button_click'
});

// GOOD - Include context
dataLayer.push({
  'event': 'button_click',
  'button_name': 'Subscribe',
  'button_location': 'header'
});
```

### Mistake 2: Not Clearing ecommerce

```javascript
// BAD - Old ecommerce data persists
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {...}
});

// GOOD
dataLayer.push({ ecommerce: null });
dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {...}
});
```

### Mistake 3: Using Reserved Keys

**Avoid These Keys:**
- `gtm` (reserved by GTM)
- `google_tag_manager` (reserved)
- `event` (only for trigger names)

### Mistake 4: Wrong Data Types

```javascript
// BAD - String when should be number
dataLayer.push({
  'event': 'purchase',
  'value': '99.99'  // String
});

// GOOD
dataLayer.push({
  'event': 'purchase',
  'value': 99.99  // Number
});
```

## Best Practices

1. **Initialize Early:** Create `window.dataLayer` before GTM container
2. **Consistent Naming:** Use snake_case for event and parameter names
3. **Clear ecommerce:** Always clear before pushing new ecommerce data
4. **Document Events:** Maintain documentation of all custom events
5. **Test Thoroughly:** Use GTM Preview mode to verify data layer pushes
6. **Avoid PII:** Don't push personal data (emails, names, addresses)
7. **Use Structured Data:** Follow GA4 recommended event structures
