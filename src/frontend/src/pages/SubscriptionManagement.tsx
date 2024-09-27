import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionForm from '../components/Subscriptions/SubscriptionForm';
import SubscriptionDetails from '../components/Subscriptions/SubscriptionDetails';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import useSubscriptions from '../hooks/useSubscriptions';
import { Subscription } from '../types/subscription';

const SubscriptionManagement: React.FC = () => {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const navigate = useNavigate();
  const { fetchSubscription, createSubscription, updateSubscription, cancelSubscription } = useSubscriptions();

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const subscription = await fetchSubscription();
        setCurrentSubscription(subscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        // TODO: Display error message to user
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, [fetchSubscription]);

  const handleCreateSubscription = async (newSubscription: Subscription) => {
    try {
      const createdSubscription = await createSubscription(newSubscription);
      setCurrentSubscription(createdSubscription);
      setShowModal(false);
      // TODO: Display success message to user
    } catch (error) {
      console.error('Error creating subscription:', error);
      // TODO: Display error message to user
    }
  };

  const handleUpdateSubscription = async () => {
    try {
      const updatedSubscription = await updateSubscription();
      setCurrentSubscription(updatedSubscription);
      // TODO: Display success message to user
    } catch (error) {
      console.error('Error updating subscription:', error);
      // TODO: Display error message to user
    }
  };

  const handleCancelSubscription = async () => {
    setModalContent(
      <div>
        <h2>Confirm Cancellation</h2>
        <p>Are you sure you want to cancel your subscription?</p>
        <Button onClick={confirmCancelSubscription}>Yes, Cancel</Button>
        <Button onClick={() => setShowModal(false)}>No, Keep Subscription</Button>
      </div>
    );
    setShowModal(true);
  };

  const confirmCancelSubscription = async () => {
    try {
      await cancelSubscription();
      setCurrentSubscription(null);
      setShowModal(false);
      // TODO: Display success message to user
      navigate('/dashboard'); // Redirect to dashboard after cancellation
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      // TODO: Display error message to user
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subscription-management">
      <h1>Subscription Management</h1>
      {currentSubscription ? (
        <>
          <SubscriptionDetails subscription={currentSubscription} />
          <Button onClick={handleUpdateSubscription}>Update Subscription</Button>
          <Button onClick={handleCancelSubscription}>Cancel Subscription</Button>
        </>
      ) : (
        <>
          <p>You don't have an active subscription.</p>
          <Button onClick={() => setShowModal(true)}>Create New Subscription</Button>
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalContent || (
          <SubscriptionForm onSubmit={handleCreateSubscription} onCancel={() => setShowModal(false)} />
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionManagement;

// TODO: Implement proper error handling for failed API calls and display user-friendly error messages
// TODO: Add unit and integration tests for the SubscriptionManagement component
// TODO: Implement accessibility features (ARIA labels, keyboard navigation) for the entire page
// TODO: Add analytics tracking for subscription-related actions
// TODO: Implement responsive design for mobile devices
// TODO: Add support for multiple subscription tiers if required by the business model