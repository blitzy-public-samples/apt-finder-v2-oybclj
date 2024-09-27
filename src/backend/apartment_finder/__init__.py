# src/backend/apartment_finder/__init__.py

from .celery import app as celery_app

__all__ = ['celery_app']

# Human Tasks:
# - Confirm the Celery configuration and adjust if necessary based on specific project requirements (Optional)