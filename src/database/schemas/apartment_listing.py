from pydantic import BaseModel, Field
from datetime import date, datetime

class ApartmentListingSchema(BaseModel):
    id: int
    date_on_market: date
    rent: float
    broker_fee: float
    square_footage: int
    bedrooms: int
    bathrooms: float
    available_date: date
    street_address: str
    zillow_url: str
    created_at: datetime
    updated_at: datetime
    zipcode_id: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "date_on_market": "2023-05-01",
                "rent": 2500.00,
                "broker_fee": 2500.00,
                "square_footage": 800,
                "bedrooms": 2,
                "bathrooms": 1.5,
                "available_date": "2023-06-01",
                "street_address": "123 Main St, Anytown, USA",
                "zillow_url": "https://www.zillow.com/homedetails/123-main-st-anytown-usa-12345/6789_zpid/",
                "created_at": "2023-05-01T12:00:00",
                "updated_at": "2023-05-01T12:00:00",
                "zipcode_id": 12345
            }
        }

class ApartmentListingCreateSchema(BaseModel):
    date_on_market: date
    rent: float
    broker_fee: float
    square_footage: int
    bedrooms: int
    bathrooms: float
    available_date: date
    street_address: str
    zillow_url: str
    zipcode_id: int

class ApartmentListingUpdateSchema(BaseModel):
    date_on_market: date | None = None
    rent: float | None = None
    broker_fee: float | None = None
    square_footage: int | None = None
    bedrooms: int | None = None
    bathrooms: float | None = None
    available_date: date | None = None
    street_address: str | None = None
    zillow_url: str | None = None
    zipcode_id: int | None = None

# Human tasks:
# TODO: Review and adjust the field validators in the ApartmentListingSchema to ensure they match the business requirements (e.g., min/max values for rent, square footage, etc.).
# TODO: Consider adding custom validation methods for complex business rules if needed.
# TODO: Ensure that the example values in the Config class are representative and valid according to the project's requirements.