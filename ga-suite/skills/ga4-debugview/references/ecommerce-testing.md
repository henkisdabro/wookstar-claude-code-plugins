# E-commerce Event Testing in DebugView

## Complete E-commerce Flow

### 1. view_item_list

**Fires:** Product listing page loads

**Required Parameters:**
- `item_list_id`: "related_products", "search_results"
- `item_list_name`: "Related Products", "Search Results"
- `items`: Array of products shown

**Validation:**
- [ ] Items array populated
- [ ] Each item has item_id and item_name
- [ ] item_list_id and item_list_name present

### 2. select_item

**Fires:** User clicks product from list

**Required Parameters:**
- `item_list_id`: Same as view_item_list
- `item_list_name`: Same as view_item_list
- `items`: Array with selected item

**Validation:**
- [ ] Only selected item in items array
- [ ] item_list matches where user clicked from

### 3. view_item

**Fires:** Product detail page loads

**Required Parameters:**
- `currency`: "USD"
- `value`: Product price
- `items`: Array with single product

**Validation:**
- [ ] currency present
- [ ] value is number
- [ ] items[0] contains full product details

### 4. add_to_cart

**Fires:** User adds item to cart

**Required Parameters:**
- `currency`: "USD"
- `value`: Item total (price × quantity)
- `items`: Array with added item(s)

**Validation:**
- [ ] value = price × quantity
- [ ] currency matches site currency
- [ ] items array has correct item
- [ ] quantity is integer

### 5. remove_from_cart (Optional)

**Fires:** User removes item from cart

**Required Parameters:**
- `currency`: "USD"
- `value`: Removed item value
- `items`: Array with removed item

### 6. view_cart (Optional)

**Fires:** Cart page loads

**Required Parameters:**
- `currency`: "USD"
- `value`: Total cart value
- `items`: All items in cart

### 7. begin_checkout

**Fires:** Checkout process starts

**Required Parameters:**
- `currency`: "USD"
- `value`: Cart total
- `items`: All items in cart
- `coupon` (if applicable)

**Validation:**
- [ ] value matches cart total
- [ ] All cart items in items array
- [ ] coupon code if applied

### 8. add_payment_info (Optional)

**Fires:** Payment method added

**Required Parameters:**
- `currency`: "USD"
- `value`: Transaction value
- `payment_type`: "credit_card", "paypal", etc.

### 9. add_shipping_info (Optional)

**Fires:** Shipping info added

**Required Parameters:**
- `currency`: "USD"
- `value`: Transaction value
- `shipping_tier`: "Ground", "Express", etc.

### 10. purchase

**Fires:** Transaction completes

**Required Parameters:**
- `transaction_id`: UNIQUE order ID
- `currency`: "USD"
- `value`: Total revenue
- `items`: All purchased items

**Optional Parameters:**
- `tax`: Tax amount
- `shipping`: Shipping cost
- `coupon`: Coupon code
- `affiliation`: Store name

**Validation:**
- [ ] transaction_id is unique (never reused)
- [ ] value is total (items + tax + shipping - discounts)
- [ ] All items have complete details
- [ ] tax and shipping are numbers
- [ ] No duplicate purchase events

### 11. refund (Optional)

**Fires:** Transaction refunded

**Required Parameters:**
- `transaction_id`: Original order ID
- `currency`: "USD"
- `value`: Refund amount

## Items Array Structure

**Complete Item Object:**

```javascript
{
  "item_id": "SKU_12345",           // Required
  "item_name": "Blue T-Shirt",      // Required
  "affiliation": "Online Store",
  "coupon": "SUMMER20",
  "currency": "USD",
  "discount": 2.00,
  "index": 0,                        // Position in list
  "item_brand": "MyBrand",
  "item_category": "Apparel",
  "item_category2": "Men",
  "item_category3": "Shirts",
  "item_category4": "T-Shirts",
  "item_category5": "Short Sleeve",
  "item_list_id": "related_products",
  "item_list_name": "Related Products",
  "item_variant": "Blue",
  "location_id": "Warehouse_A",
  "price": 29.99,                    // Required for most events
  "quantity": 2                      // Required for cart/purchase events
}
```

## Testing Purchase Event

**Complete Test:**

1. **Add items to cart** → Verify `add_to_cart` for each
2. **Go to checkout** → Verify `begin_checkout`
3. **Complete purchase** → Verify `purchase`

**Purchase Event Checklist:**

- [ ] Event name: `purchase`
- [ ] `transaction_id` present and unique
- [ ] `value` is number (not string)
- [ ] `currency` is 3-letter code
- [ ] `items` array not empty
- [ ] Each item has `item_id`
- [ ] Each item has `item_name`
- [ ] Each item has `price` (number)
- [ ] Each item has `quantity` (integer)
- [ ] Optional: `tax` is number
- [ ] Optional: `shipping` is number
- [ ] Optional: `coupon` is string
- [ ] No duplicate `transaction_id` in DebugView session

**Common Issues:**

**Issue:** Items array empty
- **Cause:** Items not passed to event
- **Fix:** Ensure dataLayer.push includes ecommerce.items

**Issue:** Value is string "99.99"
- **Cause:** Quotes around number
- **Fix:** Remove quotes: `value: 99.99`

**Issue:** transaction_id repeats
- **Cause:** Page reload after purchase, or testing with same ID
- **Fix:** Generate unique IDs, prevent double-submit

**Issue:** Item missing price
- **Cause:** Incomplete item object
- **Fix:** Include price in every item object

## Calculating Value

**Formula:**
```
value = (sum of item prices × quantities) + tax + shipping - discount
```

**Example:**
```javascript
Item 1: $29.99 × 2 = $59.98
Item 2: $19.99 × 1 = $19.99
Subtotal: $79.97
Tax: $6.40
Shipping: $5.00
Discount: -$10.00
Total value: $81.37
```

**In DebugView:**
```
purchase event:
  value: 81.37
  currency: "USD"
  tax: 6.40
  shipping: 5.00
  items: [item1, item2]
```

## Multi-Step Checkout Validation

**Step 1: Cart Page**
- `view_cart` event
- Items match current cart
- Value correct

**Step 2: Shipping Info**
- `add_shipping_info` event
- shipping_tier parameter
- Value includes shipping

**Step 3: Payment Info**
- `add_payment_info` event
- payment_type parameter
- Value matches total

**Step 4: Review Order**
- No specific event (or custom event)
- Final verification before purchase

**Step 5: Purchase Complete**
- `purchase` event
- Unique transaction_id
- All parameters correct
- Confirmation page loads

## Testing with Test Transactions

**Using GTM Preview + DebugView:**

1. Enable GTM Preview mode
2. Enable DebugView
3. Add test product to cart
4. Complete checkout with test payment
5. Verify each event in real-time:
   - **GTM Tag Assistant:** Tags fire
   - **DebugView:** Events appear
6. Cross-check parameters match
7. Verify transaction_id is unique
8. Test refund event (if implemented)

**Best Practice:**
- Use test payment gateway in development
- Generate unique transaction_ids for each test
- Document test transaction IDs
- Clean up test data if it reaches production
