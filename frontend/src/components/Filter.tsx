import React, { useState } from 'react';
import Button from './Button';
import { Column } from '../types/interface';

export interface Filter {
  field: string;
  value: string;
}

interface FilterComponentProps {
  fields: Column[];
  onApplyFilters: (filters: Filter[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ fields, onApplyFilters }) => {
  const [filters, setFilters] = useState<Filter[]>([{ field: '', value: '' }]);

  const handleFilterChange = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { field, value };
    setFilters(newFilters);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { field: '', value: '' }]);
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters.filter(filter => filter.field && filter.value));
  };

  return (
    <div className="flex flex-col space-y-4">
      {filters.map((filter, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <select
            value={filter.field}
            onChange={(e) => handleFilterChange(index, e.target.value, filter.value)}
            className="p-2 border rounded-md bg-white"
          >
            <option>Select Filter</option>
            {fields.map((field) => (
              <option key={field.key} value={field.key}>
                {field.header}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, filter.field, e.target.value)}
            placeholder="Filter value"
            className="p-2 border rounded-md bg-white"
          />
          <Button onClick={() => handleRemoveFilter(index)} name="x" />
        </div>
      ))}
      <div className="flex space-x-4 items-center">
        <Button onClick={handleAddFilter} name="Add Filter" />
        <Button onClick={handleApplyFilters} name="Apply Filters" />
        <Button onClick={() => { setFilters([]); }} name="Clear All" />
      </div>
    </div>
  );
};

export default FilterComponent;
