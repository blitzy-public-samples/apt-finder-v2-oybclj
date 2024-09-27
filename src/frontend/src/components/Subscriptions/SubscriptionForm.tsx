import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { subscriptionService } from '../../services/subscriptions';
import { Subscription } from '../../types/subscription';

interface SubscriptionFormProps {
  onSubmit: (subscription: Subscription) => void;
  initialData: Subscription | null;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Subscription>({
    defaultValues: initialData || {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmitForm = async (data: Subscription) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await subscriptionService.createOrUpdateSubscription(data);
      onSubmit(result);
    } catch (err) {
      setError('An error occurred while submitting the form. Please try again.');
      console.error('Subscription form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label="Subscription Name"
        {...register('name', { required: 'Subscription name is required' })}
        error={errors.name?.message}
      />
      <Input
        label="Start Date"
        type="date"
        {...register('startDate', { required: 'Start date is required' })}
        error={errors.startDate?.message}
      />
      <Input
        label="End Date"
        type="date"
        {...register('endDate', { required: 'End date is required' })}
        error={errors.endDate?.message}
      />
      <Input
        label="Price"
        type="number"
        {...register('price', { required: 'Price is required', min: 0 })}
        error={errors.price?.message}
      />
      {error && <p className="error-message">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default SubscriptionForm;

// Human tasks:
// TODO: Implement proper error handling and display error messages to the user
// TODO: Add form validation rules based on business requirements
// TODO: Implement loading state while form is being submitted
// TODO: Add unit tests for the SubscriptionForm component