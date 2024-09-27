from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    """Base Pydantic model for User data."""
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    """Pydantic model for creating a new User."""
    password: str

class UserUpdate(BaseModel):
    """Pydantic model for updating an existing User."""
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None

class UserInDB(UserBase):
    """Pydantic model representing a User as stored in the database."""
    id: int
    password_hash: str
    created_at: datetime
    last_login: Optional[datetime]
    is_active: bool = True
    is_admin: bool = False

class UserOut(UserBase):
    """Pydantic model for User data to be returned to clients."""
    id: int
    created_at: datetime
    last_login: Optional[datetime]
    is_active: bool
    is_admin: bool

def create_user_schema(user: 'User') -> UserOut:
    """
    Creates a Pydantic schema for a User instance.

    Args:
        user (User): A User model instance.

    Returns:
        UserOut: A UserOut instance containing the user's data.
    """
    return UserOut(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        created_at=user.created_at,
        last_login=user.last_login,
        is_active=user.is_active,
        is_admin=user.is_admin
    )

# Human tasks:
# TODO: Review and adjust field validators if needed (e.g., password complexity, name length).
# TODO: Consider adding custom validation methods for complex business rules if necessary.
# CRITICAL: Ensure that sensitive data (like password_hash) is never included in UserOut schema.