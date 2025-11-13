# GA4 Measurement Protocol Complete API Guide

## API Overview

**Base URL:** `https://www.google-analytics.com/mp/collect`
**Debug URL:** `https://www.google-analytics.com/debug/mp/collect`

**Method:** POST
**Content-Type:** application/json

## Authentication

### API Secret Creation

1. **GA4 Admin** → **Data Streams**
2. Select your data stream
3. **Measurement Protocol API secrets** section
4. Click **Create**
5. Name: "Server tracking" (or descriptive name)
6. Click **Create**
7. **Copy secret value** (shown only once!)

**Storage:**
- Store secret securely (environment variables, secrets manager)
- Never commit to version control
- Regenerate if exposed

### Measurement ID

**Format:** `G-XXXXXXXXXX`

**Find in:**
- GA4 Admin → Data Streams → Web Stream
- "Measurement ID" field at top

## Request Format

### Complete URL

```
POST https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=YOUR_API_SECRET
```

**Query Parameters:**
- `measurement_id`: GA4 Measurement ID
- `api_secret`: API secret from GA4

### Request Body Structure

```json
{
  "client_id": "CLIENT_ID_HERE",
  "user_id": "USER_123",
  "timestamp_micros": "1234567890123456",
  "user_properties": {
    "user_tier": {
      "value": "premium"
    },
    "lifetime_value": {
      "value": 1250.50
    }
  },
  "consent": {
    "ad_storage": "granted",
    "analytics_storage": "granted",
    "ad_user_data": "granted",
    "ad_personalization": "granted"
  },
  "events": [
    {
      "name": "purchase",
      "params": {
        "transaction_id": "T_12345",
        "value": 99.99,
        "currency": "USD",
        "tax": 8.00,
        "shipping": 5.00,
        "items": [
          {
            "item_id": "SKU_123",
            "item_name": "Product Name",
            "price": 99.99,
            "quantity": 1
          }
        ]
      }
    }
  ]
}
```

## Field Specifications

### client_id (Required)

**Type:** String
**Format:** UUID recommended
**Purpose:** Unique client identifier

**Recommendations:**
- Use UUID v4 format
- Persist for same user across sessions
- Store in database for logged-in users
- Never use PII (email, name, etc.)

**Example:**
```python
import uuid
client_id = str(uuid.uuid4())
```

### user_id (Optional)

**Type:** String
**Purpose:** Cross-device tracking

**When to Use:**
- User is logged in
- Want to track across devices
- Have user identifier

**Important:**
- Don't use email or PII directly
- Hash or use internal ID
- Must also send client_id

### timestamp_micros (Optional)

**Type:** String (integer as string)
**Format:** Microseconds since Unix epoch

**Purpose:**
- Send historical events
- Backfill data
- Correct timing for delayed events

**Limits:**
- Max 3 days in past
- Max 72 hours in future

**Example:**
```python
import time
timestamp_micros = str(int(time.time() * 1_000_000))
```

### user_properties (Optional)

**Type:** Object
**Purpose:** Set user-level properties

**Format:**
```json
{
  "property_name": {
    "value": "property_value"
  }
}
```

**Limits:**
- Max 25 user properties per request
- Property name ≤24 characters
- Value ≤36 characters

**Example:**
```json
{
  "user_tier": {"value": "premium"},
  "signup_date": {"value": "2024-01-15"},
  "total_purchases": {"value": 12}
}
```

### consent (Optional)

**Type:** Object
**Purpose:** Set consent status

**Fields:**
- `ad_storage`: "granted" | "denied"
- `analytics_storage`: "granted" | "denied"
- `ad_user_data`: "granted" | "denied"
- `ad_personalization`: "granted" | "denied"

**Example:**
```json
{
  "ad_storage": "denied",
  "analytics_storage": "granted"
}
```

### events (Required)

**Type:** Array
**Limits:** Max 25 events per request

**Event Structure:**
```json
{
  "name": "event_name",
  "params": {
    "parameter": "value"
  }
}
```

**Event Name Rules:**
- Lowercase letters, numbers, underscores
- Max 40 characters
- Cannot start with number
- Avoid reserved names

**Event Parameters:**
- Max 25 parameters per event
- Parameter name ≤40 characters
- String value ≤100 characters

## Common Event Examples

### Page View

```json
{
  "client_id": "client_123",
  "events": [{
    "name": "page_view",
    "params": {
      "page_location": "https://example.com/products",
      "page_title": "Products Page",
      "page_referrer": "https://google.com"
    }
  }]
}
```

### Purchase

```json
{
  "client_id": "client_123",
  "events": [{
    "name": "purchase",
    "params": {
      "transaction_id": "T_12345",
      "value": 99.99,
      "currency": "USD",
      "tax": 8.00,
      "shipping": 5.00,
      "items": [{
        "item_id": "SKU_123",
        "item_name": "Blue T-Shirt",
        "price": 99.99,
        "quantity": 1,
        "item_category": "Apparel"
      }]
    }
  }]
}
```

### Lead Generation

```json
{
  "client_id": "client_123",
  "events": [{
    "name": "generate_lead",
    "params": {
      "currency": "USD",
      "value": 50.00,
      "form_name": "contact_form",
      "lead_source": "website"
    }
  }]
}
```

### Sign Up

```json
{
  "client_id": "client_123",
  "user_id": "user_456",
  "events": [{
    "name": "sign_up",
    "params": {
      "method": "email"
    }
  }]
}
```

### Custom Event

```json
{
  "client_id": "client_123",
  "events": [{
    "name": "subscription_renewed",
    "params": {
      "subscription_tier": "premium",
      "renewal_amount": 29.99,
      "currency": "USD",
      "subscription_id": "SUB_789"
    }
  }]
}
```

## Debug Endpoint Validation

### Using cURL

```bash
curl -X POST \
  "https://www.google-analytics.com/debug/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "test_123",
    "events": [{
      "name": "purchase",
      "params": {
        "transaction_id": "T_TEST",
        "value": 99.99,
        "currency": "USD"
      }
    }]
  }'
```

### Valid Response

**Status:** 200 OK

**Body (Valid):**
```json
{
  "validationMessages": []
}
```

**Empty array = No validation errors**

### Invalid Response

**Body (Invalid):**
```json
{
  "validationMessages": [
    {
      "fieldPath": "events[0].name",
      "description": "Event name must be 40 characters or fewer.",
      "validationCode": "NAME_INVALID"
    },
    {
      "fieldPath": "events[0].params.value",
      "description": "Event parameter value is invalid.",
      "validationCode": "VALUE_INVALID"
    }
  ]
}
```

## Rate Limits and Quotas

**No Official Published Limits**

**Recommendations:**
- Batch events when possible (max 25/request)
- Implement exponential backoff for retries
- Monitor for rate limit responses
- Don't exceed ~1 request per second per client

**Best Practices:**
- Queue events on server
- Batch send periodically
- Retry failed requests with backoff

## Error Handling

### Python Example

```python
import requests
import time

def send_with_retry(payload, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.post(ENDPOINT, json=payload)

            if response.status_code == 204:
                return True  # Success

            if response.status_code == 429:  # Rate limited
                wait = (2 ** attempt) + random.random()
                time.sleep(wait)
                continue

            # Other error
            print(f"Error: {response.status_code}")
            return False

        except requests.RequestException as e:
            print(f"Request failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)

    return False
```

### Node.js Example

```javascript
async function sendWithRetry(payload, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.post(ENDPOINT, payload);

      if (response.status === 204) {
        return true;  // Success
      }

      if (response.status === 429) {  // Rate limited
        const wait = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, wait));
        continue;
      }

      console.error('Error:', response.status);
      return false;

    } catch (error) {
      console.error('Request failed:', error.message);
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  return false;
}
```

## Testing Checklist

- [ ] API secret generated and stored securely
- [ ] Measurement ID correct format (G-XXXXXXXXXX)
- [ ] client_id generated (UUID format)
- [ ] Events validated using debug endpoint
- [ ] No validation errors in debug response
- [ ] Events appear in GA4 DebugView (with debug_mode=true)
- [ ] Parameters have correct data types
- [ ] No PII in parameters
- [ ] Error handling implemented
- [ ] Retry logic with exponential backoff
- [ ] Events batched when appropriate
- [ ] Consent parameters set correctly

## Common Issues

**Events Not Appearing:**
- Wrong Measurement ID
- Wrong API secret
- Events not validated first
- Network/firewall blocking requests

**Validation Errors:**
- Event name too long (>40 characters)
- Reserved event name used
- Invalid parameter values
- Wrong data types

**Missing Data:**
- client_id not consistent
- timestamp_micros out of range
- Parameters missing or misspelled
