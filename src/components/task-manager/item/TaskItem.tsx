import React from "react";
import { TaskItemProps } from "./types";
import { Button } from "../../design-system";

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
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
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </li>
  );
};
