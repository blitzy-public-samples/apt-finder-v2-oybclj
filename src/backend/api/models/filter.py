from django.db import models
from django.utils import timezone
from .user import User
from .zipcode import Zipcode

class Filter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='filters')
    name = models.CharField(max_length=255)
    zipcodes = models.ManyToManyField(Zipcode, related_name='filters')
    min_rent = models.DecimalField(max_digits=10, decimal_places=2)
    max_rent = models.DecimalField(max_digits=10, decimal_places=2)
    min_bedrooms = models.IntegerField()
    max_bedrooms = models.IntegerField()
    min_bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
    max_bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
    min_square_footage = models.IntegerField()
    max_square_footage = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.user.email}"

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def get_zipcodes(self):
        return list(self.zipcodes.values_list('zipcode', flat=True))

# Human tasks:
# TODO: Implement validation for min/max values to ensure min is always less than or equal to max
# TODO: Consider adding additional filter criteria such as pet-friendliness or amenities
# TODO: Implement a method to convert the filter to a queryable format for apartment listings