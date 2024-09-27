#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    # Set the DJANGO_SETTINGS_MODULE environment variable
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apartment_finder.settings')
    try:
        # Try to import Django and execute management commands
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Handle ImportError if Django is not installed
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # Execute the Django management command
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

# Human Tasks:
# TODO: Ensure Django is installed in the project's virtual environment
# TODO: Verify that the apartment_finder.settings module is correctly implemented