import React, { useState } from "react";
import type { TaskItemProps } from "./types";
import { Button, ConfirmDialog, useToast } from "../../../design-system";

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { showToast } = useToast();

  const toggleConfirmDialog = () => {
    setShowConfirmDialog((open) => !open);
  };
  
  const handleConfirmDelete = () => {
    onDelete(task.id);
    toggleConfirmDialog();
    showToast(`Task "${task.title}" deleted successfully`);
  };
  
  return (
    <li className="flex items-center justify-between border-b py-3 px-2 hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer ${
            task.completed ? "line-through text-green-500" : "text-black"
          }`}
        >
          {task.title}
        </span>
      </div>

      <Button
        variant="danger"
        className="px-3 py-1 text-sm"
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
