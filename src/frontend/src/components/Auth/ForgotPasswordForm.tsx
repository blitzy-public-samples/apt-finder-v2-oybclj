import React, { useState, useCallback } from 'react';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { forgotPassword } from '../../services/auth';
import { validateEmail } from '../../utils/validation';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  }, [email]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  }, []);

  if (success) {
    return (
      <div>
        <p>Password reset instructions have been sent to your email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        required
      />
      {error && <p className="error">{error}</p>}
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

// Human tasks:
// TODO: Implement proper error handling and user feedback for failed password reset requests
// TODO: Add unit tests for the ForgotPasswordForm component
// TODO: Implement internationalization (i18n) for form labels and error messages