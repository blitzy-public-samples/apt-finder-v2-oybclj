from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.models.filter import Filter
from api.serializers.filter import FilterSerializer

class FilterListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieves all filters for the authenticated user
        """
        filters = Filter.objects.filter(user=request.user)
        serializer = FilterSerializer(filters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Creates a new filter for the authenticated user
        """
        serializer = FilterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FilterDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, filter_id, user):
        """
        Helper method to get the filter object
        """
        try:
            return Filter.objects.get(id=filter_id, user=user)
        except Filter.DoesNotExist:
            return None

    def get(self, request, filter_id):
        """
        Retrieves a specific filter for the authenticated user
        """
        filter_obj = self.get_object(filter_id, request.user)
        if filter_obj is None:
            return Response({"error": "Filter not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = FilterSerializer(filter_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, filter_id):
        """
        Updates a specific filter for the authenticated user
        """
        filter_obj = self.get_object(filter_id, request.user)
        if filter_obj is None:
            return Response({"error": "Filter not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = FilterSerializer(filter_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, filter_id):
        """
        Deletes a specific filter for the authenticated user
        """
        filter_obj = self.get_object(filter_id, request.user)
        if filter_obj is None:
            return Response({"error": "Filter not found"}, status=status.HTTP_404_NOT_FOUND)
        filter_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)