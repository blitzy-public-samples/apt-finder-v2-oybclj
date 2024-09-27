# src/backend/middleware/__init__.py

from .authentication import AuthenticationMiddleware
from .rate_limiter import RateLimiterMiddleware

__all__ = ['AuthenticationMiddleware', 'RateLimiterMiddleware']

# Human tasks:
# TODO: Implement the AuthenticationMiddleware in the authentication.py file
# TODO: Implement the RateLimiterMiddleware in the rate_limiter.py file
```

This __init__.py file serves as the entry point for the middleware package in the backend of the Apartment Finder web service. It imports and exposes the AuthenticationMiddleware and RateLimiterMiddleware for use in the main application.

The file includes the following:

1. Imports of the middleware classes from their respective modules.
2. An __all__ list that specifies which names should be imported when using `from backend.middleware import *`.
3. TODO comments for the pending human tasks to implement the actual middleware classes.

This structure allows other parts of the application to easily import the middleware by doing:

```python
from backend.middleware import AuthenticationMiddleware, RateLimiterMiddleware