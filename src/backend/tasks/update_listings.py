import logging
from datetime import datetime
from typing import Dict, List

from celery import shared_task
from django.db import transaction

from api.models.listing import ApartmentListing
from api.models.zipcode import ZipCode
from services.zillow import ZillowService

logger = logging.getLogger(__name__)

@shared_task(name='update_listings')
def update_listings_task() -> Dict[str, int]:
    """
    Celery task to update apartment listings using the Zillow API.
    
    Returns:
        Dict[str, int]: A dictionary containing the task result with the number of updated listings.
    """
    logger.info("Starting apartment listings update process")
    
    try:
        zillow_service = ZillowService()
        
        # Retrieve all active ZipCode objects from the database
        active_zip_codes = ZipCode.objects.filter(is_active=True)
        zip_codes = [zc.code for zc in active_zip_codes]
        
        if not zip_codes:
            logger.warning("No active zip codes found. Skipping update.")
            return {"updated_listings": 0}
        
        # Call ZillowService to update listings
        updated_listings = zillow_service.update_listings(zip_codes)
        
        # Process and save the updated listings
        new_listings_count = _process_listings(updated_listings)
        
        logger.info(f"Successfully updated {new_listings_count} apartment listings")
        return {"updated_listings": new_listings_count}
    
    except Exception as e:
        logger.error(f"Error updating apartment listings: {str(e)}")
        raise

def _process_listings(listings: List[Dict]) -> int:
    """
    Process and save the updated listings to the database.
    
    Args:
        listings (List[Dict]): List of apartment listings from Zillow API.
    
    Returns:
        int: Number of new or updated listings.
    """
    new_listings_count = 0
    
    with transaction.atomic():
        for listing_data in listings:
            listing, created = ApartmentListing.objects.update_or_create(
                zillow_id=listing_data['zillow_id'],
                defaults={
                    'date_on_market': listing_data.get('date_on_market'),
                    'rent': listing_data.get('rent'),
                    'broker_fee': listing_data.get('broker_fee'),
                    'square_footage': listing_data.get('square_footage'),
                    'bedrooms': listing_data.get('bedrooms'),
                    'bathrooms': listing_data.get('bathrooms'),
                    'available_date': listing_data.get('available_date'),
                    'street_address': listing_data.get('street_address'),
                    'zillow_url': listing_data.get('zillow_url'),
                    'updated_at': datetime.now()
                }
            )
            
            if created:
                new_listings_count += 1
    
    return new_listings_count

# Human tasks (commented out):
"""
TODO: Configure Celery to run this task periodically (e.g., daily)
TODO: Implement error handling and retries for failed API requests
TODO: Add monitoring and alerting for task failures
TODO: Optimize the task for large datasets (e.g., batch processing)
"""