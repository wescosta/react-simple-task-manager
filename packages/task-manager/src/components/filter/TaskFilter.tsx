import { Button } from '@lateral/design-system';
import React from 'react';

import type { TaskFilterProps } from './types';

export const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
      <Button
        onClick={() => onFilterChange('all')}
        variant={currentFilter === 'all' ? 'primary' : 'secondary'}
        className="text-xs sm:text-sm py-1 px-2 sm:px-4"
      >
        All
      </Button>
      <Button
        onClick={() => onFilterChange('completed')}
        variant={currentFilter === 'completed' ? 'primary' : 'secondary'}
        className="text-xs sm:text-sm py-1 px-2 sm:px-4"
      >
        Completed
      </Button>
      <Button
        onClick={() => onFilterChange('pending')}
        variant={currentFilter === 'pending' ? 'primary' : 'secondary'}
        className="text-xs sm:text-sm py-1 px-2 sm:px-4"
      >
        Pending
      </Button>
    </div>
  );
};
