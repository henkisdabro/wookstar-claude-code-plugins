# Complete GTM-GA4 Setup Guide

## Prerequisites

1. **GTM Container Installed** - GTM container code already on website
2. **GA4 Property Created** - GA4 property with Measurement ID available
3. **GTM Editor+ Access** - Required permissions to create/modify tags

## Step-by-Step Setup

### Step 1: Install GTM Container (If Not Already Installed)

**GTM Container Code Location:**

Place in `<head>` section (immediately after `<head>` tag):

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Place noscript fallback in `<body>` (immediately after `<body>` tag):

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Step 2: Create GA4 Configuration Tag

**In GTM Workspace:**

1. Navigate to **Tags → New**
2. **Tag Name:** "GA4 - Configuration" (or "GA4 - Base Tag")

**Tag Configuration:**

3. Click **Tag Configuration** box
4. Select **Google Tag** (tag type)
5. **Tag ID:** Enter GA4 Measurement ID (format: `G-XXXXXXXXXX`)
   - Find in: GA4 Admin → Data Streams → Web Stream → Measurement ID

**Configuration Settings (Optional):**

6. Click **Configuration Settings** (expand if needed)
7. Set optional parameters:
   - **send_page_view:** true (default - automatically sends page_view events)
   - **allow_google_signals:** true (for Demographics/Remarketing)
   - **allow_ad_personalization_signals:** true

**Shared Event Settings (Optional):**

8. Click **Shared Event Settings** to add parameters sent with ALL events:
   - Example: `user_tier`, `page_category`, etc.

**Triggering:**

9. Click **Triggering** box
10. Select **Initialization - All Pages**
    - This fires BEFORE page_view
    - Ensures GA4 loads on every page

**Save:**

11. Click **Save**

**Result:** GA4 Configuration tag created and will fire on all pages

### Step 3: Test GA4 Configuration Tag

**Using GTM Preview Mode:**

1. Click **Preview** button (top-right of GTM)
2. Enter your website URL
3. Click **Connect**
4. Tag Assistant opens in new window

**Verify in Tag Assistant:**

- **Summary** tab shows "Tag Fired: GA4 - Configuration"
- **Tag** appears in "Tags Fired" section
- Event: `gtm.js` (GTM initialization)
- **Initialization** trigger activated

**Verify in GA4 DebugView:**

1. Open GA4 property
2. Go to **Admin → DebugView**
3. See events appearing in real-time:
   - `page_view` (automatic from GA4 Configuration tag)
   - `session_start`
   - `first_visit` (if first time)

### Step 4: Create GA4 Event Tags

**Example: Button Click Event**

**Create Tag:**

1. **Tags → New**
2. **Name:** "GA4 - Button Click - Subscribe"
3. **Tag Configuration → Google Tag**
4. **Tag ID:** Same GA4 Measurement ID (G-XXXXXXXXXX)
5. **Event Name:** `button_click`

**Event Parameters:**

6. Click **Add Parameter**
7. Parameter entries:
   - **Parameter Name:** `button_name` → **Value:** `{{Button Text}}` (variable)
   - **Parameter Name:** `button_location` → **Value:** `header`
   - **Parameter Name:** `button_id` → **Value:** `{{Click ID}}`

**Triggering:**

8. Click **Triggering**
9. Click **"+"** to create new trigger

**Create Trigger:**

10. **Trigger Name:** "Click - Subscribe Button"
11. **Trigger Type:** Click - All Elements
12. **This trigger fires on:** Some Clicks
13. **Filter:**
    - **Click ID** → **equals** → `subscribe-btn`
14. Click **Save**

**Save Event Tag:**

15. Click **Save**

### Step 5: Create Form Submission Event

**Create Tag:**

1. **Tags → New**
2. **Name:** "GA4 - Form Submit - Contact"
3. **Tag Configuration → Google Tag**
4. **Tag ID:** G-XXXXXXXXXX
5. **Event Name:** `form_submit`

**Event Parameters:**

6. Add Parameters:
   - `form_name` → `{{Form Name}}`
   - `form_id` → `{{Form ID}}`
   - `form_destination` → `/thank-you`

**Create Trigger:**

7. **Triggering → New Trigger**
8. **Name:** "Form - Contact Form Submit"
9. **Type:** Form Submission
10. **Fire on:** Some Forms
11. **Filter:** **Form ID** → **equals** → `contact-form`
12. Save trigger and tag

### Step 6: Implement Custom Event with Data Layer

**On Website (in code):**

```javascript
// When user adds item to cart
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
  dataLayer.push({
    'event': 'add_to_cart',
    'product_id': 'SKU_123',
    'product_name': 'Blue T-Shirt',
    'price': 29.99,
    'quantity': 1
  });
});
```

**In GTM:**

**Create Data Layer Variables:**

1. **Variables → New**
2. **Name:** "DL - Product ID"
3. **Type:** Data Layer Variable
4. **Variable Name:** `product_id`
5. Save

Repeat for `product_name`, `price`, `quantity`

**Create GA4 Event Tag:**

1. **Tags → New**
2. **Name:** "GA4 - Add to Cart"
3. **Tag Type:** Google Tag
4. **Tag ID:** G-XXXXXXXXXX
5. **Event Name:** `add_to_cart`
6. **Parameters:**
   - `product_id` → `{{DL - Product ID}}`
   - `product_name` → `{{DL - Product Name}}`
   - `price` → `{{DL - Price}}`
   - `quantity` → `{{DL - Quantity}}`

**Create Trigger:**

7. **Triggering → New**
8. **Name:** "Custom Event - Add to Cart"
9. **Type:** Custom Event
10. **Event name:** `add_to_cart`
11. Save

### Step 7: Test All Tags with Preview Mode

**Preview Workflow:**

1. Click **Preview** in GTM
2. Connect to website
3. Navigate pages and interact with elements
4. **Tag Assistant** shows:
   - Which tags fired
   - Which didn't fire (and why)
   - Variable values
   - Data layer state

**Check Each Event:**

- Click subscribe button → Verify "GA4 - Button Click" fires
- Submit contact form → Verify "GA4 - Form Submit" fires
- Add item to cart → Verify "GA4 - Add to Cart" fires

**Verify in GA4 DebugView:**

- All events appear with correct names
- Parameters populate with expected values
- No duplicate events

### Step 8: Publish GTM Container

**When Ready:**

1. Click **Submit** (top-right)
2. **Version Name:** "GA4 Initial Setup - [Date]"
3. **Version Description:**
   ```
   - Added GA4 Configuration tag
   - Added button click tracking
   - Added form submission tracking
   - Added add_to_cart event via data layer
   ```
4. Click **Publish**
5. **Result:** Changes live immediately on website

### Step 9: Verify Production

**After Publishing:**

1. Visit website (incognito/private mode)
2. Enable **Google Analytics Debugger** Chrome extension
3. Interact with tracked elements
4. Check **GA4 DebugView** for events

**Wait 24-48 hours:**
- Events appear in standard GA4 reports
- Custom dimensions/metrics populate

## Common Setup Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **Tags not firing** | Wrong trigger conditions | Check trigger settings in Preview mode |
| **GA4 Configuration not firing** | Wrong trigger selected | Must use "Initialization - All Pages" |
| **Parameters empty** | Variables not created | Create Data Layer Variables first |
| **Duplicate page_views** | Both gtag.js and GTM | Remove gtag.js snippet from website |
| **Events delayed** | Normal processing | Events appear in DebugView immediately, reports in 24-48 hours |

## Best Practices

**Naming Conventions:**
- Tags: "GA4 - [Event Name]"
- Triggers: "[Type] - [Description]"
- Variables: "DL - [Variable Name]" or "GTM - [Built-in Name]"

**Organization:**
- Use folders for related tags/triggers/variables
- Document changes in version descriptions
- Test thoroughly before publishing
- Keep GA4 Configuration tag separate from event tags

**Performance:**
- Use specific triggers (not "All Elements" when possible)
- Minimize data layer pushes
- Batch related events when feasible
