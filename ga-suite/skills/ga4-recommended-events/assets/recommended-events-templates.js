/**
 * GA4 Recommended Events - Production-Ready Templates
 *
 * Copy and customize these templates for your implementation.
 * All examples use gtag.js - adapt for GTM by pushing to dataLayer instead.
 */

// ============================================================================
// AUTHENTICATION EVENTS
// ============================================================================

/**
 * Track user login
 * @param {string} method - Authentication method (email, google, facebook, etc.)
 */
function trackLogin(method = 'email') {
  gtag('event', 'login', {
    'method': method
  });
}

/**
 * Track new user signup
 * @param {string} method - Registration method (email, social, etc.)
 */
function trackSignup(method = 'email') {
  gtag('event', 'sign_up', {
    'method': method
  });
}

// Usage examples:
// trackLogin('google');
// trackSignup('facebook');


// ============================================================================
// PRODUCT VIEW EVENTS
// ============================================================================

/**
 * Track product view
 * @param {object} product - Product data
 */
function trackViewItem(product) {
  gtag('event', 'view_item', {
    'items': [{
      'item_id': product.id || product.sku,
      'item_name': product.name,
      'item_category': product.category,
      'item_brand': product.brand || undefined,
      'item_variant': product.variant || undefined,
      'price': product.price,
      'quantity': 1
    }],
    'value': product.price,
    'currency': 'USD'
  });
}

/**
 * Track product list view
 * @param {array} products - Array of products
 * @param {string} listName - Name of the list (e.g., "Search Results", "Category")
 * @param {string} listId - List identifier
 */
function trackViewItemList(products, listName, listId = undefined) {
  gtag('event', 'view_item_list', {
    'items': products.map((product, index) => ({
      'item_id': product.id || product.sku,
      'item_name': product.name,
      'item_category': product.category,
      'price': product.price,
      'index': index
    })),
    'item_list_name': listName,
    'item_list_id': listId
  });
}

/**
 * Track item selection from list
 * @param {object} product - Selected product
 * @param {string} listName - List name
 * @param {number} index - Position in list
 */
function trackSelectItem(product, listName, index = 0) {
  gtag('event', 'select_item', {
    'items': [{
      'item_id': product.id || product.sku,
      'item_name': product.name,
      'item_list_name': listName
    }],
    'index': index
  });
}

// Usage examples:
// trackViewItem({ id: 'SKU_123', name: 'Product', category: 'Electronics', price: 99.99 });
// trackViewItemList(productsArray, 'Search Results', 'search_electronics');
// trackSelectItem(product, 'New Arrivals', 0);


// ============================================================================
// SEARCH EVENT
// ============================================================================

/**
 * Track search
 * @param {string} searchTerm - What user searched for
 */
function trackSearch(searchTerm) {
  gtag('event', 'search', {
    'search_term': searchTerm
  });
}

// Usage:
// trackSearch('blue shoes');


// ============================================================================
// SHOPPING CART EVENTS
// ============================================================================

/**
 * Track add to cart
 * @param {object} product - Product being added
 * @param {number} quantity - Quantity added
 */
function trackAddToCart(product, quantity = 1) {
  gtag('event', 'add_to_cart', {
    'items': [{
      'item_id': product.id || product.sku,
      'item_name': product.name,
      'item_category': product.category,
      'price': product.price,
      'quantity': quantity
    }],
    'value': product.price * quantity,
    'currency': 'USD'
  });
}

/**
 * Track remove from cart
 * @param {object} product - Product being removed
 * @param {number} quantity - Quantity removed
 */
function trackRemoveFromCart(product, quantity = 1) {
  gtag('event', 'remove_from_cart', {
    'items': [{
      'item_id': product.id || product.sku,
      'item_name': product.name,
      'price': product.price,
      'quantity': quantity
    }],
    'value': product.price * quantity,
    'currency': 'USD'
  });
}

/**
 * Track cart view
 * @param {array} cartItems - Array of items in cart
 * @param {number} cartTotal - Total cart value
 */
function trackViewCart(cartItems, cartTotal) {
  gtag('event', 'view_cart', {
    'items': cartItems.map(item => ({
      'item_id': item.id || item.sku,
      'item_name': item.name,
      'item_category': item.category,
      'price': item.price,
      'quantity': item.quantity
    })),
    'value': cartTotal,
    'currency': 'USD'
  });
}

// Usage examples:
// trackAddToCart({ id: 'SKU_123', name: 'Product', category: 'Electronics', price: 99.99 }, 2);
// trackRemoveFromCart(product, 1);
// trackViewCart(cartItems, 199.98);


// ============================================================================
// CHECKOUT FUNNEL EVENTS
// ============================================================================

/**
 * Track checkout begin (CRITICAL EVENT)
 * @param {array} cartItems - Items being checked out
 * @param {number} cartTotal - Total value
 * @param {string} coupon - Optional coupon code
 */
function trackBeginCheckout(cartItems, cartTotal, coupon = undefined) {
  gtag('event', 'begin_checkout', {
    'items': cartItems.map(item => ({
      'item_id': item.id || item.sku,
      'item_name': item.name,
      'item_category': item.category,
      'price': item.price,
      'quantity': item.quantity
    })),
    'value': cartTotal,
    'currency': 'USD',
    'coupon': coupon
  });
}

/**
 * Track shipping information added
 * @param {array} cartItems - Items in order
 * @param {number} total - Order total with shipping
 * @param {string} shippingMethod - Shipping tier (standard, express, etc.)
 */
function trackAddShippingInfo(cartItems, total, shippingMethod) {
  gtag('event', 'add_shipping_info', {
    'items': cartItems,
    'value': total,
    'currency': 'USD',
    'shipping_tier': shippingMethod
  });
}

/**
 * Track payment information added
 * @param {array} cartItems - Items in order
 * @param {number} total - Order total
 * @param {string} paymentMethod - Payment type
 */
function trackAddPaymentInfo(cartItems, total, paymentMethod) {
  gtag('event', 'add_payment_info', {
    'payment_type': paymentMethod,
    'items': cartItems,
    'value': total,
    'currency': 'USD'
  });
}

// Usage examples:
// trackBeginCheckout(cartItems, 299.99, 'SUMMER20');
// trackAddShippingInfo(cartItems, 319.99, 'express');
// trackAddPaymentInfo(cartItems, 329.99, 'credit_card');


// ============================================================================
// PURCHASE EVENT (MOST IMPORTANT)
// ============================================================================

/**
 * Track purchase completion
 * @param {object} orderData - Order information
 * @param {array} orderData.items - Items purchased
 * @param {number} orderData.value - Total value
 * @param {string} orderData.transactionId - Unique transaction ID
 * @param {number} orderData.tax - Tax amount (optional)
 * @param {number} orderData.shipping - Shipping cost (optional)
 * @param {string} orderData.coupon - Coupon code (optional)
 */
function trackPurchase(orderData) {
  const requiredFields = ['items', 'value', 'transactionId'];
  const missing = requiredFields.filter(field => !orderData[field]);

  if (missing.length > 0) {
    console.error('Missing required fields for purchase event:', missing);
    return;
  }

  gtag('event', 'purchase', {
    'transaction_id': orderData.transactionId,
    'affiliation': orderData.affiliation || 'Online Store',
    'value': orderData.value,
    'currency': 'USD',
    'tax': orderData.tax || undefined,
    'shipping': orderData.shipping || undefined,
    'coupon': orderData.coupon || undefined,
    'items': orderData.items.map(item => ({
      'item_id': item.id || item.sku,
      'item_name': item.name,
      'item_category': item.category,
      'item_brand': item.brand || undefined,
      'item_variant': item.variant || undefined,
      'price': item.price,
      'quantity': item.quantity,
      'affiliation': orderData.affiliation || 'Online Store'
    }))
  });
}

/**
 * Helper to generate unique transaction ID
 * @returns {string} Unique transaction ID
 */
function generateTransactionId() {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Usage example:
// trackPurchase({
//   transactionId: generateTransactionId(),
//   value: 329.99,
//   tax: 24.99,
//   shipping: 15.00,
//   coupon: 'SUMMER20',
//   items: [{ id: 'SKU_123', name: 'Product', category: 'Electronics', price: 99.99, quantity: 2 }]
// });


// ============================================================================
// REFUND EVENT
// ============================================================================

/**
 * Track refund
 * @param {string} transactionId - Original transaction ID
 * @param {number} refundAmount - Amount refunded
 * @param {array} refundedItems - Items being refunded
 */
function trackRefund(transactionId, refundAmount, refundedItems = []) {
  gtag('event', 'refund', {
    'transaction_id': transactionId,
    'value': refundAmount,
    'currency': 'USD',
    'items': refundedItems
  });
}

// Usage:
// trackRefund('TXN_12345', 99.99, [{ item_id: 'SKU_123', quantity: 1 }]);


// ============================================================================
// PROMOTION EVENTS
// ============================================================================

/**
 * Track promotion view
 * @param {string} promotionId - Promotion identifier
 * @param {string} promotionName - Promotion display name
 */
function trackViewPromotion(promotionId, promotionName) {
  gtag('event', 'view_promotion', {
    'promotion_id': promotionId,
    'promotion_name': promotionName
  });
}

/**
 * Track promotion selection
 * @param {string} promotionId - Promotion identifier
 * @param {string} promotionName - Promotion display name
 */
function trackSelectPromotion(promotionId, promotionName) {
  gtag('event', 'select_promotion', {
    'promotion_id': promotionId,
    'promotion_name': promotionName
  });
}

// Usage:
// trackViewPromotion('SUMMER_20', '50% Off Summer Sale');
// trackSelectPromotion('SUMMER_20', '50% Off Summer Sale');


// ============================================================================
// ENGAGEMENT EVENTS
// ============================================================================

/**
 * Track content sharing
 * @param {string} method - Share method (email, facebook, twitter, etc.)
 * @param {string} contentType - Type of content (product, article, etc.)
 * @param {string} itemId - Content identifier
 */
function trackShare(method, contentType, itemId) {
  gtag('event', 'share', {
    'method': method,
    'content_type': contentType,
    'item_id': itemId
  });
}

/**
 * Track lead generation
 * @param {number} leadValue - Estimated lead value (optional)
 */
function trackGenerateLead(leadValue = 0) {
  gtag('event', 'generate_lead', {
    'value': leadValue,
    'currency': 'USD'
  });
}

/**
 * Track content selection
 * @param {string} contentType - Type of content
 * @param {string} itemId - Content identifier
 */
function trackSelectContent(contentType, itemId) {
  gtag('event', 'select_content', {
    'content_type': contentType,
    'item_id': itemId
  });
}

// Usage:
// trackShare('email', 'product', 'SKU_123');
// trackGenerateLead(500.00);
// trackSelectContent('video', 'video_123');


// ============================================================================
// USER PROPERTIES
// ============================================================================

/**
 * Set user properties
 * @param {object} properties - User property values
 */
function setUserProperties(properties) {
  gtag('set', properties);
}

/**
 * Set user ID
 * @param {string} userId - Unique user identifier
 */
function setUserId(userId) {
  gtag('set', {
    'user_id': 'user_' + userId
  });
}

/**
 * Clear user ID (on logout)
 */
function clearUserId() {
  gtag('set', {
    'user_id': null
  });
}

// Usage:
// setUserProperties({ subscription_tier: 'premium', years_customer: 5 });
// setUserId('12345');
// clearUserId(); // On logout


// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create properly formatted items array
 * @param {array} products - Array of products
 * @returns {array} Formatted items array
 */
function createItemsArray(products) {
  return products.map(product => ({
    'item_id': product.id || product.sku,
    'item_name': product.name,
    'item_category': product.category,
    'item_brand': product.brand || undefined,
    'item_variant': product.variant || undefined,
    'price': product.price,
    'quantity': product.quantity || 1
  })).filter(item => item.item_id || item.item_name);
}

/**
 * Calculate order value
 * @param {array} items - Array of items
 * @returns {number} Total value
 */
function calculateOrderValue(items) {
  return items.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
}

/**
 * Validate transaction ID format
 * @param {string} transactionId - Transaction ID to validate
 * @returns {boolean} Is valid
 */
function isValidTransactionId(transactionId) {
  // Basic validation - should be non-empty and unique
  return transactionId && transactionId.length > 0 && transactionId.length <= 256;
}


// ============================================================================
// COMPLETE EXAMPLE INTEGRATION
// ============================================================================

/**
 * Complete ecommerce tracking example
 */
class EcommerceTracker {
  constructor() {
    this.cart = this.getCart();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add to cart button
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const product = this.getProductFromElement(e.target);
        trackAddToCart(product);
      }
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        const cartItems = createItemsArray(this.cart);
        const total = calculateOrderValue(this.cart);
        trackBeginCheckout(cartItems, total);
      });
    }

    // Form submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
      orderForm.addEventListener('submit', (e) => this.handleOrderSubmit(e));
    }
  }

  async handleOrderSubmit(event) {
    event.preventDefault();

    // Process order
    const response = await this.submitOrder();

    // Track purchase
    trackPurchase({
      transactionId: response.orderId,
      value: response.total,
      tax: response.tax,
      shipping: response.shipping,
      items: createItemsArray(response.items)
    });

    // Clear cart and redirect
    this.clearCart();
    window.location.href = '/thank-you?order=' + response.orderId;
  }

  getProductFromElement(element) {
    // Implementation depends on your DOM structure
    return {};
  }

  getCart() {
    return [];
  }

  clearCart() {
    this.cart = [];
  }

  async submitOrder() {
    // Submit to backend
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ items: this.cart })
    });
    return response.json();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.ecommerceTracker = new EcommerceTracker();
});
