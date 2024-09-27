from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from src.database.models.apartment_listing import ApartmentListing
from src.database.config.database import db

class ApartmentListingRepository:
    """Repository class for managing ApartmentListing entities in the database."""

    def create(self, listing: ApartmentListing) -> ApartmentListing:
        """
        Creates a new ApartmentListing in the database.

        Args:
            listing (ApartmentListing): The ApartmentListing instance to be created.

        Returns:
            ApartmentListing: The created ApartmentListing instance.
        """
        db.add(listing)
        db.commit()
        db.refresh(listing)
        return listing

    def get_by_id(self, listing_id: int) -> Optional[ApartmentListing]:
        """
        Retrieves an ApartmentListing by its ID.

        Args:
            listing_id (int): The ID of the ApartmentListing to retrieve.

        Returns:
            Optional[ApartmentListing]: The found ApartmentListing or None if not found.
        """
        return db.query(ApartmentListing).filter(ApartmentListing.id == listing_id).first()

    def get_all(self) -> List[ApartmentListing]:
        """
        Retrieves all ApartmentListings from the database.

        Returns:
            List[ApartmentListing]: A list of all ApartmentListing instances.
        """
        return db.query(ApartmentListing).all()

    def update(self, listing: ApartmentListing) -> ApartmentListing:
        """
        Updates an existing ApartmentListing in the database.

        Args:
            listing (ApartmentListing): The ApartmentListing instance to be updated.

        Returns:
            ApartmentListing: The updated ApartmentListing instance.
        """
        db.merge(listing)
        db.commit()
        db.refresh(listing)
        return listing

    def delete(self, listing: ApartmentListing) -> bool:
        """
        Deletes an ApartmentListing from the database.

        Args:
            listing (ApartmentListing): The ApartmentListing instance to be deleted.

        Returns:
            bool: True if the listing was successfully deleted, False otherwise.
        """
        try:
            db.delete(listing)
            db.commit()
            return True
        except Exception:
            db.rollback()
            return False

    def filter_listings(self, min_rent: Optional[float] = None, max_rent: Optional[float] = None,
                        min_bedrooms: Optional[int] = None, max_bedrooms: Optional[int] = None,
                        min_bathrooms: Optional[float] = None, max_bathrooms: Optional[float] = None,
                        zipcode: Optional[int] = None) -> List[ApartmentListing]:
        """
        Filters ApartmentListings based on given criteria.

        Args:
            min_rent (Optional[float]): Minimum rent.
            max_rent (Optional[float]): Maximum rent.
            min_bedrooms (Optional[int]): Minimum number of bedrooms.
            max_bedrooms (Optional[int]): Maximum number of bedrooms.
            min_bathrooms (Optional[float]): Minimum number of bathrooms.
            max_bathrooms (Optional[float]): Maximum number of bathrooms.
            zipcode (Optional[int]): Zipcode to filter by.

        Returns:
            List[ApartmentListing]: A list of ApartmentListing instances matching the criteria.
        """
        query = db.query(ApartmentListing)

        filters = []
        if min_rent is not None:
            filters.append(ApartmentListing.rent >= min_rent)
        if max_rent is not None:
            filters.append(ApartmentListing.rent <= max_rent)
        if min_bedrooms is not None:
            filters.append(ApartmentListing.bedrooms >= min_bedrooms)
        if max_bedrooms is not None:
            filters.append(ApartmentListing.bedrooms <= max_bedrooms)
        if min_bathrooms is not None:
            filters.append(ApartmentListing.bathrooms >= min_bathrooms)
        if max_bathrooms is not None:
            filters.append(ApartmentListing.bathrooms <= max_bathrooms)
        if zipcode is not None:
            filters.append(ApartmentListing.zipcode == zipcode)

        if filters:
            query = query.filter(and_(*filters))

        return query.all()

# Human tasks:
# TODO: Implement error handling and logging for database operations.
# TODO: Add pagination support for the get_all and filter_listings methods.
# TODO: Implement caching mechanism for frequently accessed listings.
# TODO: Add method for bulk insert/update of listings for improved performance when processing large datasets.