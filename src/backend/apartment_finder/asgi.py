"""
ASGI config for the Apartment Finder project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apartment_finder.settings')

# Get the ASGI application
application = get_asgi_application()

# Human Tasks:
# TODO: Ensure that the ASGI server (e.g., Daphne) is properly configured in the production environment
# TODO (Optional): If WebSocket support is needed, implement and configure appropriate routing