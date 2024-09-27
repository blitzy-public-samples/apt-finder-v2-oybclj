import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import { Filter } from '../../types/filter';
import { useFilters } from '../../hooks/useFilters';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

interface FilterFormProps {
  initialFilter?: Filter;
  onSubmit?: (filter: Filter) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({ initialFilter, onSubmit }) => {
  const [filter, setFilter] = useState<Filter>(initialFilter || {
    zipCodes: [],
    rentRange: { min: 0, max: 0 },
    bedrooms: 0,
    bathrooms: 0,
    squareFootage: { min: 0, max: 0 },
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Filter, string>>>({});
  const { createFilter, updateFilter } = useFilters();

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
    }
  }, [initialFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => {
      if (name === 'zipCodes') {
        return { ...prevFilter, zipCodes: value.split(',').map((zip) => zip.trim()) };
      } else if (name.includes('.')) {
        const [key, subKey] = name.split('.');
        return {
          ...prevFilter,
          [key]: { ...prevFilter[key as keyof Filter], [subKey]: Number(value) },
        };
      } else {
        return { ...prevFilter, [name]: Number(value) };
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Filter, string>> = {};

    if (filter.zipCodes.length === 0) {
      newErrors.zipCodes = 'At least one zip code is required';
    }
    if (filter.rentRange.min >= filter.rentRange.max) {
      newErrors.rentRange = 'Maximum rent must be greater than minimum rent';
    }
    if (filter.squareFootage.min >= filter.squareFootage.max) {
      newErrors.squareFootage = 'Maximum square footage must be greater than minimum';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (initialFilter) {
          await updateFilter(filter);
        } else {
          await createFilter(filter);
        }
        if (onSubmit) {
          onSubmit(filter);
        }
      } catch (error) {
        console.error('Error submitting filter:', error);
        setErrors({ submit: 'An error occurred while submitting the filter' });
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        name="zipCodes"
        label="Zip Codes (comma-separated)"
        value={filter.zipCodes.join(', ')}
        onChange={handleInputChange}
        error={errors.zipCodes}
      />
      <InputGroup>
        <Input
          name="rentRange.min"
          label="Min Rent"
          type="number"
          value={filter.rentRange.min}
          onChange={handleInputChange}
        />
        <Input
          name="rentRange.max"
          label="Max Rent"
          type="number"
          value={filter.rentRange.max}
          onChange={handleInputChange}
        />
      </InputGroup>
      {errors.rentRange && <ErrorMessage>{errors.rentRange}</ErrorMessage>}
      <Input
        name="bedrooms"
        label="Bedrooms"
        type="number"
        value={filter.bedrooms}
        onChange={handleInputChange}
      />
      <Input
        name="bathrooms"
        label="Bathrooms"
        type="number"
        value={filter.bathrooms}
        onChange={handleInputChange}
      />
      <InputGroup>
        <Input
          name="squareFootage.min"
          label="Min Square Footage"
          type="number"
          value={filter.squareFootage.min}
          onChange={handleInputChange}
        />
        <Input
          name="squareFootage.max"
          label="Max Square Footage"
          type="number"
          value={filter.squareFootage.max}
          onChange={handleInputChange}
        />
      </InputGroup>
      {errors.squareFootage && <ErrorMessage>{errors.squareFootage}</ErrorMessage>}
      <Button type="submit">{initialFilter ? 'Update Filter' : 'Create Filter'}</Button>
      {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
    </FormContainer>
  );
};

// Human tasks:
// 1. Implement proper error handling and user feedback for form validation
// 2. Add accessibility attributes to form elements
// 3. Implement unit tests for the FilterForm component