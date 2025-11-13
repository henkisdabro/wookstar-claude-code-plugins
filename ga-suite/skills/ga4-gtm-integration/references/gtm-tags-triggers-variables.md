# GTM Tags, Triggers, and Variables Reference for GA4

## Tag Types for GA4

### Google Tag (GA4 Configuration Tag)

**Purpose:** Initialize GA4 tracking on pages

**Configuration:**
- **Tag ID:** GA4 Measurement ID (G-XXXXXXXXXX)
- **Trigger:** Initialization - All Pages
- **send_page_view:** true (automatic page_view events)

**When to Use:** One per GA4 property, fires on all pages

### Google Tag (GA4 Event Tag)

**Purpose:** Track specific events

**Configuration:**
- **Tag ID:** Same GA4 Measurement ID
- **Event Name:** Specific event (e.g., `button_click`, `purchase`)
- **Event Parameters:** Additional data

**When to Use:** Each specific event you want to track

## Trigger Types

### Page View Triggers

**All Pages**
- Fires on: Every page load
- Use for: GA4 Configuration tag

**Some Pages**
- Fires on: Pages matching conditions
- Conditions: Page Path, Page URL, Page Hostname
- Example: Page Path contains `/checkout`

**DOM Ready**
- Fires when: DOM fully loaded
- Use for: Tags requiring DOM elements

**Window Loaded**
- Fires when: Page fully loaded (images, CSS, JS)
- Use for: Tags after full page load

### Click Triggers

**All Elements**
- Fires on: Any click
- Filter by: Click ID, Class, URL, Text
- Example: Click ID equals `subscribe-btn`

**Just Links**
- Fires on: `<a>` tag clicks only
- Filter by: Click URL contains, starts with, equals
- Example: Outbound link tracking

### Form Triggers

**Form Submission**
- Fires when: Form submitted
- Filter by: Form ID, Class, URL, Text
- Example: Form ID equals `contact-form`

**Form Start** (Built-in Variable)
- Fires when: User interacts with form first time
- Use for: Form abandonment tracking

### Custom Event Triggers

**Custom Event**
- Fires when: `dataLayer.push({event: 'event_name'})`
- Event name: Exact match to data layer event
- Example: Event name = `add_to_cart`

### Scroll Depth Trigger

**Scroll Depth**
- Fires on: Vertical scroll percentages
- Thresholds: 25%, 50%, 75%, 90%
- Use for: Content engagement tracking

### Element Visibility Trigger

**Element Visibility**
- Fires when: Element visible on screen
- Selection Method: ID, CSS Selector
- Use for: Scroll-based element tracking

### Timer Trigger

**Timer**
- Fires on: Time intervals
- Interval: Milliseconds
- Limit: Optional max fires
- Use for: Engagement time tracking

## Variable Types

### Built-in Variables (Enable in Variables Section)

**Page Variables:**
- Page URL (full URL)
- Page Hostname (domain only)
- Page Path (path only, no domain)
- Referrer (previous page URL)

**Click Variables:**
- Click Element (entire element)
- Click Classes (CSS classes)
- Click ID (element ID)
- Click Target (link target)
- Click Text (visible text)
- Click URL (link href)

**Form Variables:**
- Form Element (entire form)
- Form Classes (CSS classes)
- Form ID (form ID attribute)
- Form Target (form target)
- Form Text (visible text in form)
- Form URL (form action URL)

**Utilities:**
- Random Number
- Debug Mode (true in Preview)
- Container ID (GTM-XXXXXXX)
- Container Version

### Custom Variables

**Data Layer Variable**
- Type: Data Layer Variable
- Variable Name: Key from `dataLayer` (e.g., `product_id`)
- Use: Access data layer values

**JavaScript Variable**
- Type: JavaScript Variable
- Global Variable Name: JavaScript variable name
- Example: `window.location.hostname`

**1st Party Cookie**
- Type: 1st Party Cookie
- Cookie Name: Name of cookie
- Use: Read cookie values

**Custom JavaScript**
- Type: Custom JavaScript
- Returns: Value from custom function

**Example:**
```javascript
function() {
  return document.querySelector('.product-price').textContent;
}
```

**Lookup Table**
- Type: Lookup Table
- Input Variable: Variable to map
- Mapping: Input value → Output value

**Example:**
- Input: `{{Page Type}}`
- `product` → `product_page`
- `category` → `category_page`

**RegEx Table**
- Type: RegEx Table
- Pattern matching with regex
- Use: Complex URL/path mapping

## Common Tag Configurations

### 1. GA4 Configuration Tag

```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Trigger: Initialization - All Pages
Configuration Settings:
  - send_page_view: true
  - allow_google_signals: true
```

### 2. Button Click Event Tag

```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Event Name: button_click
Event Parameters:
  - button_name: {{Button Text}}
  - button_location: header
Trigger: Click - Subscribe Button
```

### 3. Form Submission Tag

```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Event Name: form_submit
Event Parameters:
  - form_name: {{Form Name}}
  - form_id: {{Form ID}}
  - form_destination: /thank-you
Trigger: Form - Contact Form Submit
```

### 4. Add to Cart Tag (Data Layer)

```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Event Name: add_to_cart
Event Parameters:
  - items: {{DL - Ecommerce Items}}
  - value: {{DL - Ecommerce Value}}
  - currency: {{DL - Ecommerce Currency}}
Trigger: Custom Event - add_to_cart
```

### 5. Purchase Tag (Data Layer)

```
Tag Type: Google Tag
Tag ID: G-XXXXXXXXXX
Event Name: purchase
Event Parameters:
  - transaction_id: {{DL - Transaction ID}}
  - value: {{DL - Ecommerce Value}}
  - currency: {{DL - Ecommerce Currency}}
  - tax: {{DL - Tax}}
  - shipping: {{DL - Shipping}}
  - items: {{DL - Ecommerce Items}}
Trigger: Custom Event - purchase
```

## Common Trigger Configurations

### 1. All Pages Trigger

```
Trigger Type: Page View - All Pages
Fires on: All page views
Use: GA4 Configuration tag
```

### 2. Specific Page Trigger

```
Trigger Type: Page View - Some Pages
Fires on: Some Pages
Condition: Page Path contains /checkout
Use: Checkout page tracking
```

### 3. Click - Specific Button

```
Trigger Type: Click - All Elements
Fires on: Some Clicks
Condition: Click ID equals subscribe-btn
Use: Button click events
```

### 4. Click - Outbound Links

```
Trigger Type: Click - Just Links
Fires on: Some Link Clicks
Condition: Click URL does not contain {{Page Hostname}}
Use: External link tracking
```

### 5. Form - Specific Form

```
Trigger Type: Form Submission
Fires on: Some Forms
Condition: Form ID equals contact-form
Use: Form submission tracking
```

### 6. Custom Event - Data Layer

```
Trigger Type: Custom Event
Event name: add_to_cart
Use: Data layer event tracking
```

### 7. Scroll Depth

```
Trigger Type: Scroll Depth
Vertical Scroll Depths: 25, 50, 75, 90
Fires on: All Pages
Use: Content engagement
```

### 8. Element Visibility

```
Trigger Type: Element Visibility
Selection Method: ID
Element Selector: video-player
Fires on: Page View
Minimum Percent Visible: 50%
Use: Video player visibility
```

## Advanced Configurations

### Trigger Groups (AND Logic)

**Some Clicks with Multiple Conditions:**

```
Fires on: Some Clicks
Conditions (ALL must match):
  - Click Classes contains cta-button
  - Click URL does not contain #
  - Page Path equals /pricing
```

### Trigger Exceptions

**Fire Except on Certain Pages:**

```
Tag: GA4 - Page View Enhanced
Trigger: All Pages
Exception: Admin Pages (Page Path contains /admin)
```

### Variable Fallbacks

**Using Lookup Table with Default:**

```
Input: {{Page Type}}
Table:
  - product → product_page
  - category → category_page
Default Value: other_page
```

## Naming Conventions

**Tags:**
- Format: `[Platform] - [Event/Type] - [Description]`
- Examples:
  - `GA4 - Configuration`
  - `GA4 - Button Click - Subscribe`
  - `GA4 - Purchase`

**Triggers:**
- Format: `[Type] - [Description]`
- Examples:
  - `All Pages`
  - `Click - Subscribe Button`
  - `Form - Contact Form Submit`
  - `Custom Event - add_to_cart`

**Variables:**
- Format: `[Source] - [Variable Name]`
- Examples:
  - `DL - Product ID` (Data Layer)
  - `GTM - Page Path` (Built-in)
  - `JS - User Tier` (JavaScript)
  - `Cookie - Session ID` (1st Party Cookie)

## Testing Configurations

### Using Preview Mode

**Steps:**
1. Set up tag/trigger/variable
2. Click Preview
3. Connect to site
4. Trigger expected behavior
5. Verify in Tag Assistant:
   - Tag fires
   - Variables populate correctly
   - Parameters sent to GA4

### Common Test Scenarios

**Test 1: Click Trigger**
- Click element
- Verify tag fires
- Check Click Variables populate

**Test 2: Form Trigger**
- Fill form
- Submit
- Verify tag fires after submission
- Check Form Variables

**Test 3: Data Layer Event**
- Trigger data layer push
- Verify Custom Event trigger fires
- Check Data Layer Variables

**Test 4: Page View**
- Navigate to specific page
- Verify trigger conditions met
- Check Page Variables

## Troubleshooting

**Tag Not Firing:**
- Check trigger conditions in Preview
- Verify variables have values
- Check trigger exceptions

**Wrong Variable Value:**
- Check variable type configuration
- Verify data layer key name (case-sensitive)
- Check variable persistence settings

**Duplicate Firing:**
- Check for multiple matching triggers
- Review trigger conditions for overlap
- Check tag firing priorities
