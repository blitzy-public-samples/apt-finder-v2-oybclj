from django.db import models
from django.utils import timezone
from .zipcode import ZipCode

class Listing(models.Model):
    """
    Represents an apartment listing in the Apartment Finder application.
    """
    id = models.BigAutoField(primary_key=True)
    date_on_market = models.DateField()
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    broker_fee = models.DecimalField(max_digits=10, decimal_places=2)
    square_footage = models.PositiveIntegerField()
    bedrooms = models.PositiveSmallIntegerField()
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
    available_date = models.DateField()
    street_address = models.CharField(max_length=255)
    zillow_url = models.URLField()
    zipcodes = models.ManyToManyField(ZipCode)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """
        Overrides the default save method to update timestamps.
        """
        self.updated_at = timezone.now()
        if not self.id:
            self.created_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Returns a string representation of the Listing.
        """
        return f"{self.street_address} - ${self.rent}"

# Human tasks:
# TODO: Review and adjust the max_length for CharField fields based on expected data
# TODO: Consider adding indexes to fields that will be frequently queried
# TODO: Implement data validation for fields like rent, square_footage, etc.