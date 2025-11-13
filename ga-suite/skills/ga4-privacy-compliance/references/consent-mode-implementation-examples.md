# Consent Mode v2 Implementation Examples

## Basic gtag.js Implementation

### Complete Setup (EU GDPR Compliant)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Step 1: Set default consent BEFORE any tags load -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}

    // Default consent for EU users (denied)
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'wait_for_update': 500  // Wait 500ms for consent update
    });
  </script>

  <!-- Step 2: Load gtag.js -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

  <!-- Step 3: Configure GA4 -->
  <script>
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Your consent banner library here -->
</head>
<body>
  <!-- Consent banner UI -->
  <div id="consent-banner" style="display:none;">
    <p>We use cookies to improve your experience.</p>
    <button onclick="acceptAllConsent()">Accept All</button>
    <button onclick="acceptAnalyticsOnly()">Analytics Only</button>
    <button onclick="rejectAllConsent()">Reject All</button>
  </div>

  <script>
    // Show banner if no consent stored
    if (!localStorage.getItem('consentStatus')) {
      document.getElementById('consent-banner').style.display = 'block';
    } else {
      // Apply stored consent
      applyStoredConsent();
    }

    function acceptAllConsent() {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
      localStorage.setItem('consentStatus', 'all');
      document.getElementById('consent-banner').style.display = 'none';
    }

    function acceptAnalyticsOnly() {
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'granted'
      });
      localStorage.setItem('consentStatus', 'analytics');
      document.getElementById('consent-banner').style.display = 'none';
    }

    function rejectAllConsent() {
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
      localStorage.setItem('consentStatus', 'none');
      document.getElementById('consent-banner').style.display = 'none';
    }

    function applyStoredConsent() {
      const status = localStorage.getItem('consentStatus');
      if (status === 'all') {
        acceptAllConsent();
      } else if (status === 'analytics') {
        acceptAnalyticsOnly();
      } else {
        rejectAllConsent();
      }
    }
  </script>
</body>
</html>
```

## Regional Consent Settings

### EU vs US Default Consent

```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// EU/EEA: Default denied
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
}, {
  'region': ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO']
});

// US (except California): Default granted
gtag('consent', 'default', {
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'analytics_storage': 'granted'
});

// California (CCPA): Analytics granted, ads denied
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'granted'
}, {
  'region': ['US-CA']
});
```

## Google Tag Manager Implementation

### Method 1: Custom HTML Tags

**Tag 1: Consent Initialization (Fires First)**

```html
<!-- Tag Name: Consent Mode - Initialization -->
<!-- Tag Type: Custom HTML -->
<!-- Firing Trigger: Consent Initialization - All Pages -->
<!-- Advanced Settings → Tag firing priority: 999 -->

<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });
</script>
```

**Tag 2: Consent Update - Accept All**

```html
<!-- Tag Name: Consent Mode - Accept All -->
<!-- Tag Type: Custom HTML -->
<!-- Firing Trigger: Custom Event - consent_granted -->

<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
</script>
```

**Tag 3: Consent Update - Analytics Only**

```html
<!-- Tag Name: Consent Mode - Analytics Only -->
<!-- Tag Type: Custom HTML -->
<!-- Firing Trigger: Custom Event - consent_analytics -->

<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'update', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'granted'
  });
</script>
```

### Method 2: Using CMP Template (Cookiebot Example)

1. **Install Cookiebot Template:**
   - GTM Templates → Template Gallery
   - Search "Cookiebot"
   - Add to workspace

2. **Configure Cookiebot Tag:**
   - Tag Type: Cookiebot CMP (Community Template)
   - Cookiebot ID: Your Cookiebot ID
   - Default consent: All denied
   - Trigger: Consent Initialization - All Pages
   - Priority: 999

3. **Cookiebot auto-handles:**
   - Default consent setting
   - Consent updates on user choice
   - Consent persistence
   - Regional settings

## JavaScript Event Listeners

### Listening to Consent Changes

```javascript
// Monitor consent state changes
window.addEventListener('consent-update', function(event) {
  console.log('Consent updated:', event.detail);

  // Send custom event to analytics
  gtag('event', 'consent_update', {
    'consent_status': event.detail.analytics_storage,
    'timestamp': new Date().toISOString()
  });
});

// Trigger on user action
function updateConsent(status) {
  gtag('consent', 'update', status);

  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent('consent-update', {
    detail: status
  }));
}
```

## CCPA / Global Privacy Control (GPC)

### Detecting and Honoring GPC

```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Check for Global Privacy Control signal
if (navigator.globalPrivacyControl === true) {
  // User has GPC enabled - deny advertising
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'granted'  // Analytics OK
  });
} else {
  // No GPC signal - use standard defaults
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
  });
}
```

### GTM Variable for GPC

**Variable Configuration:**
- Variable Type: Custom JavaScript
- Name: "GPC - Global Privacy Control"

```javascript
function() {
  return navigator.globalPrivacyControl === true ? 'enabled' : 'disabled';
}
```

Use in consent logic to conditionally set consent.

## Consent with Server-Side Tracking

### Measurement Protocol with Consent

```python
import requests
import json

MEASUREMENT_ID = "G-XXXXXXXXXX"
API_SECRET = "your_api_secret"
ENDPOINT = f"https://www.google-analytics.com/mp/collect?measurement_id={MEASUREMENT_ID}&api_secret={API_SECRET}"

def send_with_consent(client_id, event_name, consent_status):
    payload = {
        "client_id": client_id,
        "consent": {
            "ad_storage": consent_status.get('ad_storage', 'denied'),
            "analytics_storage": consent_status.get('analytics_storage', 'denied'),
            "ad_user_data": consent_status.get('ad_user_data', 'denied'),
            "ad_personalization": consent_status.get('ad_personalization', 'denied')
        },
        "events": [{
            "name": event_name,
            "params": {}
        }]
    }

    response = requests.post(ENDPOINT, json=payload)
    return response.status_code == 204

# Example: User has granted analytics only
send_with_consent(
    client_id="client_123",
    event_name="purchase",
    consent_status={
        "ad_storage": "denied",
        "analytics_storage": "granted",
        "ad_user_data": "denied",
        "ad_personalization": "denied"
    }
)
```

## SPA (Single Page Application) Consent

### React Example

```javascript
import { useEffect, useState } from 'react';

function ConsentManager() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Initialize consent on app load
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}

    // Set default
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });

    // Check for stored consent
    const storedConsent = localStorage.getItem('userConsent');
    if (storedConsent) {
      const consent = JSON.parse(storedConsent);
      gtag('consent', 'update', consent);
    } else {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted'
    };

    window.gtag('consent', 'update', consent);
    localStorage.setItem('userConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const consent = {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    };

    window.gtag('consent', 'update', consent);
    localStorage.setItem('userConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="consent-banner">
      <p>We use cookies to improve your experience.</p>
      <button onClick={acceptAll}>Accept</button>
      <button onClick={rejectAll}>Reject</button>
    </div>
  );
}

export default ConsentManager;
```

## Testing Consent Mode

### DebugView Verification

```javascript
// Enable debug mode for testing
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});

// Set consent
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});

// Send test event
gtag('event', 'test_consent', {
  'test_parameter': 'test_value'
});

// Check in DebugView:
// 1. Event appears
// 2. Event details show consent status
// 3. Look for "gcs" parameter (Google Consent State)
```

### Console Verification

```javascript
// Check consent state in console
dataLayer.filter(item => item[0] === 'consent')

// Expected output:
// [
//   ['consent', 'default', {...}],
//   ['consent', 'update', {...}]
// ]
```

### Cookie Inspection

**Before Consent (analytics_storage = denied):**
- Open DevTools → Application → Cookies
- Should NOT see `_ga`, `_ga_*` cookies

**After Consent (analytics_storage = granted):**
- `_ga` cookie present
- `_ga_<container-id>` cookie present

## Advanced: Granular Consent Options

### Custom Consent Categories

```javascript
// Your custom consent preferences
const userPreferences = {
  necessary: true,        // Always on
  analytics: true,        // User accepted
  marketing: false,       // User denied
  personalization: true   // User accepted
};

// Map to Google consent parameters
const consentMapping = {
  ad_storage: userPreferences.marketing ? 'granted' : 'denied',
  ad_user_data: userPreferences.marketing ? 'granted' : 'denied',
  ad_personalization: userPreferences.personalization ? 'granted' : 'denied',
  analytics_storage: userPreferences.analytics ? 'granted' : 'denied'
};

// Update consent
gtag('consent', 'update', consentMapping);
```

## Consent Revocation

### Allowing Users to Change Consent

```javascript
function showConsentSettings() {
  // Show modal/settings page
  document.getElementById('consent-settings-modal').style.display = 'block';
}

function updateConsentPreferences(newPreferences) {
  gtag('consent', 'update', newPreferences);
  localStorage.setItem('userConsent', JSON.stringify(newPreferences));

  // Optional: Reload page to apply changes
  // window.location.reload();
}

// Example: User clicks "Withdraw Consent"
function withdrawConsent() {
  const deniedConsent = {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  };

  updateConsentPreferences(deniedConsent);

  // Delete existing GA cookies
  document.cookie.split(";").forEach(function(c) {
    if (c.trim().startsWith('_ga')) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    }
  });
}
```

## Compliance Checklist

- [ ] Default consent set to "denied" before tags load
- [ ] Consent banner shown before tracking
- [ ] User can accept/reject consent
- [ ] Consent choices persist across sessions
- [ ] Consent can be withdrawn/changed later
- [ ] All 4 v2 parameters included (ad_storage, analytics_storage, ad_user_data, ad_personalization)
- [ ] Regional settings configured if needed
- [ ] GPC honored for CCPA compliance
- [ ] Consent status tested in DebugView
- [ ] Cookie behavior verified (no cookies before consent)
- [ ] Privacy policy updated with consent information
