import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Load environment variables from .env file
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL')
POOL_SIZE = int(os.getenv('DB_POOL_SIZE', 5))
MAX_OVERFLOW = int(os.getenv('DB_MAX_OVERFLOW', 10))
POOL_TIMEOUT = int(os.getenv('DB_POOL_TIMEOUT', 30))

def create_engine():
    """
    Creates and configures the SQLAlchemy engine for database connections.

    Returns:
        Engine: Configured SQLAlchemy engine instance
    """
    # Create SQLAlchemy engine with the DATABASE_URL
    engine = create_engine(
        DATABASE_URL,
        pool_size=POOL_SIZE,
        max_overflow=MAX_OVERFLOW,
        pool_timeout=POOL_TIMEOUT
    )

    return engine

def get_db_session():
    """
    Creates and returns a new database session.

    Returns:
        Session: SQLAlchemy Session object
    """
    # Create a new Session instance using the configured engine
    Session = sessionmaker(bind=create_engine())
    return Session()

# Human tasks:
# TODO: Verify and set the correct DATABASE_URL in the .env file
# TODO: Review and adjust database connection pool settings for optimal performance
# TODO: Implement proper error handling for database connection failures