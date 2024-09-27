# src/database/tests/__init__.py

import unittest

# Import test modules
from .test_models import *
from .test_repositories import *
from .test_schemas import *

def run_tests():
    """
    Run all tests in the database package.
    """
    test_loader = unittest.TestLoader()
    test_suite = test_loader.discover('src.database.tests', pattern='test_*.py')
    
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(test_suite)

# Pending human tasks
"""
Human tasks:
1. Implement test_models.py file with unit tests for database models (Required)
2. Implement test_repositories.py file with unit tests for database repositories (Required)
3. Implement test_schemas.py file with unit tests for database schemas (Required)
"""