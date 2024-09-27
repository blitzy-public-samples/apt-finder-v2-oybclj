from typing import List, Optional
from src.database.models.zipcode import Zipcode
from src.database.config.database import db_session

class ZipcodeRepository:
    """Repository class for handling Zipcode-related database operations."""

    def create_zipcode(self, zipcode: str, city: str, state: str) -> Zipcode:
        """
        Creates a new Zipcode entry in the database.

        Args:
            zipcode (str): The zipcode.
            city (str): The city name.
            state (str): The state name.

        Returns:
            Zipcode: The created Zipcode instance.
        """
        # Create a new Zipcode instance with the provided data
        new_zipcode = Zipcode(zipcode=zipcode, city=city, state=state)

        # Add the new Zipcode to the database session
        db_session.add(new_zipcode)

        # Commit the session to persist the changes
        db_session.commit()

        # Return the created Zipcode instance
        return new_zipcode

    def get_zipcode_by_code(self, zipcode: str) -> Optional[Zipcode]:
        """
        Retrieves a Zipcode entry by its zipcode.

        Args:
            zipcode (str): The zipcode to search for.

        Returns:
            Optional[Zipcode]: The found Zipcode instance or None if not found.
        """
        # Query the database for a Zipcode with the given zipcode
        return db_session.query(Zipcode).filter(Zipcode.zipcode == zipcode).first()

    def get_all_zipcodes(self) -> List[Zipcode]:
        """
        Retrieves all Zipcode entries from the database.

        Returns:
            List[Zipcode]: A list of all Zipcode instances.
        """
        # Query the database for all Zipcode entries
        return db_session.query(Zipcode).all()

    def update_zipcode(self, zipcode: str, city: str, state: str) -> Optional[Zipcode]:
        """
        Updates an existing Zipcode entry in the database.

        Args:
            zipcode (str): The zipcode to update.
            city (str): The new city name.
            state (str): The new state name.

        Returns:
            Optional[Zipcode]: The updated Zipcode instance or None if not found.
        """
        # Query the database for the Zipcode with the given zipcode
        existing_zipcode = self.get_zipcode_by_code(zipcode)

        if existing_zipcode:
            # If found, update the city and state
            existing_zipcode.city = city
            existing_zipcode.state = state

            # Commit the session to persist the changes
            db_session.commit()

        # Return the updated Zipcode instance or None if not found
        return existing_zipcode

    def delete_zipcode(self, zipcode: str) -> bool:
        """
        Deletes a Zipcode entry from the database.

        Args:
            zipcode (str): The zipcode to delete.

        Returns:
            bool: True if the Zipcode was deleted, False if not found.
        """
        # Query the database for the Zipcode with the given zipcode
        existing_zipcode = self.get_zipcode_by_code(zipcode)

        if existing_zipcode:
            # If found, delete the Zipcode from the database
            db_session.delete(existing_zipcode)

            # Commit the session to persist the changes
            db_session.commit()
            return True

        return False

# Human tasks:
# TODO: Implement error handling for database operations (e.g., handling IntegrityError for duplicate entries).
# TODO: Add logging for important operations and errors.
# TODO: Consider implementing batch operations for better performance when dealing with multiple zipcodes.
# TODO: Review and optimize database queries for performance, especially as the dataset grows.