import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListingGrid from '../components/Listings/ListingGrid';
import FilterForm from '../components/Filters/FilterForm';
import Loader from '../components/Common/Loader';
import { useListings } from '../hooks/useListings';
import { ApartmentInterface } from '../../shared/interfaces/apartment.interface';

const ListingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Listings: React.FC = () => {
  const [filters, setFilters] = useState({});
  const { listings, loading, error, fetchListings } = useListings();

  useEffect(() => {
    fetchListings(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: object) => {
    setFilters(newFilters);
  };

  return (
    <ListingsContainer>
      <Title>Apartment Listings</Title>
      <FilterForm onFilterChange={handleFilterChange} />
      {loading ? (
        <Loader />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListingGrid listings={listings} />
      )}
    </ListingsContainer>
  );
};

export default Listings;

// Human tasks:
// TODO: Implement pagination or infinite scrolling for large numbers of listings
// TODO: Add error boundary to handle potential rendering errors
// TODO: Implement caching mechanism for faster subsequent loads
// TODO: Add analytics tracking for user interactions and page views