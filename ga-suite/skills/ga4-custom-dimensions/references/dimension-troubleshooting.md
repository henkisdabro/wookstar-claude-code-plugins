# Custom Dimension Troubleshooting Guide

## Quick Diagnosis Flowchart

```
Are custom dimensions appearing in reports?
│
├─ YES → Is data accurate?
│        ├─ YES → No action needed
│        └─ NO → Jump to "Inaccurate Data" section
│
└─ NO → Is it after 48 hours?
        ├─ NO → Wait, normal processing delay (24-48 hours)
        └─ YES → Start troubleshooting below
```

---

## Most Common Issues & Solutions

### Issue 1: Dimension Doesn't Appear After 48 Hours

**Frequency:** 95% of reported problems

#### Check 1: Verify Code Still Sends Parameter

Go to DebugView to see if current events include the parameter:

1. GA4 Admin → DebugView
2. Look at events fired in last 5 minutes
3. Find the event type (form_submit, page_view, etc.)
4. Click to expand event details
5. Look for parameter in list

**Expected:** Parameter appears with correct value

**If Parameter Missing:**
- Code may not be live (deployment issue)
- Event may not be triggering at expected action
- Parameter may have been removed from code
- Test the action manually to verify event fires

**Solution:**
```javascript
// Verify code actively sending parameter
gtag('event', 'test_event', {
  'test_param': 'test_value'
});
// Check DebugView for this event
```

#### Check 2: Verify Case-Sensitive Parameter Name Match

GA4 is **case-sensitive**. The parameter name in code must match EXACTLY in registration.

**DebugView shows:** `form_name`
**Registered as:** `form_name` ✓ CORRECT
**Registered as:** `Form_Name` ✗ WRONG
**Registered as:** `formName` ✗ WRONG

**Solution:**

1. Go to DebugView
2. Find event with parameter
3. Look at EXACT parameter name as shown
4. Copy that exact name
5. Compare to what you registered

**If mismatch found:**
- Delete incorrect dimension
- Create new dimension with correct parameter name
- Wait 24-48 hours

#### Check 3: Verify Scope is Correct

Wrong scope will cause dimension to not appear properly.

**For event-scoped parameters:**
- Parameter appears in gtag('event') call
- Each event can have different value
- Example: button_name varies by event

```javascript
// If code looks like this → use EVENT scope
gtag('event', 'click', {
  'button_name': 'Subscribe'  // Different per event
});
```

**For user-scoped parameters:**
- Parameter appears in gtag('set') call
- Set once, applies to all events
- Example: subscription_tier remains same

```javascript
// If code looks like this → use USER scope
gtag('set', {
  'subscription_tier': 'premium'  // Same for all events
});
```

**For item-scoped parameters:**
- Parameter in items array
- Goes inside each product object
- Example: item_color varies per product

```javascript
// If code looks like this → use ITEM scope
gtag('event', 'purchase', {
  'items': [{
    'item_color': 'blue'  // Different per item
  }]
});
```

**Solution:**
- If scope wrong: Delete and recreate with correct scope
- Scope cannot be changed on existing dimension

#### Check 4: Verify Quota Not Exceeded

Standard GA4 property limits:
- Event-scoped dimensions: 50 maximum
- User-scoped dimensions: 25 maximum
- Item-scoped dimensions: 10 maximum

If at or over limit, GA4 silently fails to create dimension.

**Solution:**

1. Admin → Custom Definitions
2. Count existing dimensions by scope
3. If at limit: Delete unused dimensions
4. Then recreate the missing dimension

**Example deletion process:**

1. Find unused dimension in list
2. Click to select it
3. Click **Delete**
4. Confirm deletion
5. Wait 24 hours before creating replacement

#### Check 5: Verify Minimum Event Volume

Custom dimensions need sufficient event volume to populate in reports.

**Minimum for visibility:**
- At least 1,000 events with that parameter
- May not show if traffic very low

**Solution:**
- Check event volume in DebugView
- If traffic low, data will eventually populate
- Large websites: Usually visible within 48 hours
- Small websites: May take longer or be below threshold

**For testing with low traffic:**
- Use Realtime reports (shows faster)
- Check after several days of data collection
- Consider sampling: Manual filter to subset of users

#### Check 6: Verify Data Stream is Correct

Custom dimensions apply to their data stream. If created for wrong stream:

**Problem:** Created dimension for Data Stream A, but code sends to Data Stream B

**Solution:**

1. Verify Measurement ID in code
   ```javascript
   gtag('config', 'G-XXXXXXXXXX');  // This is the data stream
   ```

2. Admin → Data Streams
3. Match Measurement ID to correct stream
4. Verify dimension created in THAT stream (not another)
5. If in wrong stream: Create in correct stream

---

### Issue 2: Parameter in DebugView But Not in Reports

**Timeline:**
- Hour 0-6: Parameter fires in DebugView
- Hour 6-24: Should start appearing in reports
- Hour 24-48: Definitely should appear in reports

#### Within First 24 Hours: Normal

GA4 requires time to process events. This is expected behavior.

**Solution:** Wait until 48-hour mark, then check again.

#### After 48 Hours: Investigate

Use the diagnostic checklist above (Checks 1-6) to identify issue.

---

### Issue 3: Dimension Values Inconsistent or Wrong

#### Problem: All Users Show Same Value

**For event-scoped dimension:**
- ✗ WRONG: All events showing "Button A" when multiple buttons exist
- Cause: Parameter only sent sometimes
- Solution: Verify code sends parameter for ALL instances

**For user-scoped dimension:**
- ✓ EXPECTED: All events from user showing "Premium" tier
- This is correct behavior for user scope

#### Problem: Null or Empty Values Appearing

**Cause:** Parameter sometimes not sent

Example:
```javascript
gtag('event', 'form_submit', {
  'form_name': formElement.getAttribute('name')  // Could be null
});
```

If `formElement` doesn't exist or attribute missing → null value sent

**Solution:**
```javascript
gtag('event', 'form_submit', {
  'form_name': formElement.getAttribute('name') || 'unknown_form'
});
```

Always provide default value.

#### Problem: Unexpected Values in Reports

Example: Report shows "button name: [object Object]" instead of actual name

**Cause:** Sending object or array instead of string

```javascript
// WRONG - sending object
gtag('event', 'click', {
  'button_data': {name: 'Subscribe'}  // Object, not string!
});

// CORRECT - send string value
gtag('event', 'click', {
  'button_name': 'Subscribe'  // String value
});
```

**Solution:** Ensure values are primitive types (string, number, boolean)

---

### Issue 4: Multiple Dimensions Created by Accident

**Problem:** Accidentally created "form_name", "form_Name", "formName" (all slightly different)

**Solution:**

1. Delete the incorrect/duplicate versions
2. Keep only the correct one
3. Wait 24-48 hours between deletions
4. Verify code sends correct parameter name

**Deletion process:**
1. Admin → Custom Definitions
2. Click each duplicate
3. Click **Delete**
4. Confirm
5. Wait 24 hours
6. Verify deletion complete

---

### Issue 5: Dimension Quota Exceeded

**Error:** Cannot create new dimension, hitting quota limit

**Standard GA4 Quotas:**
- Event-scoped: 50 max (currently using X)
- User-scoped: 25 max (currently using X)
- Item-scoped: 10 max (currently using X)

**Solution:**

1. Admin → Custom Definitions
2. Identify unused dimensions
3. Delete low-priority dimensions
4. Now create new dimension

**Prioritization for deletion:**
- Delete: Dimensions with no data
- Delete: Dimensions not used in reports
- Delete: Experimental/testing dimensions
- Keep: Critical business metrics
- Keep: Frequently used dimensions

---

## Dimension Data Quality Issues

### Issue 6: High-Cardinality Dimensions (Too Many Values)

**What is cardinality?**
- Low: Few unique values (colors: red, blue, green)
- High: Many unique values (email addresses, IDs)

**Problem:** Creating dimension on high-cardinality parameter

Example:
```javascript
gtag('event', 'form_submit', {
  'user_email': user.email  // MILLIONS of unique values
});
```

**Impact:**
- Report becomes unwieldy
- Performance impacts
- GA4 may limit display (shows "other" for rare values)

**Solution:** Use low-cardinality parameters

**Good parameters (low cardinality):**
- Button names: 5-10 values
- Form names: 3-8 values
- User tiers: 3-5 values
- Colors: 6-10 values
- Locations: 20-100 values

**Bad parameters (high cardinality):**
- Email addresses: Millions
- User IDs: Millions
- Timestamps: Continuous
- Session IDs: Unique per session
- Product SKUs: Often thousands+

**Fix:**
- Don't track high-cardinality data as custom dimension
- Use for analysis in DebugView only
- Or aggregate: Convert `product_sku` to `product_category`

### Issue 7: Sending PII (Personally Identifiable Information)

**Prohibited:** Email, phone, SSN, credit card, name, IP address

```javascript
// WRONG - Don't send PII
gtag('event', 'signup', {
  'user_email': 'john@example.com',  // PII!
  'user_name': 'John Doe'             // PII!
});
```

**Solution:** Use anonymous identifiers

```javascript
// CORRECT - Use hashed or anonymous IDs
gtag('event', 'signup', {
  'user_tier': 'free',              // OK - non-PII attribute
  'signup_source': 'newsletter'      // OK - non-PII context
});
```

---

## Debugging with DebugView

### Enable DebugView (Three Methods)

#### Method 1: Chrome Extension (Easiest)

1. Install "Google Analytics Debugger" from Chrome Web Store
2. Click extension icon → Enable
3. Refresh website
4. Go to GA4 Admin → DebugView
5. Data appears immediately

#### Method 2: GTM Preview Mode

1. In GTM container → Click Preview
2. All GA4 tags automatically send debug_mode parameter
3. Go to GA4 DebugView
4. Data visible

#### Method 3: Manual Debug Code

```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});

// Or per event
gtag('event', 'form_submit', {
  'form_name': 'Contact',
  'debug_mode': true
});
```

### Using DebugView to Diagnose

**Verification Checklist:**

1. ✓ Event fires? See it in event stream
2. ✓ Parameter sends? See in event parameters
3. ✓ Parameter name correct? Check exact spelling/case
4. ✓ Parameter value correct? See actual value sent
5. ✓ Scope correct? User params in "User properties", item params in "Items"

**DebugView Navigation:**

- **Left panel:** Event stream (click to select)
- **Right panel:** Event details (expand sections)
- **User properties section:** Find user-scoped dimensions
- **Items section:** Find item-scoped dimensions

---

## Testing Custom Dimensions

### Manual Testing Workflow

1. **Create test dimension**
   - Name: "Test Dimension [your name]"
   - Register the test parameter

2. **Add test code to page**
   ```javascript
   gtag('event', 'test_event', {
     'test_parameter': 'test_value_' + new Date().toLocaleTimeString()
   });
   ```

3. **Verify in DebugView**
   - Trigger event manually
   - See parameter in DebugView
   - Confirm parameter name matches registration

4. **Wait 24-48 hours**

5. **Check test report**
   - Analytics → Reports
   - Add test dimension
   - See test values appear

6. **Delete test dimension**
   - Once verified
   - Clean up test data

---

## Getting Help & Debugging Checklist

### Before Contacting Support

Use this checklist to diagnose issue:

- [ ] Parameter appears in DebugView?
  - YES: Parameter is being sent correctly
  - NO: Issue is in implementation, not GA4

- [ ] Parameter name matches registration (case-sensitive)?
  - YES: Continue
  - NO: Fix parameter name

- [ ] Scope selection correct (Event/User/Item)?
  - YES: Continue
  - NO: Delete and recreate with correct scope

- [ ] Under quota for scope type?
  - YES: Continue
  - NO: Delete unused dimensions

- [ ] 48 hours passed since registration?
  - YES: Continue
  - NO: Wait longer, processing is normal

- [ ] Sufficient event volume (1000+ events)?
  - YES: Continue
  - NO: May appear later as traffic increases

### Debug Information to Gather

If contacting support, provide:

1. **GA4 Property ID:** properties/XXXXXXXXXX
2. **Dimension name:** Exactly as registered
3. **Parameter name:** Exactly as sent
4. **Scope:** Event/User/Item
5. **Date created:** When dimension registered
6. **Event type:** Which event sends parameter
7. **DebugView screenshot:** Showing parameter
8. **Expected vs actual:** What should appear vs what does

---

## Prevention: Best Practices

### Avoid Problems Before They Start

1. **Plan before implementation**
   - List all dimensions needed
   - Assign scopes to each
   - Check quota (don't exceed limits)
   - Get team approval

2. **Use consistent naming**
   - Standardize parameter names
   - Use snake_case
   - Clear, descriptive names
   - Document all parameters

3. **Test with small rollout**
   - Deploy to 1% of traffic first
   - Verify in DebugView
   - Wait 24-48 hours
   - Then full rollout

4. **Version control parameters**
   - If updating parameter name: Create new dimension
   - Don't modify existing dimensions
   - Keep version history

5. **Monitor after creation**
   - Check data appears after 48 hours
   - Verify data accuracy
   - Monitor for unexpected values
   - Set up alerts for anomalies

---

## Quick Reference: Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Dimension not found" | Registered with wrong name | Create with correct name |
| "Parameter mismatch" | Case doesn't match | Verify exact case in DebugView |
| "Cannot create dimension" | Quota exceeded | Delete unused dimensions |
| "Dimension appears empty" | No data sent | Verify code sends parameter |
| "Shows '[object Object]'" | Sending object not string | Send string value only |
| "All values blank/null" | Parameter optional, sometimes missing | Add default value in code |

---

## Advanced: Debugging with GA4 DebugView API

For developers, use the Realtime Report API to programmatically verify:

```python
from google.analytics.data_v1beta import BetaAnalyticsDataClient

client = BetaAnalyticsDataClient()

# Run realtime report to verify custom dimension
response = client.run_realtime_report(
    request={
        "property": "properties/PROPERTY_ID",
        "dimensions": [
            {"name": "customEvent:dimension_name"}
        ],
        "metrics": [
            {"name": "eventCount"}
        ]
    }
)

# Check if dimension appears with data
for row in response.rows:
    print(f"Dimension value: {row.dimension_values}")
    print(f"Event count: {row.metric_values}")
```

This confirms dimension is receiving data in real-time.

