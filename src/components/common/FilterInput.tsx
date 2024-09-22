import React from "react";
import { Input } from ".";

interface FilterInputProps {
  filter: string;
  onChangeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  results: number;
}

const FilterInput: React.FC<FilterInputProps> = ({
  filter,
  onChangeFilter,
  results,
}) => {
  return (
    <div className="flex flex-row items-center justify-end space-y-2 sm:space-y-0 space-x-2">
      <span
        className="bg-blue-600 text-white text-sm font-semibold rounded-md px-3 py-1"
        data-testid="result-value"
      >
        {results}
      </span>
      <Input
        id="filter"
        value={filter}
        onChange={onChangeFilter}
        placeholder="Filter podcasts..."
      />
    </div>
  );
};

export default FilterInput;
