# E-commerce Data Layer Patterns

## Overview

Ecommerce events in Google Analytics 4 (GA4) enable you to collect information about shopping behavior and quantify your most popular products, measure the influence of promotions and product placement on revenue.

## E-commerce Object Structure

### GA4 E-commerce Schema

All ecommerce events use an `items` array to represent products and services. The items array can include up to 200 elements and supports up to 27 custom parameters in addition to prescribed parameters.

#### Item Object Structure

```javascript
{
  item_id: "SKU_12345",           // Required
  item_name: "Stan and Friends Tee", // Required
  affiliation: "Google Merchandise Store",
  coupon: "SUMMER_FUN",
  discount: 2.22,
  index: 0,
  item_brand: "Google",
  item_category: "Apparel",
  item_category2: "Adult",
  item_category3: "Shirts",
  item_category4: "Crew",
  item_category5: "Short sleeve",
  item_list_id: "related_products",
  item_list_name: "Related Products",
  item_variant: "green",
  location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
  price: 10.01,
  quantity: 3
}
```

## E-commerce Events

### 1. View Item List

When a user is presented with a list of results (e.g., search results, category page), send a `view_item_list` event:

```javascript
gtag("event", "view_item_list", {
  item_list_id: "related_products",
  item_list_name: "Related products",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      quantity: 3
    }
  ]
});
```

### 2. Select Item

When a user selects an item from the list:

```javascript
gtag("event", "select_item", {
  item_list_id: "related_products",
  item_list_name: "Related products",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      // ... other item parameters
    }
  ]
});
```

### 3. View Item Details

Measure how many times item details are viewed:

```javascript
gtag("event", "view_item", {
  currency: "USD",
  value: 30.03,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 4. Add to Cart

Measure when an item is added to a shopping cart:

```javascript
gtag("event", "add_to_cart", {
  currency: "USD",
  value: 30.03,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 5. Remove from Cart

Measure when a user removes an item from cart:

```javascript
gtag("event", "remove_from_cart", {
  currency: "USD",
  value: 30.03,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 6. View Cart

When a user views the cart:

```javascript
gtag("event", "view_cart", {
  currency: "USD",
  value: 30.03,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 7. Add to Wishlist

Measure when an item is added to a wishlist:

```javascript
gtag("event", "add_to_wishlist", {
  currency: "USD",
  value: 30.03,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 8. Begin Checkout

Measure the first step in a checkout process:

```javascript
gtag("event", "begin_checkout", {
  currency: "USD",
  value: 30.03,
  coupon: "SUMMER_FUN",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 9. Add Shipping Info

When a user adds shipping information:

```javascript
gtag("event", "add_shipping_info", {
  currency: "USD",
  value: 30.03,
  coupon: "SUMMER_FUN",
  shipping_tier: "Ground",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 10. Add Payment Info

When a user submits payment information:

```javascript
gtag("event", "add_payment_info", {
  currency: "USD",
  value: 30.03,
  coupon: "SUMMER_FUN",
  payment_type: "Credit Card",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

### 11. Purchase

Measure a purchase:

```javascript
gtag("event", "purchase", {
  transaction_id: "T_12345",  // Required
  value: 72.05,  // Sum of (price * quantity) for all items
  tax: 3.60,
  shipping: 5.99,
  currency: "USD",
  coupon: "SUMMER_SALE",
  customer_type: "new",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      quantity: 2
    }
  ]
});
```

### 12. Refund

Measure refunds with the relevant transaction ID:

```javascript
gtag("event", "refund", {
  currency: "USD",
  transaction_id: "T_12345",  // Required
  value: 30.03,
  coupon: "SUMMER_FUN",
  shipping: 3.33,
  tax: 1.11,
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      price: 10.01,
      quantity: 3
      // ... other item parameters
    }
  ]
});
```

## Promotions

### View Promotion

Measure promotion impressions:

```javascript
gtag("event", "view_promotion", {
  creative_name: "Summer Banner",
  creative_slot: "featured_app_1",
  promotion_id: "P_12345",
  promotion_name: "Summer Sale",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      // ... other item parameters
    }
  ]
});
```

### Select Promotion

Indicate a user clicked on a promotion:

```javascript
gtag("event", "select_promotion", {
  creative_name: "Summer Banner",
  creative_slot: "featured_app_1",
  promotion_id: "P_12345",
  promotion_name: "Summer Sale",
  items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      // ... other item parameters
    }
  ]
});
```

## Best Practices

### 1. Currency Formatting

- Always set `currency` when sending `value` (revenue) data
- Ensures revenue metrics are calculated correctly
- Use standard 3-letter ISO 4217 currency codes (e.g., "USD", "EUR", "GBP")

### 2. Product IDs

- Use consistent product IDs across all events
- Ensure `item_id` matches your product catalog
- Include both `item_id` and `item_name` for better reporting

### 3. Item Array Structure

- Populate all available ecommerce parameters you have data for
- Even if a parameter is optional, include it when you have the data
- Helps maximize the utility of your ecommerce reporting

### 4. Event Timing

- Fire events at the appropriate time in the user journey
- Don't fire `purchase` events until transaction is confirmed
- Fire `view_item_list` when the list initially loads, not on interaction

### 5. Data Quality Validation

- Use [debug mode](https://support.google.com/analytics/answer/7201382) to verify events in realtime
- Check that parameters match expected values
- Verify currency and value calculations are correct
- Test the complete funnel from browsing to purchase

### 6. Custom Dimensions and Metrics

- Review [custom dimension and metric limits](https://support.google.com/analytics/answer/10075209#limits)
- Plan your custom parameters within these limits
- Document your custom parameter usage

### 7. Sample E-commerce Website

- Use [the Google sample ecommerce website](https://enhancedecommerce.appspot.com/) as a reference
- See practical examples of proper tagging
- Test your implementation against working examples

## Implementation Tips

### Setting Currency at Event Level

When setting the items array outside of the ecommerce object, set the `currency` parameter at the event level:

```javascript
gtag("event", "purchase", {
  transaction_id: "T_12345",
  currency: "USD",  // Event-level currency
  value: 72.05,
  items: [
    // items array
  ]
});
```

### Consistent Naming Conventions

Maintain consistent naming across your implementation:

- Use snake_case for event names (following GA4 conventions)
- Keep parameter names consistent with GA4 recommended events
- Document any custom parameters you add

## Common Patterns

### Product Listing Pages

```javascript
// On page load
gtag("event", "view_item_list", {
  item_list_id: "category_shirts",
  item_list_name: "Shirts",
  items: [/* all visible products */]
});

// On product click
gtag("event", "select_item", {
  item_list_id: "category_shirts",
  item_list_name: "Shirts",
  items: [/* clicked product */]
});
```

### Product Detail Pages

```javascript
// On page load
gtag("event", "view_item", {
  currency: "USD",
  value: 29.99,
  items: [/* product details */]
});

// On add to cart button click
gtag("event", "add_to_cart", {
  currency: "USD",
  value: 29.99,
  items: [/* product with quantity */]
});
```

### Shopping Cart

```javascript
// When viewing cart
gtag("event", "view_cart", {
  currency: "USD",
  value: 150.00,
  items: [/* all cart items */]
});

// When removing item
gtag("event", "remove_from_cart", {
  currency: "USD",
  value: 29.99,
  items: [/* removed item */]
});
```

### Checkout Flow

```javascript
// Step 1: Begin checkout
gtag("event", "begin_checkout", {
  currency: "USD",
  value: 150.00,
  items: [/* all cart items */]
});

// Step 2: Add shipping
gtag("event", "add_shipping_info", {
  currency: "USD",
  value: 150.00,
  shipping_tier: "Ground",
  items: [/* all cart items */]
});

// Step 3: Add payment
gtag("event", "add_payment_info", {
  currency: "USD",
  value: 150.00,
  payment_type: "Credit Card",
  items: [/* all cart items */]
});

// Step 4: Complete purchase
gtag("event", "purchase", {
  transaction_id: "T_12345",
  value: 155.99,
  tax: 10.00,
  shipping: 5.99,
  currency: "USD",
  items: [/* all purchased items */]
});
```

## Resources

- [GA4 E-commerce Documentation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [GA4 Recommended Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Set up a Purchase Event Guide](https://developers.google.com/analytics/devguides/collection/ga4/set-up-ecommerce)
- [Sample E-commerce Website](https://enhancedecommerce.appspot.com/)
