import time
from redis import Redis
from django.conf import settings
from django.http import JsonResponse

# Global constants for rate limiting
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds

class RateLimiterMiddleware:
    """
    Middleware class that implements rate limiting for API requests
    """

    def __init__(self):
        """
        Initializes the RateLimiterMiddleware with a Redis client
        """
        self.redis_client = Redis.from_url(settings.REDIS_URL)

    def __call__(self, request):
        """
        Processes the request and applies rate limiting

        Args:
            request: The incoming HTTP request

        Returns:
            Response or None: Returns a 429 Too Many Requests response if rate limit is exceeded,
                              otherwise None to allow the request to proceed
        """
        client_ip = self.get_client_ip(request)

        if self.check_rate_limit(client_ip):
            return JsonResponse(
                {"error": "Rate limit exceeded. Please try again later."},
                status=429
            )

        self.increment_request_count(client_ip)
        return None

    def get_client_ip(self, request):
        """
        Extracts the client IP address from the request

        Args:
            request: The incoming HTTP request

        Returns:
            str: Client IP address
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def check_rate_limit(self, client_ip):
        """
        Checks if the client has exceeded the rate limit

        Args:
            client_ip (str): The client's IP address

        Returns:
            bool: True if rate limit exceeded, False otherwise
        """
        current_time = int(time.time())
        key = f"rate_limit:{client_ip}"
        request_count = self.redis_client.get(key)

        if request_count is None:
            return False

        return int(request_count) >= RATE_LIMIT_REQUESTS

    def increment_request_count(self, client_ip):
        """
        Increments the request count for a client

        Args:
            client_ip (str): The client's IP address

        Returns:
            None
        """
        current_time = int(time.time())
        key = f"rate_limit:{client_ip}"
        
        pipeline = self.redis_client.pipeline()
        pipeline.incr(key)
        pipeline.expire(key, RATE_LIMIT_WINDOW)
        pipeline.execute()

# Human tasks (commented)
"""
Human tasks:
1. Review and adjust the RATE_LIMIT_REQUESTS and RATE_LIMIT_WINDOW values based on expected traffic and server capacity (Required)
2. Implement logging for rate limit violations to monitor API abuse (Optional)
3. Consider implementing IP whitelisting for trusted clients or internal services (Optional)
"""