import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apartment_finder.settings')

# Create a new Celery app
app = Celery('apartment_finder')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()

# Configure Celery
app.conf.update(
    BROKER_URL=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'),
    CELERY_RESULT_BACKEND=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0'),
    CELERY_TASK_SERIALIZER='json',
    CELERY_RESULT_SERIALIZER='json',
    CELERY_ACCEPT_CONTENT=['json'],
    CELERY_TIMEZONE='UTC',
    CELERY_ENABLE_UTC=True,
)

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

# Human tasks:
# TODO: Review and adjust Celery configuration settings for production environment
# TODO: Ensure that sensitive information (like broker URLs) are properly managed using environment variables
# TODO: Verify that the Celery configuration is compatible with the chosen message broker (Redis)