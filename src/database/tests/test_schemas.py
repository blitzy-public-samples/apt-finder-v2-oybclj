import pytest
from pydantic import ValidationError
from datetime import datetime, date

from src.database.schemas.user import UserSchema, UserCreate, UserUpdate, UserInDB, UserOut
from src.database.schemas.apartment_listing import ApartmentListingSchema, ApartmentListingCreateSchema, ApartmentListingUpdateSchema
from src.database.schemas.filter import FilterBase, FilterCreate, FilterUpdate, FilterInDB
from src.database.schemas.subscription import SubscriptionBase, SubscriptionCreate, SubscriptionUpdate, SubscriptionInDB, SubscriptionSchema
from src.database.schemas.zipcode import ZipcodeSchema

# User Schema Tests
def test_user_schema_valid_data():
    user_data = {
        "email": "test@example.com",
        "password": "securepassword123",
        "created_at": datetime.now(),
        "last_login": datetime.now()
    }
    user = UserSchema(**user_data)
    assert user.email == user_data["email"]
    assert user.password == user_data["password"]

def test_user_schema_invalid_data():
    with pytest.raises(ValidationError):
        UserSchema(email="invalid_email", password="short")

# Apartment Listing Schema Tests
def test_apartment_listing_schema_valid_data():
    listing_data = {
        "date_on_market": date.today(),
        "rent": 1500.00,
        "broker_fee": 500.00,
        "square_footage": 800,
        "bedrooms": 2,
        "bathrooms": 1,
        "available_date": date.today(),
        "street_address": "123 Main St",
        "zillow_url": "https://www.zillow.com/homedetails/123-main-st",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    listing = ApartmentListingSchema(**listing_data)
    assert listing.rent == listing_data["rent"]
    assert listing.bedrooms == listing_data["bedrooms"]

def test_apartment_listing_schema_invalid_data():
    with pytest.raises(ValidationError):
        ApartmentListingSchema(rent=-100, bedrooms="invalid")

# Filter Schema Tests
def test_filter_schema_valid_data():
    filter_data = {
        "user_id": 1,
        "criterion": '{"min_rent": 1000, "max_rent": 2000, "bedrooms": 2}',
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    filter_schema = FilterBase(**filter_data)
    assert filter_schema.user_id == filter_data["user_id"]
    assert filter_schema.criterion == filter_data["criterion"]

def test_filter_schema_invalid_data():
    with pytest.raises(ValidationError):
        FilterBase(user_id="invalid", criterion=123)

# Subscription Schema Tests
def test_subscription_schema_valid_data():
    subscription_data = {
        "user_id": 1,
        "start_date": date.today(),
        "end_date": date.today(),
        "status": "active",
        "paypal_subscription_id": "sub_123456",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    subscription = SubscriptionSchema(**subscription_data)
    assert subscription.user_id == subscription_data["user_id"]
    assert subscription.status == subscription_data["status"]

def test_subscription_schema_invalid_data():
    with pytest.raises(ValidationError):
        SubscriptionSchema(user_id="invalid", start_date="not a date")

# Zipcode Schema Tests
def test_zipcode_schema_valid_data():
    zipcode_data = {
        "zipcode": "12345",
        "city": "New York",
        "state": "NY"
    }
    zipcode = ZipcodeSchema(**zipcode_data)
    assert zipcode.zipcode == zipcode_data["zipcode"]
    assert zipcode.city == zipcode_data["city"]

def test_zipcode_schema_invalid_data():
    with pytest.raises(ValidationError):
        ZipcodeSchema(zipcode="invalid", city=123, state="Too Long")

# Test is_active method of SubscriptionSchema
def test_subscription_schema_is_active():
    active_subscription = SubscriptionSchema(
        user_id=1,
        start_date=date.today(),
        end_date=date.today(),
        status="active",
        paypal_subscription_id="sub_123456",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    assert active_subscription.is_active() == True

    inactive_subscription = SubscriptionSchema(
        user_id=1,
        start_date=date.today(),
        end_date=date.today(),
        status="inactive",
        paypal_subscription_id="sub_123456",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    assert inactive_subscription.is_active() == False

# Test remaining_days method of SubscriptionSchema
def test_subscription_schema_remaining_days():
    future_end_date = date.today().replace(year=date.today().year + 1)
    subscription = SubscriptionSchema(
        user_id=1,
        start_date=date.today(),
        end_date=future_end_date,
        status="active",
        paypal_subscription_id="sub_123456",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    assert subscription.remaining_days() > 0

    past_end_date = date.today().replace(year=date.today().year - 1)
    expired_subscription = SubscriptionSchema(
        user_id=1,
        start_date=date.today(),
        end_date=past_end_date,
        status="inactive",
        paypal_subscription_id="sub_123456",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    assert expired_subscription.remaining_days() == 0

# Human Tasks:
# TODO: Review and adjust test cases to cover all edge cases and specific business rules for each schema.
# TODO: Ensure that test data used in the test functions accurately represents real-world scenarios.
# TODO: Add more specific test cases for complex validation rules, such as the criteria validation in FilterBase.