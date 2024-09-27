from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.models.subscription import Subscription
from api.serializers.subscription import SubscriptionSerializer
from services.paypal import PayPalService

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_subscription(request):
    """
    Creates a new subscription for the authenticated user
    """
    serializer = SubscriptionSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Create a PayPal subscription
            paypal_service = PayPalService()
            paypal_subscription = paypal_service.create_subscription(request.data)
            
            # Create a new Subscription object in the database
            subscription = serializer.save(
                user=request.user,
                paypal_subscription_id=paypal_subscription['id']
            )
            
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_subscriptions(request):
    """
    Retrieves all subscriptions for the authenticated user
    """
    subscriptions = Subscription.objects.filter(user=request.user)
    serializer = SubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_subscription(request, subscription_id):
    """
    Updates an existing subscription for the authenticated user
    """
    subscription = get_object_or_404(Subscription, id=subscription_id, user=request.user)
    serializer = SubscriptionSerializer(subscription, data=request.data, partial=True)
    
    if serializer.is_valid():
        try:
            # Update the PayPal subscription
            paypal_service = PayPalService()
            paypal_service.update_subscription(subscription.paypal_subscription_id, request.data)
            
            # Update the Subscription object in the database
            updated_subscription = serializer.save()
            
            return Response(SubscriptionSerializer(updated_subscription).data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def cancel_subscription(request, subscription_id):
    """
    Cancels an existing subscription for the authenticated user
    """
    subscription = get_object_or_404(Subscription, id=subscription_id, user=request.user)
    
    try:
        # Cancel the PayPal subscription
        paypal_service = PayPalService()
        paypal_service.cancel_subscription(subscription.paypal_subscription_id)
        
        # Update the Subscription object status to 'cancelled' in the database
        subscription.status = 'cancelled'
        subscription.save()
        
        return Response({'message': 'Subscription cancelled successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def handle_paypal_webhook(request):
    """
    Handles PayPal webhook events for subscription-related updates
    """
    try:
        paypal_service = PayPalService()
        event = paypal_service.verify_webhook_signature(request.data)
        
        # Process different event types
        if event['event_type'] == 'BILLING.SUBSCRIPTION.CREATED':
            # Handle subscription created event
            pass
        elif event['event_type'] == 'BILLING.SUBSCRIPTION.UPDATED':
            # Handle subscription updated event
            pass
        elif event['event_type'] == 'BILLING.SUBSCRIPTION.CANCELLED':
            # Handle subscription cancelled event
            pass
        
        # Update the corresponding Subscription object in the database
        subscription = Subscription.objects.get(paypal_subscription_id=event['resource']['id'])
        subscription.status = event['resource']['status']
        subscription.save()
        
        return Response({'message': 'Webhook processed successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Human tasks:
# TODO: Implement proper error handling and logging for PayPal API interactions
# TODO: Set up PayPal webhook endpoint in the production environment
# TODO: Implement unit tests for all subscription-related view functions