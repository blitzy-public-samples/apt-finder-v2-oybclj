import re
from datetime import datetime

# Regular expression patterns for validation
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
PASSWORD_REGEX = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$'
ZIPCODE_REGEX = r'^\d{5}(?:-\d{4})?$'

def validate_email(email: str) -> bool:
    """
    Validates if the given string is a valid email address.

    Args:
        email (str): The email address to validate.

    Returns:
        bool: True if the email is valid, False otherwise.
    """
    return bool(re.match(EMAIL_REGEX, email))

def validate_password(password: str) -> bool:
    """
    Validates if the given string meets the password requirements.

    Password requirements:
    - At least 12 characters long
    - Contains at least one lowercase letter
    - Contains at least one uppercase letter
    - Contains at least one digit
    - Contains at least one special character (@$!%*?&)

    Args:
        password (str): The password to validate.

    Returns:
        bool: True if the password is valid, False otherwise.
    """
    return bool(re.match(PASSWORD_REGEX, password))

def validate_zipcode(zipcode: str) -> bool:
    """
    Validates if the given string is a valid US zipcode.

    Valid formats:
    - 5 digits (e.g., 12345)
    - 5 digits + hyphen + 4 digits (e.g., 12345-6789)

    Args:
        zipcode (str): The zipcode to validate.

    Returns:
        bool: True if the zipcode is valid, False otherwise.
    """
    return bool(re.match(ZIPCODE_REGEX, zipcode))

def validate_date(date_string: str) -> bool:
    """
    Validates if the given string is a valid date in the format YYYY-MM-DD.

    Args:
        date_string (str): The date string to validate.

    Returns:
        bool: True if the date is valid, False otherwise.
    """
    try:
        datetime.strptime(date_string, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_price(price: float) -> bool:
    """
    Validates if the given value is a valid price (positive float with two decimal places).

    Args:
        price (float): The price to validate.

    Returns:
        bool: True if the price is valid, False otherwise.
    """
    if price <= 0:
        return False
    
    # Check if the price has at most two decimal places
    return len(str(price).split('.')[-1]) <= 2

# Human tasks:
# TODO: Review and adjust regex patterns for email, password, and zipcode validation if needed
# TODO: Add any additional validation functions specific to the Apartment Finder application