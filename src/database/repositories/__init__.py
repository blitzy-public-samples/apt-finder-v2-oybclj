# src/database/repositories/__init__.py

"""
This module initializes the repositories package and exposes the repository classes
for easy import elsewhere in the application.
"""

from .user_repository import UserRepository
from .apartment_listing_repository import ApartmentListingRepository
from .filter_repository import FilterRepository
from .subscription_repository import SubscriptionRepository
from .zipcode_repository import ZipcodeRepository

__all__ = [
    "UserRepository",
    "ApartmentListingRepository",
    "FilterRepository",
    "SubscriptionRepository",
    "ZipcodeRepository"
]
```

This implementation does the following:

1. It imports all the repository classes from their respective modules.
2. It defines an `__all__` list that explicitly specifies which names should be exported when `from src.database.repositories import *` is used. This follows the Python best practice of explicitly declaring public interfaces.
3. The file includes a docstring at the top explaining the purpose of this module.

This implementation allows other parts of the application to easily import the repository classes, for example:

```python
from src.database.repositories import UserRepository, ApartmentListingRepository
```

or

```python
from src.database.repositories import *