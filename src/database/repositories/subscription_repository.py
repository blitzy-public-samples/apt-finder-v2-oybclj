from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional

from src.database.models.subscription import Subscription
from src.database.schemas.subscription import SubscriptionCreate, SubscriptionUpdate, SubscriptionSchema
from src.database.config.database import Base

class SubscriptionRepository:
    """Repository class for handling Subscription-related database operations."""

    def __init__(self, db_session: Session):
        """Initializes a new SubscriptionRepository instance."""
        self.db_session = db_session

    def create_subscription(self, subscription_data: SubscriptionCreate) -> SubscriptionSchema:
        """Creates a new subscription in the database."""
        new_subscription = Subscription(**subscription_data.dict())
        self.db_session.add(new_subscription)
        self.db_session.commit()
        self.db_session.refresh(new_subscription)
        return SubscriptionSchema.from_orm(new_subscription)

    def get_subscription(self, subscription_id: int) -> Optional[SubscriptionSchema]:
        """Retrieves a subscription by its ID."""
        subscription = self.db_session.query(Subscription).filter(Subscription.id == subscription_id).first()
        return SubscriptionSchema.from_orm(subscription) if subscription else None

    def get_user_subscriptions(self, user_id: int) -> List[SubscriptionSchema]:
        """Retrieves all subscriptions for a given user."""
        subscriptions = self.db_session.query(Subscription).filter(Subscription.user_id == user_id).all()
        return [SubscriptionSchema.from_orm(sub) for sub in subscriptions]

    def update_subscription(self, subscription_id: int, subscription_data: SubscriptionUpdate) -> Optional[SubscriptionSchema]:
        """Updates an existing subscription in the database."""
        subscription = self.db_session.query(Subscription).filter(Subscription.id == subscription_id).first()
        if subscription:
            for key, value in subscription_data.dict(exclude_unset=True).items():
                setattr(subscription, key, value)
            self.db_session.commit()
            self.db_session.refresh(subscription)
            return SubscriptionSchema.from_orm(subscription)
        return None

    def delete_subscription(self, subscription_id: int) -> bool:
        """Deletes a subscription from the database."""
        subscription = self.db_session.query(Subscription).filter(Subscription.id == subscription_id).first()
        if subscription:
            self.db_session.delete(subscription)
            self.db_session.commit()
            return True
        return False

    def get_active_subscriptions(self) -> List[SubscriptionSchema]:
        """Retrieves all active subscriptions."""
        active_subscriptions = self.db_session.query(Subscription).filter(
            Subscription.status == 'active',
            Subscription.end_date > datetime.utcnow()
        ).all()
        return [SubscriptionSchema.from_orm(sub) for sub in active_subscriptions]

    def update_subscription_status(self, subscription_id: int, new_status: str) -> Optional[SubscriptionSchema]:
        """Updates the status of a subscription."""
        subscription = self.db_session.query(Subscription).filter(Subscription.id == subscription_id).first()
        if subscription:
            subscription.status = new_status
            subscription.updated_at = datetime.utcnow()
            self.db_session.commit()
            self.db_session.refresh(subscription)
            return SubscriptionSchema.from_orm(subscription)
        return None

# Human tasks:
# TODO: Implement error handling and logging for database operations.
# TODO: Add unit tests for each method in the SubscriptionRepository class.
# TODO: Implement a method to handle subscription renewals.
# TODO: Consider adding a method to retrieve subscriptions that are about to expire for notification purposes.
# TODO: Implement database transaction management to ensure data consistency across operations.