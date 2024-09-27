import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FilterForm } from '../../../components/Filters/FilterForm';
import { useFilters } from '../../../hooks/useFilters';

// Mock the useFilters hook
jest.mock('../../../hooks/useFilters');

describe('FilterForm', () => {
  // Mock implementation of useFilters
  const mockUseFilters = useFilters as jest.MockedFunction<typeof useFilters>;
  const mockCreateFilter = jest.fn();
  const mockUpdateFilter = jest.fn();

  beforeEach(() => {
    mockUseFilters.mockReturnValue({
      createFilter: mockCreateFilter,
      updateFilter: mockUpdateFilter,
      // Add other properties and methods as needed
    });
  });

  it('renders the form correctly', () => {
    const { getByLabelText, getByText } = render(<FilterForm />);

    expect(getByLabelText('Zip Codes')).toBeInTheDocument();
    expect(getByLabelText('Min Rent')).toBeInTheDocument();
    expect(getByLabelText('Max Rent')).toBeInTheDocument();
    expect(getByLabelText('Bedrooms')).toBeInTheDocument();
    expect(getByLabelText('Bathrooms')).toBeInTheDocument();
    expect(getByLabelText('Min Square Footage')).toBeInTheDocument();
    expect(getByLabelText('Max Square Footage')).toBeInTheDocument();
    expect(getByText('Save Filter')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(<FilterForm />);

    fireEvent.change(getByLabelText('Zip Codes'), { target: { value: '12345,67890' } });
    fireEvent.change(getByLabelText('Min Rent'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Max Rent'), { target: { value: '2000' } });
    fireEvent.change(getByLabelText('Bedrooms'), { target: { value: '2' } });
    fireEvent.change(getByLabelText('Bathrooms'), { target: { value: '1' } });
    fireEvent.change(getByLabelText('Min Square Footage'), { target: { value: '500' } });
    fireEvent.change(getByLabelText('Max Square Footage'), { target: { value: '1000' } });

    fireEvent.click(getByText('Save Filter'));

    await waitFor(() => {
      expect(mockCreateFilter).toHaveBeenCalledWith({
        zipCodes: ['12345', '67890'],
        minRent: 1000,
        maxRent: 2000,
        bedrooms: 2,
        bathrooms: 1,
        minSquareFootage: 500,
        maxSquareFootage: 1000,
      });
    });
  });

  it('displays validation errors for invalid input', async () => {
    const { getByLabelText, getByText, findByText } = render(<FilterForm />);

    fireEvent.change(getByLabelText('Zip Codes'), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText('Min Rent'), { target: { value: '-100' } });
    fireEvent.change(getByLabelText('Max Rent'), { target: { value: 'abc' } });

    fireEvent.click(getByText('Save Filter'));

    expect(await findByText('Invalid zip code format')).toBeInTheDocument();
    expect(await findByText('Rent must be a positive number')).toBeInTheDocument();
    expect(await findByText('Invalid rent value')).toBeInTheDocument();
  });

  it('updates an existing filter', async () => {
    const existingFilter = {
      id: '123',
      zipCodes: ['12345'],
      minRent: 1000,
      maxRent: 2000,
      bedrooms: 2,
      bathrooms: 1,
      minSquareFootage: 500,
      maxSquareFootage: 1000,
    };

    const { getByLabelText, getByText } = render(<FilterForm filter={existingFilter} />);

    fireEvent.change(getByLabelText('Zip Codes'), { target: { value: '12345,67890' } });
    fireEvent.change(getByLabelText('Max Rent'), { target: { value: '2500' } });

    fireEvent.click(getByText('Update Filter'));

    await waitFor(() => {
      expect(mockUpdateFilter).toHaveBeenCalledWith('123', {
        ...existingFilter,
        zipCodes: ['12345', '67890'],
        maxRent: 2500,
      });
    });
  });
});

// Human tasks:
// 1. Implement additional test cases for edge cases and error scenarios
// 2. Add integration tests with actual API calls (mocked)
// 3. Implement snapshot testing for the FilterForm component