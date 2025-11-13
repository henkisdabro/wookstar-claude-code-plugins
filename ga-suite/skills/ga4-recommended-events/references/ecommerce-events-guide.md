# Ecommerce Events Implementation Guide

## Complete Ecommerce Journey Tracking

This guide covers implementing the full customer journey from product discovery through purchase and refund handling.

---

## Ecommerce Event Flow

```
1. view_item_list       (User sees product listing)
2. select_item / view_item (User views product details)
3. add_to_cart          (User adds product to cart)
4. view_cart           (User reviews cart)
5. begin_checkout      (User starts checkout - CRITICAL METRIC)
6. add_shipping_info   (User selects shipping)
7. add_payment_info    (User enters payment)
8. purchase            (Transaction complete - MAIN GOAL)
9. refund              (Optional: Product refunded)
```

---

## Step-by-Step Implementation

### Step 1: Product Listing Page

**Event:** `view_item_list`

**Purpose:** Track when user views product search results, category pages, or product collections

**Implementation:**
```javascript
gtag('event', 'view_item_list', {
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Blue T-Shirt',
      'item_category': 'Apparel',
      'price': 29.99
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Red T-Shirt',
      'item_category': 'Apparel',
      'price': 29.99
    }
  ],
  'item_list_id': 'search_results',
  'item_list_name': 'Search Results for T-Shirts'
});
```

**Trigger Points:**
- User lands on category page
- Search results load
- Related products section appears
- Collection/sale page loads

**Reporting Use:**
- "Items" report - view count by product
- Funnel analysis - how many users view products
- Product performance metrics

---

### Step 2: Product Detail Page

**Event:** `view_item`

**Purpose:** Track individual product views

**Implementation:**
```javascript
// Extract product data from page
var productData = {
  id: document.getElementById('product-id').textContent,
  name: document.getElementById('product-name').textContent,
  price: parseFloat(document.getElementById('product-price').textContent),
  category: document.getElementById('product-category').textContent
};

gtag('event', 'view_item', {
  'items': [{
    'item_id': productData.id,
    'item_name': productData.name,
    'item_category': productData.category,
    'item_brand': 'Your Brand',
    'item_variant': 'Blue/Large',
    'price': productData.price,
    'quantity': 1
  }],
  'value': productData.price,
  'currency': 'USD'
});
```

**Advanced Implementation (Multiple Variants):**
```javascript
gtag('event', 'view_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_name': 'Premium T-Shirt',
    'item_category': 'Apparel',
    'item_category2': 'Shirts',
    'item_category3': 'Premium',
    'item_brand': 'Brand Name',
    'item_variant': 'Blue',
    'item_list_name': 'Search Results',
    'price': 49.99,
    'quantity': 1
  }],
  'value': 49.99,
  'currency': 'USD'
});
```

**Trigger Points:**
- Product detail page loads
- User arrives via search or category link
- Product page ready (after lazy-loading images)

---

### Step 3: Add to Cart

**Event:** `add_to_cart`

**Purpose:** Track when items are added to shopping cart

**Implementation:**
```javascript
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
  var quantity = parseInt(document.getElementById('quantity-input').value) || 1;
  var price = parseFloat(document.getElementById('product-price').textContent);
  var itemId = document.getElementById('product-id').textContent;

  gtag('event', 'add_to_cart', {
    'items': [{
      'item_id': itemId,
      'item_name': 'Product Name',
      'item_category': 'Apparel',
      'price': price,
      'quantity': quantity
    }],
    'value': price * quantity,
    'currency': 'USD'
  });

  // Proceed with cart addition
  addToCart(itemId, quantity);
});
```

**Important Notes:**
- Value should be `price * quantity`
- Send immediately when user clicks add button
- Don't wait for backend confirmation
- Always include items array

**Reporting Use:**
- Add-to-cart rate metrics
- Funnel drop-off analysis
- Cart value trending

---

### Step 4: View Cart

**Event:** `view_cart`

**Purpose:** Track when user reviews shopping cart

**Implementation:**
```javascript
// On cart page load
var cartItems = getCartItemsFromStorage(); // Your cart data
var totalValue = 0;

var itemsArray = cartItems.map(function(item) {
  totalValue += item.price * item.quantity;
  return {
    'item_id': item.id,
    'item_name': item.name,
    'item_category': item.category,
    'price': item.price,
    'quantity': item.quantity
  };
});

gtag('event', 'view_cart', {
  'items': itemsArray,
  'value': totalValue,
  'currency': 'USD'
});
```

**Trigger Points:**
- User navigates to cart page
- User views mini-cart
- Cart updates after removing item

---

### Step 5: Begin Checkout (CRITICAL)

**Event:** `begin_checkout`

**Purpose:** Track when user initiates checkout (most important funnel metric)

**Implementation:**
```javascript
document.getElementById('checkout-btn').addEventListener('click', function() {
  var cartItems = getCartItems();
  var totalValue = calculateCartTotal();

  gtag('event', 'begin_checkout', {
    'items': cartItems.map(function(item) {
      return {
        'item_id': item.id,
        'item_name': item.name,
        'item_category': item.category,
        'price': item.price,
        'quantity': item.quantity
      };
    }),
    'value': totalValue,
    'currency': 'USD'
  });

  // Navigate to checkout
  redirectToCheckout();
});
```

**Why It's Critical:**
- Baseline funnel metric
- Identifies cart abandonment
- Used for conversion modeling
- Compare begin_checkout to purchase ratio

**Trigger Points:**
- User clicks "Checkout" button
- User navigates to checkout page
- One-page checkout form loads

---

### Step 6: Add Shipping Info

**Event:** `add_shipping_info`

**Purpose:** Track when user selects shipping method

**Implementation:**
```javascript
document.querySelectorAll('input[name="shipping"]').forEach(function(option) {
  option.addEventListener('change', function() {
    var selectedShipping = this.value;
    var cartItems = getCartItems();
    var subtotal = calculateSubtotal();
    var shippingCost = getShippingCost(selectedShipping);
    var total = subtotal + shippingCost;

    gtag('event', 'add_shipping_info', {
      'items': cartItems,
      'value': total,
      'currency': 'USD',
      'shipping_tier': selectedShipping  // 'standard', 'express', 'overnight'
    });
  });
});
```

**Shipping Tier Values:**
- `standard` - Standard delivery
- `express` - Express delivery
- `overnight` - Overnight delivery
- `pickup` - Store pickup
- `free_shipping` - Free shipping option

**Reporting Use:**
- Shipping method selection analysis
- Funnel drop-off by shipping option

---

### Step 7: Add Payment Info

**Event:** `add_payment_info`

**Purpose:** Track when user enters payment information

**Implementation:**
```javascript
document.getElementById('payment-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  var cartItems = getCartItems();
  var totalValue = calculateTotal();

  gtag('event', 'add_payment_info', {
    'payment_type': paymentMethod,
    'items': cartItems,
    'value': totalValue,
    'currency': 'USD'
  });

  // Process payment
  processPayment(paymentMethod);
});
```

**Payment Type Values:**
- `credit_card`
- `debit_card`
- `paypal`
- `apple_pay`
- `google_pay`
- `bank_transfer`
- `crypto`

**Reporting Use:**
- Payment method distribution
- Payment method-to-purchase completion rate

---

### Step 8: Purchase (MOST IMPORTANT)

**Event:** `purchase`

**Purpose:** Track completed transactions (highest priority event)

**Implementation:**
```javascript
// After payment confirmation
function trackPurchase(transactionData) {
  gtag('event', 'purchase', {
    'transaction_id': 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    'affiliation': 'Online Store',
    'value': transactionData.total,
    'currency': 'USD',
    'tax': transactionData.tax,
    'shipping': transactionData.shipping,
    'coupon': transactionData.coupon || undefined,
    'items': transactionData.items.map(function(item) {
      return {
        'item_id': item.id,
        'item_name': item.name,
        'item_category': item.category,
        'item_brand': item.brand,
        'item_variant': item.variant,
        'price': item.price,
        'quantity': item.quantity,
        'affiliation': 'Online Store'
      };
    })
  });
}
```

**Transaction ID Requirements:**
```
✅ GOOD:
TXN_1731234567890_abc123def456   // Unique, timestamp-based
TXN_20241110_001_ABC123           // Order ID based
user_123_purchase_1234567890      // User + timestamp based

❌ BAD:
purchase                           // Not unique
order_123                          // Can be reused
TXN_12345                          // Too short, likely duplicated
```

**Critical Points:**
1. **Uniqueness:** Each transaction gets ONE unique ID
2. **Non-reusable:** Never use same ID twice
3. **Consistency:** Use same ID in all systems (website, backend, reports)
4. **Timing:** Send immediately upon payment confirmation
5. **Items Array:** Must include all products purchased

**Backend Implementation (Node.js):**
```javascript
app.post('/api/purchase', async (req, res) => {
  const { orderData } = req.body;
  const transactionId = `TXN_${Date.now()}_${generateRandomString(12)}`;

  // Save order
  await Order.create({
    transactionId: transactionId,
    items: orderData.items,
    total: orderData.total,
    // ...
  });

  // Return transaction ID for client-side tracking
  res.json({ transactionId: transactionId });
});

// Client receives transaction ID and sends to GA4
gtag('event', 'purchase', {
  'transaction_id': response.transactionId,
  'items': cartItems,
  'value': total,
  'currency': 'USD'
});
```

**Reporting Impact:**
- Revenue tracking
- Transaction count
- Google Ads conversion tracking
- Attribution modeling
- Ecommerce reports
- Key Event (automatic)

---

### Step 9: Refund (Optional)

**Event:** `refund`

**Purpose:** Track refunded purchases

**Implementation:**
```javascript
// When refund is processed
gtag('event', 'refund', {
  'transaction_id': orderData.transactionId,  // Same ID as original purchase
  'value': refundAmount,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_123',
      'quantity': 1  // Quantity refunded
    }
  ]
});
```

**Important:**
- Use SAME transaction_id as original purchase
- Value is the refund amount
- Only include refunded items

---

## Multiple Product Variants

**Scenario:** Product available in multiple sizes/colors

```javascript
// Product: "T-Shirt" available in Blue/Large, Red/Small, etc.

gtag('event', 'add_to_cart', {
  'items': [{
    'item_id': 'SKU_TSHIRT_BLUE_LARGE',  // Unique per variant
    'item_name': 'Blue T-Shirt - Large',
    'item_category': 'Apparel',
    'item_variant': 'Blue/Large',
    'price': 49.99,
    'quantity': 1
  }],
  'value': 49.99,
  'currency': 'USD'
});
```

---

## Multi-Quantity Purchases

**Scenario:** Customer buys multiple products in one transaction

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345678',
  'value': 329.97,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'price': 99.99,
      'quantity': 2  // Two units
    },
    {
      'item_id': 'SKU_002',
      'item_name': 'Product B',
      'price': 130.00,
      'quantity': 1  // One unit
    }
  ]
});
```

**Value Calculation:**
- Product A: 99.99 × 2 = 199.98
- Product B: 130.00 × 1 = 130.00
- Total: 329.98 ✓

---

## Coupons and Discounts

**Scenario:** Customer applies coupon code

**Single Coupon (Purchase Level):**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345678',
  'value': 89.99,    // Already discounted
  'currency': 'USD',
  'coupon': 'SUMMER20',  // Coupon code
  'tax': 5.00,
  'shipping': 10.00,
  'items': [{
    'item_id': 'SKU_001',
    'item_name': 'Product',
    'price': 100.00,  // Pre-discount price
    'quantity': 1
  }]
});
```

**Item-Level Coupon:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345678',
  'value': 329.97,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_001',
      'item_name': 'Product A',
      'price': 99.99,
      'quantity': 2,
      'coupon': 'SUMMER20',  // Item-specific coupon
      'discount': 20.00      // Discount amount
    }
  ]
});
```

---

## Funnel Analysis

**View the complete ecommerce funnel:**

```
view_item_list     → 1000 users (100%)
view_item          → 450 users (45%)
add_to_cart        → 120 users (12%)
begin_checkout     → 95 users (9.5%)  ← CRITICAL METRIC
purchase           → 75 users (7.5%)
```

**Drop-off Points:**
- view_item → add_to_cart: 73% drop (improve product pages)
- add_to_cart → begin_checkout: 21% drop (simplify cart)
- begin_checkout → purchase: 21% drop (optimize checkout)

---

## Testing Ecommerce Events

1. **Product Page:** Verify view_item fires with correct product data
2. **Add to Cart:** Check add_to_cart with accurate quantity/price
3. **Checkout:** Enable DebugView before begin_checkout
4. **Purchase:** Validate transaction_id is unique
5. **Items Array:** Confirm all items include item_id or item_name

**Use DebugView to verify:**
```
✓ Event name correct (purchase, add_to_cart, etc.)
✓ Required parameters present
✓ Items array structured correctly
✓ Values match actual amounts
✓ Transaction ID is unique
```
