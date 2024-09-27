from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from src.backend.api.models.user import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class for the User model
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'created_at', 'last_login']
        read_only_fields = ['id', 'created_at', 'last_login']

    def create(self, validated_data):
        """
        Creates a new User instance
        """
        # Extract user data from validated_data
        email = validated_data.get('email')
        password = validated_data.get('password')

        # Create a new User instance with the extracted data
        user = User(email=email)

        # Set the password for the new user
        user.password = make_password(password)

        # Save the user instance
        user.save()

        return user

    def update(self, instance, validated_data):
        """
        Updates an existing User instance
        """
        # Update user fields with validated_data
        for attr, value in validated_data.items():
            if attr == 'password':
                # If password is in validated_data, set the new password
                instance.password = make_password(value)
            else:
                setattr(instance, attr, value)

        # Save the updated user instance
        instance.save()

        return instance

    def validate_email(self, value):
        """
        Validate email format
        """
        # Add custom email validation logic here
        if not value or '@' not in value:
            raise serializers.ValidationError("Invalid email format")
        return value

    def validate_password(self, value):
        """
        Validate password strength
        """
        # Add custom password strength validation logic here
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value

# Human tasks:
# TODO: Review and adjust the UserSerializer fields based on the actual User model structure
# TODO: Implement proper password hashing in create and update methods
# TODO: Add validation for user fields (e.g., email format, password strength)