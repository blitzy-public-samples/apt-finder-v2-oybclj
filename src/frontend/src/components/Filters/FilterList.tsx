import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFilters } from '../../hooks/useFilters';
import FilterForm from './FilterForm';
import Button from '../Common/Button';
import { Filter } from '../../types/filter';

const FilterListContainer = styled.div`
  margin: 20px 0;
`;

const FilterItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const FilterItem: React.FC<{
  filter: Filter;
  onEdit: (filter: Filter) => void;
  onDelete: (filterId: string) => void;
}> = ({ filter, onEdit, onDelete }) => {
  return (
    <FilterItemContainer>
      <p>Zip Codes: {filter.zipCodes.join(', ')}</p>
      <p>Rent Range: ${filter.rentRange.min} - ${filter.rentRange.max}</p>
      <p>Bedrooms: {filter.bedrooms}+</p>
      <p>Bathrooms: {filter.bathrooms}+</p>
      <p>Square Footage: {filter.squareFootage.min} - {filter.squareFootage.max} sq ft</p>
      <Button onClick={() => onEdit(filter)}>Edit</Button>
      <Button onClick={() => onDelete(filter.id)}>Delete</Button>
    </FilterItemContainer>
  );
};

const FilterList: React.FC = () => {
  const { filters, fetchFilters, deleteFilter, setEditingFilter } = useFilters();

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const handleEditFilter = (filter: Filter) => {
    setEditingFilter(filter);
  };

  const handleDeleteFilter = (filterId: string) => {
    deleteFilter(filterId);
  };

  return (
    <FilterListContainer>
      <h2>Your Filters</h2>
      {filters.map((filter) => (
        <FilterItem
          key={filter.id}
          filter={filter}
          onEdit={handleEditFilter}
          onDelete={handleDeleteFilter}
        />
      ))}
      <Button onClick={() => setEditingFilter(null)}>Add New Filter</Button>
      <FilterForm />
    </FilterListContainer>
  );
};

export default FilterList;

// Human tasks:
// TODO: Implement pagination or infinite scrolling for large numbers of filters (Required)
// TODO: Add sorting and searching functionality for filters (Optional)
// TODO: Implement unit tests for the FilterList component (Required)
// TODO: Add accessibility attributes to list items and interactive elements (Required)