from rest_framework import serializers
from src.backend.api.models.filter import Filter

class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation method for the serializer.
        """
        # Perform custom validation on the input data
        if not any(data.values()):
            raise serializers.ValidationError("At least one filter criterion must be provided.")

        # Check if the combination of filter criteria is valid
        # (This is a placeholder - implement specific logic based on your requirements)

        # Validate that the rent range is logical (min_rent < max_rent)
        if 'min_rent' in data and 'max_rent' in data:
            if data['min_rent'] >= data['max_rent']:
                raise serializers.ValidationError("Minimum rent must be less than maximum rent.")

        # Verify that the number of bedrooms and bathrooms are non-negative
        for field in ['bedrooms', 'bathrooms']:
            if field in data and data[field] < 0:
                raise serializers.ValidationError(f"{field.capitalize()} must be non-negative.")

        # Check if the provided zip codes are valid
        # (This is a placeholder - implement specific logic based on your requirements)
        if 'zip_codes' in data:
            # Add zip code validation logic here
            pass

        return data

    def create(self, validated_data):
        """
        Create and return a new Filter instance.
        """
        return Filter.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing Filter instance.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# Human tasks:
# TODO: Implement the Filter model in src/backend/api/models/filter.py
# TODO: Review and adjust the FilterSerializer fields based on the actual Filter model implementation
# TODO: Implement custom validation logic in the validate method if needed