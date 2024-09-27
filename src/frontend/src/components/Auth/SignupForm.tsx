import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { validateEmail, validatePassword } from '../../utils/validation';
import { signup } from '../../services/auth';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        setEmailError(validateEmail(value) ? '' : 'Invalid email address');
        break;
      case 'password':
        setPassword(value);
        setPasswordError(validatePassword(value) ? '' : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        setConfirmPasswordError(value === password ? '' : 'Passwords do not match');
        break;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupError('');

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Invalid password');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password);
      navigate('/dashboard');
    } catch (error) {
      setSignupError('An error occurred during signup. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Email"
        error={emailError}
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Password"
        error={passwordError}
      />
      <Input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm Password"
        error={confirmPasswordError}
      />
      {signupError && <p className="error-message">{signupError}</p>}
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignupForm;

// Human tasks:
// TODO: Implement proper error handling and user feedback for failed signup attempts
// TODO: Add unit tests for the SignupForm component
// TODO: Implement password strength indicator (Optional)