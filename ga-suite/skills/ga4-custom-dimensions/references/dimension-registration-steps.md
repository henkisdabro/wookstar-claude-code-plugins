# Complete Dimension Registration Walkthrough

## Pre-Registration Checklist

Before registering a custom dimension in GA4 Admin:

- [ ] Parameter is being sent in event code
- [ ] Parameter name is finalized (case-sensitive)
- [ ] Scope is determined (event/user/item)
- [ ] Parameter verified in DebugView
- [ ] Dimension name is approved by team
- [ ] Not exceeding quota for scope type

---

## Method 1: Event-Scoped Dimension Registration

### Scenario: Tracking Which Forms Users Submit

**Step 1: Implement in Code**

Place the custom parameter in gtag event:

```javascript
// On form submission
document.getElementById('contact-form').addEventListener('submit', function() {
  gtag('event', 'form_submit', {
    'form_name': 'Contact Form',
    'form_id': 'contact-form-v1',
    'form_destination': '/thank-you'
  });
});
```

### Step 2: Verify in DebugView

1. Open GA4 property → Admin → DebugView
2. Install Google Analytics Debugger Chrome extension (if not installed)
3. Enable the extension (click icon, ensure enabled)
4. Refresh website page
5. Perform action that triggers event (submit form)
6. In DebugView left panel, click the "form_submit" event
7. Expand event details on right panel
8. Verify "form_name" parameter appears with correct value

**Expected DebugView Output:**

```
Event: form_submit
Timestamp: 2024-11-10 10:30:45.123

Parameters:
  - form_name: "Contact Form"
  - form_id: "contact-form-v1"
  - form_destination: "/thank-you"
  - (other auto-collected parameters)
```

### Step 3: Navigate to Custom Definitions

1. In GA4 property interface, click **Admin** (bottom left)
2. Under "Data Display" section, click **Custom Definitions**

### Step 4: Create Custom Dimension

1. Click **"Create Custom Dimension"** button (blue button, top right)
2. Fill the form that appears:

| Field | Entry | Example |
|-------|-------|---------|
| Dimension Name | Human-friendly name (appears in reports) | "Form Name" |
| Scope | Select "Event" | Event |
| Event Parameter | Exact parameter name from code (case-sensitive) | form_name |
| Description | Optional explanation | "Name of form submitted" |

3. Click **Save** button

### Step 5: Wait 24-48 Hours

- First 24 hours: DebugView may show parameter (if debug mode enabled)
- 24-48 hours: Reports begin showing dimension
- Retroactive population: Previous events reprocessed with dimension

### Step 6: Verify in Reports

After 24-48 hours:

1. Go to Analytics → Reports → any report
2. Click **+ Customize** or **+ Add dimension**
3. Search for "Form Name"
4. Add to report
5. Dimension values appear in data

---

## Method 2: User-Scoped Dimension Registration

### Scenario: Tracking Customer Subscription Tier

**Step 1: Implement in Code**

Set user property after user authentication:

```javascript
// After successful login
function handleLoginSuccess(user) {
  gtag('set', {
    'subscription_tier': user.planType,  // 'free', 'pro', 'enterprise'
    'customer_id': user.id,
    'account_created_date': user.createdDate
  });

  gtag('event', 'login', {
    'method': 'email'
  });
}
```

**Important:** Set user properties BEFORE sending events to ensure properties apply to all events.

### Step 2: Verify in DebugView

1. GA4 property → Admin → DebugView
2. Click any event after login (page_view, button_click, etc.)
3. Expand event details
4. Scroll to "User properties" section
5. Verify "subscription_tier" appears with correct value

**Expected DebugView Output:**

```
Event: page_view

User properties:
  - subscription_tier: "pro"
  - customer_id: "CUST_12345"
  - account_created_date: "2020-05-15"
```

### Step 3: Navigate to Custom Definitions

1. Click **Admin** → **Custom Definitions**

### Step 4: Create Custom Dimension

1. Click **"Create Custom Dimension"**
2. Fill the form:

| Field | Entry | Example |
|-------|-------|---------|
| Dimension Name | Human-friendly name | "Subscription Tier" |
| Scope | Select "User" | User |
| User Property | Exact property name from code | subscription_tier |
| Description | Optional | "Customer's plan type" |

3. Click **Save**

### Step 5: Wait 24-48 Hours

Same as event-scoped dimensions.

### Step 6: Verify in Reports

After 24-48 hours:

1. Analytics → Reports
2. Add dimension "Subscription Tier"
3. See all events grouped by subscription tier

---

## Method 3: Item-Scoped Dimension Registration

### Scenario: Tracking Product Colors in Purchases

**Step 1: Implement in Code**

Place parameter in items array of ecommerce event:

```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_' + Math.random(),
  'value': 149.98,
  'currency': 'USD',
  'items': [
    {
      'item_id': 'SKU_SHIRT_BLUE',
      'item_name': 'Blue T-Shirt',
      'price': 29.99,
      'quantity': 2,
      'item_category': 'Apparel',
      'item_color': 'blue'  // CUSTOM DIMENSION
    },
    {
      'item_id': 'SKU_PANTS_BLACK',
      'item_name': 'Black Pants',
      'price': 49.99,
      'quantity': 1,
      'item_category': 'Apparel',
      'item_color': 'black'  // CUSTOM DIMENSION - DIFFERENT VALUE
    }
  ]
});
```

### Step 2: Verify in DebugView

1. GA4 property → Admin → DebugView
2. Find "purchase" event
3. Click to expand event details
4. Scroll to "Items" section
5. Verify each item shows "item_color" parameter

**Expected DebugView Output:**

```
Event: purchase

Items:
  [0]:
    - item_id: "SKU_SHIRT_BLUE"
    - item_name: "Blue T-Shirt"
    - item_color: "blue"
  [1]:
    - item_id: "SKU_PANTS_BLACK"
    - item_name: "Black Pants"
    - item_color: "black"
```

### Step 3: Navigate to Custom Definitions

1. Click **Admin** → **Custom Definitions**

### Step 4: Create Custom Dimension

1. Click **"Create Custom Dimension"**
2. Fill the form:

| Field | Entry | Example |
|-------|-------|---------|
| Dimension Name | Human-friendly name | "Item Color" |
| Scope | Select "Item" | Item |
| Event Parameter | Parameter name from items array | item_color |
| Description | Optional | "Color variant of product" |

3. Click **Save**

### Step 5: Wait 24-48 Hours

Same delay as other scope types.

### Step 6: Verify in Reports

After 24-48 hours:

1. Analytics → Reports → Monetization → Items
2. Items report shows "Item Color" dimension
3. Analyze which colors have best revenue, quantity, etc.

---

## Custom Dimension Registration Form - Field Reference

### Dimension Name Field

**What to enter:** Human-friendly name that will appear in reports and UI

**Best practices:**
- Descriptive (not "custom1" or "data")
- Title case ("Form Name", not "form name")
- Under 50 characters
- No special characters (use underscores if needed)
- Avoid jargon unfamiliar to team

**Good examples:**
- "Form Name"
- "Video Quality"
- "Customer Segment"
- "Item Color"
- "Error Type"

**Poor examples:**
- "custom_param_1"
- "data"
- "x"
- "param123"

### Scope Field

**What to select:**

Three radio button options:

1. **Event** - Single event occurrence
   - Use for event-specific context
   - Each event sends its own value
   - Examples: button_name, form_id, video_title

2. **User** - All user events
   - Use for user attributes
   - Set once, applies to all events
   - Examples: subscription_tier, customer_segment

3. **Item** - Products in ecommerce events
   - Use for product-level data
   - Goes in items array
   - Examples: item_color, item_size

**Cannot be changed after creation** - Choose carefully.

### Event Parameter / User Property Field

**What to enter:** Exact parameter or property name from code

**Critical requirements:**
- Case-sensitive (subscription_tier ≠ subscription_Tier)
- Must match exactly as sent in code
- No spaces or special characters (use underscores)
- Under 40 characters

**How to find exact name:**

1. Look at DebugView parameter/property name
2. Copy parameter name exactly
3. Paste into this field

**Example matching:**

Code sends:
```javascript
gtag('event', 'video_watch', {
  'video_quality': 'hd'
});
```

Registration field should contain:
```
video_quality
```

NOT: "Video Quality" (that's the dimension name), "video_Quality", or "videoQuality"

### Description Field (Optional)

**What to enter:** Brief explanation of what dimension tracks

**Good descriptions:**
- "Quality setting of video watched (hd, sd, auto)"
- "Customer's plan type (free, pro, enterprise)"
- "Color variant of product in purchase"
- "Name of form submitted (contact, newsletter, demo)"

**Poor descriptions:**
- "custom data"
- "info"
- "tracking"

---

## Post-Registration Verification Workflow

### Hour 0-6: Immediate Post-Registration

1. **Do NOT create duplicate dimension** while waiting
2. **Do NOT modify the custom definition** (requires deletion and recreation)
3. **Continue sending parameter** in events (essential for population)

### Hour 24: First 24-Hour Check

1. Go to DebugView
2. Verify current events still sending parameter
3. Check if any data appearing in reports (may show before 48 hours)
4. Do NOT assume failure if not visible yet

### Hour 48: Full Population Expected

1. Go to Analytics → Reports
2. Add custom dimension to any report
3. If dimension appears: SUCCESS
4. If dimension doesn't appear: Troubleshoot

### Verification Checklist

- [ ] Dimension appears in dimension picker (Admin → Custom Definitions)
- [ ] Current events show dimension values in DebugView
- [ ] After 48 hours, dimension appears in reports
- [ ] Dimension values are accurate
- [ ] No duplicate dimensions created by mistake

---

## Editing & Deleting Custom Dimensions

### Edit Custom Dimension

**Cannot directly edit.** To change dimension:

1. Note dimension settings (name, scope, parameter)
2. Delete existing dimension
3. Create new dimension with updated settings
4. Wait 24-48 hours for new data population

**Why limited edits?**
- Scope cannot change (event to user, etc.)
- Parameter name essentially permanent
- Dimension name can be edited, but best practices say don't

### Delete Custom Dimension

**When to delete:**
- No longer tracking that parameter
- Exceeding quota limits
- Created by mistake
- Need to recreate with different settings

**Process:**

1. Admin → Custom Definitions
2. Find dimension in list
3. Click the dimension name
4. Click **Delete** button
5. Confirm deletion

**After deletion:**
- Historical data remains in reports (for 2-14 months per retention)
- New dimension can be created with same parameter name
- Takes 24-48 hours to remove from dimension picker

**Do NOT delete and immediately recreate** - Wait 24 hours to avoid conflicts.

---

## Batch Registration Strategy

When registering many dimensions at once:

### Prioritize by Quota

Standard GA4 limits:
- Event-scoped: 50 max
- User-scoped: 25 max
- Item-scoped: 10 max

Prioritize:
1. Essential for business reporting (register first)
2. Important but not critical (register second)
3. Nice-to-have (register if quota allows)

### Register in Waves

**Wave 1 (First): High-Priority Dimensions**
- Register 5-10 critical dimensions
- Wait 24-48 hours for population
- Verify data accuracy

**Wave 2 (Later): Medium-Priority Dimensions**
- Register after Wave 1 verified
- Again wait 24-48 hours
- Continue verification

**Wave 3 (Much Later): Low-Priority Dimensions**
- Register final wave if quota allows
- Ensure no conflicts with existing

### Why Wave Registration?

- Easier troubleshooting (fewer variables)
- Confirm code quality before scale
- Verify team understands process
- Catch quota issues early

---

## Common Registration Issues & Solutions

### Dimension Doesn't Appear After 48 Hours

**Troubleshooting steps:**

1. **Verify code still sending parameter**
   - Check DebugView
   - Confirm events have parameter
   - If missing: Fix code implementation

2. **Check parameter name case-sensitivity**
   - Go to DebugView
   - Look at exact parameter name shown
   - Compare to registered parameter name
   - Must be EXACT match

3. **Confirm scope is correct**
   - Go to Admin → Custom Definitions
   - Check scope: Event, User, or Item?
   - Verify matches implementation

4. **Check quota not exceeded**
   - Event-scoped: Are you over 50?
   - User-scoped: Are you over 25?
   - Item-scoped: Are you over 10?
   - If over quota: Delete unused dimensions

5. **Check minimum traffic threshold**
   - Dimension needs at least 1000 events with parameter
   - Low-traffic dimensions may not populate
   - Wait longer if very low traffic

### Parameter Appears in DebugView But Not Reports

- **Expected in first 24 hours** - Normal, wait until 48
- **After 48 hours** - Troubleshoot above

### Multiple Duplicates Created By Mistake

- Delete all but one copy
- Wait 24-48 hours between deletions
- Recreate if needed

### Can't Find Parameter in DebugView

- **Code may not be live** - Verify changes deployed
- **Parameter not sent** - Check event fires on intended action
- **Event not triggering** - Test event manually
- **DebugView device wrong** - Select correct device from dropdown

