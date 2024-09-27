from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database.config.database import Base
from src.database.models.user import User

class Filter(Base):
    """
    Represents a user-created filter for apartment listings in the Apartment Finder application.
    """
    __tablename__ = 'filters'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String, nullable=False)
    criteria = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    user = relationship("User", back_populates="filters")

    def __init__(self, user_id: int, name: str, criteria: dict):
        """
        Initializes a new Filter instance.

        Args:
            user_id (int): The ID of the user who created the filter.
            name (str): The name of the filter.
            criteria (dict): The criteria for filtering apartment listings.
        """
        self.user_id = user_id
        self.name = name
        self.criteria = criteria
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self) -> dict:
        """
        Converts the Filter instance to a dictionary representation.

        Returns:
            dict: A dictionary containing the Filter's attributes.
        """
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'criteria': self.criteria,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def update(self, data: dict) -> None:
        """
        Updates the Filter instance with new data.

        Args:
            data (dict): A dictionary containing the fields to be updated.
        """
        if 'name' in data:
            self.name = data['name']
        if 'criteria' in data:
            self.criteria = data['criteria']
        self.updated_at = datetime.utcnow()

# Human tasks
# TODO: Implement validation logic for the criteria JSON structure to ensure it contains valid filter parameters.
# TODO: Consider adding a method to apply the filter criteria to a query of apartment listings.
# TODO: Ensure that the relationship with the User model is properly set up (e.g., backref).