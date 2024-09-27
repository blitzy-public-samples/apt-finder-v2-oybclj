from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from ..models.listing import ApartmentListing
from ..views.listings import get_listings, get_listing_detail

class ListingsTestCase(TestCase):
    def setUp(self):
        """
        Set up test data before each test method
        """
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        
        # Create sample apartment listings
        self.listing1 = ApartmentListing.objects.create(
            title="Cozy Studio",
            rent=1000,
            bedrooms=0,
            bathrooms=1,
            square_footage=500,
            address="123 Test St",
            zipcode="12345"
        )
        self.listing2 = ApartmentListing.objects.create(
            title="Spacious 2BR",
            rent=1800,
            bedrooms=2,
            bathrooms=2,
            square_footage=1000,
            address="456 Sample Ave",
            zipcode="67890"
        )
        
        # Initialize APIClient
        self.client = APIClient()

    def test_get_listings_authenticated(self):
        """
        Test retrieving listings as an authenticated user
        """
        # Authenticate the client
        self.client.force_authenticate(user=self.user)
        
        # Make a GET request to the listings endpoint
        response = self.client.get(reverse('get_listings'))
        
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert that the correct number of listings is returned
        self.assertEqual(len(response.data), 2)
        
        # Assert that the listing data is correct
        self.assertEqual(response.data[0]['title'], "Cozy Studio")
        self.assertEqual(response.data[1]['title'], "Spacious 2BR")

    def test_get_listings_unauthenticated(self):
        """
        Test retrieving listings as an unauthenticated user
        """
        # Make a GET request to the listings endpoint without authentication
        response = self.client.get(reverse('get_listings'))
        
        # Assert that the response status code is 401 (Unauthorized)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_listings_with_filters(self):
        """
        Test retrieving listings with various filter parameters
        """
        # Authenticate the client
        self.client.force_authenticate(user=self.user)
        
        # Make GET requests with different filter parameters
        response = self.client.get(reverse('get_listings'), {'min_rent': 1500, 'max_rent': 2000})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Spacious 2BR")
        
        response = self.client.get(reverse('get_listings'), {'bedrooms': 2})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Spacious 2BR")
        
        response = self.client.get(reverse('get_listings'), {'zipcode': '12345'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Cozy Studio")

    def test_get_listing_detail_authenticated(self):
        """
        Test retrieving a specific listing detail as an authenticated user
        """
        # Authenticate the client
        self.client.force_authenticate(user=self.user)
        
        # Make a GET request to the listing detail endpoint
        response = self.client.get(reverse('get_listing_detail', kwargs={'pk': self.listing1.pk}))
        
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert that the correct listing data is returned
        self.assertEqual(response.data['title'], "Cozy Studio")
        self.assertEqual(response.data['rent'], 1000)

    def test_get_listing_detail_unauthenticated(self):
        """
        Test retrieving a specific listing detail as an unauthenticated user
        """
        # Make a GET request to the listing detail endpoint without authentication
        response = self.client.get(reverse('get_listing_detail', kwargs={'pk': self.listing1.pk}))
        
        # Assert that the response status code is 401 (Unauthorized)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_nonexistent_listing_detail(self):
        """
        Test retrieving a non-existent listing detail
        """
        # Authenticate the client
        self.client.force_authenticate(user=self.user)
        
        # Make a GET request to the listing detail endpoint with a non-existent ID
        response = self.client.get(reverse('get_listing_detail', kwargs={'pk': 9999}))
        
        # Assert that the response status code is 404 (Not Found)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# Human tasks:
# TODO: Implement tests for pagination in get_listings endpoint once it's added
# TODO: Add tests for error handling of invalid filter parameters in get_listings function
# TODO: Consider adding performance tests for the listings endpoints