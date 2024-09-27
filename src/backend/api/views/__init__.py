# src/backend/api/views/__init__.py

"""
This module initializes the views package and imports all view modules
to make them accessible when the api.views package is imported.
"""

from .auth import *
from .filters import *
from .listings import *
from .subscriptions import *

# List of modules to be imported when `from api.views import *` is used
__all__ = [
    'auth_views',
    'filter_views',
    'listing_views',
    'subscription_views'
]