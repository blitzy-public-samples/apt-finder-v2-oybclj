from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from src.database.config.database import Base
from datetime import datetime

class User(Base):
    """
    Represents a user in the Apartment Finder application.
    """
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    # Relationships
    filters = relationship("Filter", back_populates="user")
    subscriptions = relationship("Subscription", back_populates="user")

    def __init__(self, email: str, password_hash: str, first_name: str, last_name: str):
        """
        Initializes a new User instance.
        """
        self.email = email
        self.password_hash = password_hash
        self.first_name = first_name
        self.last_name = last_name
        self.created_at = datetime.utcnow()
        self.is_active = True
        self.is_admin = False

    def to_dict(self):
        """
        Converts the User instance to a dictionary representation.
        """
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "created_at": self.created_at.isoformat(),
            "last_login": self.last_login.isoformat() if self.last_login else None,
            "is_active": self.is_active,
            "is_admin": self.is_admin
        }

# Human tasks:
# TODO: Implement password hashing mechanism for storing user passwords securely.
# TODO: Add any additional methods for user authentication and authorization if needed.
# TODO: Consider adding a method for updating user information.