import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import Button from '../components/Common/Button';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect logic for already authenticated users
  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard or home page
      // This should be implemented using react-router-dom's useNavigate hook
      console.log('User is already authenticated. Redirect to dashboard.');
    }
  }, [isAuthenticated]);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Description>Log in to your Apartment Finder account</Description>
        <LoginForm />
        <SignupLink to="/signup">New user? Create an account</SignupLink>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f8f8;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #666;
`;

const SignupLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #4A90E2;
  text-decoration: none;
  font-weight: bold;
`;

export default Login;

// Human tasks:
// TODO: Implement loading state while authentication is in progress
// TODO: Add error handling for network issues or server errors
// TODO: Implement redirect logic for already authenticated users
// TODO: Consider adding password recovery option