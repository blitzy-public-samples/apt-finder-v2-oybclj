from sqlalchemy import Column, String
from src.database.config.database import Base

class Zipcode(Base):
    """
    Represents a zip code area in the database.
    """
    __tablename__ = 'zipcodes'

    zipcode = Column(String, primary_key=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)

    def __init__(self, zipcode: str, city: str, state: str):
        """
        Initializes a new Zipcode instance.

        Args:
            zipcode (str): The zip code.
            city (str): The city associated with the zip code.
            state (str): The state associated with the zip code.
        """
        self.zipcode = zipcode
        self.city = city
        self.state = state

    def __repr__(self):
        return f"<Zipcode(zipcode='{self.zipcode}', city='{self.city}', state='{self.state}')>"

# Human tasks:
# TODO: Verify that the Zipcode model schema matches the database design specifications.
# TODO: Ensure that appropriate indexes are created for the zipcode field for optimized querying.
# TODO (Optional): Consider adding data validation for zipcode, city, and state fields (e.g., length constraints, format validation).