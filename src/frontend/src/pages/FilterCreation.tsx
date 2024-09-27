import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilterForm from '../components/Filters/FilterForm';
import { useAuth } from '../hooks/useAuth';
import { Filter } from '../types/filter';

const FilterCreationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const FilterCreation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilterCreated = async (newFilter: Filter) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to create filter
      console.log('New filter created:', newFilter);
      
      // Display success message
      alert('Filter created successfully!');
      
      // Navigate to dashboard or filters list page
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred while creating the filter. Please try again.');
      console.error('Error creating filter:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <FilterCreationContainer>
      <Title>Create New Filter</Title>
      <Description>
        Customize your apartment search by creating a new filter. Specify your preferences for
        location, price range, and other features to find your perfect apartment.
      </Description>
      <FilterForm onSubmit={handleFilterCreated} isLoading={isLoading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FilterCreationContainer>
  );
};

export default FilterCreation;

// TODO: Implement error handling for filter creation process
// TODO: Add loading state while filter is being created
// TODO: Implement unit tests for the FilterCreation page
// TODO: Add breadcrumb navigation for better user experience