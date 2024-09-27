import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const FooterContainer = styled.footer`
  background-color: #f8f8f8;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: #4A90E2;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2A70C2;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #4A90E2;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2A70C2;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>&copy; {currentYear} Apartment Finder. All rights reserved.</Copyright>
        <FooterLinks>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterLinks>
        <SocialIcons>
          {/* TODO: Add social media icon components or import from a library */}
          <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</SocialIcon>
          <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</SocialIcon>
          <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</SocialIcon>
        </SocialIcons>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// TODO: Add social media icon components or import from a library
// TODO: Confirm the final list of important links to be included in the footer
// TODO: Decide on the styling for the footer to ensure consistency with the overall design