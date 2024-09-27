# src/database/config/__init__.py

"""
Initialization file for the database configuration module.
This file imports and exposes key configuration elements from other files in the config directory.
"""

from .database import DatabaseConfig

__all__ = ['DatabaseConfig']

# Human tasks:
# TODO: Review and confirm the database configuration settings
# TODO: Ensure that all necessary database configuration parameters are exposed through this __init__.py file