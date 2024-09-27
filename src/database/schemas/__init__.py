# src/database/schemas/__init__.py

"""
Initializes the database schemas package and imports all schema modules to make
them easily accessible when importing from the schemas package.
"""

from .user import UserSchema
from .apartment_listing import ApartmentListingSchema
from .filter import FilterSchema
from .subscription import SubscriptionSchema
from .zipcode import ZipcodeSchema

__all__ = ["UserSchema", "ApartmentListingSchema", "FilterSchema", "SubscriptionSchema", "ZipcodeSchema"]

# Human Tasks:
# TODO: Implement the individual schema modules (user.py, apartment_listing.py, filter.py, subscription.py, zipcode.py) with their respective Pydantic models.
# TODO: Review and adjust the imports in this __init__.py file once the individual schema modules are implemented to ensure all necessary schemas are correctly imported and exposed.