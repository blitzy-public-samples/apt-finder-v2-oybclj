import os

# Redis configuration settings

# Redis host - default to 'localhost' if not set in environment
REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')

# Redis port - default to 6379 if not set in environment
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))

# Redis database - default to 0 if not set in environment
REDIS_DB = int(os.getenv('REDIS_DB', 0))

# Redis password - default to None if not set in environment
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)

# Construct Redis URL
REDIS_URL = f'redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}'

def get_redis_config():
    """
    Returns a dictionary containing Redis configuration settings.

    Returns:
        dict: A dictionary with Redis configuration parameters.
    """
    return {
        'host': REDIS_HOST,
        'port': REDIS_PORT,
        'db': REDIS_DB,
        'password': REDIS_PASSWORD,
        'url': REDIS_URL
    }

# Human tasks:
# TODO: Review and confirm the default Redis configuration values
# TODO: Ensure that sensitive information (like passwords) are properly handled and not exposed
# TODO: Verify that the Redis configuration is compatible with the chosen Redis version and deployment strategy