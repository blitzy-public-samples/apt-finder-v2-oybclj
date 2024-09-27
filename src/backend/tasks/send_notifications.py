import logging
from celery import shared_task
from datetime import datetime, timedelta
from django.db.models import Q
from api.models.user import User
from api.models.filter import Filter
from api.models.listing import ApartmentListing
from utils.email_sender import send_email

logger = logging.getLogger(__name__)

@shared_task
def send_notifications_task():
    """
    Celery task to send notifications to users about new apartment listings matching their filters.
    """
    logger.info("Starting send_notifications_task")

    try:
        # Get all active users with filters
        active_users = User.objects.filter(is_active=True, filters__isnull=False).distinct()

        for user in active_users:
            # Get user's filters
            user_filters = Filter.objects.filter(user=user)

            # Find new listings matching the filters since last notification
            new_listings = []
            for user_filter in user_filters:
                filter_query = Q()
                if user_filter.min_price:
                    filter_query &= Q(rent__gte=user_filter.min_price)
                if user_filter.max_price:
                    filter_query &= Q(rent__lte=user_filter.max_price)
                if user_filter.bedrooms:
                    filter_query &= Q(bedrooms__gte=user_filter.bedrooms)
                if user_filter.bathrooms:
                    filter_query &= Q(bathrooms__gte=user_filter.bathrooms)
                if user_filter.zip_codes:
                    filter_query &= Q(zip_code__in=user_filter.zip_codes)

                last_notification = user.last_notification or datetime.min
                new_filter_listings = ApartmentListing.objects.filter(
                    filter_query,
                    created_at__gt=last_notification
                )
                new_listings.extend(new_filter_listings)

            if new_listings:
                # Prepare email content with new listings
                email_content = prepare_email_content(user, new_listings)

                # Send email notification to user
                send_email(
                    to_email=user.email,
                    subject="New Apartment Listings Matching Your Filters",
                    content=email_content
                )

                # Update user's last notification timestamp
                user.last_notification = datetime.now()
                user.save()

        logger.info("Completed send_notifications_task successfully")
    except Exception as e:
        logger.error(f"Error in send_notifications_task: {str(e)}")

def prepare_email_content(user, listings):
    """
    Prepare the email content with the new listings.
    """
    content = f"Hello {user.first_name},\n\n"
    content += "We've found new apartment listings that match your filters:\n\n"

    for listing in listings:
        content += f"- {listing.title}\n"
        content += f"  Price: ${listing.rent}/month\n"
        content += f"  Bedrooms: {listing.bedrooms}, Bathrooms: {listing.bathrooms}\n"
        content += f"  Address: {listing.address}\n"
        content += f"  More info: {listing.url}\n\n"

    content += "Log in to your account to view more details and update your filters.\n\n"
    content += "Best regards,\nThe Apartment Finder Team"

    return content

# TODO: Implement email templates for notifications
# TODO: Set up Celery beat schedule for periodic execution of this task
# TODO: Verify that the email sending functionality is properly configured