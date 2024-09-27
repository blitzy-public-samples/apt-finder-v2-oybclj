import requests
import json
from datetime import datetime
from typing import List, Dict, Any

from apartment_finder.settings import ZILLOW_API_KEY
from api.models.listing import ApartmentListing

ZILLOW_API_BASE_URL = "https://api.zillow.com/v2/"

class ZillowService:
    """
    A service class for interacting with the Zillow API and processing apartment listing data.
    """

    def __init__(self):
        """
        Initializes the ZillowService with the Zillow API key from settings.
        """
        self.api_key = ZILLOW_API_KEY
        self.base_url = ZILLOW_API_BASE_URL

    def get_listings(self, params: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Fetches apartment listings from Zillow API based on given parameters.

        Args:
            params (Dict[str, Any]): A dictionary of query parameters for the API request.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing apartment listing data.

        Raises:
            requests.RequestException: If there's an error with the API request.
            json.JSONDecodeError: If there's an error decoding the JSON response.
        """
        endpoint = f"{self.base_url}listings"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.get(endpoint, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            return data.get("listings", [])
        except requests.RequestException as e:
            # Log the error and re-raise
            print(f"Error fetching listings from Zillow API: {str(e)}")
            raise
        except json.JSONDecodeError as e:
            # Log the error and re-raise
            print(f"Error decoding JSON response from Zillow API: {str(e)}")
            raise

    def process_listing(self, listing_data: Dict[str, Any]) -> ApartmentListing:
        """
        Processes a single listing from Zillow and converts it to an ApartmentListing object.

        Args:
            listing_data (Dict[str, Any]): A dictionary containing the listing data from Zillow API.

        Returns:
            ApartmentListing: An ApartmentListing object.
        """
        # Extract relevant data from the listing_data dictionary
        return ApartmentListing(
            zillow_id=listing_data.get("id"),
            date_on_market=datetime.strptime(listing_data.get("dateOnMarket"), "%Y-%m-%d").date(),
            rent=float(listing_data.get("rent", 0)),
            broker_fee=float(listing_data.get("brokerFee", 0)),
            square_footage=int(listing_data.get("squareFootage", 0)),
            bedrooms=int(listing_data.get("bedrooms", 0)),
            bathrooms=float(listing_data.get("bathrooms", 0)),
            available_date=datetime.strptime(listing_data.get("availableDate"), "%Y-%m-%d").date(),
            street_address=listing_data.get("streetAddress", ""),
            zillow_url=listing_data.get("zillowUrl", ""),
            zip_code=listing_data.get("zipCode", "")
        )

    def update_listings(self, zip_codes: List[str]) -> int:
        """
        Fetches new listings from Zillow and updates the database.

        Args:
            zip_codes (List[str]): A list of zip codes to fetch listings for.

        Returns:
            int: The number of new or updated listings.
        """
        new_or_updated_count = 0

        for zip_code in zip_codes:
            params = {
                "zip_code": zip_code,
                "home_type": "apartment",
                "limit": 100  # Adjust as needed
            }

            try:
                listings = self.get_listings(params)
                for listing_data in listings:
                    processed_listing = self.process_listing(listing_data)
                    
                    # Check if the listing already exists in the database
                    existing_listing = ApartmentListing.objects.filter(zillow_id=processed_listing.zillow_id).first()
                    
                    if existing_listing:
                        # Update the existing listing
                        for field, value in processed_listing.__dict__.items():
                            setattr(existing_listing, field, value)
                        existing_listing.save()
                    else:
                        # Create a new listing
                        processed_listing.save()
                    
                    new_or_updated_count += 1

            except (requests.RequestException, json.JSONDecodeError) as e:
                # Log the error and continue with the next zip code
                print(f"Error updating listings for zip code {zip_code}: {str(e)}")
                continue

        return new_or_updated_count

# TODO: Implement error handling and retries for API requests
# TODO: Add logging for API interactions and database updates
# TODO: Implement rate limiting to comply with Zillow API usage terms
# TODO: Add unit tests for the ZillowService class