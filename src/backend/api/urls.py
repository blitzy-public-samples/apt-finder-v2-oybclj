from django.urls import path, include
from api.views import auth, filters, listings, subscriptions

urlpatterns = [
    # Authentication related endpoints
    path('auth/', include(auth.urlpatterns)),

    # Filter management endpoints
    path('filters/', include(filters.urlpatterns)),

    # Apartment listing endpoints
    path('listings/', include(listings.urlpatterns)),

    # Subscription management endpoints
    path('subscriptions/', include(subscriptions.urlpatterns)),
]

# Add a comment to explain the structure
"""
This file defines the main URL patterns for the Apartment Finder API.
Each set of related endpoints (auth, filters, listings, subscriptions)
is grouped and included from their respective view modules.

The actual endpoint definitions are located in the individual view modules:
- api.views.auth
- api.views.filters
- api.views.listings
- api.views.subscriptions

This structure allows for better organization and separation of concerns,
making it easier to maintain and extend the API as the project grows.
"""