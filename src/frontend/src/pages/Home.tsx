import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ListingCard from '../components/Listings/ListingCard';
import Button from '../components/Common/Button';
import { useListings } from '../hooks/useListings';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  background-image: url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const FeaturedListings = styled.section`
  margin-bottom: 2rem;
`;

const ListingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const BenefitsSection = styled.section`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const BenefitsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const CallToAction = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Home: React.FC = () => {
  const { listings, fetchListings } = useListings();
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings({ featured: true, limit: 4 });
  }, [fetchListings]);

  useEffect(() => {
    if (listings) {
      setFeaturedListings(listings.slice(0, 4));
    }
  }, [listings]);

  return (
    <HomeContainer>
      <HeroSection>
        <WelcomeMessage>Find Your Perfect Apartment</WelcomeMessage>
        <Subtitle>Discover the ideal living space for recent college graduates</Subtitle>
        <Link to="/signup">
          <Button>Create Account to Get Started</Button>
        </Link>
      </HeroSection>

      <FeaturedListings>
        <SectionTitle>Featured Listings</SectionTitle>
        <ListingGrid>
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </ListingGrid>
      </FeaturedListings>

      <BenefitsSection>
        <SectionTitle>Why Choose Apartment Finder?</SectionTitle>
        <BenefitsList>
          <BenefitItem>✓ Real-time updates from Zillow</BenefitItem>
          <BenefitItem>✓ Customizable search filters</BenefitItem>
          <BenefitItem>✓ Tailored for recent college graduates</BenefitItem>
          <BenefitItem>✓ Secure and user-friendly platform</BenefitItem>
        </BenefitsList>
      </BenefitsSection>

      <CallToAction>
        <SectionTitle>Ready to Find Your New Home?</SectionTitle>
        <Link to="/signup">
          <Button>Sign Up Now</Button>
        </Link>
      </CallToAction>
    </HomeContainer>
  );
};

export default Home;

// Human tasks:
// TODO: Create and integrate hero section background image
// TODO: Finalize the copy for the benefits section
// TODO: Implement responsive design for mobile devices
// TODO: Add analytics tracking for user interactions on the home page