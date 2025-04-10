import React from "react";

import { TaskItemProps } from "./types";

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <li className="flex items-center justify-between border-b py-3 px-2 hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span
          onClick={() => onToggle(task.id)}
          className={`cursor-pointer ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
