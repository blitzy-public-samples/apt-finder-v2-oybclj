import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// TODO: Import the Button component once it's implemented
// import Button from '../Common/Button';

// TODO: Import the useAuth hook once it's implemented
// import { useAuth } from '../../hooks/useAuth';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4A90E2;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #333333;
  text-decoration: none;
  &:hover {
    color: #4A90E2;
  }
`;

const AuthButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4A90E2;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #3A80D2;
  }
`;

const Header: React.FC = () => {
  // TODO: Implement authentication logic using useAuth hook
  const isAuthenticated = false; // Placeholder for authentication state
  const logout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <HeaderContainer>
      <Logo to="/">Apartment Finder</Logo>
      <Nav>
        <NavLink to="/listings">Listings</NavLink>
        <NavLink to="/filters">Filters</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <AuthButton onClick={logout}>Logout</AuthButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

// TODO: Implement the Button component
// TODO: Implement the useAuth hook
// TODO: Finalize the navigation structure and add all necessary links