from rest_framework import serializers
from src.backend.api.models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'start_date', 'end_date', 'status', 'paypal_subscription_id']

    def validate(self, data):
        """
        Custom validation method for the serializer.
        """
        # Perform any custom validation logic
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError("End date must be after start date.")
        
        # Add more custom validation as needed
        
        return data

    def create(self, validated_data):
        """
        Create and return a new Subscription instance.
        """
        return Subscription.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing Subscription instance.
        """
        instance.user = validated_data.get('user', instance.user)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.status = validated_data.get('status', instance.status)
        instance.paypal_subscription_id = validated_data.get('paypal_subscription_id', instance.paypal_subscription_id)
        instance.save()
        return instance

# Human tasks:
# TODO: Implement specific fields for the SubscriptionSerializer based on the Subscription model
# TODO: Add any custom validation logic in the validate method
# TODO: Implement any custom create or update logic if needed