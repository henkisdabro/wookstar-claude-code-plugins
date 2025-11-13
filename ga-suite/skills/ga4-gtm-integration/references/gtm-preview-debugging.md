# GTM Preview Mode and Debugging Guide

## Enabling Preview Mode

**Steps:**
1. Open GTM workspace
2. Click **Preview** button (top-right)
3. Enter website URL in popup
4. Click **Connect**
5. New browser tab opens with Tag Assistant

**Result:** Tag Assistant panel shows real-time tag activity

## Tag Assistant Interface

### Summary Tab

**Shows:**
- Tags Fired count
- Tags Not Fired count
- Data Layer Messages
- Event timeline

### Tags Tab

**Categories:**
- **Tags Fired:** Successfully triggered tags
- **Tags Not Fired:** Tags that didn't trigger
- **Tag Firing Failed:** Tags with errors

**For Each Tag:**
- Tag name
- Trigger that fired it
- Variables used
- Parameters sent

### Variables Tab

**Shows All Variables:**
- Name
- Current value
- Type
- Last updated

### Data Layer Tab

**Shows:**
- All dataLayer pushes
- Event details
- Parameters
- Timestamp

### Errors Tab

**Shows:**
- JavaScript errors
- Tag firing errors
- Configuration issues

## Debugging Workflow

### Step 1: Verify GA4 Configuration Tag

**In Tag Assistant:**
1. Look for **"GA4 - Configuration"** in **Tags Fired**
2. Check it fired on **Initialization - All Pages** trigger
3. Verify Tag ID is correct (G-XXXXXXXXXX)

**Expected:** Fires on every page load

### Step 2: Test Event Tags

**Workflow:**
1. Trigger expected action (click button, submit form)
2. Check **Tags Fired** for corresponding GA4 event tag
3. Expand tag to see:
   - **Event Name:** Correct event name
   - **Event Parameters:** Populated with expected values
   - **Trigger:** Correct trigger fired

**Example: Button Click**
- Click "Subscribe" button
- Verify "GA4 - Button Click - Subscribe" in Tags Fired
- Check Event Parameters:
  - `button_name`: "Subscribe Now"
  - `button_location`: "header"

### Step 3: Verify Variables

**In Variables Tab:**
1. Locate variable (e.g., "DL - Product ID")
2. Check **Value** column
3. Verify value matches expected data

**Common Variables to Check:**
- Data Layer Variables
- Click Variables (after clicking element)
- Form Variables (after form interaction)
- Page Variables (on page load)

### Step 4: Check Data Layer

**In Data Layer Tab:**
1. See all `dataLayer.push()` calls
2. Expand each message
3. Verify structure and values

**Example:**
```
Message: {event: "add_to_cart", product_id: "SKU_123", ...}
Event: add_to_cart
Variables:
  - product_id: "SKU_123"
  - product_name: "Blue T-Shirt"
  - price: 29.99
```

### Step 5: Verify in GA4 DebugView

**After Tags Fire in GTM:**
1. Open GA4 property
2. Go to **Admin → DebugView**
3. Events appear in real-time
4. Click event to see parameters

**Verify:**
- Event name matches GTM event name
- Parameters match GTM event parameters
- Values are correct types (strings, numbers)

## Common Debugging Scenarios

### Scenario 1: Tag Not Firing

**Symptoms:**
- Tag appears in **Tags Not Fired**
- Expected action performed but tag doesn't fire

**Troubleshooting:**
1. **Check Trigger Conditions:**
   - Expand tag in **Tags Not Fired**
   - See "Why didn't this tag fire?"
   - Review trigger conditions

2. **Verify Trigger Variables:**
   - Check variables used in trigger
   - Ensure they have expected values

3. **Check Trigger Type:**
   - Click trigger: Did you click the right element?
   - Form trigger: Did form actually submit?
   - Custom Event: Was event pushed to dataLayer?

4. **Check Exceptions:**
   - Tag may have exception preventing firing

**Example Fix:**
- **Problem:** Click trigger for button ID "subscribe-btn" not firing
- **Check:** Click ID variable value
- **Find:** Actual button ID is "subscribe-button"
- **Fix:** Update trigger condition

### Scenario 2: Wrong Variable Value

**Symptoms:**
- Tag fires but parameter value is wrong/empty
- Variable shows `undefined` or wrong data

**Troubleshooting:**
1. **Check Variable Configuration:**
   - Data Layer Variable: Verify key name (case-sensitive)
   - JavaScript Variable: Check global variable exists
   - Click Variable: Ensure element has attribute

2. **Check Data Layer:**
   - Go to Data Layer tab
   - Find relevant dataLayer push
   - Verify key exists and has value

3. **Check Timing:**
   - Variable may not be set when tag fires
   - Ensure data layer push happens BEFORE tag fires

**Example Fix:**
- **Problem:** `product_id` variable empty
- **Check:** Data Layer tab
- **Find:** Key is `productId` (camelCase), not `product_id`
- **Fix:** Update variable name to `productId`

### Scenario 3: Duplicate Events

**Symptoms:**
- Same event fires multiple times
- Duplicate events in GA4

**Troubleshooting:**
1. **Check for Multiple Triggers:**
   - Same event tag may have multiple triggers
   - Review tag's triggering section

2. **Check for Multiple Tags:**
   - Multiple tags for same event
   - Search for duplicate tag names

3. **Check for gtag.js + GTM:**
   - Website may have both gtag.js snippet AND GTM
   - Remove gtag.js if using GTM

**Example Fix:**
- **Problem:** `page_view` firing twice
- **Find:** Both gtag.js snippet in <head> and GTM GA4 Configuration tag
- **Fix:** Remove gtag.js snippet

### Scenario 4: Missing Event Parameters

**Symptoms:**
- Event fires but some parameters missing
- GA4 DebugView shows event without expected parameters

**Troubleshooting:**
1. **Check Tag Configuration:**
   - Expand tag in Preview
   - Verify all parameters added to tag

2. **Check Variable Values:**
   - Variables Tab: Check parameter variables have values
   - Empty variables won't send parameters

3. **Check Data Layer:**
   - Ensure data layer includes all expected keys
   - Verify spelling and case

**Example Fix:**
- **Problem:** `item_category` parameter missing from `add_to_cart`
- **Check:** Variables Tab
- **Find:** `DL - Item Category` has value `undefined`
- **Root Cause:** dataLayer push missing `item_category` key
- **Fix:** Update dataLayer push to include `item_category`

## Advanced Debugging

### Debugging Data Layer

**View in Console:**
```javascript
// View entire data layer
window.dataLayer

// View last message
window.dataLayer[window.dataLayer.length - 1]

// Monitor pushes
var _push = window.dataLayer.push;
window.dataLayer.push = function() {
  console.log('dataLayer push:', arguments);
  return _push.apply(this, arguments);
};
```

### Debugging Triggers

**Test Trigger Manually:**
1. Preview mode active
2. Open Console
3. Manually push event:
```javascript
dataLayer.push({'event': 'test_event'});
```
4. Check if trigger fires

### Debugging Variables

**Check Variable in Console:**
```javascript
// For built-in variables
google_tag_manager['GTM-XXXXXXX'].dataLayer.get('variableName')

// For data layer
window.dataLayer.find(item => item.product_id)
```

## Testing Checklist

**Before Publishing:**

- [ ] GA4 Configuration tag fires on all pages
- [ ] All event tags fire when expected
- [ ] No tags in "Tags Not Fired" section
- [ ] Variables populate with correct values
- [ ] Event parameters sent to GA4
- [ ] No duplicate events firing
- [ ] Data Layer pushes correctly formatted
- [ ] Events appear in GA4 DebugView
- [ ] Parameters match expected values in DebugView
- [ ] No JavaScript errors in Errors tab

## Best Practices

**During Development:**
1. Test each tag immediately after creating
2. Use Preview mode for every change
3. Verify in both GTM and GA4 DebugView
4. Document expected behavior
5. Test on multiple pages/scenarios

**Before Publishing:**
1. Complete testing checklist
2. Test with team members
3. Document all tags/triggers/variables
4. Create version description
5. Schedule publication during low-traffic period

**After Publishing:**
1. Verify tags still working in production
2. Monitor GA4 DebugView for 30 minutes
3. Check standard GA4 reports next day
4. Monitor for anomalies
