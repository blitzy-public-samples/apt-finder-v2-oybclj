from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models.filter import Filter
from api.serializers.filter import FilterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class FilterAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.filter_data = {
            'name': 'Test Filter',
            'min_price': 1000,
            'max_price': 2000,
            'min_bedrooms': 2,
            'max_bedrooms': 3,
            'min_bathrooms': 1,
            'max_bathrooms': 2,
            'zip_codes': ['12345', '67890']
        }
        self.filter = Filter.objects.create(user=self.user, **self.filter_data)
        
        self.FILTER_LIST_URL = reverse('filter-list')
        self.FILTER_DETAIL_URL = lambda filter_id: reverse('filter-detail', kwargs={'filter_id': filter_id})

    def test_list_filters(self):
        response = self.client.get(self.FILTER_LIST_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        filters = Filter.objects.filter(user=self.user)
        serializer = FilterSerializer(filters, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_create_filter(self):
        new_filter_data = {
            'name': 'New Test Filter',
            'min_price': 1500,
            'max_price': 2500,
            'min_bedrooms': 1,
            'max_bedrooms': 2,
            'min_bathrooms': 1,
            'max_bathrooms': 1,
            'zip_codes': ['54321', '09876']
        }
        response = self.client.post(self.FILTER_LIST_URL, new_filter_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.assertTrue(Filter.objects.filter(name='New Test Filter').exists())
        new_filter = Filter.objects.get(name='New Test Filter')
        for key, value in new_filter_data.items():
            self.assertEqual(getattr(new_filter, key), value)

    def test_retrieve_filter(self):
        response = self.client.get(self.FILTER_DETAIL_URL(self.filter.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        serializer = FilterSerializer(self.filter)
        self.assertEqual(response.data, serializer.data)

    def test_update_filter(self):
        updated_data = {
            'name': 'Updated Test Filter',
            'min_price': 2000,
            'max_price': 3000,
        }
        response = self.client.patch(self.FILTER_DETAIL_URL(self.filter.id), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.filter.refresh_from_db()
        for key, value in updated_data.items():
            self.assertEqual(getattr(self.filter, key), value)

    def test_delete_filter(self):
        response = self.client.delete(self.FILTER_DETAIL_URL(self.filter.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertFalse(Filter.objects.filter(id=self.filter.id).exists())

    def test_unauthenticated_access(self):
        self.client.force_authenticate(user=None)
        
        response = self.client.get(self.FILTER_LIST_URL)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response = self.client.post(self.FILTER_LIST_URL, self.filter_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response = self.client.get(self.FILTER_DETAIL_URL(self.filter.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response = self.client.patch(self.FILTER_DETAIL_URL(self.filter.id), {'name': 'Updated'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response = self.client.delete(self.FILTER_DETAIL_URL(self.filter.id))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# Human tasks:
# - Review and update test cases if additional filter functionality is implemented
# - Consider adding edge case tests for filter creation and updates