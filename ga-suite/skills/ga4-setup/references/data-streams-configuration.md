# Data Streams Configuration Guide

Complete reference for configuring GA4 data streams for web, iOS, and Android platforms.

## Overview

Data streams are platform-specific tracking configurations that collect and send data to your GA4 property. Each data stream receives a unique Measurement ID used in implementation.

## Data Stream Types

### Web Data Stream
- **Platform**: Websites
- **Measurement ID Format**: G-XXXXXXXXXX
- **Installation Methods**: gtag.js, GTM, CMS plugins
- **Enhanced Measurement**: Available

### iOS Data Stream
- **Platform**: Apple iOS applications
- **Measurement ID Format**: G-XXXXXXXXXX
- **Installation Methods**: Firebase SDK
- **Additional Setup**: Firebase project integration

### Android Data Stream
- **Platform**: Android applications
- **Measurement ID Format**: G-XXXXXXXXXX
- **Installation Methods**: Firebase SDK
- **Additional Setup**: Firebase project integration

## Creating a Web Data Stream

### Step-by-Step Process

**Step 1: Navigate to Data Streams**

1. GA4 Property → Admin
2. Under "Property" column → Data Streams
3. Click "Add Stream"
4. Select "Web"

**Step 2: Configure Stream Details**

**Website URL**:
- Enter primary domain: `example.com`
- Do not include `https://` or `www`
- Example: `example.com` not `https://www.example.com`

**Stream Name**:
- Descriptive identifier for internal use
- Example: "Main Website" or "E-commerce Site"
- Shows in Data Streams list

**Step 3: Enhanced Measurement**

Toggle Enhanced Measurement:
- **Recommended**: ON (enabled)
- Automatically tracks common interactions
- Can customize which events to collect

**Enhanced Measurement Events**:
- Page views (cannot disable)
- Scrolls (90% depth)
- Outbound clicks
- Site search
- Video engagement (YouTube)
- File downloads
- Form interactions

**Step 4: Create Stream**

Click "Create stream" button

**Result**:
- Data stream created
- Unique Measurement ID generated (G-XXXXXXXXXX)
- Installation instructions available

### Web Data Stream Settings

After creation, access stream settings:

**Navigate**: Admin → Data Streams → Click your web stream

**Available Settings**:

#### 1. Stream Details
- Stream name (editable)
- Stream ID (read-only)
- Measurement ID (read-only, copy for installation)
- Website URL (editable)
- Enhanced Measurement toggle

#### 2. Enhanced Measurement Configuration

Click gear icon to customize:

**Page views**:
- Always collected (cannot disable)
- Triggers on: Page load, history changes
- Parameters: page_location, page_referrer, page_title

**Scrolls**:
- Toggle: ON/OFF
- Trigger: 90% vertical scroll depth (first time only)
- Event name: `scroll`

**Outbound clicks**:
- Toggle: ON/OFF
- Trigger: Click to different domain
- Event name: `click`
- Parameters: link_url, link_domain, outbound=true

**Site search**:
- Toggle: ON/OFF
- Auto-detects common query parameters (q, s, search, query)
- Event name: `view_search_results`
- Parameters: search_term

**Video engagement**:
- Toggle: ON/OFF
- Platform: YouTube embedded videos only
- Events: `video_start`, `video_progress`, `video_complete`
- Parameters: video_title, video_url, video_duration, video_percent

**File downloads**:
- Toggle: ON/OFF
- Auto-detects: .pdf, .xlsx, .docx, .txt, .csv, .zip, etc.
- Event name: `file_download`
- Parameters: file_name, file_extension, link_url

**Form interactions**:
- Toggle: ON/OFF
- Events: `form_start` (first interaction), `form_submit`
- Parameters: form_id, form_name, form_destination

#### 3. Tagging Instructions

**View tag instructions** button provides:
- Installation code snippets
- GTM setup guidance
- Platform-specific instructions

#### 4. Configure Tag Settings

Advanced gtag.js configuration options

#### 5. More Tagging Settings

**Cross-domain Measurement**:
- Configure domains for cross-domain tracking
- List all domains to track as single session
- Format: `example.com,shop.example.com`

**Ignore Internal Traffic**:
- Define IP ranges for internal traffic
- Create rules to filter office/test traffic
- Traffic tagged as "internal" in reports

**List Unwanted Referrals**:
- Exclude payment processors, login pages
- Prevents session breaks from expected referrals
- Example: `paypal.com,stripe.com`

#### 6. Measurement Protocol API Secrets

Generate API secrets for:
- Server-side event tracking
- Measurement Protocol implementations
- Secure server-to-server communication

**Create API Secret**:
1. Click "Create"
2. Enter secret nickname
3. Copy secret value (shown once only)
4. Store securely

## Creating an iOS Data Stream

### Prerequisites

**Required**:
- Apple Developer account
- iOS app published or in development
- Firebase project (auto-created if needed)

### Setup Process

**Step 1: Add Stream**

1. Admin → Data Streams
2. Click "Add Stream"
3. Select "iOS app"

**Step 2: Configure App Details**

**Bundle ID**:
- Format: `com.company.appname`
- Must match Xcode project bundle identifier
- Example: `com.acme.myapp`

**App Store ID** (Optional):
- Found in App Store Connect
- Format: Numeric ID
- Example: `1234567890`

**App Name**:
- Descriptive name for internal use
- Example: "Acme Mobile App (iOS)"

**Step 3: Register App**

Click "Register app"

**Result**:
- Firebase project created (if didn't exist)
- Data stream created
- Measurement ID assigned

### iOS Firebase Configuration

**Step 4: Download Config File**

1. Download `GoogleService-Info.plist`
2. Add to Xcode project root
3. Ensure file included in app target

**Step 5: Add Firebase SDK**

**Using CocoaPods**:

```ruby
# Podfile
pod 'Firebase/Analytics'
```

**Using Swift Package Manager**:

Add Firebase package:
```
https://github.com/firebase/firebase-ios-sdk
```

**Step 6: Initialize Firebase**

In `AppDelegate.swift`:

```swift
import Firebase

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        return true
    }
}
```

**Step 7: Verify Installation**

Run app and check:
- Xcode console for Firebase initialization
- GA4 DebugView (enable debug mode in Xcode scheme)
- Realtime reports in GA4

## Creating an Android Data Stream

### Prerequisites

**Required**:
- Android Studio
- Android app package name
- Firebase project (auto-created if needed)

### Setup Process

**Step 1: Add Stream**

1. Admin → Data Streams
2. Click "Add Stream"
3. Select "Android app"

**Step 2: Configure App Details**

**Package Name**:
- Format: `com.company.appname`
- Must match AndroidManifest.xml package
- Example: `com.acme.myapp`

**App Name**:
- Descriptive name for internal use
- Example: "Acme Mobile App (Android)"

**Step 3: Register App**

Click "Register app"

**Result**:
- Firebase project created (if didn't exist)
- Data stream created
- Measurement ID assigned

### Android Firebase Configuration

**Step 4: Download Config File**

1. Download `google-services.json`
2. Place in `app/` directory
3. Ensure file in version control

**Step 5: Add Firebase SDK**

**Project-level build.gradle**:

```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

**App-level build.gradle**:

```gradle
plugins {
    id 'com.android.application'
    id 'com.google.gms.google-services'
}

dependencies {
    implementation platform('com.google.firebase:firebase-bom:32.0.0')
    implementation 'com.google.firebase:firebase-analytics'
}
```

**Step 6: Initialize Firebase**

Firebase initializes automatically when app starts (no code needed)

**Step 7: Verify Installation**

Run app and check:
- Logcat for Firebase initialization
- GA4 DebugView (debug mode enabled via ADB)
- Realtime reports in GA4

## Data Stream Management

### Viewing All Data Streams

**Navigate**: Admin → Data Streams

**List Shows**:
- Stream name
- Platform type (Web, iOS, Android)
- Stream ID
- Status (Active/Inactive)

### Editing Data Stream

Click stream name to access settings:
- Modify stream name
- Update website URL (web only)
- Configure Enhanced Measurement (web only)
- Manage cross-domain tracking
- Create API secrets
- View tagging instructions

### Deleting Data Stream

**Warning**: Cannot be undone; historical data retained but no new data collected

**Steps**:
1. Click stream name
2. Top-right: More (three dots) → Remove this stream
3. Confirm deletion

**Use Cases for Deletion**:
- Decommissioned website/app
- Test stream no longer needed
- Consolidating tracking

## Multiple Data Streams Strategy

### When to Use Multiple Streams

**Same Property, Multiple Streams**:
- Main website + mobile site
- Main website + blog subdomain
- iOS app + Android app
- Different platforms for same business

**Benefits**:
- Combined reporting
- Shared custom definitions
- Unified conversion tracking
- Cross-platform user journeys

### Stream Naming Best Practices

Use clear, descriptive names:

**Good Examples**:
- "Main Website (example.com)"
- "iOS App (Production)"
- "Android App (Production)"
- "Mobile Site (m.example.com)"

**Bad Examples**:
- "Website 1"
- "Stream"
- "Test"

## Measurement ID Reference

### Format & Location

**Format**: G-XXXXXXXXXX
- G- prefix (identifies GA4)
- 10 alphanumeric characters
- Case-sensitive

**Where to Find**:
1. Admin → Data Streams
2. Click stream name
3. Top-right: Measurement ID displayed
4. Click copy icon to copy

### Using Measurement IDs

**gtag.js Installation**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**GTM Configuration**:
- Tag Type: Google Tag
- Tag ID: G-XXXXXXXXXX

**Measurement Protocol**:
- Query parameter: `measurement_id=G-XXXXXXXXXX`

## Common Data Stream Issues

### Issue: Wrong Platform Type Selected

**Problem**: Created web stream but need app stream (or vice versa)

**Solution**:
- Cannot change platform type
- Delete stream and create correct type
- Historical data from deleted stream retained

### Issue: Cannot Find Measurement ID

**Solution**:
1. Admin → Data Streams
2. Click stream name
3. Top section shows Measurement ID
4. Use copy icon

### Issue: Enhanced Measurement Not Working

**Checklist**:
- Is Enhanced Measurement toggle ON?
- Which specific event not working?
- Check event-specific toggle
- For file downloads: is file extension in default list?
- For site search: are query parameters standard (q, s, search)?
- For video: is video embedded YouTube with JS API enabled?

### Issue: Multiple Measurement IDs

**Scenario**: Have multiple Measurement IDs, unsure which to use

**Solution**:
- Check Data Streams list
- Match stream name to your platform
- Use correct ID for correct platform
- Don't mix IDs (don't use web ID for app)

## Advanced Configuration

### Debug Mode for App Streams

**iOS Debug Mode**:
- Xcode scheme argument: `-FIRDebugEnabled`
- Events visible in DebugView

**Android Debug Mode**:
```bash
adb shell setprop debug.firebase.analytics.app com.example.app
```

### Stream ID vs Measurement ID

**Stream ID**:
- Numeric identifier
- Format: 1234567890
- Used in APIs
- Internal reference

**Measurement ID**:
- G-XXXXXXXXXX format
- Used in tracking code
- Public-facing identifier
- Implementation key

## Next Steps

After configuring data streams:

1. **Install Tracking Code** (see installation-methods.md)
2. **Verify Installation** (see verification-checklist.md)
3. **Configure Internal Traffic Filters**
4. **Set Up Cross-Domain Tracking** (if needed)
5. **Create Custom Events**

## Additional Resources

- Official Google: Web Stream Setup
- Official Google: iOS Stream Setup
- Official Google: Android Stream Setup
- Official Google: Enhanced Measurement Events
- Firebase Documentation: iOS SDK
- Firebase Documentation: Android SDK
