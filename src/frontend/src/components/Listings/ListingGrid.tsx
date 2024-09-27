import React from 'react';
import styled from 'styled-components';
import ListingCard from './ListingCard';
import { ApartmentInterface } from '../../../shared/interfaces/apartment.interface';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

interface ListingGridProps {
  listings: ApartmentInterface[];
}

const ListingGrid: React.FC<ListingGridProps> = ({ listings }) => {
  return (
    <GridContainer>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} apartment={listing} />
        ))
      ) : (
        <p>No listings available.</p>
      )}
    </GridContainer>
  );
};

export default ListingGrid;

// Human tasks:
// TODO: Implement pagination or infinite scrolling for large numbers of listings (Required)
// TODO: Add sorting functionality for the listings (Optional)
// TODO: Implement filtering options for the listings (Optional)