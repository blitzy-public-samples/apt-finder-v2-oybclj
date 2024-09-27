import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useFilters } from '../../hooks/useFilters';

// Styled components
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #f8f8f8;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const NavLink = styled(Link)`
  display: block;
  padding: 10px 0;
  color: #333333;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #4A90E2;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const FilterList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FilterItem = styled.li`
  margin-bottom: 10px;
`;

const ToggleButton = styled(Button)`
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 1000;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// FilterItem component
const FilterItem = ({ filter, onEdit, onDelete }) => {
  return (
    <FilterItem>
      <span>{filter.name}</span>
      <Button onClick={() => onEdit(filter)}>Edit</Button>
      <Button onClick={() => onDelete(filter)}>Delete</Button>
    </FilterItem>
  );
};

// Main Sidebar component
const Sidebar = () => {
  const { user, isAuthenticated } = useAuth();
  const { filters, editFilter, deleteFilter } = useFilters();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        {isAuthenticated && (
          <UserInfo>
            <h3>Welcome, {user.name}!</h3>
          </UserInfo>
        )}
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/listings">Listings</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/filters">My Filters</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/subscription">Subscription</NavLink>
            </>
          )}
        </nav>
        {isAuthenticated && (
          <div>
            <h4>My Filters</h4>
            <FilterList>
              {filters.map((filter) => (
                <FilterItem
                  key={filter.id}
                  filter={filter}
                  onEdit={editFilter}
                  onDelete={deleteFilter}
                />
              ))}
            </FilterList>
            <Button as={Link} to="/filters/new">Create New Filter</Button>
          </div>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

// Human tasks (commented)
/*
Human tasks:
1. Implement responsive design for sidebar to ensure proper display on mobile devices (Required)
2. Create icons for navigation items and filter management (Optional)
3. Implement animations for sidebar show/hide functionality (Optional)
*/