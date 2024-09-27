import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from src.backend.api.models.user import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def _create_user(email="test@example.com", password="testpassword123"):
        return User.objects.create_user(email=email, password=password)
    return _create_user

@pytest.mark.django_db
class TestAuthViews:
    def test_user_registration(self, api_client):
        url = reverse('register')
        data = {
            'email': 'newuser@example.com',
            'password': 'securepassword123',
            'password_confirm': 'securepassword123'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert 'token' in response.data
        assert User.objects.filter(email='newuser@example.com').exists()

    def test_user_registration_invalid_data(self, api_client):
        url = reverse('register')
        data = {
            'email': 'invalid_email',
            'password': 'short',
            'password_confirm': 'not_matching'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'email' in response.data
        assert 'password' in response.data

    def test_user_login(self, api_client, create_user):
        user = create_user()
        url = reverse('login')
        data = {
            'email': user.email,
            'password': 'testpassword123'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert 'token' in response.data

    def test_user_login_invalid_credentials(self, api_client, create_user):
        user = create_user()
        url = reverse('login')
        data = {
            'email': user.email,
            'password': 'wrongpassword'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert 'non_field_errors' in response.data

    def test_user_logout(self, api_client, create_user):
        user = create_user()
        api_client.force_authenticate(user=user)
        url = reverse('logout')
        response = api_client.post(url)
        assert response.status_code == status.HTTP_200_OK
        assert 'message' in response.data

    def test_password_reset_request(self, api_client, create_user):
        user = create_user()
        url = reverse('password_reset')
        data = {
            'email': user.email
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert 'message' in response.data

    def test_password_reset_confirm(self, api_client, create_user):
        user = create_user()
        # Note: In a real scenario, you would generate a valid token
        url = reverse('password_reset_confirm')
        data = {
            'token': 'valid_token',
            'password': 'newpassword123',
            'password_confirm': 'newpassword123'
        }
        response = api_client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert 'message' in response.data

# Human tasks:
# TODO: Implement mock email sending for password reset tests
# TODO: Add more edge cases and negative scenarios to improve test coverage
# TODO: Set up test database with proper test data