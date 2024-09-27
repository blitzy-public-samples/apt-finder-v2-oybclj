from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any
from datetime import datetime

class FilterBase(BaseModel):
    name: str = Field(..., description="Name of the filter")
    criteria: Dict[str, Any] = Field(..., description="Criteria for filtering apartments")

    @validator('criteria', pre=True)
    def validate_criteria(cls, criteria: Dict[str, Any]) -> Dict[str, Any]:
        if not isinstance(criteria, dict):
            raise ValueError("Criteria must be a dictionary")

        valid_keys = {"min_rent", "max_rent", "min_bedrooms", "max_bedrooms", "min_bathrooms", "max_bathrooms", "min_square_footage", "max_square_footage", "zip_codes"}
        for key in criteria.keys():
            if key not in valid_keys:
                raise ValueError(f"Invalid criteria key: {key}")

        # Validate numeric values
        for key in ["min_rent", "max_rent", "min_bedrooms", "max_bedrooms", "min_bathrooms", "max_bathrooms", "min_square_footage", "max_square_footage"]:
            if key in criteria:
                try:
                    criteria[key] = float(criteria[key])
                    if criteria[key] < 0:
                        raise ValueError(f"{key} must be non-negative")
                except ValueError:
                    raise ValueError(f"Invalid value for {key}: must be a non-negative number")

        # Validate zip codes
        if "zip_codes" in criteria:
            if not isinstance(criteria["zip_codes"], list):
                raise ValueError("zip_codes must be a list")
            for zip_code in criteria["zip_codes"]:
                if not isinstance(zip_code, str) or not zip_code.isdigit() or len(zip_code) != 5:
                    raise ValueError(f"Invalid zip code: {zip_code}")

        return criteria

    class Config:
        schema_extra = {
            "example": {
                "name": "My Filter",
                "criteria": {
                    "min_rent": 1000,
                    "max_rent": 2000,
                    "min_bedrooms": 2,
                    "max_bedrooms": 3,
                    "min_bathrooms": 1,
                    "max_bathrooms": 2,
                    "min_square_footage": 800,
                    "max_square_footage": 1200,
                    "zip_codes": ["12345", "67890"]
                }
            }
        }

class FilterCreate(FilterBase):
    user_id: int = Field(..., description="ID of the user creating the filter")

class FilterUpdate(BaseModel):
    name: Optional[str] = Field(None, description="Updated name of the filter")
    criteria: Optional[Dict[str, Any]] = Field(None, description="Updated criteria for filtering apartments")

    @validator('criteria', pre=True)
    def validate_criteria(cls, criteria: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        if criteria is None:
            return None
        return FilterBase.validate_criteria(criteria)

class FilterInDB(FilterBase):
    id: int = Field(..., description="Unique identifier for the filter")
    user_id: int = Field(..., description="ID of the user who created the filter")
    created_at: datetime = Field(..., description="Timestamp when the filter was created")
    updated_at: datetime = Field(..., description="Timestamp when the filter was last updated")

    class Config:
        orm_mode = True

# Human tasks:
# TODO: Review and adjust the criteria validation logic in the validate_criteria method to ensure it covers all possible filter parameters and their valid ranges.
# TODO: Consider adding custom error messages for validation failures to provide more user-friendly feedback.
# TODO: Implement unit tests for the FilterBase, FilterCreate, FilterUpdate, and FilterInDB models to ensure proper validation and behavior.