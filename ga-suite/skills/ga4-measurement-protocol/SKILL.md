---
name: ga4-measurement-protocol
description: Complete guide to GA4 Measurement Protocol for server-side event tracking including API authentication, request format, validation, and implementation examples. Use when implementing server-side tracking, sending events from backend, working with Measurement Protocol API, integrating CRM with GA4, or tracking offline conversions. Covers API secrets, debug endpoint, Python/Node.js/PHP examples, and rate limits.
---

# GA4 Measurement Protocol

## Overview

The GA4 Measurement Protocol allows server-side event collection, enabling data transmission to GA4 from any HTTP-capable environment including backend servers, mobile apps, kiosks, and IoT devices.

## When to Use This Skill

Invoke this skill when:

- Implementing server-side event tracking
- Sending events from backend/server environments
- Tracking offline conversions or transactions
- Integrating CRM systems with GA4
- Sending events from mobile app backends
- Tracking server-to-server transactions
- Implementing purchase tracking from payment processors
- Tracking subscription renewals or recurring payments
- Sending lead generation events from forms backend
- Implementing custom server-side analytics
- Working with headless CMS or API-first architectures
- Debugging Measurement Protocol requests
- Validating event payloads before production

## Core Capabilities

### API Endpoints

**Production Endpoint:**
```
POST https://www.google-analytics.com/mp/collect
```

**Debug Endpoint (Validation):**
```
POST https://www.google-analytics.com/debug/mp/collect
```

**Key Difference:** Debug endpoint returns validation messages without storing data.

### Authentication Requirements

**Two Credentials Required:**

1. **Measurement ID** (format: `G-XXXXXXXXXX`)
   - Find in: GA4 Admin → Data Streams → Web Stream details

2. **API Secret**
   - Generate in: Data Streams → Measurement Protocol API secrets → Create

**Generating API Secret:**
1. GA4 Admin → Data Streams
2. Click your data stream
3. Scroll to "Measurement Protocol API secrets"
4. Click "Create"
5. Enter nickname (e.g., "Server-side tracking")
6. Click "Create"
7. **Copy secret immediately** (cannot retrieve later)

### Request Structure

**URL Format:**
```
https://www.google-analytics.com/mp/collect?measurement_id={MEASUREMENT_ID}&api_secret={API_SECRET}
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "client_id": "unique_client_identifier",
  "user_id": "optional_user_id",
  "timestamp_micros": "1234567890123456",
  "user_properties": {
    "property_name": {
      "value": "property_value"
    }
  },
  "consent": {
    "ad_storage": "granted",
    "analytics_storage": "granted"
  },
  "events": [
    {
      "name": "event_name",
      "params": {
        "parameter_name": "parameter_value",
        "value": 123.45,
        "currency": "USD"
      }
    }
  ]
}
```

### Required Fields

- **client_id**: Unique identifier for client (UUID recommended)
- **events**: Array of event objects (max 25 events per request)
- **events[].name**: Event name (string, ≤40 characters)

### Optional Fields

- **user_id**: User identifier for cross-device tracking
- **timestamp_micros**: Event timestamp in microseconds (UTC)
- **user_properties**: User-level properties
- **consent**: Consent status (ad_storage, analytics_storage)

### Common Event Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `session_id` | string | Session identifier |
| `engagement_time_msec` | integer | Engagement time in milliseconds |
| `page_location` | string | Full URL |
| `page_title` | string | Page title |
| `value` | number | Monetary value |
| `currency` | string | ISO 4217 currency code (USD, EUR) |
| `transaction_id` | string | Unique transaction ID |
| `items` | array | E-commerce items array |

### Python Implementation

**Using Requests Library:**

```python
import requests
import json
import uuid

MEASUREMENT_ID = "G-XXXXXXXXXX"
API_SECRET = "your_api_secret"
ENDPOINT = f"https://www.google-analytics.com/mp/collect?measurement_id={MEASUREMENT_ID}&api_secret={API_SECRET}"

def send_event(event_name, params=None):
    payload = {
        "client_id": str(uuid.uuid4()),
        "events": [{
            "name": event_name,
            "params": params or {}
        }]
    }

    response = requests.post(
        ENDPOINT,
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload)
    )

    return response.status_code == 204

# Send page view
send_event("page_view", {
    "page_location": "https://example.com/page",
    "page_title": "Example Page"
})

# Send purchase
send_event("purchase", {
    "transaction_id": "T_12345",
    "value": 99.99,
    "currency": "USD",
    "items": [{
        "item_id": "SKU_123",
        "item_name": "Product Name",
        "price": 99.99,
        "quantity": 1
    }]
})
```

**Using ga4mp Library:**

```python
# Install: pip install ga4mp
from ga4mp import GtagMP

ga = GtagMP(
    measurement_id="G-XXXXXXXXXX",
    api_secret="your_api_secret",
    client_id="unique_client_id"
)

# Send event
ga.send_event(
    event_name="purchase",
    event_parameters={
        "transaction_id": "T_12345",
        "value": 99.99,
        "currency": "USD",
        "items": [{
            "item_id": "SKU_123",
            "item_name": "Product Name",
            "price": 99.99,
            "quantity": 1
        }]
    }
)
```

### Node.js Implementation

```javascript
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const MEASUREMENT_ID = 'G-XXXXXXXXXX';
const API_SECRET = 'your_api_secret';
const ENDPOINT = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

async function sendEvent(eventName, params = {}) {
  const payload = {
    client_id: uuidv4(),
    events: [{
      name: eventName,
      params: params
    }]
  };

  try {
    const response = await axios.post(ENDPOINT, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error sending event:', error);
    return false;
  }
}

// Send purchase event
sendEvent('purchase', {
  transaction_id: 'T_12345',
  value: 99.99,
  currency: 'USD',
  items: [{
    item_id: 'SKU_123',
    item_name: 'Product',
    price: 99.99,
    quantity: 1
  }]
});
```

### PHP Implementation

```php
<?php
// Using php-GA4-Measurement-Protocol library
// Install: composer require br33f/php-ga4-measurement-protocol

use Br33f\Ga4\MeasurementProtocol\Dto\Event\PurchaseEvent;
use Br33f\Ga4\MeasurementProtocol\Dto\Request\MeasurementRequest;
use Br33f\Ga4\MeasurementProtocol\Service;

$measurementId = 'G-XXXXXXXXXX';
$apiSecret = 'your_api_secret';

$service = new Service($apiSecret, $measurementId);

$event = new PurchaseEvent();
$event->setTransactionId('T_12345')
      ->setValue(99.99)
      ->setCurrency('USD');

$request = new MeasurementRequest();
$request->setClientId('unique_client_id')
        ->addEvent($event);

$service->send($request);
?>
```

### Validation with Debug Endpoint

**Send to Debug Endpoint:**

```bash
curl -X POST "https://www.google-analytics.com/debug/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=YOUR_SECRET" \
-H "Content-Type: application/json" \
-d '{
  "client_id": "test_client",
  "events": [{
    "name": "test_event",
    "params": {
      "test_param": "test_value"
    }
  }]
}'
```

**Response Format:**

```json
{
  "validationMessages": [
    {
      "fieldPath": "events[0].name",
      "description": "Event name must be 40 characters or fewer",
      "validationCode": "NAME_INVALID"
    }
  ]
}
```

**Empty Response = Valid:**
- No validationMessages = payload valid
- Status 200 = request processed

### Validation Codes

| Code | Description | Fix |
|------|-------------|-----|
| `NAME_INVALID` | Invalid event/parameter name | Use lowercase, underscores, ≤40 chars |
| `NAME_RESERVED` | Reserved name used | Check GA4 reserved names list |
| `VALUE_INVALID` | Invalid parameter value | Check data type, format |
| `VALUE_REQUIRED` | Required value missing | Add required parameter |
| `VALUE_OUT_OF_BOUNDS` | Value exceeds limits | Check numeric ranges |
| `EXCEEDED_MAX_ENTITIES` | Too many events | Max 25 events per request |

### Best Practices

1. **Always Validate First:**
   - Use debug endpoint before production
   - Test with sample data
   - Verify response is empty (valid)

2. **Use Consistent client_id:**
   - Same user = same client_id across sessions
   - Store in database for logged-in users
   - Use UUID format for anonymity

3. **Include session_id:**
   - Maintain session continuity
   - Generate unique session ID
   - Keep consistent within session

4. **Batch Events:**
   - Send up to 25 events per request
   - More efficient than individual requests
   - Reduces API calls

5. **Handle Errors Gracefully:**
   - Implement retry logic with exponential backoff
   - Log failed requests
   - Queue events for retry

6. **Set Proper Timestamps:**
   - Use `timestamp_micros` for historical data
   - Convert to microseconds: `timestamp_ms * 1000`
   - Max 3 days in past, 72 hours in future

7. **Respect Consent:**
   - Set consent parameters appropriately
   - Match frontend consent status
   - Required for GDPR compliance

## Integration with Other Skills

- **ga4-setup** - Initial GA4 property and data stream setup
- **ga4-debugview** - Testing Measurement Protocol events in DebugView
- **ga4-recommended-events** - Sending recommended event structures
- **ga4-custom-events** - Server-side custom event implementation
- **ga4-user-tracking** - Implementing User ID server-side
- **ga4-privacy-compliance** - Setting consent parameters correctly
- **ga4-bigquery** - Analyzing server-side events in BigQuery

## References

- **references/measurement-protocol-complete.md** - Full API reference and examples
- **references/authentication-setup.md** - API secrets and authentication guide
- **references/event-validation.md** - Validation patterns and troubleshooting
- **references/implementation-examples.md** - Real-world implementation patterns (Python, Node.js, PHP)
- **references/rate-limits-best-practices.md** - Rate limits, batching, and optimization

## Quick Reference

**Generate API Secret:**
Admin → Data Streams → Measurement Protocol API secrets → Create

**Endpoint:**
- Production: `/mp/collect`
- Debug: `/debug/mp/collect`

**Required Fields:**
- client_id (UUID recommended)
- events array
- event name

**Max Limits:**
- 25 events per request
- 40 characters per event name
- 25 event parameters per event
- 25 user properties per request

**Validation:**
- Send to debug endpoint
- Empty response = valid
- Check validationMessages array
