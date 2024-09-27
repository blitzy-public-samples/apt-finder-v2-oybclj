import pytest
from datetime import datetime, timedelta
from src.database.models.user import User

def test_user_model():
    # Create a new User instance with test data
    user = User(
        email="test@example.com",
        password_hash="hashed_password",
        is_active=True,
        is_admin=False
    )

    # Assert that the User attributes are set correctly
    assert user.email == "test@example.com"
    assert user.password_hash == "hashed_password"
    assert user.is_active == True
    assert user.is_admin == False

    # Test the to_dict method
    user_dict = user.to_dict()
    assert isinstance(user_dict, dict)
    assert user_dict['email'] == "test@example.com"
    assert 'password_hash' not in user_dict  # Ensure password_hash is not included in the dict
    assert user_dict['is_active'] == True
    assert user_dict['is_admin'] == False

    # Assert that is_active is True by default
    default_user = User(email="default@example.com", password_hash="default_hash")
    assert default_user.is_active == True

    # Assert that is_admin is False by default
    assert default_user.is_admin == False

    # Assert that created_at is set to the current time
    assert isinstance(user.created_at, datetime)
    assert (datetime.utcnow() - user.created_at) < timedelta(seconds=1)

# Add more tests as needed for additional User model functionality