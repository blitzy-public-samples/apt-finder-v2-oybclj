from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete
from typing import Optional, List

from src.database.models.filter import Filter
from src.database.schemas.filter import FilterCreate, FilterUpdate, FilterInDB
from src.database.config.database import Base

class FilterRepository:
    """Repository class for handling CRUD operations on Filter objects in the database."""

    def __init__(self, db_session: Session):
        """
        Initializes a new FilterRepository instance.

        Args:
            db_session (Session): The database session to use for operations.
        """
        self.db_session = db_session

    def create_filter(self, filter_data: FilterCreate) -> FilterInDB:
        """
        Creates a new Filter in the database.

        Args:
            filter_data (FilterCreate): The data for creating a new filter.

        Returns:
            FilterInDB: The created Filter object.
        """
        new_filter = Filter(**filter_data.dict())
        self.db_session.add(new_filter)
        self.db_session.commit()
        self.db_session.refresh(new_filter)
        return FilterInDB.from_orm(new_filter)

    def get_filter(self, filter_id: int) -> Optional[FilterInDB]:
        """
        Retrieves a Filter from the database by its ID.

        Args:
            filter_id (int): The ID of the filter to retrieve.

        Returns:
            Optional[FilterInDB]: The retrieved Filter object or None if not found.
        """
        filter_obj = self.db_session.execute(select(Filter).filter_by(id=filter_id)).scalar_one_or_none()
        return FilterInDB.from_orm(filter_obj) if filter_obj else None

    def get_filters_by_user(self, user_id: int) -> List[FilterInDB]:
        """
        Retrieves all Filters for a given user from the database.

        Args:
            user_id (int): The ID of the user whose filters to retrieve.

        Returns:
            List[FilterInDB]: A list of Filter objects belonging to the user.
        """
        filters = self.db_session.execute(select(Filter).filter_by(user_id=user_id)).scalars().all()
        return [FilterInDB.from_orm(filter_obj) for filter_obj in filters]

    def update_filter(self, filter_id: int, filter_data: FilterUpdate) -> Optional[FilterInDB]:
        """
        Updates an existing Filter in the database.

        Args:
            filter_id (int): The ID of the filter to update.
            filter_data (FilterUpdate): The data to update the filter with.

        Returns:
            Optional[FilterInDB]: The updated Filter object or None if not found.
        """
        update_stmt = (
            update(Filter)
            .where(Filter.id == filter_id)
            .values(**filter_data.dict(exclude_unset=True))
            .returning(Filter)
        )
        updated_filter = self.db_session.execute(update_stmt).scalar_one_or_none()
        self.db_session.commit()
        return FilterInDB.from_orm(updated_filter) if updated_filter else None

    def delete_filter(self, filter_id: int) -> bool:
        """
        Deletes a Filter from the database.

        Args:
            filter_id (int): The ID of the filter to delete.

        Returns:
            bool: True if the Filter was deleted, False if not found.
        """
        delete_stmt = delete(Filter).where(Filter.id == filter_id)
        result = self.db_session.execute(delete_stmt)
        self.db_session.commit()
        return result.rowcount > 0

# Human tasks:
# TODO: Implement error handling for database operations to catch and handle potential exceptions.
# TODO: Add logging for important operations and errors to facilitate debugging and monitoring.
# TODO: Consider implementing a method to apply filters to apartment listing queries.
# TODO: Implement unit tests for the FilterRepository class to ensure all methods work as expected.
# TODO: Review and optimize database queries for performance, especially for the get_filters_by_user method which may need to handle a large number of filters.