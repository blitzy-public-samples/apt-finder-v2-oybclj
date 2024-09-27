from django.db import models
from django.utils import timezone

class Subscription(models.Model):
    # Subscription status choices
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
        ('pending', 'Pending'),
    ]

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='subscriptions')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    paypal_subscription_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Subscription for {self.user.email} - {self.status}"

    def is_active(self):
        """
        Checks if the subscription is currently active.
        """
        now = timezone.now()
        return (
            self.start_date <= now <= self.end_date
            and self.status == 'active'
        )

    def days_until_expiration(self):
        """
        Calculates the number of days until the subscription expires.
        """
        if self.end_date < timezone.now():
            return 0
        return (self.end_date - timezone.now()).days

    def renew(self, days):
        """
        Renews the subscription for a specified number of days.
        """
        self.end_date = self.end_date + timezone.timedelta(days=days)
        self.status = 'active'
        self.save()

# Human tasks (commented)
"""
Human tasks:
1. Implement subscription renewal process with PayPal integration (Required)
2. Add email notifications for subscription expiration and renewal (Required)
3. Consider adding a grace period for expired subscriptions (Optional)
"""