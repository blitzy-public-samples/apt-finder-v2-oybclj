import pytest
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.database.config.database import Base
from src.database.models import User, ApartmentListing, Filter, Subscription, Zipcode
from src.database.repositories.user_repository import UserRepository
from src.database.repositories.apartment_listing_repository import ApartmentListingRepository
from src.database.repositories.filter_repository import FilterRepository
from src.database.repositories.subscription_repository import SubscriptionRepository
from src.database.repositories.zipcode_repository import ZipcodeRepository

# Create an in-memory SQLite database for testing
engine = create_engine('sqlite:///:memory:')
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def setup_module():
    """Sets up the test database and creates all tables before running tests."""
    Base.metadata.create_all(engine)

def teardown_module():
    """Tears down the test database after all tests have been run."""
    Base.metadata.drop_all(engine)

@pytest.fixture
def get_test_db():
    """Creates a new database session for testing."""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

class TestUserRepository:
    def test_create_user(self, get_test_db):
        repo = UserRepository(get_test_db)
        user = repo.create_user(email="test@example.com", password_hash="hashed_password")
        assert user.id is not None
        assert user.email == "test@example.com"
        assert user.password_hash == "hashed_password"

    def test_get_user_by_id(self, get_test_db):
        repo = UserRepository(get_test_db)
        user = repo.create_user(email="test@example.com", password_hash="hashed_password")
        retrieved_user = repo.get_user_by_id(user.id)
        assert retrieved_user.id == user.id
        assert retrieved_user.email == user.email

    def test_update_user(self, get_test_db):
        repo = UserRepository(get_test_db)
        user = repo.create_user(email="test@example.com", password_hash="hashed_password")
        updated_user = repo.update_user(user.id, email="updated@example.com")
        assert updated_user.email == "updated@example.com"

    def test_delete_user(self, get_test_db):
        repo = UserRepository(get_test_db)
        user = repo.create_user(email="test@example.com", password_hash="hashed_password")
        repo.delete_user(user.id)
        assert repo.get_user_by_id(user.id) is None

class TestApartmentListingRepository:
    def test_create_listing(self, get_test_db):
        repo = ApartmentListingRepository(get_test_db)
        listing = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1000,
            broker_fee=100,
            square_footage=800,
            bedrooms=2,
            bathrooms=1,
            available_date=datetime.now(),
            street_address="123 Test St",
            zillow_url="https://www.zillow.com/test"
        )
        assert listing.id is not None
        assert listing.rent == 1000

    def test_get_listing_by_id(self, get_test_db):
        repo = ApartmentListingRepository(get_test_db)
        listing = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1000,
            broker_fee=100,
            square_footage=800,
            bedrooms=2,
            bathrooms=1,
            available_date=datetime.now(),
            street_address="123 Test St",
            zillow_url="https://www.zillow.com/test"
        )
        retrieved_listing = repo.get_listing_by_id(listing.id)
        assert retrieved_listing.id == listing.id
        assert retrieved_listing.street_address == listing.street_address

    def test_update_listing(self, get_test_db):
        repo = ApartmentListingRepository(get_test_db)
        listing = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1000,
            broker_fee=100,
            square_footage=800,
            bedrooms=2,
            bathrooms=1,
            available_date=datetime.now(),
            street_address="123 Test St",
            zillow_url="https://www.zillow.com/test"
        )
        updated_listing = repo.update_listing(listing.id, rent=1100)
        assert updated_listing.rent == 1100

    def test_delete_listing(self, get_test_db):
        repo = ApartmentListingRepository(get_test_db)
        listing = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1000,
            broker_fee=100,
            square_footage=800,
            bedrooms=2,
            bathrooms=1,
            available_date=datetime.now(),
            street_address="123 Test St",
            zillow_url="https://www.zillow.com/test"
        )
        repo.delete_listing(listing.id)
        assert repo.get_listing_by_id(listing.id) is None

    def test_filter_listings(self, get_test_db):
        repo = ApartmentListingRepository(get_test_db)
        listing1 = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1000,
            broker_fee=100,
            square_footage=800,
            bedrooms=2,
            bathrooms=1,
            available_date=datetime.now(),
            street_address="123 Test St",
            zillow_url="https://www.zillow.com/test1"
        )
        listing2 = repo.create_listing(
            date_on_market=datetime.now(),
            rent=1500,
            broker_fee=150,
            square_footage=1000,
            bedrooms=3,
            bathrooms=2,
            available_date=datetime.now(),
            street_address="456 Test Ave",
            zillow_url="https://www.zillow.com/test2"
        )
        filtered_listings = repo.filter_listings(min_rent=1200, min_bedrooms=3)
        assert len(filtered_listings) == 1
        assert filtered_listings[0].id == listing2.id

class TestFilterRepository:
    def test_create_filter(self, get_test_db):
        repo = FilterRepository(get_test_db)
        filter = repo.create_filter(user_id=1, criterion="min_rent:1000,max_rent:2000")
        assert filter.id is not None
        assert filter.user_id == 1
        assert filter.criterion == "min_rent:1000,max_rent:2000"

    def test_get_filter(self, get_test_db):
        repo = FilterRepository(get_test_db)
        filter = repo.create_filter(user_id=1, criterion="min_rent:1000,max_rent:2000")
        retrieved_filter = repo.get_filter(filter.id)
        assert retrieved_filter.id == filter.id
        assert retrieved_filter.criterion == filter.criterion

    def test_get_filters_by_user(self, get_test_db):
        repo = FilterRepository(get_test_db)
        filter1 = repo.create_filter(user_id=1, criterion="min_rent:1000,max_rent:2000")
        filter2 = repo.create_filter(user_id=1, criterion="bedrooms:2,bathrooms:1")
        user_filters = repo.get_filters_by_user(user_id=1)
        assert len(user_filters) == 2
        assert filter1.id in [f.id for f in user_filters]
        assert filter2.id in [f.id for f in user_filters]

    def test_update_filter(self, get_test_db):
        repo = FilterRepository(get_test_db)
        filter = repo.create_filter(user_id=1, criterion="min_rent:1000,max_rent:2000")
        updated_filter = repo.update_filter(filter.id, criterion="min_rent:1500,max_rent:2500")
        assert updated_filter.criterion == "min_rent:1500,max_rent:2500"

    def test_delete_filter(self, get_test_db):
        repo = FilterRepository(get_test_db)
        filter = repo.create_filter(user_id=1, criterion="min_rent:1000,max_rent:2000")
        repo.delete_filter(filter.id)
        assert repo.get_filter(filter.id) is None

class TestSubscriptionRepository:
    def test_create_subscription(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        subscription = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        assert subscription.id is not None
        assert subscription.user_id == 1
        assert subscription.status == "active"

    def test_get_subscription(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        subscription = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        retrieved_subscription = repo.get_subscription(subscription.id)
        assert retrieved_subscription.id == subscription.id
        assert retrieved_subscription.paypal_subscription_id == subscription.paypal_subscription_id

    def test_get_user_subscriptions(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        sub1 = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        sub2 = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="inactive",
            paypal_subscription_id="sub_456"
        )
        user_subscriptions = repo.get_user_subscriptions(user_id=1)
        assert len(user_subscriptions) == 2
        assert sub1.id in [s.id for s in user_subscriptions]
        assert sub2.id in [s.id for s in user_subscriptions]

    def test_update_subscription(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        subscription = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        updated_subscription = repo.update_subscription(subscription.id, status="inactive")
        assert updated_subscription.status == "inactive"

    def test_delete_subscription(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        subscription = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        repo.delete_subscription(subscription.id)
        assert repo.get_subscription(subscription.id) is None

    def test_get_active_subscriptions(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        active_sub = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        inactive_sub = repo.create_subscription(
            user_id=2,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="inactive",
            paypal_subscription_id="sub_456"
        )
        active_subscriptions = repo.get_active_subscriptions()
        assert len(active_subscriptions) == 1
        assert active_subscriptions[0].id == active_sub.id

    def test_update_subscription_status(self, get_test_db):
        repo = SubscriptionRepository(get_test_db)
        subscription = repo.create_subscription(
            user_id=1,
            start_date=datetime.now(),
            end_date=datetime.now(),
            status="active",
            paypal_subscription_id="sub_123"
        )
        updated_subscription = repo.update_subscription_status(subscription.id, "cancelled")
        assert updated_subscription.status == "cancelled"

class TestZipcodeRepository:
    def test_create_zipcode(self, get_test_db):
        repo = ZipcodeRepository(get_test_db)
        zipcode = repo.create_zipcode(code="12345", city="Test City", state="TS")
        assert zipcode.code == "12345"
        assert zipcode.city == "Test City"
        assert zipcode.state == "TS"

    def test_get_zipcode_by_code(self, get_test_db):
        repo = ZipcodeRepository(get_test_db)
        zipcode = repo.create_zipcode(code="12345", city="Test City", state="TS")
        retrieved_zipcode = repo.get_zipcode_by_code("12345")
        assert retrieved_zipcode.code == zipcode.code
        assert retrieved_zipcode.city == zipcode.city

    def test_get_all_zipcodes(self, get_test_db):
        repo = ZipcodeRepository(get_test_db)
        zipcode1 = repo.create_zipcode(code="12345", city="Test City", state="TS")
        zipcode2 = repo.create_zipcode(code="67890", city="Another City", state="AS")
        all_zipcodes = repo.get_all_zipcodes()
        assert len(all_zipcodes) == 2
        assert zipcode1.code in [z.code for z in all_zipcodes]
        assert zipcode2.code in [z.code for z in all_zipcodes]

    def test_update_zipcode(self, get_test_db):
        repo = ZipcodeRepository(get_test_db)
        zipcode = repo.create_zipcode(code="12345", city="Test City", state="TS")
        updated_zipcode = repo.update_zipcode("12345", city="Updated City")
        assert updated_zipcode.city == "Updated City"

    def test_delete_zipcode(self, get_test_db):
        repo = ZipcodeRepository(get_test_db)
        zipcode = repo.create_zipcode(code="12345", city="Test City", state="TS")
        repo.delete_zipcode("12345")
        assert repo.get_zipcode_by_code("12345") is None

# Human tasks:
# 1. Implement error handling tests for each repository method to ensure proper behavior when errors occur.
# 2. Add tests for edge cases and boundary conditions for each repository method.
# 3. Implement integration tests to verify the interaction between different repositories.
# 4. Add performance tests for methods that may handle large datasets, such as filtering apartment listings.
# 5. Ensure that all test methods use appropriate test data that covers various scenarios.
# 6. Implement test fixtures to set up common test data and avoid repetition across test methods.