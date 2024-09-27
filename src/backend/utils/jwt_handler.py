import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict
import os

# Global variables
SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(user_id: str, expires_delta: Optional[timedelta] = None) -> str:
    """
    Creates a new JWT access token for a given user ID.

    Args:
        user_id (str): The ID of the user for whom the token is being created.
        expires_delta (Optional[timedelta]): Custom expiration time for the token.

    Returns:
        str: JWT access token.
    """
    # Create a copy of the token data
    to_encode = {"sub": str(user_id)}

    # Set the expiration time
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    # Encode the JWT using the secret key and specified algorithm
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def decode_access_token(token: str) -> Dict:
    """
    Decodes and verifies a JWT access token.

    Args:
        token (str): The JWT token to be decoded and verified.

    Returns:
        dict: Decoded token payload.

    Raises:
        jwt.ExpiredSignatureError: If the token has expired.
        jwt.InvalidTokenError: If the token is invalid.
    """
    try:
        # Attempt to decode the token using the secret key and algorithm
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Verify the token's expiration
        if datetime.fromtimestamp(payload['exp']) < datetime.utcnow():
            raise jwt.ExpiredSignatureError("Token has expired")

        return payload
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("Token has expired")
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError("Invalid token")

def get_current_user(token: str) -> Dict:
    """
    Retrieves the current user based on the provided JWT token.

    Args:
        token (str): The JWT token containing user information.

    Returns:
        dict: User information.

    Raises:
        ValueError: If the token is invalid or the user is not found.
    """
    try:
        # Decode the access token
        payload = decode_access_token(token)

        # Extract the user ID from the decoded payload
        user_id = payload.get("sub")

        if user_id is None:
            raise ValueError("Invalid token: User ID not found")

        # TODO: Implement user retrieval from the database
        # This is a placeholder. In a real implementation, you would query your database
        # to get the user information based on the user_id.
        user_info = {
            "id": user_id,
            "email": f"user_{user_id}@example.com",
            # Add other user fields as needed
        }

        if not user_info:
            raise ValueError("User not found")

        return user_info
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as e:
        raise ValueError(str(e))

# Human tasks (commented)
"""
Human tasks:
1. Ensure the JWT_SECRET_KEY is securely set in the environment variables (Critical)
2. Implement proper error handling for token validation failures (Required)
3. Consider implementing token refresh functionality (Optional)
"""