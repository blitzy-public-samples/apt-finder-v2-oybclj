import React, { useState, useEffect } from 'react';
import { Button } from '../Common/Button';
import { subscriptionService } from '../../services/subscriptions';
import { Subscription } from '../../types/subscription';
import { formatDate } from '../../utils/formatting';
import { useSubscriptions } from '../../hooks/useSubscriptions';

interface SubscriptionDetailsProps {
  subscriptionId: string;
  onUpdate: () => void;
}

export const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscriptionId, onUpdate }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getSubscription, cancelSubscription } = useSubscriptions();

  useEffect(() => {
    fetchSubscriptionDetails();
  }, [subscriptionId]);

  const fetchSubscriptionDetails = async () => {
    setLoading(true);
    try {
      const data = await getSubscription(subscriptionId);
      setSubscription(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch subscription details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    const confirmed = window.confirm('Are you sure you want to cancel your subscription?');
    if (!confirmed) return;

    try {
      await cancelSubscription(subscription.id);
      onUpdate();
      setSubscription(prev => prev ? { ...prev, status: 'cancelled' } : null);
    } catch (err) {
      setError('Failed to cancel subscription. Please try again.');
    }
  };

  const formatSubscriptionStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return <div>Loading subscription details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!subscription) {
    return <div>No subscription found.</div>;
  }

  return (
    <div className="subscription-details">
      <h2>Subscription Details</h2>
      <div className="subscription-info">
        <p><strong>Status:</strong> {formatSubscriptionStatus(subscription.status)}</p>
        <p><strong>Start Date:</strong> {formatDate(subscription.startDate)}</p>
        <p><strong>End Date:</strong> {formatDate(subscription.endDate)}</p>
        <p><strong>PayPal Subscription ID:</strong> {subscription.paypalSubscriptionId}</p>
      </div>
      {subscription.status === 'active' && (
        <Button onClick={handleCancelSubscription}>Cancel Subscription</Button>
      )}
    </div>
  );
};

// Human tasks:
// TODO: Implement proper error handling for failed API calls
// TODO: Add unit tests for the SubscriptionDetails component
// TODO: Implement accessibility features (ARIA labels, keyboard navigation)
// TODO: Add analytics tracking for subscription management actions