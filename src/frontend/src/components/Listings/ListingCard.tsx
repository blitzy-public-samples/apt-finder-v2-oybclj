import React from 'react';
import styled from 'styled-components';

// Assuming this interface is defined elsewhere in the project
interface ApartmentInterface {
  id: string;
  imageUrl: string;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  streetAddress: string;
  availableDate: Date;
  zillowUrl: string;
}

interface ListingCardProps {
  apartment: ApartmentInterface;
}

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Address = styled.p`
  color: #666;
  margin-bottom: 8px;
`;

const Button = styled.a`
  display: inline-block;
  background-color: #4A90E2;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
`;

const formatRent = (rent: number): string => {
  return `$${rent.toLocaleString()}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const ListingCard: React.FC<ListingCardProps> = ({ apartment }) => {
  const {
    imageUrl,
    rent,
    bedrooms,
    bathrooms,
    squareFootage,
    streetAddress,
    availableDate,
    zillowUrl
  } = apartment;

  return (
    <Card>
      <Image src={imageUrl} alt="Apartment" />
      <Title>{formatRent(rent)} / month</Title>
      <Details>
        <span>{bedrooms} bed</span>
        <span>{bathrooms} bath</span>
        <span>{squareFootage} sqft</span>
      </Details>
      <Address>{streetAddress}</Address>
      <p>Available: {formatDate(availableDate)}</p>
      <Button href={zillowUrl} target="_blank" rel="noopener noreferrer">
        View Details
      </Button>
    </Card>
  );
};

// Human tasks:
// TODO: Implement responsive design for different screen sizes
// TODO: Add error handling for missing apartment data
// TODO: Implement lazy loading for apartment images