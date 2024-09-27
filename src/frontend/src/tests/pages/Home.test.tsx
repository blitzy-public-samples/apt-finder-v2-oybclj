import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import Home from '../../pages/Home';
import { useListings } from '../../hooks/useListings';

// Mock the useListings hook
jest.mock('../../hooks/useListings');

describe('Home Component', () => {
  const mockFeaturedListings = [
    { id: 1, title: 'Apartment 1', price: 1000 },
    { id: 2, title: 'Apartment 2', price: 1200 },
  ];

  beforeEach(() => {
    // Mock the useListings hook to return predefined featured listings
    (useListings as jest.Mock).mockReturnValue({
      featuredListings: mockFeaturedListings,
      isLoading: false,
      error: null,
    });
  });

  it('renders the home page with correct title', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Find Your Perfect Apartment')).toBeInTheDocument();
  });

  it('displays featured listings', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Featured Listings:')).toBeInTheDocument();
      expect(screen.getByText('Apartment 1')).toBeInTheDocument();
      expect(screen.getByText('Apartment 2')).toBeInTheDocument();
    });
  });

  it('navigates to sign up page when "Create Account" button is clicked', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const createAccountButton = screen.getByText('Create Account to Get Started');
    userEvent.click(createAccountButton);

    // Assuming the button navigates to the '/signup' route
    await waitFor(() => {
      expect(window.location.pathname).toBe('/signup');
    });
  });

  it('shows loading state while fetching featured listings', () => {
    (useListings as jest.Mock).mockReturnValue({
      featuredListings: [],
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when fetching featured listings fails', () => {
    (useListings as jest.Mock).mockReturnValue({
      featuredListings: [],
      isLoading: false,
      error: 'Failed to fetch featured listings',
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Failed to fetch featured listings')).toBeInTheDocument();
  });
});

// Human tasks:
// TODO: Implement test cases for error handling when fetching featured listings fails
// TODO: Add test cases for responsive design behavior
// TODO: Create test cases for analytics tracking once implemented