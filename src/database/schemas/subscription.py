from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from src.database.config.database import Base

class SubscriptionBase(BaseModel):
    user_id: int = Field(..., description="ID of the user associated with this subscription")
    start_date: datetime = Field(..., description="Start date of the subscription")
    end_date: datetime = Field(..., description="End date of the subscription")
    status: str = Field(..., description="Current status of the subscription")
    paypal_subscription_id: str = Field(..., description="PayPal subscription ID for this subscription")

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionUpdate(BaseModel):
    end_date: Optional[datetime] = Field(None, description="New end date for the subscription")
    status: Optional[str] = Field(None, description="New status for the subscription")

class SubscriptionInDB(SubscriptionBase):
    id: int = Field(..., description="Unique identifier for the subscription")
    created_at: datetime = Field(..., description="Timestamp when the subscription was created")
    updated_at: datetime = Field(..., description="Timestamp when the subscription was last updated")

    class Config:
        orm_mode = True

class SubscriptionSchema(SubscriptionInDB):
    def is_active(self) -> bool:
        """
        Checks if the subscription is currently active.
        
        Returns:
            bool: True if the subscription is active, False otherwise
        """
        now = datetime.now()
        return self.start_date <= now <= self.end_date and self.status == 'active'

    def remaining_days(self) -> int:
        """
        Calculates the number of days remaining in the subscription.
        
        Returns:
            int: The number of days remaining in the subscription
        """
        now = datetime.now()
        if now > self.end_date:
            return 0
        return (self.end_date - now).days

# Human tasks:
# TODO: Review and adjust the field validators for each Pydantic model to ensure proper data validation.
# TODO: Implement additional methods in SubscriptionSchema if needed for specific business logic.
# TODO: Add example values for each field using the Field(..., example='value') syntax for better API documentation.