# Items Array Complete Reference

## Items Array Overview

The `items` array is a core component of ecommerce tracking in GA4. It appears in all ecommerce events and contains product-level data.

---

## Array Structure

```javascript
'items': [
  {
    // Required (at least one)
    'item_id': 'SKU_123',
    'item_name': 'Product Name',

    // Highly Recommended
    'price': 99.99,
    'quantity': 1,
    'item_category': 'Electronics',

    // Optional
    'item_brand': 'Brand Name',
    'item_variant': 'Blue/Large',
    'item_category2': 'Phones',
    'item_category3': 'Smartphones',
    'item_category4': 'Android',
    'item_category5': 'Flagship',
    'coupon': 'SUMMER20',
    'discount': 10.00,
    'affiliation': 'Online Store',
    'item_list_id': 'new_arrivals',
    'item_list_name': 'New Arrivals',
    'location_id': 'store_123',
    'index': 0
  }
]
```

---

## Field Details

### item_id (REQUIRED - at least one)

**Purpose:** Unique product identifier

**Format:** String (any format)

**Examples:**
- `SKU_12345`
- `PROD_ABC123`
- `isbn_9781234567890`
- `gtin_1234567890123`

**Best Practices:**
- Use consistent format across all events
- Match your internal product database ID
- Never include user-specific data

```javascript
'item_id': 'SKU_BLUE_TSHIRT_LARGE'
```

---

### item_name (REQUIRED - at least one)

**Purpose:** Product display name

**Format:** String (max 100 characters recommended)

**Examples:**
- `Blue T-Shirt`
- `Premium Wireless Headphones - Black`
- `Winter Jacket - Size M`

**Best Practices:**
- Use human-readable name
- Include variant information if not separate
- Consistent across ecommerce platform

```javascript
'item_name': 'Blue T-Shirt - Large'
```

---

### price (HIGHLY RECOMMENDED)

**Purpose:** Individual unit price

**Format:** Number (decimal)

**Important:**
- Per-unit price, NOT total
- Total = price × quantity
- Should match product catalog price

```javascript
'price': 99.99
```

**Multi-Item Example:**
```javascript
'items': [
  {
    'item_id': 'SKU_001',
    'item_name': 'Product A',
    'price': 99.99,
    'quantity': 2  // Total for this item: 199.98
  },
  {
    'item_id': 'SKU_002',
    'item_name': 'Product B',
    'price': 50.00,
    'quantity': 1  // Total for this item: 50.00
  }
  // Grand total: 249.98
]
```

---

### quantity (HIGHLY RECOMMENDED)

**Purpose:** Number of units

**Format:** Integer

**Examples:**
- `1` - Single item
- `2` - Two units
- `10` - Ten units

**Important:**
- Should be ≥ 1
- Impacts value calculations
- Should match cart quantity

```javascript
'quantity': 3
```

**Calculation Example:**
```
price: 99.99
quantity: 3
item_total: 99.99 × 3 = 299.97
```

---

### item_category (HIGHLY RECOMMENDED)

**Purpose:** Primary product category

**Format:** String (e.g., "Electronics", "Apparel", "Home & Garden")

**Best Practices:**
- Use main category only
- Keep consistent across platform
- Use hierarchical category structure

```javascript
'item_category': 'Electronics'
```

**GA4 Reporting:**
- Enables "Items by category" analysis
- Product category segments
- Category-level conversion rates

---

### item_brand (OPTIONAL)

**Purpose:** Brand/manufacturer

**Format:** String

**Examples:**
- `Nike`
- `Sony`
- `Apple`
- `Our Store Brand`

```javascript
'item_brand': 'Nike'
```

**Reporting Use:**
- Brand performance analysis
- Brand-specific conversion rates
- Brand preference trends

---

### item_variant (OPTIONAL)

**Purpose:** Product variant (size, color, style, etc.)

**Format:** String (describe the specific variant)

**Examples:**
- `Blue/Large`
- `Red/Medium/Cotton`
- `Gold/64GB`
- `Leather/Black/Premium`

**Best Practices:**
- Standardize format (Color/Size)
- Separate multiple variants with slash
- Match product catalog variant descriptions

```javascript
'item_variant': 'Blue/Large/Cotton'
```

**Reporting Use:**
- Variant popularity analysis
- Which sizes/colors sell best
- Variant conversion rates

---

### item_category2 through item_category5 (OPTIONAL)

**Purpose:** Hierarchical category levels

**Format:** String

**Examples:**

**Level Structure:**
```
item_category:  'Electronics'     (Main category)
item_category2: 'Audio'           (Subcategory)
item_category3: 'Headphones'      (Sub-subcategory)
item_category4: 'Wireless'        (Further specification)
item_category5: 'Premium'         (Additional tier)
```

**Full Example:**
```javascript
'item_id': 'SKU_HEADPHONE_001',
'item_name': 'Premium Wireless Headphones',
'item_category': 'Electronics',
'item_category2': 'Audio',
'item_category3': 'Headphones',
'item_category4': 'Wireless',
'item_category5': 'Over-Ear'
```

**Another Example:**
```javascript
'item_category': 'Apparel',
'item_category2': 'Mens',
'item_category3': 'Shirts',
'item_category4': 'T-Shirts',
'item_category5': 'Short-Sleeve'
```

**Reporting Use:**
- Multi-level category analysis
- Category-to-purchase funnel
- Detailed product segmentation

---

### coupon (OPTIONAL)

**Purpose:** Coupon/promotion code applied to item

**Format:** String (coupon code)

**Examples:**
- `SUMMER20`
- `SAVE10`
- `WELCOME5`
- `NEWYEAR50`

**Important:**
- Item-level coupon (not transaction-level)
- Multiple items can have different coupons
- Usually paired with `discount` field

```javascript
'coupon': 'SUMMER20'
```

**Transaction-Level Example:**
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_12345',
  'coupon': 'SITEWIDE10',  // Applies to whole purchase
  'items': [
    {
      'item_id': 'SKU_001',
      'coupon': 'PRODUCT15'  // Different coupon on this item
    }
  ]
});
```

---

### discount (OPTIONAL)

**Purpose:** Discount amount on item

**Format:** Number (decimal, discount amount in transaction currency)

**Examples:**
- `10.00` - $10 discount
- `5.50` - $5.50 discount
- `0.99` - 99 cents discount

**Relationship to Price:**
```
original_price: 99.99
discount: 10.00
final_price: 89.99
```

**Implementation:**
```javascript
'price': 99.99,
'discount': 10.00,
// Customer pays: 99.99 - 10.00 = 89.99
```

**Reporting Use:**
- Discount impact analysis
- Discount effectiveness
- Revenue impact of promotions

---

### affiliation (OPTIONAL)

**Purpose:** Vendor/store name for multi-vendor platforms

**Format:** String

**Examples:**
- `Nike Store`
- `Amazon Marketplace`
- `Vendor ABC`
- `Warehouse Location 3`

**Use Cases:**
- Multi-vendor marketplaces
- Multiple physical locations
- Different store names

```javascript
'affiliation': 'Nike Store'
```

**Transaction-Level:**
```javascript
gtag('event', 'purchase', {
  'affiliation': 'Main Online Store',  // Default/transaction-level
  'items': [
    {
      'item_id': 'SKU_001',
      'affiliation': 'Nike Store'  // Override for this item
    }
  ]
});
```

---

### item_list_id (OPTIONAL)

**Purpose:** Identifier for the list/collection item came from

**Format:** String (identifier, not display name)

**Examples:**
- `search_results`
- `category_electronics`
- `homepage_featured`
- `related_products`
- `sale_section`

**Use Cases:**
```javascript
// From search results
gtag('event', 'select_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_list_id': 'search_results'
  }]
});

// From category
gtag('event', 'view_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_list_id': 'category_shoes'
  }]
});

// From recommendations
gtag('event', 'select_item', {
  'items': [{
    'item_id': 'SKU_123',
    'item_list_id': 'recommendations_widget'
  }]
});
```

**Reporting Use:**
- Track which collections drive sales
- Compare performance of different lists
- Identify high-converting collections

---

### item_list_name (OPTIONAL)

**Purpose:** Display name for the list/collection

**Format:** String (human-readable)

**Examples:**
- `Search Results for Shoes`
- `Electronics Category`
- `New Arrivals`
- `Customers Also Bought`
- `Summer Sale`

**Important:**
- Use display name (what users see)
- Pair with `item_list_id` for consistency
- Should be understandable in reports

```javascript
'item_list_name': 'New Arrivals'
```

**Full Example:**
```javascript
gtag('event', 'view_item_list', {
  'items': [{...}],
  'item_list_id': 'featured_section',
  'item_list_name': 'Featured Products - Home Page'
});
```

---

### location_id (OPTIONAL)

**Purpose:** Physical store location identifier

**Format:** String (store ID or location code)

**Examples:**
- `store_123`
- `NYC_Broadway`
- `location_LAX_001`
- `warehouse_sf`

**Use Cases:**
- Multi-location retailers
- In-store purchases
- Store-based pickup
- Inventory tracking

```javascript
'location_id': 'store_downtown_la'
```

**E-Commerce + In-Store:**
```javascript
gtag('event', 'purchase', {
  'items': [
    {
      'item_id': 'SKU_001',
      'location_id': 'store_sf'  // Picked up at SF store
    }
  ]
});
```

---

### index (OPTIONAL)

**Purpose:** Position of item in list (0-based)

**Format:** Integer (0, 1, 2, ...)

**Important:**
- 0-based indexing (first item = 0)
- Useful for tracking list position impact
- Typically auto-generated

```javascript
'items': [
  {
    'item_id': 'SKU_001',
    'item_name': 'First Product',
    'index': 0
  },
  {
    'item_id': 'SKU_002',
    'item_name': 'Second Product',
    'index': 1
  },
  {
    'item_id': 'SKU_003',
    'item_name': 'Third Product',
    'index': 2
  }
]
```

**Reporting Use:**
- Position analysis (first item gets more clicks?)
- List effectiveness by position
- A/B test different orderings

---

## Custom Item Parameters

**Advanced:** Register custom item parameters as custom dimensions

**Example Custom Parameters:**
```javascript
'items': [{
  'item_id': 'SKU_001',
  'item_name': 'Product A',

  // Custom parameters (must be registered as custom dimensions)
  'item_color': 'blue',
  'item_material': 'cotton',
  'supplier': 'vendor_123',
  'profit_margin': '45%',
  'in_stock': true
}]
```

**Registration Process:**
1. Send custom parameter in items array
2. Admin → Custom Definitions → Create Custom Dimension
3. Set Scope: "Item"
4. Map to parameter name (e.g., "item_color")
5. Wait 24-48 hours
6. Use in "Items" report

---

## Complete Examples

### Simple Product

```javascript
'items': [{
  'item_id': 'TSHIRT_001',
  'item_name': 'Blue T-Shirt',
  'price': 29.99,
  'quantity': 1,
  'item_category': 'Apparel'
}]
```

### Product with Variants

```javascript
'items': [{
  'item_id': 'PHONE_IPHONE_BLACK_256GB',
  'item_name': 'iPhone 15 Pro - Black - 256GB',
  'item_brand': 'Apple',
  'item_category': 'Electronics',
  'item_category2': 'Phones',
  'item_category3': 'Smartphones',
  'item_variant': 'Black/256GB',
  'price': 999.99,
  'quantity': 1
}]
```

### Multiple Items with Discounts

```javascript
'items': [
  {
    'item_id': 'SKU_001',
    'item_name': 'Product A',
    'price': 99.99,
    'quantity': 2,
    'item_category': 'Electronics',
    'coupon': 'SUMMER20',
    'discount': 20.00
  },
  {
    'item_id': 'SKU_002',
    'item_name': 'Product B',
    'price': 50.00,
    'quantity': 1,
    'item_category': 'Accessories',
    'discount': 5.00
  }
]
```

### Marketplace with Affiliations

```javascript
'items': [
  {
    'item_id': 'VENDOR1_SKU_001',
    'item_name': 'Product from Vendor 1',
    'affiliation': 'Vendor ABC',
    'price': 49.99,
    'quantity': 1
  },
  {
    'item_id': 'VENDOR2_SKU_002',
    'item_name': 'Product from Vendor 2',
    'affiliation': 'Vendor XYZ',
    'price': 29.99,
    'quantity': 1
  }
]
```

---

## Validation Rules

**Requirements:**
- ✅ At least one item in array (minimum 1)
- ✅ Maximum 27 items per event
- ✅ Each item has item_id OR item_name (at least one)
- ✅ price and quantity are numbers (not strings)
- ✅ quantity ≥ 1
- ✅ price > 0 (positive value)

**Common Errors:**
- ❌ Empty items array `[]`
- ❌ Item without ID or name
- ❌ Price as string `"99.99"` (must be number `99.99`)
- ❌ Quantity as string `"2"` (must be number `2`)
- ❌ Negative price or quantity
- ❌ More than 27 items

---

## Testing Items Array

**Use DebugView to verify:**

1. Event contains items array
2. Each item has at least item_id or item_name
3. Prices and quantities are numeric
4. Array structure is valid JSON
5. No special characters in field names

**Debug Checklist:**
```
✓ Items array present
✓ Minimum 1 item
✓ Maximum 27 items
✓ Item ID or name exists
✓ Numeric values (not strings)
✓ Prices match product catalog
✓ Quantities match cart data
✓ Categories consistent with product data
```
