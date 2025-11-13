# Complete DebugView Guide

## Enabling Debug Mode

### Method 1: Google Analytics Debugger Extension (Recommended)

**Installation:**
1. Open Chrome Web Store
2. Search "Google Analytics Debugger"
3. Install extension
4. Click extension icon to enable (icon turns blue)
5. Reload website

**Benefits:**
- Easiest method
- Works immediately
- No code changes needed
- Toggle on/off easily

### Method 2: URL Parameter

Add `?debug_mode=true` to any URL:
```
https://example.com/products?debug_mode=true
```

**Limitations:**
- Only debugs pages with parameter
- Lost on navigation (unless preserved)
- Must add to each test URL

### Method 3: gtag.js Code

Add to gtag.js configuration:
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});
```

**Important:** Remove before production!

### Method 4: Google Tag Manager

In GA4 Configuration tag:
1. Expand **Configuration Settings**
2. Add parameter:
   - Name: `debug_mode`
   - Value: `true`

**OR** use conditional debug mode:
```
debug_mode: {{Debug Mode Variable}}
```
Create variable that returns `true` in test environments only.

## DebugView Interface

### Main Components

**1. Device Stream (Left Sidebar)**

Shows active debug sessions:
- **Device icon:** Desktop/Mobile/Tablet
- **User identifier:** user_pseudo_id or user_id
- **Session timing:** How long ago session started
- **Event count:** Total events in session

**Click device** to see its event stream.

**2. Event Stream (Center Panel)**

Lists all events chronologically:
- **Event name:** (e.g., page_view, purchase)
- **Timestamp:** When event fired
- **Event icon:** Visual indicator by type
- **Event count badge:** Times this event fired

**Color coding:**
- Blue: Standard events
- Purple: E-commerce events
- Orange: Custom events

**3. Event Details (Right Panel)**

**When event selected, shows:**

**Event Parameters:**
- All parameters sent with event
- Parameter names and values
- Data types indicated

**User Properties:**
- Properties set at user level
- Persist across events
- Show value and set time

**Device & Geo:**
- Device category, brand, model
- Operating system, browser
- Country, region, city

**Event Context:**
- Event timestamp (precise)
- Session ID
- Event count in session

## Interpreting Events

### Automatic Events

**session_start**
- Fires: First event in new session
- Parameters:
  - `session_id`: Unique session identifier
  - `ga_session_id`: Session timestamp
  - `engagement_time_msec`: 0 (initial)

**first_visit**
- Fires: Only for brand new users
- Indicates: First time user visits site
- Parameters: Basic device/geo info

**page_view**
- Fires: Every page load (automatic with GA4 config)
- Parameters:
  - `page_location`: Full URL
  - `page_referrer`: Previous page URL
  - `page_title`: Document title
  - `engagement_time_msec`: Engagement time

**user_engagement**
- Fires: When user actively engages (1 second foreground)
- Parameters:
  - `engagement_time_msec`: Total engagement time

### Recommended Events

**purchase**

**Required Parameters:**
- `transaction_id`: Unique order ID
- `value`: Total revenue (number)
- `currency`: 3-letter ISO code
- `items`: Array of purchased items

**Optional Parameters:**
- `tax`: Tax amount
- `shipping`: Shipping cost
- `coupon`: Coupon code used

**Item Structure (in items array):**
```javascript
{
  "item_id": "SKU_123",
  "item_name": "Blue T-Shirt",
  "price": 29.99,
  "quantity": 1,
  "item_category": "Apparel",
  "item_brand": "MyBrand"
}
```

**add_to_cart**

**Required:**
- `currency`: "USD", "EUR", etc.
- `value`: Item value
- `items`: Array with item details

**begin_checkout**

**Required:**
- `currency`: Currency code
- `value`: Cart total
- `items`: Items array

### Custom Events

**Identification:**
- Event name not in Google's recommended list
- Typically follows business-specific naming
- Should use snake_case convention

**Validation:**
- Name ≤40 characters
- Lowercase with underscores
- Descriptive parameters
- Correct data types

## Validation Checklists

### Page View Validation

- [ ] `page_view` fires on every page load
- [ ] `page_location` contains full URL
- [ ] `page_title` matches document.title
- [ ] `page_referrer` shows previous page (if applicable)
- [ ] `engagement_time_msec` increases over time

### E-commerce Validation

**For purchase Event:**
- [ ] `transaction_id` is unique string
- [ ] `value` is number (not string "99.99")
- [ ] `currency` is 3-letter code (USD, EUR, GBP)
- [ ] `items` is array (not empty)
- [ ] Each item has `item_id` and `item_name`
- [ ] Item `price` is number
- [ ] Item `quantity` is integer
- [ ] Total matches sum of items
- [ ] No duplicate `transaction_id` in session

**For add_to_cart Event:**
- [ ] Fires when user adds item
- [ ] `items` array populated correctly
- [ ] `value` and `currency` present
- [ ] Item details match product added

### User Properties Validation

- [ ] Properties appear in User Properties section
- [ ] Properties persist across multiple events
- [ ] Property values correct type
- [ ] No PII (email, name, address)
- [ ] Custom properties prefixed appropriately

### Custom Dimensions Validation

- [ ] Custom dimensions appear as event parameters
- [ ] Values populate correctly
- [ ] Data type matches configuration in GA4
- [ ] Dimension name matches Admin setup exactly (case-sensitive)

## Troubleshooting

### Events Not Appearing in DebugView

**Checklist:**
1. **Debug mode enabled?**
   - Chrome extension active (icon blue)
   - URL has `?debug_mode=true`
   - gtag debug_mode set to true

2. **Correct property selected?**
   - Check property ID in top-left dropdown
   - Verify Measurement ID in code matches

3. **Events recent?**
   - DebugView shows last 30 minutes only
   - Reload page to send new events

4. **Tracking blocked?**
   - Disable ad blockers
   - Check browser privacy settings
   - Try incognito mode

5. **Implementation correct?**
   - Measurement ID format: G-XXXXXXXXXX
   - gtag.js or GTM installed correctly
   - No JavaScript errors blocking execution

### Missing Event Parameters

**Causes & Solutions:**

**Cause:** Parameter not sent from code
- **Solution:** Check dataLayer push includes parameter
- **Solution:** Verify GTM variable populated

**Cause:** Variable undefined in GTM
- **Solution:** Check Data Layer Variable configuration
- **Solution:** Verify data layer key spelling (case-sensitive)

**Cause:** Parameter name typo
- **Solution:** Check parameter name matches exactly
- **Solution:** Use consistent naming (snake_case)

**Cause:** Empty value filtered out
- **Solution:** Ensure variable has value before event fires
- **Solution:** Set default value if appropriate

### Wrong Data Types

**Issue:** String instead of number

**Example:**
```javascript
// WRONG
'value': '99.99'  // String

// CORRECT
'value': 99.99    // Number
```

**Detection in DebugView:**
- Parameter value appears in quotes: "99.99" (string)
- No quotes: 99.99 (number)

**Fix:**
- Use `parseInt()` or `parseFloat()` in JavaScript
- Remove quotes from literal values
- Check GTM variable format

### Duplicate Events

**Causes:**

1. **Multiple tags firing**
   - Check GTM for duplicate tags
   - Review trigger conditions

2. **Both gtag.js and GTM**
   - Remove gtag.js if using GTM
   - Use only one implementation method

3. **Trigger firing multiple times**
   - Check trigger limits in GTM
   - Use "Once per Event" firing option

4. **Multiple dataLayer pushes**
   - Review JavaScript for duplicate push calls
   - Check SPA route change handling

## Testing Workflows

### Complete Implementation Test

**Steps:**

1. **Enable debug mode** (Chrome extension)
2. **Open DebugView** (GA4 Admin → DebugView)
3. **Clear browser cache and cookies**
4. **Open website in incognito/private mode**
5. **Verify first-time user events:**
   - `first_visit` fires
   - `session_start` fires
   - `page_view` fires
   - All parameters present

6. **Navigate to second page**
   - `page_view` fires
   - `page_referrer` shows previous page
   - Session ID consistent

7. **Test custom events**
   - Trigger each custom event
   - Verify event name correct
   - Check all parameters present
   - Validate parameter values

8. **Test e-commerce flow (if applicable)**
   - View product → `view_item`
   - Add to cart → `add_to_cart`
   - Begin checkout → `begin_checkout`
   - Complete purchase → `purchase`
   - Verify all required parameters

9. **Check user properties**
   - Set user properties (if implemented)
   - Verify in User Properties section
   - Confirm persistence across events

10. **Test on mobile device**
    - Repeat key tests on mobile
    - Verify device_category: "mobile"

### GTM + DebugView Combined Testing

**Workflow:**

1. **Enable GTM Preview mode**
2. **Enable debug mode**
3. **Open both:**
   - GTM Tag Assistant (connected to site)
   - GA4 DebugView (separate tab)

4. **For each event:**
   - **In GTM:** Verify tag fires, variables populate
   - **In DebugView:** Verify event appears with parameters
   - **Cross-check:** Parameters match between GTM and GA4

5. **Troubleshoot discrepancies:**
   - If tag fires in GTM but not in DebugView: Check Measurement ID
   - If parameters missing: Check GTM variable mapping
   - If wrong values: Check variable configuration

## Best Practices

**During Development:**
- Test every new event immediately after implementation
- Use DebugView constantly while building
- Document expected vs actual behavior
- Take screenshots for team review

**Before Launch:**
- Complete full implementation test
- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on mobile and desktop
- Test with ad blockers disabled and enabled
- Verify critical e-commerce events thoroughly

**After Launch:**
- Monitor DebugView for first 30-60 minutes
- Check for unexpected events or duplicates
- Verify event volumes roughly match expectations
- Confirm events appear in standard reports (wait 24-48 hours)

**Regular Maintenance:**
- Test after any website changes
- Verify after GTM container updates
- Check during CMS/platform upgrades
- Test new features before launch

## Advanced Tips

**Testing Consent Mode:**
1. Set consent to denied
2. Verify events fire with consent status
3. Check `ad_storage` and `analytics_storage` parameters
4. Update consent to granted
5. Verify parameters update

**Testing User ID:**
1. Implement User ID for logged-in users
2. Verify `user_id` appears in event details
3. Check persistence across sessions
4. Test logout (user_id should clear)

**Testing Server-Side Events:**
1. Send event via Measurement Protocol
2. Check DebugView for event appearance
3. Verify parameters match API payload
4. Confirm `client_id` consistency
