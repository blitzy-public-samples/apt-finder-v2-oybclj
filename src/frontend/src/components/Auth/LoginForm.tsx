import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { useAppDispatch } from '../../store';
import { login } from '../../store/slices/authSlice';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'An error occurred during login');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <div className="error-message">{error}</div>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </Button>
      <div>
        <a href="/signup">Don't have an account? Sign up</a>
      </div>
    </form>
  );
};

// Human tasks:
// TODO: Implement proper error handling and display for failed login attempts
// TODO: Add loading state to prevent multiple form submissions
// TODO: Implement remember me functionality