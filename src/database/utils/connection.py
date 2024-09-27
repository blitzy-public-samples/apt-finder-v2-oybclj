import contextlib
from typing import Optional

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError

from src.database.config.database import get_database_url

# Global connection pool
CONNECTION_POOL: Optional[Engine] = None

class DatabaseError(Exception):
    """Custom exception class for database-related errors"""
    def __init__(self, message: str):
        super().__init__(message)

def initialize_connection_pool() -> None:
    """Initializes the global connection pool using the configured engine"""
    global CONNECTION_POOL
    if CONNECTION_POOL is None:
        try:
            db_url = get_database_url()
            CONNECTION_POOL = create_engine(db_url, pool_pre_ping=True)
        except Exception as e:
            raise DatabaseError(f"Failed to initialize connection pool: {str(e)}")

def get_connection() -> Engine:
    """Retrieves a connection from the connection pool"""
    if CONNECTION_POOL is None:
        initialize_connection_pool()
    return CONNECTION_POOL

def close_connection(connection: Engine) -> None:
    """Closes the given database connection"""
    if connection is not None:
        try:
            connection.dispose()
        except SQLAlchemyError as e:
            raise DatabaseError(f"Error closing database connection: {str(e)}")

def execute_query(query: str, params: dict = None) -> list:
    """Executes a SQL query and returns the result"""
    connection = get_connection()
    try:
        with connection.connect() as conn:
            result = conn.execute(query, params or {})
            return [dict(row) for row in result]
    except SQLAlchemyError as e:
        raise DatabaseError(f"Error executing query: {str(e)}")
    finally:
        close_connection(connection)

@contextlib.contextmanager
def transaction():
    """A context manager for handling database transactions"""
    session = sessionmaker(bind=get_connection())()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise DatabaseError(f"Transaction failed: {str(e)}")
    finally:
        session.close()

# Human tasks:
# TODO: Implement proper logging for database operations and errors
# TODO: Review and optimize query execution for performance
# TODO: Implement connection retry mechanism for transient database errors