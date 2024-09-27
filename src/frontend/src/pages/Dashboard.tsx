import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Sidebar } from '../components/Layout/Sidebar';
import { FilterList } from '../components/Filters/FilterList';
import { ListingGrid } from '../components/Listings/ListingGrid';
import { useAuth } from '../hooks/useAuth';
import { useFilters } from '../hooks/useFilters';
import { useListings } from '../hooks/useListings';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { filters, fetchFilters } = useFilters();
  const { listings, fetchListings } = useListings();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchFilters(), fetchListings()]);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error loading dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [fetchFilters, fetchListings]);

  return (
    <DashboardContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>
          <WelcomeMessage>Welcome, {user?.name || 'User'}!</WelcomeMessage>
          {isLoading ? (
            <p>Loading dashboard data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <FilterList filters={filters} />
              <ListingGrid listings={listings} />
            </>
          )}
        </ContentArea>
      </MainContent>
      <Footer />
    </DashboardContainer>
  );
};

export default Dashboard;

// Human tasks:
// TODO: Implement error handling for failed API requests
// TODO: Add loading states for filters and listings
// TODO: Implement pagination or infinite scrolling for listings
// TODO: Add unit tests for the Dashboard component
// TODO: Implement responsive design for various screen sizes
// TODO: Add analytics tracking for user interactions on the dashboard