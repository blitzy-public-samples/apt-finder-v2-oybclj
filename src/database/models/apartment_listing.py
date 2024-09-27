from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from src.database.config.database import Base

class ApartmentListing(Base):
    """
    Represents an apartment listing in the database.
    """
    __tablename__ = 'apartment_listings'

    id = Column(Integer, primary_key=True, index=True)
    date_on_market = Column(Date, nullable=False)
    rent = Column(Float, nullable=False)
    broker_fee = Column(Float)
    square_footage = Column(Integer)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Float, nullable=False)
    available_date = Column(Date)
    street_address = Column(String, nullable=False)
    zillow_url = Column(String)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    zipcode_id = Column(Integer, ForeignKey('zipcodes.id'), nullable=False)

    # Relationship
    zipcode = relationship("Zipcode", back_populates="listings")

    def __repr__(self):
        """
        Returns a string representation of the ApartmentListing instance.
        """
        return f"ApartmentListing(id={self.id}, address='{self.street_address}', rent=${self.rent})"

# Human tasks:
# TODO: Verify that the ApartmentListing model includes all necessary fields as per the project requirements.
# TODO: Ensure that appropriate indexes are created for fields that will be frequently queried (e.g., rent, bedrooms, bathrooms, zipcode_id).
# TODO: Implement any additional methods or properties that might be needed for business logic related to apartment listings.