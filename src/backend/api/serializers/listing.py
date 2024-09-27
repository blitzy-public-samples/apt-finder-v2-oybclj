from rest_framework import serializers
from src.backend.api.models import Listing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'date_on_market', 'rent', 'broker_fee', 'square_footage', 'bedrooms', 'bathrooms', 'available_date', 'street_address', 'zillow_url', 'created_at', 'updated_at']

    def validate_rent(self, value):
        """
        Custom validation method for the rent field.
        """
        if value <= 0:
            raise serializers.ValidationError("Rent must be a positive value.")
        return value

    def validate_square_footage(self, value):
        """
        Custom validation method for the square_footage field.
        """
        if value <= 0:
            raise serializers.ValidationError("Square footage must be a positive value.")
        return value

# Human Tasks:
# TODO: Review and adjust the fields in the Meta class based on the actual Listing model structure
# TODO: Implement additional custom validation methods if needed
# TODO: Add any necessary field-level validators