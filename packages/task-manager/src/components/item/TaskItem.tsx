import { Button, ConfirmDialog, useToast } from '@lateral/design-system';
import React, { useState } from 'react';

import type { TaskItemProps } from './types';

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { showToast } = useToast();

  const toggleConfirmDialog = () => {
    setShowConfirmDialog(open => !open);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    toggleConfirmDialog();
    showToast(`Task "${task.title}" deleted successfully`);
  };

  return (
    <li className="flex items-center justify-between border-b py-2 sm:py-3 px-2 hover:bg-gray-50">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer text-sm sm:text-base truncate ${
            task.completed ? 'line-through text-green-500' : 'text-black'
          }`}
        >
          {task.title}
        </span>
      </div>

      <Button
        variant="danger"
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm ml-2 flex-shrink-0"
        onClick={toggleConfirmDialog}
      >
        Delete
      </Button>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onConfirm={handleConfirmDelete}
        onCancel={toggleConfirmDialog}
        title="Delete Task"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        message={`Are you sure you want to delete "${task.title}"?`}
      />
    </li>
  );
};
