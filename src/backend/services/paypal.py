import requests
import json
from typing import Dict, Any
from apartment_finder.settings import PAYPAL_API_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET

class PayPalService:
    """A service class for interacting with the PayPal API to manage subscriptions."""

    def __init__(self):
        """
        Initializes the PayPalService and obtains an access token.
        """
        self.access_token = None
        self._get_access_token()

    def _get_access_token(self) -> str:
        """
        Obtains an access token from the PayPal API.

        Returns:
            str: The access token
        """
        url = f"{PAYPAL_API_BASE_URL}/v1/oauth2/token"
        payload = "grant_type=client_credentials"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {PAYPAL_CLIENT_ID}:{PAYPAL_CLIENT_SECRET}"
        }

        try:
            response = requests.post(url, data=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            self.access_token = data['access_token']
            return self.access_token
        except requests.RequestException as e:
            # Log the error and raise an exception
            print(f"Error obtaining PayPal access token: {str(e)}")
            raise

    def create_subscription(self, subscription_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Creates a new subscription in PayPal.

        Args:
            subscription_data (Dict[str, Any]): The subscription data to be sent to PayPal

        Returns:
            Dict[str, Any]: The created subscription details
        """
        url = f"{PAYPAL_API_BASE_URL}/v1/billing/subscriptions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}"
        }

        try:
            response = requests.post(url, json=subscription_data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            # Log the error and raise an exception
            print(f"Error creating PayPal subscription: {str(e)}")
            raise

    def get_subscription(self, subscription_id: str) -> Dict[str, Any]:
        """
        Retrieves the details of an existing subscription.

        Args:
            subscription_id (str): The ID of the subscription to retrieve

        Returns:
            Dict[str, Any]: The subscription details
        """
        url = f"{PAYPAL_API_BASE_URL}/v1/billing/subscriptions/{subscription_id}"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}"
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            # Log the error and raise an exception
            print(f"Error retrieving PayPal subscription: {str(e)}")
            raise

    def cancel_subscription(self, subscription_id: str, reason: str) -> bool:
        """
        Cancels an active subscription in PayPal.

        Args:
            subscription_id (str): The ID of the subscription to cancel
            reason (str): The reason for cancellation

        Returns:
            bool: True if cancellation was successful, False otherwise
        """
        url = f"{PAYPAL_API_BASE_URL}/v1/billing/subscriptions/{subscription_id}/cancel"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}"
        }
        payload = {"reason": reason}

        try:
            response = requests.post(url, json=payload, headers=headers)
            return response.status_code == 204
        except requests.RequestException as e:
            # Log the error and raise an exception
            print(f"Error cancelling PayPal subscription: {str(e)}")
            raise

    def handle_webhook(self, event_data: Dict[str, Any]) -> bool:
        """
        Processes PayPal webhook events.

        Args:
            event_data (Dict[str, Any]): The webhook event data received from PayPal

        Returns:
            bool: True if the event was processed successfully, False otherwise
        """
        event_type = event_data.get('event_type')

        # Implement event handling logic here
        if event_type == 'BILLING.SUBSCRIPTION.CREATED':
            # Handle subscription creation
            pass
        elif event_type == 'BILLING.SUBSCRIPTION.CANCELLED':
            # Handle subscription cancellation
            pass
        elif event_type == 'BILLING.SUBSCRIPTION.EXPIRED':
            # Handle subscription expiration
            pass
        else:
            # Log unhandled event type
            print(f"Unhandled PayPal webhook event type: {event_type}")
            return False

        return True

# Human tasks:
# TODO: Implement proper error handling and logging for API requests
# TODO: Add unit tests for the PayPalService class
# TODO: Implement webhook signature verification for enhanced security
# TODO: Consider implementing a retry mechanism for failed API requests