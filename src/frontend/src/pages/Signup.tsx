import React from 'react';
import styled from 'styled-components';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SignupForm from '../components/Auth/SignupForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Signup: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <SignupForm />
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default Signup;

// Human tasks:
// TODO: Implement responsive design for the Signup page layout
// TODO: Add error boundary to handle potential rendering errors
// TODO: Implement analytics tracking for the Signup page