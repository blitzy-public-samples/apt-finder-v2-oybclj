from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database.config.database import Base
from src.database.models.user import User

class Subscription(Base):
    """
    Represents a user subscription in the Apartment Finder application.
    """
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String(20), nullable=False)
    paypal_subscription_id = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    user = relationship("User", back_populates="subscriptions")

    def __init__(self, user_id, start_date, end_date, status, paypal_subscription_id):
        """
        Initializes a new Subscription instance.
        """
        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        self.status = status
        self.paypal_subscription_id = paypal_subscription_id

    def to_dict(self):
        """
        Converts the Subscription instance to a dictionary representation.
        """
        return {
            'id': self.id,
            'user_id': self.user_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'status': self.status,
            'paypal_subscription_id': self.paypal_subscription_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

    def is_active(self):
        """
        Checks if the subscription is currently active.
        """
        now = datetime.utcnow()
        return self.start_date <= now <= self.end_date and self.status == 'active'

    def update_status(self, new_status):
        """
        Updates the status of the subscription.
        """
        self.status = new_status
        self.updated_at = datetime.utcnow()

# Human tasks:
# TODO: Implement logic to handle subscription renewal process.
# TODO: Add method to calculate remaining days in the subscription.
# TODO: Implement a method to handle subscription cancellation.
# TODO: Consider adding a method to upgrade/downgrade subscription plans if applicable.