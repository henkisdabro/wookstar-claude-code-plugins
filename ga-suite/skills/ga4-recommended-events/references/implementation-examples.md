# Implementation Examples

## Real-World Code Examples

Complete, production-ready examples for implementing recommended events.

---

## Example 1: E-commerce Product Page (React)

**File:** `ProductPage.jsx`

```javascript
import React, { useEffect, useState } from 'react';
import { gtag } from './analytics-utils';

export function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product data
    fetchProduct(productId).then(product => {
      setProduct(product);

      // Track view_item when product loads
      gtag('event', 'view_item', {
        'items': [{
          'item_id': product.sku,
          'item_name': product.name,
          'item_category': product.category,
          'item_brand': product.brand,
          'item_variant': `${product.color}/${product.size}`,
          'price': product.price,
          'quantity': 1
        }],
        'value': product.price,
        'currency': 'USD'
      });
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    gtag('event', 'add_to_cart', {
      'items': [{
        'item_id': product.sku,
        'item_name': product.name,
        'item_category': product.category,
        'price': product.price,
        'quantity': quantity
      }],
      'value': product.price * quantity,
      'currency': 'USD'
    });

    addToCart(product.id, quantity);
    // Show confirmation
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

---

## Example 2: Checkout Flow (Vanilla JavaScript)

**File:** `checkout.js`

```javascript
// Checkout page - tracks the entire funnel

class CheckoutFlow {
  constructor() {
    this.cart = getCartFromStorage();
    this.initializeListeners();
  }

  initializeListeners() {
    // Begin checkout button
    document.getElementById('begin-checkout-btn')
      .addEventListener('click', () => this.handleBeginCheckout());

    // Shipping method selection
    document.querySelectorAll('input[name="shipping"]')
      .forEach(el => el.addEventListener('change', (e) => this.handleShippingSelect(e)));

    // Payment method selection
    document.querySelectorAll('input[name="payment"]')
      .forEach(el => el.addEventListener('change', (e) => this.handlePaymentSelect(e)));

    // Checkout form submission
    document.getElementById('checkout-form')
      .addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
  }

  handleBeginCheckout() {
    const cartData = this.getCartData();

    gtag('event', 'begin_checkout', {
      'items': cartData.items,
      'value': cartData.total,
      'currency': 'USD',
      'coupon': cartData.coupon || undefined
    });

    // Navigate to checkout step 1
    navigateToCheckoutStep(1);
  }

  handleShippingSelect(event) {
    const shippingMethod = event.target.value;
    const cartData = this.getCartData();
    const shippingCost = this.calculateShipping(shippingMethod);

    gtag('event', 'add_shipping_info', {
      'items': cartData.items,
      'value': cartData.subtotal + shippingCost,
      'currency': 'USD',
      'shipping_tier': shippingMethod
    });
  }

  handlePaymentSelect(event) {
    const paymentMethod = event.target.value;
    const cartData = this.getCartData();
    const total = this.calculateTotal();

    gtag('event', 'add_payment_info', {
      'payment_type': paymentMethod,
      'items': cartData.items,
      'value': total,
      'currency': 'USD'
    });
  }

  handleCheckoutSubmit(event) {
    event.preventDefault();

    // Process payment (returns transaction ID)
    processPayment(this.getFormData())
      .then(response => {
        this.trackPurchase(response);
        this.handlePurchaseSuccess(response);
      })
      .catch(error => {
        console.error('Payment failed:', error);
      });
  }

  trackPurchase(paymentResponse) {
    const cartData = this.getCartData();
    const orderTotal = paymentResponse.amount;

    gtag('event', 'purchase', {
      'transaction_id': paymentResponse.transactionId,
      'affiliation': 'Online Store',
      'value': orderTotal,
      'currency': 'USD',
      'tax': paymentResponse.tax || 0,
      'shipping': paymentResponse.shipping || 0,
      'coupon': cartData.coupon || undefined,
      'items': cartData.items.map(item => ({
        'item_id': item.sku,
        'item_name': item.name,
        'item_category': item.category,
        'item_brand': item.brand,
        'item_variant': item.variant,
        'price': item.price,
        'quantity': item.quantity,
        'affiliation': 'Online Store'
      }))
    });
  }

  getCartData() {
    const cart = getCartFromStorage();
    const items = [];
    let total = 0;

    cart.items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      items.push({
        'item_id': item.sku,
        'item_name': item.name,
        'item_category': item.category,
        'price': item.price,
        'quantity': item.quantity
      });
    });

    return {
      items: items,
      subtotal: total,
      coupon: cart.coupon || null,
      total: total
    };
  }

  calculateTotal() {
    const cartData = this.getCartData();
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const shipping = this.calculateShipping(shippingMethod);
    const tax = cartData.subtotal * 0.08; // 8% tax example

    return cartData.subtotal + shipping + tax;
  }

  calculateShipping(method) {
    const shipping = {
      'standard': 10.00,
      'express': 25.00,
      'overnight': 50.00,
      'pickup': 0.00
    };
    return shipping[method] || 10.00;
  }

  handlePurchaseSuccess(response) {
    // Clear cart, show thank you page
    clearCart();
    window.location.href = `/thank-you?order=${response.orderId}`;
  }

  getFormData() {
    return {
      email: document.getElementById('email').value,
      shipping_address: document.getElementById('address').value,
      payment_method: document.querySelector('input[name="payment"]:checked').value,
      coupon: document.getElementById('coupon').value || null
    };
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new CheckoutFlow();
});
```

---

## Example 3: Google Tag Manager Setup

**GTM Configuration - GA4 Configuration Tag**

```
Tag Name: GA4 - Configuration
Tag Type: Google Tag
Measurement ID: G-XXXXXXXXXX

Configuration Settings:
- Allow Google Signals: true
- Allow ad personalization signals: true

Triggering:
- Trigger: Initialization - All Pages
```

**GTM - Add to Cart Event Tag**

```
Tag Name: GA4 - Add to Cart
Tag Type: Google Tag
Measurement ID: G-XXXXXXXXXX

Event Name: add_to_cart

Event Parameters:
├── items (variable): {{DL - Cart Items}}
├── value (variable): {{DL - Cart Total}}
└── currency (constant): USD

Triggering:
- Trigger: Custom Event "addToCart"
```

**GTM - Purchase Event Tag**

```
Tag Name: GA4 - Purchase
Tag Type: Google Tag
Measurement ID: G-XXXXXXXXXX

Event Name: purchase

Event Parameters:
├── transaction_id (variable): {{DL - Transaction ID}}
├── value (variable): {{DL - Order Total}}
├── currency (constant): USD
├── items (variable): {{DL - Purchase Items}}
├── tax (variable): {{DL - Tax Amount}}
├── shipping (variable): {{DL - Shipping Cost}}
└── coupon (variable): {{DL - Coupon Code}}

Triggering:
- Trigger: Custom Event "purchase"
```

**Data Layer Push (Website Code)**

```javascript
// When user clicks add to cart
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'addToCart',
  'cart_items': [{
    'item_id': 'SKU_123',
    'item_name': 'Product Name',
    'price': 99.99,
    'quantity': 1
  }],
  'cart_total': 99.99
});
```

---

## Example 4: Login Event Implementation

**File:** `auth.js`

```javascript
class AuthenticationManager {
  async loginWithEmail(email, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const user = await response.json();

      // Track login event
      gtag('event', 'login', {
        'method': 'email'
      });

      // Set user properties
      gtag('set', {
        'user_id': 'user_' + user.id,
        'customer_segment': user.subscription_tier
      });

      // Store session
      this.storeSession(user);
      return user;

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async loginWithGoogle(googleToken) {
    try {
      const response = await fetch('/api/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken })
      });

      const user = await response.json();

      gtag('event', 'login', {
        'method': 'google'
      });

      gtag('set', {
        'user_id': 'user_' + user.id
      });

      this.storeSession(user);
      return user;

    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  async signup(email, password) {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const user = await response.json();

      gtag('event', 'sign_up', {
        'method': 'email'
      });

      gtag('set', {
        'user_id': 'user_' + user.id
      });

      this.storeSession(user);
      return user;

    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  logout() {
    // Clear user identification
    gtag('set', {
      'user_id': null
    });

    // Clear session
    this.clearSession();
    window.location.href = '/';
  }

  storeSession(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  clearSession() {
    sessionStorage.removeItem('user');
  }
}
```

---

## Example 5: Search Event with Results

**File:** `search.js`

```javascript
class SearchManager {
  constructor() {
    this.setupSearchListener();
  }

  setupSearchListener() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }
  }

  async handleSearch(event) {
    event.preventDefault();

    const searchTerm = document.getElementById('search-input').value;

    if (!searchTerm.trim()) {
      return;
    }

    // Track search immediately
    gtag('event', 'search', {
      'search_term': searchTerm
    });

    // Fetch results
    try {
      const results = await this.fetchSearchResults(searchTerm);
      this.displayResults(results, searchTerm);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  displayResults(results, searchTerm) {
    // Track view_item_list for search results
    if (results.length > 0) {
      gtag('event', 'view_item_list', {
        'items': results.slice(0, 20).map(product => ({
          'item_id': product.sku,
          'item_name': product.name,
          'item_category': product.category,
          'price': product.price,
          'index': results.indexOf(product)
        })),
        'item_list_id': 'search_results',
        'item_list_name': `Search Results for "${searchTerm}"`
      });
    }

    // Render search results UI
    this.renderResultsPage(results, searchTerm);
  }

  async fetchSearchResults(term) {
    const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
    return response.json();
  }

  renderResultsPage(results, term) {
    // Render results to DOM
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found</p>';
      return;
    }

    results.forEach((product, index) => {
      const productEl = this.createProductElement(product, index);
      resultsContainer.appendChild(productEl);

      // Track select_item when user clicks product
      productEl.addEventListener('click', () => {
        gtag('event', 'select_item', {
          'items': [{
            'item_id': product.sku,
            'item_name': product.name,
            'item_list_name': `Search Results for "${term}"`
          }],
          'index': index
        });
      });
    });
  }

  createProductElement(product, index) {
    const el = document.createElement('div');
    el.className = 'search-result';
    el.innerHTML = `
      <a href="/product/${product.id}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
      </a>
    `;
    return el;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SearchManager();
});
```

---

## Example 6: Lead Generation Form

**File:** `lead-form.js`

```javascript
class LeadForm {
  constructor() {
    this.setupFormListener();
  }

  setupFormListener() {
    const form = document.getElementById('demo-request-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      company: document.getElementById('company').value,
      phone: document.getElementById('phone').value
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const lead = await response.json();

      // Track lead generation
      gtag('event', 'generate_lead', {
        'value': 500.00,  // Estimated lead value
        'currency': 'USD'
      });

      // Show success message
      this.showSuccessMessage(lead);

    } catch (error) {
      console.error('Form submission failed:', error);
      this.showErrorMessage();
    }
  }

  showSuccessMessage(lead) {
    document.getElementById('demo-request-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
  }

  showErrorMessage() {
    alert('There was an error submitting your request. Please try again.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LeadForm();
});
```

---

## Example 7: Promotion Tracking

**File:** `promotions.js`

```javascript
class PromotionTracker {
  constructor() {
    this.trackVisiblePromotions();
    this.setupPromotionClicks();
  }

  trackVisiblePromotions() {
    // Track when promotions become visible
    const promotions = document.querySelectorAll('.promotion-banner');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const promo = entry.target;
          const promotionId = promo.getAttribute('data-promo-id');
          const promotionName = promo.getAttribute('data-promo-name');

          gtag('event', 'view_promotion', {
            'promotion_id': promotionId,
            'promotion_name': promotionName
          });

          // Unobserve after tracking
          observer.unobserve(promo);
        }
      });
    });

    promotions.forEach(promo => observer.observe(promo));
  }

  setupPromotionClicks() {
    document.querySelectorAll('.promotion-banner').forEach(banner => {
      const link = banner.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          const promotionId = banner.getAttribute('data-promo-id');
          const promotionName = banner.getAttribute('data-promo-name');

          gtag('event', 'select_promotion', {
            'promotion_id': promotionId,
            'promotion_name': promotionName
          });
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PromotionTracker();
});
```

---

## Testing These Examples

**Use DebugView to verify:**

1. Check event names are correct
2. Verify all required parameters present
3. Validate parameter data types (numbers vs strings)
4. Ensure items arrays are properly structured
5. Confirm transaction IDs are unique
6. Test complete user journeys

**Example Test Flow:**
```
1. View product page → verify view_item event
2. Add to cart → verify add_to_cart with correct value
3. Go to checkout → verify begin_checkout
4. Complete purchase → verify purchase with unique transaction_id
5. Check DebugView → all events firing with correct parameters
```
