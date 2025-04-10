import React from "react";

const TaskItem = ({ task, onDelete, onToggle }: any) => {
  return (
    <li className="flex items-center justify-between border-b py-3 px-2 hover:bg-gray-50">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-green-500" : "text-black"
        }`}
      >
        {task.title}
      </span>

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
