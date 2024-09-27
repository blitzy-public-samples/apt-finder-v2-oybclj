from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from api.models.subscription import Subscription
from api.serializers.subscription import SubscriptionSerializer
from services.paypal import PayPalService

User = get_user_model()

class SubscriptionTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword123'
        )
        self.subscription = Subscription.objects.create(
            user=self.user,
            status='active',
            paypal_subscription_id='SUB12345'
        )

    def test_create_subscription(self):
        url = reverse('create_subscription')
        data = {
            'plan': 'monthly',
            'payment_method': 'paypal'
        }

        with patch.object(PayPalService, 'create_subscription', return_value='SUB67890'):
            self.client.force_authenticate(user=self.user)
            response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], 'active')
        self.assertEqual(response.data['paypal_subscription_id'], 'SUB67890')
        self.assertTrue(Subscription.objects.filter(user=self.user, paypal_subscription_id='SUB67890').exists())

    def test_get_user_subscriptions(self):
        url = reverse('get_user_subscriptions')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['paypal_subscription_id'], 'SUB12345')

    def test_update_subscription(self):
        url = reverse('update_subscription', kwargs={'subscription_id': self.subscription.id})
        data = {
            'status': 'paused'
        }

        with patch.object(PayPalService, 'update_subscription', return_value=True):
            self.client.force_authenticate(user=self.user)
            response = self.client.put(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'paused')
        self.subscription.refresh_from_db()
        self.assertEqual(self.subscription.status, 'paused')

    def test_cancel_subscription(self):
        url = reverse('cancel_subscription', kwargs={'subscription_id': self.subscription.id})

        with patch.object(PayPalService, 'cancel_subscription', return_value=True):
            self.client.force_authenticate(user=self.user)
            response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Subscription cancelled successfully')
        self.subscription.refresh_from_db()
        self.assertEqual(self.subscription.status, 'cancelled')

    def test_handle_paypal_webhook(self):
        url = reverse('handle_paypal_webhook')
        webhook_data = {
            'event_type': 'BILLING.SUBSCRIPTION.UPDATED',
            'resource': {
                'id': 'SUB12345',
                'status': 'SUSPENDED'
            }
        }

        with patch.object(PayPalService, 'verify_webhook_signature', return_value=True):
            response = self.client.post(url, webhook_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Webhook processed successfully')
        self.subscription.refresh_from_db()
        self.assertEqual(self.subscription.status, 'suspended')

# Human tasks:
# 1. Implement additional edge case tests for subscription-related functions
# 2. Set up a mock PayPal environment for more comprehensive integration testing