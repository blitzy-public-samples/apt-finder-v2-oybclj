# src/backend/tasks/__init__.py

from celery import shared_task
from .update_listings import update_listings_task
from .send_notifications import send_notifications_task

# Register Celery tasks
update_listings = shared_task(update_listings_task)
send_notifications = shared_task(send_notifications_task)

# Human tasks
"""
Human tasks:
1. Verify that the update_listings and send_notifications modules are correctly implemented (Required)
2. Ensure that Celery is properly configured in the project settings (Critical)
"""

__all__ = ['update_listings', 'send_notifications']