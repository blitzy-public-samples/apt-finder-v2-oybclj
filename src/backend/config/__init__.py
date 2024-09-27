# src/backend/config/__init__.py

"""
Initialization file for the backend configuration module.
This file imports and exposes configuration settings from other configuration files.
"""

from .celery import celery_config
from .redis import redis_config

# Expose the configurations
__all__ = ['celery_config', 'redis_config']

# TODO: Review and confirm the configuration settings imported from celery.py and redis.py
# TODO: Ensure that any environment-specific configurations are properly handled

# You might want to add environment-specific logic here, for example:
# import os
# 
# ENV = os.getenv('APARTMENT_FINDER_ENV', 'development')
# 
# if ENV == 'production':
#     from .production import *
# elif ENV == 'staging':
#     from .staging import *
# else:
#     from .development import *

# Additional configuration settings can be added here if needed