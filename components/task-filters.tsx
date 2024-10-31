'use client';

import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function TaskFilters({ activeFilter, onFilterChange }: TaskFiltersProps) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'High Priority', value: 'high' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'Low Priority', value: 'low' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}