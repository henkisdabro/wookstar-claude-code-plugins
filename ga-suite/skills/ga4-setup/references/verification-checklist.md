# GA4 Installation Verification Checklist

Comprehensive checklist and procedures for verifying GA4 installation across all implementation methods.

## Pre-Launch Verification Workflow

### Phase 1: Immediate Verification (0-5 minutes)

✅ **Task 1: Verify Code Placement**

**For gtag.js**:
- [ ] Code in `<head>` section
- [ ] Before other scripts
- [ ] After opening `<head>` tag
- [ ] Correct Measurement ID (G-XXXXXXXXXX)

**For GTM**:
- [ ] Head snippet after opening `<head>` tag
- [ ] Body snippet after opening `<body>` tag
- [ ] Correct Container ID (GTM-XXXXXXX)
- [ ] GA4 Configuration tag created in GTM
- [ ] Tag triggers on "Initialization - All Pages"

**For CMS/Plugin**:
- [ ] Plugin installed and activated
- [ ] Connected to correct GA4 property
- [ ] Measurement ID matches Data Stream

✅ **Task 2: Browser Console Check**

1. Open website in Chrome
2. Press F12 (Developer Tools)
3. Console tab
4. Look for:
   - [ ] No JavaScript errors related to gtag/GTM
   - [ ] "Google Analytics" or "gtag" messages
   - [ ] GTM: "Tag Manager loaded" message

✅ **Task 3: Network Tab Verification**

1. Developer Tools → Network tab
2. Reload page
3. Filter: "google-analytics" or "analytics"
4. Look for:
   - [ ] Request to `www.google-analytics.com/g/collect`
   - [ ] Status: 200 (success)
   - [ ] Query parameters include `&tid=G-XXXXXXXXXX`

### Phase 2: DebugView Verification (5-15 minutes)

✅ **Task 4: Enable Debug Mode**

**Option 1: Google Analytics Debugger Extension (Easiest)**
1. [ ] Install from Chrome Web Store
2. [ ] Enable extension (icon turns blue)
3. [ ] Reload website

**Option 2: GTM Preview Mode**
1. [ ] GTM → Click "Preview"
2. [ ] Enter website URL
3. [ ] Click "Connect"
4. [ ] Tag Assistant tab opens

**Option 3: Manual Debug Parameter (gtag.js)**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});
```

✅ **Task 5: Access DebugView**

1. [ ] GA4 Property → Admin → DebugView
2. [ ] Select device from dropdown (top)
3. [ ] Wait 10-30 seconds for data

✅ **Task 6: Verify Automatic Events**

Look for these events in DebugView:

**session_start**:
- [ ] Event appears on first page load
- [ ] Parameters present: `session_id`, `engagement_time_msec`

**first_visit** (new users only):
- [ ] Appears for users never visited before
- [ ] Clear cookies to test

**page_view**:
- [ ] Fires on every page load
- [ ] Check parameters:
  - [ ] `page_location` (full URL)
  - [ ] `page_referrer` (if applicable)
  - [ ] `page_title` (page title)

✅ **Task 7: Verify Enhanced Measurement Events**

**If Enhanced Measurement Enabled**:

**scroll** (requires scrolling 90% down page):
- [ ] Scroll to bottom of long page
- [ ] Event appears in DebugView
- [ ] Parameters: `engagement_time_msec`

**click** (outbound links):
- [ ] Click link to external domain
- [ ] Event appears
- [ ] Parameters: `link_url`, `link_domain`, `outbound: true`

**file_download**:
- [ ] Click link to PDF, DOC, or ZIP file
- [ ] Event appears
- [ ] Parameters: `file_name`, `file_extension`

**form_start / form_submit**:
- [ ] Interact with form field
- [ ] Submit form
- [ ] Both events appear
- [ ] Parameters: `form_id`, `form_name`

✅ **Task 8: Inspect Event Parameters**

Click any event in DebugView, verify parameters section shows:

**Automatically Collected**:
- [ ] `page_location`
- [ ] `page_referrer`
- [ ] `page_title`
- [ ] `language`
- [ ] `screen_resolution`
- [ ] `engagement_time_msec`

**User Properties**:
- [ ] `first_visit_time` (new users)
- [ ] Any custom user properties configured

### Phase 3: Realtime Reports Verification (15-30 minutes)

✅ **Task 9: Check Realtime Overview**

1. [ ] Reports → Realtime
2. [ ] Confirm showing "1" active user (or more)
3. [ ] User location appears on map
4. [ ] Recent events list shows `page_view`

✅ **Task 10: Verify Event Counts**

Click "Event count by Event name" card:
- [ ] `page_view` events present
- [ ] `session_start` events present
- [ ] `first_visit` (if testing as new user)
- [ ] Any custom events configured

✅ **Task 11: Test Multi-Page Navigation**

1. [ ] Navigate to 2-3 different pages
2. [ ] Each navigation triggers new `page_view`
3. [ ] Realtime shows updated event counts
4. [ ] Page titles/paths update in real-time

### Phase 4: Standard Reports Verification (24-48 hours)

⚠️ **Note**: Standard reports have 24-48 hour delay

✅ **Task 12: User Acquisition Report**

After 24-48 hours:
1. [ ] Reports → Acquisition → User acquisition
2. [ ] Data appears for "Direct" traffic (minimum)
3. [ ] Users and sessions counted

✅ **Task 13: Engagement Reports**

1. [ ] Reports → Engagement → Pages and screens
2. [ ] Website pages listed
3. [ ] Views counted
4. [ ] Average engagement time shown

✅ **Task 14: Events Report**

1. [ ] Reports → Engagement → Events
2. [ ] All events listed (page_view, session_start, etc.)
3. [ ] Event counts shown
4. [ ] Event parameters accessible (click event)

## Advanced Verification

### Custom Event Verification

✅ **Task 15: Test Custom Events** (if implemented)

For each custom event:
1. [ ] Trigger event action (click button, submit form, etc.)
2. [ ] Event appears in DebugView within seconds
3. [ ] Event name matches expected
4. [ ] All parameters present with correct values
5. [ ] Event appears in Realtime report
6. [ ] After 24-48 hours, appears in Events report

### Ecommerce Tracking Verification

✅ **Task 16: Test Ecommerce Events** (if implemented)

**view_item**:
1. [ ] View product page
2. [ ] Event fires in DebugView
3. [ ] Parameters: `currency`, `value`, `items` array
4. [ ] Items array contains `item_id`, `item_name`, `price`

**add_to_cart**:
1. [ ] Add product to cart
2. [ ] Event fires
3. [ ] Items array populated
4. [ ] Quantity and price correct

**purchase**:
1. [ ] Complete test purchase
2. [ ] Event fires
3. [ ] `transaction_id` unique
4. [ ] `value` matches total
5. [ ] `currency` correct (ISO code)
6. [ ] Items array complete
7. [ ] Check Monetization reports after 24-48 hours

### Cross-Domain Tracking Verification

✅ **Task 17: Test Cross-Domain** (if configured)

1. [ ] Navigate from domain1.com to domain2.com
2. [ ] Check Network tab for `_gl` parameter in URL
3. [ ] DebugView shows same user across domains
4. [ ] Session ID remains consistent

### User ID Tracking Verification

✅ **Task 18: Test User ID** (if implemented)

1. [ ] User logs in
2. [ ] DebugView shows `user_id` parameter in events
3. [ ] User ID matches expected format
4. [ ] User ID persists across pages
5. [ ] User ID not PII (no email, name, etc.)

## Tag Assistant Verification

✅ **Task 19: Google Tag Assistant**

1. [ ] Install "Tag Assistant Companion" Chrome extension
2. [ ] Visit website
3. [ ] Click extension icon
4. [ ] Verify:
   - [ ] GA4 tag detected
   - [ ] Tag status: Green (working)
   - [ ] Measurement ID correct
   - [ ] Events firing

## GTM-Specific Verification

### Preview Mode Testing

✅ **Task 20: GTM Preview Mode**

1. [ ] GTM → Preview
2. [ ] Connect to website
3. [ ] Tag Assistant window opens
4. [ ] Summary tab shows:
   - [ ] Container loaded
   - [ ] GA4 Configuration tag fired
   - [ ] All expected GA4 Event tags fired

✅ **Task 21: GTM Data Layer**

In Preview Mode:
1. [ ] Variables tab
2. [ ] Click "Data Layer"
3. [ ] Verify:
   - [ ] `gtm.start` present
   - [ ] `event: gtm.js` present
   - [ ] Custom dataLayer pushes present (if applicable)

✅ **Task 22: Trigger Verification**

For each GA4 Event tag:
1. [ ] Perform trigger action
2. [ ] Tags tab shows tag fired
3. [ ] Data Layer shows custom event
4. [ ] GA4 DebugView shows event

## Mobile App Verification

### iOS App Verification

✅ **Task 23: iOS Debug Mode**

1. [ ] Xcode: Edit Scheme
2. [ ] Arguments Passed On Launch: `-FIRDebugEnabled`
3. [ ] Run app
4. [ ] DebugView shows device
5. [ ] Events appear (`session_start`, `screen_view`)

✅ **Task 24: iOS Console Logs**

Xcode console shows:
- [ ] "Firebase Analytics enabled"
- [ ] "Firebase configuration loaded"
- [ ] No Firebase errors

### Android App Verification

✅ **Task 25: Android Debug Mode**

```bash
adb shell setprop debug.firebase.analytics.app com.example.app
```

1. [ ] Run command
2. [ ] Launch app
3. [ ] DebugView shows device
4. [ ] Events appear

✅ **Task 26: Android Logcat**

Logcat shows:
- [ ] "FA" (Firebase Analytics) logs
- [ ] "Analytics initialized"
- [ ] Event logging messages

## Common Issues & Solutions

### Issue: No Data in DebugView

**Checklist**:
- [ ] Debug mode actually enabled?
- [ ] Google Analytics Debugger extension ON?
- [ ] Correct GA4 property selected?
- [ ] Device dropdown set to correct device?
- [ ] Ad blocker disabled?
- [ ] Waiting 30+ seconds?

**Solutions**:
1. Refresh page with debugger enabled
2. Try incognito mode
3. Check browser console for errors
4. Verify Measurement ID correct

### Issue: Data in DebugView but Not Realtime

**Causes**:
- Realtime has slight delay (30-60 seconds)
- Internal traffic filter blocking data

**Solutions**:
1. Wait 2-3 minutes
2. Check: Admin → Data Settings → Data Filters
3. Verify IP not in "Internal Traffic" filter
4. Test from different network

### Issue: Data in Realtime but Not Standard Reports

**Expected Behavior**: Standard reports have 24-48 hour delay

**Verify**:
- [ ] At least 24 hours passed since installation
- [ ] Check date range in report includes today
- [ ] Data collection not paused (Admin → Data Settings)

### Issue: Duplicate Events

**Causes**:
- Multiple tracking implementations
- Both gtag.js AND GTM installed
- Plugin AND manual code

**Solutions**:
1. Remove duplicate implementations
2. Choose one method (GTM recommended)
3. Check Network tab for multiple collect requests
4. Review all tracking code locations

### Issue: Enhanced Measurement Not Working

**Checklist**:
- [ ] Enhanced Measurement toggle ON?
- [ ] Admin → Data Streams → Stream → Enhanced Measurement
- [ ] Specific event toggle enabled?
- [ ] Meeting trigger requirements? (e.g., 90% scroll)
- [ ] YouTube videos use JS API enabled?

**Solutions**:
1. Enable Enhanced Measurement
2. Check individual event toggles
3. Test specific interactions
4. Allow 24-48 hours for reports

## Post-Launch Monitoring

### Week 1 Checklist

- [ ] Day 1: Verify DebugView and Realtime working
- [ ] Day 2: Check standard reports starting to populate
- [ ] Day 3: Verify all pages tracking correctly
- [ ] Day 7: Review acquisition sources
- [ ] Day 7: Check engagement metrics baseline
- [ ] Day 7: Verify conversions/goals tracking

### Month 1 Checklist

- [ ] Review top pages and content
- [ ] Validate traffic sources accuracy
- [ ] Check for data anomalies
- [ ] Review custom events performance
- [ ] Verify ecommerce tracking (if applicable)
- [ ] Set up alerts for data gaps

## Verification Tools Summary

### Browser Extensions
- **Google Analytics Debugger**: Enable debug mode
- **Tag Assistant Companion**: Validate tag installation
- **GA4 Event Inspector** (3rd party): View events in-page

### GA4 Interface Tools
- **DebugView**: Real-time event validation
- **Realtime Reports**: Live user activity
- **DebugView**: Event parameter inspection

### GTM Tools
- **Preview Mode**: Tag firing verification
- **Tag Assistant**: Connected testing
- **Debug Console**: Data layer inspection

### Developer Tools
- **Chrome DevTools**: Network and console inspection
- **Xcode Console**: iOS debugging
- **Android Logcat**: Android debugging

## Verification Documentation Template

**Property**: [Property Name]
**Measurement ID**: G-XXXXXXXXXX
**Installation Method**: [gtag.js / GTM / Plugin]
**Verification Date**: [Date]

**Installation Verified**:
- [x] Code placement correct
- [x] DebugView showing events
- [x] Realtime showing users
- [x] Enhanced Measurement working
- [x] Custom events firing (if applicable)

**Verified Events**:
- [x] session_start
- [x] page_view
- [x] scroll
- [x] click (outbound)
- [x] [custom event name]

**Issues Found**: [List any issues]

**Resolution**: [How issues were fixed]

**Next Steps**: [Monitor standard reports in 24-48 hours]

**Verified By**: [Name]

## Final Verification Sign-Off

Before considering GA4 installation complete:

- [ ] All automatic events firing correctly
- [ ] Enhanced Measurement configured and working
- [ ] Custom events tested and validated
- [ ] Ecommerce tracking verified (if applicable)
- [ ] Cross-domain tracking tested (if applicable)
- [ ] User ID tracking working (if applicable)
- [ ] Internal traffic filters configured
- [ ] Data retention settings configured
- [ ] Documentation updated with Measurement IDs
- [ ] Team trained on DebugView and reports
- [ ] Monitoring plan established

**Status**: ✅ Installation Verified | ⚠️ Issues Found | ❌ Not Working

**Date**: _________________

**Verified By**: _________________

## Additional Resources

- Official Google: Verify GA4 Installation
- Official Google: DebugView Guide
- Official Google: Tag Assistant Help
- See ga4-debugview skill for advanced debugging
