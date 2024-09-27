from pydantic import BaseModel, Field
from src.database.models.zipcode import Zipcode

class ZipcodeSchema(BaseModel):
    """
    Pydantic schema for the Zipcode model, defining the structure and validation rules for zipcode data.
    """
    zipcode: str = Field(..., description="The zipcode")
    city: str = Field(..., description="The city associated with the zipcode")
    state: str = Field(..., description="The state associated with the zipcode")

    class Config:
        orm_mode = True

    @classmethod
    def from_orm(cls, zipcode_model: Zipcode) -> 'ZipcodeSchema':
        """
        Creates a ZipcodeSchema instance from a Zipcode ORM model instance.

        Args:
            zipcode_model (Zipcode): A Zipcode ORM model instance

        Returns:
            ZipcodeSchema: A ZipcodeSchema instance created from the ORM model
        """
        return cls(
            zipcode=zipcode_model.zipcode,
            city=zipcode_model.city,
            state=zipcode_model.state
        )

# Human tasks:
# TODO: Review and adjust field validators for zipcode, city, and state if necessary (e.g., adding regex patterns, length constraints).
# TODO: Consider adding example values or descriptions to the Pydantic fields for better API documentation.
# TODO: Verify that the ZipcodeSchema matches the Zipcode model and meets all API requirements.