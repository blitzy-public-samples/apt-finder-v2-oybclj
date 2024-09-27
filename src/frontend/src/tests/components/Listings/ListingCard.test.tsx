import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListingCard } from '../../../components/Listings/ListingCard';
import { ApartmentInterface } from '../../../shared/interfaces/apartment.interface';

describe('ListingCard', () => {
  const mockApartment: ApartmentInterface = {
    id: '1',
    title: 'Cozy Studio Apartment',
    address: '123 Main St, Anytown, USA',
    rent: 1200,
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 500,
    imageUrl: 'https://example.com/apartment.jpg',
    availableDate: '2023-07-01',
    zillowUrl: 'https://www.zillow.com/homedetails/123-main-st',
  };

  it('renders apartment details correctly', () => {
    render(<ListingCard apartment={mockApartment} />);

    expect(screen.getByText('Cozy Studio Apartment')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('$1,200/month')).toBeInTheDocument();
    expect(screen.getByText('1 bed')).toBeInTheDocument();
    expect(screen.getByText('1 bath')).toBeInTheDocument();
    expect(screen.getByText('500 sq ft')).toBeInTheDocument();
    expect(screen.getByText('Available: Jul 1, 2023')).toBeInTheDocument();
  });

  it('displays the apartment image', () => {
    render(<ListingCard apartment={mockApartment} />);

    const image = screen.getByAltText('Cozy Studio Apartment') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://example.com/apartment.jpg');
  });

  it('opens Zillow link in a new tab when "View on Zillow" button is clicked', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    render(<ListingCard apartment={mockApartment} />);

    const viewOnZillowButton = screen.getByText('View on Zillow');
    fireEvent.click(viewOnZillowButton);

    expect(mockOpen).toHaveBeenCalledWith('https://www.zillow.com/homedetails/123-main-st', '_blank');
  });

  it('calls onSelect prop when "Select" button is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ListingCard apartment={mockApartment} onSelect={mockOnSelect} />);

    const selectButton = screen.getByText('Select');
    fireEvent.click(selectButton);

    expect(mockOnSelect).toHaveBeenCalledWith(mockApartment);
  });

  it('applies "selected" class when isSelected prop is true', () => {
    render(<ListingCard apartment={mockApartment} isSelected={true} />);

    const cardElement = screen.getByTestId('listing-card');
    expect(cardElement).toHaveClass('selected');
  });

  it('does not apply "selected" class when isSelected prop is false', () => {
    render(<ListingCard apartment={mockApartment} isSelected={false} />);

    const cardElement = screen.getByTestId('listing-card');
    expect(cardElement).not.toHaveClass('selected');
  });
});

// Human tasks:
// - Implement tests for error handling scenarios
// - Add tests for responsive design behavior
// - Create snapshot tests for ListingCard component