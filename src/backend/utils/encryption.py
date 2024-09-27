import os
from cryptography.fernet import Fernet
import base64

# Retrieve the secret key from environment variables
SECRET_KEY = os.environ.get('ENCRYPTION_SECRET_KEY')

def generate_key():
    """
    Generates a new Fernet key for encryption.

    Returns:
        str: A URL-safe base64-encoded 32-byte key.
    """
    return Fernet.generate_key().decode()

def encrypt_data(data: str) -> str:
    """
    Encrypts the given data using Fernet symmetric encryption.

    Args:
        data (str): The data to be encrypted.

    Returns:
        str: The encrypted data as a base64-encoded string.
    """
    if not SECRET_KEY:
        raise ValueError("ENCRYPTION_SECRET_KEY is not set in the environment variables")

    fernet = Fernet(SECRET_KEY)
    encrypted_data = fernet.encrypt(data.encode())
    return base64.urlsafe_b64encode(encrypted_data).decode()

def decrypt_data(encrypted_data: str) -> str:
    """
    Decrypts the given encrypted data using Fernet symmetric encryption.

    Args:
        encrypted_data (str): The encrypted data as a base64-encoded string.

    Returns:
        str: The decrypted data as a string.
    """
    if not SECRET_KEY:
        raise ValueError("ENCRYPTION_SECRET_KEY is not set in the environment variables")

    fernet = Fernet(SECRET_KEY)
    decrypted_data = fernet.decrypt(base64.urlsafe_b64decode(encrypted_data))
    return decrypted_data.decode()

# Human tasks (commented)
"""
Human Tasks:
1. Securely store and manage the ENCRYPTION_SECRET_KEY in the production environment (Critical)
2. Implement key rotation mechanism for enhanced security (Required)
3. Set up proper error handling for encryption/decryption failures (Required)
"""