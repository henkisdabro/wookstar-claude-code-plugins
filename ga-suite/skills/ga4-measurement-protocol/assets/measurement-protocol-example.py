"""
GA4 Measurement Protocol - Complete Python Implementation Example
Demonstrates server-side event tracking with validation, error handling, and batching
"""

import requests
import json
import uuid
import time
from typing import Dict, List, Optional
from datetime import datetime

class GA4MeasurementProtocol:
    """GA4 Measurement Protocol client with validation and error handling"""

    def __init__(self, measurement_id: str, api_secret: str, debug: bool = False):
        """
        Initialize GA4 Measurement Protocol client

        Args:
            measurement_id: GA4 Measurement ID (G-XXXXXXXXXX)
            api_secret: API secret from GA4 Data Streams
            debug: Use debug endpoint for validation
        """
        self.measurement_id = measurement_id
        self.api_secret = api_secret
        self.debug = debug

        self.endpoint = self._get_endpoint()

    def _get_endpoint(self) -> str:
        """Get appropriate endpoint (production or debug)"""
        base = "debug/mp" if self.debug else "mp"
        return f"https://www.google-analytics.com/{base}/collect?measurement_id={self.measurement_id}&api_secret={self.api_secret}"

    def send_event(
        self,
        client_id: str,
        event_name: str,
        event_params: Optional[Dict] = None,
        user_id: Optional[str] = None,
        user_properties: Optional[Dict] = None,
        timestamp_micros: Optional[int] = None,
        consent: Optional[Dict] = None
    ) -> bool:
        """
        Send single event to GA4

        Args:
            client_id: Unique client identifier (UUID)
            event_name: Event name (lowercase, underscores, ≤40 chars)
            event_params: Event parameters dictionary
            user_id: Optional user ID for cross-device tracking
            user_properties: Optional user properties
            timestamp_micros: Optional event timestamp in microseconds
            consent: Optional consent status

        Returns:
            bool: True if successful, False otherwise
        """
        payload = self._build_payload(
            client_id=client_id,
            events=[{
                "name": event_name,
                "params": event_params or {}
            }],
            user_id=user_id,
            user_properties=user_properties,
            timestamp_micros=timestamp_micros,
            consent=consent
        )

        return self._send_request(payload)

    def send_batch(
        self,
        client_id: str,
        events: List[Dict],
        user_id: Optional[str] = None,
        user_properties: Optional[Dict] = None,
        consent: Optional[Dict] = None
    ) -> bool:
        """
        Send batch of events (max 25)

        Args:
            client_id: Unique client identifier
            events: List of event dictionaries with 'name' and 'params'
            user_id: Optional user ID
            user_properties: Optional user properties
            consent: Optional consent status

        Returns:
            bool: True if successful, False otherwise
        """
        if len(events) > 25:
            raise ValueError("Maximum 25 events per batch")

        payload = self._build_payload(
            client_id=client_id,
            events=events,
            user_id=user_id,
            user_properties=user_properties,
            consent=consent
        )

        return self._send_request(payload)

    def _build_payload(
        self,
        client_id: str,
        events: List[Dict],
        user_id: Optional[str] = None,
        user_properties: Optional[Dict] = None,
        timestamp_micros: Optional[int] = None,
        consent: Optional[Dict] = None
    ) -> Dict:
        """Build request payload"""
        payload = {
            "client_id": client_id,
            "events": events
        }

        if user_id:
            payload["user_id"] = user_id

        if user_properties:
            # Format user properties
            formatted_props = {
                key: {"value": value}
                for key, value in user_properties.items()
            }
            payload["user_properties"] = formatted_props

        if timestamp_micros:
            payload["timestamp_micros"] = str(timestamp_micros)

        if consent:
            payload["consent"] = consent

        return payload

    def _send_request(self, payload: Dict, max_retries: int = 3) -> bool:
        """
        Send request with retry logic

        Args:
            payload: Request payload
            max_retries: Maximum retry attempts

        Returns:
            bool: True if successful
        """
        for attempt in range(max_retries):
            try:
                response = requests.post(
                    self.endpoint,
                    headers={"Content-Type": "application/json"},
                    data=json.dumps(payload),
                    timeout=10
                )

                if response.status_code == 204:
                    return True

                if response.status_code == 200 and self.debug:
                    # Debug endpoint returns validation messages
                    validation = response.json()
                    if not validation.get("validationMessages"):
                        print("✓ Validation passed")
                        return True
                    else:
                        print("✗ Validation errors:")
                        for msg in validation["validationMessages"]:
                            print(f"  - {msg['fieldPath']}: {msg['description']}")
                        return False

                if response.status_code == 429:
                    # Rate limited - exponential backoff
                    wait_time = (2 ** attempt) + (time.time() % 1)
                    print(f"Rate limited. Waiting {wait_time:.2f}s...")
                    time.sleep(wait_time)
                    continue

                print(f"Error: HTTP {response.status_code}")
                return False

            except requests.RequestException as e:
                print(f"Request failed: {e}")
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)

        return False


# ============================================================================
# USAGE EXAMPLES
# ============================================================================

def example_page_view():
    """Example: Track page view"""
    ga = GA4MeasurementProtocol(
        measurement_id="G-XXXXXXXXXX",
        api_secret="your_api_secret",
        debug=True  # Use debug endpoint for testing
    )

    success = ga.send_event(
        client_id=str(uuid.uuid4()),
        event_name="page_view",
        event_params={
            "page_location": "https://example.com/products",
            "page_title": "Products Page",
            "page_referrer": "https://google.com"
        }
    )

    print(f"Page view sent: {success}")


def example_purchase():
    """Example: Track purchase"""
    ga = GA4MeasurementProtocol(
        measurement_id="G-XXXXXXXXXX",
        api_secret="your_api_secret"
    )

    success = ga.send_event(
        client_id="client_12345",
        event_name="purchase",
        event_params={
            "transaction_id": f"T_{int(time.time())}",
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
    )

    print(f"Purchase sent: {success}")


def example_user_signup():
    """Example: Track user signup with user properties"""
    ga = GA4MeasurementProtocol(
        measurement_id="G-XXXXXXXXXX",
        api_secret="your_api_secret"
    )

    success = ga.send_event(
        client_id=str(uuid.uuid4()),
        user_id="user_456",
        event_name="sign_up",
        event_params={
            "method": "email"
        },
        user_properties={
            "user_tier": "free",
            "signup_date": datetime.now().strftime("%Y-%m-%d")
        }
    )

    print(f"Sign up sent: {success}")


def example_batch_events():
    """Example: Send multiple events in batch"""
    ga = GA4MeasurementProtocol(
        measurement_id="G-XXXXXXXXXX",
        api_secret="your_api_secret"
    )

    events = [
        {
            "name": "view_item",
            "params": {
                "currency": "USD",
                "value": 29.99,
                "items": [{
                    "item_id": "SKU_123",
                    "item_name": "Product",
                    "price": 29.99
                }]
            }
        },
        {
            "name": "add_to_cart",
            "params": {
                "currency": "USD",
                "value": 29.99,
                "items": [{
                    "item_id": "SKU_123",
                    "item_name": "Product",
                    "price": 29.99,
                    "quantity": 1
                }]
            }
        },
        {
            "name": "begin_checkout",
            "params": {
                "currency": "USD",
                "value": 34.99,
                "items": [{
                    "item_id": "SKU_123",
                    "item_name": "Product",
                    "price": 29.99,
                    "quantity": 1
                }]
            }
        }
    ]

    success = ga.send_batch(
        client_id="client_789",
        events=events
    )

    print(f"Batch sent: {success}")


def example_with_consent():
    """Example: Send event with consent parameters"""
    ga = GA4MeasurementProtocol(
        measurement_id="G-XXXXXXXXXX",
        api_secret="your_api_secret"
    )

    success = ga.send_event(
        client_id=str(uuid.uuid4()),
        event_name="page_view",
        event_params={
            "page_location": "https://example.com"
        },
        consent={
            "ad_storage": "denied",
            "analytics_storage": "granted",
            "ad_user_data": "denied",
            "ad_personalization": "denied"
        }
    )

    print(f"Event with consent sent: {success}")


if __name__ == "__main__":
    # Run examples
    print("=== GA4 Measurement Protocol Examples ===\n")

    print("1. Page View:")
    example_page_view()

    print("\n2. Purchase:")
    example_purchase()

    print("\n3. User Signup:")
    example_user_signup()

    print("\n4. Batch Events:")
    example_batch_events()

    print("\n5. With Consent:")
    example_with_consent()
