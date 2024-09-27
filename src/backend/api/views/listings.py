from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from ..serializers.listing import ListingSerializer
from ..models.listing import ApartmentListing

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_listings(request):
    """
    Retrieves a list of apartment listings based on filter criteria
    """
    # Extract filter parameters from request.query_params
    min_rent = request.query_params.get('min_rent')
    max_rent = request.query_params.get('max_rent')
    min_bedrooms = request.query_params.get('min_bedrooms')
    min_bathrooms = request.query_params.get('min_bathrooms')
    min_square_footage = request.query_params.get('min_square_footage')
    max_square_footage = request.query_params.get('max_square_footage')
    zip_codes = request.query_params.getlist('zip_codes')

    # Construct a Q object for filtering based on the parameters
    filter_query = Q()
    if min_rent:
        filter_query &= Q(rent__gte=float(min_rent))
    if max_rent:
        filter_query &= Q(rent__lte=float(max_rent))
    if min_bedrooms:
        filter_query &= Q(bedrooms__gte=int(min_bedrooms))
    if min_bathrooms:
        filter_query &= Q(bathrooms__gte=float(min_bathrooms))
    if min_square_footage:
        filter_query &= Q(square_footage__gte=int(min_square_footage))
    if max_square_footage:
        filter_query &= Q(square_footage__lte=int(max_square_footage))
    if zip_codes:
        filter_query &= Q(zip_code__in=zip_codes)

    # Query the ApartmentListing model with the constructed filter
    listings = ApartmentListing.objects.filter(filter_query)

    # Serialize the queryset
    serializer = ListingSerializer(listings, many=True)

    # Return the serialized data in the response
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_listing_detail(request, listing_id):
    """
    Retrieves details of a specific apartment listing
    """
    try:
        # Retrieve the ApartmentListing object with the given listing_id
        listing = ApartmentListing.objects.get(id=listing_id)
    except ApartmentListing.DoesNotExist:
        # If not found, return a 404 response
        return Response({"error": "Listing not found"}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the listing object
    serializer = ListingSerializer(listing)

    # Return the serialized data in the response
    return Response(serializer.data)

# Human tasks (commented out):
# TODO: Implement pagination for the get_listings function to handle large datasets
# TODO: Add error handling for invalid filter parameters in get_listings function
# TODO: Implement caching mechanism for frequently accessed listings (Optional)