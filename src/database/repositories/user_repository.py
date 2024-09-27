from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete
from src.database.models.user import User
from src.database.schemas.user import UserCreate, UserUpdate, UserInDB
from src.database.config.database import get_db

class UserRepository:
    """Repository class for handling User-related database operations."""

    def __init__(self, db_session: Session):
        """Initializes a new UserRepository instance."""
        self.db_session = db_session

    def create_user(self, user_data: UserCreate) -> UserInDB:
        """Creates a new user in the database."""
        new_user = User(**user_data.dict())
        self.db_session.add(new_user)
        self.db_session.commit()
        self.db_session.refresh(new_user)
        return UserInDB.from_orm(new_user)

    def get_user_by_id(self, user_id: int) -> UserInDB | None:
        """Retrieves a user by their ID."""
        user = self.db_session.execute(select(User).filter(User.id == user_id)).scalar_one_or_none()
        return UserInDB.from_orm(user) if user else None

    def get_user_by_email(self, email: str) -> UserInDB | None:
        """Retrieves a user by their email address."""
        user = self.db_session.execute(select(User).filter(User.email == email)).scalar_one_or_none()
        return UserInDB.from_orm(user) if user else None

    def update_user(self, user_id: int, user_data: UserUpdate) -> UserInDB:
        """Updates an existing user's information."""
        update_data = user_data.dict(exclude_unset=True)
        self.db_session.execute(update(User).where(User.id == user_id).values(**update_data))
        self.db_session.commit()
        updated_user = self.get_user_by_id(user_id)
        return updated_user

    def delete_user(self, user_id: int) -> bool:
        """Deletes a user from the database."""
        result = self.db_session.execute(delete(User).where(User.id == user_id))
        self.db_session.commit()
        return result.rowcount > 0

    def list_users(self, skip: int = 0, limit: int = 100) -> list[UserInDB]:
        """Retrieves a list of all users."""
        users = self.db_session.execute(select(User).offset(skip).limit(limit)).scalars().all()
        return [UserInDB.from_orm(user) for user in users]

def get_user_repository() -> UserRepository:
    """Creates and returns a UserRepository instance with a database session."""
    db = next(get_db())
    return UserRepository(db)

# Human tasks:
# TODO: Implement proper error handling for database operations.
# TODO: Add logging for important operations and errors.
# TODO: Implement password hashing before storing user passwords.
# TODO: Consider adding methods for more complex queries if needed (e.g., searching users by criteria).
# TODO: Implement proper data validation before performing database operations.