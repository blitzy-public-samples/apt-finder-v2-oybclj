import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// TODO: Import ApartmentInterface once it's available
// import { ApartmentInterface } from '../../../shared/interfaces/apartment.interface';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-right: 10px;
`;

const DetailSection = styled.section`
  margin-bottom: 20px;
`;

const DetailTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DetailItem = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const MapContainer = styled.div`
  height: 300px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4A90E2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
`;

const ListingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        // TODO: Implement actual API call to fetch apartment data
        const response = await fetch(`/api/listings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch apartment data');
        }
        const data = await response.json();
        setApartment(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching apartment data. Please try again later.');
        setLoading(false);
      }
    };

    fetchApartmentData();
  }, [id]);

  const formatRent = (rent: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rent);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <LoadingMessage>Loading apartment details...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!apartment) {
    return <ErrorMessage>Apartment not found.</ErrorMessage>;
  }

  return (
    <Container>
      <h1>{apartment.street_address}</h1>
      
      <ImageGallery>
        {apartment.images && apartment.images.map((image: string, index: number) => (
          <Image key={index} src={image} alt={`Apartment image ${index + 1}`} />
        ))}
      </ImageGallery>

      <DetailSection>
        <DetailTitle>Apartment Details</DetailTitle>
        <DetailItem>Rent: {formatRent(apartment.rent)}</DetailItem>
        <DetailItem>Bedrooms: {apartment.bedrooms}</DetailItem>
        <DetailItem>Bathrooms: {apartment.bathrooms}</DetailItem>
        <DetailItem>Square Footage: {apartment.square_footage} sq ft</DetailItem>
        <DetailItem>Available Date: {formatDate(apartment.available_date)}</DetailItem>
      </DetailSection>

      <DetailSection>
        <DetailTitle>Address</DetailTitle>
        <DetailItem>{apartment.street_address}</DetailItem>
        <DetailItem>{apartment.city}, {apartment.state} {apartment.zipcode}</DetailItem>
      </DetailSection>

      <DetailSection>
        <DetailTitle>Amenities</DetailTitle>
        <ul>
          {apartment.amenities && apartment.amenities.map((amenity: string, index: number) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection>
        <DetailTitle>Description</DetailTitle>
        <p>{apartment.description}</p>
      </DetailSection>

      <MapContainer>
        {/* TODO: Implement Google Maps integration */}
        <p>Map placeholder - Integrate Google Maps here</p>
      </MapContainer>

      <Button onClick={() => alert('Schedule viewing functionality to be implemented')}>
        Schedule a Viewing
      </Button>
      <Button onClick={() => window.open(apartment.zillow_url, '_blank')}>
        View on Zillow
      </Button>
    </Container>
  );
};

export default ListingDetails;

// Human tasks:
// TODO: Implement data fetching logic for individual apartment listings
// TODO: Integrate with a mapping service (e.g., Google Maps) to show the apartment location
// TODO: Implement a photo gallery or carousel for multiple apartment images
// TODO: Add functionality to schedule a viewing or contact the listing agent
// TODO: Ensure the component is fully responsive for all device sizes
// TODO: Implement error handling for cases where listing data cannot be fetched
// TODO: Add accessibility features such as proper ARIA labels and keyboard navigation
// TODO: Optimize performance for faster loading of images and map